import React, { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
  FieldContainer,
  FieldLabel,
  FieldDescription,
  Select,
  TextInput,
} from '@keystone-ui/fields';

import Wysiwyg from './components/Wysiwyg/Wysiwyg';

import AddEntryButton from './components/AddEntryButton/AddEntryButton';
import RemoveEntryButton from './components/RemoveEntryButton/RemoveEntryButton';

export const Field = ({ field, value, onChange, autoFocus }) => {
  const [values, setValues] = useState(value ? JSON.parse(value) : [{}]);

  const handleInputChange = (index, data) => {
    // här ska vi spara data i values[index].text

    setValues((prev) => {
      const newState = [...prev];
      newState[index].text = data;
      return newState;
    });
    onChange(JSON.stringify(values));
  };

  const handleAddField = () => {
    setValues((prev) => [...prev, {}]);
  };

  // const handleRemoveField = (indexToRemove) => {
  //   console.log(indexToRemove);
  //   // Bugg här. om indexToRemove är 0 så tar den bort sista elementet istället för första.

  //   const newState = values.filter((_, index) => index !== indexToRemove);
  //   console.log(newState);
  //   setValues(newState);
  //   onChange(JSON.stringify(newState));
  // };
  const handleRemoveField = (indexToRemove) => {
    const valuesCopy = [...values];
    valuesCopy.splice(indexToRemove, 1);
    setValues(valuesCopy);
    onChange(JSON.stringify(valuesCopy));
  };

  return (
    <FieldContainer>
      <FieldLabel>Subprinciples</FieldLabel>
      <FieldDescription>Add subprinciples</FieldDescription>

      {values.map((field, index) => {
        return (
          <div key={index} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
            <FieldLabel>{`Subprinciple ${index + 1}`}</FieldLabel>
            <Wysiwyg
              onSetPreamble={(value) => handleInputChange(index, value)}
              editData={values[index].text}
              extended={false}
              height={'100'}
            />
            <RemoveEntryButton handleRemove={handleRemoveField} indexToRemove={index}>
              Remove entry
            </RemoveEntryButton>
          </div>
        );
      })}

      <AddEntryButton handleAdd={handleAddField}>Add new subprinciple</AddEntryButton>
    </FieldContainer>
  );
};
