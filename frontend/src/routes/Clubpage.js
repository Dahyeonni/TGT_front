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
function Clubpage() {
  const { club_id } = useParams();
  const [club, setClub] = useState([]);
  const get_club = async () => {
    try {
      await axios.get(`http://127.0.0.1:8000/club/${club_id}`).then(res => {
        console.log(res);
        setClub(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

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
        <div className="clubpage_item">{club.name}</div>
        <div className="clubpage_item"></div>
        <div className="clubpage_item">
          <Calendar_part />
        </div>
        <div className="clubpage_item">
          <Experience_Post club_id={club_id} />
        </div>
      </div>
    </>
  );
}

export default Clubpage;
