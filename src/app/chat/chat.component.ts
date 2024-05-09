import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent {
  loading: boolean = false;
  userInput: string = '';
  messages: { sender: string, content: string }[] = [];

  constructor(private apiService: ApiService) {}

  sendMessage() {
    if (this.userInput.trim() !== '') {
      // Add user message to the chat interface
      this.messages.push({ sender: 'user', content: this.userInput });

      // Send user message to the backend and get chatbot response
      this.loading = true; // Set loading state
      this.apiService.sendMessage(this.userInput).subscribe(
        (response: any) => {
          // Add chatbot response to the chat interface
          this.messages.push({ sender: 'chatbot', content: response });
        },
        (error) => {
          console.error('Error sending message:', error);
          // Handle error and add error message to chat interface
          this.messages.push({ sender: 'error', content: 'Error fetching chatbot response.' });
        },
        () => {
          this.loading = false; // Set loading state to false when request completes
        }
      );

      // Clear user input
      this.userInput = '';
    }
  }
}
