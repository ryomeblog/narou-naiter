import { Layout, Tabs } from 'antd';
import React, { useState } from 'react';
import { AnimeEditor } from './components/anime/AnimeEditor';
import { QuestionEditor } from './components/question/QuestionEditor';
import { JsonPreview } from './components/shared/JsonPreview';
import { Toolbar } from './components/shared/Toolbar';

const { Content } = Layout;

export const App = () => {
  const [activeTab, setActiveTab] = useState('anime');

  const items = [
    {
      key: 'anime',
      label: 'アニメ',
      children: <AnimeEditor />,
    },
    {
      key: 'question',
      label: '質問',
      children: <QuestionEditor />,
    },
  ];

  return (
    <Layout className="app">
      <Toolbar />
      <Content className="main-content">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          style={{ width: '100%' }}
        />
      </Content>
      <JsonPreview />
    </Layout>
  );
};
