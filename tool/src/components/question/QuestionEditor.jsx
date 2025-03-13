import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, List } from 'antd';
import React, { useEffect } from 'react';
import { useQuestionStore } from '../../store/questionStore';
import { QuestionForm } from './QuestionForm';

const { Search } = Input;

export const QuestionEditor = () => {
  const {
    filteredQuestions,
    selectedQuestion,
    setSelectedQuestion,
    setSearchQuery,
    addQuestion,
    initialize,
  } = useQuestionStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleAdd = () => {
    const newQuestion = {
      id: `${Date.now()}`,
      text: '',
      attribute: '',
      weight: 1,
    };

    addQuestion(newQuestion);
    setSelectedQuestion(newQuestion);
    // フォームを表示するために選択状態にする
  };

  const handleSearch = value => {
    setSearchQuery(value);
  };

  return (
    <div className="main-content">
      <div className="list-panel">
        <div className="search-box">
          <Search
            placeholder="質問を検索"
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
            dataSource={filteredQuestions}
            size="small"
            style={{
              height: '100%',
              overflow: 'auto',
              padding: '16px',
              marginBottom: '45px',
            }}
            renderItem={question => (
              <List.Item
                onClick={() => setSelectedQuestion(question)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedQuestion?.id === question.id ? '#e6f7ff' : 'transparent',
                  padding: '8px 16px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              >
                {question.text || '(無題)'}
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className="edit-panel">
        {selectedQuestion && <QuestionForm question={selectedQuestion} />}
      </div>
    </div>
  );
};
