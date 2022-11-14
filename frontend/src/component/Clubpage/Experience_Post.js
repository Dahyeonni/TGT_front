import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import SwiperCore, { Grid, Pagination } from 'swiper';
const plus_image = `${process.env.PUBLIC_URL + '/images/plus.png'}`;

function Experience_Post({ club_id }) {
  let post_list1 = '';
  let post_list2 = '';
  const [post_list, setPostList] = useState([]);
  const [post_image, setPostImage] = useState([]);
  const get_post_list = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/club/${club_id}/post`)
        .then(res => {
          console.log(`Post Exeperience 불러오기${club_id} 성공!`, res);
          setPostList(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get_post_list();
  }, []);

  const post_experience = async image => {
    let formData = new FormData();

    formData.append('post', image);

    await axios
      .post(`http://127.0.0.1:8000/club/${club_id}/post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (res) {
        console.log('experience 이미지 post 성공!');
      })
      .catch(function (err) {
        console.log(err, 'post 실패');
      });
  };

  const addImage = e => {
    const images = e.target.files[0];
    setPostImage(images);
    post_experience(images);
  };

  useEffect(() => {
    get_post_list();
  }, [get_post_list, post_image]);
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
          {post_list.length > 5 ? (
            <>
              <Swiper
                style={{ width: '100%' }}
                slidesPerView={5}
                mousewheel={true}
                spaceBetween={25}
                scrollbar={{ draggable: true }}
              >
                {post_list.length > 10
                  ? post_list
                      .slice(0, parseInt((post_list.length + 1) / 2))
                      .map((data, id) => (
                        <SwiperSlide key={id}>
                          <img
                            src={`http://127.0.0.1:8000${data.post}`}
                            alt="post 이미지"
                            height={'140vmax'}
                            width={'100%'}
                            style={{ borderRadius: '15px' }}
                          />
                        </SwiperSlide>
                      ))
                  : post_list.slice(0, 5).map((data, id) => (
                      <SwiperSlide key={id}>
                        <img
                          src={`http://127.0.0.1:8000${data.post}`}
                          alt="post 이미지"
                          height={'140vmax'}
                          width={'100%'}
                          style={{ borderRadius: '15px' }}
                        />
                      </SwiperSlide>
                    ))}
              </Swiper>
              <Swiper
                style={{ width: '100%' }}
                slidesPerView={5}
                mousewheel={true}
                spaceBetween={25}
                scrollbar={{ draggable: true }}
              >
                {post_list.length > 10
                  ? post_list
                      .slice(
                        parseInt((post_list.length + 1) / 2),
                        post_list.length,
                      )
                      .map((data, id) => (
                        <SwiperSlide key={id}>
                          <img
                            src={`http://127.0.0.1:8000${data.post}`}
                            alt="post 이미지"
                            height={'140vmax'}
                            width={'100%'}
                            style={{ borderRadius: '15px' }}
                          />
                        </SwiperSlide>
                      ))
                  : post_list.slice(5, post_list.length).map((data, id) => (
                      <SwiperSlide key={id}>
                        <img
                          src={`http://127.0.0.1:8000${data.post}`}
                          alt="post 이미지"
                          height={'140vmax'}
                          width={'100%'}
                          style={{ borderRadius: '15px' }}
                        />
                      </SwiperSlide>
                    ))}
              </Swiper>
            </>
          ) : (
            <>
              <Swiper
                style={{ width: '100%' }}
                slidesPerView={5}
                mousewheel={true}
                spaceBetween={25}
                scrollbar={{ draggable: true }}
              >
                {post_list.map((data, id) => (
                  <SwiperSlide key={id}>
                    <img
                      src={`http://127.0.0.1:8000${data.post}`}
                      alt="post 이미지"
                      height={'140vmax'}
                      width={'100%'}
                      style={{ borderRadius: '15px' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
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
`;
const Title_area = styled.div`
  width: 100%;
  display: block;
`;
