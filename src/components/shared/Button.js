import { Button as AntButton } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled(AntButton)`
  &.answer-button {
    min-width: 120px;
    margin: 0 8px;
    font-size: 16px;
    height: 40px;

    &.yes-button {
      background-color: #52c41a;
      border-color: #52c41a;

      &:hover {
        background-color: #73d13d;
        border-color: #73d13d;
      }
    }

    &.no-button {
      background-color: #ff4d4f;
      border-color: #ff4d4f;

      &:hover {
        background-color: #ff7875;
        border-color: #ff7875;
      }
    }

    &.unknown-button {
      color: #8c8c8c;
      border-color: #d9d9d9;

      &:hover {
        color: #595959;
        border-color: #8c8c8c;
      }
    }
  }

  &.share-button {
    margin: 0 8px;

    &.twitter {
      background-color: #1da1f2;
      border-color: #1da1f2;
      color: white;

      &:hover {
        background-color: #1a91da;
        border-color: #1a91da;
      }
    }

    &.line {
      background-color: #00b900;
      border-color: #00b900;
      color: white;

      &:hover {
        background-color: #00a000;
        border-color: #00a000;
      }
    }
  }
`;

const Button = ({ children, type = 'default', answerType, shareType, ...props }) => {
  const classNames = [
    answerType && 'answer-button',
    answerType && `${answerType}-button`,
    shareType && 'share-button',
    shareType && shareType,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <StyledButton type={type} className={classNames} {...props}>
      {children}
    </StyledButton>
  );
};

export default React.memo(Button);
