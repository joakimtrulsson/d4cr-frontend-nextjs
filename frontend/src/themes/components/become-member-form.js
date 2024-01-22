import '../../themes/sources/scss/components/become-member.scss'
import PrimaryButton from './buttons/primary-button'

const BecomeMemberForm = () => {

    return (
    <div id='become-member-form'>

        <div className='star-icon'>
            <h1>&#9733;</h1>
            </div>

        <div>
            <h2>Become a member</h2>
            <p>There are multiple ways to get involved. A good start is to join our Slack channel and we can talk more about the next step together.</p>
        </div>

        <div>
            <PrimaryButton title='FILL OUT FORM' />
        </div>
        
    </div>
    )
}

export default BecomeMemberForm