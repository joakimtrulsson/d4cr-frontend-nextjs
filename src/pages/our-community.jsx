import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData, fetchSteeringGroupMembersData } from '../graphql'
import SectionRender from '../themes/sources/js/section-render'
import PeopleCard from '../components/people-card'
import '../themes/sources/scss/app.scss'

export default function OurCommunity(props) {

    console.log(props.steeringGroupMemberData)

    const sortedData = props.steeringGroupMemberData.slice().sort((a, b) => {
        const nameA = a.fullName.toLowerCase();
        const nameB = b.fullName.toLowerCase();
        
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

    return (
        <div className='site-container'>
            <div className='site-container__top'>
                <Navbar data={props.navMenuData} />
                <main className='site-content flex flex-column flex-align-center'>
                    <h1 className='heading-background'>Our community</h1>

                    {props.ourCommunity && props.ourCommunity.sections.map((section, index) => ( // Render all this community's sections
                        <section key={index} className='margin-tb--xs'>
                            <SectionRender section={section} />
                        </section>
                    ))}

                    <p className='bg-orange-50'>add data to section renderer here, please!</p> {/* remove this one later when backend is done */}

                    <h2 className='heading-1 margin--zero margin-t--xl'>Steering group</h2>
                    <p className='max-width-35 text-align-center'>Our work is done in groups. These awesome people are making it all happen. In alphabetical order:</p>

                    <div className='container-people-cards full-width-height flex flex-row flex-align-start'> { /* flex-align-start doesnt works */}

                    {sortedData && sortedData.map((peopleCard, index) => (

                            <PeopleCard key={index} data={peopleCard} />

                        ))}
                    </div>

                </main>
            </div>

            <Footer data={props.navMenuData} />
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const navMenuData = await fetchMainMenuData();
        const footerMenuData = await fetchFooterMenuData();
        const steeringGroupMemberData = await fetchSteeringGroupMembersData();
        return { props: { navMenuData, footerMenuData, steeringGroupMemberData } };
    } catch (error) {
        console.error("(pages/chapters.jsx) Error fetching data:", error);
        return { notFound: true };
    }
}