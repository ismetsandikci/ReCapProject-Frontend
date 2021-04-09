import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Findeks } from 'src/app/models/findeks';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  customerAddForm: FormGroup;
  customerUpdateForm: FormGroup;
  findeksForm: FormGroup;

  user: User;
  customer : Customer;
  customerId : number;
  findeks: Findeks;

  IsCustomer : boolean;
  isThereFindeksScore: boolean = false;
  
  constructor(
    private customerService: CustomerService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private findeksService: FindeksService,
  ) { }

  ngOnInit(): void {
    this.createCustomerUpdateForm();
    this.createCustomerAddForm();
    this.createFindeksForm();
    
    this.getUserDetail();
  }

  getUserDetail(){
    this.userService.getbyid(Number(this.localStorageService.get('userid'))).subscribe(
      (response) => {
        this.user = response.data;
        this.checkIsCustomer(this.user.userId);
      },
      (responseError)=>{
        this.toastrService.error(responseError,"Kullanıcı Bilgiler Getirilemedi");
        setTimeout(() => {
          this.router.navigate(['/cars']);
        }, 3000);
      }
    );
  }

  checkIsCustomer(userId:number){
    this.customerService.getbyuserid(userId).subscribe(
      (response) => {
        this.customer = response.data;
        if(!this.customer){
          this.IsCustomer = false;
          this.customerAddForm.get('userId').setValue(userId);
        }
        else{
          this.IsCustomer = true;
          this.customerId = this.customer.customerId;
          this.customerUpdateForm.get('customerId').setValue(this.customerId);
          this.customerUpdateForm.get('userId').setValue(this.customer.userId);
          this.customerUpdateForm.get('companyName').setValue(this.customer.companyName);

          
          this.getFindeksDetail(this.customerId);
        }
      },
      (responseError)=>{
        this.toastrService.error(responseError,"Müşteri Bilgileri Getirilemedi");
      }
    );
  }

  createCustomerUpdateForm(){
    this.customerUpdateForm = this.formBuilder.group({
      customerId:["",Validators.required],
      userId:["",Validators.required],
      companyName:["",Validators.required]
    })
  }

  update() {
    if (this.customerUpdateForm.valid) {
      let customerModel = Object.assign({}, this.customerUpdateForm.value);
      this.customerService.update(customerModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (responseError) => {
          this.toastrService.error(responseError,"Customer Update Hatası");
        }
      );
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat");
    }
  }

  createCustomerAddForm(){
    this.customerAddForm = this.formBuilder.group({
      userId:["",Validators.required],
      companyName:["",Validators.required]
    })
  }

  addCustomer(){
    if (this.customerAddForm.valid) {
      let customerAddModel = Object.assign({}, this.customerAddForm.value);
      this.customerService.add(customerAddModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (responseError) => {
          this.toastrService.error(responseError,"Customer Add Hatası");
        }
      );
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat");
    }
  }

  createFindeksForm(){
    this.findeksForm = this.formBuilder.group({
      id:["",Validators.required],
      customerId:["",Validators.required],
      score:["",Validators.required]
    })
  }

  getFindeksDetail(customerId:number){
    this.findeksService.getByCustomerId(customerId).subscribe(
      (response) => {
        this.findeks = response.data;
        this.isThereFindeksScore = true;

        this.findeksForm.get('id').setValue(this.findeks.id);
        this.findeksForm.get('customerId').setValue(this.findeks.customerId);
        this.findeksForm.get('score').setValue(this.findeks.score);
      },
      (responseError)=>{
        if(responseError.data==null){
          this.isThereFindeksScore = false;
    
          console.log("boş geldi");
        }
        else{
          this.toastrService.error(responseError,"Findeks Bilgiler Getirilemedi");
          console.log(responseError)
        }
      }
    );
  }

  addFindeksScore(){
    let addFindeks: Findeks = {
      customerId: this.customerId
    };

    this.findeksService.add(addFindeks).subscribe(
      (response) => {
        this.toastrService.success(response.message,"Findeks Puanı Hesaplandı");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (responseError)=>{
        this.toastrService.error(responseError,"Findeks Puanı Hesaplanamadı");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    );
    console.log(addFindeks)
  }
}
