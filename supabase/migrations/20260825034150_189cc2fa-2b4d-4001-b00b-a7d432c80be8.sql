DROP FUNCTION IF EXISTS public.claim_first_admin();
REVOKE ALL ON FUNCTION public.touch_updated_at() FROM anon, authenticated;