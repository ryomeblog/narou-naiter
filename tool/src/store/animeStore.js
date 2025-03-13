import { create } from 'zustand';
import { useQuestionStore } from './questionStore';

export const useAnimeStore = create((set, get) => ({
  animes: [],
  selectedAnime: null,
  searchQuery: '',
  filteredAnimes: [],

  // データの初期化
  initialize: async () => {
    try {
      const result = await window.electron.readFile('../src/data/animes.json');
      if (result.success) {
        const data = JSON.parse(result.content);
        const animes = data.animes || [];
        set({ animes, filteredAnimes: animes });

        // 既存の質問の属性を全アニメに追加
        const questions = useQuestionStore.getState().questions;
        if (questions.length > 0) {
          const updatedAnimes = animes.map(anime => {
            const attributes = { ...anime.attributes };
            questions.forEach(question => {
              if (!(question.attribute in attributes)) {
                attributes[question.attribute] = false;
              }
            });
            return {
              ...anime,
              attributes,
            };
          });
          set({ animes: updatedAnimes, filteredAnimes: updatedAnimes });
        }
      }
    } catch (error) {
      console.error('アニメデータの読み込みに失敗しました:', error);
      set({ animes: [], filteredAnimes: [] });
    }
  },

  // アニメの追加
  addAnime: anime => {
    // 既存の質問の属性を追加
    const questions = useQuestionStore.getState().questions;
    const attributes = { ...anime.attributes };
    questions.forEach(question => {
      if (!(question.attribute in attributes)) {
        attributes[question.attribute] = false;
      }
    });
    const animeWithAttributes = {
      ...anime,
      attributes,
    };

    set(state => ({
      animes: [...state.animes, animeWithAttributes],
      filteredAnimes: state.searchQuery
        ? [...state.animes, animeWithAttributes].filter(a =>
            a.title.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        : [...state.animes, animeWithAttributes],
      selectedAnime: animeWithAttributes,
    }));

    // 自動保存
    setTimeout(() => {
      get().saveAnimes();
    }, 0);
  },

  // 検索クエリの設定
  setSearchQuery: query => {
    set(state => ({
      searchQuery: query,
      filteredAnimes: query
        ? state.animes.filter(anime => anime.title.toLowerCase().includes(query.toLowerCase()))
        : state.animes,
    }));
  },

  // アニメの更新
  updateAnime: updatedAnime => {
    set(state => ({
      animes: state.animes.map(anime => (anime.id === updatedAnime.id ? updatedAnime : anime)),
      filteredAnimes: state.searchQuery
        ? state.animes
            .map(anime => (anime.id === updatedAnime.id ? updatedAnime : anime))
            .filter(anime => anime.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        : state.animes.map(anime => (anime.id === updatedAnime.id ? updatedAnime : anime)),
    }));

    // 自動保存
    setTimeout(() => {
      get().saveAnimes();
    }, 0);
  },

  // アニメの削除
  deleteAnime: id => {
    set(state => ({
      animes: state.animes.filter(anime => anime.id !== id),
      filteredAnimes: state.searchQuery
        ? state.animes
            .filter(anime => anime.id !== id)
            .filter(anime => anime.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        : state.animes.filter(anime => anime.id !== id),
    }));
  },

  // 選択中のアニメを設定
  setSelectedAnime: anime => {
    set({ selectedAnime: anime });
  },

  // アニメの属性を更新
  updateAnimeAttribute: (animeId, attribute, value) => {
    set(state => ({
      animes: state.animes.map(anime =>
        anime.id === animeId
          ? {
              ...anime,
              attributes: {
                ...anime.attributes,
                [attribute]: value,
              },
            }
          : anime
      ),
    }));
  },

  // データの保存
  saveAnimes: async () => {
    const { animes } = get();
    try {
      const content = JSON.stringify({ animes }, null, 2);
      const result = await window.electron.saveFile('../src/data/animes.json', content);
      return result.success;
    } catch (error) {
      console.error('アニメデータの保存に失敗しました:', error);
      return false;
    }
  },

  // データのエクスポート
  exportAnimes: async () => {
    const { animes } = get();
    try {
      const saveResult = await window.electron.saveDialog();
      if (saveResult.success) {
        const content = JSON.stringify({ animes }, null, 2);
        const result = await window.electron.saveFile(saveResult.filePath, content);
        return result.success;
      }
      return false;
    } catch (error) {
      console.error('アニメデータのエクスポートに失敗しました:', error);
      return false;
    }
  },

  // データのインポート
  importAnimes: async () => {
    try {
      const selectResult = await window.electron.selectFile();
      if (selectResult.success) {
        const result = await window.electron.readFile(selectResult.filePath);
        if (result.success) {
          const data = JSON.parse(result.content);
          if (data.animes) {
            set({ animes: data.animes });
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      console.error('アニメデータのインポートに失敗しました:', error);
      return false;
    }
  },
}));
