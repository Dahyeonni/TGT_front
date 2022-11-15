import React from 'react';
import '../static/css/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Login(props) {
  const navigate = useNavigate();
  const onClickLogin = () => {
    navigate(`/Login`);
  };

  const onClickSignup = () => {
    navigate(`/Signup`);
  };

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const { username, password } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const post_login = async () => {
    try {
      await axios
        .post(
          'http://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/accounts/login',
          inputs,
        )
        .then(res => {
          sessionStorage.setItem('token', res.data);
          axios.defaults.headers.common['Authorization'] = res.data;
          sessionStorage.setItem('auth', true); // 로그인 설정
          navigate(`/Mainpage`);
        });
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
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
            <div className="login_name" onClick={onClickLogin}>
              로그인
            </div>

            <div className="signup_name" onClick={onClickSignup}>
              회원가입
            </div>
          </div>

          <div className="login_box">
            <div className="login_input">
              <form>
                <div className="login_id">
                  <img
                    src="images/login_id_icon.png"
                    className="loginpage_icon"
                    alt=""
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="아이디"
                    name="username"
                    value={username}
                    onChange={onChange}
                    autoComplete="current-username"
                  />
                </div>

                <div className="login_pwd">
                  <img
                    src="images/login_pwd_icon.png"
                    className="loginpage_icon"
                    alt=""
                  />

                  <input
                    type="password"
                    className="input"
                    placeholder="비밀번호"
                    name="password"
                    value={password}
                    onChange={onChange}
                    autoComplete="current-password"
                  />
                </div>
              </form>
            </div>

            <div className="login_btn_btn">
              <button className="login_btn" onClick={post_login}>
                로그인
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
