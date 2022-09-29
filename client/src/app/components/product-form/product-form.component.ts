import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    imageURL: ''
  };

  edit: boolean = false;

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params['id']!==undefined) {
      this.productService.getProduct(params['id'])
        .subscribe(
          res => {
            this.product = res;
            this.edit = true;
          }
        )
    }


  }

  submitProduct() {
    this.productService.createProduct(this.product)
      .subscribe(
        res => {
          this.router.navigate(['/product']);
        }
      );
  }

  updateProduct(){
    delete this.product.createdAt;
    this.productService.updateProduct(this.product._id!, this.product)
      .subscribe(
        res => {

          this.router.navigate(['/product'])
        }
      );
  }

}
