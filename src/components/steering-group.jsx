import React from 'react';
import PeopleCard from './people-card'

export default function SteeringGroup({ content }) {

    console.log("steeringGroupMemberData: ", content.steeringGroupMemberData)

    /* const sortedData = content.steeringGroupMemberData.slice().sort((a, b) => {
        return a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase());
    }); */

    return (
        <div>
            <h2 className='heading-1 margin--zero margin-t--xl'>{'Steering group'}</h2>
            <p className='max-width-35 text-align-center large-text'>{'coming soon...'}</p>

            <div className='container-people-cards full-width-height flex flex-row flex-justify-start flex-align-center flex-wrap max-width--xxxl margin-lr-auto'> { /* flex-align-start doesnt works */}

                {/* {sortedData && sortedData.map((peopleCard, index) => (

                    <PeopleCard key={index} data={peopleCard} />

                ))} */}
            </div>
        </div>
    );
}