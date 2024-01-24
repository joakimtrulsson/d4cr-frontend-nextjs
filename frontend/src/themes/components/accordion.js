import '../sources/scss/components/accordion.scss';
import '../sources/scss/base/utils.scss'
import data from '../../database/sections-data/accordion';
import { useState } from 'react';
import Animation from '../sources/assets/graphics/animation.gif'
import Image from 'next/image'

const Accordion = () => {

    const [clickedValue, setClickedValue] = useState(0);
    const selectedField = data.fields[clickedValue];

    return (
        <div className="accordion-container flex flex-column flex-justify-center flex-align-center 
        padding-tb--xxl">

            <div className='animation'>
                <Image src={Animation} alt="Animated GIF" />
            </div>

            <div className='max-width-30 text-align-center'>
                <h2 className='margin-t--xxs '>{data.title}</h2>
            </div>

            <div className='accordion-content flex flex-row max-width-60 min-width-30 margin-lr--xs'>

                <div className='content-list width--m'>
                    <ul className='no-bullets'>
                        {data.fields.map((field, index) => (
                            <li className={`heading-4 flex flex-align-center padding-tb--xs padding-lr--xs 
                            ${index === clickedValue ? 'bg-yellow-200 color-yellow-700' : 'bg-yellow-50 color-grey-700'}`}
                                key={index} onClick={() => setClickedValue(index)}>
                                {field.heading}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='content-text bg-yellow-200 width--xxl padding--xl'>
                    {selectedField?.bodyText?.[0]?.children?.map(({ text }, index) => (
                        <p key={index} className="large-text" >
                            {text}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
