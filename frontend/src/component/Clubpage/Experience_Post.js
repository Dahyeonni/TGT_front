import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const plus_image = `${process.env.PUBLIC_URL + '/images/plus.png'}`;

function Experience_Post({ club_id }) {
  const [post_bool, setPost_bool] = useState(false);
  const [post_list, setPostList] = useState([]);
  const [post_image, setPostImage] = useState([]);
  const get_post_list = async () => {
    try {
      await axios
        .get(
          `https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/club/${club_id}/post`,
        )
        .then(res => {
          // console.log(`Post Exeperience 불러오기${club_id} 성공!`, res);
          setPostList(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get_post_list();
  }, [club_id]);

  const post_experience = async image => {
    let formData = new FormData();

    formData.append('post', image);

    await axios
      .post(
        `https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/club/${club_id}/post`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(function (res) {
        // console.log('experience 이미지 post 성공!');
        setPost_bool(!post_bool);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const addImage = e => {
    const images = e.target.files[0];
    setPostImage(images);
    post_experience(images);
  };

  useEffect(() => {
    get_post_list();
  }, [post_bool]);
  return (
    <>
      <Experience>
        <Title_area>
          <Title>Experience Post</Title>
          <label htmlFor="image">
            <img src={plus_image} style={Plus} />
          </label>
          <input
            onChange={addImage}
            type="file"
            accept="image/*"
            id="image"
            style={{ display: `none` }}
          ></input>
        </Title_area>
        <ExperienceBody>
          <Swiper
            style={{ width: '100%' }}
            slidesPerView={6}
            mousewheel={true}
            spaceBetween={25}
            scrollbar={{ draggable: true }}
          >
            {post_list.slice(0, 6).map((data, id) => (
              <SwiperSlide key={id}>
                <img
                  src={`https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000${data.post}`}
                  alt="post 이미지"
                  height={'100vh'}
                  width={'100%'}
                  style={{ borderRadius: '15px' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <br />
          <Swiper
            style={{ width: '100%' }}
            slidesPerView={6}
            mousewheel={true}
            spaceBetween={25}
            scrollbar={{ draggable: true }}
          >
            {post_list.slice(6).map((data, id) => (
              <SwiperSlide key={id}>
                <img
                  src={`https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000${data.post}`}
                  alt="post 이미지"
                  height={'100vh'}
                  width={'100%'}
                  style={{ borderRadius: '15px' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <br />
        </ExperienceBody>
      </Experience>
    </>
  );
}

export default Experience_Post;
const Experience = styled.div`
  margin: 3vmin;
`;
const Title = styled.section`
  font-size: 3vmin;
  font-weight: 600;
  float: left;
  width: 92%;
  margin-bottom: 3vmin;
`;

const Plus = {
  height: '3vmin',
  float: 'right',
  cursor: 'pointer',
  marginBottom: '3vmin',
};

const ExperienceBody = styled.div`
  width: 100%;
  margin-top: 3vmin;
  height: 100%;
  margin: auto;
  max-height: fit-content;
`;
const Title_area = styled.div`
  width: 100%;
  display: block;
`;
