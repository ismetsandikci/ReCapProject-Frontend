import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) { }

  Authenticated: boolean;
   ngOnInit(): void {
    this.isAuthenticated();
  }

  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.Authenticated = true;
      this.getByUserDetail();
    } else {
      this.Authenticated = false;
    }
  }

  getByUserDetail() {
    this.userService.getbyid(Number(this.localStorageService.get('userid'))).subscribe((response) => {
      this.user = response.data;
    },
    responseError=>{
      this.toastrService.error(responseError,"nav getByUserId");
    });
  }

  logOut() {
    this.localStorageService.clear();
    this.toastrService.info('Çıkış Yapıldı', 'Bilgi');
    setTimeout(function () {
      window.location.reload();
    }, 400);
  }
}
