import Loader from '../../assets/images/loader.gif';
import './Modal.scss';

interface ModalProps {
  text: string;
  button?: boolean;
  loader?: boolean;
}

export const modalRemove = () => {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');

  modal?.remove();
  overlay?.remove();
};

export const setModal = ({ text, button, loader }: ModalProps) => {
  const template = `
    <div class="overlay"></div>
    <div class="modal">
      ${loader ? `<img class="loader" src="${Loader}" alt="loader"/>` : ''}
      <p>${text}</p>
      ${button ? '<button class="button remove_btn small_btn">Ok</button>' : ''}
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', template);

  const removeBtn = document.querySelector('.remove_btn');
  removeBtn?.addEventListener('click', modalRemove);
};
