import React from 'react';
import GameOver from './Game_Over';
import './Ques_Over.css';

export default function GameQuestionOver(props) {
    // let chart = [...props.leaderboard];
    // let sorted = chart.sort((a, b) => b.score - a.score);
    return (
        <div>
            {true ? (
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
                            <p>cuong</p>
                            <p>50</p>
                        </div>
                        <div className='board-3'>
                            <p>huy</p>
                            <p>30</p>
                        </div>
                        <div className='board-3'>
                            <p>hai</p>
                            <p>20</p>
                        </div>
                    </div>
                    <div className='board-bottom'>
                        <span
                            style={{ fontWeight: 700, marginRight: '0.25rem' }}
                        >
                            5/20
                        </span>
                        <div>
                            <span>GAME PIN:</span>
                            <span
                                style={{
                                    fontWeight: 700,
                                    marginLeft: '0.5rem',
                                }}
                            >
                                855598
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <GameOver />
            )}
        </div>
    );
}
