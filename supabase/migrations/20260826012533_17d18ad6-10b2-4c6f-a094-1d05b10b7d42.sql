-- SOC / security-operations tables

CREATE TABLE public.soc_scan_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  source text NOT NULL DEFAULT 'ci',
  target text NOT NULL,
  routes_total int NOT NULL DEFAULT 0,
  routes_passed int NOT NULL DEFAULT 0,
  routes_failed int NOT NULL DEFAULT 0,
  engines text[] NOT NULL DEFAULT '{}',
  csp_violations int NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.soc_route_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id uuid NOT NULL REFERENCES public.soc_scan_runs(id) ON DELETE CASCADE,
  path text NOT NULL,
  status_code int,
  passed boolean NOT NULL DEFAULT false,
  failures jsonb NOT NULL DEFAULT '[]'::jsonb,
  headers jsonb NOT NULL DEFAULT '{}'::jsonb,
  response_ms int,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX soc_route_checks_run_idx ON public.soc_route_checks(run_id);

CREATE TABLE public.soc_uptime_samples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checked_at timestamptz NOT NULL DEFAULT now(),
  target text NOT NULL,
  path text NOT NULL,
  status_code int,
  response_ms int,
  is_up boolean NOT NULL DEFAULT true
);
CREATE INDEX soc_uptime_samples_checked_idx ON public.soc_uptime_samples(checked_at DESC);

CREATE TABLE public.soc_web_vitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recorded_at timestamptz NOT NULL DEFAULT now(),
  metric text NOT NULL,
  value double precision NOT NULL,
  rating text,
  path text NOT NULL,
  device text
);
CREATE INDEX soc_web_vitals_recorded_idx ON public.soc_web_vitals(recorded_at DESC);

CREATE TABLE public.soc_csp_violations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_at timestamptz NOT NULL DEFAULT now(),
  document_uri text,
  violated_directive text,
  effective_directive text,
  blocked_uri text,
  source_file text,
  line_number int,
  user_agent text,
  occurrences int NOT NULL DEFAULT 1
);
CREATE INDEX soc_csp_violations_reported_idx ON public.soc_csp_violations(reported_at DESC);

CREATE TABLE public.soc_controls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL,
  description text,
  owner text,
  status text NOT NULL DEFAULT 'in_progress',
  last_reviewed_at date,
  next_review_at date,
  evidence text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.soc_scan_runs TO authenticated;
GRANT SELECT ON public.soc_route_checks TO authenticated;
GRANT SELECT ON public.soc_uptime_samples TO authenticated;
GRANT SELECT ON public.soc_web_vitals TO authenticated;
GRANT SELECT ON public.soc_csp_violations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.soc_controls TO authenticated;
GRANT ALL ON public.soc_scan_runs, public.soc_route_checks, public.soc_uptime_samples,
  public.soc_web_vitals, public.soc_csp_violations, public.soc_controls TO service_role;

ALTER TABLE public.soc_scan_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soc_route_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soc_uptime_samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soc_web_vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soc_csp_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soc_controls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read scan runs" ON public.soc_scan_runs FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins read route checks" ON public.soc_route_checks FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins read uptime" ON public.soc_uptime_samples FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins read vitals" ON public.soc_web_vitals FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins read violations" ON public.soc_csp_violations FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins read controls" ON public.soc_controls FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins write controls" ON public.soc_controls FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins update controls" ON public.soc_controls FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
CREATE POLICY "Admins delete controls" ON public.soc_controls FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE TRIGGER soc_controls_touch BEFORE UPDATE ON public.soc_controls
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.soc_controls (code, title, category, description, owner, status, last_reviewed_at, next_review_at, evidence, sort_order) VALUES
 ('AC-1','Role-based staff access','Access control','Content editing requires an authenticated staff account with the admin role; roles are granted server-side only.','IT Directorate','implemented',CURRENT_DATE,CURRENT_DATE + 90,'Row-level security policies on all content tables; no self-service role grants.',10),
 ('AC-2','Least-privilege database access','Access control','Public visitors can only read published content; all writes require an admin session.','IT Directorate','implemented',CURRENT_DATE,CURRENT_DATE + 90,'Table grants limited to authenticated/service roles.',20),
 ('CM-1','Reviewed change management','Change management','Website changes are built, verified and published through a controlled pipeline with automated header and SEO checks.','Webmaster','implemented',CURRENT_DATE,CURRENT_DATE + 180,'Automated header/CSP test suite runs on every build.',30),
 ('SC-1','Transport encryption','Network security','HTTPS is enforced site-wide with HSTS and preload; HTTP requests are permanently redirected.','IT Directorate','implemented',CURRENT_DATE,CURRENT_DATE + 180,'HSTS max-age 1 year, includeSubDomains, preload.',40),
 ('SC-2','Content Security Policy','Application security','A strict policy blocks inline and third-party scripts; violations are reported and reviewed.','Webmaster','implemented',CURRENT_DATE,CURRENT_DATE + 90,'Per-page script hashes; no unsafe-inline for scripts.',50),
 ('SC-3','Web application firewall','Network security','Edge firewall and server rules block malicious bots, exploit probes and abusive request rates.','IT Directorate','in_progress',CURRENT_DATE,CURRENT_DATE + 90,'Server rules live; edge firewall rule set pending activation.',60),
 ('AU-1','Monitoring and logging','Logging & monitoring','Availability, response time and security-header state are sampled automatically and retained for review.','IT Directorate','implemented',CURRENT_DATE,CURRENT_DATE + 90,'Scheduled collector writes uptime and header results.',70),
 ('IR-1','Incident response plan','Incident response','Documented steps, owners and contact points for handling a website security incident.','IT Directorate','in_progress',CURRENT_DATE,CURRENT_DATE + 90,'Draft runbook; contact tree to be confirmed.',80),
 ('CP-1','Backup and recovery','Resilience','Content database is backed up automatically; the static site can be rebuilt and redeployed from source.','IT Directorate','implemented',CURRENT_DATE,CURRENT_DATE + 180,'Managed database backups plus reproducible static build.',90),
 ('SR-1','Vendor management','Third-party risk','Hosting, DNS and backend providers are reviewed for security posture and access is limited to named staff.','Registrar Office','in_progress',CURRENT_DATE,CURRENT_DATE + 365,'Provider list maintained; annual review scheduled.',100);