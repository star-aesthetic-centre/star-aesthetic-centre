-- Pre-import cPanel test mailboxes for shop / rewards / CRM testing
-- ⚠ Run setup-test-customers.sql instead (creates table + seeds in one go)
-- Or run customer-profiles-schema.sql FIRST, then this file.
-- Safe to re-run (upserts on email)

insert into public.customer_profiles (
  email, first_name, last_name, phone,
  address_line1, address_line2, city, province, postal_code,
  is_test, notes, updated_at
) values
  ('ava@itools247.co.za', 'Ava', 'Naidoo', '082 111 1001', '12 Musgrave Road', 'Berea', 'Durban', 'KZN', '4001', true, 'cPanel test — itools247', now()),
  ('denice@itools247.co.za', 'Denice', 'Pillay', '082 111 1002', '45 Florida Road', 'Morningside', 'Durban', 'KZN', '4001', true, 'cPanel test — itools247', now()),
  ('ethan@itools247.co.za', 'Ethan', 'Reddy', '082 111 1003', '8 Windermere Road', null, 'Durban North', 'KZN', '4051', true, 'cPanel test — itools247', now()),
  ('isabella@itools247.co.za', 'Isabella', 'Govender', '082 111 1004', '22 Ennisdale Drive', null, 'Durban North', 'KZN', '4051', true, 'cPanel test — itools247', now()),
  ('noah@itools247.co.za', 'Noah', 'Singh', '082 111 1005', '101 Gillespie Street', 'Berea', 'Durban', 'KZN', '4001', true, 'cPanel test — itools247', now()),
  ('oliver@itools247.co.za', 'Oliver', 'van Wyk', '082 111 1006', '3 Chartwell Drive', 'Umhlanga Rocks', 'Umhlanga', 'KZN', '4320', true, 'cPanel test — itools247', now()),
  ('teddybear@itools247.co.za', 'Teddy', 'Bear', '082 111 1007', '1 Test Lane', 'Westville', 'Durban', 'KZN', '3629', true, 'cPanel test — itools247', now()),
  ('william@itools247.co.za', 'William', 'Dlamini', '082 111 1008', '67 Marine Parade', null, 'Durban', 'KZN', '4001', true, 'cPanel test — itools247', now()),
  ('daniel@itools24.co.za', 'Daniel', 'Botha', '082 222 2001', '14 Kensington Drive', null, 'Durban North', 'KZN', '4051', true, 'cPanel test — itools24', now()),
  ('david@itools24.co.za', 'David', 'Moodley', '082 222 2002', '29 Hillcrest Avenue', 'Hillcrest', 'Durban', 'KZN', '3610', true, 'cPanel test — itools24', now()),
  ('emily@itools24.co.za', 'Emily', 'Khumalo', '082 222 2003', '5 Ridge Road', 'Berea', 'Durban', 'KZN', '4001', true, 'cPanel test — itools24', now()),
  ('emma@itools24.co.za', 'Emma', 'Chetty', '082 222 2004', '88 Umgeni Road', null, 'Durban', 'KZN', '4001', true, 'cPanel test — itools24', now()),
  ('james@itools24.co.za', 'James', 'Maharaj', '082 222 2005', '12 Athlone Crescent', 'Durban North', 'Durban', 'KZN', '4051', true, 'cPanel test — itools24', now()),
  ('olivia@itools24.co.za', 'Olivia', 'Peters', '082 222 2006', '40 Innes Road', 'Morningside', 'Durban', 'KZN', '4001', true, 'cPanel test — itools24', now()),
  ('sophia@itools24.co.za', 'Sophia', 'Williams', '082 222 2007', '7 Linksfield Road', 'Glenashley', 'Durban', 'KZN', '4051', true, 'cPanel test — itools24', now()),
  ('tracy@itools24.co.za', 'Tracy', 'Zulu', '082 222 2008', '33 Problem Mkhize Road', 'Berea', 'Durban', 'KZN', '4001', true, 'cPanel test — itools24', now())
on conflict (email) do update set
  first_name = excluded.first_name,
  last_name = excluded.last_name,
  phone = excluded.phone,
  address_line1 = excluded.address_line1,
  address_line2 = excluded.address_line2,
  city = excluded.city,
  province = excluded.province,
  postal_code = excluded.postal_code,
  is_test = excluded.is_test,
  notes = excluded.notes,
  updated_at = now();

-- Star Light Rewards accounts (optional balance for redemption testing)
insert into public.loyalty_accounts (email, first_name, last_name, phone, balance_rands, total_earned, total_redeemed, updated_at)
values
  ('ava@itools247.co.za', 'Ava', 'Naidoo', '082 111 1001', 150, 200, 50, now()),
  ('denice@itools247.co.za', 'Denice', 'Pillay', '082 111 1002', 0, 0, 0, now()),
  ('ethan@itools247.co.za', 'Ethan', 'Reddy', '082 111 1003', 75, 75, 0, now()),
  ('isabella@itools247.co.za', 'Isabella', 'Govender', '082 111 1004', 250, 300, 50, now()),
  ('noah@itools247.co.za', 'Noah', 'Singh', '082 111 1005', 0, 0, 0, now()),
  ('oliver@itools247.co.za', 'Oliver', 'van Wyk', '082 111 1006', 50, 50, 0, now()),
  ('teddybear@itools247.co.za', 'Teddy', 'Bear', '082 111 1007', 100, 100, 0, now()),
  ('william@itools247.co.za', 'William', 'Dlamini', '082 111 1008', 0, 0, 0, now()),
  ('daniel@itools24.co.za', 'Daniel', 'Botha', '082 222 2001', 120, 120, 0, now()),
  ('david@itools24.co.za', 'David', 'Moodley', '082 222 2002', 0, 0, 0, now()),
  ('emily@itools24.co.za', 'Emily', 'Khumalo', '082 222 2003', 40, 40, 0, now()),
  ('emma@itools24.co.za', 'Emma', 'Chetty', '082 222 2004', 0, 0, 0, now()),
  ('james@itools24.co.za', 'James', 'Maharaj', '082 222 2005', 200, 250, 50, now()),
  ('olivia@itools24.co.za', 'Olivia', 'Peters', '082 222 2006', 0, 0, 0, now()),
  ('sophia@itools24.co.za', 'Sophia', 'Williams', '082 222 2007', 85, 85, 0, now()),
  ('tracy@itools24.co.za', 'Tracy', 'Zulu', '082 222 2008', 0, 0, 0, now())
on conflict (email) do update set
  first_name = excluded.first_name,
  last_name = excluded.last_name,
  phone = excluded.phone,
  balance_rands = excluded.balance_rands,
  total_earned = excluded.total_earned,
  total_redeemed = excluded.total_redeemed,
  updated_at = now();

-- CRM leads (address in metadata for admin reference)
insert into public.leads (email, first_name, last_name, phone, source, interest_type, interest_value, status, notes, metadata, updated_at)
select
  p.email,
  p.first_name,
  p.last_name,
  p.phone,
  'import',
  'general',
  'Test account',
  'new',
  p.notes,
  jsonb_build_object(
    'address_line1', p.address_line1,
    'address_line2', p.address_line2,
    'city', p.city,
    'province', p.province,
    'postal_code', p.postal_code,
    'is_test', true
  ),
  now()
from public.customer_profiles p
where p.is_test = true
  and not exists (
    select 1 from public.leads l
    where lower(l.email) = lower(p.email)
      and l.source = 'import'
      and l.interest_value = 'Test account'
  );

select email, first_name, last_name, city, is_test from public.customer_profiles where is_test order by email;
