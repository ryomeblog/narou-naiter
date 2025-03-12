import { Card, Typography } from 'antd';
import React from 'react';
import { useAnimeStore } from '../../store/animeStore';

const { Text } = Typography;

export const AnimeAttributes = ({ question, animes }) => {
  const { updateAnimeAttribute } = useAnimeStore();

  if (!question.attribute) {
    return <Text type="secondary">属性キーを設定すると、各アニメの属性を設定できます</Text>;
  }

  return (
    <div className="attribute-form">
      <Text strong style={{ fontSize: '16px', marginBottom: '16px', display: 'block' }}>
        アニメごとの属性設定
      </Text>
      {animes.map(anime => (
        <Card key={anime.id} size="small" style={{ marginBottom: '8px' }}>
          <div style={{ marginBottom: '8px' }}>{anime.title}</div>
          <div className="yes-no-buttons">
            <button
              type="button"
              onClick={() => updateAnimeAttribute(anime.id, question.attribute, true)}
              style={{
                padding: '4px 15px',
                border: '1px solid #d9d9d9',
                borderRadius: '2px',
                backgroundColor: anime.attributes[question.attribute] === true ? '#1890ff' : '#fff',
                color:
                  anime.attributes[question.attribute] === true ? '#fff' : 'rgba(0, 0, 0, 0.85)',
                cursor: 'pointer',
              }}
            >
              はい
            </button>
            <button
              type="button"
              onClick={() => updateAnimeAttribute(anime.id, question.attribute, false)}
              style={{
                padding: '4px 15px',
                border: '1px solid #d9d9d9',
                borderRadius: '2px',
                backgroundColor:
                  anime.attributes[question.attribute] === false ? '#1890ff' : '#fff',
                color:
                  anime.attributes[question.attribute] === false ? '#fff' : 'rgba(0, 0, 0, 0.85)',
                cursor: 'pointer',
              }}
            >
              いいえ
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};
