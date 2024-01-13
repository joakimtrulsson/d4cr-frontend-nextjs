import React from 'react';
import { FieldLabel, Select } from '@keystone-ui/fields';

function SelectSections({ activeSection, onChangeActiveSections, options }) {
  return (
    <>
      <FieldLabel>Add section:</FieldLabel>
      <Select onChange={onChangeActiveSections} value={activeSection} options={options} />
    </>
  );
}

export default SelectSections;
