# Panduan Deploy TersedakCare ke Vercel

## Prasyarat
- Akun GitHub (untuk push repository)
- Akun Vercel (gratis di https://vercel.com)
- Tabel Supabase sudah dibuat

---

## Langkah 1: Push ke GitHub

### 1.1 Inisialisasi Git (jika belum)
```bash
cd d:\Intechrest\TersedakCare
git init
```

### 1.2 Pastikan .gitignore sudah benar
File `.gitignore` harus berisi:
```
node_modules
.next
.env
.env.local
```

### 1.3 Commit dan Push
```bash
git add .
git commit -m "Initial commit - TersedakCare"
git branch -M main
git remote add origin https://github.com/USERNAME/TersedakCare.git
git push -u origin main
```

> **Ganti `USERNAME`** dengan username GitHub Anda

---

## Langkah 2: Deploy ke Vercel

### 2.1 Login ke Vercel
1. Buka https://vercel.com
2. Klik **"Sign Up"** atau **"Log In"**
3. Pilih **"Continue with GitHub"**

### 2.2 Import Project
1. Klik **"Add New..."** → **"Project"**
2. Pilih repository **TersedakCare** dari daftar
3. Klik **"Import"**

### 2.3 Konfigurasi Project
1. **Framework Preset**: Otomatis terdeteksi sebagai "Next.js"
2. **Root Directory**: Biarkan kosong (default)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)

### 2.4 Environment Variables (PENTING!)
Klik **"Environment Variables"** dan tambahkan:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | *(URL dari Supabase Dashboard)* |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(Anon Key dari Supabase Dashboard)* |
| `SUPABASE_SERVICE_ROLE_KEY` | *(Service Role Key dari Supabase Dashboard)* |
| `JWT_SECRET` | *(Buat string acak yang kuat, minimal 32 karakter)* |

> ⚠️ **JANGAN** commit keys ke repository! Gunakan environment variables saja.

### 2.5 Mendapatkan Keys dari Supabase
1. Buka https://supabase.com/dashboard
2. Pilih project Anda
3. Pergi ke **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 2.6 Deploy
1. Klik **"Deploy"**
2. Tunggu proses build (±2-5 menit)
3. Setelah selesai, Anda akan mendapat URL seperti:
   - `tersedakcare.vercel.app`

---

## Langkah 3: Setup Supabase (Jika Belum)

### 3.1 Buat Tabel di Supabase
1. Buka Supabase Dashboard → SQL Editor
2. Copy isi file `supabase_schema.sql`
3. Paste dan klik **"Run"**

### 3.2 Periksa Tabel
Pastikan tabel berikut sudah dibuat:
- `users`
- `learning_progress`
- `quiz_results`
- `completed_modules`
- `bookmarks`

---

## Langkah 4: Testing Production

1. Buka URL Vercel Anda
2. Test register akun baru
3. Test login
4. Test progress belajar tersimpan
5. Test assessment

---

## Troubleshooting

### Build Error
- Periksa log build di Vercel Dashboard
- Pastikan semua environment variables sudah diisi

### Database Error
- Pastikan tabel Supabase sudah dibuat
- Periksa Supabase URL dan keys sudah benar

### Login Tidak Berfungsi
- Pastikan `JWT_SECRET` sudah diset di Vercel
- Clear cookies browser dan coba lagi

---

## Update Deployment

Setiap kali push ke GitHub `main` branch, Vercel akan otomatis deploy ulang:

```bash
git add .
git commit -m "Update fitur XYZ"
git push origin main
```

Vercel akan otomatis build dan deploy! 🚀
