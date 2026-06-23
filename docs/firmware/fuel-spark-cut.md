# Spark Cut & Fuel Cut

ECU menyediakan channel monitoring **`totalSparkCut`** dan **`totalFuelCut`** yang menunjukkan persentase cut yang sedang aktif.

---

## Kegunaan

Channel ini berguna untuk:
- **Monitoring** di gauge TunerStudio — lihat seberapa besar cut sedang terjadi
- **Datalog** — rekam kapan dan berapa lama cut aktif selama pengujian

---

## Cara Menggunakan

Channel ini tersedia secara otomatis. Tambahkan ke gauge atau datalog:

1. Di TunerStudio, buka **Gauge Editor** atau **Data Log Fields**
2. Cari `totalSparkCut` atau `totalFuelCut`
3. Tambahkan ke dashboard atau log

### Nilai

| Nilai | Keterangan |
|---|---|
| `0` | Tidak ada cut aktif |
| `0.5` | 50% cut (setiap 2 siklus, 1 di-cut) |
| `1.0` | Full cut (semua siklus di-cut) |

---

## Penyebab Cut

Cut dapat dipicu oleh berbagai fitur: rev limiter, launch control, traction control, flat shift, atau kondisi proteksi mesin lainnya.
