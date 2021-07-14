import { Component, Input } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {
  @Input('isLiked') isLiked!: boolean;
  @Input('noLikes') noLikes!: number;

  onClick() { 
    this.noLikes += (this.isLiked) ? -1 : 1;
    this.isLiked = !this.isLiked;
  }

}
