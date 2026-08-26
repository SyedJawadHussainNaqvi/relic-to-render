CREATE TABLE public.seo_sitemap_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT NOT NULL DEFAULT 'scheduled',
  site_url TEXT NOT NULL,
  sitemap_url TEXT NOT NULL,
  last_submitted TIMESTAMPTZ,
  last_downloaded TIMESTAMPTZ,
  is_pending BOOLEAN NOT NULL DEFAULT false,
  errors INTEGER NOT NULL DEFAULT 0,
  warnings INTEGER NOT NULL DEFAULT 0,
  submitted_urls INTEGER NOT NULL DEFAULT 0,
  indexed_urls INTEGER NOT NULL DEFAULT 0,
  notes TEXT
);

CREATE TABLE public.seo_page_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT NOT NULL DEFAULT 'scheduled',
  site_url TEXT NOT NULL,
  page_url TEXT NOT NULL,
  verdict TEXT,
  coverage_state TEXT,
  robots_txt_state TEXT,
  indexing_state TEXT,
  page_fetch_state TEXT,
  crawled_as TEXT,
  google_canonical TEXT,
  user_canonical TEXT,
  last_crawl_time TIMESTAMPTZ,
  rich_results_verdict TEXT,
  in_sitemap BOOLEAN NOT NULL DEFAULT false,
  raw JSONB
);

CREATE TABLE public.seo_jsonld_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT NOT NULL DEFAULT 'scheduled',
  target TEXT NOT NULL,
  pages_total INTEGER NOT NULL DEFAULT 0,
  pages_passed INTEGER NOT NULL DEFAULT 0,
  pages_failed INTEGER NOT NULL DEFAULT 0,
  notes TEXT
);

CREATE TABLE public.seo_jsonld_issues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  run_id UUID NOT NULL REFERENCES public.seo_jsonld_runs(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'error',
  message TEXT NOT NULL,
  schema_types TEXT[] NOT NULL DEFAULT '{}'
);

CREATE INDEX seo_sitemap_snapshots_captured_idx ON public.seo_sitemap_snapshots (captured_at DESC);
CREATE INDEX seo_page_checks_checked_idx ON public.seo_page_checks (checked_at DESC);
CREATE INDEX seo_page_checks_page_idx ON public.seo_page_checks (page_url, checked_at DESC);
CREATE INDEX seo_jsonld_runs_started_idx ON public.seo_jsonld_runs (started_at DESC);
CREATE INDEX seo_jsonld_issues_run_idx ON public.seo_jsonld_issues (run_id);

GRANT SELECT ON public.seo_sitemap_snapshots TO authenticated;
GRANT SELECT ON public.seo_page_checks TO authenticated;
GRANT SELECT ON public.seo_jsonld_runs TO authenticated;
GRANT SELECT ON public.seo_jsonld_issues TO authenticated;
GRANT ALL ON public.seo_sitemap_snapshots TO service_role;
GRANT ALL ON public.seo_page_checks TO service_role;
GRANT ALL ON public.seo_jsonld_runs TO service_role;
GRANT ALL ON public.seo_jsonld_issues TO service_role;

ALTER TABLE public.seo_sitemap_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_page_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_jsonld_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_jsonld_issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read sitemap snapshots" ON public.seo_sitemap_snapshots FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins read page checks" ON public.seo_page_checks FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins read jsonld runs" ON public.seo_jsonld_runs FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins read jsonld issues" ON public.seo_jsonld_issues FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));