import React from 'react';
import style from '../../static/css/post_list.module.css';
import { useNavigate } from 'react-router-dom';
function Club_introduce({
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
  image,
}) {
  const imageUrl =
    'https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000' +
    image;
  const navigate = useNavigate();

  return (
    <>
      <div className="post_list_item">
        <section className={style.club_category}>{category}</section>
        {/* <section>{id}</section> */}
        <section
          className={style.club_image}
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></section>
        <div className={style.club_contents}>
          <section className={style.club_title}>{title}</section>
          <section className={style.club_intro}>{intro}</section>
          <section className={style.club_user}>{user}</section>
          <section
            className={style.club_detail}
            onClick={() => {
              navigate(`/PostList/${id}`);
            }}
          >
            자세히보기
          </section>
          <img className={style.club_people} src="images/club_people.png"></img>
        </div>
      </div>
    </>
  );
}

export default Club_introduce;
