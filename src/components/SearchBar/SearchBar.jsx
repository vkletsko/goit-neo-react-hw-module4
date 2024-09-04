import toast from 'react-hot-toast';
import { RiErrorWarningFill } from 'react-icons/ri';

import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.search.value;
    if (query.trim() === '') {
      toast(`Search query can't be empty`, {
        icon: <RiErrorWarningFill color="#ffc107" size={20} />,
      });
      return;
    }
    onSubmit(query);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.field}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Find..."
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
