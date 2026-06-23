# Logic Outputs

Logic Outputs adalah **output digital yang dikontrol secara otomatis** berdasarkan kondisi logika yang dapat dikonfigurasi — tanpa perlu Lua scripting.

Berguna untuk mengaktifkan relay, lampu indikator, atau sinyal output berdasarkan kondisi engine seperti RPM, suhu, tekanan, atau kombinasi keduanya.

---

## Cara Kerja

Setiap Logic Output memiliki kondisi yang dievaluasi secara real-time. Jika kondisi terpenuhi, output pin menjadi aktif (HIGH). Jika tidak, pin menjadi tidak aktif (LOW).

---

## Konfigurasi di TunerStudio

Buka: **Outputs → Logic Outputs**

Untuk setiap Logic Output:

| Parameter | Keterangan |
|---|---|
| **Output Pin** | Pin ECU yang akan dikontrol |
| **Condition** | Ekspresi logika yang menentukan kapan output aktif |
| **Active High/Low** | Polaritas output pin |
| **Hysteresis** | Rentang histeresis untuk mencegah chatter |

### Operator Kondisi

| Simbol | Keterangan |
|---|---|
| `>` `<` `>=` `<=` `==` | Perbandingan nilai |
| `&&` | AND (kedua kondisi harus benar) |
| `\|\|` | OR (salah satu kondisi cukup) |
| `!` | NOT (kebalikan kondisi) |

---

## Contoh

**Aktifkan kipas pendingin saat CLT > 90°C:**
```
Condition: clt > 90
Hysteresis: 5   (mati saat CLT turun ke 85°C)
```

**Aktifkan lampu warning saat RPM > 6500 DAN MAP > 150 kPa:**
```
Condition: rpm > 6500 && map > 150
```

**Aktifkan relay fuel pump saat engine running:**
```
Condition: rpm > 300
Hysteresis: 50
```
