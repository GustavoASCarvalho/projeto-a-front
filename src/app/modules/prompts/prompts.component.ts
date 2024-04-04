import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-prompts',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './prompts.component.html',
  styleUrl: './prompts.component.scss',
})
export class PromptsComponent implements OnInit {
  prompts = [] as any[];

  ngOnInit(): void {
    this.prompts.push(
      {
        template_id: 1,
        slug: '18958656-78d2-42f9-b9e9-e44cece98e27',
        user_id: 1,
        logo_url: 'http://localhost:31321',
        name: 'Layla',
        description: 'A helper to create and manage prisma schemas',
        prompt:
          'Olá, meu nome é {{nome}}, moro em {{cidade}}, um resumo sobre mim {{resumo}}, {{1}} {{2}} {{3}}',
        visibility: 'PUBLIC',
        created_at: '2024-03-09T16:13:18.681Z',
        updated_at: '2024-03-09T16:13:18.681Z',
        template_history: [
          {
            template_history_id: 1,
            name: 'Layla',
            description: 'A helper to create and manage prisma schemas',
            prompt:
              'Olá, meu nome é {{nome}}, moro em {{cidade}}, um resumo sobre mim {{resumo}}, {{1}} {{2}} {{3}}',
            logo_url: 'http://localhost:31321',
            visibility: 'PUBLIC',
            created_at: '2024-03-09T16:13:18.681Z',
            template_id: 1,
          },
        ],
      },
      {
        template_id: 2,
        slug: 'eed67f46-ebe2-434a-9a37-5c76203734f9',
        user_id: 1,
        logo_url: 'http://localhost:31321',
        name: 'Testee',
        description: 'A helper to create and manage prisma schemas',
        prompt:
          'Olá, meu nome é {{nome}}, moro em {{cidade}}, um resumo sobre mim {{resumo}}, {{1}} {{2}} {{3}}',
        visibility: 'PUBLIC',
        created_at: '2024-03-09T20:11:19.557Z',
        updated_at: '2024-03-09T20:11:19.557Z',
        template_history: [
          {
            template_history_id: 2,
            name: 'Testee',
            description: 'A helper to create and manage prisma schemas',
            prompt:
              'Olá, meu nome é {{nome}}, moro em {{cidade}}, um resumo sobre mim {{resumo}}, {{1}} {{2}} {{3}}',
            logo_url: 'http://localhost:31321',
            visibility: 'PUBLIC',
            created_at: '2024-03-09T20:11:19.557Z',
            template_id: 2,
          },
        ],
      },
    );
  }
}
