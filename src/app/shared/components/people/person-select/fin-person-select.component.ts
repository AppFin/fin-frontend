import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { PeopleService } from '../../../services/people/person.service';
import { PersonOutput } from '../../../types/people/person-output';
import { FinSelectComponentOptions } from '../../generics/select/fin-select-component-options';
import { FinSelectOption } from '../../generics/select/fin-select-option';
import { FinSelectComponent } from '../../generics/select/fin-select.component';

@Component({
  selector: 'fin-person-select',
  imports: [FinSelectComponent],
  templateUrl: './fin-person-select.component.html',
  styleUrl: './fin-person-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinPersonSelectComponent {
  @Input() public formControl: FormControl<string | null>;

  public readonly label = input('finCore.features.person.titleSingular');
  public readonly readonly = input(false);
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly id = input(
    `fin-person-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly inactivatedFilter = input<boolean | undefined>(undefined);

  public readonly selectOptions = new FinSelectComponentOptions<
    string,
    PersonOutput
  >({
    getOptions: this.getPersonOptions.bind(this),
  });

  private readonly peopleService = inject(PeopleService);

  private getPersonOptions(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<FinSelectOption<string, PersonOutput>>> {
    const people = this.peopleService.getListCached({
      ...input,
      inactivated: this.inactivatedFilter(),
    });

    return of({
      totalCount: people.totalCount,
      items: people.items.map(
        (item) =>
          ({
            label: item.name,
            value: item.id,
            disabled:
              this.formControl.value == item.id ? false : item.inactivated,
            customValue: item,
          }) as FinSelectOption<string, PersonOutput>
      ),
    });
  }
}
