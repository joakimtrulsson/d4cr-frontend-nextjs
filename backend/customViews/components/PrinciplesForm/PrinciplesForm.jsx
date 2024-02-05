import React, { useEffect, useState } from 'react';
import {
  FieldLabel,
  TextInput,
  FieldDescription,
  MultiSelect,
} from '@keystone-ui/fields';
import { v4 as uuidv4 } from 'uuid';

import useFetchPrinciples from '../../hooks/useFetchPrinciples';
import AddEntryButton from '../AddEntryButton/AddEntryButton';

function PrinciplesForm({ autoFocus, onAddNewItem, onUpdateItem, editData }) {
  const [options, setOptions] = useState([]);
  const { allPrinciples, loading, error } = useFetchPrinciples();
  const [resourcesData, setResourcesData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [groupTitle, setGroupTitle] = useState('');

  const newId = uuidv4();

  // När editData finns så sätts groupTitle och resourcesData
  useEffect(() => {
    if (editData) {
      setGroupTitle(editData.groupTitle);
      setResourcesData(editData.principles);

      const newSelectedOptions = editData.principles.map((resource) => ({
        value: resource.id,
        label: resource.title,
      }));
      setSelectedOptions(newSelectedOptions);
    }
  }, [editData]);

  useEffect(() => {
    if (
      allPrinciples &&
      allPrinciples.principles &&
      allPrinciples.principles.length > 0
    ) {
      console.log(allPrinciples);

      const newOptions = allPrinciples.principles.reduce((acc, principle) => {
        const resource = {
          value: principle.id,
          label: principle.title,
        };

        return [...acc, resource];
      }, []);

      setOptions(newOptions);
    }
  }, [allPrinciples]);

  // När grouptitle och resources finns så skickas det tillbaka till Resources.jsx
  useEffect(() => {
    // Här måste vi kontrollera om editData finns, då ska inte id uppdateras, dvs den ska bli samma som editData.id
    if (editData && groupTitle && resourcesData.length > 0) {
      const updatedItem = {
        id: editData.id,
        groupTitle: groupTitle,
        principles: resourcesData,
      };
      onUpdateItem(updatedItem);
    } else if (!editData && groupTitle && resourcesData.length > 0) {
      const newItem = {
        id: newId,
        groupTitle: groupTitle,
        principles: resourcesData,
      };
      console.log(newItem); // Här skickas det tillbaka till Resources.jsx
      onAddNewItem(newItem);
    }
  }, [groupTitle, resourcesData]);

  const addValuesToNewData = (key, value) => {
    if (key === 'selectedOptions') {
      // Value innehåller resources id och titel

      const allPrinciplesData = value.map((selectedOption) => {
        const principle = allPrinciples.principles
          .map((principle) => principle)
          .flat()
          .find((principle) => principle.id === selectedOption.value);
        // console.log(principle);

        return principle;
      });

      setResourcesData(allPrinciplesData);
    } else if (key === 'groupTitle') {
      setGroupTitle(value);
    }
  };

  const addAllPriciples = () => {
    const allPrinciplesData = allPrinciples.principles.map((principle) => principle);
    setResourcesData(allPrinciplesData);
    setSelectedOptions(
      allPrinciplesData.map((resource) => ({
        value: resource.id,
        label: resource.title,
      }))
    );
  };

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <FieldLabel>Group title</FieldLabel>
        <FieldDescription>
          Assign a title to categorize this group of principles
        </FieldDescription>
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            autoFocus={autoFocus}
            onChange={(event) => addValuesToNewData('groupTitle', event.target.value)}
            value={groupTitle}
          />
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <FieldLabel>Principles</FieldLabel>
        <FieldDescription>
          Select principles associated with the group title
        </FieldDescription>
        <div style={{ marginBottom: '1rem' }}>
          <MultiSelect
            options={options}
            autoFocus={autoFocus}
            onChange={(selectedOptions) => {
              setSelectedOptions(selectedOptions);
              addValuesToNewData('selectedOptions', selectedOptions);
            }}
            value={selectedOptions || []}
          />
          <AddEntryButton handleAdd={addAllPriciples}>
            Select all principles
          </AddEntryButton>
        </div>
      </div>
    </>
  );
}

export default PrinciplesForm;
