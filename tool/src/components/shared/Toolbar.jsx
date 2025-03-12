import { ExportOutlined, ImportOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, message, Space } from 'antd';
import React from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { useQuestionStore } from '../../store/questionStore';

export const Toolbar = () => {
  const { saveAnimes, exportAnimes, importAnimes } = useAnimeStore();
  const { saveQuestions, exportQuestions, importQuestions } = useQuestionStore();

  const handleSave = async () => {
    const animesSaved = await saveAnimes();
    const questionsSaved = await saveQuestions();

    if (animesSaved && questionsSaved) {
      message.success('データを保存しました');
    } else {
      message.error('データの保存に失敗しました');
    }
  };

  const handleExport = async () => {
    const animesExported = await exportAnimes();
    const questionsExported = await exportQuestions();

    if (animesExported && questionsExported) {
      message.success('データをエクスポートしました');
    } else {
      message.error('データのエクスポートに失敗しました');
    }
  };

  const handleImport = async () => {
    const animesImported = await importAnimes();
    const questionsImported = await importQuestions();

    if (animesImported && questionsImported) {
      message.success('データをインポートしました');
    } else {
      message.error('データのインポートに失敗しました');
    }
  };

  return (
    <div className="toolbar">
      <Space>
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
          保存
        </Button>
        <Button icon={<ImportOutlined />} onClick={handleImport}>
          インポート
        </Button>
        <Button icon={<ExportOutlined />} onClick={handleExport}>
          エクスポート
        </Button>
      </Space>
    </div>
  );
};
