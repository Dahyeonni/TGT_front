import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
const plus_image = `${process.env.PUBLIC_URL + '/images/plus.png'}`;
const line_image = `${process.env.PUBLIC_URL + '/images/line.png'}`;
const trash = `${process.env.PUBLIC_URL + '/images/trash.png'}`;

function Club_Todo({ club_id, date }) {
  const [todos, setTodo] = useState([]);
  const [delete_bool, setDeleteBool] = useState(false);

  const [data, setData] = useState({
    club: '',
    title: '',
    todo_date: '',
  });

  const get_todo = async () => {
    try {
      await axios.get('http://127.0.0.1:8000/club/todolist/').then(res => {
        console.log('투두리스트 조회', res);
        setTodo(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    get_todo();
  }, [delete_bool]);

  const [post, setPost] = useState(false);

  const post_todo = async () => {
    try {
      await axios
        .post('http://127.0.0.1:8000/club/todolist/', data)
        .then(res => {
          console.log('투두리스트가 저장되었습니다.');
          setPost(!post);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get_todo();
  }, [post]);

  return (
    <>
      <Todo_div>
        <Title>To do List</Title>
        <Input
          placeholder="오늘의 할 일을 적어주세요!"
          onChange={e => {
            setData({
              club: club_id,
              title: e.target.value,
              todo_date: date,
            });
          }}
        ></Input>
        <img src={plus_image} style={Plus} onClick={() => post_todo()} />

        <img src={line_image} style={Line} />

        {todos
          .filter(todo => todo.todo_date === date)
          .filter(todo => todo.club == club_id)
          .filter(todo => todo.user == sessionStorage.getItem('userid'))
          .map(todo => {
            const put_check = async () => {
              try {
                await axios
                  .patch(`http://127.0.0.1:8000/club/todolist/${todo.id}/`, {
                    club: club_id,
                    title: todo.title,
                    box: !todo.box,
                    todo_date: date,
                  })
                  .then(res => {
                    console.log('투두리스트 조회', res);
                    setTodo(res.data);
                  });
              } catch (err) {
                console.log(err);
              }
            };

            const delete_todo = async () => {
              try {
                await axios
                  .delete(`http://127.0.0.1:8000/club/todolist/${todo.id}/`)
                  .then(res => console.log(res));
              } catch (err) {
                console.log(err);
              }
            };
            return (
              <>
                <Todo_list>
                  <Checkbox
                    type="checkbox"
                    defaultChecked={todo.box}
                    onClick={() => {
                      put_check();
                      window.location.reload(false);
                    }}
                  />
                  <Todo_text>{todo.title}</Todo_text>
                  <Trash
                    src={trash}
                    alt="삭제"
                    onClick={() => {
                      delete_todo();
                      // window.location.reload(false);
                      setDeleteBool(!delete_bool);
                      get_todo();
                    }}
                  />
                </Todo_list>
              </>
            );
          })}
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
  cursor: 'pointer',
};

const Line = { width: '100%', height: '0.2vmin' };
const Todo_list = styled.div`
  display: flex;
  height: 4vmin;
  position: relative;
  align-items: center;
`;
const Checkbox = styled.input`
  display: flex;
`;

const Todo_text = styled.section`
  display: flex;
`;

const Trash = styled.img`
  position: absolute;
  right: 0;
  width: 2.5vmin;
  cursor: pointer;
`;
