import { QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Button from '../shared/Button';
import { CardBase, CardContent, Container, GoddessImage } from '../shared/styles';

const { Title, Text } = Typography;

const StartCard = styled(CardBase)`
  .ant-card-body {
    padding: 0;
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
  color: rgb(88, 78, 29);
  font-size: 16px;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px; // カードとその横の画像を含むコンテナの最大幅
`;

const StartScreen = ({ onStart }) => {
  return (
    <Container>
      <CardContainer>
        <StartCard as={Card}>
          <CardContent>
            <IconWrapper>
              <QuestionCircleOutlined />
            </IconWrapper>
            <Title level={2}>なろうネーター</Title>
            <Description>
              あなたがイメージしている「なろう系アニメ」を当てます！
              <br />
              質問に答えていくだけで、あなたの考えているアニメを推測します。
            </Description>
            <Button type="primary" size="large" onClick={onStart}>
              診断スタート
            </Button>
          </CardContent>
          <GoddessImage src="/images/smile.png" alt="笑顔の女神" />
        </StartCard>
      </CardContainer>
    </Container>
  );
};

export default React.memo(StartScreen);
