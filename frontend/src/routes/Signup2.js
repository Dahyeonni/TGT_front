import React, { useEffect, useState } from 'react';
import '../static/css/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signup2(props) {
  const [image, setImage] = useState('');
  const [user_image, setUserImage] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  useEffect(() => {}, [content, image]);

  const onchange_content = e => {
    const content = e.target.value;
    setContent(content);
  };

  const addImage = e => {
    const images = e.target.files;
    setUserImage(images);
    const ImageURL = URL.createObjectURL(images[0]);
    setImage(ImageURL);
  };

  const post_profile = async e => {
    e.preventDefault();
    let formData = new FormData();

    formData.append('user_image', user_image[0]);
    formData.append('content', content);
    // for (let key of formData.keys()) {
    //   console.log(key, ':', formData.get(key));
    // }
    await axios
      .patch(
        'http://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/accounts/profile_update',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(function (res) {
        navigate('/Mainpage');
      })
      .catch(function (err) {
        console.log(err, 'post 실패');
      });
  };

  return (
    <>
      <div className="login_container_container">
        <section className="login_logo">
          <div className="login_big_logo">TGT</div>
          <div className="login_small_logo">To Gather, Togather</div>
        </section>

        <section className="login_container">
          <div className="login_name_choice">
            <div className="signup_name2">나의 프로필</div>
          </div>

          <div className="login_box">
            <div className="signup2_input">
              <label className="label_style">프로필 사진</label>
            </div>
            <div className="profile_image">
              {image === '' ? (
                <div className="preview" style={{ opacity: 0.9 }}>
                  프로필 미리보기
                </div>
              ) : (
                <div
                  className="preview"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              )}
            </div>
            <form>
              <div className="signup2_input">
                <label className="input-file-button2" htmlFor="input-file">
                  <img
                    src="images/post_picture.png"
                    className="post_icon"
                    alt=""
                  />
                  사진 찾아보기
                </label>
                <input
                  type="file"
                  id="input-file"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={addImage}
                />
              </div>
              <div
                className="signup2_input"
                style={{ flexDirection: 'column' }}
              >
                <label className="label_style">한 줄 소개</label>
                <input
                  type="text"
                  placeholder="한 줄 소개를 작성해주세요!"
                  className="one_introduce"
                  onChange={onchange_content}
                />
              </div>
            </form>
            <div className="signup2_input">
              <button className="signup2_btn" onClick={post_profile}>
                프로필 등록하기
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Signup2;
