import '../scss/home.scss';
import '../img/image2.jpg';

import './common';
import { foo } from './home';
import { Button } from './components';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (import.meta.webpackHot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.webpackHot.accept();
}

Button({ containerName: 'button-wrapper', text: 'Button from JS', cls: 'button' });

// eslint-disable-next-line no-console
console.log('---> THIS IS INDEX TS!1 ! -_- !');
foo();
