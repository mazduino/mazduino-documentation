# Math Channels

Math Channels memungkinkan pembuatan **channel nilai kustom** berdasarkan perhitungan dari channel-channel yang sudah ada di ECU.

Berguna untuk menampilkan nilai turunan di gauge, melakukan logging nilai yang dihitung, atau menggunakan nilai hasil perhitungan sebagai input kondisi lain.

---

## Cara Kerja

Setiap Math Channel menerima ekspresi matematika yang mengombinasikan channel ECU yang tersedia. Hasilnya tersedia sebagai channel baru di gauge, datalog, dan kondisi output.

---

## Konfigurasi di TunerStudio

Buka: **Sensors → Math Channels** (atau **Advanced → Math Channels**)

Untuk setiap channel:

| Parameter | Keterangan |
|---|---|
| **Name** | Nama channel yang akan muncul di gauge/log |
| **Expression** | Ekspresi matematika menggunakan nama channel ECU |
| **Unit** | Satuan nilai hasil (opsional, untuk tampilan) |

### Operator yang Didukung

| Simbol | Fungsi |
|---|---|
| `+` `-` `*` `/` | Operasi dasar |
| `(` `)` | Pengelompokan |
| `min(a,b)` | Nilai minimum |
| `max(a,b)` | Nilai maksimum |
| `if(cond, a, b)` | Nilai bersyarat |

---

## Contoh

**Efisiensi volumetrik (VE) sederhana:**
```
expression: (map / baro) * 100
unit: %
```

**Beban mesin dari MAP dan RPM:**
```
expression: map * (rpm / 1000)
```

**Suhu rata-rata CLT dan IAT:**
```
expression: (clt + iat) / 2
unit: °C
```
