import { ImageCard } from '@components';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ items, listRef, openModal }) => {
  return (
    <>
      <ul className={css.gallery} ref={listRef}>
        {items.map(item => {
          return (
            <li
              key={item.id}
              onClick={() => {
                openModal(item);
              }}
            >
              <ImageCard {...item} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
