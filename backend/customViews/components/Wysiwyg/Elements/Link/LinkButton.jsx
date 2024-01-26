import React, { useRef, useState } from 'react';
import { insertLink } from '../../utils/link.js';

import Icon from '../../common/Icon.jsx';
import { isBlockActive } from '../../utils/SlateUtilityFunctions.js';
import usePopup from '../../utils/customHooks/usePopup.jsx';
import { Transforms } from 'slate';

import useFetchLinkOptions from '../../../../hooks/useFetchLinkOptions.jsx';

import { TextInput, FieldLegend, FieldDescription } from '@keystone-ui/fields';

import { Button } from '@keystone-ui/button';

const LinkButton = (props) => {
  const { editor } = props;
  const linkInputRef = useRef(null);
  const [showInput, setShowInput] = usePopup(linkInputRef);
  const [url, setUrl] = useState('');
  const [showInNewTab, setShowInNewTab] = useState(false);
  const [selection, setSelection] = useState();
  const pagesOptions = useFetchLinkOptions();
  const [pageValue, setPageValue] = useState('');

  const handleInsertLink = () => {
    Transforms.select(editor, selection);
    insertLink(editor, { url, showInNewTab });
    setUrl('');
    setPageValue('');
    setShowInput((prev) => !prev);
    setShowInNewTab(false);
  };

  const toggleLink = () => {
    setSelection(editor.selection);
    setShowInput((prev) => !prev);
  };

  const handleInputChange = ({ target }) => {
    if (target && target.type === 'checkbox') {
      setShowInNewTab((prev) => !prev);
    } else {
      setUrl(target.value);
    }
  };

  const handleInputPage = (selectedOption) => {
    setShowInNewTab(false);
    // setPageValue(selectedOption);
    setUrl(selectedOption);
  };

  return (
    <div ref={linkInputRef} className='popup-wrapper'>
      <Button
        className={showInput ? 'clicked' : ''}
        active={isBlockActive(editor, 'link')}
        format={'link'}
        onClick={toggleLink}
        style={{ height: '32px', width: '32px' }}
      >
        <Icon icon='link' />
      </Button>
      {showInput && (
        <div className='popup' style={{ position: 'absolute', left: '75px' }}>
          <div
            style={{
              display: 'flex',
              gap: '4px',
              flexDirection: 'column',
              margin: '5px 2px',
            }}
          >
            <FieldLegend>Add Link</FieldLegend>
            <FieldDescription>Page:</FieldDescription>
            {/* <Select
              value={pageValue}
              onChange={(selectedOption) => handleInputPage(selectedOption.value)}
              // onChange={handleInputChange}
              options={pagesOptions}
            /> */}
            <select
              value={pageValue}
              onChange={(event) => handleInputPage(event.target.value)}
              style={{
                marginTop: '-0.5rem',
                padding: '5px',
                fontSize: '16px',
                backgroundColor: '#fafbfc',
                borderRadius: '5px',
                border: '1px solid #d1d5db',
                width: '100%',
                color: '#333333',
              }}
            >
              {pagesOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FieldDescription>Or external url:</FieldDescription>
            <TextInput
              placeholder='Enter url'
              value={url}
              onChange={handleInputChange}
              size='small'
              style={{ marginBottom: '0.5rem', marginTop: '-0.5rem', width: '350px' }}
            />
            <Button
              onClick={handleInsertLink}
              size='small'
              style={{ width: '75px', borderRadius: '5px', color: '#6b7280' }}
              type='submit'
            >
              Save
            </Button>
          </div>
          <label>
            <input type='checkbox' checked={showInNewTab} onChange={handleInputChange} />
            <span style={{ fontSize: '0.8em' }}> Open in new tab</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default LinkButton;
