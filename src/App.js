import React, { useEffect, useState } from 'react';
import './App.css';
import './components/responsive.css'
import Quiz from './Quiz';
import Game from './components/Game/Game';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
} from 'react-router-dom';
import Main from './components/CreateKahoot/Create';
import Player_Room from './components/Player_Room/Landing';
import Player from './components/Player_Room/Player';
import Kahoot from './components/Kahoot/Kahoot';
import Edit from './components/CreateKahoot/Edit';
import store from './store/store'

import axios from './axios'
import Home2 from './components/Home2';
import Header2 from './components/Header2';
import Create_New from './components/CreateKahoot/Create_New';
import Game_test from './components/Game/Game_test';

function App() {
    const history = useHistory();
    const [token, setToken] = useState(localStorage.getItem('token'));
    useEffect(() => {
        // if (token != localStorage.getItem('token'))
            setToken(localStorage.getItem('token'));
    }, [localStorage.getItem('token')]);
    return (
        <Switch>
            <Router>
                <div className='app'>
                    {!token ? (
                        <>
                            <Route path='/wait' component={Player_Room} />
                            <Route path='/login' component={Login} />
                            <Route path='/signup' component={SignUp} />
                            <Route path='/' component={Login} />
                            <Route path='/test' component={Home2} />
                        </>
                    ) : (
                        <>
                            <Route path='/' exact component={Home} />
                            <Route path='/home' exact component={Home} />
                            <Route path='/kahoot' component={Kahoot} />
                            <Route path='/login' component={Login} />
                            <Route path='/signup' component={SignUp} />
                            <Route path='/create' component={Main} />
                            <Route path='/game' component={Game} />
                            <Route path='/quiz' component={Quiz} />
                            <Route path='/wait' component={Player_Room} />
                            <Route path='/player' component={Player} />
                            <Route path='/game2' component={Quiz} />
                            <Route path='/edit' component={Edit} />
                            <Route path='/test' component={Home2} />
                            <Route path='/rst' component={Header2} />
                            <Route path='/crt' component={Create_New} />
                            <Route path='/gametest' component={Game_test} />
                        </>
                    )}
                </div>
            </Router>
        </Switch>
    );
}

export default App;
