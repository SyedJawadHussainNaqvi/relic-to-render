-- Replace helper-function calls in policies with inline owner-scoped checks,
-- then take away signed-in users' ability to call the elevated helper directly.

DROP POLICY IF EXISTS "Admins manage slides" ON public.slider_slides;
DROP POLICY IF EXISTS "Admins read all slides" ON public.slider_slides;
CREATE POLICY "Admins manage slides" ON public.slider_slides FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

DROP POLICY IF EXISTS "Admins manage posts" ON public.news_posts;
DROP POLICY IF EXISTS "Admins read all posts" ON public.news_posts;
CREATE POLICY "Admins manage posts" ON public.news_posts FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

DROP POLICY IF EXISTS "Admins manage nav" ON public.nav_items;
DROP POLICY IF EXISTS "Admins read all nav" ON public.nav_items;
CREATE POLICY "Admins manage nav" ON public.nav_items FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

-- Role assignments are managed server-side only; users may read their own roles.
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can read all roles" ON public.user_roles;

REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;