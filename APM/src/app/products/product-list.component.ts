import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Iproduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    // selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false ;
    errorMessage: string = '';
    sub!: Subscription
    
    private _listFilter: string = '';
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      console.log('In swetter', value);
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: Iproduct[] = [];

    products: Iproduct[] = [];

    constructor(private productService: ProductService) {}

    performFilter(filterBy: string): Iproduct[] {
      filterBy = filterBy.toLowerCase();
      return this.products.filter((product: Iproduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }
    ngOnInit(): void {
      this.sub = this. productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products
        },
        error: err => this.errorMessage = err
      });
      // this.listFilter = 'cart';
    }

    ngOnDestroy() {
      this.sub.unsubscribe();``
    }
    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }
}