/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Club_introduce from '../component/PostListPage/Club_introduce';
import Navbar from '../component/Navbar';
import '../static/css/grid.css';
import style from '../static/css/post_list.module.css';
import { useState } from 'react';
import axios from 'axios';
function PostListPage() {
  const [selected_nav, setselected_nav] = useState(0);
  useEffect(() => {
    get_club_list();
  }, []);

  const [club_list, setClubList] = useState([]);
  const get_club_list = async () => {
    try {
      await axios
        .get(
          'http://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/club/',
        )
        .then(res => {
          // console.log(res);
          setClubList(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const category_list = ['exercise', 'study', 'daily', 'hobby', 'etc'];
  const category_list_ko = ['운동', '스터디', '일상', '취미/교양', '기타'];

  return (
    <>
      <Navbar />
      <style>
        {`.mainpage,.clubpage,.writepage{opacity:0.2}
      `}
      </style>
      <div className="post_list_container container">
        <div className="post_list_item">
          <div className={style.club_list}>
            <section
              className={style.nav_list}
              onClick={() => {
                setselected_nav(0);
              }}
              style={
                selected_nav == 0
                  ? { backgroundColor: '#FFE8C6', borderRadius: `10px` }
                  : null
              }
            >
              운동
            </section>
            <hr />
            <section
              className={style.nav_list}
              onClick={() => {
                setselected_nav(1);
              }}
              style={
                selected_nav == 1
                  ? { backgroundColor: '#FFE8C6', borderRadius: `10px` }
                  : null
              }
            >
              스터디
            </section>
            <hr />
            <section
              className={style.nav_list}
              onClick={() => {
                setselected_nav(2);
              }}
              style={
                selected_nav == 2
                  ? { backgroundColor: '#FFE8C6', borderRadius: `10px` }
                  : null
              }
            >
              일상
            </section>
            <hr />
            <section
              className={style.nav_list}
              onClick={() => {
                setselected_nav(3);
              }}
              style={
                selected_nav == 3
                  ? { backgroundColor: '#FFE8C6', borderRadius: `10px` }
                  : null
              }
            >
              취미/교양
            </section>
            <hr />
            <section
              className={style.nav_list}
              onClick={() => {
                setselected_nav(4);
              }}
              style={
                selected_nav == 4
                  ? { backgroundColor: '#FFE8C6', borderRadius: `10px` }
                  : null
              }
            >
              기타
            </section>
          </div>
        </div>
        {club_list
          .filter(club => club.category === category_list[selected_nav])
          .map(club => (
            <Club_introduce
              id={club.id}
              title={club.name}
              content={club.content}
              category={category_list_ko[category_list.indexOf(club.category)]}
              date={club.date}
              howto={club.howto}
              created_at={club.created_at}
              updated_at={club.updated_at}
              post={club.post}
              image={club.image}
              user={club.user}
              intro={club.introduce}
            />
          ))}
      </div>
    </>
  );
}

export default PostListPage;
