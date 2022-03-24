import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useActions } from '../../hooks/useActions';
import { useSelector } from 'react-redux';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const PostModal = ({ showModal, click, editing, articles }) => {
  const [editText, setEditText] = useState('');
  const [shareImage, setShareImage] = useState('');
  const [videoOpen, setVideoOpen] = useState(false);
  const [shareVideo, setShareVideo] = useState('');

  const { user } = useSelector(state => state.userState);
  const { postArticle } = useActions();

  const handleEditText = e => {
    setEditText(e.target.value);
  };

  const handleImageChange = e => {
    const image = e.target.files[0];

    if (image === '' || image === undefined) {
      alert('未上傳檔案或檔案格式錯誤');
      return;
    }

    setShareImage(image);
  };

  const handlePostArticle = e => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: shareVideo,
      user: user,
      description: editText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    postArticle(payload);
    reset(e);
  };

  const reset = e => {
    setEditText('');
    setShareImage('');
    setShareVideo('');
    setVideoOpen(false);
    click(e);
  };

  return (
    <div>
      {showModal === 'open' && (
        <Container>
          <Content>
            <Header>
              <h2>撰寫動態</h2>
              <button onClick={e => reset(e)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{user.displayName || 'Name'}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editText}
                  onChange={handleEditText}
                  placeholder="今天想說些甚麼?"
                  autoFocus={true}
                ></textarea>
                <UploadImage>
                  {shareImage && (
                    <img src={URL.createObjectURL(shareImage)} alt="" />
                  )}
                  {shareVideo && (
                    <ReactPlayer width={'100%'} url={shareVideo} />
                  )}
                </UploadImage>
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton>
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    name="image"
                    id="file"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="file"
                    onClick={() => {
                      setVideoOpen(false);
                      setShareVideo('');
                    }}
                  >
                    <img src="/images/postPhoto.svg" alt="" />
                  </label>
                </AssetButton>
                <AssetButton>
                  <input
                    type="text"
                    value={shareVideo}
                    onChange={e => setShareVideo(e.target.value)}
                    name="video"
                    id="video"
                    placeholder="影片網址"
                    style={
                      videoOpen ? { display: 'block' } : { display: 'none' }
                    }
                  />
                  <label
                    htmlFor="video"
                    onClick={() => {
                      setVideoOpen(!videoOpen);
                      setShareImage('');
                    }}
                  >
                    <img src="/images/video.svg" alt="" />
                  </label>
                </AssetButton>
              </AttachAssets>

              <ShareComment>
                <AssetButton>
                  <img src="/images/comment-icon.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>

              <PostButton
                disabled={!editText ? true : false}
                onClick={e => {
                  handlePostArticle(e);
                }}
              >
                發表
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: #fff;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 40px;
    width: 40px;
    min-width: 15px;
    background-color: #fff;
    border: none;
    svg,
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 1px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
  margin-top: 20px;
`;

const AssetButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  cursor: default;
  background-color: #fff;
  border: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  label {
    width: 30px;
    height: 24px;
  }

  #video {
    width: 200px;
    position: absolute;
    bottom: 40px;
    left: -20px;
    padding: 5px;
  }
`;
const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding: 0 16px;
  background: ${props => {
    return props.disabled ? 'rgba(0,0,0,.1)' : '#0a66c2';
  }};
  cursor: ${props => (props.disabled ? 'initial' : 'pointer')};
  color: white;
  border: none;
  &:hover {
    background: ${props => (props.disabled ? 'rgba(0,0,0,.1)' : '#004182')};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    padding: 5px;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  img {
    width: 100%;
  }
`;
export default PostModal;
