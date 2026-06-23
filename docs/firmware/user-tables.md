# User Tables

User Tables adalah **tabel lookup kustom** yang dapat diisi sendiri oleh pengguna dan digunakan sebagai sumber nilai dalam konfigurasi ECU.

Berguna saat diperlukan koreksi atau pemetaan nilai yang tidak tersedia di tabel bawaan TunerStudio, misalnya konversi tekanan sensor non-standar atau koreksi berbasis RPM.

---

## Cara Kerja

Setiap User Table adalah tabel 2D (sumbu X dan nilai Y) yang dapat diisi secara bebas. Nilai pada tabel dapat direferensikan di bagian konfigurasi lain yang mendukung input tabel kustom.

---

## Konfigurasi di TunerStudio

Buka: **Advanced → User Tables**

Tersedia beberapa tabel kustom. Untuk setiap tabel:

| Parameter | Keterangan |
|---|---|
| **Input (sumbu X)** | Channel ECU yang digunakan sebagai input tabel (RPM, MAP, TPS, dll.) |
| **Table Values** | Nilai output untuk setiap titik di sumbu X |
| **Output Range** | Rentang nilai output |

Setelah tabel dikonfigurasi, pilih **User Table N** sebagai sumber nilai di bagian konfigurasi yang mendukung.

---

## Contoh

**Koreksi injeksi berdasarkan tekanan bahan bakar:**

| RPM (X) | Koreksi (%) |
|---|---|
| 1000 | 0 |
| 2000 | 2 |
| 4000 | 5 |
| 6000 | 8 |

Tabel ini kemudian dipilih sebagai input koreksi di konfigurasi fuel injection.
