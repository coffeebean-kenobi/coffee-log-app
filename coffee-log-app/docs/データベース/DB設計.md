# データベース設計

## データベース概要

Coffee Log AppはSupabase上のPostgreSQLデータベースを使用しています。データモデルはコーヒーログの管理とユーザー情報の保存を中心に設計されています。

## ER図

```
┌───────────────┐       ┌───────────────┐
│               │       │               │
│   profiles    │       │ coffee_records │
│               │◄──────┼───────────────┤
│               │  1:N  │               │
└───────────────┘       └───────────────┘
```

## テーブル定義

### profiles テーブル

ユーザー情報を管理するテーブル。Supabase Authと連携。

| カラム名         | データ型        | 制約                     | 説明                      |
|----------------|---------------|--------------------------|--------------------------|
| id             | uuid          | PRIMARY KEY, NOT NULL    | ユーザーID (Supabase Auth ID) |
| username       | varchar(255)  | UNIQUE                   | ユーザー名                 |
| display_name   | varchar(100)  |                          | 表示名                    |
| bio            | text          |                          | 自己紹介文                 |
| avatar_url     | text          |                          | プロフィール画像URL          |
| created_at     | timestamptz   | NOT NULL, DEFAULT now()  | 作成日時                   |
| updated_at     | timestamptz   | NOT NULL, DEFAULT now()  | 更新日時                   |

### coffee_records テーブル

コーヒー記録の情報を管理するテーブル。

| カラム名            | データ型        | 制約                     | 説明                      |
|-------------------|---------------|--------------------------|--------------------------|
| id                | uuid          | PRIMARY KEY, DEFAULT uuid_generate_v4() | レコードID |
| user_id           | uuid          | NOT NULL, REFERENCES profiles(id) | ユーザーID          |
| shop_name         | varchar(255)  | NOT NULL                 | ショップ・カフェ名           |
| coffee_name       | varchar(255)  |                          | コーヒー名                 |
| country           | varchar(100)  |                          | 原産国                    |
| region            | varchar(100)  |                          | 地域                      |
| farm              | varchar(100)  |                          | 農園名                    |
| processing_method | varchar(50)   |                          | 精製方法                   |
| roast_level       | roast_level   |                          | 焙煎度 (enum値)           |
| rating            | int           | CHECK (rating BETWEEN 1 AND 5) | 総合評価 (1-5)     |
| description       | text          |                          | 説明・メモ                 |
| consumed_at       | timestamptz   |                          | 消費日時                   |
| acidity           | int           | CHECK (acidity BETWEEN 1 AND 5) | 酸味 (1-5)         |
| flavor            | int           | CHECK (flavor BETWEEN 1 AND 5) | 風味 (1-5)          |
| sweetness         | int           | CHECK (sweetness BETWEEN 1 AND 5) | 甘味 (1-5)        |
| mouthfeel         | int           | CHECK (mouthfeel BETWEEN 1 AND 5) | 口当たり (1-5)     |
| body              | int           | CHECK (body BETWEEN 1 AND 5) | ボディ (1-5)           |
| clean_cup         | int           | CHECK (clean_cup BETWEEN 1 AND 5) | クリーンカップ (1-5) |
| balance           | int           | CHECK (balance BETWEEN 1 AND 5) | バランス (1-5)       |
| created_at        | timestamptz   | NOT NULL, DEFAULT now()  | 作成日時                   |
| updated_at        | timestamptz   | NOT NULL, DEFAULT now()  | 更新日時                   |

## Enum定義

### roast_level

焙煎度を表すEnumです。

| 値            | 説明       |
|--------------|-----------|
| light        | ライトロースト |
| medium       | ミディアムロースト |
| medium-dark  | ミディアムダークロースト |
| dark         | ダークロースト |

## インデックス

| テーブル名     | インデックス名       | カラム                  | 種類       | 説明                      |
|--------------|-------------------|------------------------|-----------|--------------------------|
| profiles     | profiles_username_idx | username             | BTREE     | ユーザー名による検索用       |
| coffee_records | coffee_records_user_id_idx | user_id        | BTREE     | ユーザーIDによる検索用        |
| coffee_records | coffee_records_shop_name_idx | shop_name    | BTREE     | ショップ名による検索用         |
| coffee_records | coffee_records_consumed_at_idx | consumed_at | BTREE     | 消費日時による並び替え用      |

## Row Level Security (RLS) ポリシー

### profiles テーブル

```sql
-- ユーザーは自分自身のプロフィールのみ表示可能
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- ユーザーは自分自身のプロフィールのみ更新可能
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- ユーザーは自分自身のプロフィールのみ作成可能
CREATE POLICY "Users can create their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### coffee_records テーブル

```sql
-- ユーザーは自分のコーヒーレコードのみ表示可能
CREATE POLICY "Users can view their own coffee records"
  ON coffee_records
  FOR SELECT
  USING (auth.uid() = user_id);

-- ユーザーは自分のコーヒーレコードのみ作成可能
CREATE POLICY "Users can create their own coffee records"
  ON coffee_records
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ユーザーは自分のコーヒーレコードのみ更新可能
CREATE POLICY "Users can update their own coffee records"
  ON coffee_records
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ユーザーは自分のコーヒーレコードのみ削除可能
CREATE POLICY "Users can delete their own coffee records"
  ON coffee_records
  FOR DELETE
  USING (auth.uid() = user_id);
```

## 実装状況メモ

### 完了している機能
- ユーザープロフィール管理（profiles テーブル）
- コーヒー記録のCRUD操作（coffee_records テーブル）
- テイスティング評価機能（acidity, flavor, sweetness, mouthfeel, body, clean_cup, balance）
- 認証・認可機能（Supabase Auth + RLS）

### 今後実装予定の機能
- 画像アップロード機能（Supabase Storage連携）
- データ分析・可視化機能（Chart.js活用）
- ソーシャル機能（レコード共有、レコメンデーション）

## データ移行・バックアップ戦略

1. **定期バックアップ**:
   - Supabaseの自動バックアップ機能を利用
   - 週次フルバックアップ
   - 日次増分バックアップ

2. **環境間データ移行**:
   - 開発環境からステージング環境へのデータ移行スクリプト
   - 本番環境へのデータ移行プロセス

3. **ディザスタリカバリ**:
   - Supabase提供のPITR (Point-in-Time Recovery)の設定
   - リージョン間バックアップ（将来的な実装）

4. **データ保持ポリシー**:
   - ユーザーデータ: 削除リクエストから30日後に完全削除
   - バックアップデータ: 90日間保持 