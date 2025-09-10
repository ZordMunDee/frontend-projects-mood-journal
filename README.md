# 🌙 Mood Journal

เว็บแอปพลิเคชันสำหรับบันทึกอารมณ์ประจำวัน พร้อมแสดงผลเป็นกราฟสรุป  
สร้างขึ้นด้วย **Next.js (App Router)** + **shadcn/ui** + **Tailwind CSS** + **Recharts**

---

## ✨ ฟีเจอร์หลัก

- 📝 บันทึกอารมณ์ + โน้ตสั้น ๆ
- 📅 เลือกวันที่และเวลาได้เอง
- 😀 Emoji อารมณ์ (มีความสุข, ตื่นเต้น, เฉย ๆ, กังวล, เศร้า, โกรธ)
- 📊 แสดงผลกราฟเส้น (Line Chart) ของค่าเฉลี่ยอารมณ์รายวัน
- 🔍 กรองตามช่วงวันที่และประเภทอารมณ์
- 💾 เก็บข้อมูลใน **LocalStorage** (ใช้งานได้ทันที ไม่ต้องมี backend)
- ⬇️ Export ข้อมูลเป็นไฟล์ CSV
- ⬆️ Import ข้อมูลจากไฟล์ CSV
- 🗑 ลบรายการทีละอัน หรือเคลียร์ทั้งหมดได้

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/) – React Framework
- [TypeScript](https://www.typescriptlang.org/) – Static Typing
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) – UI Components
- [Recharts](https://recharts.org/) – Chart Library
- [Lucide Icons](https://lucide.dev/) – Icon set

---

## 🚀 วิธีติดตั้งและใช้งาน

```bash
# 1. โคลน repo (ถ้ายังไม่มี)
git clone https://github.com/ZordMunDee/frontend-projects-mood-journal
cd mood-journal

# 2. ติดตั้ง dependencies
npm install

# 3. รัน development server
npm run dev

# 4. เปิดใช้งานที่
http://localhost:3000
```
