import {Component} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  coursesRef: AngularFireList<any>;
  courses$: Observable<any[]>;
  course$: Observable<any>;
  author$: Observable<any>;


  constructor(private db: AngularFireDatabase) {
    this.coursesRef = db.list('/courses');
    this.courses$ = db.list('/courses').snapshotChanges();
    this.course$ = db.object('/courses/1').valueChanges();
    this.author$ = db.object('/authors/1').valueChanges();
  }

  add(course: HTMLInputElement) {
    this.coursesRef.push(course.value);
    course.value = ' ';
  }

  update(course: any) {
    this.coursesRef.set('1','Changed');
    console.log(course); //NEED KEY
    // this.db.object('/courses/' + course.$key)
    //   .update({value: course.$value + 'Updated'});
  }

  delete(course: any) {
    this.db.object('/courses/' + course.$key).remove();
  }
}
