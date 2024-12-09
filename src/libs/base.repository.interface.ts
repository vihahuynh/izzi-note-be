export interface BaseRepositoryInterface<T> {
  create(dto: Partial<T>): Promise<T>;
  findById(id: string): Promise<T>;
  findAll(condition: object): Promise<T[]>;
  update(id: string, dto: Partial<T>): Promise<T>;
  remove(id: string): Promise<T[]>;
}
