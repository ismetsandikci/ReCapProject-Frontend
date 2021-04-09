import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userUpdateForm: FormGroup;
  changePasswordForm: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserDetail();
    this.createUserUpdateForm();
    this.createChangePasswordForm();
  }

  getUserDetail(){
    this.userService.getbyid(Number(this.localStorageService.get('userid'))).subscribe(
      (response) => {
        this.user = response.data;

        this.userUpdateForm.get('userId').setValue(this.user.userId);
        this.userUpdateForm.get('firstName').setValue(this.user.firstName);
        this.userUpdateForm.get('lastName').setValue(this.user.lastName);
        this.userUpdateForm.get('email').setValue(this.user.email);
        this.userUpdateForm.get('status').setValue(this.user.status);
      },
      (responseError)=>{
        this.toastrService.error(responseError,"Bilgiler Getirilemedi");
        setTimeout(() => {
          this.router.navigate(['/cars']);
        }, 3000);
      }
    );
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      userId:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      status:["",Validators.required],
    })
  }

  update() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      userModel.userId = Number(userModel.userId);
      userModel.passwordHash = this.user.passwordHash;
      userModel.passwordSalt = this.user.passwordSalt;
      userModel.status = Boolean(userModel.status);

      this.userService.update(userModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (responseError) => {
          this.toastrService.error(responseError,"User Update Hatası");
        }
      );
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat");
    }
  }

  createChangePasswordForm(){
    this.changePasswordForm = this.formBuilder.group({
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required]
    })
  }

  changePassword(){
    if (this.changePasswordForm.valid) {
      let changePasswordModel = Object.assign({}, this.changePasswordForm.value);
      this.toastrService.info("changePassword işlemi yazılmadı","Dikkat");
      console.log(changePasswordModel);
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat");
    }
  }
}
