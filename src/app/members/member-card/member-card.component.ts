import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyjsService } from 'src/app/_services/alertifyjs.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyjsService) {
  }

  ngOnInit() {
  }

  setLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.user.isLiked = !this.user.isLiked;
      if (this.user.isLiked) {
        this.alertify.success('You have liked ' + this.user.username);
      } else {
        this.alertify.success('Like removed ' + this.user.username);
      }
    }, error => {
      this.alertify.error(error);
    });
  }
}
