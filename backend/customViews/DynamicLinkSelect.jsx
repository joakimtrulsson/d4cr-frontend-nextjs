// import React, { useState } from 'react';

// import {
//   FieldContainer,
//   FieldLabel,
//   FieldDescription,
//   Select,
//   TextInput,
// } from '@keystone-ui/fields';

// import useFetchLinkOptions from './hooks/useFetchLinkOptions';

// export const Field = ({ field, value, onChange, autoFocus }) => {
//   const [selectValue, setSelectValue] = useState(value ? JSON.parse(value) : {});
//   const [url, setUrl] = useState(value ? JSON.parse(value) : '');
//   const pagesOptions = useFetchLinkOptions();

//   const handleSet = (key, inputValue) => {
//     setSelectValue(inputValue);

//     onChange(JSON.stringify(inputValue));
//   };

//   const handleChange = (key, inputValue) => {
//     setSelectValue((prev) => ({
//       [key]: inputValue,
//     }));

//     onChange(JSON.stringify(selectValue));
//   };

//   return (
//     <FieldContainer>
//       <FieldLabel>Page</FieldLabel>
//       <FieldDescription>Choose a page to link to.</FieldDescription>
//       <Select
//         value={pagesOptions.find((option) => option.value === selectValue)}
//         options={pagesOptions}
//         onChange={(selectedOption) => handleSet('url', selectedOption.value)}
//       />
//       <FieldDescription style={{ marginTop: '1rem' }}>Or External Url:</FieldDescription>
//       <TextInput
//         autoFocus={autoFocus}
//         onChange={(event) => handleChange('url', event.target.value)}
//         value={url}
//       />
//     </FieldContainer>
//   );
// };

import React, { useState, useEffect } from 'react';

import { FieldContainer, FieldDescription, Select, TextInput } from '@keystone-ui/fields';

import useFetchLinkOptions from './hooks/useFetchLinkOptions';
import { json } from '@keystone-6/core/fields';

export const Field = ({ field, value, onChange, autoFocus }) => {
  const [selectValue, setSelectValue] = useState();
  const [url, setUrl] = useState();
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
    console.log('asd');
    setUrl();
    setSelectValue(selectedOption.value);
    onChange(JSON.stringify(selectedOption.value));
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setSelectValue();
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
