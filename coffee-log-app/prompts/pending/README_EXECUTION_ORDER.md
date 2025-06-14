# 未実行プロンプトの安全な実行順序

## ⚠️ 重要な注意事項

このディレクトリ内のプロンプトは、現在のコードベース（Next.js 14.1.3、既存のコンポーネント構造）に合わせて修正済みです。

## 📋 推奨実行順序

### 1. 基盤機能（最優先実行）
```
06_adsense_foundation.md
```
- **重要**: 一度実行されたがロールバックされたため、pendingに移動済み
- 環境変数の新規追加（既存設定への影響なし）
- 新規ディレクトリ・コンポーネントの作成のみ
- 現在のコードベースに合わせて修正済み

### 2. プライバシー対応（比較的安全）
```
07_privacy_policy.md
```
- 06の基盤機能が前提条件
- 新規コンポーネントの追加のみ
- 既存コードへの影響が最小限

### 3. 段階的実装（慎重に実行）
```
08_ad_placement.md
```
- 既存のページ構造を保持しながら広告を追加
- コンポーネント名が現在の実装に合わせて修正済み

### 4. 高度な機能（最も慎重に）
```
09_revenue_optimization.md
10_final_setup.md
```
- layout.tsxの段階的更新が含まれる
- 既存のテーマシステムとの統合が必要

### 5. ドキュメント（安全）
```
11_adsense_account_setup.md
```
- ドキュメントのみなので安全

## 🔍 実行前チェックリスト

### 各プロンプト実行前に確認すること

1. **現在のコンポーネント構造確認**
   ```bash
   ls -la src/components/
   ls -la src/hooks/
   ```

2. **環境変数の競合チェック**
   ```bash
   cat .env.local  # 存在する場合
   ```

3. **06実行前の特別確認**
   ```bash
   # AdSense関連ディレクトリが既に存在しないか確認
   ls -la src/components/ads/ || echo "ads ディレクトリは存在しません（正常）"
   
   # config ディレクトリが存在しないか確認
   ls -la src/config/ || echo "config ディレクトリは存在しません（正常）"
   ```

4. **依存関係の確認**
   ```bash
   cat package.json
   ```

5. **現在のlayout.tsxの状態確認**
   ```bash
   cat src/app/layout.tsx
   ```

## 🚨 修正済みの主な変更点

### 2025年1月時点での実装状況更新

#### 既に実装済みの機能
- **CoffeeFilter統合**: コーヒー一覧ページに絞り込み機能が統合済み
- **ProfileForm統合**: プロフィールページに編集機能が統合済み
- **認証状態管理**: ホームページで動的認証チェック実装済み
- **セキュリティ強化**: 編集ページで認証・認可チェック追加済み
- **スタイリング統一**: カスタムテーマシステムに統一済み

#### 06_adsense_foundation.md
- **ロールバック後の再配置**: executed → pending に移動
- **Next.js 14.1.3対応**: 現在のバージョンに合わせて調整
- **カスタムテーマ対応**: Tailwind CSS → CSSカスタムプロパティに変更
- **段階的layout更新**: 既存のテーマシステムを保持しながら機能追加

#### 08_ad_placement.md
- **CoffeeFilter統合済み**: プロンプト内のコード例を現在の実装に合わせて更新
- **フィルター機能**: 既存の絞り込み機能を保持しながら広告統合
- **認証チェック**: 編集ページの認証・認可強化を反映

#### 10_final_setup.md
- **layout.tsx段階的更新**: 既存の認証状態管理とテーマシステムを保持
- **Header構造保持**: 認証状態管理付きのHeader構造を維持

### layout.tsx（全プロンプト共通）
- 既存のテーマシステムを保持
- 段階的な機能追加アプローチに変更
- Next.js 14.1.3の形式に合わせて調整
- 認証状態管理機能を保持

### コンポーネント参照（後続プロンプト）
- `CoffeeDetailCard` → `CoffeeDetailTasteChart`
- `TasteProfileDisplay` → 既存の実装に合わせて調整
- Tailwind CSS → カスタムテーマシステムのスタイル形式に変更

### import文
- 現在のプロジェクト構造に合わせて調整
- 既存のコンポーネント名を使用
- 統合済み機能の参照を正確に反映

## 💡 安全な実装のためのヒント

1. **バックアップの作成**
   ```bash
   git add .
   git commit -m "プロンプト実行前のバックアップ"
   ```

2. **段階的な実行**
   - 一度に複数のプロンプトを実行しない
   - 各プロンプト実行後に動作確認

3. **競合の早期発見**
   - 実行後にlintエラーをチェック
   - 開発サーバーの起動確認

4. **ロールバック準備**
   - 問題が発生した場合は即座にgit resetを実行
   - 各段階でコミットを作成

## 📞 問題が発生した場合

1. **即座に実行を停止**
2. **git reset --hard HEAD~1** でロールバック
3. **エラーログを確認**
4. **プロンプトの内容を再確認**

---

**最終更新**: 2025年5月27日
**対象コードベース**: Next.js 14.1.3, 現在のコンポーネント構造 