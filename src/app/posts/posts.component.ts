import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { BadInputError } from '../common/bad-input-error';
import { NotFoundError } from '../common/not-found-error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{

  posts!: any[];

  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.service.getAll()
    .subscribe(posts => this.posts = posts as any);
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    this.posts.splice(0, 0, post);

    input.value = '';
  
    this.service.create(post)
    .subscribe( newPost => {
      post.id = newPost.id;
    }, 
    (error: AppError) => {
      this.posts.splice(0, 1);

      if (error instanceof BadInputError){
        //  this.form.setErrors(error.originalError);
      }
      else throw error;
    });
  }

  updatePost(post: any) {
    this.service.update(post.id)
    .subscribe( updatedPost => {
      console.log(updatedPost);
    });
  }

  deletePost(post: any) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index,1);

    this.service.delete(post.id)
    .subscribe( () => {  },
    (error: AppError) => {
      this.posts.splice(index, 0, post);
      
      if (error instanceof NotFoundError)
        alert("Post Already Deleted");
      else throw error;
    });
  }

}
