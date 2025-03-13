import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, InputNumber, Space } from 'antd';
import React, { useEffect } from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { useQuestionStore } from '../../store/questionStore';
import { AnimeAttributes } from './AnimeAttributes';

export const QuestionForm = ({ question }) => {
  const { addQuestion, updateQuestion, deleteQuestion, setSelectedQuestion, saveQuestions } =
    useQuestionStore();
  const animes = useAnimeStore(state => state.animes);
  const [form] = Form.useForm();

  const handleSubmit = values => {
    const oldAttribute = question.attribute;
    const updatedQuestion = {
      ...question,
      ...values,
    };

    // 新規作成時
    if (!question.id) {
      addQuestion(updatedQuestion);
    } else {
      // 更新時
      updateQuestion(updatedQuestion, oldAttribute);
    }
    setSelectedQuestion(updatedQuestion);
    saveQuestions();
  };

  const handleDelete = () => {
    deleteQuestion(question.id);
    setSelectedQuestion(null);
  };

  useEffect(() => {
    form.setFieldsValue({
      text: question.text,
      attribute: question.attribute,
      weight: question.weight,
    });
  }, [question, form]);

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} className="edit-form">
      <Card
        title={question.id ? '質問を編集' : '新規質問を作成'}
        extra={
          question.id && (
            <Button type="text" danger icon={<DeleteOutlined />} onClick={handleDelete}>
              削除
            </Button>
          )
        }
      >
        <div style={{ padding: '16px' }}>
          <Form.Item
            name="text"
            label="質問文"
            rules={[{ required: true, message: '質問文を入力してください' }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item
            name="attribute"
            label="属性キー"
            rules={[
              { required: true, message: '属性キーを入力してください' },
              {
                pattern: /^[a-z_]+$/,
                message: '半角小文字とアンダースコアのみ使用可能です',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="weight"
            label="重み"
            rules={[{ required: true, message: '重みを入力してください' }]}
          >
            <InputNumber min={1} max={10} style={{ width: '100%' }} />
          </Form.Item>

          <AnimeAttributes question={question} animes={animes} />

          <Form.Item className="form-actions">
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Card>
    </Form>
  );
};
