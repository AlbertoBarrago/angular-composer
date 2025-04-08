import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ComponentListComponent } from '../component-list/component-list.component';
import { MockComponent } from '../../services/mock-library.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ColumnSelectDialogComponent } from '../column-select-dialog/column-select-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ComponentEditDialog } from '../component-edit-dialog/component-edit-dialog.component';

@Component({
  selector: 'app-template-composer',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    ComponentListComponent,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
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
        (dragover)="$event.preventDefault()"
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

        <div *ngFor="let component of droppedComponents; let i = index" 
          cdkDrag
          [cdkDragData]="component"
          class="preview-item"
          [class.hover-highlight]="isHoveringComponent && hoverIndex === i"
          (dragenter)="onDragEnter(i)"
          (dragleave)="onDragLeave()"
          (dragover)="$event.preventDefault(); updateSplitDirection($event, i)"
          [cdkDragBoundary]="'.preview-panel'">
          <div class="preview-item-header">
            <mat-icon>{{ component.icon }}</mat-icon>
            <span>{{ component.name }}</span>
            <button mat-icon-button color="warn" (click)="removeComponent(i)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
          <div class="preview-item-content" [innerHTML]="component.customContent || component.previewCode"></div>
          <div class="preview-item-actions">
            <button mat-button color="primary" (click)="openEditDialog(i)">
              <mat-icon>edit</mat-icon>
              Edit Content
            </button>
          </div>
          <div *ngIf="isHoveringComponent && hoverIndex === i" 
            class="split-indicator" 
            [class.left]="splitDirection === 'left'"
            [class.right]="splitDirection === 'right'"></div>
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

    .container-zone {
      border: 2px dashed #e0e0e0;
      border-radius: 4px;
      padding: 16px;
      margin: 16px 0;
      min-height: 100px;
      transition: all 0.3s ease;
    }

    .container-zone:hover {
      border-color: #2196F3;
      background: rgba(33, 150, 243, 0.04);
    }

    .nested-component {
      margin-left: 24px;
      margin-top: 8px;
      border-left: 2px solid #e0e0e0;
      padding-left: 16px;
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
      cursor: move;
      user-select: none;
    }

    .preview-item:active {
      cursor: grabbing;
    }

    .preview-item.hover-highlight {
      border: 2px dashed #ffd700;
      background: rgba(255, 215, 0, 0.05);
      position: relative;
    }

    .split-indicator {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: #ffd700;
      z-index: 2;
    }

    .split-indicator.left {
      left: -2px;
    }

    .split-indicator.right {
      right: -2px;
    }

    .split-container {
      display: grid;
      gap: 20px;
      margin: 16px 0;
    }

    .split-container[data-columns="2"] {
      grid-template-columns: repeat(2, 1fr);
    }

    .split-container[data-columns="3"] {
      grid-template-columns: repeat(3, 1fr);
    }

    .split-container[data-columns="4"] {
      grid-template-columns: repeat(4, 1fr);
    }

    .left-column, .right-column {
      flex: 1;
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      position: relative;
    }

    .split-indicator {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: #ffd700;
      z-index: 2;
    }

    .split-indicator.left {
      left: -2px;
    }

    .split-indicator.right {
      right: -2px;
    }

    .preview-item.hover-highlight {
      border: 2px dashed #ffd700;
      background: rgba(255, 215, 0, 0.05);
      position: relative;
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
  isHoveringComponent = false;
  hoverIndex = -1;
  splitDirection: string = 'left';
  droppedComponents: (MockComponent & { customContent?: string })[] = [];

  constructor(private dialog: MatDialog) { }

  onDragEnter(index: number) {
    this.isHoveringComponent = true;
    this.hoverIndex = index;
  }

  onDragLeave() {
    this.isHoveringComponent = false;
    this.hoverIndex = -1;
  }

  onDrop(event: CdkDragDrop<MockComponent[]>) {
    this.isDragOver = false;
    this.isHoveringComponent = false;

    if (event.previousContainer === event.container) {
      moveItemInArray(this.droppedComponents, event.previousIndex, event.currentIndex);
    } else {
      const component = { ...event.item.data };

      if (this.hoverIndex !== -1) {
        const targetComponent = this.droppedComponents[this.hoverIndex];

        if (component.category === 'Layout' || targetComponent.category === 'Layout') {
          const dialogRef = this.dialog.open(ColumnSelectDialogComponent, {
            width: '400px',
            data: { direction: this.splitDirection }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              const columns = result.columns;
              const splitContainer = `
                <div class="split-container" data-columns="${columns}">
                  ${Array(columns).fill('').map(() => '<div class="column"></div>').join('')}
                </div>
              `;

              this.droppedComponents[this.hoverIndex] = {
                ...targetComponent,
                customContent: splitContainer
              };
            } else {
              this.droppedComponents.splice(this.hoverIndex + 1, 0, component);
            }
          });
        } else {
          this.droppedComponents.splice(this.hoverIndex + 1, 0, component);
        }
      } else {
        this.droppedComponents.push(component);
      }
    }

    this.hoverIndex = -1;
  }

  removeComponent(index: number) {
    this.droppedComponents.splice(index, 1);
  }

  exportTemplate() {
    const template = this.droppedComponents
      .map(component => component.customContent || component.previewCode)
      .join('\n');

    // Create a download link
    const blob = new Blob([template], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.html';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  updateSplitDirection(event: DragEvent, index: number) {
    if (!this.isHoveringComponent || this.hoverIndex !== index) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const threshold = rect.width / 2;

    this.splitDirection = mouseX < threshold ? 'left' : 'right';
  }

  openEditDialog(index: number) {
    if (index < 0 || index >= this.droppedComponents.length) return;

    const component = this.droppedComponents[index];
    if (!component) return;

    const dialogRef = this.dialog.open(ComponentEditDialog, {
      width: '600px',
      data: { content: component.customContent || component.previewCode }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.droppedComponents[index] = {
          ...component,
          customContent: result
        };
      }
    });
  }
}