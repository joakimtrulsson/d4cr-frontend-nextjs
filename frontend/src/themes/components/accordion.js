import '../sources/scss/components/accordion.scss';
import '../sources/scss/base/utils.scss'
import { useState, useEffect } from 'react';
import Animation from '../sources/assets/graphics/animation.gif'
import Image from 'next/image'
import DocumentRenderer from '../sources/js/document-renderer.js'

export default function Accordion({ content }) {

    const [clickedValue, setClickedValue] = useState(0);
    const [selectedField, setSelectedField] = useState(content.fields[0]);
    const [documentKey, setDocumentKey] = useState(0); // Key to force re-rendering of DocumentRenderer

    useEffect(() => {
        setSelectedField(content.fields[clickedValue]);
        setDocumentKey(clickedValue);
    }, [clickedValue, content.fields]);

    return (
        <div className="accordion-container animation-background-container flex flex-column flex-justify-center flex-align-center 
        padding-tb--xxl">

            <div className='animation-background'>
                <Image src={Animation} alt="Animated GIF" />
            </div>

            <div className='max-width-30 text-align-center'>
                <h2 className='margin-t--xxs '>{content.title}</h2>
            </div>

            <div className='accordion-content flex flex-row max-width-60 min-width-30 margin-lr--xs'>

                <div className='content-list width--m'>
                    <ul className='no-bullets'>

                        {content.fields.map((field, index) => (
                            <li className={`heading-4 flex flex-align-center padding-tb--xs padding-lr--xs 
                            ${index === clickedValue ? 'bg-yellow-200 color-yellow-700' : 'bg-yellow-50 color-grey-700'}`}
                                key={index} onClick={() => setClickedValue(index)}>
                                {field.heading}
                            </li>
                        ))}

                    </ul>
                </div>

                <div className='content-text bg-yellow-200 width--xxl padding--xl '>

                    {selectedField.bodyText && (
                        <DocumentRenderer key={documentKey} content={selectedField.bodyText} />
                    ) }
                </div>
            </div>
        </div>
    );
};