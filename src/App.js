import { ConfigProvider } from 'antd';
import jaJP from 'antd/locale/ja_JP';
import React from 'react';
import QuestionScreen from './components/game/QuestionScreen';
import ResultScreen from './components/game/ResultScreen';
import StartScreen from './components/game/StartScreen';
import useGameStore from './store/gameStore';

const App = () => {
  const {
    gameState,
    currentQuestion,
    answeredQuestions,
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
            answeredCount={answeredQuestions.length}
            onAnswer={answerQuestion}
          />
        );
      case 'result':
        return (
          <ResultScreen
            anime={guessedAnime}
            questionCount={answeredQuestions.length}
            onShare={shareResult}
            onRestart={resetGame}
          />
        );
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
      {renderContent()}
    </ConfigProvider>
  );
};

export default App;
