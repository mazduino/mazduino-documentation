# Rekomendasi Ukuran Kabel Harness

## Pengantar

Halaman ini berisi rekomendasi ukuran kabel (luas penampang, mm²) untuk setiap pin konektor ECU Mazduino, beserta rekap jumlah kabel yang dibutuhkan tiap ukuran.

Berlaku untuk versi berikut:

- [Mazduino LITE v0.2](mazduino-lite-v0.2.md)
- [Mazduino Compact 4CH v2.5](mazduino-compact-4ch-v2.5.md)
- [Mazduino Mini 6CH v1.3C](mazduino-mini-6ch-v1.3c.md)

> **Disclaimer**
>
> Angka pada halaman ini adalah **rekomendasi dasar sebagai titik awal**, bukan ketentuan mutlak. Kebutuhan sebenarnya tetap harus disesuaikan dengan kondisi masing-masing mesin dan instalasi, karena dipengaruhi oleh:
>
> - **Panjang harness** — semakin panjang jarak ECU ke komponen, semakin besar ukuran kabel yang dibutuhkan, terutama pada jalur power dan ground. Tabel di halaman ini mengasumsikan panjang maksimal sekitar 3 meter.
> - **Spesifikasi aktuator yang dipakai** — injector low-impedance, solenoid idle besar, ETB non-standar, atau koil dengan kebutuhan arus tinggi bisa memerlukan ukuran di atas rekomendasi.
> - **Kondisi lingkungan** — suhu ruang mesin, kepadatan bundel harness, dan kedekatan dengan sumber panas mempengaruhi kemampuan hantar kabel.
> - **Jenis dan kualitas kabel** — rating suhu, jumlah serabut, dan kemurnian tembaga berbeda antar merek.
>
> Selalu periksa kembali terhadap spesifikasi komponen yang benar-benar Anda pasang. Bila ragu, naikkan satu tingkat ukuran — terutama pada jalur power, ground, dan output aktuator. Tanggung jawab atas hasil akhir instalasi tetap ada pada pemasang.

> Ukuran terbesar yang dibutuhkan di sisi konektor ECU adalah **0.85 mm²** (atau 0.75 mm², keduanya 18 AWG dan bisa dipilih salah satu). Kabel yang lebih besar dari itu hanya diperlukan di luar ECU (aki, ground mesin, feed koil dan pompa) — lihat bagian [Kabel di Luar ECU](#kabel-di-luar-ecu).

## Ukuran Berdasarkan Fungsi Pin

| Ukuran | AWG | Dipakai untuk |
|--------|-----|---------------|
| **0.3 mm²** | 22 AWG | Input sensor analog (MAP, TPS, IAT, CLT, O2, spare, PPS, TPS2), input digital (AC switch, VSS, clutch), trigger CKP/CMP/VR (shielded), knock (shielded), CAN (twisted pair), output tacho |
| **0.5 mm²** | 20 AWG | Sinyal ignition, 5V referensi, ground sensor, output relay, injector, idle valve, stepper, high side switching, power pada konektor CAN |
| **0.75 / 0.85 mm²** | 18 AWG | Suplai 12V ECU (fuse 5-7.5 A), ground ECU, ETB, ignition dan ground coil pada mode IGBT internal |

Catatan pemakaian:

- **0.3 mm²** boleh diganti **0.5 mm²** kapan saja bila Anda ingin menyederhanakan stok atau menginginkan kabel yang lebih kuat menahan getaran. Yang tidak boleh adalah kebalikannya — jangan memakai 0.3 mm² untuk pin output, 5V, atau ground.
- **Trigger dan knock** tetap wajib memakai **kabel shielded** (twisted pair untuk VR), ukuran 0.3 mm² sudah cukup. Shield di-ground **hanya di sisi ECU**.
- **CAN Bus** yang menentukan bukan ukuran kabel melainkan **twisted pair dengan impedansi 120 ohm** dan resistor terminator di kedua ujung jaringan. Ukuran 0.3 mm² sudah cukup — kabel CAN otomotif pabrikan umumnya 0.35 mm². Pin power pada konektor CAN tetap 0.5 mm² karena mengikuti kebutuhan perangkat yang disuplai (dash, gauge, dan sejenisnya).
- **0.75 dan 0.85 mm² sama-sama 18 AWG**, selisihnya tipis. Pilih salah satu saja sesuai yang tersedia di toko — tidak perlu menyetok keduanya.
- **Ground ECU wajib diambil langsung dari negatif aki**, jangan dari ground bodi atau blok mesin. Jangan dikecilkan dari ukuran ini, dan pakai **semua** pin ground yang tersedia.
- **Ground coil justru diambil langsung dari blok mesin**, bukan disatukan dengan ground ECU. Jalur ini membawa noise dari pengapian, jadi harus dipisah agar tidak mengotori referensi ECU.
- **Ground sensor dipisah dari ground power**, jangan digabung dalam satu titik dengan ground injector dan ignition.
- Gunakan kabel otomotif thin-wall (**AVSS / AVSSF / TXL / GXL**) rating minimal 105°C, tembaga murni. Hindari CCA dan kabel instalasi rumah (NYAF).

### Aturan Grounding

Titik pengambilan ground sama pentingnya dengan ukuran kabelnya. Ketiga jalur ini **tidak boleh disatukan**:

| Jalur ground | Diambil dari | Alasan |
|--------------|--------------|--------|
| **Ground ECU (power/input)** | **Negatif aki, langsung** | Referensi ECU harus bersih dan stabil. Ground bodi atau blok mesin membawa tegangan liar dari starter, alternator, dan pengapian |
| **Ground coil pengapian** | **Blok mesin, langsung** | Jalur ini membawa noise pengapian. Dipisah agar tidak mengotori referensi ECU |
| **Ground sensor** | **Pin ground sensor pada ECU** | Referensi pembacaan analog, tidak boleh dilewati arus injector atau ignition |

Jangan mengambil ground ECU dari baut bodi, dudukan mesin, atau titik ground bersama dengan beban lain.

---

## Mazduino LITE v0.2 (Konektor 33-Pin)

Tabel berikut memakai mode **Smart Coil** (jumper JP3/JP4). Untuk mode **IGBT internal**, lihat catatan di kolom paling kanan.

| Pin | Fungsi | Ukuran Kabel | Catatan |
|-----|--------|--------------|---------|
| 1 | Idle 1 | 0.5 mm² | — |
| 2 | Idle 2 | 0.5 mm² | — |
| 3 | CKP / Digital1 | 0.3 mm² | Shielded, shield di-ground sisi ECU |
| 4 | VR1- | 0.3 mm² | Shielded twisted pair dengan pin 27 |
| 5 | Ignition 1 | 0.5 mm² | Mode IGBT: 0.75 / 0.85 mm² |
| 6 | Main Relay | 0.5 mm² | — |
| 7 | Ground Coil | 0.75 / 0.85 mm² | Langsung ke blok mesin, jangan disatukan dengan ground ECU |
| 8 | Tacho / RPM | 0.3 mm² | — |
| 9 | Ignition 2 | 0.5 mm² | Mode IGBT: 0.75 / 0.85 mm² |
| 10 | +5V | 0.5 mm² | — |
| 11 | +12V | 0.75 / 0.85 mm² | Fuse 5-7.5 A |
| 12 | Injector 3 | 0.5 mm² | — |
| 13 | Injector 4 | 0.5 mm² | — |
| 14 | CMP / Digital2 | 0.3 mm² | Shielded |
| 15 | VR2- | 0.3 mm² | Shielded twisted pair dengan pin 16 |
| 16 | VR2+ | 0.3 mm² | Shielded twisted pair dengan pin 15 |
| 17 | AC Relay | 0.5 mm² | — |
| 18 | Fuel Pump Relay | 0.5 mm² | Sinyal ke relay, bukan power pompa |
| 19 | Fan Relay | 0.5 mm² | Sinyal ke relay, bukan power kipas |
| 20 | IAT | 0.3 mm² | — |
| 21 | TPS | 0.3 mm² | — |
| 22 | Ground ECU | 0.75 / 0.85 mm² | **Langsung ke negatif aki**, bukan ke bodi atau blok mesin |
| 23 | Injector 2 | 0.5 mm² | — |
| 24 | Injector 1 | 0.5 mm² | — |
| 25 | Ground Sensor | 0.5 mm² | Pisahkan dari ground power pin 22 |
| 26 | Ground Sensor | 0.5 mm² | Pisahkan dari ground power pin 22 |
| 27 | VR1+ | 0.3 mm² | Shielded twisted pair dengan pin 4 |
| 28 | MAP | 0.3 mm² | — |
| 29 | Clutch / Digital3 | 0.3 mm² | — |
| 30 | CLT | 0.3 mm² | — |
| 31 | AC Switch Input | 0.3 mm² | Aktif ground |
| 32 | VSS / Digital4 | 0.3 mm² | — |
| 33 | O2 Sensor | 0.3 mm² | Dari wideband controller |

### Konektor CAN Bus 4-Pin (LITE v0.2)

| Pin | Fungsi | Ukuran Kabel |
|-----|--------|--------------|
| 1 | Power (12V/5V) | 0.5 mm² |
| 2 | CAN Low | 0.3 mm² (twisted pair dengan pin 3) |
| 3 | CAN High | 0.3 mm² (twisted pair dengan pin 2) |
| 4 | Ground | 0.5 mm² |

### Rekap Jumlah Kabel LITE v0.2

**Mode Smart Coil (default):**

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.3 mm² | 15 kabel | 3, 4, 8, 14, 15, 16, 20, 21, 27, 28, 29, 30, 31, 32, 33 |
| 0.5 mm² | 15 kabel | 1, 2, 5, 6, 9, 10, 12, 13, 17, 18, 19, 23, 24, 25, 26 |
| 0.75 / 0.85 mm² | 3 kabel | 7, 11, 22 |
| **Total** | **33 kabel** | — |
| CAN Bus (opsional) | 2 kabel 0.3 mm² + 2 kabel 0.5 mm² | Konektor terpisah |

**Mode IGBT Internal:**

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.3 mm² | 15 kabel | 3, 4, 8, 14, 15, 16, 20, 21, 27, 28, 29, 30, 31, 32, 33 |
| 0.5 mm² | 13 kabel | 1, 2, 6, 10, 12, 13, 17, 18, 19, 23, 24, 25, 26 |
| 0.75 / 0.85 mm² | 5 kabel | 5, 7, 9, 11, 22 |
| **Total** | **33 kabel** | — |

---

## Mazduino Compact 4CH v2.5 (Konektor Yamaha 33-Pin)

| Pin | Fungsi | Ukuran Kabel | Catatan |
|-----|--------|--------------|---------|
| 1 | Injector 1 | 0.5 mm² | — |
| 2 | Injector 2 | 0.5 mm² | — |
| 3 | Injector 3 | 0.5 mm² | — |
| 4 | Injector 4 | 0.5 mm² | — |
| 5 | Idle 1 | 0.5 mm² | — |
| 6 | Tacho / RPM | 0.3 mm² | — |
| 7 | Fan | 0.5 mm² | Sinyal ke relay, bukan power kipas |
| 8 | 5V | 0.5 mm² | — |
| 9 | 12V | 0.75 / 0.85 mm² | Fuse 5-7.5 A |
| 10 | Main Relay | 0.5 mm² | — |
| 11 | GND | 0.75 / 0.85 mm² | Ground power, **langsung ke negatif aki** |
| 12 | Idle 2 | 0.5 mm² | — |
| 13 | Ignition 4 | 0.5 mm² | — |
| 14 | Ignition 3 | 0.5 mm² | — |
| 15 | Ignition 2 | 0.5 mm² | — |
| 16 | Ignition 1 | 0.5 mm² | — |
| 17 | Fuel Pump | 0.5 mm² | Sinyal ke relay, bukan power pompa |
| 18 | AC Compressor Relay | 0.5 mm² | — |
| 19 | CKP / Trigger 1 | 0.3 mm² | Shielded, shield di-ground sisi ECU |
| 20 | GND | 0.75 / 0.85 mm² | Dapat didedikasikan sebagai ground sensor (0.5 mm²) |
| 21 | GND / HS2 (Jumper) | 0.75 / 0.85 mm² (mode GND) / 0.5 mm² (mode HS2) | Sesuai konfigurasi jumper |
| 22 | HS1 | 0.5 mm² | Sinyal 12V, ke relay atau driver eksternal |
| 23 | CLT | 0.3 mm² | — |
| 24 | TPS | 0.3 mm² | — |
| 25 | O2 | 0.3 mm² | Dari wideband controller |
| 26 | MAP | 0.3 mm² | — |
| 27 | IAT | 0.3 mm² | — |
| 28 | Spare Analog Input | 0.3 mm² | — |
| 29 | CMP / Trigger 2 | 0.3 mm² | Shielded |
| 30 | Knock Sensor | 0.3 mm² | Shielded, shield di-ground sisi ECU |
| 31 | AC Switch Input | 0.3 mm² | Aktif ground |
| 32 | Clutch Switch | 0.3 mm² | — |
| 33 | VSS | 0.3 mm² | — |

> **High Side (pin 22 HS1, dan pin 21 bila mode HS2)**: output ini adalah **12V logic switching (sinyal)**, bukan output daya. **Jangan** menyambungkannya langsung ke solenoid, VVT solenoid, atau beban induktif lain — gunakan relay atau modul driver eksternal.

> **Ground**: pakai semua pin ground yang tersedia, dan **ambil langsung dari negatif aki** — bukan dari ground bodi atau blok mesin. Susunan yang rapi: pin 11 dan 21 sebagai ground power ke negatif aki, pin 20 didedikasikan sebagai ground sensor (0.5 mm²).

### Rekap Jumlah Kabel Compact 4CH v2.5

**Pin 21 sebagai GND (default):**

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.3 mm² | 13 kabel | 6, 19, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33 |
| 0.5 mm² | 16 kabel | 1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14, 15, 16, 17, 18, 22 |
| 0.75 / 0.85 mm² | 4 kabel | 9, 11, 20, 21 |
| **Total** | **33 kabel** | — |

**Pin 21 sebagai HS2:**

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.3 mm² | 13 kabel | 6, 19, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33 |
| 0.5 mm² | 17 kabel | 1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14, 15, 16, 17, 18, 21, 22 |
| 0.75 / 0.85 mm² | 3 kabel | 9, 11, 20 |
| **Total** | **33 kabel** | — |

---

## Mazduino Mini 6CH v1.3C (Konektor 48-Pin)

| Pin | Fungsi | Ukuran Kabel | Catatan |
|-----|--------|--------------|---------|
| 1 | 12V ECU | 0.75 / 0.85 mm² | Fuse 5-7.5 A |
| 2 | IDLE1 | 0.5 mm² | — |
| 3 | IDLE2 | 0.5 mm² | — |
| 4 | CANH | 0.3 mm² | Twisted pair dengan pin 21 |
| 5 | 5V | 0.5 mm² | — |
| 6 | AC-OUT / AC Compressor | 0.5 mm² | — |
| 7 | Fuel Pump | 0.5 mm² | Sinyal ke relay, bukan power pompa |
| 8 | Knock / PC13 | 0.3 mm² | Shielded, shield di-ground sisi ECU |
| 9 | VR1- | 0.3 mm² | Shielded twisted pair dengan pin 41 |
| 10 | VR2- | 0.3 mm² | Shielded twisted pair dengan pin 42 |
| 11 | Stepper B2 | 0.5 mm² | — |
| 12 | Stepper B1 | 0.5 mm² | — |
| 13 | Stepper A1 | 0.5 mm² | — |
| 14 | Stepper A2 | 0.5 mm² | — |
| 15 | Injector 5 | 0.5 mm² | — |
| 16 | Injector 6 | 0.5 mm² | — |
| 17 | Main Relay | 0.5 mm² | — |
| 18 | Spare Analog 1 / PPS1 | 0.3 mm² | — |
| 19 | VSS | 0.3 mm² | — |
| 20 | AC-IN / AC Switch | 0.3 mm² | Hanya menerima ground |
| 21 | CANL | 0.3 mm² | Twisted pair dengan pin 4 |
| 22 | GND | 0.75 / 0.85 mm² | Satu-satunya ground power, **langsung ke negatif aki** |
| 23 | FAN | 0.5 mm² | Sinyal ke relay, bukan power kipas |
| 24 | Ignition 6 | 0.5 mm² | — |
| 25 | Ignition 5 | 0.5 mm² | — |
| 26 | Ignition 1 | 0.5 mm² | — |
| 27 | Ignition 2 | 0.5 mm² | — |
| 28 | Ignition 3 | 0.5 mm² | — |
| 29 | Ignition 4 | 0.5 mm² | — |
| 30 | TPS | 0.3 mm² | — |
| 31 | MAP | 0.3 mm² | — |
| 32 | Injector 4 | 0.5 mm² | — |
| 33 | ETB- | 0.75 / 0.85 mm² | — |
| 34 | ETB+ | 0.75 / 0.85 mm² | — |
| 35 | Spare Analog 2 / PPS2 | 0.3 mm² | — |
| 36 | Clutch | 0.3 mm² | — |
| 37 | GND Sensor | 0.5 mm² | Pisahkan dari ground power pin 22 |
| 38 | GND Sensor | 0.5 mm² | Pisahkan dari ground power pin 22 |
| 39 | RPM / Tacho | 0.3 mm² | — |
| 40 | Spare Input 3 / TPS2 | 0.3 mm² | — |
| 41 | VR1+ | 0.3 mm² | Shielded twisted pair dengan pin 9 |
| 42 | VR2+ | 0.3 mm² | Shielded twisted pair dengan pin 10 |
| 43 | O2 | 0.3 mm² | Dari wideband controller |
| 44 | IAT | 0.3 mm² | — |
| 45 | CLT | 0.3 mm² | — |
| 46 | Injector 2 | 0.5 mm² | — |
| 47 | Injector 1 | 0.5 mm² | — |
| 48 | Injector 3 | 0.5 mm² | — |

> **Pin 22 (GND)**: Mini 6CH v1.3C hanya punya **satu pin ground power** untuk seluruh output low-side. Sambungkan **langsung ke negatif aki**, jangan ke ground bodi atau blok mesin. Ground sensor (pin 37, 38) tetap dipisah dari pin ini.

### Rekap Jumlah Kabel Mini 6CH v1.3C

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.3 mm² | 19 kabel | 4, 8, 9, 10, 18, 19, 20, 21, 30, 31, 35, 36, 39, 40, 41, 42, 43, 44, 45 |
| 0.5 mm² | 25 kabel | 2, 3, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 23, 24, 25, 26, 27, 28, 29, 32, 37, 38, 46, 47, 48 |
| 0.75 / 0.85 mm² | 4 kabel | 1, 22, 33, 34 |
| **Total** | **48 kabel** | — |

Penyesuaian bila ada pin yang tidak dipakai:

- **Tanpa ETB** (pin 33, 34 kosong): 0.75 / 0.85 mm² turun menjadi **2 kabel**, total 46 kabel.
- **Tanpa stepper idle** (pin 11-14 kosong): 0.5 mm² turun menjadi **21 kabel**, total 44 kabel.

---

## Ringkasan Tiga Tipe

| Ukuran | LITE v0.2 | Compact 4CH v2.5 | Mini 6CH v1.3C |
|--------|-----------|------------------|----------------|
| 0.3 mm² (22 AWG) | 15 | 13 | 19 |
| 0.5 mm² (20 AWG) | 15 | 16 | 25 |
| 0.75 / 0.85 mm² (18 AWG) | 3 | 4 | 4 |
| **Total pin konektor** | **33** | **33** | **48** |

Konfigurasi default: LITE mode Smart Coil, Compact pin 21 sebagai GND.

Bila 0.3 mm² diganti 0.5 mm² untuk menyederhanakan stok:

| Ukuran | LITE v0.2 | Compact 4CH v2.5 | Mini 6CH v1.3C |
|--------|-----------|------------------|----------------|
| 0.5 mm² | 30 | 29 | 44 |
| 0.75 / 0.85 mm² | 3 | 4 | 4 |
| **Total** | **33** | **33** | **48** |

## Estimasi Panjang Kabel

Perkiraan kebutuhan belanja dengan rata-rata 1.5 meter per kabel sinyal dan 2 meter per kabel power/ground:

| Ukuran | LITE v0.2 | Compact 4CH v2.5 | Mini 6CH v1.3C |
|--------|-----------|------------------|----------------|
| 0.3 mm² | ~23 m | ~20 m | ~29 m |
| 0.5 mm² | ~23 m | ~24 m | ~38 m |
| 0.75 / 0.85 mm² | ~6 m | ~8 m | ~8 m |

Tambahkan cadangan 20% untuk kesalahan potong dan service loop. Untuk ukuran 18 AWG beli minimal 10 meter karena kebutuhannya sedikit dan sisanya berguna untuk perbaikan.

## Kabel di Luar ECU

Kabel berikut **tidak lewat pin ECU** dan ukurannya jauh lebih besar. Jangan disamakan dengan tabel di atas.

| Jalur | Ukuran |
|-------|--------|
| Aki ke main relay / fuse box | 4.0 - 6.0 mm² |
| Ground aki ke blok mesin | 8.0 - 16.0 mm² |
| Ground blok mesin ke bodi/chassis | 6.0 - 8.0 mm² |
| +12V feed ke rail injector (dari relay) | 1.25 - 2.0 mm² |
| +12V feed ke koil pengapian (dari relay) | 2.0 mm² |
| Ground koil pengapian ke blok mesin | 2.0 - 3.0 mm² |
| Ground ECU ke negatif aki | mengikuti tabel pin ECU |
| Power pompa bahan bakar (dari relay) | 1.25 - 2.0 mm² |
| Power kipas radiator (dari relay) | 2.0 - 3.0 mm² |
| Power O2 heater wideband | 1.25 mm² |

## Praktik Terminasi

- Gunakan **crimp**, bukan solder, pada terminal konektor.
- **Cocokkan die crimp tool dengan ukuran kabel**, terutama pada 0.3 mm². Uji dengan tarikan ringan setiap selesai crimp.
- Satu terminal untuk satu kabel. Bila perlu menggabungkan, lakukan splice sebelum terminal lalu tutup heat shrink berperekat.
- Beri **service loop** di dekat konektor ECU agar konektor bisa dilepas tanpa menarik harness.
- Untuk area dekat exhaust atau turbo, gunakan kabel rating 150-200°C dan tambahkan heat sleeve.
- Ikat harness dengan tesa tape atau split loom.

## Catatan Penutup

Rekomendasi di halaman ini disusun untuk instalasi umum dengan harness standar. Untuk aplikasi khusus — harness panjang, mesin balap dengan aktuator arus tinggi, atau instalasi di lingkungan bersuhu ekstrem — hitung ulang kebutuhan berdasarkan spesifikasi komponen yang dipakai, atau konsultasikan dengan tim Mazduino.

## Referensi Terkait

- [Persiapan Sensor dan Wiring](persiapan-sensor-wiring.md) — prinsip grounding, routing, dan checklist sebelum power-up
