import React from 'react';
import { fetchSteeringGroupMembersData } from '../graphql'
import PeopleCard from './people-card'
import '../themes/sources/scss/app.scss'

export default function SteeringGroup(props) {

    console.log("steeringGroupMemberData: ", props.steeringGroupMemberData)

    /* const sortedData = props.steeringGroupMemberData.slice().sort((a, b) => {
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

export async function getServerSideProps() {
    try {

        const steeringGroupMemberData = await fetchSteeringGroupMembersData();

        return { props: { steeringGroupMemberData } };
    } catch (error) {
        console.error("(component/steering-group.jsx) Error fetching data:", error);
        return { notFound: true };
    }
}