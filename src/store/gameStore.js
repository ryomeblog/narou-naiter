import { produce } from 'immer';
import { create } from 'zustand';
import animeData from '../data/animes.json';
import questionData from '../data/questions.json';

// ユーティリティ関数
const calculateInformationGain = (candidates, question) => {
  if (candidates.length === 0) return 0;

  const yesCount = candidates.filter(anime => anime.attributes[question.attribute]).length;
  const noCount = candidates.length - yesCount;

  // エントロピーに基づく情報利得を計算
  const total = candidates.length;
  const yesRatio = yesCount / total;
  const noRatio = noCount / total;

  // 分割の均一性を評価（0に近いほど良い分割）
  const splitQuality = Math.abs(yesRatio - noRatio);

  return {
    score: -splitQuality, // スコアを反転（小さいほど良い分割）
    weight: question.weight,
  };
};

const selectNextQuestion = (candidates, answeredQuestions) => {
  const remainingQuestions = questionData.questions.filter(q => !answeredQuestions.includes(q.id));

  if (remainingQuestions.length === 0) return null;

  // 各質問の情報利得を計算
  const questionScores = remainingQuestions.map(question => {
    const { score, weight } = calculateInformationGain(candidates, question);
    return {
      question,
      finalScore: score * weight, // 重み付けされたスコア
    };
  });

  // スコアが最も高い質問を選択
  return questionScores.sort((a, b) => b.finalScore - a.finalScore)[0].question;
};

const filterCandidates = (candidates, questionId, answer) => {
  if (answer === 'unknown') return candidates;

  const question = questionData.questions.find(q => q.id === questionId);
  if (!question) return candidates;

  return candidates.filter(anime => {
    const hasAttribute = anime.attributes[question.attribute];
    return (answer === 'yes' && hasAttribute) || (answer === 'no' && !hasAttribute);
  });
};

const useGameStore = create((set, get) => ({
  // 状態
  gameState: 'start', // 'start' | 'question' | 'result'
  candidates: [],
  currentQuestion: null,
  answers: {},
  questionCount: 0,
  guessedAnime: null,

  // アクション
  startGame: () => {
    set({
      gameState: 'question',
      candidates: animeData.animes,
      answers: {},
      questionCount: 0,
      guessedAnime: null,
      currentQuestion: selectNextQuestion(animeData.animes, []),
    });
  },

  answerQuestion: answer => {
    const state = get();
    const newState = produce(state, draft => {
      // 回答を記録
      draft.answers[state.currentQuestion.id] = answer;
      draft.questionCount++;

      // 候補を絞り込む
      const newCandidates = filterCandidates(state.candidates, state.currentQuestion.id, answer);
      draft.candidates = newCandidates;

      // 次の状態を決定
      if (newCandidates.length <= 1 || draft.questionCount >= 20) {
        // 候補が1つ以下、または質問数が上限に達した場合
        draft.gameState = 'result';
        draft.guessedAnime = newCandidates[0] || null;
      } else {
        // 次の質問を選択
        draft.currentQuestion = selectNextQuestion(newCandidates, Object.keys(draft.answers));
      }
    });

    set(newState);
  },

  resetGame: () => {
    set({
      gameState: 'start',
      candidates: [],
      currentQuestion: null,
      answers: {},
      questionCount: 0,
      guessedAnime: null,
    });
  },

  // シェア機能
  shareResult: platform => {
    const state = get();
    if (!state.guessedAnime) return;

    const text = `私がイメージしていたなろう系アニメは「${state.guessedAnime.title}」でした！\n#なろう系アニメ診断\n`;
    const encodedText = encodeURIComponent(text);

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
    } else if (platform === 'line') {
      window.open(`https://line.me/R/msg/text/?${encodedText}`, '_blank');
    }
  },
}));

export default useGameStore;
