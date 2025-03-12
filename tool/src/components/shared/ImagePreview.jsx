import { LoadingOutlined } from '@ant-design/icons';
import { Image, Spin } from 'antd';
import React, { useState } from 'react';

export const ImagePreview = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (!url) {
    return null;
  }

  return (
    <div className="image-preview">
      {loading && (
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      )}
      {error ? (
        <div style={{ padding: '16px', textAlign: 'center', color: '#ff4d4f' }}>
          画像の読み込みに失敗しました
        </div>
      ) : (
        <Image
          src={url}
          alt="アニメ画像"
          style={{ display: loading ? 'none' : 'block' }}
          onLoad={handleLoad}
          onError={handleError}
          preview={!error}
        />
      )}
    </div>
  );
};
