import Test from './Test';
import Test2 from './Test2';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import Slide6 from './Slide6';
import {appName} from '@/appConfig';

export default {
    '/Test': {
        component: Test,
        name: 'Test',
    },
    '/': {
        component: Test,
        name: appName,
    },
    '/Test2': {
        component: Test2,
        name: 'Test2',
    },
};

export const slides = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
];
