import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const edit_image = `${process.env.PUBLIC_URL + '/images/edit.png'}`;
function Info({ id, email, username, user_image, content }) {
  const navigate = useNavigate();

  const imageUrl =
    'https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000' +
    user_image;
  const image_style = {
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '10vmin',
    height: '10vmin',
    borderRadius: '50%',
    float: 'left',
    marginRight: '2vmin',
  };

  return (
    <Container>
      <Profile>
        <div style={image_style}></div>
        <Intro_text>
          <Nickname>{username}</Nickname>
          <Email>{email}</Email>
          <Content>{content}</Content>
        </Intro_text>
      </Profile>
      <Number>
        <Edit
          src={edit_image}
          onClick={() => {
            navigate('/Signup2');
          }}
        />
      </Number>
    </Container>
  );
}

export default Info;

const Container = styled.div`
  box-sizing: border-box;
  padding: 2vmin;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`;

const Profile = styled.div`
  float: left;
  width: 50%;
`;
const Intro_text = styled.div``;
const Nickname = styled.section`
  font-weight: 600;
  font-size: 2vmin;
  margin: 1vmin;
`;

const Content = styled.section`
  margin: 1vmin;
  font-size: 1.5vmin;
  word-break: break-all;
`;

const Number = styled.div`
  float: right;
`;

const Email = styled.section`
  mix-blend-mode: normal;
  opacity: 0.4;
  font-size: 1.5vmin;
  margin-bottom: 2vmin;
`;

const Edit = styled.img`
  position: absolute;
  right: 1vmin;
  top: 1vmin;
  width: 3vmin;
  cursor: pointer;
`;
