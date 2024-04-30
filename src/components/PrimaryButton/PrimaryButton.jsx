import SecondaryButton from '../SecondaryButton/SecondaryButton';

export default function PrimaryButton({ title, type, disabled, onClick, decline }) {
  return !decline ? (
    <div>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className='primary-button uppercase'
      >
        {title}
      </button>
    </div>
  ) : (
    <SecondaryButton title={title} onClick={onClick} />
  );
}
