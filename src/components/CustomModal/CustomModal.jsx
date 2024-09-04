import { IoCloseCircle } from 'react-icons/io5';
import Modal from 'react-modal';
import { useLockBodyScroll } from '@uidotdev/usehooks';

import css from './CustomModal.module.css';

Modal.setAppElement('#root');

export const CustomModal = ({ selectedImage, isModalOpen, onClose }) => {
  useLockBodyScroll();
  const {
    urls: { regular },
    alt_description,
  } = selectedImage;

  return (
    <Modal
      className={css['modal']}
      overlayClassName={css['backdrop']}
      isOpen={isModalOpen}
      contentLabel="Image Modal"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <button className={css.closeBtn} onClick={onClose}>
        <IoCloseCircle size={40} color="currentColor" />
      </button>
      <img className={css.img} src={regular} alt={alt_description} />
    </Modal>
  );
};
