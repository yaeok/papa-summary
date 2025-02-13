export class ProductCategoryDB {
  private id: string
  private productId: string
  private categoryId: string

  constructor() {
    this.id = ''
    this.productId = ''
    this.categoryId = ''
  }

  getId(): string {
    return this.id
  }

  setId(id: string): void {
    this.id = id
  }

  getProductId(): string {
    return this.productId
  }

  setProductId(productId: string): void {
    this.productId = productId
  }

  getCategoryId(): string {
    return this.categoryId
  }

  setCategoryId(categoryId: string): void {
    this.categoryId = categoryId
  }
}
