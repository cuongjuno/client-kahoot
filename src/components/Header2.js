import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Dropdown,
} from 'reactstrap';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions';

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
import logo_menu from '../assets/logo_menu.svg';
import logo_create from '../assets/logo_create.svg';
function Header2(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [collapeOpen, setCollapeOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggleCollape = () => setCollapeOpen(!collapeOpen);

    const history = useHistory();
    const dispatch = useDispatch();
    function handleLogout() {
        dispatch(logout());
    }
    // useEffect(() => {
    //     console.log(history)
    // }, [])

    return (
        <div>
            <Navbar expand='md' className='bg-custom'>
                <div className='btn-menu' style={{ display: 'none' }}>
                    <img src={logo_menu} alt='logo menu' width='32px'></img>
                </div>
                <NavbarBrand>
                    <Link to='/'>
                        <img
                            src={logo}
                            alt='kahoot'
                            width='96px'
                            height='40px'
                        ></img>
                    </Link>
                </NavbarBrand>
                <Nav className='mr-auto' navbar>
                    <NavItem
                        className={`${
                            history.location.pathname == '/' ? 'active' : ''
                        }`}
                    >
                        <Link to='/'>
                            <img src={logo_home} alt='home' width='32px'></img>
                            <p>Home</p>
                        </Link>
                    </NavItem>
                    <NavItem
                        className={`${
                            history.location.pathname == '/kahoot'
                                ? 'active'
                                : ''
                        }`}
                    >
                        <Link to='/kahoot'>
                            <img
                                src={logo_collection}
                                alt='kahoot'
                                width='32px'
                            ></img>
                            <p>Kahoot</p>
                        </Link>
                    </NavItem>
                    <NavItem
                        className={`${
                            history.location.pathname == '/reports'
                                ? 'active'
                                : ''
                        }`}
                    >
                        <Link to='/reports'>
                            <img
                                src={logo_reports}
                                alt='kahoot'
                                width='32px'
                            ></img>
                            <p>Reports</p>
                        </Link>
                    </NavItem>
                    <NavItem
                        className={`${
                            history.location.pathname == '/groups'
                                ? 'active'
                                : ''
                        }`}
                    >
                        <Link to='/groups'>
                            <img
                                src={logo_groups}
                                alt='kahoot'
                                width='32px'
                            ></img>
                            <p>Reports</p>
                        </Link>
                    </NavItem>
                </Nav>

                <Link to='/wait'>
                    <div
                        className='btn-custom'
                        style={{ backgroundColor: '#26890C' }}
                    >
                        Play
                    </div>
                </Link>
                <Link to='/create'>
                    <div className='btn-custom'>Create</div>
                </Link>
                <div className='btn-create' style={{ display: 'none' }}>
                    <Link to='./create'>
                        <img
                            src={logo_create}
                            alt='logo create'
                            width='32px'
                        ></img>
                    </Link>
                </div>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle>
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
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem text>Cường Juno</DropdownItem>
                        <DropdownItem>Setting</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem
                            style={{ color: 'rgb(198, 9, 41)' }}
                            onClick={() => dispatch(logout())}
                        >
                            <Link to='/login'>
                                <img
                                    src={log_out}
                                    alt='log out'
                                    width='32px'
                                    style={{ margin: '0 0 0 -10px' }}
                                ></img>
                                Sign out
                            </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Navbar>
        </div>
    );
}

export default Header2;
