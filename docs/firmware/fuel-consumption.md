# Konsumsi Bahan Bakar

Fitur ini menghitung konsumsi bahan bakar secara real-time berdasarkan data injeksi dan kecepatan kendaraan.

---

## Output yang Tersedia

| Channel | Satuan | Keterangan |
|---|---|---|
| `fuelConsumptionL100km` | L/100km | Rata-rata konsumsi selama perjalanan |
| `fuelConsumptionLitersPerHour` | L/jam | Flow rate instan berdasarkan injeksi saat ini |

Kedua channel tersedia di TunerStudio sebagai gauge dan datalog channel.

---

## Konfigurasi di TunerStudio

Buka: **Controller → Fuel Consumption**

| Parameter | Keterangan |
|---|---|
| **Enable Fuel Consumption** | Aktifkan perhitungan konsumsi bahan bakar |
| **Fuel Density** | Densitas bahan bakar dalam g/L |

### Nilai Fuel Density

ECU Mazduino hanya mendukung mesin **bensin (gasoline)**.

| RON | Densitas (g/L) |
|---|---|
| 90 | 745 |
| 92 | 750 |
| 95 | 755 |
| 98 | 760 |
| 100+ | 765 |

Gunakan **750 g/L** sebagai default. Untuk data lebih lengkap, lihat referensi:

- [Engineering Toolbox — Fuels Density][engtoolbox-fuel]

> ⚠️ **Disclaimer**: Nilai di atas adalah estimasi dari data internet, **belum
> diuji di lapangan**. Jika memiliki data densitas pasti dari pengukuran atau
> spesifikasi resmi, sesuaikan di TunerStudio: **Controller → Fuel Consumption**.

[engtoolbox-fuel]: https://www.engineeringtoolbox.com/fuels-densities-specific-volumes-d_166.html

---

## Cara Kerja

ECU menghitung jumlah bahan bakar yang diinjeksikan per siklus berdasarkan pulsewidth injektor dan flow rate injektor yang sudah dikonfigurasi. Hasil injeksi (dalam gram) dikonversi ke volume menggunakan nilai **Fuel Density**.

- **L/100km** dihitung dari total volume terinjeksi dibagi jarak tempuh yang dihitung dari sinyal VSS (Vehicle Speed Sensor).
- **L/jam** dihitung dari flow rate injeksi saat ini dikonversi ke volume per jam.

Perhitungan L/100km membutuhkan VSS yang terkonfigurasi dan berjalan dengan benar.
