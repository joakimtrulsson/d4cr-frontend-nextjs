import { useState, useEffect } from 'react';
import Image from 'next/image';

import Animation from '../../styles/assets/graphics/animation.gif';
import { WYSIWYG } from '../index.js';

export default function Accordion({ content }) {
  const [clickedValue, setClickedValue] = useState(0);
  const [selectedField, setSelectedField] = useState(content.fields[0]);
  const [documentKey, setDocumentKey] = useState(0); // Key to force re-rendering of DocumentRenderer

  useEffect(() => {
    setSelectedField(content.fields[clickedValue]);
    setDocumentKey(clickedValue);
  }, [clickedValue, content.fields]);

  return (
    <div className='accordion-container animation-background-container flex flex-column flex-justify-center flex-align-center'>
      <div className='animation-background-left-large'>
        <Image src={Animation} alt='Animated GIF' />
      </div>

      <div className='max-width-30 text-align-center'>
        <h2 className='margin-t--xxs '>{content.title}</h2>
      </div>

      <div className='accordion-content flex flex-row max-width-60 margin-lr--xs'>
        <div className='content-list'>
          <ul className='no-bullets'>
            {content.fields.map((field, index) => (
              <li
                className={`heading-5 flex flex-align-center padding-tb--s padding-lr--s 
                            ${
                              index === clickedValue
                                ? 'bg-yellow-200 color-yellow-700'
                                : 'bg-yellow-50 color-grey-700 pointer'
                            }`}
                key={index}
                onClick={() => setClickedValue(index)}
              >
                <span class='accordion__title'>{field.heading}</span>
                <div className='content-text bg-yellow-200'>
                  {selectedField.bodyText && (
                    <WYSIWYG key={documentKey} content={selectedField.bodyText} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='content-text bg-yellow-200 width--xxl padding--xl '>
          {selectedField.bodyText && (
            <WYSIWYG key={documentKey} content={selectedField.bodyText} />
          )}
        </div>
      </div>
    </div>
  );
}
