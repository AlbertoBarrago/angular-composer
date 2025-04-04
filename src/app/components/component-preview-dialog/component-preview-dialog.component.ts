import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MockComponent } from '../../services/mock-library.service';

@Component({
    selector: 'app-component-preview-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    template: `
    <h2 mat-dialog-title>{{ data.name }} Preview</h2>
    <mat-dialog-content>
        <div class="preview-container">
            <div [innerHTML]="data.previewCode"></div>
        </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
        <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
    `,
    styles: [`
        .preview-container {
            padding: 20px;
            background: #f5f5f5;
            border-radius: 4px;
            min-width: 300px;
        }
    `]
})
export class ComponentPreviewDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ComponentPreviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MockComponent
    ) { }

    close(): void {
        this.dialogRef.close();
    }
}