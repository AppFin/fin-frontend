import { IEntity } from '../../../interfaces/entities/i-entity';
import { PagedFilteredAndSortedInput } from '../../../models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../models/paginations/paged-output';
import { applyPagingFilteringAndSorting } from '../../../functions/apply-paging-filtering-and-sorting';
import {
  ApiFetchFunction,
  fetchAllItemsInChunks,
} from '../../../functions/fetch-all-items-in-chunks';

/**
 * @abstract
 * Base abstract class for services that manage entities in an in-memory cache (Map).
 * It centralizes cache access logic, manipulation, and the application of
 * paging, sorting, and structural filtering.
 *
 * @template TEntity The type of the stored entity (must be an object).
 * @template TFilter The type of the filter, which must extend PagedFilteredAndSortedInput.
 */
export abstract class CachedEntityService<
  TEntity extends IEntity,
  TFilter extends PagedFilteredAndSortedInput = PagedFilteredAndSortedInput,
> {
  // The primary cache storing entities by ID (string key)
  protected readonly cachedEntities = new Map<string, TEntity>();

  /**
   * Getter that returns the cached entities list as an array.
   * Useful for applying array methods like .filter(), .sort(), and .slice().
   */
  protected get entitiesList(): TEntity[] {
    return Array.from(this.cachedEntities.values());
  }

  // -------------------------------------------------------------------
  // PUBLIC QUERY METHODS
  // -------------------------------------------------------------------

  /**
   * Retrieves a specific entity from the cache by its ID.
   * @param id The key (ID) of the entity.
   * @returns The found entity or undefined.
   */
  public getCached(id: string): TEntity | undefined {
    return this.cachedEntities.get(id);
  }

  /**
   * Retrieves the cached entity list, applying the business filter first,
   * followed by text filtering, sorting, and pagination.
   *
   * The order of operations is:
   * 1. Structural/Business Filter (via `applyStructuralFilter`).
   * 2. Text Filtering, Sorting, and Paging (via `applyPagingFilteringAndSorting`).
   *
   * @param filter The filter and pagination input object.
   * @returns A PagedOutput containing the paginated list and the total count of records after all filtering.
   */
  public getListCached(filter: TFilter): PagedOutput<TEntity> {
    // 1. Apply the structural/business filter defined by the subclass
    const structurallyFilteredList = this.entitiesList.filter((entity) => {
      return this.applyStructuralFilter(entity, filter);
    });

    // 2. Apply text filtering, sorting, and pagination
    return applyPagingFilteringAndSorting(structurallyFilteredList, filter);
  }

  // -------------------------------------------------------------------
  // PUBLIC CACHE MANIPULATION METHODS
  // -------------------------------------------------------------------

  /**
   * Clears the entire cache, removing all stored entities.
   */
  public invalidateCache(): void {
    this.cachedEntities.clear();
  }

  /**
   * Fetches all entities from the external source by repeatedly calling the
   * `apiFetcherFn` in chunks, clears the current cache, and then loads the
   * retrieved entities into the cache.
   *
   * This method ensures large datasets are fetched efficiently in smaller batches
   * (`maxResultCount`) defined in the filter object.
   *
   * @param filter An optional filter object to apply structural/search criteria
   * to the external fetch operation. Uses a default empty filter if not provided.
   */
  public async loadCache(filter = {} as TFilter): Promise<void> {
    const items = await fetchAllItemsInChunks<TEntity, TFilter>(this.getList, filter);
    this.cachedEntities.clear();
    items.forEach(item => this.updateOrCreateOnCache(item));
  }

  // -------------------------------------------------------------------
  // PROTECTED METHODS (FOR SUBCLASS USE)
  // -------------------------------------------------------------------

  /**
   * Deletes a specific entity from the cache by its ID.
   * @param id The ID of the entity to be removed.
   */
  protected deleteCache(id: string): void {
    this.cachedEntities.delete(id);
  }

  /**
   * Updates or inserts an entity into the cache.
   * @param entity The entity object to be stored.
   */
  protected updateOrCreateOnCache(entity: TEntity): void {
    this.cachedEntities.set(entity.id, entity);
  }

  // -------------------------------------------------------------------
  // ABSTRACT METHODS (MUST BE IMPLEMENTED BY SUBCLASSES)
  // -------------------------------------------------------------------

  /**
   * @abstract
   * Must be implemented by the subclass to provide the function responsible for
   * fetching a paged output of entities from the external API or source.
   */
  public abstract getList: ApiFetchFunction<TEntity, TFilter>;

  /**
   * @abstract
   * Must be implemented by subclasses to define the structural or business
   * filtering logic (e.g., filter by `status === Active`, `belongsToUser`, etc.).
   * This filtering is applied *before* the generic pagination and sorting.
   *
   * @param entity The entity to be tested.
   * @param filter The filter input object.
   * @returns `true` if the entity should be kept in the list; `false` otherwise.
   */
  protected abstract applyStructuralFilter(entity: TEntity, filter: TFilter): boolean;
}