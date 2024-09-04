import { RiAlarmWarningFill } from 'react-icons/ri';
import css from './ErrorMessage.module.css';

export const ErrorMessage = () => {
  return (
    <div className={css.error}>
      <RiAlarmWarningFill size={32} color="red" />
      Some error occures. Please reload page
    </div>
  );
};
