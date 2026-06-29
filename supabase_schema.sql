-- =========================================================
-- Supabase Database Schema for Estate Studio Property Rental
-- =========================================================

-- 1. Create Property Status Type / Check
-- Valid statuses: 'available', 'reserved', 'rented', 'archived'

CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('บ้านเดี่ยว', 'คอนโด', 'ทาวน์โฮม', 'ที่ดิน')),
    location VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    bedrooms INTEGER DEFAULT 1,
    bathrooms INTEGER DEFAULT 1,
    area_sqm INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'rented', 'archived')),
    is_featured BOOLEAN DEFAULT false,
    near_bts BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create Policies for public access (Read non-archived properties)
CREATE POLICY "Allow public read access to non-archived properties" 
ON public.properties 
FOR SELECT 
USING (status != 'archived');

-- Create Policies for full control (Insert, Update, Delete) for admin/authenticated users
-- (For demo/testing without auth, you can also allow update or disable RLS)
CREATE POLICY "Allow update property status" 
ON public.properties 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow insert properties" 
ON public.properties 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow delete properties" 
ON public.properties 
FOR DELETE 
USING (true);


-- =========================================================
-- 2. Insert Initial Mock Data
-- =========================================================

INSERT INTO public.properties (title, category, location, price, bedrooms, bathrooms, area_sqm, image_url, status, is_featured, near_bts)
VALUES
(
    'Ashton Asoke Modern Luxury Suite',
    'คอนโด',
    'สุขุมวิท - อโศก (ติด BTS อโศก / MRT สุขุมวิท)',
    35000,
    1,
    1,
    48,
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    'available',
    true,
    true
),
(
    'Nanthawan Bangna Luxury House',
    'บ้านเดี่ยว',
    'บางนา - ตราด กม.7',
    120000,
    4,
    5,
    350,
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    'available',
    true,
    false
),
(
    'Life One Wireless Executive Penthouse',
    'คอนโด',
    'วิทยุ - ชิดลม (ใกล้ BTS เพลินจิต)',
    45000,
    2,
    2,
    65,
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    'reserved',
    true,
    true
),
(
    'Pleno Modern Townhome Ratchapruek',
    'ทาวน์โฮม',
    'ราชพฤกษ์ - สาทร',
    25000,
    3,
    2,
    120,
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'rented',
    false,
    false
),
(
    'Noble Ploenchit Sky Villa',
    'คอนโด',
    'เพลินจิต (ติด BTS เพลินจิต)',
    55000,
    2,
    2,
    75,
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    'available',
    true,
    true
),
(
    'Grand Bangkok Boulevard Ekamai-Ramintra',
    'บ้านเดี่ยว',
    'เลียบด่วนรามอินทรา',
    150000,
    5,
    6,
    420,
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'available',
    false,
    false
),
(
    'Rhythm Sukhumvit 36-38 Minimalist Studio',
    'คอนโด',
    'ทองหล่อ - เอกมัย (ใกล้ BTS ทองหล่อ)',
    28000,
    1,
    1,
    35,
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    'reserved',
    false,
    true
),
(
    'Baan Sansiri Pattanakarn Private Residence',
    'บ้านเดี่ยว',
    'พัฒนาการ 30',
    200000,
    5,
    6,
    550,
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    'archived',
    false,
    false
);
