import { create } from 'zustand';
import { useAnimeStore } from './animeStore';

export const useQuestionStore = create((set, get) => ({
  questions: [],
  selectedQuestion: null,

  // データの初期化
  initialize: async () => {
    try {
      const result = await window.electron.readFile('../src/data/questions.json');
      if (result.success) {
        const data = JSON.parse(result.content);
        set({ questions: data.questions || [] });
      }
    } catch (error) {
      console.error('質問データの読み込みに失敗しました:', error);
      set({ questions: [] });
    }
  },

  // 質問の追加
  addQuestion: question => {
    // 新しい質問を追加する際、全てのアニメの属性にも追加
    const updateAnimes = useAnimeStore.getState().animes.map(anime => ({
      ...anime,
      attributes: {
        ...anime.attributes,
        [question.attribute]: false, // デフォルトでfalse
      },
    }));
    useAnimeStore.setState({ animes: updateAnimes });

    set(state => ({
      questions: [...state.questions, question],
    }));
  },

  // 質問の更新
  updateQuestion: (updatedQuestion, oldAttribute) => {
    // 質問の属性キーが変更された場合、アニメの属性も更新
    if (oldAttribute && oldAttribute !== updatedQuestion.attribute) {
      const animes = useAnimeStore.getState().animes.map(anime => {
        const { [oldAttribute]: oldValue, ...restAttributes } = anime.attributes;
        return {
          ...anime,
          attributes: {
            ...restAttributes,
            [updatedQuestion.attribute]: oldValue || false,
          },
        };
      });
      useAnimeStore.setState({ animes });
    }

    set(state => ({
      questions: state.questions.map(question =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      ),
    }));
  },

  // 質問の削除
  deleteQuestion: id => {
    const questionToDelete = get().questions.find(q => q.id === id);
    if (questionToDelete) {
      // アニメの属性からも削除
      const animes = useAnimeStore.getState().animes.map(anime => {
        const { [questionToDelete.attribute]: removed, ...restAttributes } = anime.attributes;
        return {
          ...anime,
          attributes: restAttributes,
        };
      });
      useAnimeStore.setState({ animes });
    }

    set(state => ({
      questions: state.questions.filter(question => question.id !== id),
    }));
  },

  // 選択中の質問を設定
  setSelectedQuestion: question => {
    set({ selectedQuestion: question });
  },

  // データの保存
  saveQuestions: async () => {
    const { questions } = get();
    try {
      const content = JSON.stringify({ questions }, null, 2);
      const result = await window.electron.saveFile('../src/data/questions.json', content);
      return result.success;
    } catch (error) {
      console.error('質問データの保存に失敗しました:', error);
      return false;
    }
  },

  // データのエクスポート
  exportQuestions: async () => {
    const { questions } = get();
    try {
      const saveResult = await window.electron.saveDialog();
      if (saveResult.success) {
        const content = JSON.stringify({ questions }, null, 2);
        const result = await window.electron.saveFile(saveResult.filePath, content);
        return result.success;
      }
      return false;
    } catch (error) {
      console.error('質問データのエクスポートに失敗しました:', error);
      return false;
    }
  },

  // データのインポート
  importQuestions: async () => {
    try {
      const selectResult = await window.electron.selectFile();
      if (selectResult.success) {
        const result = await window.electron.readFile(selectResult.filePath);
        if (result.success) {
          const data = JSON.parse(result.content);
          if (data.questions) {
            // アニメの属性も更新
            const animes = useAnimeStore.getState().animes.map(anime => ({
              ...anime,
              attributes: data.questions.reduce(
                (acc, q) => ({
                  ...acc,
                  [q.attribute]: anime.attributes[q.attribute] || false,
                }),
                {}
              ),
            }));
            useAnimeStore.setState({ animes });

            set({ questions: data.questions });
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      console.error('質問データのインポートに失敗しました:', error);
      return false;
    }
  },
}));
