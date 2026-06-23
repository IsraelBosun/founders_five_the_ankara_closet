-- ============================================================
-- AISHAT / THE ANKARA CLOSET — Supabase Schema + Seed
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ── TABLES ────────────────────────────────────────────────────

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  price integer not null,
  original_price integer,
  is_new boolean default false,
  category text not null,
  badge text,
  description text,
  details text[] default '{}',
  material text,
  fit text,
  care text,
  length text,
  sizes text[] default '{}',
  occasions text[] default '{}',
  colorways text[] default '{}',
  images text[] default '{}',
  rating numeric(3,1) default 5.0,
  review_count integer default 0,
  in_stock boolean default true,
  featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  image text,
  description text,
  bg text default '#C4703A',
  sort_order integer default 0
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  name text not null,
  location text,
  stars integer default 5,
  time_ago text,
  size text,
  sort_order integer default 0
);

create table if not exists site_content (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text,
  type text default 'text',
  label text not null,
  section text not null,
  updated_at timestamptz default now()
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────

alter table products enable row level security;
alter table categories enable row level security;
alter table testimonials enable row level security;
alter table site_content enable row level security;

create policy "public_read_products" on products for select using (true);
create policy "auth_all_products" on products to authenticated using (true) with check (true);

create policy "public_read_categories" on categories for select using (true);
create policy "auth_all_categories" on categories to authenticated using (true) with check (true);

create policy "public_read_testimonials" on testimonials for select using (true);
create policy "auth_all_testimonials" on testimonials to authenticated using (true) with check (true);

create policy "public_read_site_content" on site_content for select using (true);
create policy "auth_all_site_content" on site_content to authenticated using (true) with check (true);

-- ── STORAGE BUCKETS ───────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

create policy "public_read_product_images" on storage.objects
  for select using (bucket_id = 'product-images');

create policy "auth_write_product_images" on storage.objects
  to authenticated using (bucket_id = 'product-images') with check (bucket_id = 'product-images');

create policy "public_read_site_images" on storage.objects
  for select using (bucket_id = 'site-images');

create policy "auth_write_site_images" on storage.objects
  to authenticated using (bucket_id = 'site-images') with check (bucket_id = 'site-images');

-- ── SEED: CATEGORIES ─────────────────────────────────────────

insert into categories (name, image, description, bg, sort_order) values
  ('Dresses',       '/products/product_1_photo_1.jpeg', 'Halter necks, ball gowns & statement pieces', '#E8C9A0', 1),
  ('Kimonos & Sets','/photos/photo_1.jpeg',             'Co-ords that work for any occasion',          '#C4703A', 2),
  ('2-Pieces',      '/products/product_4_photo_1.jpeg', 'Mix, match & make it yours',                  '#A84020', 3),
  ('Asoke',         '/products/product_5_photo_1.jpeg', 'Heritage fabric, modern silhouettes',         '#6B3010', 4)
on conflict (name) do nothing;

-- ── SEED: PRODUCTS ────────────────────────────────────────────

insert into products (slug, name, price, original_price, is_new, category, badge, description, details, material, fit, care, length, sizes, occasions, colorways, images, rating, review_count, in_stock, featured, sort_order) values
(
  'purple-stripe-halter-dress', 'Stripe Halter Dress', 10000, null, false, 'Dresses', 'Best Seller',
  'Turn heads wherever you go. This stunning halter neck dress features a beautifully ruched bodice, adjustable tie straps, and a dramatic flared skirt crafted from vibrant Ankara fabric. The bold magenta stripe pattern commands attention at every owambe, church service, or date night.',
  ARRAY['Premium quality Ankara fabric','Ruched, adjustable halter neckline','Flared skirt with full volume','Invisible side zip for easy wear'],
  '100% cotton Ankara', 'Regular, true to size', 'Hand wash cold', 'Maxi (ankle)',
  ARRAY['S','M','L','XL'],
  ARRAY['Church','Events','Date Night','Owambe'],
  ARRAY[]::text[],
  ARRAY['/products/product_1_photo_1.jpeg'],
  4.9, 32, true, true, 1
),
(
  'patchwork-tiered-gown', 'Patchwork Tiered Gown', 13000, null, true, 'Dresses', 'New Arrival',
  'Make your entrance unforgettable. This multi-tiered ball gown brings together a vibrant patchwork of Ankara prints in cascading layers of drama and colour. From the ruched fitted bodice to the sweeping tiered skirt, every detail is made to celebrate you.',
  ARRAY['Multi-panel Ankara patchwork construction','Ruched fitted bodice with halter tie','Three-tier dramatic skirt','Fully lined for comfort and confidence'],
  '100% cotton Ankara', 'Regular, true to size', 'Hand wash cold', 'Maxi (ankle)',
  ARRAY['S','M','L','XL'],
  ARRAY['Owambe','Events','Parties','Weddings'],
  ARRAY[]::text[],
  ARRAY['/products/product_2_photo_1.jpeg','/products/product_2_photo_2.jpeg','/products/product_2_photo_3.jpeg'],
  4.9, 48, true, true, 2
),
(
  'ankara-kimono-pant-set', 'Ankara Kimono & Pant Set', 9600, 12000, false, 'Kimonos & Sets', 'Selling Fast',
  'Effortlessly chic from morning to midnight. This flowing kimono and wide-leg pant co-ord is a complete look that needs nothing else. Available in multiple stunning Ankara prints — from bold pink leopard to soft dusty rose florals — pick your vibe and walk out with purpose.',
  ARRAY['Free-flowing open-front kimono','Matching wide-leg palazzo pants','Free size — fits comfortably S through XL','Lightweight breathable Ankara fabric','Available in multiple colourways'],
  '100% cotton Ankara', 'Free size (S–XL)', 'Hand wash cold', 'Maxi (ankle)',
  ARRAY['Free Size (S–XL)'],
  ARRAY['Church','Office','Events','Casual','Travel'],
  ARRAY['Pink Leopard','Blue Geometric','White Stripe','Black Spot','Dusty Rose Floral'],
  ARRAY['/products/product_3_photo_1.jpeg','/products/product_3_photo_2.jpeg','/products/product_3_photo_3.jpeg','/products/product_3_photo_4.jpeg','/products/product_3_photo_5.jpeg','/photos/photo_1.jpeg','/photos/photo_5.jpeg'],
  4.8, 56, true, true, 3
),
(
  'ankara-two-piece-set', 'Ankara 2-Piece Set', 13000, null, true, '2-Pieces', 'New Arrival',
  'Bold, beautiful, and built to be noticed. This Ankara 2-piece features a ruched, tie-strap crop top and a dramatic asymmetric handkerchief skirt. Available in fiery red and royal blue colourways — both impossible to ignore.',
  ARRAY['Ruched crop top with adjustable tie straps','Asymmetric handkerchief hem skirt','Available in Red/White and Royal Blue/White','Mix-and-match tops and skirts','Lightweight and breathable'],
  '100% cotton Ankara', 'Regular, true to size', 'Hand wash cold', 'Midi (knee)',
  ARRAY['S','M','L','XL'],
  ARRAY['Events','Owambe','Date Night','Parties'],
  ARRAY['Red & White','Royal Blue & White'],
  ARRAY['/products/product_4_photo_1.jpeg','/products/product_4_photo_2.jpeg','/products/product_4_photo_3.jpeg','/products/product_4_photo_4.jpeg','/products/product_4_photo_5.jpeg','/products/product_4_photo_6.jpeg'],
  4.9, 41, true, true, 4
),
(
  'asoke-maxi-dress', 'Asoke Maxi Dress', 14000, null, false, 'Asoke', 'Premium',
  'Where tradition meets contemporary elegance. Crafted from premium Asoke weave fabric, this maxi dress features a relaxed silhouette with a bold V-neckline trimmed in contrasting woven bands. Rooted in heritage, styled for today.',
  ARRAY['Authentic premium Aso-Oke weave','Deep V-neckline with woven trim detail','Relaxed maxi silhouette','White with purple and black motif','Pairs beautifully with gold jewellery'],
  'Premium Aso-Oke weave', 'Relaxed, slightly oversized', 'Dry clean recommended', 'Maxi (ankle)',
  ARRAY['S','M','L','XL','XXL'],
  ARRAY['Church','Office','Traditional Events','Owambe'],
  ARRAY[]::text[],
  ARRAY['/products/product_5_photo_1.jpeg','/products/product_5_photo_2.jpeg','/products/product_5_photo_3.jpeg','/products/product_5_photo_4.jpeg'],
  5.0, 19, true, false, 5
),
(
  'orange-adire-tiered-dress', 'Orange Adire Tiered Dress', 11000, 13000, false, 'Dresses', 'Sale',
  'A celebration of Nigerian craft in wearable form. This showstopping orange tiered dress draws on the rich tradition of Adire dyeing — bold abstract patterns across a warm rust-orange base. Three cascading tiers give it volume and movement that photographs beautifully.',
  ARRAY['Hand-inspired Adire print fabric','Ruched halter bodice with tie neck','Three dramatic tiered skirt layers','Vibrant orange and white colourway'],
  '100% cotton Adire', 'Regular, true to size', 'Hand wash cold', 'Maxi (ankle)',
  ARRAY['S','M','L','XL'],
  ARRAY['Owambe','Events','Parties','Photoshoots'],
  ARRAY[]::text[],
  ARRAY['/photos/photo_6.jpeg'],
  4.7, 23, true, true, 6
)
on conflict (slug) do nothing;

-- ── SEED: TESTIMONIALS ────────────────────────────────────────

insert into testimonials (text, name, location, stars, time_ago, size, sort_order) values
  ('This dress is fireeeee 🥰 Best purchase I''ve made all year. Will be ordering again!', 'Tolu A.', 'Lagos', 5, '2 days ago', 'M', 1),
  ('The color is even more beautiful than I expected. Thanks for the fast delivery!', 'Chioma O.', 'Abuja', 5, '1 week', 'L', 2),
  ('Thanks my love, I love them all 😍 Especially the pink one. Quality is top tier.', 'Aisha M.', 'Jos', 5, '2 weeks ago', 'M', 3),
  ('I ordered the 2-piece set and it arrived the next day! The quality is amazing — I''ve gotten so many compliments.', 'Ngozi E.', 'Port Harcourt', 5, '3 weeks ago', 'S', 4),
  ('Best Ankara vendor on the internet. The kimono set is giving everything it''s supposed to give! Everyone in London is asking where I got it 😍', 'Blessing I.', 'London', 5, '1 month ago', 'Free Size', 5)
on conflict do nothing;

-- ── SEED: SITE CONTENT ───────────────────────────────────────

insert into site_content (key, value, type, label, section) values
  ('announcement_text',   'FREE DELIVERY OVER ₦25,000  ·  WORLDWIDE SHIPPING  ·  PAY ON DELIVERY AVAILABLE', 'text',     'Announcement Bar',         'homepage'),
  ('hero_title',          'ANKARA SEASON',                                                                     'text',     'Hero Title',               'homepage'),
  ('hero_subtitle',       'Ready-to-wear. No tailor stress. Delivered to your door across Nigeria and worldwide.', 'textarea', 'Hero Subtitle',         'homepage'),
  ('hero_image',          '/products/product_2_photo_1.jpeg',                                                   'image',    'Hero Background Image',    'homepage'),
  ('reseller_title',      'BECOME A RESELLER.',                                                                 'text',     'Reseller Section Title',   'homepage'),
  ('reseller_description','Boutique owners and fashion vendors: get wholesale prices, bulk discounts, and consistent stock for resale.', 'textarea', 'Reseller Description', 'homepage'),
  ('reseller_image',      '/products/product_3_photo_1.jpeg',                                                   'image',    'Reseller Section Image',   'homepage'),
  ('whatsapp_number',     '2348133053455',                                                                       'text',     'WhatsApp Number',          'general'),
  ('review_rating',       '4.9',                                                                                'text',     'Review Rating',            'general'),
  ('review_count_text',   'Loved by 500+ customers',                                                            'text',     'Review Count Text',        'general')
on conflict (key) do nothing;
