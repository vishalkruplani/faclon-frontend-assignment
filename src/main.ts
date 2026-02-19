import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // <--- Change 'App' to 'AppComponent'

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));