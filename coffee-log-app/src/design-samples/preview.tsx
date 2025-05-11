import React, { useState } from 'react';
import { CardBasedLayout } from './layouts/card-based/layout';
import { ListBasedLayout } from './layouts/list-based/layout';
import { HybridLayout } from './layouts/hybrid/layout';
import { InteractiveLayoutExample } from './interactions/layout-example';
import { ClassicElegantComponents } from './color-typography/classic-elegant/components';
import { ModernMinimalComponents } from './color-typography/modern-minimal/components';
import { NaturalWarmComponents } from './color-typography/natural-warm/components';
import { UrbanIndustrialComponents } from './color-typography/urban-industrial/components';
import { VintageRetroComponents } from './color-typography/vintage-retro/components';
import { IndustrialRefinedComponents } from './color-typography/industrial-refined/components';

const themes = [
  { id: 'classic-elegant', name: 'Classic Elegant', component: ClassicElegantComponents },
  { id: 'modern-minimal', name: 'Modern Minimal', component: ModernMinimalComponents },
  { id: 'natural-warm', name: 'Natural Warm', component: NaturalWarmComponents },
  { id: 'urban-industrial', name: 'Urban Industrial', component: UrbanIndustrialComponents },
  { id: 'vintage-retro', name: 'Vintage Retro', component: VintageRetroComponents },
  { id: 'industrial-refined', name: 'Industrial Refined', component: IndustrialRefinedComponents },
];

export const Preview: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>デザインサンプル</h1>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: selectedTheme.id === theme.id ? '#333' : '#eee',
                color: selectedTheme.id === theme.id ? '#fff' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>
      <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderBottom: '1px solid #eee' }}>
          <h2 style={{ margin: 0 }}>{selectedTheme.name}</h2>
        </div>
        <div>
          <selectedTheme.component />
        </div>
      </div>
    </div>
  );
}; 