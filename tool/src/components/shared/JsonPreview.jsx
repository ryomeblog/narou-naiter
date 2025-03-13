import { CopyOutlined } from '@ant-design/icons';
import { Button, Typography, message } from 'antd';
import React, { useMemo } from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { useQuestionStore } from '../../store/questionStore';

const { Text, Title } = Typography;

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonContent);
      message.success('JSONをクリップボードにコピーしました');
    } catch (err) {
      message.error('コピーに失敗しました');
    }
  };

  return (
    <div className="preview-panel">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          JSONプレビュー
        </Title>
        <Button icon={<CopyOutlined />} onClick={handleCopy} type="text" size="small">
          コピー
        </Button>
      </div>
      <pre
        style={{
          margin: 0,
          fontSize: '12px',
          background: '#f5f5f5',
          padding: '8px',
        }}
      >
        <code style={{ whiteSpace: 'pre-wrap' }}>{jsonContent}</code>
      </pre>
    </div>
  );
};
