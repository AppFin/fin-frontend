import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { PeopleService } from '../../../services/people/person.service';
import { PersonOutput } from '../../../types/people/person-output';
import { FinMultiSelectComponent } from '../../generics/multi-select/fin-multi-select.component';
import { FinSelectComponentOptions } from '../../generics/select/fin-select-component-options';
import { FinSelectOption } from '../../generics/select/fin-select-option';

@Component({
  selector: 'fin-person-multi-select',
  imports: [FinMultiSelectComponent],
  templateUrl: './person-multi-select.component.html',
  styleUrl: './person-multi-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonMultiSelectComponent {
  @Input() public formControl: FormControl<string[]>;

  public readonly label = input('finCore.features.person.title');
  public readonly readonly = input(false);
  public readonly maxSelectedLabels = input(10);
  public readonly customErrorText = input<string>();
  public readonly helpText = input<string>('');
  public readonly id = input(
    `fin-person-multi-select-${Math.random().toString(36).substring(2, 9)}`
  );

  public readonly inactivatedFilter = input<boolean | undefined>(undefined);

  public readonly selectOptions = new FinSelectComponentOptions<
    string,
    PersonOutput
  >({
    getOptions: this.getPersonOptions.bind(this),
  });

  private readonly personService = inject(PeopleService);

  private getPersonOptions(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<FinSelectOption<string, PersonOutput>>> {
    const persons = this.personService.getListCached({
      ...input,
      inactivated: this.inactivatedFilter(),
    });

    return of({
      totalCount: persons.totalCount,
      items: persons.items.map(
        (item) =>
          ({
            label: item.name,
            value: item.id,
            customValue: item,
          }) as FinSelectOption<string, PersonOutput>
      ),
    });
  }
}
