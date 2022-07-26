import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  // 요청받은 정보를 담아줄 변수 선언
  const [ hello, sethello ] = useState('');

  // 변수 초기화
  function callback(str) {
    sethello(str);
  }

  // 첫 번째 렌더링을 마친 후 실행  **테스트*8ㅁㄴㅇㄻㄴㅇㄹ
  useEffect(
      () => {
        axios({
            url: '/api/hello',
            method: 'GET'
        }).then((res) => {
            callback(res.data);
        })
      }, []
  );

  return (
      <div className="App">
          <header className="App-header">
              {hello}
          </header>
      </div>
  );
}

export default App;