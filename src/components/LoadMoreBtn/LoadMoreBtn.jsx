import css from './LoadMoreBtn.module.css';

export const LoadMoreBtn = ({ handleLoadMore }) => {
  return (
    <button className={css.btn} type="button" onClick={handleLoadMore}>
      Load more
    </button>
  );
};
