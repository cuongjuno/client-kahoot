import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import GameQuestions from './Game_Questions';
import GameQuestionOver from './Game_Question_Over';
import './Game.css';
import logo from '../../assets/logo.svg';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'https://kahoott.herokuapp.com/';
function Game(props) {
    const [showVolumn, setShowVolumn] = useState(false);
    const [state, setState] = useState({
        pin: 0,
        timer: 0,
        isPlaying: false,
        gameOver: false,
        questionOver: false,
        currentQuestion: 0,
        listPlayer: [],
    });
    const [countAnswer, setCountAnswer] = useState(0);
    const [listQues, setListQues] = useState(null);
    const [socket, setSocket] = useState(socketIOClient(ENDPOINT));
    const [dataAnswer, setDataAnswer] = useState({
        name: '',
        answer: '',
    });
    const [typeAnswer, setTypeAnswer] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
    });

    const idKahoot = props.location.data.id;

    async function loadKahoot() {
        axios({
            method: 'get',
            url: `/kahoot/${idKahoot}`,
        })
            .then((res) => {
                setListQues(res.data.listQuestion);
            })
            .catch((e) => console.log(e));
    }

    // var listTestPlayer = JSON.parse(listPlayer)
    useEffect(() => {
        socket.on('connection', () => {
            console.log('conntected frontend');
        });
        // tạo mã pin
        // ==> get data from DB
        loadKahoot();
        generatePin();
        socket.on('room-joined', (data) => {
            addPlayer(data.name, data.id);
        });
        socket.on('player-answer', (data) => {
            console.log(' player-answer ' + data.name + ' ' + data.answer);
            setDataAnswer({
                name: data.name,
                answer: data.answer,
            });
        });
    }, []);

    useEffect(() => {
        if (state.listPlayer.length > 0)
            submitAnswer(dataAnswer.name, dataAnswer.answer);
        setTypeAnswer({
            ...typeAnswer,
            [dataAnswer.answer]: typeAnswer[dataAnswer.answer] + 1,
        });
    }, [dataAnswer]);
    function generatePin() {
        let newPin = Math.floor(Math.random() * 9000000, 10000000);
        setState({
            ...state,
            pin: newPin,
        });

        socket.emit('host-join', { pin: newPin });
    }

    function addPlayer(name, id) {
        let player = {
            id: id,
            name: name,
            score: 0,
            qAnswered: false, // da tra loi chua
            answeredCorrect: false, // tra loi dung chua
        };
        // them player vao list
        setState((prevState) => {
            return {
                ...prevState,
                listPlayer: [...prevState.listPlayer, player],
            };
        });
    }
    function submitAnswer(name, answer) {
        // // => lay ra Player vua submit
        let playerSummited = state.listPlayer.filter(
            (player) => player.name === name
        );
        console.log(listQues[state.currentQuestion]);
        console.log(listQues[state.currentQuestion].posCorrect);
        let updatedListPlayer = state.listPlayer.filter(
            (player) => player.name !== name
        );

        playerSummited[0].qAnswered = true; // chuyen state da tra loi cau hoi
        answer == listQues[state.currentQuestion].posCorrect
            ? (playerSummited[0].answeredCorrect = true)
            : (playerSummited[0].answeredCorrect = false);

        console.log(playerSummited[0].answeredCorrect);

        updatedListPlayer.push(playerSummited[0]); // them lai player vua submit vao list
        setState({ ...state, listPlayer: updatedListPlayer });
    }

    // calc rank player
    function rank() {
        socket.emit('question-over', state.pin);
        let unsorted = [...state.listPlayer];
        let sorted = unsorted.sort((a, b) => b.score - a.score);
        sorted.forEach((player, index) => {
            console.log(
                'rank' + sorted.findIndex((e) => e.id == player.id) + 1
            );
            console.log(player.id);
            socket.emit('rank', {
                id: player.id,
                rank: index + 1,
            });
        });
    }
    function questionOver() {
        let updatedListPlayer = [...state.listPlayer];
        updatedListPlayer.forEach((player) => {
            player.qAnswered = false;
            player.answeredCorrect = false;
        });
        setState({
            ...state,
            isPlaying: true,
            questionOver: true,
            currentQuestion: state.currentQuestion + 1,
            listPlayer: updatedListPlayer,
        });
        setShowVolumn(false);
        setTypeAnswer({
            1: 0,
            2: 0,
            3: 0,
            4: 0,
        });
    }
    function timeKeeper() {
        let internalTimer = listQues[state.currentQuestion].time;
        setCountAnswer(0);

        let cloneListPlayer = [...state.listPlayer];
        setState({ ...state, questionOver: false });
        function timeCheck() {
            let checkAnswer = () => {
                let pAnswered = 0;
                cloneListPlayer.forEach((player) => {
                    if (player.qAnswered) ++pAnswered; // dem so nguoi da tra loi
                });
                setCountAnswer(pAnswered);
                cloneListPlayer.forEach((player) => {
                    console.log('true' + player.id);
                    if (player.answeredCorrect) {
                        if (pAnswered === state.listPlayer.length)
                            player.score +=
                                (internalTimer - 2) *
                                Math.round(
                                    listQues[state.currentQuestion].point /
                                        internalTimer
                                );
                        else
                            player.score += Math.round(
                                listQues[state.currentQuestion].point /
                                    internalTimer
                            );
                        socket.emit('sent-info', {
                            id: player.id,
                            score: player.score,
                            answeredCorrect: player.answeredCorrect,
                        });
                    }
                });
                // ==> đổ dữ liệu player vào mới hoạt động
                if (pAnswered === state.listPlayer.length) internalTimer = 0;
                internalTimer -= 1;
            };
            let endQuestion = () => {
                clearInterval(timeKept);
                setShowVolumn(true);
                rank();
            };
            return internalTimer > 0
                ? checkAnswer() // kiem tra dap an, tinh toan score
                : endQuestion(); // ket thuc cau hoi
        }
        let timeKept = setInterval(() => {
            timeCheck();
        }, 1000); // lap lai timeCheck sau 1s
        return timeKept;
    }
    function nextQuestion() {
        console.log('nexy-question');
        timeKeeper(); // tinh diem score
        if (state.currentQuestion === listQues.length)
            setState({ ...state, gameOver: true });
        socket.emit('next-question', state.pin); // push pin len
        setState({ ...state, questionOver: false });
    }

    function startGame() {
        if (state.listPlayer.length >= 0) {
            nextQuestion();
            setState({ ...state, isPlaying: true });
        } else {
            alert('You need at least 3 players to start');
        }
    }
    var mappedPlayersInRoom = state.listPlayer.map((player) => {
        return (
            <div key={player.id} className='col-md-2 p-5'>
                <span>{player.name}</span>
            </div>
        );
    });

    return (
        <div className='component-container'>
            {!state.isPlaying && (
                <div className='test'>
                    <div className='test_2'>
                        <div className='test_3'>
                            <div className='test_4'>
                                <div className='test_5'>
                                    <div className='test_6'>
                                        <div>
                                            Join at{' '}
                                            <strong>www.kahoot.it</strong>
                                        </div>
                                        <div>
                                            or with the{' '}
                                            <strong>Kahoot! app</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className='test_5_1'>
                                    <div className='test_5_1_a'>Game PIN:</div>
                                    <div className='test_5_1_b'>
                                        {state.pin}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!state.isPlaying && !state.questionOver && !state.gameOver ? (
                <div>
                    <div className='btn-players row justify-content-between'>
                        <div className='col-md-2'>
                            <div className='player-count'>
                                <span
                                    className='icon__Icon-xvsbpg-0 bJpEJN player-counter__Icon-fb3lj4-1 iItBrS'
                                    style={{
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                        width: '4vmin',
                                        height: '4vmin',
                                    }}
                                >
                                    <svg
                                        id='icon1'
                                        data-functional-selector='icon'
                                        viewBox='0 0 32 32'
                                        focusable='false'
                                        stroke='none'
                                        strokeWidth={0}
                                    >
                                        <path
                                            d='M16,16 C13.2385763,16 11,13.7614237 11,11 C11,8.23857625 13.2385763,6 16,6 C18.7614237,6 21,8.23857625 21,11 C21,13.7614237 18.7614237,16 16,16 Z M25,24.3125 L7,24.3125 C7,20.2739178 11.0294373,17 16,17 C20.9705627,17 25,20.2739178 25,24.3125 Z'
                                            style={{
                                                fill: 'rgb(255, 255, 255)',
                                            }}
                                        ></path>
                                    </svg>
                                </span>
                                <div
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '3.5vmin',
                                        lineHeight: '3.7vmin',
                                    }}
                                >
                                    {state.listPlayer.length}
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <img src={logo} alt='logo' height='55' />
                        </div>
                        <div className='col-md-2 '>
                            <button
                                onClick={() => startGame()}
                                className='btn-custom'
                                style={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                }}
                            >
                                Play
                            </button>
                        </div>
                    </div>
                    <section className='list-player-joined'>
                        <div className='row justify-content-around '>
                            {mappedPlayersInRoom}
                        </div>
                    </section>
                </div>
            ) : state.isPlaying && !state.questionOver && !state.gameOver ? (
                <GameQuestions
                    timeCoundown={listQues[state.currentQuestion].time}
                    question={listQues[state.currentQuestion].title}
                    answer1={listQues[state.currentQuestion].answers[0]}
                    answer2={listQues[state.currentQuestion].answers[1]}
                    answer3={listQues[state.currentQuestion].answers[2]}
                    answer4={listQues[state.currentQuestion].answers[3]}
                    correctAnswer={listQues[state.currentQuestion].posCorrect}
                    questionOver={questionOver}
                    urlImg={listQues[state.currentQuestion].urlImgQues}
                    leaderboard={state.listPlayer}
                    countAnswer={countAnswer}
                    showVolumn={showVolumn}
                    setShowVolumn={setShowVolumn}
                    typeAnswer={typeAnswer}
                    rank={rank}
                />
            ) : (
                <GameQuestionOver
                    nextQuestion={nextQuestion}
                    leaderboard={state.listPlayer}
                    lastQuestion={listQues.length === state.currentQuestion}
                    pin={state.pin}
                    currentQuestion={`${state.currentQuestion}/${listQues.length}`}
                />
            )}
        </div>
    );
}

export default Game;
