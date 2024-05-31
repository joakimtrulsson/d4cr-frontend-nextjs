import { SecondaryButton } from '../index';

export default function PrimaryButton({
  title,
  type,
  disabled,
  onClick,
  decline,
  className,
}) {
  return !decline ? (
    <div>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`primary-button uppercase ${className}`}
      >
        <span className='button-text'>{title}</span>
      </button>
    </div>
  ) : (
    <SecondaryButton title={title} onClick={onClick} />
  );
}
