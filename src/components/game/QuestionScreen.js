import { QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Button from '../shared/Button';
import QuestionProgress from '../shared/ProgressBar';

const { Title, Text } = Typography;

const QuestionCard = styled(Card)`
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .ant-card-body {
    padding: 32px 24px;
  }
`;

const IconWrapper = styled.div`
  font-size: 36px;
  color: #1890ff;
  margin-bottom: 16px;
`;

const QuestionText = styled(Title)`
  margin-bottom: 24px !important;

  &.ant-typography {
    font-size: 24px;
  }
`;

const QuestionCount = styled(Text)`
  display: block;
  margin-bottom: 24px;
  color: #8c8c8c;
`;

const ButtonGroup = styled(Space)`
  display: flex;
  justify-content: center;
  margin-top: 32px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;

    .ant-btn {
      margin: 8px 0;
    }
  }
`;

const QuestionScreen = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  return (
    <QuestionCard>
      <QuestionProgress current={questionNumber} total={totalQuestions} />

      <IconWrapper>
        <QuestionCircleOutlined />
      </IconWrapper>

      <QuestionCount>
        質問 {questionNumber} / {totalQuestions}
      </QuestionCount>

      <QuestionText level={4}>{question.text}</QuestionText>

      <ButtonGroup size="large">
        <Button type="primary" answerType="yes" onClick={() => onAnswer('yes')}>
          はい
        </Button>
        <Button type="primary" answerType="no" onClick={() => onAnswer('no')}>
          いいえ
        </Button>
        <Button answerType="unknown" onClick={() => onAnswer('unknown')}>
          わからない
        </Button>
      </ButtonGroup>
    </QuestionCard>
  );
};

export default React.memo(QuestionScreen);
