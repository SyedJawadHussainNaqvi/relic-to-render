-- 1. New role value (compared as text in policies so it is usable immediately)
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'super_admin';

-- 2. Allowlist the super admin address
INSERT INTO public.cms_allowed_emails (email, note)
SELECT 'admin@duet.edu.pk', 'Super administrator'
WHERE NOT EXISTS (SELECT 1 FROM public.cms_allowed_emails WHERE email = 'admin@duet.edu.pk');

-- 3. Elevated-role predicate reused by every policy below (text comparison keeps
--    the freshly added enum label usable inside this same transaction).
--    admin keeps its existing access; super_admin gains access everywhere.

-- cms_allowed_emails
DROP POLICY IF EXISTS "Admins read cms allowlist" ON public.cms_allowed_emails;
CREATE POLICY "Admins read cms allowlist" ON public.cms_allowed_emails FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

-- nav_items
DROP POLICY IF EXISTS "Admins manage nav" ON public.nav_items;
CREATE POLICY "Admins manage nav" ON public.nav_items FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

-- news_posts
DROP POLICY IF EXISTS "Admins manage posts" ON public.news_posts;
CREATE POLICY "Admins manage posts" ON public.news_posts FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

-- slider_slides
DROP POLICY IF EXISTS "Admins manage slides" ON public.slider_slides;
CREATE POLICY "Admins manage slides" ON public.slider_slides FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

-- soc_controls (four separate policies)
DROP POLICY IF EXISTS "Admins read controls" ON public.soc_controls;
CREATE POLICY "Admins read controls" ON public.soc_controls FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));
DROP POLICY IF EXISTS "Admins write controls" ON public.soc_controls;
CREATE POLICY "Admins write controls" ON public.soc_controls FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));
DROP POLICY IF EXISTS "Admins update controls" ON public.soc_controls;
CREATE POLICY "Admins update controls" ON public.soc_controls FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));
DROP POLICY IF EXISTS "Admins delete controls" ON public.soc_controls;
CREATE POLICY "Admins delete controls" ON public.soc_controls FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

-- read-only monitoring tables
DROP POLICY IF EXISTS "Admins read jsonld issues" ON public.seo_jsonld_issues;
CREATE POLICY "Admins read jsonld issues" ON public.seo_jsonld_issues FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

DROP POLICY IF EXISTS "Admins read jsonld runs" ON public.seo_jsonld_runs;
CREATE POLICY "Admins read jsonld runs" ON public.seo_jsonld_runs FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

DROP POLICY IF EXISTS "Admins read page checks" ON public.seo_page_checks;
CREATE POLICY "Admins read page checks" ON public.seo_page_checks FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

DROP POLICY IF EXISTS "Admins read sitemap snapshots" ON public.seo_sitemap_snapshots;
CREATE POLICY "Admins read sitemap snapshots" ON public.seo_sitemap_snapshots FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

DROP POLICY IF EXISTS "Admins read violations" ON public.soc_csp_violations;
CREATE POLICY "Admins read violations" ON public.soc_csp_violations FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

DROP POLICY IF EXISTS "Admins read route checks" ON public.soc_route_checks;
CREATE POLICY "Admins read route checks" ON public.soc_route_checks FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

DROP POLICY IF EXISTS "Admins read scan runs" ON public.soc_scan_runs;
CREATE POLICY "Admins read scan runs" ON public.soc_scan_runs FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

DROP POLICY IF EXISTS "Admins read uptime" ON public.soc_uptime_samples;
CREATE POLICY "Admins read uptime" ON public.soc_uptime_samples FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));

DROP POLICY IF EXISTS "Admins read vitals" ON public.soc_web_vitals;
CREATE POLICY "Admins read vitals" ON public.soc_web_vitals FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role::text IN ('admin','super_admin')));