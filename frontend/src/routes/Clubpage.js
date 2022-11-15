/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Navbar from '../component/Navbar';
import '../static/css/grid.css';
import Calendar from 'react-calendar';
import '../static/css/calendar.css';
import moment from 'moment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar_part from '../component/Calendar';
import axios from 'axios';
import Experience_Post from '../component/Clubpage/Experience_Post';
import Club_Todo from '../component/Clubpage/Club_Todo';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
function Clubpage() {
  const { club_id } = useParams();
  const [club, setClub] = useState([]);
  const navigate = useNavigate();
  const imageUrl = 'http://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000' + club.image;
  const image_style3 = {
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '23vmin',
    borderRadius: '20%',
    margin: '2.5vmin',
  };
  //icon 받아오는 코드
  const club_people = `${process.env.PUBLIC_URL + '/images/club_people.png'}`;
  const detail_calendar_icon = `${
    process.env.PUBLIC_URL + '/images/detail_calender.png'
  }`;

  const quit = async () => {
    try {
      await axios
        .post(
          `http://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/accounts/club_regist/${club_id}`,
        )
        .then(res => {
          // console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const get_club = async () => {
    try {
      await axios
        .get(
          `http://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/club/${club_id}`,
        )
        .then(res => {
          // console.log(res);
          setClub(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    get_club();
  }, [club_id]);
  return (
    <>
      <Navbar />
      <style>
        {`.postlist,.mainpage,.writepage{opacity:0.2}
      `}
      </style>
      <div className="clubpage_container container">
        <div className="clubpage_item">
          <CP_container>
            <Cp_img style={image_style3}></Cp_img>
            <Cp_box>
              <Cp_name>{club.name}</Cp_name>
              <Cp_intro>{club.intoduce}</Cp_intro>
              <Cp_user>
                <img src={club_people} alt="" />
                {club.user}
              </Cp_user>

              <Cp_date>
                <img src={detail_calendar_icon} />
                {club.start_date} ~ {club.end_date}
              </Cp_date>

              <Cp_howto>
                <Cp_howtoto>How to</Cp_howtoto>
                {club.howto}
              </Cp_howto>
              <Quit
                onClick={() => {
                  quit();
                  navigate('/Mainpage');
                }}
              >
                클럽 가입 취소하기
              </Quit>
            </Cp_box>
          </CP_container>
        </div>
        <div className="clubpage_item">
          <Club_Todo
            date={moment(value).format('YYYY-MM-DD')}
            club_id={club_id}
          />
        </div>
        <div className="clubpage_item">
          <Calendar
            onChange={onChange}
            locale="en"
            value={value}
            format={(locale, date) => date.toLocaleString('en')}
            formatMonthYear={(locale, date) =>
              date.toLocaleString('kr', {
                month: 'numeric',
                year: 'numeric',
              })
            }
            formatDay={(locale, date) =>
              date.toLocaleString('en', {
                day: 'numeric',
              })
            }
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
          />
        </div>
        <div className="clubpage_item">
          <Experience_Post club_id={club_id} />
        </div>
      </div>
    </>
  );
}

export default Clubpage;
const CP_container = styled.div`
  position: relative;
  height: 95%;
`;
const Cp_box = styled.div`
  margin: 2.5vmin;
`;
const Cp_img = styled.div``;
const Cp_name = styled.div`
  font-size: 2.5vmin;
  font-weight: 600;
  margin-bottom: 1vmin;
`;
const Cp_intro = styled.div``;
const Cp_user = styled.div`
  align-items: center;
  color: #737373;
`;
const Cp_date = styled.div`
  color: #737373;
  align-items: flex_end;
  display: flex;
  padding-top: 2vmins;
`;
const Cp_howto = styled.div`
  margin-top: 2vmin;
  word-spacing: 2px;
  letter-spacing: 0.08em;
`;
const Cp_howtoto = styled.div`
  font-size: 2.5vmin;
  font-weight: 600;
  margin-bottom: 1vmin;
`;

const Quit = styled.button`
  position: absolute;
  bottom: 0;
  right: 1vmin;
  background: #ff9900;
  border-radius: 8px;
  border: none;
  padding: 1vmin;
  font-family: 'DMSans';
  font-weight: 600;
  cursor: pointer;
`;
