import '../../sources/scss/components/buttons/primary-button.scss'

const PrimaryButton = ({title}) => {

    return (
        <div>
            <button className='primary-button uppercase' >{title}</button>
        </div>
    )
}

export default PrimaryButton