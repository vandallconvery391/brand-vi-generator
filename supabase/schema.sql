CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS brand_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  description TEXT,
  brand_tone TEXT DEFAULT 'professional',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS logo_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES brand_projects(id) ON DELETE CASCADE,
  design_type TEXT NOT NULL,
  keywords TEXT[],
  svg_data TEXT,
  png_url TEXT,
  selected BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS color_schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES brand_projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  neutral_color TEXT NOT NULL,
  background_color TEXT NOT NULL,
  selected BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS font_pairings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES brand_projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  heading_font TEXT NOT NULL,
  body_font TEXT NOT NULL,
  heading_weight TEXT DEFAULT '700',
  body_weight TEXT DEFAULT '400',
  selected BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS brand_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES brand_projects(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS brand_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES brand_projects(id) ON DELETE CASCADE,
  pdf_url TEXT,
  export_format TEXT DEFAULT 'pdf',
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  default_brand_tone TEXT DEFAULT 'professional',
  preferred_language TEXT DEFAULT 'zh-CN',
  theme TEXT DEFAULT 'light',
  auto_save BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS design_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  action_data JSONB,
  project_id UUID REFERENCES brand_projects(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE logo_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE font_pairings ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by owner" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Profiles can be inserted by authenticated users" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Profiles can be updated by owner" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profiles can be deleted by owner" ON profiles FOR DELETE USING (auth.uid() = id);

CREATE POLICY "Brand projects are viewable by owner" ON brand_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Brand projects can be inserted by authenticated users" ON brand_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Brand projects can be updated by owner" ON brand_projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Brand projects can be deleted by owner" ON brand_projects FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Logo generations are viewable by project owner" ON logo_generations FOR SELECT USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Logo generations can be inserted by project owner" ON logo_generations FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Logo generations can be updated by project owner" ON logo_generations FOR UPDATE USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Logo generations can be deleted by project owner" ON logo_generations FOR DELETE USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));

CREATE POLICY "Color schemes are viewable by project owner" ON color_schemes FOR SELECT USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Color schemes can be inserted by project owner" ON color_schemes FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Color schemes can be updated by project owner" ON color_schemes FOR UPDATE USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Color schemes can be deleted by project owner" ON color_schemes FOR DELETE USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));

CREATE POLICY "Font pairings are viewable by project owner" ON font_pairings FOR SELECT USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Font pairings can be inserted by project owner" ON font_pairings FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Font pairings can be updated by project owner" ON font_pairings FOR UPDATE USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Font pairings can be deleted by project owner" ON font_pairings FOR DELETE USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));

CREATE POLICY "Brand assets are viewable by project owner" ON brand_assets FOR SELECT USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Brand assets can be inserted by project owner" ON brand_assets FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Brand assets can be updated by project owner" ON brand_assets FOR UPDATE USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Brand assets can be deleted by project owner" ON brand_assets FOR DELETE USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));

CREATE POLICY "Brand guides are viewable by project owner" ON brand_guides FOR SELECT USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Brand guides can be inserted by project owner" ON brand_guides FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));
CREATE POLICY "Brand guides can be deleted by project owner" ON brand_guides FOR DELETE USING (auth.uid() = (SELECT user_id FROM brand_projects WHERE id = project_id));

CREATE POLICY "User preferences are viewable by owner" ON user_preferences FOR SELECT USING (auth.uid() = id);
CREATE POLICY "User preferences can be inserted by authenticated users" ON user_preferences FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "User preferences can be updated by owner" ON user_preferences FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "User preferences can be deleted by owner" ON user_preferences FOR DELETE USING (auth.uid() = id);

CREATE POLICY "Design history is viewable by owner" ON design_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Design history can be inserted by authenticated users" ON design_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Design history can be deleted by owner" ON design_history FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_brand_projects_user_id ON brand_projects(user_id);
CREATE INDEX idx_brand_projects_status ON brand_projects(status);
CREATE INDEX idx_logo_generations_project_id ON logo_generations(project_id);
CREATE INDEX idx_color_schemes_project_id ON color_schemes(project_id);
CREATE INDEX idx_font_pairings_project_id ON font_pairings(project_id);
CREATE INDEX idx_brand_assets_project_id ON brand_assets(project_id);
CREATE INDEX idx_design_history_user_id ON design_history(user_id);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_profiles_update BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_brand_projects_update BEFORE UPDATE ON brand_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_user_preferences_update BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at();
