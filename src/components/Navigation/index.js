import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import styled from 'styled-components';

const Navigation = () => {
    return (
        <div>
            <AuthUserContext.Consumer>
                {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
            </AuthUserContext.Consumer>
        </div>
    )
}

const NavigationAuth = (props) => {
    return (
        <StyledNavbar>
            <ul>
                <li>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                </li>
                <li>
                    <Link to={ROUTES.ADMIN}>Admin</Link>
                </li>
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </StyledNavbar>
    )
}

const NavigationNonAuth = (props) => {
    return (
        <StyledNavbar>
            <ul>
                <li>
                    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </li>
                <li>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
            </ul>
        </StyledNavbar>
    )
}

const StyledNavbar = styled.div`
    & > ul{
        display: flex;
        list-style: none;
        justify-content: space-evenly;
        align-items: center;
        & > li{
            display: block;
            cursor: pointer;
            padding: 5px;
            border-bottom: 3px solid rgba(0,0,0,.3);
            border-radius: 2px;
            font-size: 1.2em;
            &:hover{
                border-bottom: 3px solid green;
            }
            & > a {
                text-decoration: none;
                color: black;
            }
            & > button {
                background: rgba(0,0,0,0);
                border: none;
                font-size: 1em;
                cursor: pointer;
            }
        }
    }
`

export default Navigation;