import styled from 'styled-components';
import db from '../../firebase';
import React, { useState, useEffect } from 'react';

import PostModal from '../PostModal';

import { useActions } from '../../hooks/useActions';
import { useSelector } from 'react-redux';
import AppLoading from '../AppLoading';
import ReactPlayer from 'react-player';

const Main = props => {
  const [showModal, setShowModal] = useState('close');
  const [showAction, setShowAction] = useState(false);
  const [editing, setEditing] = useState(false);

  const { user } = useSelector(state => state.userState);
  const { loading, articles } = useSelector(state => state.articleState);
  const { getArticle, deleteArticle } = useActions();

  const handleClick = e => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case 'open':
        setShowModal('close');
        break;
      case 'close':
        setShowModal('open');
        break;
      default:
        showModal('close');
        break;
    }
  };

  const handleShowAction = () => {
    setShowAction(!showAction);
  };

  const handleEdit = e => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    setShowModal('open');
    setEditing(true);
    setShowAction(false);
  };

  const handleDelete = id => {
    const del = window.confirm('確定要刪除該動態嗎?');
    if (del) {
      deleteArticle(id);
      setShowAction(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <Container>
      <ShareBox>
        <div>
          {user && user.photoURL ? (
            <img src={user.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button onClick={handleClick}>撰寫動態</button>
        </div>

        <div>
          <button onClick={handleClick}>
            <img src="/images/postPhoto.svg" alt="" onClick={handleClick} />
            <span onClick={handleClick}>照片</span>
          </button>

          <button onClick={handleClick}>
            <img src="/images/video.svg" alt="" onClick={handleClick} />
            <span onClick={handleClick}>影片</span>
          </button>

          <button onClick={handleClick}>
            <img src="/images/event.svg" alt="" onClick={handleClick} />
            <span onClick={handleClick}>活動</span>
          </button>

          <button onClick={handleClick}>
            <img src="/images/article.svg" alt="" onClick={handleClick} />
            <span onClick={handleClick}>撰寫文章</span>
          </button>
        </div>
      </ShareBox>
      {loading && <AppLoading show={false} />}
      <Content>
        {articles.length > 0 &&
          articles.map((article, key) => (
            <Article key={key}>
              <SharedActor>
                <a>
                  <img src={article.actor.image} alt="" />
                  <div>
                    <span>{article.actor.title}</span>
                    <span>{article.actor.description}</span>
                    <span>
                      {article.actor.date &&
                        article.actor.date.toDate().toLocaleDateString()}
                    </span>
                  </div>
                </a>
                <button onClick={handleShowAction}>
                  <img
                    src="/images/ellipsis.svg"
                    alt=""
                    onClick={handleShowAction}
                  />
                </button>
                <ArticleAction
                  style={
                    showAction ? { display: 'block' } : { display: 'none' }
                  }
                >
                  <a onClick={() => handleDelete(article.id)}>刪除文章</a>
                </ArticleAction>
              </SharedActor>
              <Description>{article.description}</Description>
              <SharedImg>
                <a>
                  {!article.shareImage && article.video ? (
                    <ReactPlayer width={'100%'} url={article.video} />
                  ) : (
                    article.shareImage && (
                      <img src={article.shareImage} alt="" />
                    )
                  )}
                </a>
              </SharedImg>
              <SocialCounts>
                <li>
                  <button>
                    <img
                      src="https://static-exp1.licdn.com/sc/h/f4ly07ldn7194ciimghrumv3l"
                      alt=""
                    />
                    <span>{(Math.random() * 500).toFixed(0)}</span>
                    <img
                      src="https://static-exp1.licdn.com/sc/h/3c4dl0u9dy2zjlon6tf5jxlqo"
                      alt=""
                    />
                    <span>{(Math.random() * 100).toFixed(0)}</span>
                  </button>
                </li>
                <li>
                  <a>{article.comments}則留言</a>
                </li>
              </SocialCounts>
              <SocialActions>
                <button>
                  <img src="/images/great-icon.svg" alt="" />
                  <span>讚</span>
                </button>
                <button>
                  <img src="/images/comment-icon.svg" alt="" />
                  <span>評論</span>
                </button>
                <button>
                  <img src="/images/share-icon.svg" alt="" />
                  <span>分享</span>
                </button>
                <button>
                  <img src="/images/send-icon.svg" alt="" />
                  <span>傳送</span>
                </button>
              </SocialActions>
            </Article>
          ))}
      </Content>
      <PostModal
        showModal={showModal}
        click={handleClick}
        editing={editing}
        articles={articles}
      />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 16px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }

      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        background-color: #fff;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const ArticleAction = styled.div`
  position: absolute;
  right: 10px;
  top: 2.5rem;
  background: white;
  border-radius: 5px;
  width: 200px;
  font-size: 16px;
  transition-duration: 0.2s;
  padding: 10px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 10;
  a {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const SharedActor = styled.div`
  display: flex;
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 10px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 10px;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-end;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    display: flex;

    a {
      margin-left: 10px;
      font-size: 16px;
    }

    button {
      display: flex;
      align-items: flex-end;
      background-color: #fff;
      border: none;
      img {
        width: 24px;
        height: 24px;
      }

      span {
        margin: 0 4px;
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    background-color: #fff;
    border: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

export default Main;
