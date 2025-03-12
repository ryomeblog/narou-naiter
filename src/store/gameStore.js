import { produce } from 'immer';
import { create } from 'zustand';
import animeData from '../data/animes.json';
import questionData from '../data/questions.json';

// ユーティリティ関数
const calculateQuestionEffectiveness = (candidates, question) => {
  if (candidates.length === 0) return { score: 0, weight: 0 };

  const yesCount = candidates.filter(anime => anime.attributes[question.attribute]).length;
  const noCount = candidates.length - yesCount;

  // 最も均等に分割できる質問を選ぶ
  const total = candidates.length;
  const yesRatio = yesCount / total;

  // エントロピーに基づくスコアを計算
  // 完璧な分割（50:50）からの距離を計算
  const entropy = -(yesCount === 0 || noCount === 0
    ? 0
    : -(yesRatio * Math.log2(yesRatio) + (noCount / total) * Math.log2(noCount / total)));

  return {
    score: entropy,
    weight: question.weight,
  };
};

const selectNextQuestion = (candidates, answeredQuestions) => {
  const remainingQuestions = questionData.questions.filter(q => !answeredQuestions.includes(q.id));

  if (remainingQuestions.length === 0) return null;

  // 各質問の効果を計算
  const questionScores = remainingQuestions.map(question => {
    const { score, weight } = calculateQuestionEffectiveness(candidates, question);
    return {
      question,
      finalScore: score * weight, // 重み付けされたスコア
    };
  });

  // スコアが最も高い（最も効果的な）質問を選択
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
  answeredQuestions: [], // 回答済みの質問を追跡
  guessedAnime: null,

  // アクション
  startGame: () => {
    set({
      gameState: 'question',
      candidates: animeData.animes,
      answers: {},
      answeredQuestions: [],
      guessedAnime: null,
      currentQuestion: selectNextQuestion(animeData.animes, []),
    });
  },

  answerQuestion: answer => {
    const state = get();
    const newState = produce(state, draft => {
      // 回答を記録
      draft.answers[state.currentQuestion.id] = answer;
      draft.answeredQuestions.push(state.currentQuestion.id);

      // 候補を絞り込む
      const newCandidates = filterCandidates(state.candidates, state.currentQuestion.id, answer);
      draft.candidates = newCandidates;

      // 次の状態を決定
      if (newCandidates.length === 1) {
        // 一意に絞り込めた場合
        draft.gameState = 'result';
        draft.guessedAnime = newCandidates[0];
      } else if (newCandidates.length === 0) {
        // 候補が見つからない場合は最初の候補を表示
        draft.gameState = 'result';
        draft.guessedAnime = state.candidates[0];
      } else {
        // 次の質問を選択
        draft.currentQuestion = selectNextQuestion(newCandidates, draft.answeredQuestions);

        // 質問がなくなった場合は最も可能性の高い候補を表示
        if (!draft.currentQuestion) {
          draft.gameState = 'result';
          draft.guessedAnime = newCandidates[0];
        }
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
      answeredQuestions: [],
      guessedAnime: null,
    });
  },

  // シェア機能
  shareResult: platform => {
    const state = get();
    if (!state.guessedAnime) return;

    const questionCount = state.answeredQuestions.length;
    const text = `私がイメージしていたなろう系アニメは${questionCount}問で「${state.guessedAnime.title}」と診断されました！\n#なろう系アニメ診断\n`;
    const encodedText = encodeURIComponent(text);

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
    } else if (platform === 'line') {
      window.open(`https://line.me/R/msg/text/?${encodedText}`, '_blank');
    }
  },
}));

export default useGameStore;
