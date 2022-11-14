import React from 'react';
import styled from 'styled-components';
const plus_image = `${process.env.PUBLIC_URL + '/images/plus.png'}`;
const line_image = `${process.env.PUBLIC_URL + '/images/line.png'}`;

function Club_Todo({ club_id }) {
  return (
    <>
      <Todo_div>
        <Title>To do List</Title>
        <Input placeholder="오늘의 할 일을 적어주세요!"></Input>

        <img src={plus_image} style={Plus} />

        <img src={line_image} style={Line} />
      </Todo_div>
    </>
  );
}

export default Club_Todo;
const Todo_div = styled.div`
  margin: 7.5%;
  height: 100%;
  overflow-y: auto;
`;

const Todo_body = styled.div`
  height: 80%;
  max-height: 80%;
  overflow-y: auto;
`;
const Title = styled.section`
  font-size: 3vmin;
  font-weight: 600;
`;

const Input = styled.input`
  box-sizing: border-box;
  background: #d9d9d9;
  border-radius: 5px;
  font-family: 'DMSans';
  border: none;
  &:focus {
    outline: none;
  }
  width: 80%;
  height: 3vmin;
  margin-top: 1vmin;
  float: left;
`;

const Plus = {
  height: '3vmin',
  float: 'right',
  marginTop: '1vmin',
};

const Line = { width: '100%', height: '0.2vmin' };
