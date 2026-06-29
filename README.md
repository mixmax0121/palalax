# Parallax Space - Modern Real Estate Rental Platform 🏡🏢

โปรเจกต์เว็บปล่อยเช่าอสังหาริมทรัพย์ (บ้าน, คอนโด, ที่ดิน) ที่ออกแบบและพัฒนาโดยอ้างอิง UX/UI เลย์เอาต์สไตล์ **Interior Studio** ตอบโจทย์การใช้งานยุคใหม่ด้วยระบบเช็คสถานะห้องว่างแบบ Real-time, ระบบกรองข้อมูลสำหรับลูกค้า และระบบหลังบ้านสำหรับแอดมินในการเปลี่ยนสถานะห้องพัก

---

## 🌟 ฟีเจอร์หลัก (Features)

1. **Header Navigation**: โลโก้แบรนด์ทางซ้าย, เมนูกลาง (บ้าน, คอนโด, ทาวน์โฮม, สถานะห้องว่าง, ติดต่อเรา), ปุ่ม 'จองห้องพัก' ทางขวา และปุ่มสลับโหมดผู้ดูแลระบบ (Admin)
2. **Hero Section**: ข้อความพาดหัว *"ค้นหาห้องพักสไตล์โมเดิร์น พร้อมเข้าอยู่"* พร้อมช่องค้นหาทำเล/สถานีรถไฟฟ้า
3. **Highlighted Cards**: 3 การ์ดทางลัดแนวนอน
   - 🔑 **ว่างพร้อมอยู่** (เช็คสถานะ Real-time)
   - 🚆 **คอนโดใกล้รถไฟฟ้า**
   - 🏡 **บ้านเดี่ยวให้เช่า**
4. **4-Grid Property Showcase**: แสดงผลอสังหาฯ ในรูปแบบ Studio Grid 4 ช่อง พร้อม Tag สถานะชัดเจน:
   - 🟢 `available` (ว่างพร้อมอยู่) - แสดง Tag สีเขียว
   - 🟠 `reserved` (ติดจอง) - แสดง Tag สีส้ม/เหลือง
   - 🔴 `rented` (ปล่อยห้องแล้ว) - แสดง Tag สีแดง
   - ⚪ `archived` (ซ่อนข้อมูล) - สำหรับซ่อนไม่ให้แสดงบนหน้าหลัก
5. **Customer Filter System**: ลูกค้าสามารถเลือกติ๊กกรองดูเฉพาะห้องที่ 'ว่างพร้อมอยู่' หรือ 'ติดจอง' หรือแยกตามประเภทอสังหาฯ ได้ง่ายดาย
6. **Admin Management Panel**: หน้าหลังบ้านสำหรับ Admin ล็อกอินเข้ามาเปลี่ยนสถานะห้องพัก (`available` ➡️ `reserved` ➡️ `rented` ➡️ `archived`) ได้ทันทีด้วย 1-Click
7. **Featured Month Section**: ส่วนแนะนำ "ห้องยอดนิยมประจำเดือน" ที่ปรับจากเลย์เอาต์เดิม

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS, Lucide React Icons, Glassmorphism design
- **Backend / Database**: Supabase Client (`@supabase/supabase-js`)
- **Deployment**: Netlify Ready (`netlify.toml` redirects included)

---

## 🚀 ขั้นตอนการติดตั้งและใช้งาน (Installation & Setup)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโปรเจกต์บนเครื่องท้องถิ่น (Development)
```bash
npm run dev
```
*(ระบบมี Mock Data Fallback ในตัว สามารถเปิดทดลองใช้งานทุกฟีเจอร์ได้ทันทีแม้ยังไม่ได้เชื่อมต่อ Supabase!)*

---

## 🗄️ การตั้งค่าระบบฐานข้อมูล Supabase

1. สร้างโปรเจกต์ใหม่ใน [Supabase Dashboard](https://supabase.com)
2. ไปที่ **SQL Editor** ใน Supabase แล้วคัดลอกคำสั่งในไฟล์ `supabase_schema.sql` ไปวางเพื่อสร้างตาราง `properties` และข้อมูลเริ่มต้น
3. คัดลอก `Project URL` และ `anon public key` จาก Supabase (Settings > API)
4. สร้างไฟล์ `.env` ที่โฟลเดอร์หลักของโปรเจกต์:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 📦 การ Push ขึ้น GitHub & Deploy บน Netlify

### Git Push:
```bash
git init
git add .
git commit -m "Initial commit - Estate Studio Rental Platform"
git branch -M main
git remote add origin https://github.com/your-username/estate-studio-rental.git
git push -u origin main
```

### Netlify Deployment:
1. ล็อกอินเข้า Netlify แล้วกด **Import from Git**
2. เลือก Repository ของคุณ
3. Netlify จะตรวจพบ `netlify.toml` และตั้งค่า Build command (`npm run build`) และ Publish directory (`dist`) ให้อัตโนมัติ
4. ใส่ Environment Variables (`VITE_SUPABASE_URL` และ `VITE_SUPABASE_ANON_KEY`) ในส่วน **Site configuration > Environment variables**
5. กด **Deploy Site** ได้เลย!
