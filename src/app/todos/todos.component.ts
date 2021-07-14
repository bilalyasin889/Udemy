import { Component } from '@angular/core';
import {bounceOutLeftAnimation, fadeInAnimation, headerAnimation} from '../animations';
import {animate, animateChild, group, query, stagger, style, transition, trigger, useAnimation} from '@angular/animations';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('todoPageAnimation', [
      transition(':enter', [
        group([
          query('h1', useAnimation(headerAnimation)),
          query('@todoAnimation', stagger(300, animateChild()))
        ])
      ])
    ]),

    trigger('todoAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: { duration: '2s' }
        })
      ]),
      transition(':leave', [
        style({backgroundColor: '#FF0000'}),
        animate(1000),
        useAnimation(bounceOutLeftAnimation)
      ])
    ])
  ]
})
export class TodosComponent {
  items: any[] = [
    'Wash the dishes',
    'Call the accountant',
    'Apply for a car insurance'];

  addItem(input: HTMLInputElement) {
    this.items.splice(0, 0, input.value);
    input.value = '';
  }

  removeItem(item) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  animationStarted($event: any) {
    console.log($event);
  }

  animationDone($event: any) {
    console.log($event);
  }
}
