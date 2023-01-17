import { useState } from 'react';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import Button from '../../components/common/Button';
import { palette } from '../../styles/palette';
import { formatDate } from '../../util/index';
import { PostComment } from '../../components/community/PostComment';

const MockData = {
  id: 30,
  title: '제목',
  content: '내용',
  nickname: 'qwer',
  tag: '자유',
  createdAt: '2022-12-22T00:04:45.020757',
  modifiedAt: '2022-12-22T00:04:45.020757',
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgL2oyiz-0BuC-6UnKLmWDzn-0RQg4jsaQTNbs0Aq1W_JuxgOI2-BldCcAbaRZEy12pXs&usqp=CAU',
  likeCount: 1,
  likeStatus: true,
  commentList: [
    {
      id: 1,
      nickname: 'ssori',
      content: '댓글',
      createdAt: '2022-12-22T00:04:45.020757',
      modifiedAt: '2022-12-22T00:04:45.020757',
      replyList: {
        id: 1,
        nickname: '닉네임',
        content: '대 댓글 내용',
        createdAt: '2022-12-22T00:04:45.020757',
        modifiedAt: '2022-12-22T00:04:45.020757',
        replyList: {
          id: 1,
          nickname: '닉네임',
          content: '대 댓글 내용',
          createdAt: '2022-12-22T00:04:45.020757',
          modifiedAt: '2022-12-22T00:04:45.020757',
          replyList: {
            id: 1,
            nickname: '닉네임',
            content: '대 댓글 내용',
            createdAt: '2022-12-22T00:04:45.020757',
            modifiedAt: '2022-12-22T00:04:45.020757',
            replyList: {
              id: 1,
              nickname: '닉네임',
              content: '대 댓글 내용',
              createdAt: '2022-12-22T00:04:45.020757',
              modifiedAt: '2022-12-22T00:04:45.020757',
            },
          },
        },
      },
    },
    {
      id: 2,
      nickname: 'joon',
      content: '댓글 내용2',
      createdAt: '2022-12-22T00:04:45.020757',
      modifiedAt: '2022-12-22T00:04:45.020757',
      replyList: {
        id: 1,
        nickname: '닉네임',
        content: '댓글 내용',
        createdAt: '2022-12-22T00:04:45.020757',
        modifiedAt: '2022-12-22T00:04:45.020757',
      },
    },
  ],
};

export default function DonePost() {
  const [isClicked, setIsClicked] = useState(false);
  const { postId } = useParams();
  console.log(postId);
  /* 객체 비구조화 할당 */
  const {
    likeCount,
    likeStatus,
    commentList,
    image,
    nickname,
    createdAt,
    title,
    content,
    tag,
  } = MockData;
  const onLikeHandler = () => {
    setIsClicked(_isClicked => !_isClicked);
  };
  const [comment, setComment] = useState('');
  const onCommentHandler = e => {
    setComment(e.target.value);
  };
  /* axios호출  */
  // const onCommentHandler =

  return (
    <StDonePostContainer>
      <StNavBar>
        <MdArrowBackIos />
        <span>게시글 목록</span>
      </StNavBar>
      <StBoardContainer>
        <h3>{title}</h3>
        <StUserInfo>
          <img alt="profileImg" src={image} />
          <div className="usercontainer">
            <span>{nickname}</span>
            <span>{formatDate(createdAt)}</span>
          </div>
        </StUserInfo>
        <StContentWrapper>
          <img alt="plantImg" src={image} />
          <span>{content}</span>
        </StContentWrapper>
        <StTagWrappeer>
          <Button size="sd" background={palette.borderColor2}>
            {tag}
          </Button>
        </StTagWrappeer>
        <StDivider />
        {likeStatus ? (
          <StLikeWrapper>
            <BsFillHeartFill onClick={onLikeHandler} />
            <span>{likeCount}</span>
          </StLikeWrapper>
        ) : (
          <StLikeWrapper>
            <BsHeart onClick={onLikeHandler} />
            <span>{likeCount}</span>
          </StLikeWrapper>
        )}
      </StBoardContainer>
      <StCreateCommentWrapper>
        <span>{commentList.length}개의 댓글</span>
        <StCreateCommentArea
          placeholder="댓글을 작성하세요"
          value={comment}
          onChange={onCommentHandler}
        />
        <div>
          <StButton type="button" onClick={onCommentHandler}>
            등록
          </StButton>
        </div>
      </StCreateCommentWrapper>
      {/* map함수를 사용해서 PostComment 여러개 생성 */}
      {/* PostComment는 컴포넌트로 분리 */}
      {commentList.map(v => {
        return <PostComment key={v.id} comment={v} />;
      })}
    </StDonePostContainer>
  );
}

const StDonePostContainer = styled.div`
  max-width: 1280px;
  width: 70%;
  margin: 0 auto;
  margin-top: 50px;
`;
const StNavBar = styled.div`
  display: flex;
  margin-bottom: 20px;
  span {
    font-size: 1.1rem;
  }
`;
const StBoardContainer = styled.div`
  border: 1.5px solid #eaeaea;
  border-radius: 8px;
  padding: 30px;
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;
const StUserInfo = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .usercontainer {
    display: flex;
    flex-direction: column;
  }
`;
const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  img {
    max-height: 300px;
    width: 400px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  span {
    line-height: 1.5rem;
  }
`;

const StTagWrappeer = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 08px;
  button {
    border-radius: 16px;
    padding: 3px 6px;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;
const StDivider = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #eaeaea;
  margin-top: 30px;
`;
const StLikeWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0 5px;
  margin-top: 20px;
`;
const StCreateCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const StCreateCommentArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  box-sizing: border-box;
  outline: none;
  resize: none;
  margin-top: 10px;
`;
const StButton = styled.button`
  background-color: ${palette.mainColor};
  color: ${palette.white};
  width: 100px;
  height: 30px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  float: right;
  margin-top: 8px;
`;
