/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import '../static/css/writepage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Writepage(props) {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [form, setForm] = useState({
    name: '',
    introduce: '',
    category: '',
    content: '',
    howto: '',
    start_date: '',
    end_date: '',
  });

  const onChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onChangeImage = e => {
    const image = e.target.files;
    setImage(image[0]);
  };
  //폼 저장된 내용 확인
  useEffect(() => {
    // console.log(form);
    // console.log(form);
    // console.log(image);
  }, [form, image]);

  const Post_club = async e => {
    e.preventDefault();
    let formData = new FormData();

    formData.append('name', form.name);
    formData.append('introduce', form.introduce);
    formData.append('content', form.content);
    formData.append('category', form.category);
    formData.append('howto', form.howto);
    formData.append('start_date', form.start_date);
    formData.append('end_date', form.end_date);
    formData.append('image', image);
    // for (let key of formData.keys()) {
    //   console.log(key, ':', formData.get(key));
    // }
    await axios
      .post(
        'https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/club/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(function (res) {
        // console.log('post 성공');
        navigate('/PostList');
      })
      .catch(function (err) {
        console.log(err, 'post 실패');
        const errormessage = [];
        err.response.data.name != undefined
          ? errormessage.push('제목 : ' + err.response.data.name)
          : null;
        err.response.data.introduce != undefined
          ? errormessage.push('한줄 소개 : ' + err.response.data.introduce)
          : null;
        err.response.data.content != undefined
          ? errormessage.push('클럽소개: ' + err.response.data.content)
          : null;
        err.response.data.start_date != undefined
          ? errormessage.push('시작일 : ' + err.response.data.start_date)
          : null;
        err.response.data.end_date != undefined
          ? errormessage.push('마지막일 : ' + err.response.data.end_date)
          : null;
        err.response.data.howto != undefined
          ? errormessage.push('인증방법 : ' + err.response.data.howto)
          : null;

        err.response.data.image != undefined
          ? errormessage.push('이미지 : ' + '이미지는 필수입니다.')
          : null;

        errormessage.length === 0
          ? alert('카테고리 선택은 필수입니다')
          : alert(errormessage.join('\n'));
      });
  };

  return (
    <>
      <Navbar />
      <style>
        {`.postlist,.clubpage,.mainpage{opacity:0.2}
      `}
      </style>
      <div className="container">
        <div className="writepage_container_container">
          <div className="write_logo">클럽모집글쓰기</div>
          <div className="write_content">
            <form>
              <div className="write_title">
                <input
                  type="text"
                  className="wri_title"
                  placeholder="제목을 입력해주세요."
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                />

                <select
                  className="select"
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  required
                >
                  <option value="" disabled="true" selected="true">
                    카테고리 선택
                  </option>
                  <option value="hobby">취미/교양</option>
                  <option value="study">스터디</option>
                  <option value="daily">일상</option>
                  <option value="exercise">운동</option>
                  <option value="etc">기타</option>
                </select>
              </div>

              <div className="write_intro">
                <input
                  type="text"
                  className="wri_title_2"
                  placeholder="클럽 한줄소개를 입력해주세요."
                  name="introduce"
                  value={form.introduce}
                  onChange={onChange}
                  required
                />
              </div>

              <section className="wri_detail">
                <div className="write_date">
                  <img
                    src="images/postpage_calender.png"
                    className="post_icon"
                    alt=""
                  />
                  <input
                    type="date"
                    className="wri_deadline"
                    name="start_date"
                    value={form.start_date}
                    onChange={onChange}
                    required
                  />

                  <div>-</div>

                  <input
                    type="date"
                    className="wri_deadline"
                    name="end_date"
                    value={form.end_date}
                    onChange={onChange}
                    required
                  />
                </div>

                <img
                  src="images/post_picture.png"
                  className="post_icon"
                  alt=""
                />
                <label className="input-file-button" htmlFor="input-file">
                  대표사진 추가
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="input-file"
                  style={{ display: 'none' }}
                  onChange={onChangeImage}
                  value={form.image}
                />
              </section>

              <div className="write_box">
                <div className="write_box_title">클럽소개</div>
                <textarea
                  type="text"
                  required
                  className="wri_box_box"
                  name="content"
                  value={form.content}
                  onChange={onChange}
                  style={{ resize: 'none' }}
                  placeholder="함께할 사람들을 모집할 수 있도록 클럽을 통해 달성하고자 하는 목표를 적어주세요."
                />
              </div>

              <div className="write_box">
                <div className="write_box_title">인증방법</div>
                <textarea
                  type="text"
                  style={{ resize: 'none' }}
                  required
                  className="wri_box_box"
                  name="howto"
                  value={form.howto}
                  onChange={onChange}
                  placeholder="함께 지켜나갈 규칙이 되는 구체적인 인증방법을 적어주세요.
                                    ex) 일주일에 한번 EX포스트 올리기 / 하루달성률 60% 넘기기"
                />
              </div>

              <div className="write_enroll">
                <button className="enroll_btn" onClick={Post_club}>
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Writepage;
