import { Space } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ShareButtonsWrapper = styled(Space)`
  margin: 16px 0;
  display: flex;
  justify-content: center;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const LineIcon = styled.span`
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

const XIcon = styled.span`
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

const ShareButtons = ({ onShare }) => {
  return (
    <ShareButtonsWrapper>
      <Button shareType="x" icon={<XIcon>𝕏</XIcon>} onClick={() => onShare('x')}>
        Xでシェア
      </Button>
      <Button shareType="line" icon={<LineIcon>L</LineIcon>} onClick={() => onShare('line')}>
        LINEでシェア
      </Button>
    </ShareButtonsWrapper>
  );
};

export default React.memo(ShareButtons);
