import { LoadingOutlined } from '@ant-design/icons';
import { Image, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

export const ImagePreview = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (url) {
      setLoading(true);
      setError(false);
      setImageUrl(url);
    } else {
      setImageUrl('');
      setLoading(false);
    }
  }, [url]);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (!imageUrl) {
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
          src={imageUrl}
          alt="アニメ画像"
          style={{
            display: loading ? 'none' : 'block',
          }}
          width={200}
          height={300}
          preview={{
            src: imageUrl,
            mask: '画像を拡大',
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};
