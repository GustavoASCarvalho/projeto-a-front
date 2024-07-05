import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiReponse } from '../types/api.types';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private http: HttpClient) {}

  complete(data: {
    slug: string;
    chat_gpt_api_key_id: number;
    variables: Array<{
      name: string;
      value: string;
    }>;
  }) {
    return this.http.post(`${environment.apiUrl}/conversation`, {
      ...data,
    }) as Observable<ApiReponse<string>>;

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({
          data: {
            conversation_id: 1,
            messages: [
              {
                prompt: `Para fazer com que o scroll da textarea vá para baixo automaticamente à medida que o usuário digita, você pode utilizar o seguinte código ajustado:
                import { Component, ElementRef, ViewChild } from '@angular/core';
                import { FormBuilder, FormGroup } from '@angular/forms';

                @Component({
                  selector: 'app-seu-componente',
                  templateUrl: './seu-componente.component.html',
                  styleUrls: ['./seu-componente.component.css']
                })
                export class SeuComponente {
                  messageForm: FormGroup;

                  @ViewChild('textarea', { static: false }) textarea: ElementRef;

                  constructor(private fb: FormBuilder) {
                    this.messageForm = this.fb.group({
                      input: [''] // Pode inicializar com um valor padrão, se necessário
                    });
                  }

                  onInput(event: Event): void {
                    this.adjustTextareaHeight();
                    this.scrollTextareaToBottom();
                  }

                  adjustTextareaHeight(): void {
                    const textareaElement = this.textarea.nativeElement;
                    textareaElement.style.overflowY = 'hidden'; // Garante que o scrollbar é escondido

                    // Definir a altura com base no scrollHeight
                    textareaElement.style.height = 'auto';
                    textareaElement.style.height = \`\${textareaElement.scrollHeight}px\`;

                    // Se a altura exceder 200 pixels, definir overflow para auto
                    if (textareaElement.scrollHeight > 200) {
                      textareaElement.style.overflowY = 'auto';
                      textareaElement.style.height = '200px';
                    }

                    // Contar o número de linhas e ajustar a altura conforme necessário
                    const lines = textareaElement.value.split('\n').length;
                    const lineHeight = 20; // Altura estimada de uma linha, ajuste conforme necessário

                    const newHeight = lines * lineHeight;
                    if (newHeight > textareaElement.scrollHeight) {
                      textareaElement.style.height = \`\${newHeight}px\`;
                    }
                  }

                  scrollTextareaToBottom(): void {
                    const textareaElement = this.textarea.nativeElement;
                    textareaElement.scrollTop = textareaElement.scrollHeight;
                  }
                }
                Agora, o método scrollTextareaToBottom é chamado sempre que há uma entrada de texto, garantindo que o scroll seja movido para baixo automaticamente. Certifique-se de ajustar os valores conforme necessário para atender aos requisitos específicos do seu projeto.`,
                prompt_time: new Date(Date.now()),
                completion: `## Markdown __rulez__!`,
                completion_time: new Date(Date.now()),
              },
            ],
          },
        });
      }, 500);
    });
  }
}
