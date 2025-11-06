import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FinTextComponent } from "../text/fin-text.component";

@Component({
  selector: 'fin-side-modal-layout',
  imports: [ReactiveFormsModule, FinTextComponent],
  templateUrl: './side-modal-layout.component.html',
  styleUrl: './side-modal-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideModalLayoutComponent {
  public readonly formGroup = input<FormGroup>();
  public readonly title = input('');

  public readonly hasFormGroup = computed(() => !this.formGroup());
  public readonly effectiveFormGroup = computed(() => this.formGroup() ?? new UntypedFormGroup({}));


}
