# データベース設計

## データベース概要

Coffee Log AppはSupabase上のPostgreSQLデータベースを使用しています。データモデルはコーヒーログの管理とユーザー情報の保存を中心に設計されています。

## ER図

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│               │       │               │       │               │
│     users     │       │    coffees    │       │   tasting     │
│               │◄──────┼───────────────┼──────►│    notes      │
│               │  1:N  │               │  1:N  │               │
└───────────────┘       └───────────────┘       └───────────────┘
                               ▲
                               │
                               │
                        ┌──────┴────────┐
                        │               │
                        │   coffee      │
                        │   images      │
                        │               │
                        └───────────────┘
```

## テーブル定義

### users テーブル

ユーザー情報を管理するテーブル。Supabase Authと連携。

| カラム名         | データ型        | 制約                     | 説明                      |
|----------------|---------------|--------------------------|--------------------------|
| id             | uuid          | PRIMARY KEY, NOT NULL    | ユーザーID (Supabase Auth ID) |
| email          | varchar(255)  | NOT NULL, UNIQUE         | メールアドレス              |
| display_name   | varchar(100)  | NOT NULL                 | 表示名                    |
| avatar_url     | text          |                          | プロフィール画像URL          |
| bio            | text          |                          | 自己紹介文                  |
| created_at     | timestamptz   | NOT NULL, DEFAULT now()  | 作成日時                   |
| updated_at     | timestamptz   | NOT NULL, DEFAULT now()  | 更新日時                   |

### coffees テーブル

コーヒーの基本情報を管理するテーブル。

| カラム名         | データ型        | 制約                     | 説明                      |
|----------------|---------------|--------------------------|--------------------------|
| id             | uuid          | PRIMARY KEY, DEFAULT uuid_generate_v4() | コーヒーID |
| user_id        | uuid          | NOT NULL, REFERENCES users(id) | ユーザーID          |
| name           | varchar(100)  | NOT NULL                 | コーヒー名                  |
| origin         | varchar(100)  |                          | 原産地                    |
| farm           | varchar(100)  |                          | 農園名                    |
| variety        | varchar(100)  |                          | 品種                      |
| process        | varchar(50)   |                          | 精製方法                   |
| roast_level    | int           | CHECK (roast_level BETWEEN 1 AND 5) | 焙煎度 (1-5) |
| roast_date     | date          |                          | 焙煎日                    |
| brewing_method | varchar(50)   |                          | 抽出方法                   |
| rating         | int           | CHECK (rating BETWEEN 1 AND 5) | 評価 (1-5)        |
| price          | decimal(10,2) |                          | 価格                      |
| purchase_date  | date          |                          | 購入日                    |
| notes          | text          |                          | メモ                      |
| created_at     | timestamptz   | NOT NULL, DEFAULT now()  | 作成日時                   |
| updated_at     | timestamptz   | NOT NULL, DEFAULT now()  | 更新日時                   |

### tasting_notes テーブル

コーヒーのテイスティングノートを管理するテーブル。

| カラム名         | データ型        | 制約                     | 説明                      |
|----------------|---------------|--------------------------|--------------------------|
| id             | uuid          | PRIMARY KEY, DEFAULT uuid_generate_v4() | テイスティングノートID |
| coffee_id      | uuid          | NOT NULL, REFERENCES coffees(id) | コーヒーID          |
| tasting_date   | date          | NOT NULL                 | テイスティング日              |
| acidity        | int           | CHECK (acidity BETWEEN 1 AND 5) | 酸味 (1-5)         |
| sweetness      | int           | CHECK (sweetness BETWEEN 1 AND 5) | 甘味 (1-5)        |
| body           | int           | CHECK (body BETWEEN 1 AND 5) | ボディ (1-5)           |
| flavor_notes   | text          |                          | 風味ノート                  |
| created_at     | timestamptz   | NOT NULL, DEFAULT now()  | 作成日時                   |
| updated_at     | timestamptz   | NOT NULL, DEFAULT now()  | 更新日時                   |

### coffee_images テーブル

コーヒーの画像情報を管理するテーブル。

| カラム名         | データ型        | 制約                     | 説明                      |
|----------------|---------------|--------------------------|--------------------------|
| id             | uuid          | PRIMARY KEY, DEFAULT uuid_generate_v4() | 画像ID |
| coffee_id      | uuid          | NOT NULL, REFERENCES coffees(id) | コーヒーID          |
| url            | text          | NOT NULL                 | 画像URL                   |
| alt_text       | varchar(255)  |                          | 代替テキスト                |
| sort_order     | int           | DEFAULT 0                | 表示順序                   |
| created_at     | timestamptz   | NOT NULL, DEFAULT now()  | 作成日時                   |

## インデックス

| テーブル名     | インデックス名       | カラム                  | 種類       | 説明                      |
|--------------|-------------------|------------------------|-----------|--------------------------|
| users        | users_email_idx   | email                  | BTREE     | メールアドレスによる検索用     |
| coffees      | coffees_user_id_idx | user_id              | BTREE     | ユーザーIDによる検索用        |
| coffees      | coffees_name_idx  | name                   | BTREE     | コーヒー名による検索用         |
| tasting_notes | tasting_notes_coffee_id_idx | coffee_id   | BTREE     | コーヒーIDによる検索用        |
| coffee_images | coffee_images_coffee_id_idx | coffee_id   | BTREE     | コーヒーIDによる検索用        |

## Row Level Security (RLS) ポリシー

### users テーブル

```sql
-- ユーザーは自分自身のプロフィールのみ表示可能
CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- ユーザーは自分自身のプロフィールのみ更新可能
CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);
```

### coffees テーブル

```sql
-- ユーザーは自分のコーヒーレコードのみ表示可能
CREATE POLICY "Users can view their own coffees"
  ON coffees
  FOR SELECT
  USING (auth.uid() = user_id);

-- ユーザーは自分のコーヒーレコードのみ作成可能
CREATE POLICY "Users can create their own coffees"
  ON coffees
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ユーザーは自分のコーヒーレコードのみ更新可能
CREATE POLICY "Users can update their own coffees"
  ON coffees
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ユーザーは自分のコーヒーレコードのみ削除可能
CREATE POLICY "Users can delete their own coffees"
  ON coffees
  FOR DELETE
  USING (auth.uid() = user_id);
```

### tasting_notes テーブル

```sql
-- ユーザーは自分のコーヒーに関連するテイスティングノートのみ表示可能
CREATE POLICY "Users can view their own tasting notes"
  ON tasting_notes
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM coffees WHERE coffees.id = coffee_id AND coffees.user_id = auth.uid()));

-- ユーザーは自分のコーヒーに関連するテイスティングノートのみ作成可能
CREATE POLICY "Users can create tasting notes for their own coffees"
  ON tasting_notes
  FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM coffees WHERE coffees.id = coffee_id AND coffees.user_id = auth.uid()));

-- ユーザーは自分のコーヒーに関連するテイスティングノートのみ更新可能
CREATE POLICY "Users can update their own tasting notes"
  ON tasting_notes
  FOR UPDATE
  USING (EXISTS (SELECT 1 FROM coffees WHERE coffees.id = coffee_id AND coffees.user_id = auth.uid()));

-- ユーザーは自分のコーヒーに関連するテイスティングノートのみ削除可能
CREATE POLICY "Users can delete their own tasting notes"
  ON tasting_notes
  FOR DELETE
  USING (EXISTS (SELECT 1 FROM coffees WHERE coffees.id = coffee_id AND coffees.user_id = auth.uid()));
```

### coffee_images テーブル

```sql
-- ユーザーは自分のコーヒーに関連する画像のみ表示可能
CREATE POLICY "Users can view their own coffee images"
  ON coffee_images
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM coffees WHERE coffees.id = coffee_id AND coffees.user_id = auth.uid()));

-- ユーザーは自分のコーヒーに関連する画像のみ作成可能
CREATE POLICY "Users can create images for their own coffees"
  ON coffee_images
  FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM coffees WHERE coffees.id = coffee_id AND coffees.user_id = auth.uid()));

-- ユーザーは自分のコーヒーに関連する画像のみ削除可能
CREATE POLICY "Users can delete their own coffee images"
  ON coffee_images
  FOR DELETE
  USING (EXISTS (SELECT 1 FROM coffees WHERE coffees.id = coffee_id AND coffees.user_id = auth.uid()));
```

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