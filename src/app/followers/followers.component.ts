import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowerService } from '../services/follower.service';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers!: any[];

  constructor(
    private route: ActivatedRoute,
    private service: FollowerService) { }

  ngOnInit(): void {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .pipe(switchMap(combined => {
      let id = combined[0].get('id');
      let page = combined[1].get('page');

      return this.service.getAll();
    }))
    .subscribe(followers => this.followers = followers);
  }

}
