import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, List } from 'antd';
import React, { useEffect } from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { useQuestionStore } from '../../store/questionStore';
import { AnimeForm } from './AnimeForm';

const { Search } = Input;

export const AnimeEditor = () => {
  const {
    filteredAnimes,
    selectedAnime,
    setSelectedAnime,
    setSearchQuery,
    addAnime,
    initialize: initializeAnimes,
  } = useAnimeStore();

  const { initialize: initializeQuestions } = useQuestionStore();

  useEffect(() => {
    initializeAnimes();
    initializeQuestions();
  }, [initializeAnimes, initializeQuestions]);

  const handleAdd = () => {
    const newAnime = {
      id: `${Date.now()}`,
      title: '',
      imageUrl: '',
      description: '',
      attributes: {},
    };
    addAnime(newAnime);
    setSelectedAnime(newAnime);
  };

  const handleSearch = value => {
    setSearchQuery(value);
  };

  return (
    <div className="main-content">
      <div className="list-panel">
        <div className="search-box">
          <Search
            placeholder="アニメを検索"
            onSearch={handleSearch}
            onChange={e => handleSearch(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{ marginTop: '8px', width: '100%' }}
          >
            新規作成
          </Button>
        </div>
        <div className="list-container" style={{ flex: 1, overflow: 'hidden' }}>
          <List
            dataSource={filteredAnimes}
            style={{
              height: '100%',
              overflow: 'auto',
              padding: '16px',
            }}
            renderItem={anime => (
              <List.Item
                onClick={() => setSelectedAnime(anime)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedAnime?.id === anime.id ? '#e6f7ff' : 'transparent',
                  padding: '8px 16px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                  marginBottom: '40px',
                }}
              >
                {anime.title || '(無題)'}
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className="edit-panel">{selectedAnime && <AnimeForm anime={selectedAnime} />}</div>
    </div>
  );
};
