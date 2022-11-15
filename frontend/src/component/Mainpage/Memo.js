import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
function Memo({ my_memo }) {
  const [memo, setMemo] = useState('');
  const post_memo = async () => {
    const data = {
      memo: memo,
    };
    try {
      await axios
        .patch(
          'http://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/accounts/profile_update',
          data,
        )
        .then(res => {
          // console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Memo_div>
        <Title>
          Memo<Button onClick={post_memo}>저장</Button>
        </Title>
        <Line></Line>
        <textarea
          placeholder={memo === '' ? '자신만의 목표를 세워보세요!' : null}
          style={memo_input}
          onChange={e => {
            setMemo(e.target.value);
          }}
          defaultValue={my_memo}
        ></textarea>
      </Memo_div>
    </>
  );
}

export default Memo;

const Memo_div = styled.div`
  margin: 7.5%;
  position: relative;
`;

const Title = styled.section`
  font-size: 3vmin;
  font-weight: 600;
`;

const Line = styled.hr`
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  opacity: 0.2;
  margin-top: 1vmin;
`;

const memo_input = {
  marginTop: '1vmin',
  fontFamily: 'DMSans',
  fontWeight: '600',
  width: '100%',
  border: 'none',
  height: '10vmin',
  resize: 'none',
};

const Button = styled.button`
  background: #ff9900;
  border-radius: 6px;
  border: none;
  position: absolute;
  right: 0;
  cursor: pointer;
  font-family: 'DMSans';
  padding: 1vmin;
  font-weight: 600;
`;
