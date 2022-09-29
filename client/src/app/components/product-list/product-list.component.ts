import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  today = new Date('December 17, 1995 03:24:00')

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(
        res => {
          this.products = res;
        }
      );
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(
        res => {
          this.getProducts();
        }
      )
  }

}
