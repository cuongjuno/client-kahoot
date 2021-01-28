import React, { useRef, useState } from 'react';
import './Header_2.css';
import logo from '../assets/logo_kahoot.svg';
import logo_home from '../assets/home.svg';
import logo_collection from '../assets/logo_colection.svg';
import logo_reports from '../assets/logo_reports.svg';
import logo_groups from '../assets/logo_groups.svg';
import logo_user from '../assets/logo_user.svg';
import drop_down from '../assets/drop_down.svg';
import drop_up from '../assets/drop_up.svg';
import log_out from '../assets/log_out.svg';

function Home2(props) {
    const [isClick, setIsClick] = useState(false);
    const refOfElement = useRef(null);
    function handleClicked() {
        console.log('saddfsd' + refOfElement.id)
        refOfElement.current.click();
        setIsClick(!isClick);
    }
    return (
        <div>
            <nav className='navbar navbar-expand navbar-light bg-custom'>
                <a className='navbar-brand' href='/'>
                    <img
                        src={logo}
                        alt='kahoot'
                        width='96px'
                        height='40px'
                    ></img>
                </a>
                <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                    <li className='nav-item active'>
                        <a className='nav-link' href='/'>
                            <img
                                src={logo_home}
                                alt='home'
                                width='32px'
                                style={{ paddingBottom: '2px' }}
                            ></img>
                            Home
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/kahoot'>
                            <img
                                src={logo_collection}
                                alt='home'
                                width='32px'
                            ></img>
                            Kahoot
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/reports'>
                            <img
                                src={logo_reports}
                                alt='home'
                                width='32px'
                            ></img>
                            Reports
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/groups'>
                            <img
                                src={logo_groups}
                                alt='home'
                                width='32px'
                            ></img>
                            Groups
                        </a>
                    </li>
                </ul>
                <div
                    className='btn-custom'
                    style={{ backgroundColor: '#26890C' }}
                >
                    Play
                </div>
                <div className='btn-custom'>Create</div>

                <div className='nav-item dropdown'>
                    {/* <div className='x' onClick={handleClicked}></div> */}
                    <a
                        ref={refOfElement}
                        className='nav-link'
                        href='#'
                        id='navbarDropdown'
                        role='button'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                    >
                        <div className='dropdown--click'>
                            <img
                                src={logo_user}
                                alt='logo user'
                                width='32px'
                                className='dropdown__user'
                            ></img>
                            <img
                                src={drop_down}
                                className='mr-0'
                                alt='drop'
                                width='32px'
                            ></img>
                        </div>
                    </a>
                    <div
                        className='dropdown-menu'
                        aria-labelledby='navbarDropdown'
                        style={{ top: '115%', left: '6px' }}
                    >
                        <p className='pl-2 mb-2'>Cường Juno</p>
                        <a className='dropdown-item' href='#'>
                            Setting
                        </a>
                        <div className='dropdown-divider'></div>
                        <a className='dropdown-item' href='#'>
                            Sign out
                            <img src={log_out} alt='log out' width='32px'></img>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Home2;
