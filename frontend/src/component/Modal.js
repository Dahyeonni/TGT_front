import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Modal({ club }) {
  const navigate = useNavigate();
  useEffect(() => {
    // get_profile();
  }, []);

  return (
    <div
      style={{
        boxSizing: 'border-box',
        marginLeft: '4%',
        position: 'fixed',
        background: 'orange',
        borderRadius: '10px',
        fontSize: '2.5vmin',
        width: '30vmin',
        padding: '3vmin',
        color: 'black',
      }}
    >
      {club.length === 0 ? (
        <section style={{ fontSize: '1.5vmin' }}>
          아직 가입한 클럽이 없습니다.
        </section>
      ) : (
        club.map(c => {
          const onclick = () => {
            navigate(`/Clubpage/${c.id}`);
          };
          return (
            <section
              style={{
                fontWeight: 600,
                fontSize: '2vmin',
                margin: '1vmin',
                cursor: 'pointer',
              }}
              onClick={onclick}
            >
              {c.name}
            </section>
          );
        })
      )}
    </div>
  );
}

export default Modal;
