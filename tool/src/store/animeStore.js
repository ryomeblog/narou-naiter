import { create } from 'zustand';

export const useAnimeStore = create((set, get) => ({
  animes: [],
  selectedAnime: null,

  // データの初期化
  initialize: async () => {
    try {
      const result = await window.electron.readFile('../src/data/animes.json');
      if (result.success) {
        const data = JSON.parse(result.content);
        set({ animes: data.animes || [] });
      }
    } catch (error) {
      console.error('アニメデータの読み込みに失敗しました:', error);
      set({ animes: [] });
    }
  },

  // アニメの追加
  addAnime: anime => {
    set(state => ({
      animes: [...state.animes, anime],
    }));
  },

  // アニメの更新
  updateAnime: updatedAnime => {
    set(state => ({
      animes: state.animes.map(anime => (anime.id === updatedAnime.id ? updatedAnime : anime)),
    }));
  },

  // アニメの削除
  deleteAnime: id => {
    set(state => ({
      animes: state.animes.filter(anime => anime.id !== id),
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
