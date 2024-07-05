import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import {
  ChatgptApiKeyService,
  chatgpt_api_key,
} from '../../services/chatgpt-api-key.service';
import { TemplateService, template } from '../../services/template.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ConversationService } from './../../services/conversation.service';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MenuComponent,
    InputComponent,
    ReactiveFormsModule,
    ModalComponent,
    MarkdownModule,
  ],
  providers: [provideMarkdown()],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  @ViewChild('clearModal') clearModal!: ModalComponent;
  @ViewChild('textarea', { static: false })
  textarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('screen', { static: false })
  screen!: ElementRef<any>;

  slug: string | null = null;
  template: template | null = null;
  chat_gpt_api_keys: chatgpt_api_key[] = [];
  sidebarOpen = true;
  isLoading = false;
  isGenerating = false;

  form = this.fb.group({
    chat_gpt_api_key_id: [0, Validators.required],
    variables: this.fb.array([]),
  });

  messageForm = this.fb.group({
    input: ['', Validators.required],
  });

  conversations: Array<{
    conversation_id: number;
    messages: Array<{
      prompt: string;
      completion: string;
      completion_time: Date;
      prompt_time: Date;
    }>;
  }> = [];

  selectedConversation: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private chatgptApiKeyService: ChatgptApiKeyService,
    private conversationService: ConversationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (!this.slug) return;
    this.isLoading = true;
    this.chatgptApiKeyService.list().subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.chat_gpt_api_keys = res.data;
          if (this.chat_gpt_api_keys.length > 0) {
            this.form
              .get('chat_gpt_api_key_id')
              ?.setValue(this.chat_gpt_api_keys[0].chatgpt_api_key_id);
          }
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.templateService.getBySlug(this.slug).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.template = res.data;
          const mostRecentTemplateHistory = this.mostRecentTemplateHistory();
          mostRecentTemplateHistory?.variables.forEach((variable) => {
            this.addVariable(variable.name);
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });

    // this.handleSubmit();
  }

  onClose(): void {
    this.router.navigate(['/']);
  }

  onSideBar(value: boolean): void {
    this.sidebarOpen = value;
  }

  clearInputs(): void {
    this.form.controls.variables.reset();
    this.clearModal.toggleModal();
  }

  get variables() {
    return this.form.controls['variables'] as FormArray;
  }

  variableByIndex(index: number) {
    return this.mostRecentTemplateHistory()!.variables[index];
  }

  addVariable(name: string) {
    const variableForm = this.fb.group({
      name: [name, Validators.required],
      value: ['', Validators.required],
    });

    this.variables.push(variableForm);
  }

  getVariableValue(variableIndex: number) {
    return this.variables.controls[variableIndex].get('value') as FormControl;
  }

  deleteVariable(variableIndex: number) {
    this.variables.removeAt(variableIndex);
  }

  mostRecentTemplateHistory() {
    if (!this.template) return;
    return this.template.template_history.reduce((prev, current) => {
      return prev.created_at > current.created_at ? prev : current;
    });
  }

  selectConversation(index: number) {
    if (index < 0 || index >= this.conversations.length) return;
    this.selectedConversation = index;
    this.scrollScreenToBottom();
  }

  handleSubmit() {
    console.log('this.form', this.form);
    if (this.form.invalid) return;
    this.isLoading = true;
    this.isGenerating = true;
    this.conversationService
      .complete({
        slug: this.slug!, 
        chat_gpt_api_key_id: this.form.value.chat_gpt_api_key_id!,
        variables: this.variables.value,
      })
      .subscribe({
        next: (res: any) => {
          console.log('res', res);
          if (res.statusCode == 200) {
            this.conversations.push(res.data);
            this.selectedConversation = this.conversations.length - 1;
            console.log('this.conversations', this.conversations);
            console.log(
              'conversations[selectedConversation].messages',
              this.conversations[this.selectedConversation].messages
            );
            this.isLoading = false;
            this.isGenerating = false;
            this.scrollScreenToBottom();
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.isGenerating = false;
          console.error(err);
        },
      });
  }

  onInput(event: Event): void {
    this.adjustTextareaHeight();
  }

  // adjustTextareaHeight(): void {
  //   const textareaElement = this.textarea.nativeElement;
  //   const currentHeight = textareaElement.scrollHeight;
  //   const maxHeight = 200;
  //   const minHeith = 42;

  //   // Definir a altura máxima como 200px
  //   if (currentHeight > maxHeight) {
  //     textareaElement.style.overflowY = 'auto';
  //     textareaElement.style.height = `${maxHeight}px`;
  //   } else if (currentHeight < minHeith) {
  //     textareaElement.style.overflowY = 'auto';
  //     textareaElement.style.height = `${minHeith}px`;
  //   } else {
  //     textareaElement.style.overflowY = 'hidden';
  //     textareaElement.style.height = `${currentHeight}px`;
  //   }
  // }

  adjustTextareaHeight(): void {
    const textareaElement = this.textarea.nativeElement;
    textareaElement.style.overflowY = 'hidden';

    // Definir a altura com base no scrollHeight
    textareaElement.style.height = 'auto';
    textareaElement.style.height = `${textareaElement.scrollHeight}px`;

    // Se a altura exceder 202 pixels, definir overflow para aut
    if (textareaElement.scrollHeight > 202) {
      textareaElement.style.overflowY = 'auto';
      textareaElement.style.height = '202px';
    } else if (textareaElement.scrollHeight < 42) {
      textareaElement.style.overflowY = 'auto';
      textareaElement.style.height = '42px';
    }

    // Contar o número de linhas e ajustar a altura conforme necessário
    const lines = textareaElement.value.split('\n').length;
    const lineHeight = 22; // Altura estimada de uma linha, ajuste conforme necessário

    const newHeight = lines * lineHeight;
    if (newHeight > textareaElement.scrollHeight) {
      textareaElement.style.height = `${newHeight}px`;
    }
    textareaElement.scrollTop = textareaElement.scrollHeight;
  }

  scrollScreenToBottom(): void {
    if (!this.screen) {
      setTimeout(() => {
        const screen = this.screen.nativeElement;
        screen.scrollTop = screen.scrollHeight;
      }, 100);
    } else {
      const screen = this.screen.nativeElement;
      screen.scrollTop = screen.scrollHeight;
    }
  }

  handleMessage() {
    if (this.messageForm.valid) {
      const screen = this.screen.nativeElement;
      let scroll = false;

      if (screen.scrollHeight - screen.scrollTop === screen.clientHeight)
        scroll = true;

      this.conversations[this.selectedConversation!].messages.push({
        prompt: this.messageForm.value.input!,
        prompt_time: new Date(Date.now()),
        completion: `## Markdown __rulez__!`,
        completion_time: new Date(Date.now()),
      });
      this.messageForm.reset();
      setTimeout(() => {
        if (scroll) this.scrollScreenToBottom();
      }, 100);
    }
  }

  cancelSubmit() {
    this.isLoading = false;
  }
}
