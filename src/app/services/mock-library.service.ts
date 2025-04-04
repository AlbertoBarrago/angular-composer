import { Injectable } from '@angular/core';

export interface MockComponent {
    id: string;
    name: string;
    description: string;
    previewCode: string;
    category: string;
    icon: string;
}

@Injectable({
    providedIn: 'root'
})
export class MockLibraryService {
    private mockComponents: MockComponent[] = [
        {
            id: 'button-primary',
            name: 'Primary Button',
            description: 'A material design primary button with raised styling',
            previewCode: '<button mat-raised-button color="primary">Primary Button</button>',
            category: 'Buttons',
            icon: 'smart_button'
        },
        {
            id: 'card-basic',
            name: 'Basic Card',
            description: 'A material design card component with title and content areas',
            previewCode: `<mat-card>
        <mat-card-header>
          <mat-card-title>Card Title</mat-card-title>
          <mat-card-subtitle>Card Subtitle</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Card content goes here</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>ACTION</button>
        </mat-card-actions>
      </mat-card>`,
            category: 'Layout',
            icon: 'crop_square'
        }
    ];

    getComponents(): MockComponent[] {
        return this.mockComponents;
    }

    getComponentById(id: string): MockComponent | undefined {
        return this.mockComponents.find(comp => comp.id === id);
    }
}