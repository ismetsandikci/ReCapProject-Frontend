import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService: LocalStorageService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email : ["",Validators.required],
      password : ["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response)=>{
          this.toastrService.success(response.message,"Giriş yapılıyor");

          this.userService.getbymail(loginModel.email).subscribe(
            (responseUser)=>{
              this.localStorageService.add("token",response.data.token);
              this.localStorageService.add("userid",responseUser.data.userId);
            },
            (responseErrorUser)=>{
              this.toastrService.error(responseErrorUser.error,"Giriş Hatası");
            }
          )
          
          setTimeout(() => {
            setTimeout(function () {
              window.location.reload();
            });
            this.router.navigate(['/cars']);
          }, 2000);
        },
        (responseError)=>{
          this.toastrService.error(responseError.error,"Giriş Hatası");
        }
      )
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat");
    }
  }
}
