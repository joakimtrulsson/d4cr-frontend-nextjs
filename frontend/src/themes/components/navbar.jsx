import DesignGuideDropdown from '../../database/navbar-data/design-guide-dropdown'
import LocalChaptersDropdown from '../../database/navbar-data/local-chapter-dropdown'
import AboutUsDropdown from '../../database/navbar-data/about-us-dropdown'
import Icon from '../sources/assets/graphics/icons/d4cr-icon.png'
import Image from 'next/image'
import SecondaryButton from '../components/buttons/secondary-button'
import '../sources/scss/base/utils.scss'
import '../sources/scss/components/navbar.scss'

const Navbar = () => {

    return(
        <div className="navbar flex flex-row flex-justify-between flex-align-center margin-lr--m">

            <div className="navbar-icon">
                <Image 
                src={Icon} 
                width={165}
                height={48}
                alt="D4CR" 
                />
            </div>

            <div className='navbar-menu-container flex flex-row'>
                <div className="navbar-menu-content">
                    <p>Design guide</p>
                    <div className="dropdown-container bg-yellow-300">
                        <ul className='no-bullets'>
                            {DesignGuideDropdown.map((item, index) => {
                                return(
                                    <li key={index}>
                                        <a to={item.subItemUrl}>{item.subItemTitle}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="navbar-menu-content">
                    <p>Local chapters</p>
                    <div className="dropdown-container bg-yellow-300">
                        <ul className='no-bullets'>
                            {LocalChaptersDropdown.map((item, index) => {
                                return(
                                    <li key={index}>
                                        <a to={item.subItemUrl}>{item.subItemTitle}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="navbar-menu-content">
                    <p>About us</p>
                    <div className="dropdown-container bg-yellow-300">
                        <ul className='no-bullets'>
                            {AboutUsDropdown.map((item, index) => {
                                return(
                                    <li key={index}>
                                        <a to={item.subItemUrl}>{item.subItemTitle}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>

        <div className="">
            <SecondaryButton className='' title='GET INVOLED' />
        </div>
    </div>
    )
}

export default Navbar