import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, List } from 'antd';
import React, { useEffect } from 'react';
import { useQuestionStore } from '../../store/questionStore';
import { QuestionForm } from './QuestionForm';

const { Search } = Input;

export const QuestionEditor = () => {
  const { questions, selectedQuestion, setSelectedQuestion, initialize } = useQuestionStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleAdd = () => {
    setSelectedQuestion({
      id: `${Date.now()}`,
      text: '',
      attribute: '',
      weight: 1,
    });
  };

  return (
    <div className="main-content">
      <div className="list-panel">
        <div className="search-box">
          <Search placeholder="質問を検索" />
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
          dataSource={questions}
          renderItem={question => (
            <List.Item
              onClick={() => setSelectedQuestion(question)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedQuestion?.id === question.id ? '#e6f7ff' : 'transparent',
                padding: '8px 16px',
              }}
            >
              {question.text || '(無題)'}
            </List.Item>
          )}
        />
      </div>
      <div className="edit-panel">
        {selectedQuestion && <QuestionForm question={selectedQuestion} />}
      </div>
    </div>
  );
};
