import styles from './button.module.scss';

export const page = () => {
  // eslint-disable-next-line no-console
  console.log('PAGE TS');

  const body = document.body;
  const button = document.createElement('button');

  // eslint-disable-next-line no-console
  console.log(styles);

  button.textContent = 'Button1';
  button.classList.add(styles.button);

  body.append(button);
};
