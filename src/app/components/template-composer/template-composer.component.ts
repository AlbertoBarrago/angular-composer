import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ComponentListComponent } from '../component-list/component-list.component';
import { MockComponent } from '../../services/mock-library.service';

@Component({
  selector: 'app-template-composer',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    ComponentListComponent
  ],
  template: `
    <div class="composer-container">
      <div class="components-panel">
        <app-component-list></app-component-list>
      </div>
      
      <div 
        class="preview-panel"
        [class.dragover]="isDragOver"
        (dragenter)="isDragOver = true"
        (dragleave)="isDragOver = false"
        [class.dragover]="isDragOver"
        cdkDropList
        id="preview-panel"
        [cdkDropListData]="droppedComponents"
        [cdkDropListConnectedTo]="['component-list']"
        (cdkDropListDropped)="onDrop($event)">
        <h2>Template Preview</h2>
        
        <div *ngIf="droppedComponents.length === 0" class="empty-state">
          <mat-icon>drag_indicator</mat-icon>
          <p>Drag components here to build your template</p>
        </div>

        <div *ngFor="let component of droppedComponents; let i = index" class="preview-item">
          <div class="preview-item-header">
            <mat-icon>{{ component.icon }}</mat-icon>
            <span>{{ component.name }}</span>
            <button mat-icon-button color="warn" (click)="removeComponent(i)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
          <div class="preview-item-content" [innerHTML]="component.previewCode"></div>
        </div>

        <div *ngIf="droppedComponents.length > 0" class="export-button">
          <button mat-raised-button color="primary" (click)="exportTemplate()">
            <mat-icon>code</mat-icon>
            Export Template
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .composer-container {
      display: grid;
      grid-template-columns: 400px 1fr;
      gap: 20px;
      height: calc(100vh - 64px);
      padding: 20px;
    }

    .components-panel {
      background: #f5f5f5;
      border-radius: 8px;
      overflow-y: auto;
    }

    .preview-panel {
      background: white;
      border-radius: 8px;
      padding: 20px;
      min-height: 300px;
      overflow-y: auto;
      position: relative;
      z-index: 1;
      transition: all 0.3s ease;
    }

    .preview-panel.dragover {
      border: 2px dashed #2196F3;
      background: rgba(33, 150, 243, 0.04);
    }

    .cdk-drag-preview {
      z-index: 1000;
      box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2),
                0 8px 10px 1px rgba(0,0,0,0.14),
                0 3px 14px 2px rgba(0,0,0,0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0.3;
      background: #ccc;
      border: 2px dashed #999;
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: #666;
    }

    .empty-state mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }

    .preview-item {
      margin: 16px 0;
      padding: 16px;
      border: 1px solid transparent;
      border-radius: 4px;
      position: relative;
      transition: all 0.3s ease;
    }

    .preview-item:hover {
      border-color: #e0e0e0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .preview-item-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid transparent;
      opacity: 0;
      transition: all 0.3s ease;
    }

    .preview-item:hover .preview-item-header {
      opacity: 1;
      border-bottom-color: #eee;
    }

    .preview-item-content {
      padding: 8px;
      background: #f9f9f9;
      border-radius: 4px;
    }

    .export-button {
      margin-top: 20px;
      text-align: center;
    }
  `]
})
export class TemplateComposerComponent {
  isDragOver = false;
  droppedComponents: MockComponent[] = [];

  onDrop(event: CdkDragDrop<MockComponent[]>) {
    this.isDragOver = false;
    if (event.previousContainer === event.container) {
      return;
    }

    const component = event.item.data;
    this.droppedComponents.push({ ...component });
  }

  removeComponent(index: number) {
    this.droppedComponents.splice(index, 1);
  }

  exportTemplate() {
    const template = this.droppedComponents
      .map(component => component.previewCode)
      .join('\n');

    // For now, just log the template
    console.log('Exported Template:', template);
    // TODO: Implement actual file download or copying to clipboard
  }
}