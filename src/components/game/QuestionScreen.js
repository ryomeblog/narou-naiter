import { QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Button from '../shared/Button';
import { CardBase, CardContent, Container, GoddessImage } from '../shared/styles';

const { Title, Text } = Typography;

const QuestionCard = styled(CardBase)`
  .ant-card-body {
    padding: 0;
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

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
`;

const QuestionScreen = ({ question, answeredCount, onAnswer }) => {
  const baseUrl = process.env.PUBLIC_URL;

  return (
    <Container>
      <CardContainer>
        <QuestionCard as={Card}>
          <CardContent>
            <IconWrapper>
              <QuestionCircleOutlined />
            </IconWrapper>

            <QuestionCount>回答済みの質問: {answeredCount}問</QuestionCount>

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
          </CardContent>
          <GoddessImage src={`${baseUrl}/images/thinking.png`} alt="考え中の女神" />
        </QuestionCard>
      </CardContainer>
    </Container>
  );
};

export default React.memo(QuestionScreen);
