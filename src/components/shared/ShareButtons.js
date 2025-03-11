import { TwitterOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ShareButtonsWrapper = styled(Space)`
  margin: 16px 0;
  display: flex;
  justify-content: center;
`;

const LineIcon = styled.span`
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

const ShareButtons = ({ onShare }) => {
  return (
    <ShareButtonsWrapper>
      <Button shareType="twitter" icon={<TwitterOutlined />} onClick={() => onShare('twitter')}>
        Twitterでシェア
      </Button>
      <Button shareType="line" icon={<LineIcon>L</LineIcon>} onClick={() => onShare('line')}>
        LINEでシェア
      </Button>
    </ShareButtonsWrapper>
  );
};

export default React.memo(ShareButtons);
