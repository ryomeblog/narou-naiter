import { QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Button from '../shared/Button';

const { Title, Text } = Typography;

const StartCard = styled(Card)`
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .ant-card-body {
    padding: 40px 24px;
  }
`;

const IconWrapper = styled.div`
  font-size: 48px;
  color: #1890ff;
  margin-bottom: 24px;
`;

const Description = styled(Text)`
  display: block;
  margin: 16px 0 32px;
  color: #8c8c8c;
  font-size: 16px;
`;

const StartScreen = ({ onStart }) => {
  return (
    <StartCard>
      <IconWrapper>
        <QuestionCircleOutlined />
      </IconWrapper>
      <Title level={2}>なろう系アニメ診断</Title>
      <Description>
        あなたがイメージしている「なろう系アニメ」を当てます！
        <br />
        質問に答えていくだけで、あなたの考えているアニメを推測します。
      </Description>
      <Button type="primary" size="large" onClick={onStart}>
        診断スタート
      </Button>
    </StartCard>
  );
};

export default React.memo(StartScreen);
