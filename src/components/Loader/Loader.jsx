import { RotatingLines } from 'react-loader-spinner';

import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <RotatingLines
        visible={true}
        height="58"
        width="58"
        strokeColor="gray"
        strokeWidth="4"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};
