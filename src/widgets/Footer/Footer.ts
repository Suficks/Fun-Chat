import './Footer.scss';
import Logo from 'images/rs-school-logo.svg';

export const Footer = () => {
  const container = document.querySelector('.main');

  const template = `
    <footer class="footer">
      <a href="https://rs.school/" target="_blank">
        <img src="${Logo}" alt="school" class="logo"/>
      </a>
      <a href="https://github.com/Suficks" target="_blank" class="link">Suficks</a>
      <p>2024</p>
    </footer>
  `;

  container?.insertAdjacentHTML('beforeend', template);
};
