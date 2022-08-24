import { ButtonProps } from './types';

import styles from './Button.module.scss';

const buttonHandler = () => {
  // eslint-disable-next-line no-console
  console.log('Click test Button OK');
};

const buttonClass = styles.button;

export const Button = ({ containerName, text, cls = '' }: ButtonProps): void => {
  const button = document.createElement('button');
  button.innerText = text;
  button.classList.add(cls);
  button.classList.add(buttonClass);

  button.addEventListener('click', buttonHandler);

  const container = document.querySelector(`.${containerName}`);
  if (container) {
    container.innerHTML = '';
    container.append(button);
  }
};
