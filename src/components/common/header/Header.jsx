/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { SlTag } from 'react-icons/sl';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import BrowserHeader from './browser/BrowserHeader';
import MobileHeader from './mobile/MobileHeader';
import { palette } from '../../../styles/palette';

export default function Header() {
  const cookies = new Cookies();
  const token = cookies.get('Token');

  const navigate = useNavigate();

  const logOutEventHandler = async () => {
    const cookie = new Cookies();
    await cookie.remove('Token');

    navigate('/');
    alert('로그아웃 되었습니다!');
  };
  const clickNaviHandler = () => {
    console.log('ok');
  };

  return (
    <StHeader>
      <div className="header_inner">
        <BrowserHeader
          token={token}
          logOutEventHandler={logOutEventHandler}
          clickNaviHandler={clickNaviHandler}
        />
        <MobileHeader logOutEventHandler={logOutEventHandler} token={token} />
      </div>
    </StHeader>
  );
}

const StHeader = styled.header`
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  background: #fff;
  padding: 0 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #eaeaea;
  z-index: 2;
  ul {
  }

  @media (max-width: 768px) {
    position: fixed;
    padding: 0 2rem;
  }
`;
