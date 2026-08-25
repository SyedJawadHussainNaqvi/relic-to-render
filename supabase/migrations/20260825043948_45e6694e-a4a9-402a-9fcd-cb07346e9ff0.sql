UPDATE public.slider_slides
SET image_url = '/media/' || regexp_replace(image_url, '^.*/', '')
WHERE image_url LIKE '/__l5e/%' OR image_url LIKE '%/__l5e/%';

UPDATE public.news_posts
SET image_url = '/media/' || regexp_replace(image_url, '^.*/', '')
WHERE image_url IS NOT NULL AND (image_url LIKE '/__l5e/%' OR image_url LIKE '%/__l5e/%');