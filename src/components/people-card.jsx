import React from 'react';
import xTwitterIcon from '../themes/sources/assets/graphics/icons/x-twitter-yellow-600.svg'
import linkedinIcon from '../themes/sources/assets/graphics/icons/linkedin-yellow-600.svg'
import Image from 'next/image'
import Link from 'next/link'
import abbreviateWord from '../themes/sources/js/abbrevia-word'

export default function PeopleCard({ data }) {

    console.log(data)


    return (
        <div className='people-card bg-yellow-50 borderradius--xxs margin--xs'>

            <div className='image-wrapper'>
                <Image className='center-image' src="https://ew.com/thmb/0fht_kipVY-H92xQQVgR4srP5QI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/liam-neeson-taken-021823-2000-cc3a9a86583845a9a35302b40c2145ff.jpg"
                    alt="portrait"
                    fill={true} />
            </div>

            <div className='text-wrapper dev-border margin--s flex flex-column flex-justify-between'>
                <div className='dev-border'>
                <h3 className='margin--zero'>{abbreviateWord(data.fullName, 30)}</h3>
                <p className='margin--zero'>{abbreviateWord(data.role, 20)}</p>

                </div>
                <div className='dev-border'>
                    <p className='margin--zero'>{abbreviateWord(data.country, 16)}, {abbreviateWord(data.city, 16)}</p>
                </div>
                <div className='dev-border flex flex-row flex-justify-end flex-align-center'>
                    <Link className='margin-r--xxs' href={"null"} >
                        <Image src={xTwitterIcon} alt="twitter" />
                    </Link>
                    <Link className='' href={"null"} >
                        <Image src={linkedinIcon} alt="twitter" />
                    </Link>

                </div>
            </div>
        </div>
    );
}