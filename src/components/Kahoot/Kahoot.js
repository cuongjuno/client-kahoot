import React, { useEffect, useState } from 'react';
import '../search.css';
import { db, storage } from '../../firebase';
import imgDefault from '../../assets/kahoot.png';
import Headers from '../Header.jsx';
import { Link } from 'react-router-dom';
import './Kahoot.css';
import axios from '../../axios';
import Header2 from '../Header2';
function Kahoot(props) {
    const [dataKahoot, setdataKahoot] = useState([]);
    const [toogle, setToogle] = useState(false);
    useEffect(() => {
        getData();
    }, [toogle]);

    async function handleDelete(id) {
        axios({
            method: 'delete',
            url: `/kahoot/${id}`,
            headers: {
                Authorization: localStorage.getItem('headerToken'),
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log('done');
            })
            .catch((e) => console.log(e));
        // setToogle(!toogle);
    }

    async function getData() {
        axios({
            method: 'get',
            url: `/kahoot/user/${localStorage.getItem('idUser')}`,
        })
            .then((res) => {
                console.log(res.data);
                setdataKahoot(res.data);
            })
            .catch((e) => console.log(e));
    }

    return (
        <div style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
            <Header2 active='kahoot' />
            <div
                style={{
                    padding: '0 20%',
                    backgroundColor: 'rgb(242, 242, 242)',
                }}
            >
                <div>
                    <div
                        className='search-home'
                        style={{
                            width: '80%',
                            margin: '0 auto',
                            marginTop: '3%',
                        }}
                    >
                        <div className='searchbar' style={{ marginTop: '0' }}>
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
                </div>
                <h3 style={{ textAlign: 'center', margin: '4%' }}>My Kahoot</h3>

                <div className='list-my-kahoot' style={{ height: '71vh' }}>
                    <ul>
                        {dataKahoot.map((data) => (
                            <li key={data.id}>
                                <div className='infor-my-kahoot'>
                                    <div className='box-left d-flex'>
                                        <img
                                            src={
                                                data.image
                                                    ? data.image
                                                    : imgDefault
                                            }
                                        ></img>
                                        <p>
                                            {data.listQuestion.length}{' '}
                                            {' Question'}
                                        </p>
                                    </div>
                                    <div className='box-right'>
                                        <div>
                                            <h4 className='text-center'>
                                                {data.title.slice(0, 12)}
                                            </h4>
                                            <p
                                                onClick={() =>
                                                    handleDelete(data._id)
                                                }
                                            >
                                                delete
                                            </p>
                                        </div>
                                        <div className='lst-btn'>
                                            <Link
                                                to={{
                                                    pathname: `/game/${data._id}`,
                                                    data: { id: data._id },
                                                }}
                                                className='kahoots-play-text'
                                            >
                                                <button className='btn btn-success'>
                                                    Play
                                                </button>
                                            </Link>

                                            <Link
                                                to={{
                                                    pathname: `/Edit/${data._id}`,
                                                    data: { id: data._id },
                                                }}
                                                className='kahoots-play-text'
                                            >
                                                <button className='btn btn-primary'>
                                                    Edit
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Kahoot;
