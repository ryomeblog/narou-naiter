import { Card, Typography } from 'antd';
import React from 'react';
import { useAnimeStore } from '../../store/animeStore';

const { Text } = Typography;

export const AttributeForm = ({ anime, questions, onChange }) => {
  const { updateAnimeAttribute } = useAnimeStore();

  const handleAttributeChange = (attribute, value) => {
    updateAnimeAttribute(anime.id, attribute, value);
    onChange({
      ...anime.attributes,
      [attribute]: value,
    });
  };

  return (
    <div className="attribute-form">
      <Text strong style={{ fontSize: '16px', marginBottom: '16px', display: 'block' }}>
        属性設定
      </Text>
      {questions.map(question => (
        <Card key={question.id} size="small" style={{ marginBottom: '8px' }}>
          <div style={{ marginBottom: '8px' }}>{question.text}</div>
          <div className="yes-no-buttons">
            <button
              type="button"
              onClick={() => handleAttributeChange(question.attribute, true)}
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
              onClick={() => handleAttributeChange(question.attribute, false)}
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
