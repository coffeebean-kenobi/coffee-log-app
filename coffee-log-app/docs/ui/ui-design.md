# UI設計

## デザインシステム

Coffee Log Appは一貫したユーザーエクスペリエンスを提供するために、以下のデザインシステムを採用しています。

### カラーパレット

```
┌─────────────────────────────────────────────────────────────────┐
│ プライマリーカラー                                                │
├──────────────┬──────────────┬──────────────┬──────────────┬─────┘
│ コーヒーブラウン │ #6F4E37     │ ダークブラウン  │ #3A2F28     │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ キャラメル     │ #C68F59     │ ライトブラウン  │ #DDB892     │
└──────────────┴──────────────┴──────────────┴──────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ アクセントカラー                                                 │
├──────────────┬──────────────┬──────────────┬──────────────┬─────┘
│ コーヒーレッド  │ #8B4513     │ ベージュ      │ #F5F5DC     │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ セージグリーン │ #9CAF88     │ スレートグレー │ #708090     │
└──────────────┴──────────────┴──────────────┴──────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ ユーティリティカラー                                              │
├──────────────┬──────────────┬──────────────┬──────────────┬─────┘
│ ブラック      │ #202020     │ ダークグレー  │ #333333     │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ グレー       │ #5A5A5A     │ ライトグレー  │ #E0E0E0     │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ ホワイト      │ #FFFFFF     │ アイボリー    │ #FFFFF0     │
└──────────────┴──────────────┴──────────────┴──────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ フィードバックカラー                                              │
├──────────────┬──────────────┬──────────────┬──────────────┬─────┘
│ サクセス      │ #4CAF50     │ エラー       │ #F44336     │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ ワーニング    │ #FF9800     │ インフォ     │ #2196F3     │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### タイポグラフィ

```
┌─────────────────────────────────────────────────────────────────┐
│ フォントファミリー                                               │
├──────────────────┬──────────────────────────────────────────────┘
│ 見出し           │ Geist, sans-serif                            │
├──────────────────┼──────────────────────────────────────────────┤
│ 本文            │ Geist, sans-serif                            │
└──────────────────┴──────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ フォントサイズ                                                  │
├──────────────────┬──────────────────────────────────────────────┘
│ H1              │ 2.5rem (40px)                                │
├──────────────────┼──────────────────────────────────────────────┤
│ H2              │ 2rem (32px)                                  │
├──────────────────┼──────────────────────────────────────────────┤
│ H3              │ 1.75rem (28px)                               │
├──────────────────┼──────────────────────────────────────────────┤
│ H4              │ 1.5rem (24px)                                │
├──────────────────┼──────────────────────────────────────────────┤
│ 本文 (大)        │ 1.125rem (18px)                              │
├──────────────────┼──────────────────────────────────────────────┤
│ 本文 (標準)      │ 1rem (16px)                                  │
├──────────────────┼──────────────────────────────────────────────┤
│ 本文 (小)        │ 0.875rem (14px)                              │
├──────────────────┼──────────────────────────────────────────────┤
│ キャプション      │ 0.75rem (12px)                               │
└──────────────────┴──────────────────────────────────────────────┘
```

### スペーシング

```
┌─────────────────────────────────────────────────────────────────┐
│ スペーシングシステム (Tailwind CSS)                              │
├──────────────────┬──────────────────────────────────────────────┘
│ xs              │ 0.25rem (4px)                                │
├──────────────────┼──────────────────────────────────────────────┤
│ sm              │ 0.5rem (8px)                                 │
├──────────────────┼──────────────────────────────────────────────┤
│ md              │ 1rem (16px)                                  │
├──────────────────┼──────────────────────────────────────────────┤
│ lg              │ 1.5rem (24px)                                │
├──────────────────┼──────────────────────────────────────────────┤
│ xl              │ 2rem (32px)                                  │
├──────────────────┼──────────────────────────────────────────────┤
│ 2xl             │ 3rem (48px)                                  │
└──────────────────┴──────────────────────────────────────────────┘
```

### シャドウ

```
┌─────────────────────────────────────────────────────────────────┐
│ シャドウ                                                        │
├──────────────────┬──────────────────────────────────────────────┘
│ sm              │ 0 1px 2px rgba(0, 0, 0, 0.05)                │
├──────────────────┼──────────────────────────────────────────────┤
│ md              │ 0 4px 6px -1px rgba(0, 0, 0, 0.1)           │
├──────────────────┼──────────────────────────────────────────────┤
│ lg              │ 0 10px 15px -3px rgba(0, 0, 0, 0.1)         │
├──────────────────┼──────────────────────────────────────────────┤
│ xl              │ 0 20px 25px -5px rgba(0, 0, 0, 0.1)         │
└──────────────────┴──────────────────────────────────────────────┘
```

### 境界線

```
┌─────────────────────────────────────────────────────────────────┐
│ 境界線                                                          │
├──────────────────┬──────────────────────────────────────────────┘
│ 細               │ 1px solid                                    │
├──────────────────┼──────────────────────────────────────────────┤
│ 標準             │ 2px solid                                    │
├──────────────────┼──────────────────────────────────────────────┤
│ 太               │ 4px solid                                    │
├──────────────────┼──────────────────────────────────────────────┤
│ 角丸 (sm)        │ border-radius: 0.25rem (4px)                │
├──────────────────┼──────────────────────────────────────────────┤
│ 角丸 (md)        │ border-radius: 0.5rem (8px)                 │
├──────────────────┼──────────────────────────────────────────────┤
│ 角丸 (lg)        │ border-radius: 1rem (16px)                  │
├──────────────────┼──────────────────────────────────────────────┤
│ 角丸 (丸)        │ border-radius: 9999px                       │
└──────────────────┴──────────────────────────────────────────────┘
```

## コンポーネントライブラリ

Coffee Log Appは以下のUIコンポーネントを使用して構築されています。

### 基本コンポーネント

#### ボタン

```
┌────────────────────────────────────────────────────────────────┐
│ ボタンバリエーション                                            │
├──────────────────┬─────────────────────────────────────────────┘
│ プライマリ        │ 塗りつぶし、プライマリカラー                 │
├──────────────────┼─────────────────────────────────────────────┤
│ セカンダリ        │ アウトライン、プライマリカラー               │
├──────────────────┼─────────────────────────────────────────────┤
│ テキスト          │ 背景なし、アンダーライン                    │
├──────────────────┼─────────────────────────────────────────────┤
│ アイコン          │ アイコンのみ、または、アイコン+テキスト      │
└──────────────────┴─────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ボタンサイズ                                                   │
├──────────────────┬─────────────────────────────────────────────┘
│ 小               │ padding: 0.5rem 1rem, text-sm              │
├──────────────────┼─────────────────────────────────────────────┤
│ 中               │ padding: 0.75rem 1.5rem, text-base         │
├──────────────────┼─────────────────────────────────────────────┤
│ 大               │ padding: 1rem 2rem, text-lg                │
└──────────────────┴─────────────────────────────────────────────┘
```

#### 入力フィールド

```
┌────────────────────────────────────────────────────────────────┐
│ 入力フィールドタイプ                                            │
├──────────────────┬─────────────────────────────────────────────┘
│ テキスト          │ 一行テキスト入力                            │
├──────────────────┼─────────────────────────────────────────────┤
│ テキストエリア    │ 複数行テキスト入力                          │
├──────────────────┼─────────────────────────────────────────────┤
│ セレクト          │ ドロップダウン選択                          │
├──────────────────┼─────────────────────────────────────────────┤
│ ラジオボタン      │ 単一選択                                   │
├──────────────────┼─────────────────────────────────────────────┤
│ チェックボックス   │ 複数選択                                   │
├──────────────────┼─────────────────────────────────────────────┤
│ 日付ピッカー      │ 日付選択                                   │
├──────────────────┼─────────────────────────────────────────────┤
│ スライダー        │ 数値範囲選択                               │
├──────────────────┼─────────────────────────────────────────────┤
│ レーティング      │ 評価入力（星評価）                          │
└──────────────────┴─────────────────────────────────────────────┘
```

#### カード

```
┌────────────────────────────────────────────────────────────────┐
│ カードコンポーネント                                            │
├──────────────────┬─────────────────────────────────────────────┘
│ 標準カード        │ タイトル、内容、アクション                   │
├──────────────────┼─────────────────────────────────────────────┤
│ 画像カード        │ 画像、タイトル、内容                        │
├──────────────────┼─────────────────────────────────────────────┤
│ リストカード      │ リスト形式の情報表示                        │
└──────────────────┴─────────────────────────────────────────────┘
```

### 複合コンポーネント

#### ナビゲーション

```
┌────────────────────────────────────────────────────────────────┐
│ ナビゲーション                                                 │
├──────────────────┬─────────────────────────────────────────────┘
│ ヘッダー          │ アプリロゴ、メインナビゲーション、ユーザーメニュー │
├──────────────────┼─────────────────────────────────────────────┤
│ サイドバー        │ 詳細なナビゲーションオプション                │
├──────────────────┼─────────────────────────────────────────────┤
│ フッター          │ 著作権情報、リンク                          │
├──────────────────┼─────────────────────────────────────────────┤
│ タブ              │ セクション切り替え                          │
├──────────────────┼─────────────────────────────────────────────┤
│ ブレッドクラム     │ 階層ナビゲーション                          │
└──────────────────┴─────────────────────────────────────────────┘
```

#### フォーム

```
┌────────────────────────────────────────────────────────────────┐
│ フォーム                                                       │
├──────────────────┬─────────────────────────────────────────────┘
│ 入力グループ      │ ラベル、入力フィールド、ヘルプテキスト、エラー表示 │
├──────────────────┼─────────────────────────────────────────────┤
│ フォームセクション │ 関連入力フィールドのグループ                  │
├──────────────────┼─────────────────────────────────────────────┤
│ フォームアクション │ 送信、キャンセルボタン                       │
└──────────────────┴─────────────────────────────────────────────┘
```

#### データ表示

```
┌────────────────────────────────────────────────────────────────┐
│ データ表示                                                     │
├──────────────────┬─────────────────────────────────────────────┘
│ テーブル          │ 行と列の形式でデータ表示                     │
├──────────────────┼─────────────────────────────────────────────┤
│ リスト            │ 垂直方向のリスト表示                        │
├──────────────────┼─────────────────────────────────────────────┤
│ グリッド          │ カードベースのグリッドレイアウト              │
├──────────────────┼─────────────────────────────────────────────┤
│ チャート          │ データの視覚化（棒グラフ、円グラフなど）      │
├──────────────────┼─────────────────────────────────────────────┤
│ スタット          │ キー統計情報の表示                          │
└──────────────────┴─────────────────────────────────────────────┘
```

#### フィードバック

```
┌────────────────────────────────────────────────────────────────┐
│ フィードバック                                                 │
├──────────────────┬─────────────────────────────────────────────┘
│ アラート          │ 情報、警告、エラー、成功メッセージ            │
├──────────────────┼─────────────────────────────────────────────┤
│ トースト          │ 一時的な通知メッセージ                       │
├──────────────────┼─────────────────────────────────────────────┤
│ モーダル          │ オーバーレイウィンドウでの操作                │
├──────────────────┼─────────────────────────────────────────────┤
│ プログレスバー    │ 進行状況の表示                              │
├──────────────────┼─────────────────────────────────────────────┤
│ スケルトンローディング│ コンテンツ読み込み中の表示                │
├──────────────────┼─────────────────────────────────────────────┤
│ エラー状態        │ フォーム検証エラーの表示                     │
└──────────────────┴─────────────────────────────────────────────┘
```

## レスポンシブデザイン

Coffee Log Appは以下のブレイクポイントでレスポンシブデザインを実装しています。

```
┌────────────────────────────────────────────────────────────────┐
│ ブレイクポイント                                               │
├──────────────────┬─────────────────────────────────────────────┘
│ モバイル (sm)     │ 640px以下                                  │
├──────────────────┼─────────────────────────────────────────────┤
│ タブレット (md)   │ 768px以下                                  │
├──────────────────┼─────────────────────────────────────────────┤
│ ラップトップ (lg) │ 1024px以下                                 │
├──────────────────┼─────────────────────────────────────────────┤
│ デスクトップ (xl) │ 1280px以下                                 │
├──────────────────┼─────────────────────────────────────────────┤
│ ワイドスクリーン (2xl)│ 1536px以下                             │
└──────────────────┴─────────────────────────────────────────────┘
```

### レスポンシブレイアウト戦略

- モバイルファーストアプローチ
- Flexboxとグリッドレイアウトの適切な活用
- 画面サイズに応じたフォントサイズの調整
- コンテンツの優先度に基づいた要素の表示/非表示

## アクセシビリティ

以下のアクセシビリティ要件を満たすようUIを設計しています。

- WCAG 2.1 AAレベルへの準拠
- キーボードナビゲーションのサポート
- スクリーンリーダー対応（適切なARIAラベル）
- 十分なコントラスト比
- フォーカス可視化
- 代替テキストの提供

## アニメーションとトランジション

```
┌────────────────────────────────────────────────────────────────┐
│ アニメーション                                                 │
├──────────────────┬─────────────────────────────────────────────┘
│ ホバー効果        │ ボタン、カード、リンクのホバー状態           │
├──────────────────┼─────────────────────────────────────────────┤
│ トランジション    │ ページ間の切り替え、モーダル表示/非表示      │
├──────────────────┼─────────────────────────────────────────────┤
│ ローディング      │ スピナー、スケルトンローディング             │
├──────────────────┼─────────────────────────────────────────────┤
│ マイクロインタラクション│ フォーム送信成功時のアニメーションなど  │
└──────────────────┴─────────────────────────────────────────────┘
``` 