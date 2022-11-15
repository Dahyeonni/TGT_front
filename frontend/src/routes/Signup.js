/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import '../static/css/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signup(props) {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
  });

  const { username, password, email } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const post_login = async () => {
    const data = {
      username: inputs.username,
      password: inputs.password,
    };
    try {
      await axios
        .post(
          'https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/accounts/login',
          data,
        )
        .then(res => {
          sessionStorage.setItem('token', res.data);
          axios.defaults.headers.common['Authorization'] = res.data;
          sessionStorage.setItem('auth', true); // 로그인 설정
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // console.log(inputs);
  }, [inputs]);
  const navigate = useNavigate();
  const onClickLogin = () => {
    navigate(`/`);
  };

  const onClickSignup = () => {
    navigate(`/Signup`);
  };

  const post_signup = async () => {
    sessionStorage.clear();
    try {
      await axios
        .post(
          'https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/accounts/regist',
          inputs,
        )
        .then(res => {
          post_login();
          navigate('/Signup2');
          // console.log(res);
        });
    } catch (err) {
      const errormessage = [];
      err.response.data.email != undefined
        ? errormessage.push('email: ' + err.response.data.email)
        : null;
      err.response.data.username != undefined
        ? errormessage.push('username : ' + err.response.data.username)
        : null;
      err.response.data.password != undefined
        ? errormessage.push('password : ' + err.response.data.password)
        : null;
      errormessage.length == 0
        ? alert('새로고침 후 다시 시도해보세요')
        : alert(errormessage.join('\n'));
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
            <div className="login_name_2" onClick={() => onClickLogin()}>
              로그인
            </div>

            <div className="signup_name_2" onClick={() => onClickSignup()}>
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
                    required
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
                    required
                    autoComplete="current-password"
                  />
                </div>
              </form>

              <div className="login_pwd">
                <img
                  src="images/signup_email_icon.png"
                  className="loginpage_icon"
                  alt=""
                />
                <input
                  type="text"
                  className="input"
                  placeholder="이메일"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="login_btn_btn">
              <button className="login_btn" onClick={() => post_signup()}>
                회원가입
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Signup;
