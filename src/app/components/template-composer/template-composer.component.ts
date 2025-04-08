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
        cdkDropList
        id="preview-panel"
        [cdkDropListData]="droppedComponents"
        [cdkDropListConnectedTo]="['component-list']"
        (cdkDropListDropped)="onDrop($event)"
        [cdkDropListSortingDisabled]="false">
        <h2>Template Preview</h2>
        
        <div *ngIf="droppedComponents.length === 0" class="empty-state">
          <mat-icon>drag_indicator</mat-icon>
          <p>Drag components here to build your template</p>
        </div>

        <div *ngFor="let component of droppedComponents; let i = index" cdkDrag>
          <!-- Header Container -->
          <div *ngIf="component.id === 'header'"
               class="container-zone"
               cdkDropList
               id="header-zone"
               [cdkDropListData]="headerComponents"
               [cdkDropListConnectedTo]="['component-list']"
               (cdkDropListDropped)="onDrop($event)">
            <div class="preview-item">
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
            </div>
            <!-- Nested Components in Header -->
            <div *ngFor="let nestedComp of headerComponents; let j = index" class="nested-component">
              <div class="preview-item">
                <div class="preview-item-header">
                  <mat-icon>{{ nestedComp.icon }}</mat-icon>
                  <span>{{ nestedComp.name }}</span>
                  <button mat-icon-button color="warn" (click)="headerComponents.splice(j, 1)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
                <div class="preview-item-content" [innerHTML]="nestedComp.customContent || nestedComp.previewCode"></div>
              </div>
            </div>
          </div>

          <!-- Main Content Area -->
          <div *ngIf="component.id !== 'header' && component.id !== 'footer'"
               class="preview-item"
               cdkDrag>
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
          </div>

          <!-- Footer Container -->
          <div *ngIf="component.id === 'footer'"
               class="container-zone"
               cdkDropList
               id="footer-zone"
               [cdkDropListData]="footerComponents"
               [cdkDropListConnectedTo]="['component-list']"
               (cdkDropListDropped)="onDrop($event)">
            <div class="preview-item">
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
            </div>
            <!-- Nested Components in Footer -->
            <div *ngFor="let nestedComp of footerComponents; let j = index" class="nested-component">
              <div class="preview-item">
                <div class="preview-item-header">
                  <mat-icon>{{ nestedComp.icon }}</mat-icon>
                  <span>{{ nestedComp.name }}</span>
                  <button mat-icon-button color="warn" (click)="footerComponents.splice(j, 1)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
                <div class="preview-item-content" [innerHTML]="nestedComp.customContent || nestedComp.previewCode"></div>
              </div>
            </div>
          </div>
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
  droppedComponents: (MockComponent & { customContent?: string; parentId?: string })[] = [];
  headerComponents: (MockComponent & { customContent?: string })[] = [];
  footerComponents: (MockComponent & { customContent?: string })[] = [];

  constructor(private dialog: MatDialog) { }

  onDrop(event: CdkDragDrop<MockComponent[]>) {
    this.isDragOver = false;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }

    const component = { ...event.item.data };
    const dropZoneId = event.container.id;

    if (dropZoneId === 'header-zone' && component.id !== 'header') {
      this.headerComponents.push(component);
    } else if (dropZoneId === 'footer-zone' && component.id !== 'footer') {
      this.footerComponents.push(component);
    } else if (component.id === 'header' || component.id === 'footer') {
      this.droppedComponents.push(component);
    } else {
      this.droppedComponents.push(component);
    }

    // Open edit dialog for content sections
    if (component.category === 'Layout') {
      const index = this.droppedComponents.length - 1;
      this.openEditDialog(index);
    }
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

  openEditDialog(index: number) {
    const component = this.droppedComponents[index];
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