export enum ProductCategoryType {
  Electronics = 'electronics',
  Jewelery = 'jewelery',
  ClothesWomen = "women's clothing",
  ClothesMen = "men's clothing",
}

export interface IUseCase<P, R> {
  execute: (params: P) => R;
}
