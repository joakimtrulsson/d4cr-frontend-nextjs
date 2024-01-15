import DesignGuideDropdown from '../database/navbar-data/design-guide-dropdown'
import LocalChaptersDropdown from '../database/navbar-data/local-chapter-dropdown'
import AboutUsDropdown from '../database/navbar-data/about-us-dropdown'
import '../styles/components/navbar.scss'
import Icon from '../features/icons/d4cr-icon.png'
import Image from 'next/image'
import SecondaryButton from './buttons/secondary-button'

const Navbar = () => {

    return(
        <div className="navbar">

            <div className="nav-icon">
                <Image 
                src={Icon} 
                width={110}
                height={40}
                alt="D4CR" 
                />
            </div>

            <div className='nav-menu-container'>
                <div className="nav-menu-dropdown">
                    <p>Design guide</p>
                    <div className="dropdown-design-guide-content">
                        <ul>
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

                <div className="nav-menu-dropdown">
                    <p>Local chapters</p>
                    <div className="dropdown-local-chapters-content">
                        <ul>
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

                <div className="nav-menu-dropdown">
                    <p>About us</p>
                    <div className="dropdown-about-us-content">
                        <ul>
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

        <div className="nav-get-involved-btn">
            <SecondaryButton title='GET INVOLED' />
        </div>
    </div>
    )
}

export default Navbar