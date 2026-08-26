CREATE TABLE public.cms_allowed_emails (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  note text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.cms_allowed_emails TO service_role;

ALTER TABLE public.cms_allowed_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read cms allowlist" ON public.cms_allowed_emails
FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

INSERT INTO public.cms_allowed_emails (email, note) VALUES
  ('admin@duet.edu.pk', 'DUET CMS administrator'),
  ('info@duet.edu.pk', 'DUET CMS administrator'),
  ('mail.syedjawadhussain@gmail.com', 'DUET CMS administrator')
ON CONFLICT (email) DO NOTHING;

-- Grant the admin role to any already-existing account on the allowlist.
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::app_role
FROM auth.users u
JOIN public.cms_allowed_emails a ON lower(u.email) = a.email
ON CONFLICT (user_id, role) DO NOTHING;

-- Remove admin access from any account that is not on the allowlist.
DELETE FROM public.user_roles ur
WHERE ur.role = 'admin'::app_role
  AND NOT EXISTS (
    SELECT 1 FROM auth.users u
    JOIN public.cms_allowed_emails a ON lower(u.email) = a.email
    WHERE u.id = ur.user_id
  );