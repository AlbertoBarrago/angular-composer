import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TemplateComposerComponent } from './components/template-composer/template-composer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    TemplateComposerComponent
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Angular Component Composer</span>
    </mat-toolbar>
    
    <app-template-composer></app-template-composer>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class AppComponent {
}
