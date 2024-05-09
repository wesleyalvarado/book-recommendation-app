import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-recommendations.component.html',
  styleUrl: './book-recommendations.component.css',
})


export class BookRecommendationsComponent {
  loading: boolean = false;
  userInput: string = '';
  recommendations: any[] = [];
  error: string = '';
  lastRecommendation: any; // Declare the lastRecommendation variable
  private lastRecommendationSubscription: Subscription | undefined;

  constructor(private apiService: ApiService) {
    this.lastRecommendationSubscription = undefined;}

  getBookRecommendations() {
    if (this.userInput.trim() !== '') {
      this.loading = true; // Set loading state

      // Call the API service to fetch book recommendations
      this.apiService.getBookRecommendations(this.userInput).subscribe(
        (response: any[]) => {
          this.recommendations = response; // Assign response data to recommendations array
          this.error = ''; // Clear error message

          // After receiving recommendations, fetch the last recommendation
          this.getLastRecommendation();
        },
        (error) => {
          console.error('Error fetching book recommendations:', error);
          this.error = 'Error fetching book recommendations.'; // Display error message
        },
        () => {
          this.loading = false; // Set loading state to false when request completes
        }
      );
    }
  }

  // Function to fetch the last recommendation
  getLastRecommendation() {
    // Unsubscribe any previous subscription to avoid memory leaks
    if (this.lastRecommendationSubscription) {
      this.lastRecommendationSubscription.unsubscribe();
    }
  
    // Call the API service to fetch the last recommendation
    this.lastRecommendationSubscription = this.apiService.getLastRecommendation().subscribe({
      next: (response: any) => {
        this.lastRecommendation = response; // Assign last recommendation
      },
      error: (error) => {
        console.error('Error fetching last recommendation:', error);
        // Handle error if needed
      }
    });
  }
}
