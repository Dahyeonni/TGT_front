import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
import '../static/css/grid.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Postdetail from '../component/PostListPage/PostDetail';
function PostDetailPage(props) {
  const [club, setClub] = useState('');
  const { club_id } = useParams();
  useEffect(() => {
    get_club();
  }, []);

  const get_club = async () => {
    try {
      await axios.get(`http://127.0.0.1:8000/club/${club_id}`).then(res => {
        // console.log(res);
        setClub(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const category_list = ['hobby', 'study', 'daily', 'exercise', 'etc'];
  const category_list_ko = ['취미/교양', '스터디', '일상', '운동', '기타'];
  return (
    <>
      <Postdetail
        id={club.id}
        title={club.title}
        content={club.content}
        category={category_list_ko[category_list.indexOf(club.category)]}
        howto={club.howto}
        user={club.user}
        start_date={club.start_date}
        end_date={club.end_date}
        image={club.image}
      />
    </>
  );
}

export default PostDetailPage;
