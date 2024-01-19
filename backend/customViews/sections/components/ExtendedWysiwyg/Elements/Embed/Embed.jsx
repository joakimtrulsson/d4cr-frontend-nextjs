import React, { useRef, useState } from 'react';
// import Button from '../../common/Button.jsx';
import Icon from '../../common/Icon.jsx';
import { isBlockActive } from '../../utils/SlateUtilityFunctions.js';
import usePopup from '../../utils/customHooks/usePopup.jsx';
import { insertEmbed } from '../../utils/embed.js';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import {
  FieldContainer,
  FieldLabel,
  FieldLegend,
  TextInput,
  Select,
  FieldDescription,
} from '@keystone-ui/fields';

import { Button } from '@keystone-ui/button';

import './Embed.css';
const Embed = ({ editor, format }) => {
  const urlInputRef = useRef();
  const [showInput, setShowInput] = usePopup(urlInputRef);
  const [formData, setFormData] = useState({
    url: '',
    alt: '',
  });
  const [selection, setSelection] = useState();
  const handleButtonClick = (e) => {
    e.preventDefault();
    setSelection(editor.selection);
    selection && ReactEditor.focus(editor);

    setShowInput((prev) => !prev);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    selection && Transforms.select(editor, selection);
    selection && ReactEditor.focus(editor);

    insertEmbed(editor, { ...formData }, format);
    setShowInput(false);
    setFormData({
      url: '',
    });
  };
  const handleImageUpload = () => {
    setShowInput(false);
  };

  return (
    <div ref={urlInputRef} className='popup-wrapper'>
      <Button
        active={isBlockActive(editor, format)}
        style={{
          width: '32px',
          height: '32px',
          border: showInput ? '1px solid lightgray' : '',
          borderBottom: 'none',
        }}
        format={format}
        onClick={handleButtonClick}
      >
        <Icon icon={format} />
      </Button>
      {showInput && (
        <div className='popup' style={{ borderRadius: '7px' }}>
          {format === 'image' && (
            <div>
              <div style={{ display: 'flex', gap: '10px' }} onClick={handleImageUpload}>
                <Icon icon='upload' />
                <span>Upload</span>
              </div>
              <p style={{ textAlign: 'center', opacity: '0.7', width: '100%' }}>OR</p>
            </div>
          )}
          <form onSubmit={handleFormSubmit}>
            <FieldLegend size='small'>Enter url:</FieldLegend>
            <TextInput
              placeholder='Enter url'
              value={formData.url}
              onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
              // autoFocus={autoFocus}
              // onChange={(event) => handleChange('anchorText', event.target.value)}
              // value={value.cta?.anchorText}
              size='small'
              style={{ marginBottom: '0.5rem', width: '350px' }}
            />
            {/* <input
              type='text'
              placeholder='Enter url'
              value={formData.url}
              onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
            /> */}
            {/* <input
              type='text'
              placeholder='Enter alt'
              value={formData.alt}
              onChange={(e) => setFormData((prev) => ({ ...prev, alt: e.target.value }))}
            /> */}

            <Button
              size='small'
              style={{ width: '75px', borderRadius: '5px', color: '#6b7280' }}
              type='submit'
            >
              Save
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Embed;
