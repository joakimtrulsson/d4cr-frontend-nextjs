import SecondaryButton from '../SecondaryButton/SecondaryButton';

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
        {title}
      </button>
    </div>
  ) : (
    <SecondaryButton title={title} onClick={onClick} />
  );
}
