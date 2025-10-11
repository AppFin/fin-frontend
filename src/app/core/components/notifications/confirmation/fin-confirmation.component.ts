import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FinDialogComponent } from '../../../../shared/components/generics/dialog/fin-dialog.component';
import { FinDialogFooterDirective } from '../../../../shared/components/generics/dialog/fin-dialog-footer.directive';
import { FinTextComponent } from '../../../../shared/components/generics/text/fin-text.component';
import { FinSeverity } from '../../../types/themes/fin-severity';
import { FinButtonComponent } from '../../../../shared/components/generics/button/fin-button.component';

export type FinConfirmationData = {
  title: string;
  text: string;
  icon: string | null;
  severity: FinSeverity;
};

@Component({
  selector: 'fin-confirmation',
  imports: [
    FinDialogComponent,
    FinDialogFooterDirective,
    FinTextComponent,
    FinButtonComponent,
  ],
  templateUrl: './fin-confirmation.component.html',
  styleUrl: './fin-confirmation.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FinConfirmationComponent {
  public readonly data = inject<FinConfirmationData>(MAT_DIALOG_DATA);
  public readonly dialogRef = inject(
    MatDialogRef<FinConfirmationComponent, boolean>
  );

  public confirm(confirmed: boolean): void {
    this.dialogRef.close(confirmed);
  }
}

