import React, { useEffect, useState } from 'react';
import './Infor_Quiz.css';
import { storage } from '../../firebase';
function InforQuiz(props) {
    const [stateInfor, setStateInfor] = useState({
        title: '',
        description: '',
        urlImgQuiz: '',
    });
    const [inputValue, setInputValue] = useState({
        title: '',
        description: '',
    });
    useEffect(() => {
        props.inforCallBack(stateInfor);
    }, [stateInfor.title]);
    function handleSubmit() {
      setStateInfor({ ...stateInfor, ...inputValue })
    }
    const upload = async (event) => {
        const file = event.target.files[0];
        const metadata = {
            contentType: 'image/jpeg, image/png',
        };
        const uploadTask = storage
            .child('images/' + file.name)
            .put(file, metadata);
        uploadTask.on(
            'state_changed', // or 'state_changed'
            function (snapshot) {
                switch (snapshot.state) {
                    case 'paused': // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case 'running': // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            function (error) {
                alert('Error');
            },
            function () {
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(function (downloadURL) {
                        console.log(downloadURL);
                        setStateInfor({
                            ...stateInfor,
                            urlImgQuiz: downloadURL,
                        });
                    });
            }
        );
    };
    function handleInput(e) {
      setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h1>Kahoot summary</h1>
            <div className='top-form'>
                <div className='left '>
                    <label>Title</label>
                    <input
                        name='title'
                        type='text'
                        value={inputValue.title}
                        placeholder='Enter kahoot title...'
                        onChange={handleInput}
                    ></input>
                    <label>Description</label>
                    <textarea
                        name='description'
                        type='text'
                        value={inputValue.description}
                        onChange={handleInput}
                    ></textarea>
                </div>
                <div className='right '>
                    <label>Cover image</label>
                    <div className='load-img'>
                        <img
                            src={stateInfor.urlImgQuiz}
                            alt=''
                            className='img-fluid'
                        ></img>
                    </div>
                    <span class='btn btn-primary btn-file'>
                        Upload
                        <input type='file' onChange={upload} />
                    </span>
                </div>
            </div>

            <div className='button-form'>
                <button class='btn btn-secondary' data-dismiss='modal'>
                    Cancel
                </button>
                <button
                    class='btn btn-success'
                    data-dismiss='modal'
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default InforQuiz;
