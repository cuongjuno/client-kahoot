import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

// import "./Game.css";
import load from '../../Assests/load-circle-outline.svg';
import PlayerQuestionOver from './Player_Question_Over';
import PlayerQuestions from './Player_Questions';
const ENDPOINT = 'https://kahoott.herokuapp.com/';

function Player(props) {
    const [socket, setSocket] = useState(socketIOClient(ENDPOINT));
    const { pin, nickName } = props;
    const [gameStarted, setGameStarted] = useState(false);
    const [questionOver, setquestionOver] = useState(false);
    const [answerSubmitted, setanswerSubmitted] = useState(true);
    const [answeredCorrect, setansweredCorrect] = useState(false);
    const [timeOver, setTimeOver] = useState(false);
    const [score, setscore] = useState(0);
    const [increScore, setIncreScore] = useState(0);
    const [rank, setRank] = useState(0);
    useEffect(() => {
        console.log('re-render');
        socket.emit('player-joined', pin);
        socket.emit('player-add', { pin, nickName });
        socket.on('room-joined', (data) => {
            console.log('Quiz data: ' + data);
        });
        socket.on('question-over', () => {
            setquestionOver(true);
            console.log('set ques');
        });
        socket.on('time-over', () => {
            setTimeOver(true);
        });
        socket.on('next-question', () => {
            console.log('next');
            setGameStarted(true);
            setquestionOver(false);
            setTimeOver(false);
            setanswerSubmitted(false);
            setansweredCorrect(false);
        });
        socket.on('sent-info', (data) => {
            setansweredCorrect(data.answeredCorrect);
            setscore(score + data.score);
            setIncreScore(data.score);
        });
        socket.on('rank', (data) => {
            setRank(data.rank);
            console.log('rank ' + rank);
        });
    }, []);
    function submitAnswer(num) {
        socket.emit('question-answered', {
            name: nickName,
            answer: num,
            pin: pin,
        });
        setanswerSubmitted(true);
    }

    return (
        <div className='player-container'>
            <div className='status-bar '>
                <div className='status-pin'>Pin : {pin}</div>
                <div className='status-score'>{score}</div>
            </div>

            {
                // gameStarted= true questionOver = true
                !gameStarted && !questionOver && (
                    <div className='youarein'>
                        <p>You're in!</p>
                        <p style={{ fontSize: '1.5rem' }}>
                            See your nickname on screen?
                        </p>
                    </div>
                )
            }

            {gameStarted && !questionOver && !answerSubmitted && (
                <PlayerQuestions submitAnswer={submitAnswer} />
            )}

            {gameStarted && !questionOver && answerSubmitted && (
                <div className='player-wait'>
                    <p>Did you answer too fast????</p>
                </div>
            )}
            {questionOver && (
                <PlayerQuestionOver
                    answeredCorrect={answeredCorrect}
                    increScore={increScore}
                />
            )}
            <div className='player-bottom'>
                <span>Nickname : {nickName}</span>
                <span>Top : {rank}</span>
            </div>
        </div>
    );
}

export default Player;
