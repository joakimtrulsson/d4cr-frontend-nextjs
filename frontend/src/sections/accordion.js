import '../styles/sections/accordion.scss'
import data from '../database/sections-data/accordion'

const Accordion = () => {

    const { title, fields } = data


    return (
        <div className="accordion-container">
            <div className='anmination'>

            </div>

            <div className='accordion-content'>
                <h2>{title}</h2>
                <div className='content-list'>
                    <ul>
                        {fields.map((field, index) => {
                            <li key={index} >{field.bodyText[0].children[0].text}</li>
                        })}
                    </ul>
                </div>

                <div className='content-text'>
                    <p>{"test"}</p>
                </div>
            </div>
        </div>
    )
}

export default Accordion