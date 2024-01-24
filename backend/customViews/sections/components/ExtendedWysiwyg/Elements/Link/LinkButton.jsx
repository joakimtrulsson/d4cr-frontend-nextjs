import React, { useRef, useState } from 'react';
import { insertLink } from '../../utils/link.js';

import Icon from '../../common/Icon.jsx';
import { isBlockActive } from '../../utils/SlateUtilityFunctions.js';
import usePopup from '../../utils/customHooks/usePopup.jsx';
import { Transforms } from 'slate';

import { TextInput, FieldLegend } from '@keystone-ui/fields';

import { Button } from '@keystone-ui/button';

const LinkButton = (props) => {
  const { editor } = props;
  const linkInputRef = useRef(null);
  const [showInput, setShowInput] = usePopup(linkInputRef);
  const [url, setUrl] = useState('');
  const [showInNewTab, setShowInNewTab] = useState(false);
  const [selection, setSelection] = useState();
  const handleInsertLink = () => {
    Transforms.select(editor, selection);
    insertLink(editor, { url, showInNewTab });
    setUrl('');
    setShowInput((prev) => !prev);
    setShowInNewTab(false);
  };
  const toggleLink = () => {
    setSelection(editor.selection);
    setShowInput((prev) => !prev);
  };
  const handleInputChange = ({ target }) => {
    if (target.type === 'checkbox') {
      setShowInNewTab((prev) => !prev);
    } else {
      setUrl(target.value);
    }
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
        <div className='popup'>
          <div
            style={{
              display: 'flex',
              gap: '4px',
              flexDirection: 'column',
              margin: '5px 2px',
            }}
          >
            <FieldLegend>Add Link</FieldLegend>
            <TextInput
              placeholder='Enter url'
              value={url}
              onChange={handleInputChange}
              // onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
              // autoFocus={autoFocus}
              // onChange={(event) => handleChange('anchorText', event.target.value)}
              // value={value.cta?.anchorText}
              size='small'
              style={{ marginBottom: '0.5rem', width: '350px' }}
            />
            {/* <input
              type='text'
              placeholder='Url'
              value={url}
              onChange={handleInputChange}
            /> */}
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
