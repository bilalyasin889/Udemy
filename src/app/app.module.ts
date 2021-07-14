import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthoursComponent } from './authours/authours.component';
import { AuthoursService } from './authours/authours.service';
import { FavouriteComponent } from './favourite/favourite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from './title-case.pipe';
import { LikeComponent } from './like/like.component';
import { ZippyComponent } from './zippy/zippy.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { SignupFormComponent } from './signup-form/signup-form/signup-form.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';
import { PostService } from './services/post.service';
import { AppErrorHandler } from './common/app-error-handler';
import { FollowersComponent } from './followers/followers.component';
import { FollowerService } from './services/follower.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AuthoursComponent,
    FavouriteComponent,
    TitleCasePipe,
    LikeComponent,
    ZippyComponent,
    ContactFormComponent,
    CourseFormComponent,
    SignupFormComponent,
    ChangePasswordFormComponent,
    PostsComponent,
    FollowersComponent,
    NavbarComponent,
    HomeComponent,
    GithubProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'followers/:username/:id',
        component: GithubProfileComponent
      },
      {
        path: 'followers',
        component: FollowersComponent
      },
      {
        path: 'posts',
        component: PostsComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [
    AuthoursService,
    PostService,
    FollowerService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
