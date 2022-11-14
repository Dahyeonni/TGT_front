import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function List({ clubs }) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    // 👇️ toggle
    setIsActive(current => !current);
    // 👇️ or set to true
    // setIsActive(true);
  };
  const bgColor = '';
  return (
    <>
      <List_div>
        <Title>Club list</Title>
        <List_body>
          {clubs.map(club => {
            const imageUrl = 'http://127.0.0.1:8000' + club.image;
            const image_style2 = {
              backgroundImage: `url(${imageUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              width: '6vmin',
              height: '6vmin',
              borderRadius: '20%',
              float: 'left',
              marginRight: '1vmin',
            };
            return (
              <>
                <List_section
                  style={{
                    backgroundColor: isActive ? '#FFCC80' : '',
                    borderRadius: '10px',
                    height: '4vmins',
                  }}
                  onClick={() => {
                    handleClick();
                    navigate(`/Clubpage/${club.id}`);
                  }}
                >
                  <Club_img style={image_style2}></Club_img>
                  <List_box>
                    <Club_name>{club.name}</Club_name>
                    <List_date>
                      {club.start_date}-{club.end_date}
                    </List_date>
                  </List_box>
                </List_section>
              </>
            );
          })}
        </List_body>
      </List_div>
    </>
  );
}

export default List;
const List_div = styled.div`
  margin: 7.5%;
`;
const Title = styled.section`
  font-size: 3vmin;
  font-weight: 600;
`;
const List_body = styled.section`
  margin: 1vmin;
`;
const List_section = styled.div`
  margin-top: 1vmin;
  margin-bottom: 1vmin;
  padding: 1vmin;
  borderradius: 50px;
  cursor: pointer;
  height: 7vmin;
  align-itmes: center;
`;

const List_box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 1vmin;
`;
const Club_img = styled.div``;
const Club_name = styled.div`
  font-weight: 600;
  font-size: 1.5vmin;
  margin-bottom: 1vmin;
`;
const List_date = styled.section`
  font-weight: 500;
  font-size: 1vmin;
  align-itmes: center;
`;
