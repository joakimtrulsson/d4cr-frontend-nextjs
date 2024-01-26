import '../sources/scss/components/accordion.scss';
import '../sources/scss/base/utils.scss'
import data from '../../database/sections-data/accordion';
import { useState } from 'react';

const Accordion = () => {
    
    const [clickedValue, setClickedValue] = useState(0);
    const selectedField = data.fields[clickedValue];

    return (
        <div className="accordion-container">
            <div className='animation'></div>

            <div className='accordion-content'>
                <h2>{data.title}</h2>

                <div className='content-list'>
                    <ul>
                        {data.fields.map((field, index) => (
                            <li key={index} onClick={() => setClickedValue(index)}>
                                {field.heading}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='content-text'>
                    {selectedField?.bodyText?.[0]?.children?.map(({ text, bold, italic }, index) => (
                        <p key={index} className={`${bold ? 'bold' : ''} ${italic ? 'italic' : ''}`}>
                            {text}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
