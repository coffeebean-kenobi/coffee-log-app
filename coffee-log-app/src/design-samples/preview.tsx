import React, { useState } from 'react';
import { CardBasedLayout } from './layouts/card-based/layout';
import { ListBasedLayout } from './layouts/list-based/layout';
import { HybridLayout } from './layouts/hybrid/layout';
import { InteractiveLayoutExample } from './interactions/layout-example';

export const Preview = () => {
  const [selectedLayout, setSelectedLayout] = useState<'card' | 'list' | 'hybrid' | 'interactive'>('card');

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        marginBottom: '20px',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
      }}>
        <button
          onClick={() => setSelectedLayout('card')}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedLayout === 'card' ? '#4A5568' : '#E2E8F0',
            color: selectedLayout === 'card' ? 'white' : '#4A5568',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          カードベース
        </button>
        <button
          onClick={() => setSelectedLayout('list')}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedLayout === 'list' ? '#4A5568' : '#E2E8F0',
            color: selectedLayout === 'list' ? 'white' : '#4A5568',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          リストベース
        </button>
        <button
          onClick={() => setSelectedLayout('hybrid')}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedLayout === 'hybrid' ? '#4A5568' : '#E2E8F0',
            color: selectedLayout === 'hybrid' ? 'white' : '#4A5568',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ハイブリッド
        </button>
        <button
          onClick={() => setSelectedLayout('interactive')}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedLayout === 'interactive' ? '#4A5568' : '#E2E8F0',
            color: selectedLayout === 'interactive' ? 'white' : '#4A5568',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          インタラクティブ
        </button>
      </div>

      <div style={{
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        {selectedLayout === 'card' && <CardBasedLayout />}
        {selectedLayout === 'list' && <ListBasedLayout />}
        {selectedLayout === 'hybrid' && <HybridLayout />}
        {selectedLayout === 'interactive' && <InteractiveLayoutExample />}
      </div>
    </div>
  );
}; 