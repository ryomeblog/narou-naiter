import styled from 'styled-components';

// 共通のスタイルコンポーネント
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const CardBase = styled.div`
  position: relative;
  max-width: 600px;
  width: 100%;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 1;
  min-height: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow: visible;

  @media (max-width: 768px) {
    margin: 60px auto;
  }
`;

export const CardContent = styled.div`
  position: relative;
  z-index: 3;
  padding: 40px 24px;
  flex: 1;
`;

export const GoddessImage = styled.img`
  position: absolute;
  top: -25px;
  right: -75px;
  width: 350px;
  height: auto;
  pointer-events: none;
  z-index: 2;

  @media (max-width: 768px) {
    width: 270px;
    top: -30px;
    right: -50px;
    opacity: 0.8;
  }
`;
