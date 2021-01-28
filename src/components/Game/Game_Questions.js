import React, { useState } from 'react';
import './Game.css';
import triangle from '../../Assests/triangle.svg';
import diamond from '../../Assests/diamond.svg';
import square from '../../Assests/square.svg';
import circle from '../../Assests/circle.svg';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import img_ques_default from '../../assets/kahootGif_1.gif';
import check from '../../assets/check.svg';
import cross from '../../assets/cross.svg';
export default function GameQuestions(props) {
    var question = {
        height: '17vh',
        backgroundColor: '#FFFFFF',

        fontSize: '2.5rem',
        fontWeight: '600',
    };
    var detail = {
        height: '50vh',
        visibility: `${!props.showVolumn ? '' : 'hidden'}`,
    };

    return (
        <div
            style={{
                backgroundColor: '#F2F2F2',
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <div
                className=' justify-content-center d-flex align-items-center'
                style={question}
            >
                <p>{props.question} </p>
            </div>
            <div className='row coitainer-fluid'>
                <div
                    className='col-md-2 time-wrapper d-flex justify-content-center align-items-center '
                    style={detail}
                >
                    <CountdownCircleTimer
                        onComplete={() => {
                            // props.questionOver();
                            if (!props.showVolumn) {
                                props.setShowVolumn(true);
                                props.rank();
                            }
                        }}
                        isPlaying
                        size={150}
                        duration={props.timeCoundown}
                        colors={[
                            ['#004777', 0.33],
                            ['#F7B801', 0.33],
                            ['#A30000', 0.33],
                        ]}
                    >
                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                </div>
                <div className='col-md-8'>
                    {!props.showVolumn ? (
                        <img
                            src={props.urlImg ? props.urlImg : img_ques_default}
                            className='mx-auto  d-block img-fluid'
                            style={detail}
                        />
                    ) : (
                        <div className='counter-container row'>
                            <div className='col-md-3 counter-container__col '>
                                <div
                                    className='counter-top'
                                    style={{ color: 'rgb(226, 26, 60)' }}
                                >
                                    <div className='d-flex'>
                                        <svg
                                            width='48px'
                                            viewBox='0 0 32 32'
                                            x='0px'
                                            y='0px'
                                            xmlns='http://www.w3.org/2000/svg'
                                            style={{ marginBottom: '-5px' }}
                                            className={`${
                                                props.showVolumn &&
                                                props.correctAnswer == 1
                                                    ? ''
                                                    : 'd-none'
                                            }`}
                                        >
                                            <path
                                                d='M12.926 22.652L8 17.725 9.767 15.957 12.841 19.031 21.959 9 23.808 10.682z'
                                                style={{
                                                    fill: 'rgb(226, 26, 60)',
                                                }}
                                            ></path>
                                        </svg>
                                        <span>{props.typeAnswer[1]}</span>
                                    </div>

                                    <div
                                        className='counter-volumn'
                                        style={{
                                            backgroundColor: 'rgb(226, 27, 60)',
                                            height: `${
                                                (props.typeAnswer[1] * 155) /
                                                    props.countAnswer +
                                                10
                                            }px`,
                                        }}
                                    ></div>
                                </div>
                                <div
                                    className='counter-bottom'
                                    style={{
                                        backgroundColor: 'rgb(226, 27, 60)',
                                    }}
                                >
                                    <img src={triangle} width='32px'></img>
                                </div>
                            </div>
                            <div className='col-md-3 counter-container__col'>
                                <div
                                    className='counter-top'
                                    style={{ color: 'rgb(19, 104, 206)' }}
                                >
                                    <div className='d-flex'>
                                        <svg
                                            width='48px'
                                            viewBox='0 0 32 32'
                                            x='0px'
                                            y='0px'
                                            xmlns='http://www.w3.org/2000/svg'
                                            style={{ marginBottom: '-5px' }}
                                            className={`${
                                                props.showVolumn &&
                                                props.correctAnswer == 2
                                                    ? ''
                                                    : 'd-none'
                                            }`}
                                        >
                                            <path
                                                d='M12.926 22.652L8 17.725 9.767 15.957 12.841 19.031 21.959 9 23.808 10.682z'
                                                style={{
                                                    fill: 'rgb(19, 104, 206)',
                                                }}
                                            ></path>
                                        </svg>
                                        <span>{props.typeAnswer[2]}</span>
                                    </div>

                                    <div
                                        className='counter-volumn'
                                        style={{
                                            backgroundColor:
                                                'rgb(19, 104, 206)',
                                            height: `${
                                                (props.typeAnswer[2] * 155) /
                                                    props.countAnswer +
                                                10
                                            }px`,
                                        }}
                                    ></div>
                                </div>
                                <div
                                    className='counter-bottom'
                                    style={{
                                        backgroundColor: 'rgb(19, 104, 206)',
                                    }}
                                >
                                    <img src={diamond} width='32px'></img>
                                </div>
                            </div>
                            <div className='col-md-3 counter-container__col'>
                                <div
                                    className='counter-top'
                                    style={{ color: 'rgb(216, 158, 0)' }}
                                >
                                    <div className='d-flex'>
                                        <svg
                                            width='48px'
                                            viewBox='0 0 32 32'
                                            x='0px'
                                            y='0px'
                                            xmlns='http://www.w3.org/2000/svg'
                                            style={{ marginBottom: '-5px' }}
                                            className={`${
                                                props.showVolumn &&
                                                props.correctAnswer == 3
                                                    ? ''
                                                    : 'd-none'
                                            }`}
                                        >
                                            <path
                                                d='M12.926 22.652L8 17.725 9.767 15.957 12.841 19.031 21.959 9 23.808 10.682z'
                                                style={{
                                                    fill: 'rgb(216, 158, 0)',
                                                }}
                                            ></path>
                                        </svg>
                                        <span>{props.typeAnswer[3]}</span>
                                    </div>

                                    <div
                                        className='counter-volumn'
                                        style={{
                                            backgroundColor: 'rgb(216, 158, 0)',
                                            height: `${
                                                (props.typeAnswer[3] * 155) /
                                                    props.countAnswer +
                                                10
                                            }px`,
                                        }}
                                    ></div>
                                </div>
                                <div
                                    className='counter-bottom'
                                    style={{
                                        backgroundColor: 'rgb(216, 158, 0)',
                                    }}
                                >
                                    <img src={circle} width='32px'></img>
                                </div>
                            </div>
                            <div className='col-md-3 counter-container__col'>
                                <div
                                    className='counter-top'
                                    style={{ color: 'rgb(38, 137, 12)' }}
                                >
                                    <div className='d-flex'>
                                        <svg
                                            width='48px'
                                            viewBox='0 0 32 32'
                                            x='0px'
                                            y='0px'
                                            xmlns='http://www.w3.org/2000/svg'
                                            style={{ marginBottom: '-5px' }}
                                            className={`${
                                                props.showVolumn &&
                                                props.correctAnswer == 4
                                                    ? ''
                                                    : 'd-none'
                                            }`}
                                        >
                                            <path
                                                d='M12.926 22.652L8 17.725 9.767 15.957 12.841 19.031 21.959 9 23.808 10.682z'
                                                style={{
                                                    fill: 'rgb(38, 137, 12)',
                                                }}
                                            ></path>
                                        </svg>
                                        <span>{props.typeAnswer[4]}</span>
                                    </div>

                                    <div
                                        className='counter-volumn'
                                        style={{
                                            backgroundColor: 'rgb(38, 137, 12)',
                                            height: `${
                                                (props.typeAnswer[4] * 155) /
                                                    props.countAnswer +
                                                10
                                            }px`,
                                        }}
                                    ></div>
                                </div>
                                <div
                                    className='counter-bottom'
                                    style={{
                                        backgroundColor: 'rgb(38, 137, 12)',
                                    }}
                                >
                                    <img src={square} width='32px'></img>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className='col-md-2 d-flex justify-content-center  text-center align-items-center'
                    style={{ fontSize: '50px', fontWeight: '600' }}
                >
                    {props.showVolumn ? (
                        <button
                            onClick={() => props.questionOver()}
                            className='btn-custom'
                            style={{
                                backgroundColor: 'rgb(18, 96, 190)',
                                marginBottom: '245px',
                                marginLeft: '90px',
                            }}
                        >
                            Next
                        </button>
                    ) : (
                        <>
                            {props.countAnswer}
                            <br />
                            answers
                        </>
                    )}
                </div>
            </div>
            <div className='container-fluid row'>
                <div
                    className='answer-wrap__answer col-md-6'
                    style={{
                        opacity: `${
                            (props.correctAnswer == 1 && props.showVolumn) ||
                            !props.showVolumn
                                ? '1'
                                : '0.25'
                        }`,
                    }}
                >
                    <div
                        className='row answer-custom'
                        style={{ backgroundColor: 'rgb(226, 27, 60)' }}
                    >
                        <img
                            src={triangle}
                            width='32px'
                            className='col-md-2'
                        ></img>
                        <span className='col-md-8'>{props.answer1}</span>
                        <img
                            src={props.correctAnswer == 1 ? check : cross}
                            width='64px'
                            className={`col-md-2 ${
                                props.showVolumn ? '' : 'd-none'
                            }`}
                        ></img>
                    </div>
                </div>
                <div
                    className='answer-wrap__answer col-md-6'
                    style={{
                        opacity: `${
                            (props.correctAnswer == 2 && props.showVolumn) ||
                            !props.showVolumn
                                ? '1'
                                : '0.25'
                        }`,
                    }}
                >
                    <div
                        className='row answer-custom'
                        style={{ backgroundColor: 'rgb(19, 104, 206)' }}
                    >
                        <img
                            src={diamond}
                            width='32px'
                            className='col-md-2'
                        ></img>
                        <span className='col-md-8'>{props.answer2}</span>
                        <img
                            src={props.correctAnswer == 2 ? check : cross}
                            width='64px'
                            className={`col-md-2 ${
                                props.showVolumn ? '' : 'd-none'
                            }`}
                        ></img>
                    </div>
                </div>
                <div
                    className='answer-wrap__answer col-md-6'
                    style={{
                        opacity: `${
                            (props.correctAnswer == 3 && props.showVolumn) ||
                            !props.showVolumn
                                ? '1'
                                : '0.25'
                        }`,
                    }}
                >
                    <div
                        className='row answer-custom'
                        style={{ backgroundColor: 'rgb(216, 158, 0)' }}
                    >
                        <img
                            src={circle}
                            width='32px'
                            className='col-md-2'
                        ></img>
                        <span className='col-md-8'>{props.answer3}</span>
                        <img
                            src={props.correctAnswer == 3 ? check : cross}
                            width='64px'
                            className={`col-md-2 ${
                                props.showVolumn ? '' : 'd-none'
                            }`}
                        ></img>
                    </div>
                </div>
                <div
                    className='answer-wrap__answer col-md-6 '
                    style={{
                        opacity: `${
                            (props.correctAnswer == 4 && props.showVolumn) ||
                            !props.showVolumn
                                ? '1'
                                : '0.25'
                        }`,
                    }}
                >
                    <div
                        className='row answer-custom'
                        style={{ backgroundColor: 'rgb(38, 137, 12)' }}
                    >
                        <img
                            src={square}
                            width='32px'
                            className='col-md-2'
                        ></img>
                        <span className='col-md-8'>{props.answer4}</span>
                        <img
                            src={props.correctAnswer == 4 ? check : cross}
                            width='64px'
                            className={`col-md-2 ${
                                props.showVolumn ? '' : 'd-none'
                            }`}
                        ></img>
                    </div>
                </div>
            </div>

            <div className></div>
        </div>
    );
}
