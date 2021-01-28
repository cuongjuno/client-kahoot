import React from 'react';
import GameOver from './Game_Over';
import './Ques_Over.css';

export default function GameQuestionOver(props) {
    let chart = [...props.leaderboard];
    let sorted = chart.sort((a, b) => b.score - a.score);
    return (
        <div>
            {!props.lastQuestion ? (
                <div>
                    <div className='board-1'>
                        <h1>Score Board</h1>
                    </div>
                    <div className='board-2'>
                        <button
                            className=' btn-custom'
                            onClick={props.nextQuestion}
                            style={{
                                backgroundColor: 'rgb(18, 96, 190)',
                                position: 'absolute',
                                top: '145px',
                                right: '25px',
                            }}
                        >
                            Next
                        </button>
                        <div className='board-3'>
                            <p>{sorted[0].name}</p>
                            <p>{sorted[0].score}</p>
                        </div>
                        <div className='board-3'>
                            <p>{sorted[1].name}</p>
                            <p>{sorted[1].score}</p>
                        </div>
                        <div className='board-3'>
                            <p>{sorted[2].name}</p>
                            <p>{sorted[2].score}</p>
                        </div>
                    </div>
                    <div className='board-bottom'>
                        <span
                            style={{ fontWeight: 700, marginRight: '0.25rem' }}
                        >
                            {props.currentQuestion}
                        </span>
                        <div>
                            <span>GAME PIN:</span>
                            <span
                                style={{
                                    fontWeight: 700,
                                    marginLeft: '0.5rem',
                                }}
                            >
                                {props.pin}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <GameOver leaderboard={props.leaderboard} />
            )}
        </div>
    );
}
