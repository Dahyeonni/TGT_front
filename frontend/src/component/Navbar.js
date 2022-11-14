/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from './Modal';
function Navbar(props) {
  const logo = `${process.env.PUBLIC_URL + '/images/logo.png'}`;
  const mainpage = `${process.env.PUBLIC_URL + '/images/Mainpage.png'}`;
  const line_img = `${process.env.PUBLIC_URL + '/images/line.png'}`;
  const clubpage = `${process.env.PUBLIC_URL + '/images/Clubpage.png'}`;
  const writepage = `${process.env.PUBLIC_URL + '/images/Writepage.png'}`;
  const clublistpage = `${process.env.PUBLIC_URL + '/images/Clublistpage.png'}`;
  const logout_img = `${process.env.PUBLIC_URL + '/images/Logout.png'}`;

  const [clubList, setClubList] = useState([]);

  const [modal, setModal] = useState(false);
  const [user_club_list, setUser_club_list] = useState([]);

  useEffect(() => {
    // console.log(modal);
    // console.log(user_club_list);
  }, [modal]);
  const outside = useRef();
  const get_profile = async () => {
    try {
      await axios.get('http://127.0.0.1:8000/accounts/myprofile').then(res => {
        setUser_club_list(res.data.user_club_list);
        // console.log(res.data.user_club_list);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar_style>
        <NavLink to="/Mainpage">
          <img src={logo} style={image_style} alt="logo" />
          <img src={line_img} style={line} />
        </NavLink>
        <NavLink to="/Mainpage">
          <img
            src={mainpage}
            style={icon}
            className="mainpage"
            alt="mainpage"
          />
        </NavLink>
        <NavLink to="/Postlist">
          <img
            src={clublistpage}
            style={icon}
            className="postlist"
            alt="clublist"
          />
        </NavLink>
        <div>
          {modal && <Modal key={user_club_list} club={user_club_list} />}

          <img
            style={icon}
            src={clubpage}
            className="clubpage"
            alt="clubpage"
            onClick={() => {
              setModal(!modal);
              get_profile();
            }}
          />
        </div>
        <NavLink to="/Writepage">
          <img
            style={icon}
            src={writepage}
            className="writepage"
            alt="writepage"
          />
        </NavLink>
        <NavLink to="/" onClick={() => sessionStorage.clear()}>
          <img
            src={logout_img}
            style={logout}
            className="logout"
            alt="logout"
          />
        </NavLink>
      </Navbar_style>
    </>
  );
}

export default Navbar;

const Navbar_style = styled.div`
  position: fixed;
  background: white;
  width: 6%;
  height: 100%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const image_style = {
  width: '100%',
  padding: '10%',
  boxSizing: 'border-box',
  marginTop: '40%',
};

const icon = {
  display: 'flex',
  alignItems: 'center',
  width: '20%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50%',
  cursor: 'pointer',
};

const line = {
  boxSizing: 'border-box',
  width: '100%',
  padding: '10%',
};

const logout = {
  cursor: 'pointer',
  position: 'absolute',
  bottom: '5%',
  width: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  filter:
    'invert(100%) sepia(9%) saturate(0%) hue-rotate(114deg) brightness(86%) contrast(89%)',
};
