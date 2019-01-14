import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyjsService } from 'src/app/_services/alertifyjs.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { AuthService } from 'src/app/_services/auth.service';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyjsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
      const selectTab = params['tab'];
      this.memberTabs.tabs[selectTab > 0 ? selectTab : 0].active = true;
    });
    this.galleryOptions = [
      {
        width: '100%',
        height:  '550px',
        imagePercent: 100,
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imagesUrls = [];
    for (let i = 0; i < this.user.photos.length; i++ ) {
      imagesUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }

    return imagesUrls;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  sendLike(id: number) {
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
