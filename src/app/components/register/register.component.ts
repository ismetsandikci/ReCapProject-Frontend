import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email : ["",Validators.required],
      password : ["",Validators.required],
      firstName : ["",Validators.required],
      lastName : ["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(
        (response)=>{
          this.toastrService.success(response.message,"Kayıt yapıldı");
          this.toastrService.info("Giriş sayfasına yönlendiriliyorsunuz");
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        (responseError)=>{
          this.toastrService.error(responseError.error,"Kayıt Hatası");
        }
      )
    }
  }

}
