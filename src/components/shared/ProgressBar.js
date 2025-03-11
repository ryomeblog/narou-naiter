import { Progress } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ProgressWrapper = styled.div`
  width: 100%;
  margin: 20px 0;

  .ant-progress-text {
    font-size: 14px;
    color: #8c8c8c;
  }

  .ant-progress-inner {
    background-color: #f5f5f5;
  }

  .ant-progress-bg {
    background: linear-gradient(90deg, #108ee9 0%, #87d068 100%);
    transition: all 0.3s ease;
  }
`;

const QuestionProgress = ({ current, total }) => {
  const percent = Math.floor((current / total) * 100);

  return (
    <ProgressWrapper>
      <Progress
        percent={percent}
        status="active"
        format={() => `${current}/${total}`}
        strokeWidth={10}
      />
    </ProgressWrapper>
  );
};

export default React.memo(QuestionProgress);
