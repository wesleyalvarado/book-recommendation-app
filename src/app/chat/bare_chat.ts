// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent {
//   userInput: string = '';
//   messages: { sender: string, content: string }[] = [];

//   constructor() {}

//   sendMessage() {
//     if (this.userInput.trim() !== '') {
//       // Add user message to the chat interface
//       this.messages.push({ sender: 'user', content: this.userInput });

//       // Simulate chatbot response (replace with actual API call)
//       this.messages.push({ sender: 'chatbot', content: 'Hello! How can I help you?' });

//       // Clear user input
//       this.userInput = '';
//     }
//   }
// }