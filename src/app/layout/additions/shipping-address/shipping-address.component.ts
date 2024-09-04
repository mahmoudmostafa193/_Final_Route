import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/services/order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {
shippingAddressForm:FormGroup=new FormGroup({
  details:new FormControl(null,[Validators.required]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city:new FormControl(null,[Validators.required,Validators.minLength(3)]),

})
constructor(private _OrderService:OrderService,private _ActivatedRoute:ActivatedRoute)
{}
submitshippingAddressForm()
{

  if(this.shippingAddressForm.valid)
  {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{

this._OrderService.checkOut(p.get('cartId')!,this.shippingAddressForm.value).subscribe({
  next:(res)=>{
    console.log(res)
    window.open(res.session.url,'_self');
  }
})
      }
    })

  }
console.log(this.shippingAddressForm.value)  
}
}
