"use client";

import React from 'react';
import { useThemeStyles } from '@/theme/utils';
import { Button } from './Button';
import { Card } from './Card';
import { Typography } from './Typography';
import { Container } from './Container';

export const ThemeDemo = () => {
  const styles = useThemeStyles();
  
  return (
    <Container maxWidth="lg">
      <div style={{ marginBottom: styles.spacing('lg') }}>
        <Typography variant="h1">テーマ設定のデモ</Typography>
        <Typography variant="body1">テーマが正しく適用されているかを確認するためのデモページです。</Typography>
      </div>
      
      <div style={{ display: 'flex', gap: styles.spacing('md'), flexWrap: 'wrap', marginBottom: styles.spacing('lg') }}>
        <Button variant="primary">プライマリボタン</Button>
        <Button variant="secondary">セカンダリボタン</Button>
        <Button variant="accent">アクセントボタン</Button>
      </div>
      
      <div style={{ display: 'flex', gap: styles.spacing('lg'), flexWrap: 'wrap' }}>
        <Card elevation="sm">
          <Typography variant="h3">カード (Shadow: Small)</Typography>
          <Typography variant="body1">テーマから適用されたスタイルによるカードコンポーネントです。</Typography>
        </Card>
        
        <Card elevation="md">
          <Typography variant="h3">カード (Shadow: Medium)</Typography>
          <Typography variant="body1">テーマから適用されたスタイルによるカードコンポーネントです。</Typography>
        </Card>
        
        <Card elevation="lg">
          <Typography variant="h3">カード (Shadow: Large)</Typography>
          <Typography variant="body1">テーマから適用されたスタイルによるカードコンポーネントです。</Typography>
        </Card>
      </div>
      
      <div style={{ marginTop: styles.spacing('xl') }}>
        <Typography variant="h2">タイポグラフィサンプル</Typography>
        <Typography variant="h1">見出し 1</Typography>
        <Typography variant="h2">見出し 2</Typography>
        <Typography variant="h3">見出し 3</Typography>
        <Typography variant="h4">見出し 4</Typography>
        <Typography variant="h5">見出し 5</Typography>
        <Typography variant="h6">見出し 6</Typography>
        <Typography variant="body1">本文 1: 標準的な本文テキストです。</Typography>
        <Typography variant="body2">本文 2: 少し小さめのテキストです。</Typography>
        <Typography variant="caption">キャプション: 補足情報などに使用します。</Typography>
      </div>
    </Container>
  );
}; 