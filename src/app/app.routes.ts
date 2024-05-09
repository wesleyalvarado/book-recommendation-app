import { Routes, RouterOutlet, RouterLink } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { BookRecommendationsComponent } from './book-recommendations/book-recommendations.component';
import { AboutComponent } from './about/about.component';

 export const routes: Routes = [
    { path: 'chat', component: ChatComponent },
    { path: 'book-recommendations', component: BookRecommendationsComponent },
    { path: 'about', component: AboutComponent },

];
