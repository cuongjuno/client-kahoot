import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./search.css";
import logo from "../assets/kahoot.png";
import "./Home.css";
import fake from "../assets/fake2.jpg";
import Header from "./Header.jsx";
import { db } from "../firebase";
import axios from '../axios'
import Header2 from "./Header2";

function Home(props) {
  const [dataKahoot, setdataKahoot] = useState([]);
  const [inforUser, setInforUser] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await db.collection("kahoot_2").get();
  //     setdataKahoot(data.docs.map((doc) => doc.data()).slice(0, 3));
  //   };
  //   fetchData();
  // }, []);  //firebase//
  useEffect(() => {
            axios({
                method: 'get',
                url: `/kahoot/user/${localStorage.getItem('idUser')}`,
            })
                .then((res) => {
                    console.log(res.data);
                    setdataKahoot(res.data);
                })
                .catch((e) => console.log(e));
  },[])
  useEffect(() => {
    setInforUser({
        ...inforUser,
        numKahoot: dataKahoot.length,
    });
  }, [dataKahoot])
  useEffect(() => {
    let dateNow = new Date();

        axios
            .get('/users/me', {
                headers: { Authorization: localStorage.getItem('headerToken') },
            })
            .then((response) => {
                // If request is good...
              localStorage.setItem('idUser', response.data._id);
              console.log(response.data.username);
              setInforUser({
                ...inforUser,
                username: response.data.username,
                dob: dateNow.getFullYear() - response.data.dob.slice(0,4),
                bietdanh: response.data.email.replace('@gmail.com', ''),
                avatar: response.data.avatar,
              })
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }, []);
  


  return (
      <>
          <Header2 />
          <div className='container-home row'>
              <div className='left-home col-lg-4 col-md-12 col-sm-12'>
                  <div className='infor-player'>
                      <h3>{inforUser.username}</h3>
                      <h4>{inforUser.bietdanh}</h4>
                      <div>
                          <p>Tuổi: {inforUser.dob}</p>
              <p>Groups: { }</p>
                          <p>Số kahoot: {inforUser.numKahoot}</p>
                      </div>
                  </div>
                  <div className='last-report'>
                      <h2>Last reports</h2>
                      <div className='infor-report'>
                          <div className='detail-report'>
                              <i className='fas fa-columns fa-2x'></i>
                              <div>
                                  <p style={{ color: 'blue' }}>
                                      Done - see result
                                  </p>
                                  <p>{'Tên kahoot: '}</p>
                              </div>
                          </div>
                          <div className='detail-report'>
                              <i className='fas fa-columns fa-2x'></i>
                              <div>
                                  <p style={{ color: 'blue' }}>
                                      Done - see result
                                  </p>
                                  <p>Tên kahoot: okee</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className='col-lg-4 col-md-12 col-sm-12 big-kahoot'>
                  <div className='list-kahoot'>
                      <h2 style={{ marginTop: '4%' }}>My kahoots</h2>
                      <div style={{ marginTop: '15%' }}>
                          {dataKahoot.map((data) => (
                              <Link
                                  to={{
                                      pathname: `/game/${data._id}`,
                                      data: { id: data._id },
                                  }}
                                  className='kahoots-play-text'
                              >
                                  <div className='infor-kahoot'>
                                      <img
                                          src={logo}
                                          style={{ width: '24%' }}
                                      ></img>
                                      <div style={{ marginLeft: '5%' }}>
                                          <h3 style={{ color: 'black' }}>
                                              {data.title.slice(0, 12)}
                                          </h3>
                                          <p>
                                              {data.listQuestion.length} {'qs'}
                                          </p>
                                      </div>
                                  </div>
                              </Link>
                          ))}
                      </div>
                      <Link to='/kahoot'>
                          <p style={{ textAlign: 'center' }}>See all</p>
                      </Link>
                  </div>
              </div>
              <div className='right-home col-lg-4 col-md-12 col-sm-12'>
                  <div className='search-home' style={{ width: '80%' }}>
                      <div className='searchbar'>
                          <input
                              className='search_input'
                              type='text'
                              name=''
                              placeholder='Search...'
                          ></input>
                          <a href='#' className='search_icon'>
                              <i className='fas fa-search'></i>
                          </a>
                      </div>
                  </div>
                  <img
                      src={fake}
                      style={{ width: '80%', marginTop: '35%' }}
                  ></img>
              </div>
          </div>
      </>
  );
}

export default Home;
