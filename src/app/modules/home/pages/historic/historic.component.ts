import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { ConversationService } from '../../../../services/conversation.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { Conversation } from '../../../../types/conversation.type';
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

  conversations: Array<Conversation> = [];

  constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
    this.conversationService.list().subscribe((response) => {
      this.conversations = response.data;
    });
  }
}
