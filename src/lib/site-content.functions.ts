import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const fetchNavItems = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("nav_items")
    .select("id, section, parent_key, label, to_path, href, sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const fetchSlides = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("slider_slides")
    .select("id, image_url, alt_text, caption, link_to, sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});

export const fetchNewsPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("news_posts")
    .select("id, slug, title, excerpt, body, image_url, published_at, sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
});
