import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAnimeStore } from '../../store/animeStore';
import { useQuestionStore } from '../../store/questionStore';
import { ImagePreview } from '../shared/ImagePreview';
import { AttributeForm } from './AttributeForm';

const { TextArea } = Input;

export const AnimeForm = ({ anime }) => {
  const { updateAnime, deleteAnime, setSelectedAnime } = useAnimeStore();
  const questions = useQuestionStore(state => state.questions);
  const [form] = Form.useForm();
  const [currentImageUrl, setCurrentImageUrl] = useState(anime.imageUrl);

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

  const handleImageUrlChange = e => {
    setCurrentImageUrl(e.target.value);
  };

  useEffect(() => {
    form.setFieldsValue({
      title: anime.title,
      imageUrl: anime.imageUrl,
      description: anime.description,
    });
    setCurrentImageUrl(anime.imageUrl);
  }, [anime, form, questions]); // questionsの変更も監視

  // 質問が追加されたときにアニメの属性を更新
  useEffect(() => {
    const updatedAttributes = { ...anime.attributes };
    let hasNewAttribute = false;

    questions.forEach(question => {
      if (!(question.attribute in updatedAttributes)) {
        updatedAttributes[question.attribute] = false;
        hasNewAttribute = true;
      }
    });

    if (hasNewAttribute) {
      updateAnime({ ...anime, attributes: updatedAttributes });
    }
  }, [questions, anime, updateAnime]);

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} className="edit-form">
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
        <div style={{ padding: '16px' }}>
          <Form.Item
            name="title"
            label="タイトル"
            rules={[{ required: true, message: 'タイトルを入力してください' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="imageUrl" label="画像URL">
            <Input
              onChange={handleImageUrlChange}
              onBlur={e => {
                setCurrentImageUrl(e.target.value);
              }}
            />
          </Form.Item>

          <ImagePreview url={currentImageUrl} />

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
              setSelectedAnime(updatedAnime);
            }}
          />

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
