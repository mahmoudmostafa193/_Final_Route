import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { WishlistComponent } from './layout/pages/wishlist/wishlist.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { authGuard } from './shared/guards/auth.guard';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { CategorydetailsComponent } from './layout/additions/categorydetails/categorydetails.component';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { ShippingAddressComponent } from './layout/additions/shipping-address/shipping-address.component';
import { AllordersComponent } from './layout/additions/allorders/allorders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'Cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'Wish list', component: WishlistComponent, canActivate: [authGuard] },
  { path: 'Products', component: ProductsComponent, canActivate: [authGuard] },
  {path: 'Catergories',component: CategoriesComponent,canActivate: [authGuard],},
  {path: 'ship/:cartId',component: ShippingAddressComponent,canActivate: [authGuard],},
  {path: 'categoryDetails/:id', component:CategorydetailsComponent ,canActivate: [authGuard],},
  {path: 'forgetPassword',component:ForgetpasswordComponent },
  { path: 'Brands', component: BrandsComponent, canActivate: [authGuard] },


  { path: 'allorders', component: AllordersComponent, canActivate: [authGuard] },



  
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'productdetails/:id', component:ProductDetailsComponent,canActivate:[authGuard]},
  { path: '**', component: NotfoundComponent },
];
