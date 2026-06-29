import { createClient } from '@supabase/supabase-js'

// Retrieve Supabase credentials from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Initialize Supabase Client if credentials are provided
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Mock initial properties dataset for immediate testing / fallback
export const INITIAL_MOCK_PROPERTIES = [
  {
    id: 'prop-1',
    title: 'Ashton Asoke Modern Luxury Suite',
    category: 'คอนโด',
    location: 'สุขุมวิท - อโศก (ติด BTS อโศก / MRT สุขุมวิท)',
    price: 35000,
    bedrooms: 1,
    bathrooms: 1,
    area_sqm: 48,
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    status: 'available', // available, reserved, rented, archived
    is_featured: true,
    near_bts: true
  },
  {
    id: 'prop-2',
    title: 'Nanthawan Bangna Luxury House',
    category: 'บ้านเดี่ยว',
    location: 'บางนา - ตราด กม.7',
    price: 120000,
    bedrooms: 4,
    bathrooms: 5,
    area_sqm: 350,
    image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    status: 'available',
    is_featured: true,
    near_bts: false
  },
  {
    id: 'prop-3',
    title: 'Life One Wireless Executive Penthouse',
    category: 'คอนโด',
    location: 'วิทยุ - ชิดลม (ใกล้ BTS เพลินจิต)',
    price: 45000,
    bedrooms: 2,
    bathrooms: 2,
    area_sqm: 65,
    image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    status: 'reserved',
    is_featured: true,
    near_bts: true
  },
  {
    id: 'prop-4',
    title: 'Pleno Modern Townhome Ratchapruek',
    category: 'ทาวน์โฮม',
    location: 'ราชพฤกษ์ - สาทร',
    price: 25000,
    bedrooms: 3,
    bathrooms: 2,
    area_sqm: 120,
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    status: 'rented',
    is_featured: false,
    near_bts: false
  },
  {
    id: 'prop-5',
    title: 'Noble Ploenchit Sky Villa',
    category: 'คอนโด',
    location: 'เพลินจิต (ติด BTS เพลินจิต)',
    price: 55000,
    bedrooms: 2,
    bathrooms: 2,
    area_sqm: 75,
    image_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    status: 'available',
    is_featured: true,
    near_bts: true
  },
  {
    id: 'prop-6',
    title: 'Grand Bangkok Boulevard Ekamai-Ramintra',
    category: 'บ้านเดี่ยว',
    location: 'เลียบด่วนรามอินทรา',
    price: 150000,
    bedrooms: 5,
    bathrooms: 6,
    area_sqm: 420,
    image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    status: 'available',
    is_featured: false,
    near_bts: false
  },
  {
    id: 'prop-7',
    title: 'Rhythm Sukhumvit 36-38 Minimalist Studio',
    category: 'คอนโด',
    location: 'ทองหล่อ - เอกมัย (ใกล้ BTS ทองหล่อ)',
    price: 28000,
    bedrooms: 1,
    bathrooms: 1,
    area_sqm: 35,
    image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    status: 'reserved',
    is_featured: false,
    near_bts: true
  },
  {
    id: 'prop-8',
    title: 'Baan Sansiri Pattanakarn Private Residence',
    category: 'บ้านเดี่ยว',
    location: 'พัฒนาการ 30',
    price: 200000,
    bedrooms: 5,
    bathrooms: 6,
    area_sqm: 550,
    image_url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    status: 'archived',
    is_featured: false,
    near_bts: false
  }
];

// Service functions to interact with Supabase or Fallback
export async function getProperties() {
  if (!supabase) {
    console.warn("Supabase credentials not found. Using client-side mock data fallback.");
    const saved = localStorage.getItem('parallax_space_properties') || localStorage.getItem('estate_studio_properties');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_PROPERTIES;
  }

  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data && data.length > 0 ? data : INITIAL_MOCK_PROPERTIES;
  } catch (err) {
    console.error("Error fetching from Supabase:", err.message);
    const saved = localStorage.getItem('parallax_space_properties') || localStorage.getItem('estate_studio_properties');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_PROPERTIES;
  }
}

export async function updatePropertyStatus(id, newStatus) {
  if (!supabase) {
    console.warn("Updating status in local state/localStorage (Supabase offline).");
    return { success: true };
  }

  try {
    const { data, error } = await supabase
      .from('properties')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Error updating Supabase property status:", err.message);
    return { success: false, error: err.message };
  }
}

export async function addProperty(newProp) {
  if (!supabase) {
    console.warn("Adding property in local state/localStorage (Supabase offline).");
    return { success: true, data: { ...newProp, id: `prop-${Date.now()}` } };
  }

  try {
    const { data, error } = await supabase
      .from('properties')
      .insert([newProp])
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (err) {
    console.error("Error adding property to Supabase:", err.message);
    return { success: false, error: err.message };
  }
}

export async function deleteProperty(id) {
  if (!supabase) {
    console.warn("Deleting property in local state/localStorage (Supabase offline).");
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Error deleting property from Supabase:", err.message);
    return { success: false, error: err.message };
  }
}

export const INITIAL_MOCK_BOOKINGS = [
  {
    id: 'book-1',
    propertyTitle: 'Ashton Asoke Modern Luxury Suite',
    name: 'สมชาย มั่นคง',
    phone: '081-234-5678',
    moveInDate: '2026-07-15',
    note: 'สนใจสัญญาเช่า 1 ปี ต้องการที่จอดรถ 1 คัน',
    status: 'pending',
    createdAt: '2026-06-29 14:30'
  },
  {
    id: 'book-2',
    propertyTitle: 'Life One Wireless Executive Penthouse',
    name: 'สิรินธร สุขสวัสดิ์',
    phone: '089-876-5432',
    moveInDate: '2026-08-01',
    note: 'ขอนัดชมห้องช่วงวันเสาร์ช่วงบ่าย',
    status: 'contacted',
    createdAt: '2026-06-28 10:15'
  }
];

export async function getBookings() {
  const saved = localStorage.getItem('parallax_space_bookings');
  return saved ? JSON.parse(saved) : INITIAL_MOCK_BOOKINGS;
}

export async function addBooking(newBooking) {
  const current = await getBookings();
  const created = {
    ...newBooking,
    id: `book-${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })
  };
  const updated = [created, ...current];
  localStorage.setItem('parallax_space_bookings', JSON.stringify(updated));
  return { success: true, data: created };
}

export async function updateBookingStatus(id, newStatus) {
  const current = await getBookings();
  const updated = current.map(b => b.id === id ? { ...b, status: newStatus } : b);
  localStorage.setItem('parallax_space_bookings', JSON.stringify(updated));
  return { success: true };
}

export async function deleteBooking(id) {
  const current = await getBookings();
  const updated = current.filter(b => b.id !== id);
  localStorage.setItem('parallax_space_bookings', JSON.stringify(updated));
  return { success: true };
}


