import { PagedFilteredAndSortedInput } from '../models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../models/paginations/paged-output';

/**
 * Applies filtering, sorting, and pagination to a list of generic entities.
 * The operations are performed in the standard API order: Filter -> Sort -> Page.
 *
 * @param data The complete list of entities of type T.
 * @param input The input object containing filter, sort, and pagination settings.
 * @returns A PagedOutput<T> object with the processed items and the total count of records after filtering.
 */
export function applyPagingFilteringAndSorting<T extends object>(
  data: T[],
  input: PagedFilteredAndSortedInput
): PagedOutput<T> {
  // 1. Clone the original list to ensure the input array remains unmodified
  let processedData = [...data];

  // 2. APPLY FILTERING
  if (input.filter && input.filter.property && input.filter.filter) {
    const { property, filter } = input.filter;
    const filterLower = filter.toLowerCase();

    processedData = processedData.filter((item) => {
      const value = (item as any)[property];

      if (value !== undefined && value !== null) {
        const valueLower = String(value).toLowerCase();
        return valueLower.includes(filterLower);
      }
      return false;
    });
  }

  // 3. APPLY SORTING
  if (input.sorts && input.sorts.length > 0) {
    processedData.sort((a, b) => {
      for (const sort of input.sorts!) {
        const prop = sort.property;
        const desc = sort.desc;

        // Dynamic access to values
        const valA = (a as any)[prop];
        const valB = (b as any)[prop];

        // Comparison logic (handles strings and numbers)
        let comparison = 0;

        if (typeof valA === 'string' && typeof valB === 'string') {
          // Use localeCompare for better string sorting (accents, case-insensitive)
          comparison = valA.localeCompare(valB);
        } else if (valA > valB) {
          comparison = 1;
        } else if (valA < valB) {
          comparison = -1;
        }

        if (comparison !== 0) {
          return desc ? comparison * -1 : comparison;
        }
      }
      return 0;
    });
  }

  const totalCount = processedData.length;

  // 4. APPLY PAGINATION
  const skip = input.skipCount >= 0 ? input.skipCount : 0;
  const take = input.maxResultCount > 0 ? input.maxResultCount : totalCount;

  const pagedItems = processedData.slice(skip, skip + take);

  // 5. Return the PagedOutput
  return {
    items: pagedItems,
    totalCount: totalCount,
  };
}