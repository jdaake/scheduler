import { trigger, transition, style, animate, group, query, animateChild } from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ], { optional: true }),
            query(':enter', [
                style({ left: '-100%' })
            ], { optional: true }),
            query(':leave', [
                animateChild()
            ], { optional: true }),
            group([
                query(':leave', [
                    animate('.5s ease-out', style({
                        left: '100%'
                    }))
                ], { optional: true }),
                query(':enter', [
                    animate('.5s ease-out', style({
                        left: '0%'
                    }))
                ], { optional: true })
            ]),
            query(':enter', [
                animateChild()
            ], { optional: true }),
        ]),
    ]);

