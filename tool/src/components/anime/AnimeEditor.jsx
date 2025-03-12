import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, List } from 'antd';
import React, { useEffect } from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { useQuestionStore } from '../../store/questionStore';
import { AnimeForm } from './AnimeForm';

const { Search } = Input;

export const AnimeEditor = () => {
  const { animes, selectedAnime, setSelectedAnime, initialize: initializeAnimes } = useAnimeStore();

  const { initialize: initializeQuestions } = useQuestionStore();

  useEffect(() => {
    initializeAnimes();
    initializeQuestions();
  }, [initializeAnimes, initializeQuestions]);

  const handleAdd = () => {
    setSelectedAnime({
      id: `${Date.now()}`,
      title: '',
      imageUrl: '',
      description: '',
      attributes: {},
    });
  };

  return (
    <div className="main-content">
      <div className="list-panel">
        <div className="search-box">
          <Search placeholder="アニメを検索" />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{ marginTop: '8px', width: '100%' }}
          >
            新規作成
          </Button>
        </div>
        <List
          dataSource={animes}
          renderItem={anime => (
            <List.Item
              onClick={() => setSelectedAnime(anime)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedAnime?.id === anime.id ? '#e6f7ff' : 'transparent',
                padding: '8px 16px',
              }}
            >
              {anime.title || '(無題)'}
            </List.Item>
          )}
        />
      </div>
      <div className="edit-panel">{selectedAnime && <AnimeForm anime={selectedAnime} />}</div>
    </div>
  );
};
