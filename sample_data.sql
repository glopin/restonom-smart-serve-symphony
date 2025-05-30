-- Sample data for the 'plans' table

INSERT INTO public.plans (plan_id, name, price, currency, features, limits, active) VALUES
(
    'starter',
    'Başlangıç',
    299.00,
    'TRY',
    '["1 Restoran", "5 Personel", "Temel Raporlar", "QR Menü Sistemi", "Sipariş Yönetimi", "E-posta Desteği"]',
    '{"restaurants": 1, "staff_per_restaurant": 5, "advanced_reports": false, "reservations": false}',
    TRUE
),
(
    'professional',
    'Profesyonel',
    599.00,
    'TRY',
    '["3 Restoran", "15 Personel", "Gelişmiş Raporlar", "Rezervasyon Sistemi", "Çoklu Lokasyon", "Öncelikli Destek", "Özel Entegrasyonlar"]',
    '{"restaurants": 3, "staff_per_restaurant": 15, "advanced_reports": true, "reservations": true}',
    TRUE
),
(
    'kurumsal', -- Assuming 'kurumsal' is the plan_id for the enterprise/corporate plan
    'Kurumsal',
    999.00, -- Assuming a price, adjust if necessary
    'TRY',
    '["Sınırsız Restoran", "Sınırsız Personel", "API Erişimi", "Özel Geliştirme", "7/24 Destek", "Eğitim ve Danışmanlık", "SLA Garantisi"]',
    '{"restaurants": 1000, "staff_per_restaurant": 100, "advanced_reports": true, "reservations": true}', -- Using high numbers for "unlimited"
    TRUE
);

-- Instructions for use:
-- 1. Ensure the 'plans' table schema is created in your Supabase project (using supabase_schema.sql or similar).
-- 2. Run this SQL script in the Supabase SQL Editor to insert the sample plans.
--
-- Note:
-- - `id`, `created_at`, and `updated_at` columns will be auto-populated by the database.
-- - Adjust `price` for 'Kurumsal' or other values as needed.
-- - The `plan_id` 'kurumsal' is used here for the highest tier plan, matching the example limits.
--   If a different `plan_id` (e.g., 'enterprise') was used in `Subscriptions.tsx` or other parts of the application
--   for the "Kurumsal" named plan, ensure consistency or update accordingly.
--   In `src/pages/Subscriptions.tsx`, the enterprise plan was referred to with planId: "enterprise".
--   If you want to match that exactly, you might change 'kurumsal' to 'enterprise' in this script's plan_id field.
--   For now, 'kurumsal' is used as per the prompt's explicit naming for `PLAN_LIMITS`.
