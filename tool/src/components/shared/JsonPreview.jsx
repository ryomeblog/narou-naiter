import { Typography } from 'antd';
import React, { useMemo } from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { useQuestionStore } from '../../store/questionStore';

const { Text } = Typography;

export const JsonPreview = () => {
  const animes = useAnimeStore(state => state.animes);
  const questions = useQuestionStore(state => state.questions);

  const jsonContent = useMemo(() => {
    const data = {
      animes,
      questions,
    };
    return JSON.stringify(data, null, 2);
  }, [animes, questions]);

  return (
    <div className="preview-panel">
      <Text type="secondary" style={{ marginBottom: '8px', display: 'block' }}>
        JSONプレビュー
      </Text>
      <pre style={{ margin: 0, fontSize: '12px' }}>
        <code>{jsonContent}</code>
      </pre>
    </div>
  );
};
