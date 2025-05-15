export interface Coffee {
  id: string;
  name: string;
  consumed_at: string;
  roaster?: string;
  origin?: string;
  color?: string;
  rating?: number;
  notes?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  brew_method?: string;
  price?: number;
  shop_name?: string;
  latitude?: number;
  longitude?: number;
  process?: string;
  beans_brand?: string;
  aroma?: number;
  flavor?: number;
  aftertaste?: number;
  acidity?: number;
  body?: number;
  balance?: number;
  overall?: number;
} 