// -------------------------------------------------------------------
// API FETCH FUNCTION CONTRACT
// -------------------------------------------------------------------

import { PagedFilteredAndSortedInput } from '../models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../models/paginations/paged-output';
import { firstValueFrom, Observable } from 'rxjs';

/**
 * Defines the contract for the asynchronous API fetch function.
 * This function must accept a filter object (containing paging details)
 * and return a promise that resolves to a paginated output.
 *
 * @template TEntity The type of the entity being fetched.
 * @template TFilter The type of the input filter object.
 * @param filter The filter object, including skipCount and maxResultCount.
 * @returns A Promise resolving to the paginated result (PagedOutput<TEntity>).
 */
export type ApiFetchFunction<TEntity extends object, TFilter extends PagedFilteredAndSortedInput> = (
  filter: TFilter
) => Observable<PagedOutput<TEntity>>;


// -------------------------------------------------------------------
// GENERIC CHUNK-FETCHING METHOD
// -------------------------------------------------------------------

/**
 * Fetches all items from an asynchronous data source by iterating through chunks (batches).
 * The batch size is determined by the `maxResultCount` property in the filter object.
 * This approach is crucial for handling large datasets without performance issues.
 *
 * @template TEntity The type of the entity to be collected.
 * @template TFilter The type of the input filter object.
 * @param fetcher The asynchronous function (API call) responsible for fetching a single batch.
 * @param initialFilter The base filter object containing criteria and the chunk size (maxResultCount).
 * @returns A Promise that resolves to an array containing ALL collected entities.
 */
export async function fetchAllItemsInChunks<
  TEntity extends object,
  TFilter extends PagedFilteredAndSortedInput,
>(
  fetcher: ApiFetchFunction<TEntity, TFilter>,
  initialFilter: TFilter,
): Promise<TEntity[]> {
  const allItems: TEntity[] = [];
  let currentSkipCount = initialFilter.skipCount || 0;
  const maxResultCount = initialFilter.maxResultCount || 100;

  // Clone the initial filter to safely update paging parameters during iteration
  const currentFilter: TFilter = { ...initialFilter } as TFilter;

  while (true) {
    currentFilter.skipCount = currentSkipCount;
    currentFilter.maxResultCount = maxResultCount;

    const output = await firstValueFrom(fetcher(currentFilter));
    const chunk = output.items;

    allItems.push(...chunk);

    // Stop Condition: If the returned chunk size is less than the requested batch size,
    // it means we have reached the end of the data.
    if (chunk.length < maxResultCount) {
      break;
    }

    // Move to the next page
    currentSkipCount += maxResultCount;
  }

  return allItems;
}