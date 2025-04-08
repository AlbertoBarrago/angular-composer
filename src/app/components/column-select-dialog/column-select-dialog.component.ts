import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

export interface ColumnSelectDialogData {
    componentName: string;
}

@Component({
    selector: 'app-column-select-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatRadioModule,
        FormsModule
    ],
    template: `
    <h2 mat-dialog-title>Split Layout</h2>
    <mat-dialog-content>
      <p>How would you like to split the layout for {{ data.componentName }}?</p>
      <mat-radio-group [(ngModel)]="selectedLayout" class="layout-options">
        <mat-radio-button value="2">2 Columns</mat-radio-button>
        <mat-radio-button value="3">3 Columns</mat-radio-button>
        <mat-radio-button value="4">4 Columns</mat-radio-button>
      </mat-radio-group>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onConfirm()">Confirm</button>
    </mat-dialog-actions>
  `,
    styles: [`
    .layout-options {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 20px 0;
    }
  `]
})
export class ColumnSelectDialogComponent {
    selectedLayout: string = '2';

    constructor(
        public dialogRef: MatDialogRef<ColumnSelectDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ColumnSelectDialogData
    ) { }

    onCancel(): void {
        this.dialogRef.close();
    }

    onConfirm(): void {
        this.dialogRef.close(parseInt(this.selectedLayout));
    }
}