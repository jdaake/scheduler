import {
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes,
    query,
    stagger
} from '@angular/animations';


export const listStateTrigger = trigger('listState', [
    transition('* => *', [
        query(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
            stagger(300, [
                animate('500ms ease-out', keyframes([
                    style({
                        opacity: 1,
                        transform: 'translateX(15%)',
                        offset: 0.4
                    }),
                    style({
                        opacity: 1,
                        transform: 'translateX(0)',
                        offset: 1
                    })
                ]))
            ])
        ], { optional: true })
    ])
]);

export const slideDownTrigger = trigger('slideDown', [
    transition(':enter', [
        style({
            transform: 'translateX(-100%)',
            opacity: 0
        }),
        animate('1000ms ease-out', style({
            transform: 'translateX(0)',
            opacity: .5
        }))
    ]),
    transition(':leave', [
        style({
            transform: 'translateX(-100%)',
            opacity: 1
        }),
        animate('1000ms ease-out', style({
            transform: 'translateX(0)',
            opacity: .5
        }))
    ])
]);
