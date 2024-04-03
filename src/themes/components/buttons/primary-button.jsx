export default function PrimaryButton({title, type, disabled}) {

    return (
        <div>
            <button type={type} disabled={disabled} className='primary-button uppercase' >{title}</button>
        </div>
    )
}