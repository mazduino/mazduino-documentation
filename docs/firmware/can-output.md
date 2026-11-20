# CAN Output

CAN Output membuat ECU mengirim data engine ke bus CAN secara otomatis, untuk dashboard, datalogger, atau perangkat lain yang terhubung. Isi setiap byte frame bisa diatur sendiri.

Lokasi menu:

- TunerStudio: **CAN-bus → CAN Outputs → CAN Output 1–8** dan **CAN-bus → Triggered CAN Outputs → Triggered CAN Output 1–8**
- Mazduino Tuner: **CAN Bus → CAN outputs** dan **Expert → CAN-bus** (triggered)

!!! warning "Firmware sebelum Nightly 20 November 2026"
    Nightly 20 November 2026 berisi perbaikan untuk pilihan channel di **Variable**. Update ke firmware ini atau yang lebih baru; pengaturan di tune tidak perlu diubah.

---

## Jenis CAN Output

| Jenis | Kapan dikirim | Jumlah slot |
|---|---|---|
| **CAN Output** | Terus-menerus pada data rate yang dipilih | 8 |
| **Triggered CAN Output** | Satu kali setiap ada perubahan pada input pemicu | 8 |

CAN Output cocok untuk dashboard yang butuh data terus-menerus. Triggered CAN Output cocok untuk mengirim perintah atau event, misalnya tombol di kabin yang menyalakan sesuatu di modul CAN lain.

---

## Pengaturan Frame

### CAN Output

| Field | Keterangan |
|---|---|
| **Enable mode** | **Enabled** untuk mengirim, **Disabled** untuk mematikan slot ini. Pilihan "Enabled via Logic output" belum berfungsi: frame tidak dikirim. |
| **CAN ID** | ID frame, desimal atau hex dengan awalan `0x`. ID 0 tidak dikirim. ID di atas `0x7FF` dikirim sebagai extended ID (29-bit). |
| **CAN Bus** | CAN 1 atau CAN 2 |
| **Byte order** | Urutan byte untuk nilai 16-bit: Little endian (byte rendah dulu) atau Big endian (byte tinggi dulu) |
| **DLC** | Panjang frame, 1–8 byte |
| **Data rate** | 1, 2, 4, 5, 10, 20, 50, 100, atau 200 Hz |

### Triggered CAN Output

Field CAN ID, CAN Bus, Byte order, dan DLC sama seperti di atas. Ditambah:

| Field | Keterangan |
|---|---|
| **Trigger input** | Pin input pemicu. Bisa pin fisik atau CAN Switch dari [CAN Virtual Input](can-virtual-input.md). |
| **Trigger input mode** | Mode pin. Untuk switch yang menghubungkan pin ke ground, pilih **INVERTED PULLUP**. |
| **Trigger edge** | **Rising edge**: kirim saat input menjadi aktif. **Falling edge**: kirim saat input berhenti aktif. **Both edges**: kirim pada keduanya. |

Input pemicu di-debounce 150 ms. Tombol **Send frame** di dialog mengirim frame itu sekali secara manual, untuk mengetes tanpa menekan switch.

---

## Isi Byte

Setiap byte diatur dengan kolom berikut:

| Kolom | Keterangan |
|---|---|
| **Type** | **Fixed 8-bit** / **Fixed 16-bit**: nilai tetap. **Variable 8-bit** / **Variable 16-bit**: nilai dari channel ECU. Tipe 16-bit memakai dua byte, sehingga byte sesudahnya tidak bisa diisi. |
| **Variable** | Channel ECU yang dikirim (untuk tipe Variable) |
| **Fixed value** | Nilai tetap (untuk tipe Fixed) |
| **Multiplier** | Pengali, bilangan bulat |
| **Divider** | Pembagi, bilangan bulat |
| **Offset** | Nilai yang ditambahkan, bilangan bulat, boleh negatif |

Nilai yang dikirim:

```
nilai = channel × Multiplier ÷ Divider + Offset
```

Hasilnya dibulatkan, lalu dibatasi ke 0–255 untuk 8-bit atau 0–65535 untuk 16-bit. **Nilai negatif dikirim sebagai 0**, jadi untuk data yang bisa negatif (misalnya CLT di bawah 0 °C) tambahkan Offset supaya hasilnya selalu positif. Penerima lalu mengurangi offset yang sama.

Kalau channel tidak tersedia (sensornya tidak terpasang), nilainya dihitung sebagai 0.

### Channel yang Bisa Dipilih

Daftar di **Variable** berisi channel engine, sensor, tegangan mentah sensor, status AC dan cut, VVT, knock, Lua gauge, CAN switch, dan lainnya.

Mulai Nightly 20 November 2026, di akhir daftar ada tambahan:

- **Analog multi-switch position 1–4** dan **Analog multi-switch voltage 1–4**, dari [Analog Multi-Switch](analog-multi-switch.md)
- **Fuel consumption L/100km** dan **Fuel consumption L/h**, dari [Konsumsi Bahan Bakar](fuel-consumption.md)

**Vehicle speed front left/right** dan **rear left/right** ada di daftar, tapi firmware Mazduino belum punya sensor kecepatan per roda, jadi nilainya selalu 0. Pakai **Vehicle speed**.

---

## Contoh: RPM, CLT, dan TPS ke Dashboard

CAN Output 1, CAN ID `0x600`, 20 Hz, DLC 4, Little endian:

| Byte | Type | Variable | Multiplier | Divider | Offset | Hasil |
|---|---|---|---|---|---|---|
| 1–2 | Variable 16-bit | RPM | 1 | 1 | 0 | RPM apa adanya, 0–65535 |
| 3 | Variable 8-bit | CLT | 1 | 1 | 40 | CLT + 40: -40 °C terkirim 0, 90 °C terkirim 130 |
| 4 | Variable 8-bit | TPS1 | 1 | 1 | 0 | TPS dalam %, 0–100 |

Di dashboard: RPM = byte 1 + byte 2 × 256, CLT = byte 3 − 40, TPS = byte 4.

Untuk resolusi lebih halus, misalnya AFR dengan satu angka desimal, pakai Multiplier 10 dengan Variable 16-bit (AFR 14.7 terkirim 147), lalu bagi 10 di penerima.

---

## Tidak Terkirim? Cek Ini

1. **Enable mode** = Enabled, bukan "Enabled via Logic output".
2. **CAN ID** tidak 0.
3. **CAN Bus** sesuai dengan bus yang tersambung ke perangkat penerima, dan bus itu sudah aktif di **CAN Bus Settings**.
4. Baud rate CAN ECU sama dengan perangkat penerima.
5. Nilai yang diterima tidak sesuai channel? Pastikan firmware Nightly 20 November 2026 atau lebih baru (lihat peringatan di atas).
