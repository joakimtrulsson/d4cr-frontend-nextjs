import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import getColorCode from '../themes/sources/js/color-code'
import abbreviateWord from '../themes/sources/js/abbrevia-word'

export default function PeopleCard({ data }) {

    console.log(data)

    const { library, config } = require('@fortawesome/fontawesome-svg-core');
    library.add(fab)

    return (
        <div className='people-card bg-yellow-50 borderradius--xxs margin--xs'>

            {/* {data.image &&
                <Image className='center-image' src={data.image.url}
                    alt="portrait"
                    fill={true} />
            } */}


            {/* delete this one later... */}
            <div className='image-wrapper'>
                <Image className='center-image' src="https://ew.com/thmb/0fht_kipVY-H92xQQVgR4srP5QI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/liam-neeson-taken-021823-2000-cc3a9a86583845a9a35302b40c2145ff.jpg"
                    alt="portrait"
                    fill={true} />
            </div>

            <div className='text-wrapper margin--s flex flex-column flex-justify-between'>
                <div className=''>
                    <h3 className='margin--zero color-grey-700'>{abbreviateWord(data.fullName, 30)}</h3>
                    <p className='margin--zero color-grey-700'>{abbreviateWord(data.role, 20)}</p>
                </div>

                <div className=''>
                    <p className='margin--zero color-grey-700'>{abbreviateWord(data.country, 16)}, {abbreviateWord(data.city, 16)}</p>
                </div>
                <div className=' flex flex-row flex-justify-end flex-align-center'>

                    {data.socialMediaIcon1 && data.socialMediaUrl1 && 
                     <Link className='' href={data.socialMediaUrl1} >
                        <FontAwesomeIcon icon={['fab', data.socialMediaIcon1.iconName]} color={getColorCode('yellow-600')} size="2x" />
                    </Link>
                    }

                    {data.socialMediaIcon2 && data.socialMediaUrl2 && 
                     <Link className='margin-l--xxs' href={data.socialMediaUrl2} >
                        <FontAwesomeIcon icon={['fab', data.socialMediaIcon2.iconName]} color={getColorCode('yellow-600')} size="2x" />
                    </Link>
                    }

                </div>
            </div>
        </div>
    );
}