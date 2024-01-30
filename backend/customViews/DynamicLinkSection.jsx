import React, { useState, useEffect } from 'react';

import { FieldContainer, FieldDescription, Select, TextInput } from '@keystone-ui/fields';

import useFetchLinkOptions from './hooks/useFetchLinkOptions';

export const Field = ({ field, value, onChange, autoFocus }) => {
  const [selectValue, setSelectValue] = useState('');
  const [url, setUrl] = useState('');
  const pagesOptions = useFetchLinkOptions();

  useEffect(() => {
    if (pagesOptions.length > 0 && value && value !== '') {
      const result = pagesOptions.find(
        (option) => JSON.stringify(option.value) === value && option.value !== ''
      );

      if (result) {
        setSelectValue(result.value);
        setUrl('');
        return;
      } else if ((value !== '' && result !== undefined) || value.length > 0) {
        setUrl(JSON.parse(value));
        return;
      }
    }
  }, [pagesOptions, value]);

  const handleSelectChange = (selectedOption) => {
    setUrl('');
    setSelectValue(selectedOption.value);
    onChange(JSON.stringify(selectedOption.value));
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setSelectValue('');
    setUrl(event.target.value);
    onChange(JSON.stringify(event.target.value));
  };

  return (
    <FieldContainer>
      {/* <FieldLabel>Page</FieldLabel> */}
      <FieldDescription>Choose a page to link to.</FieldDescription>
      <Select
        value={pagesOptions.find((option) => option.value === selectValue)}
        options={pagesOptions}
        onChange={handleSelectChange}
      />
      <FieldDescription style={{ marginTop: '1rem' }}>Or External Url:</FieldDescription>
      <TextInput autoFocus={autoFocus} onChange={handleInputChange} value={url} />
    </FieldContainer>
  );
};
