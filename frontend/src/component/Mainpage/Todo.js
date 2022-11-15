/* eslint-disable no-unused-expressions */
import { normalizeUnits } from 'moment';
import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
function Todo({ date, clubs, user_id }) {
  const [input, setInput] = useState([]);

  const [data, setData] = useState({
    club: '',
    title: '',
    todo_date: '',
  });

  const [post, setPost] = useState(false);

  const post_todo = async () => {
    try {
      await axios
        .post(
          'https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/club/todolist/',
          data,
        )
        .then(res => {
          console.log('투두리스트가 저장되었습니다.');
          setPost(!post);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [todos, setTodo] = useState([]);

  const get_todo = async () => {
    try {
      await axios
        .get(
          'https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/club/todolist/',
        )
        .then(res => {
          // console.log('투두리스트 조회', res);
          setTodo(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    get_todo();
  }, [post]);

  const [delete_bool, setDeleteBool] = useState(false);

  useEffect(() => {
    get_todo();
  }, [delete_bool]);

  const onReset = () => {
    setData({ club: '', title: '', todo_date: '' });
  };
  return (
    <>
      <Todo_div>
        <Title>To do List</Title>
        <Todo_body>
          {clubs.length === 0 ? (
            <div
              style={{
                fontFamily: 'DMSans',
                fontWeight: 600,
                opacity: 0.6,
                fontSize: '1.8vmin',
                marginTop: '2vmin',
              }}
            >
              등록된 클럽이 없습니다. 클럽을 먼저 가입해주세요
            </div>
          ) : (
            clubs.map(club => {
              return (
                <>
                  <Club>
                    <ClubName>{club.name}</ClubName>
                    <Input_div>
                      <Input
                        placeholder="오늘의 할 일을 입력해주세요"
                        onChange={e => {
                          setData({
                            club: club.id,
                            title: e.target.value,
                            todo_date: date,
                          });
                        }}
                      ></Input>
                      <Plus_icon
                        src="images/plus.png"
                        onClick={() => {
                          post_todo();
                          onReset();
                          // window.location.reload(false);
                        }}
                      ></Plus_icon>
                    </Input_div>
                    <>
                      {todos
                        .filter(todo => todo.todo_date === date)
                        .filter(todo => todo.club === club.id)
                        .filter(todo => todo.user === user_id)
                        .map(todo => {
                          const put_check = async () => {
                            try {
                              await axios
                                .patch(
                                  `https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/club/todolist/${todo.id}/`,
                                  {
                                    club: club.id,
                                    title: todo.title,
                                    box: !todo.box,
                                    todo_date: date,
                                  },
                                )
                                .then(res => {
                                  // console.log('투두리스트 조회', res);
                                  setTodo(res.data);
                                });
                            } catch (err) {
                              console.log(err);
                            }
                          };

                          const delete_todo = async () => {
                            try {
                              await axios
                                .delete(
                                  `https://ec2-3-35-168-199.ap-northeast-2.compute.amazonaws.com:8000/club/todolist/${todo.id}/`,
                                )
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
                                    // get_todo();
                                  }}
                                />
                                <Todo_text>{todo.title}</Todo_text>
                                <Trash
                                  src="images/trash.png"
                                  alt="삭제"
                                  onClick={() => {
                                    delete_todo();
                                    setDeleteBool(!delete_bool);
                                    get_todo();
                                  }}
                                />
                              </Todo_list>
                            </>
                          );
                        })}
                    </>
                  </Club>
                  <br />
                </>
              );
            })
          )}
        </Todo_body>
      </Todo_div>
    </>
  );
}

export default Todo;
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

const ClubName = styled.h3`
  box-sizing: border-box;
  background: #ff9900;
  border-radius: 6px;
  padding: 1vmin;
  text-align: center;
  margin-bottom: 0;
  width: 100%;
`;

const Club = styled.div`
  min-height: 13vmin;
`;

const Input_div = styled.section`
  width: 100%;
  box-sizing: border-box;
  background: #ffdfae;
  border-radius: 5px;
  height: 3vmin;
`;
const Input = styled.input`
  box-sizing: border-box;
  background: #ffdfae;
  border-radius: 5px 0 0 5px;
  margin-top: 0;
  border: none;
  &:focus {
    outline: none;
  }
  width: 80%;
  padding: 0.7vmin;
  height: 3vmin;
  font-family: 'DMSans';
  display: flex;
  float: left;
`;

const Plus_icon = styled.img`
  box-sizing: border-box;
  cursor: pointer;
  height: 3vmin;
  /* background: #ffdfae; */
  border-radius: 0px 5px 5px 0;
  padding: 0.4vmin;
  float: right;
`;

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
