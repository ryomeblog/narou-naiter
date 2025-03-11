import { ConfigProvider } from 'antd';
import jaJP from 'antd/locale/ja_JP';
import React from 'react';
import styled from 'styled-components';
import QuestionScreen from './components/game/QuestionScreen';
import ResultScreen from './components/game/ResultScreen';
import StartScreen from './components/game/StartScreen';
import useGameStore from './store/gameStore';

const AppWrapper = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const App = () => {
  const {
    gameState,
    currentQuestion,
    questionCount,
    guessedAnime,
    startGame,
    answerQuestion,
    resetGame,
    shareResult,
  } = useGameStore();

  const renderContent = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStart={startGame} />;
      case 'question':
        return (
          <QuestionScreen
            question={currentQuestion}
            questionNumber={questionCount + 1}
            totalQuestions={20}
            onAnswer={answerQuestion}
          />
        );
      case 'result':
        return <ResultScreen anime={guessedAnime} onShare={shareResult} onRestart={resetGame} />;
      default:
        return null;
    }
  };

  return (
    <ConfigProvider
      locale={jaJP}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
          fontFamily:
            "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif",
        },
      }}
    >
      <AppWrapper>{renderContent()}</AppWrapper>
    </ConfigProvider>
  );
};

export default App;
