import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { CopyComponent } from './components/copy/copy.component';

@Component({
  selector: 'app-historic',
  standalone: true,
  imports: [CommonModule, ModalComponent, MarkdownModule, CopyComponent],
  providers: [provideMarkdown()],
  templateUrl: './historic.component.html',
  styleUrl: './historic.component.scss',
})
export class HistoricComponent implements OnInit {
  @ViewChild('clearModal') clearModal!: ModalComponent;
  selectedConversation: number | null = 0;

  conversations: Array<{
    conversation_id: number;
    messages: Array<{
      prompt: string;
      completion: string;
      completion_time: Date;
      prompt_time: Date;
    }>;
  }> = [];

  constructor() {}

  ngOnInit(): void {
    this.conversations.push({
      conversation_id: 1,
      messages: [
        {
          prompt: 'Oi, tudo bem?',
          completion: 'Tudo bem e você?',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Eu estou bem, obrigado por perguntar.',
          completion: 'Que bom!',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
    this.conversations.push({
      conversation_id: 2,
      messages: [
        {
          prompt: 'Como programar em Python?',
          completion: 'Você pode usar o PyCharm.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
        {
          prompt: 'Qual outra IDE?',
          completion: 'Você pode usar o VSCode.',
          completion_time: new Date(),
          prompt_time: new Date(),
        },
      ],
    });
  }
}
