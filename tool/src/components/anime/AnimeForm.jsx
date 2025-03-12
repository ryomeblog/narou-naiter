import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space } from 'antd';
import React from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { useQuestionStore } from '../../store/questionStore';
import { ImagePreview } from '../shared/ImagePreview';
import { AttributeForm } from './AttributeForm';

const { TextArea } = Input;

export const AnimeForm = ({ anime }) => {
  const { updateAnime, deleteAnime, setSelectedAnime } = useAnimeStore();
  const questions = useQuestionStore(state => state.questions);
  const [form] = Form.useForm();

  const handleSubmit = values => {
    const updatedAnime = {
      ...anime,
      ...values,
    };
    updateAnime(updatedAnime);
    setSelectedAnime(updatedAnime);
  };

  const handleDelete = () => {
    deleteAnime(anime.id);
    setSelectedAnime(null);
  };

  const initialValues = {
    title: anime.title,
    imageUrl: anime.imageUrl,
    description: anime.description,
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={initialValues}>
      <Card
        title={anime.id ? 'アニメを編集' : '新規アニメを作成'}
        extra={
          anime.id && (
            <Button type="text" danger icon={<DeleteOutlined />} onClick={handleDelete}>
              削除
            </Button>
          )
        }
      >
        <Form.Item
          name="title"
          label="タイトル"
          rules={[{ required: true, message: 'タイトルを入力してください' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="imageUrl" label="画像URL">
          <Input />
        </Form.Item>

        <ImagePreview url={form.getFieldValue('imageUrl')} />

        <Form.Item name="description" label="説明">
          <TextArea rows={4} />
        </Form.Item>

        <AttributeForm
          anime={anime}
          questions={questions}
          onChange={values => {
            const updatedAnime = {
              ...anime,
              attributes: values,
            };
            updateAnime(updatedAnime);
          }}
        />

        <Form.Item className="form-actions">
          <Space>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Space>
        </Form.Item>
      </Card>
    </Form>
  );
};
