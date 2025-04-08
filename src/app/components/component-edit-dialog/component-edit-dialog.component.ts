import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-component-edit-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    template: `
    <h2 mat-dialog-title>Edit Component Content</h2>
    <mat-dialog-content>
        <p class="hint">Edit the HTML content below to customize this component:</p>
        <mat-form-field appearance="outline" class="content-field">
            <textarea
                matInput
                [(ngModel)]="data.content"
                rows="10"
                placeholder="Enter HTML content"></textarea>
        </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" (click)="onSave()">Save Changes</button>
    </mat-dialog-actions>
    `,
    styles: [`
        .hint {
            color: #666;
            margin-bottom: 16px;
        }
        .content-field {
            width: 100%;
        }
        textarea {
            font-family: monospace;
            font-size: 14px;
        }
    `]
})
export class ComponentEditDialog {
    constructor(
        public dialogRef: MatDialogRef<ComponentEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: { content: string }
    ) { }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        this.dialogRef.close(this.data.content);
    }
}