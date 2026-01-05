# Hastane Yönetim Sistemi API

Hastane Yönetim Sistemi, bir hastanenin temel operasyonlarını (Hasta, Doktor, Bölüm, Randevu ve Reçete yönetimi) yönetmek için tasarlanmış profesyonel bir RESTful API'dir.

[![codecov](https://codecov.io/gh/iremsrll/hastane-yonetim-sistemi/graph/badge.svg?token=EAIYJYVPOH)](https://codecov.io/gh/iremsrll/hastane-yonetim-sistemi)

![Build Status](https://github.com/iremsrll/hastane-yonetim-sistemi/actions/workflows/main.yml/badge.svg)

## Özellikler

- 5 farklı ana kaynak yönetimi (Patients, Doctors, Departments, Appointments, Prescriptions)
- İlişkisel veri modelleri ve tam CRUD desteği
- %60+ kod kapsamı ile kapsamlı test altyapısı
- Swagger/OpenAPI dokümantasyonu
- CI/CD pipeline entegrasyonu
- TypeORM ile veritabanı yönetimi

## Teknolojiler

- **Framework:** NestJS
- **ORM:** TypeORM
- **Veritabanı:** MS SQL Server (Production), SQLite (Test)
- **Dokümantasyon:** Swagger (OpenAPI)
- **Test:** Jest & Supertest
- **CI/CD:** GitHub Actions & Codecov

## Kurulum

Projeyi klonlayın:
```bash
git clone https://github.com/iremsrll/hastane-yonetim-sistemi.git
cd hastane-yonetim-sistemi
```

Bağımlılıkları yükleyin:
```bash
npm install
```

`.env` dosyası oluşturun ve veritabanı bilgilerinizi girin:
```env
DB_TYPE=mssql
DB_HOST=localhost\SQLEXPRESS
DB_USER=sa
DB_PASS=Sifreniz
DB_NAME=HastaneYonetimDB
```

Uygulamayı başlatın:
```bash
npm run start:dev
```

API dokümantasyonuna http://localhost:3000/api-docs adresinden erişebilirsiniz.

## Kullanım

### API Endpoints

**Departments (Bölümler)**
```bash
GET    /departments      # Tüm bölümleri listele
GET    /departments/:id  # Belirli bir bölümü getir
POST   /departments      # Yeni bölüm oluştur
PUT    /departments/:id  # Bölüm güncelle
DELETE /departments/:id  # Bölüm sil
```

**Doctors (Doktorlar)**
```bash
GET    /doctors      # Tüm doktorları listele
GET    /doctors/:id  # Belirli bir doktoru getir
POST   /doctors      # Yeni doktor oluştur
PUT    /doctors/:id  # Doktor güncelle
DELETE /doctors/:id  # Doktor sil
```

**Patients (Hastalar)**
```bash
GET    /patients      # Tüm hastaları listele
GET    /patients/:id  # Belirli bir hastayı getir
POST   /patients      # Yeni hasta kaydet
PUT    /patients/:id  # Hasta güncelle
DELETE /patients/:id  # Hasta sil
```

**Appointments (Randevular)**
```bash
GET    /appointments      # Tüm randevuları listele
GET    /appointments/:id  # Belirli bir randevuyu getir
POST   /appointments      # Yeni randevu oluştur
PUT    /appointments/:id  # Randevu güncelle
DELETE /appointments/:id  # Randevu iptal et
```

**Prescriptions (Reçeteler)**
```bash
GET    /prescriptions      # Tüm reçeteleri listele
GET    /prescriptions/:id  # Belirli bir reçeteyi getir
POST   /prescriptions      # Yeni reçete oluştur
PUT    /prescriptions/:id  # Reçete güncelle
DELETE /prescriptions/:id  # Reçete sil
```

### Örnek İstek

Yeni bir hasta oluşturma:
```bash
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -d '{
    "patientsName": "İrem Saral",
    "identityNumber": "123456789",
  }'
```

## Testler

Tüm testleri çalıştırın:
```bash
npm run test
```

Kod kapsamı raporunu görüntüleyin:
```bash
npm run test:cov
```

E2E testlerini çalıştırın:
```bash
npm run test:e2e
```

## Veri Modeli

Sistem şu ilişkisel yapıya sahiptir:

- **Department → Doctor** (1-N): Bir bölümde birden fazla doktor çalışabilir
- **Patient → Appointment** (1-N): Bir hastanın birden fazla randevusu olabilir
- **Doctor → Appointment** (1-N): Bir doktorun birden fazla randevusu olabilir
- **Appointment → Prescription** (1-1): Her randevunun bir reçetesi olabilir

## Lisans

[MIT](https://choosealicense.com/licenses/mit/)

## İletişim

İrem Saral - [@iremsrll](https://github.com/iremsrll)

Proje Linki: [https://github.com/iremsrll/hastane-yonetim-sistemi](https://github.com/iremsrll/hastane-yonetim-sistemi)