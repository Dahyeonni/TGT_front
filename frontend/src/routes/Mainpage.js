/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from 'react';
import Navbar from '../component/Navbar';
import '../static/css/grid.css';
import { useState } from 'react';
// import Calendar_part from '../component/Calendar';
import Info from '../component/Mainpage/Info';
import axios from 'axios';
import Todo from '../component/Mainpage/Todo';
import Memo from '../component/Mainpage/Memo';
import List from '../component/Mainpage/List';
import Calendar from 'react-calendar';
import '../static/css/calendar.css';
import moment from 'moment';
function Mainpage(props) {
  const [result, setResult] = useState([]);
  const [profile_info, setProfile] = useState([]);
  const [profile_info2, setProfile2] = useState([]);
  const [user_club_list, setUser_club_list] = useState([]);
  const [user_todo_list, setUser_todo_list] = useState([]);

  //달력
  const [value, onChange] = useState(new Date());

  const get_profile = async () => {
    try {
      await axios
        .get(
          'http://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/accounts/myprofile',
        )
        .then(res => {
          // console.log(res);
          setProfile(res.data);
          setProfile2(res.data.profile);
          setUser_club_list(res.data.user_club_list);
          setUser_todo_list(res.data.user_todo_list);
          sessionStorage.setItem('userid', res.data.profile.id);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get_profile();
  }, []);

  return (
    <>
      <Navbar />
      <style>
        {`.postlist,.clubpage,.writepage{opacity:0.2}
      `}
      </style>

      <div className="mainpage_container container">
        <div className="item info">
          <Info
            id={profile_info2.id}
            email={profile_info.email}
            username={profile_info.username}
            user_image={profile_info2.user_image}
            content={profile_info2.content}
          />
        </div>
        <div className="item calendar">
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

          <Memo my_memo={profile_info2.memo} />
        </div>
        <div className="item todo">
          <Todo
            date={moment(value).format('YYYY-MM-DD')}
            clubs={user_club_list}
            user_id={profile_info2.id}
          />
        </div>
        <div className="item club_list">
          <List clubs={user_club_list} />
        </div>
      </div>
    </>
  );
}

export default Mainpage;
