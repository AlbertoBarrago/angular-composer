import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MockLibraryService, MockComponent } from '../../services/mock-library.service';
import { ComponentPreviewDialogComponent } from '../component-preview-dialog/component-preview-dialog.component';

@Component({
  selector: 'app-component-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatDialogModule
  ],
  template: `
    <div class="component-list">
      <h2>Available Components</h2>
      <div class="component-grid" cdkDropList id="component-list" [cdkDropListConnectedTo]="['preview-panel']">
        <mat-card 
          *ngFor="let component of components" 
          class="component-card"
          cdkDrag
          [cdkDragData]="component"
          cdkDragPreview>
          <mat-card-header>
            <mat-icon>{{ component.icon }}</mat-icon>
            <mat-card-title>{{ component.name }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{ component.description }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" (click)="previewComponent(component)">
              PREVIEW
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .component-list {
      padding: 20px;
    }
    
    .component-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .component-card {
      cursor: move;
      position: relative;
      z-index: 1;
    }
    
    .component-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    :host ::ng-deep .cdk-drag-preview {
      z-index: 1000;
      box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2),
                0 8px 10px 1px rgba(0,0,0,0.14),
                0 3px 14px 2px rgba(0,0,0,0.12);
      background: white;
      border-radius: 4px;
      padding: 16px;
      transform: scale(0.9);
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    :host ::ng-deep .cdk-drag-placeholder {
      opacity: 0.3;
      background: #ccc;
      border: 2px dashed #999;
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    
    mat-card-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    mat-icon {
      color: #5c6bc0;
    }
  `]
})
export class ComponentListComponent {
  components: MockComponent[] = [];

  constructor(
    private mockLibraryService: MockLibraryService,
    private dialog: MatDialog
  ) {
    this.components = this.mockLibraryService.getComponents();
  }

  previewComponent(component: MockComponent) {
    this.dialog.open(ComponentPreviewDialogComponent, {
      data: component,
      width: '500px'
    });
  }
}