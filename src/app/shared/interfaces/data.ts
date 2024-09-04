
export interface Data {
  name: string,
  email:string,
  password:string,
  rePassword:string,
  phone:string
}
export interface LoginData {
  
  email:string,
  password:string,
   
}
export interface email{
  email:string
}
export interface address{
  details: string;
  phone: string;
  city: string; 
}
export interface code{
  resetCode:string
}
export interface repassword{
 email:string,
    newPassword: string
}


