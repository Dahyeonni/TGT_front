import React, { useEffect, useState } from 'react';
import Navbar from '../../component/Navbar';
import '../../static/css/writepage.css';
import '../../static/css/postdetail.css';
import axios from 'axios';
function Postdetail({
  id,
  title,
  content,
  category,
  date,
  howto,
  created_at,
  updated_at,
  post,
  user,
  intro,
  start_date,
  end_date,
  image,
}) {
  const club_people = `${process.env.PUBLIC_URL + '/images/club_people.png'}`;
  const detail_calendar_icon = `${
    process.env.PUBLIC_URL + '/images/detail_calender.png'
  }`;
  const post_enroll = async () => {
    try {
      await axios
        .post(`http://127.0.0.1:8000/accounts/club_regist/${id}`)
        .then(res => {
          // console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const imageUrl = 'http://127.0.0.1:8000' + image;
  return (
    <>
      <Navbar />
      <style>
        {`.postlist,.mainpage,.writepage{opacity:0.2}
       
      `}
      </style>

      <div className="container">
        <div className="writepage_container_container">
          <section className="detail_con">
            <section className="club_category2">{category}</section>
            {/* <section>{id}</section> */}
            <section
              className="club_image2"
              style={{ backgroundImage: `url(${imageUrl})` }}
            ></section>
            <div className="club_contents2">
              <div className="club_c">
                <section className="club_title2">{title}</section>
                <div className="detail_btn_btn">
                  <button className="detail_btn" onClick={() => post_enroll()}>
                    클럽 가입하기
                  </button>
                </div>
              </div>

              <div className="detail_row">
                <img className="detail_image" src={club_people} alt="" />
                {user}
              </div>

              <div className="detail_row">
                <img className="detail_image" src={detail_calendar_icon} />
                {start_date}
                <div>~</div>
                {end_date}
              </div>

              <section className="detail_box">
                <div className="detail_box_t">클럽 소개</div>
                <div className="detail_box_box">{content}</div>
              </section>
              <section className="detail_box">
                <div className="detail_box_t">인증 방법</div>
                <div className="detail_box_box">{howto}</div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Postdetail;
