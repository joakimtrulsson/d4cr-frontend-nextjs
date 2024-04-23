import React, { useState, useEffect } from 'react';
import PeopleCard from './PeopleCard';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { fetchPeopleByIds } from '../../graphql';

export default function PeopleSection({ content }) {
  const [peopleList, setPeopleList] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPeopleByIds(content.people);
      setPeopleList(data);
    }

    fetchData();
  }, [content.people]);

  return (
    <div>
      <div className='text-align-center heading-text'>
        <h2 className='margin-t--xl margin--zero'>{content.title}</h2>
        <DocumentRenderer document={content.preamble} />
      </div>

      <div className='container-people-cards flex flex-row flex-wrap flex-justify-center flex-align-center'>
        {peopleList &&
          peopleList.map((person, index) => <PeopleCard key={index} data={person} />)}
      </div>
    </div>
  );
}
