import {animate, animation, keyframes, state, style, transition, trigger, useAnimation} from '@angular/animations';

export let bounceOutLeftAnimation = animation(
  animate('0.5s ease-out', keyframes([
    style({
      offset: .2,
      opacity: 1,
      transform: 'translateX(20px)'
    }),
    style({
      offset: 1,
      opacity: 0,
      transform: 'translateX(-100%)'
    })
  ]))
);

export let fadeInAnimation = animation([
  style({ opacity: 0 }),
  animate('{{ duration }} {{ easing }}')
], {
  params: {
    duration: '2s',
    easing: 'ease-out'
  }
});

export let fadeOutAnimation = animation([
  animate(2000, style({ opacity: 0 }))
]);

export let headerAnimation = animation([
  style({ transform: 'translateY(-20px)' }),
  animate(1000)
]);

export let fade = trigger('fade', [
    state('void', style({ opacity: 0 })),
    transition(':enter', fadeInAnimation),
    transition(':leave', fadeOutAnimation)
]);

export let slide = trigger('slide', [
  transition(':enter', [
    style({transform: 'translateX(-2%)'}),
    animate(200)
  ]),

  transition(':leave', [
    // style({backgroundColor: '#FF0000'}),
    // animate('1s ease-out', style({transform: 'translateX(2%)'})),
    // animate('2s cubic-bezier(.6,.2,.05,.9)', style({transform: 'translateX(-100%)'}))
    useAnimation(bounceOutLeftAnimation)
  ])
]);
