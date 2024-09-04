import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin:boolean=false;
constructor(private _FlowbiteService:FlowbiteService,public _AuthService:AuthService,private  _ProductService:ProductService)
{
}

ngOnInit(): void {

  this._FlowbiteService.loadFlowbite(flowbite => {
    // Your custom code here
    console.log('Flowbite loaded', flowbite);
  
  });
  this._AuthService.userData.subscribe({

next:()=>{
if(this._AuthService.userData.getValue()!=null)
{
  this.isLogin=true;
}
else{
  this.isLogin=false;
}
}
  })
}

}
