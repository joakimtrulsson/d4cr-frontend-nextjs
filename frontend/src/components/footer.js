import DesignGuideList from '../database/footer-data/design-guide-list'
import LocalChaptersList from '../database/footer-data/local-chapter-list'
import AboutUsList from '../database/footer-data/about-us-list'
import BecomeMemberForm from '../components/become-member-form'
import Wave from './wave'
import Icon from '../features/icons/d4cr-icon.png'
import Image from 'next/image'
import '../styles/components/footer.scss'

const Footer = () => {

    return (
        <div className='footer'>

            <BecomeMemberForm /> 

            <Wave color={null} bgColor={null} />

            <div className="footer-body">

                <div className='footer-icon-and-social-platform'>
                    <div className="footer-icon">
                        <Image 
                        src={Icon} 
                        width={110}
                        height={40}
                        alt="D4CR" 
                        />
                    </div>

                    <div className='footer-social-platform'>
                        <p>Join us</p>
                        <div className='social-platforms-icons'>
                            <a href="#" className="social-platforms">X</a>
                            <a href="#" className="social-platforms">X</a>
                            <a href="#" className="social-platforms">X</a>
                            <a href="#" className="social-platforms">X</a>
                        </div>
                    </div>

                    <div className='footer-cookies-and-policy'>
                        <a href="#">Cookies</a>
                        <a href="#">Integrity policy</a>
                    </div>

                </div>

                <div className='footer-menu-container'>

                    <div className="footer-menu-content">
                        <p>Design guide</p>
                        <div className="subitem-list">
                            <ul>
                                {DesignGuideList.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <a to={item.subItemUrl}>{item.subItemTitle}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="footer-menu-content">
                        <p>Local chapters</p>
                        <div className="subitem-list">
                            <ul>
                                {LocalChaptersList.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <a to={item.subItemUrl}>{item.subItemTitle}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="footer-menu-content">
                        <p>About us</p>
                        <div className="subitem-list">
                            <ul>
                                {AboutUsList.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <a to={item.subItemUrl}>{item.subItemTitle}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer