import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData, fetchSteeringGroupMembersData } from '../graphql'
import xTwitterIcon from '../themes/sources/assets/graphics/icons/x-twitter-yellow-600.svg'
import linkedinIcon from '../themes/sources/assets/graphics/icons/linkedin-yellow-600.svg'
import Image from 'next/image'
import Link from 'next/link'
import '../themes/sources/scss/app.scss'

export default function OurCommunity(props) {

    console.log(props.steeringGroupMemberData)

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

                        {props.steeringGroupMemberData && props.steeringGroupMemberData.map((peopleCard, index) => (
                            <div className='people-card bg-yellow-50 borderradius--xxs margin--xs' key={index}>

                                <div className='image-wrapper'>
                                    <Image className='center-image' src="https://ew.com/thmb/0fht_kipVY-H92xQQVgR4srP5QI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/liam-neeson-taken-021823-2000-cc3a9a86583845a9a35302b40c2145ff.jpg"
                                        alt="portrait"
                                        fill={true} />
                                </div>

                                <div className='margin--s'>
                                    <div>
                                        <h3 className='margin--zero'>{peopleCard.fullName}</h3>
                                        <p className='margin--zero'>{peopleCard.role}</p>
                                        <p className='margin--zero'>{peopleCard.country}, {peopleCard.city}</p>
                                    </div>
                                    <div className='flex flex-row flex-justify-end flex-align-center'>
                                        <Link className='margin-r--xxs' href={"null"} >
                                            <Image src={xTwitterIcon} alt="twitter" />
                                        </Link>
                                        <Link className='' href={"null"} >
                                            <Image src={linkedinIcon} alt="twitter" />
                                        </Link>

                                    </div>
                                </div>
                            </div>
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