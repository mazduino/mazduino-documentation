# Rekomendasi Ukuran Kabel Harness

## Pengantar

Halaman ini berisi rekomendasi ukuran kabel (luas penampang, mm²) untuk setiap pin konektor ECU Mazduino, disusun berdasarkan fungsi dan arus yang dilewati masing-masing pin. Tujuannya agar harness tidak overheat pada jalur arus tinggi, sekaligus tidak boros dan kaku pada jalur sinyal.

Rekomendasi ini berlaku untuk versi berikut:

- [Mazduino LITE v0.2](mazduino-lite-v0.2.md)
- [Mazduino Compact 4CH v2.5](mazduino-compact-4ch-v2.5.md)
- [Mazduino Mini 6CH v1.3C](mazduino-mini-6ch-v1.3c.md)

> **Asumsi perhitungan**: panjang harness dari ECU ke komponen **maksimal 3 meter**, kabel otomotif thin-wall (AVSS/AVSSF/TXL) dengan rating suhu **minimal 105°C**, dan tembaga murni (bukan CCA/aluminium). Untuk harness lebih panjang dari 3 meter, naikkan satu tingkat ukuran pada jalur power dan ground.

## Tabel Konversi dan Kapasitas Arus

| mm² | AWG (setara) | Kapasitas kabel tunggal | Kapasitas praktis di dalam harness | Penggunaan umum |
|-----|--------------|------------------------|-----------------------------------|-----------------|
| 0.5 | 20 AWG | ~9 A | ~4 A | Sinyal sensor, input digital, trigger, ignition signal, CAN |
| 0.75 | 18 AWG | ~12 A | ~5 A | Output relay arus rendah |
| 0.85 | 18 AWG | ~13 A | ~6 A | Injector, idle valve, output relay |
| 1.25 | 16 AWG | ~16 A | ~9 A | Power 12V ECU, ground ECU, ETB, injector low-impedance |
| 2.0 | 14 AWG | ~21 A | ~14 A | Ground utama, ground coil (mode IGBT) |

**Kapasitas praktis** sudah memperhitungkan derating karena kabel terikat dalam bundel dan suhu ruang mesin (hingga 85°C). Selalu gunakan angka kolom ini sebagai patokan, bukan kapasitas kabel tunggal.

## Aturan Umum

### Berdasarkan jenis pin

- **Input sensor analog** (MAP, TPS, IAT, CLT, O2, spare) — **0.5 mm²**. Arusnya hanya mikroampere, ukuran besar justru menyulitkan routing.
- **Input digital** (AC switch, VSS, clutch, launch) — **0.5 mm²**.
- **Input trigger** (CKP, CMP, VR) — **0.5 mm² shielded**. Untuk VR wajib **shielded twisted pair**, shield di-ground **hanya di sisi ECU**.
- **Input knock** — **0.5 mm² shielded**, shield di-ground hanya di sisi ECU.
- **CAN Bus** (CANH/CANL) — **0.5 mm² twisted pair**, minimal 1 puntiran per 2-3 cm.
- **Output sinyal ignition ke smart coil / igniter** — **0.5 mm²**. Yang mengalir hanya sinyal logic, bukan arus primer koil.
- **Output tachometer** — **0.5 mm²**.
- **Output 5V referensi sensor** — **0.5 mm²**, naikkan ke **0.75 mm²** bila menyuplai lebih dari 4 sensor.
- **Ground sensor** — **0.5 mm²** per sensor, atau **0.75 mm²** bila dipakai sebagai jalur utama untuk beberapa sensor.
- **Output relay low-side** (main relay, fuel pump, fan, AC) — **0.75-0.85 mm²**. Yang dilewati hanya arus coil relay (biasanya di bawah 0.5 A), tapi ukuran ini dipakai agar kabel tahan getaran dan tidak mudah putus.
- **Output injector** — **0.85 mm²** untuk injector high-impedance standar. **1.25 mm²** untuk injector low-impedance, peak-and-hold, atau flow besar (di atas 1000 cc/min).
- **Output idle valve / ISC PWM** — **0.85 mm²**.
- **Output stepper idle** — **0.5 mm²** per fase.
- **Output ETB (motor throttle)** — **1.25 mm²** per kabel, karena arus motor bisa mencapai 5-8 A saat transisi cepat.
- **Power 12V ECU** — **1.25 mm²** dengan fuse 5-10 A.
- **Ground ECU (power ground)** — **1.25 mm²** minimal, **2.0 mm²** untuk mesin 6 silinder sequential penuh.
- **Ground coil (mode IGBT internal)** — **2.0 mm²**, karena melewatkan arus primer koil.

### Yang TIDAK boleh mengikuti tabel di atas

Kabel berikut **tidak lewat ECU** dan ukurannya jauh lebih besar. Jangan menyamakan ukurannya dengan pin ECU:

| Jalur | Ukuran | Catatan |
|-------|--------|---------|
| Aki ke main relay / fuse box | 4.0 - 6.0 mm² | Sesuaikan dengan total beban sistem |
| Ground aki ke blok mesin | 8.0 - 16.0 mm² | Kabel ground utama mesin |
| Ground blok mesin ke bodi/chassis | 6.0 - 8.0 mm² | Wajib ada, jangan mengandalkan dudukan mesin |
| +12V feed ke rail injector (dari relay) | 1.25 - 2.0 mm² | 1 kabel untuk 4-6 injector |
| +12V feed ke koil pengapian (dari relay) | 2.0 mm² | Untuk COP, feed bersama 4-6 koil |
| Ground koil pengapian ke blok mesin | 2.0 - 3.0 mm² | Terpisah dari ground sensor |
| Power pompa bahan bakar (dari relay) | 1.25 - 2.0 mm² | Sesuaikan arus pompa, in-tank high flow bisa 10-15 A |
| Power kipas radiator (dari relay) | 2.0 - 3.0 mm² | Kipas besar bisa menarik 15-25 A |
| Power O2 heater wideband | 1.25 mm² | Dari relay, bukan dari ECU |

---

## Mazduino LITE v0.2 (Konektor 33-Pin)

Mode default yang dipakai pada tabel ini adalah **Smart Coil** (jumper JP3/JP4 pada posisi smart coil). Untuk mode **IGBT internal**, lihat catatan setelah tabel.

| Pin | Fungsi | Ukuran Kabel | Catatan |
|-----|--------|--------------|---------|
| 1 | Idle 1 | 0.85 mm² | Output PWM ke solenoid ISC |
| 2 | Idle 2 | 0.85 mm² | Output PWM ke solenoid ISC |
| 3 | CKP / Digital1 | 0.5 mm² | Shielded, shield di-ground sisi ECU |
| 4 | VR1- | 0.5 mm² | Shielded twisted pair dengan pin 27 |
| 5 | Ignition 1 | 0.5 mm² | Sinyal ke smart coil. Mode IGBT: 1.25 mm² |
| 6 | Main Relay | 0.75 mm² | Low-side ke coil relay |
| 7 | Ground Coil | 1.25 mm² | Mode IGBT: 2.0 mm² |
| 8 | Tacho / RPM | 0.5 mm² | Sinyal ke tachometer |
| 9 | Ignition 2 | 0.5 mm² | Sinyal ke smart coil. Mode IGBT: 1.25 mm² |
| 10 | +5V | 0.5 mm² | 0.75 mm² bila menyuplai lebih dari 4 sensor |
| 11 | +12V | 1.25 mm² | Wajib pakai fuse 5-10 A |
| 12 | Injector 3 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 13 | Injector 4 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 14 | CMP / Digital2 | 0.5 mm² | Shielded |
| 15 | VR2- | 0.5 mm² | Shielded twisted pair dengan pin 16 |
| 16 | VR2+ | 0.5 mm² | Shielded twisted pair dengan pin 15 |
| 17 | AC Relay | 0.75 mm² | Low-side ke coil relay |
| 18 | Fuel Pump Relay | 0.75 mm² | Low-side ke coil relay, bukan power pompa |
| 19 | Fan Relay | 0.75 mm² | Low-side ke coil relay, bukan power kipas |
| 20 | IAT | 0.5 mm² | Sinyal analog |
| 21 | TPS | 0.5 mm² | Sinyal analog |
| 22 | Ground ECU | 1.25 mm² | Langsung ke blok mesin atau negatif aki |
| 23 | Injector 2 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 24 | Injector 1 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 25 | Ground Sensor | 0.5 mm² | 0.75 mm² bila jadi jalur utama beberapa sensor |
| 26 | Ground Sensor | 0.5 mm² | 0.75 mm² bila jadi jalur utama beberapa sensor |
| 27 | VR1+ | 0.5 mm² | Shielded twisted pair dengan pin 4 |
| 28 | MAP | 0.5 mm² | Sinyal analog |
| 29 | Clutch / Digital3 | 0.5 mm² | Input digital |
| 30 | CLT | 0.5 mm² | Sinyal analog |
| 31 | AC Switch Input | 0.5 mm² | Input digital, aktif ground |
| 32 | VSS / Digital4 | 0.5 mm² | Input digital |
| 33 | O2 Sensor | 0.5 mm² | Sinyal analog dari wideband controller |

### Konektor CAN Bus 4-Pin (LITE v0.2)

| Pin | Fungsi | Ukuran Kabel | Catatan |
|-----|--------|--------------|---------|
| 1 | Power (12V/5V) | 0.5 mm² | Sesuai setting jumper CAN Power |
| 2 | CAN Low | 0.5 mm² | Twisted pair dengan pin 3 |
| 3 | CAN High | 0.5 mm² | Twisted pair dengan pin 2 |
| 4 | Ground | 0.5 mm² | — |

### Rekap Jumlah Kabel LITE v0.2

**Mode Smart Coil (default):**

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.5 mm² (20 AWG) | 20 kabel | 3, 4, 5, 8, 9, 10, 14, 15, 16, 20, 21, 25, 26, 27, 28, 29, 30, 31, 32, 33 |
| 0.75 mm² (18 AWG) | 4 kabel | 6, 17, 18, 19 |
| 0.85 mm² (18 AWG) | 6 kabel | 1, 2, 12, 13, 23, 24 |
| 1.25 mm² (16 AWG) | 3 kabel | 7, 11, 22 |
| **Total konektor utama** | **33 kabel** | — |
| CAN Bus (opsional) | 4 kabel 0.5 mm² | Konektor CAN terpisah |

**Mode IGBT Internal:**

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.5 mm² (20 AWG) | 18 kabel | 3, 4, 8, 10, 14, 15, 16, 20, 21, 25, 26, 27, 28, 29, 30, 31, 32, 33 |
| 0.75 mm² (18 AWG) | 4 kabel | 6, 17, 18, 19 |
| 0.85 mm² (18 AWG) | 6 kabel | 1, 2, 12, 13, 23, 24 |
| 1.25 mm² (16 AWG) | 4 kabel | 5, 9, 11, 22 |
| 2.0 mm² (14 AWG) | 1 kabel | 7 (Ground Coil) |
| **Total konektor utama** | **33 kabel** | — |

Jika 0.75 dan 0.85 mm² digabung memakai satu jenis kabel saja (praktik yang umum karena keduanya setara 18 AWG), kebutuhannya menjadi **10 kabel 0.85 mm²**.

---

## Mazduino Compact 4CH v2.5 (Konektor Yamaha 33-Pin)

| Pin | Fungsi | Ukuran Kabel | Catatan |
|-----|--------|--------------|---------|
| 1 | Injector 1 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 2 | Injector 2 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 3 | Injector 3 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 4 | Injector 4 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 5 | Idle 1 | 0.85 mm² | Driver 3A, cukup untuk solenoid ISC |
| 6 | Tacho / RPM | 0.5 mm² | Sinyal ke tachometer |
| 7 | Fan | 0.75 mm² | Low-side ke coil relay, bukan power kipas |
| 8 | 5V | 0.5 mm² | 0.75 mm² bila menyuplai lebih dari 4 sensor |
| 9 | 12V | 1.25 mm² | Wajib pakai fuse 5-10 A |
| 10 | Main Relay | 0.75 mm² | Low-side ke coil relay |
| 11 | GND | 1.25 mm² | Ground power, langsung ke blok mesin |
| 12 | Idle 2 | 0.85 mm² | Driver 3A, cukup untuk solenoid ISC |
| 13 | Ignition 4 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 14 | Ignition 3 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 15 | Ignition 2 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 16 | Ignition 1 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 17 | Fuel Pump | 0.75 mm² | Low-side ke coil relay, bukan power pompa |
| 18 | AC Compressor Relay | 0.75 mm² | Low-side ke coil relay |
| 19 | CKP / Trigger 1 | 0.5 mm² | Shielded, shield di-ground sisi ECU |
| 20 | GND | 1.25 mm² | Dapat dipakai sebagai jalur ground sensor |
| 21 | GND / HS2 (Jumper) | 1.25 mm² (mode GND) / 0.5 mm² (mode HS2) | Sesuai konfigurasi jumper |
| 22 | HS1 | 0.5 mm² | **Hanya sinyal 12V**, bukan output daya. Ke relay atau driver eksternal |
| 23 | CLT | 0.5 mm² | Sinyal analog |
| 24 | TPS | 0.5 mm² | Sinyal analog |
| 25 | O2 | 0.5 mm² | Sinyal analog dari wideband controller |
| 26 | MAP | 0.5 mm² | Sinyal analog |
| 27 | IAT | 0.5 mm² | Sinyal analog |
| 28 | Spare Analog Input | 0.5 mm² | Sinyal analog |
| 29 | CMP / Trigger 2 | 0.5 mm² | Shielded |
| 30 | Knock Sensor | 0.5 mm² | Shielded, shield di-ground sisi ECU |
| 31 | AC Switch Input | 0.5 mm² | Input digital, aktif ground |
| 32 | Clutch Switch | 0.5 mm² | Input digital |
| 33 | VSS | 0.5 mm² | Input digital |

> **Catatan High Side (pin 21 mode HS2 dan pin 22 HS1)**: kedua output ini adalah **12V logic switching (sinyal)**, bukan output daya. Kabel 0.5 mm² sudah lebih dari cukup. **Jangan** menyambungkannya langsung ke solenoid, VVT solenoid, atau beban induktif lain — gunakan relay atau modul driver eksternal, lalu beban tersebut yang memakai kabel sesuai arusnya.

### Rekap Jumlah Kabel Compact 4CH v2.5

**Pin 21 dikonfigurasi sebagai GND (default):**

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.5 mm² (20 AWG) | 19 kabel | 6, 8, 13, 14, 15, 16, 19, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33 |
| 0.75 mm² (18 AWG) | 4 kabel | 7, 10, 17, 18 |
| 0.85 mm² (18 AWG) | 6 kabel | 1, 2, 3, 4, 5, 12 |
| 1.25 mm² (16 AWG) | 4 kabel | 9, 11, 20, 21 |
| **Total** | **33 kabel** | — |

**Pin 21 dikonfigurasi sebagai HS2:**

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.5 mm² (20 AWG) | 20 kabel | 6, 8, 13, 14, 15, 16, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33 |
| 0.75 mm² (18 AWG) | 4 kabel | 7, 10, 17, 18 |
| 0.85 mm² (18 AWG) | 6 kabel | 1, 2, 3, 4, 5, 12 |
| 1.25 mm² (16 AWG) | 3 kabel | 9, 11, 20 |
| **Total** | **33 kabel** | — |

Jika 0.75 dan 0.85 mm² digabung menjadi satu jenis, kebutuhannya menjadi **10 kabel 0.85 mm²**.

---

## Mazduino Mini 6CH v1.3C (Konektor 48-Pin)

| Pin | Fungsi | Ukuran Kabel | Catatan |
|-----|--------|--------------|---------|
| 1 | 12V ECU | 1.25 mm² | Wajib pakai fuse 5-10 A |
| 2 | IDLE1 | 0.85 mm² | Output PWM ke solenoid ISC |
| 3 | IDLE2 | 0.85 mm² | Output PWM ke solenoid ISC |
| 4 | CANH | 0.5 mm² | Twisted pair dengan pin 21 |
| 5 | 5V | 0.5 mm² | 0.75 mm² bila menyuplai lebih dari 4 sensor |
| 6 | AC-OUT / AC Compressor | 0.75 mm² | Low-side ke coil relay |
| 7 | Fuel Pump | 0.75 mm² | Low-side ke coil relay, bukan power pompa |
| 8 | Knock / PC13 | 0.5 mm² | Shielded, shield di-ground sisi ECU |
| 9 | VR1- | 0.5 mm² | Shielded twisted pair dengan pin 41 |
| 10 | VR2- | 0.5 mm² | Shielded twisted pair dengan pin 42 |
| 11 | Stepper B2 | 0.5 mm² | Satu fase motor stepper |
| 12 | Stepper B1 | 0.5 mm² | Satu fase motor stepper |
| 13 | Stepper A1 | 0.5 mm² | Satu fase motor stepper |
| 14 | Stepper A2 | 0.5 mm² | Satu fase motor stepper |
| 15 | Injector 5 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 16 | Injector 6 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 17 | Main Relay | 0.75 mm² | Low-side ke coil relay |
| 18 | Spare Analog 1 / PPS1 | 0.5 mm² | Sinyal analog |
| 19 | VSS | 0.5 mm² | Input digital |
| 20 | AC-IN / AC Switch | 0.5 mm² | Input digital, hanya menerima ground |
| 21 | CANL | 0.5 mm² | Twisted pair dengan pin 4 |
| 22 | GND | 1.25 mm² | **2.0 mm² untuk 6 silinder sequential penuh** |
| 23 | FAN | 0.75 mm² | Low-side ke coil relay, bukan power kipas |
| 24 | Ignition 6 | 0.5 mm² | Sinyal ke smart coil / switching control |
| 25 | Ignition 5 | 0.5 mm² | Sinyal ke smart coil / switching control |
| 26 | Ignition 1 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 27 | Ignition 2 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 28 | Ignition 3 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 29 | Ignition 4 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 30 | TPS | 0.5 mm² | Sinyal analog |
| 31 | MAP | 0.5 mm² | Sinyal analog |
| 32 | Injector 4 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 33 | ETB- | 1.25 mm² | Arus motor throttle bisa 5-8 A saat transisi |
| 34 | ETB+ | 1.25 mm² | Arus motor throttle bisa 5-8 A saat transisi |
| 35 | Spare Analog 2 / PPS2 | 0.5 mm² | Sinyal analog |
| 36 | Clutch | 0.5 mm² | Input digital |
| 37 | GND Sensor | 0.5 mm² | 0.75 mm² bila jadi jalur utama beberapa sensor |
| 38 | GND Sensor | 0.5 mm² | 0.75 mm² bila jadi jalur utama beberapa sensor |
| 39 | RPM / Tacho | 0.5 mm² | Sinyal ke tachometer |
| 40 | Spare Input 3 / TPS2 | 0.5 mm² | Sinyal analog |
| 41 | VR1+ | 0.5 mm² | Shielded twisted pair dengan pin 9 |
| 42 | VR2+ | 0.5 mm² | Shielded twisted pair dengan pin 10 |
| 43 | O2 | 0.5 mm² | Sinyal analog 1-5V dari wideband controller |
| 44 | IAT | 0.5 mm² | Sinyal analog |
| 45 | CLT | 0.5 mm² | Sinyal analog |
| 46 | Injector 2 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 47 | Injector 1 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |
| 48 | Injector 3 | 0.85 mm² | 1.25 mm² untuk injector low-impedance |

> **Perhatian pada pin 22 (GND)**: Mini 6CH v1.3C hanya memiliki **satu pin ground power** untuk mengembalikan arus dari 6 injector, 6 output ignition, 2 idle, dan seluruh output relay. Gunakan **minimal 1.25 mm²** dan **2.0 mm² untuk mesin 6 silinder sequential penuh**, disambung sependek mungkin langsung ke blok mesin atau negatif aki. Ground sensor (pin 37, 38) tetap dipisah dari ground power ini.

### Rekap Jumlah Kabel Mini 6CH v1.3C

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.5 mm² (20 AWG) | 32 kabel | 4, 5, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30, 31, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45 |
| 0.75 mm² (18 AWG) | 4 kabel | 6, 7, 17, 23 |
| 0.85 mm² (18 AWG) | 8 kabel | 2, 3, 15, 16, 32, 46, 47, 48 |
| 1.25 mm² (16 AWG) | 4 kabel | 1, 22, 33, 34 |
| **Total** | **48 kabel** | — |

Catatan penyesuaian:

- Bila memakai **2.0 mm² untuk pin 22**, rekap menjadi: **0.5 mm² × 32**, **0.75 mm² × 4**, **0.85 mm² × 8**, **1.25 mm² × 3**, **2.0 mm² × 1**.
- Bila **tidak memakai ETB** (pin 33, 34 kosong), kebutuhan 1.25 mm² turun menjadi **2 kabel** dan total menjadi 46 kabel.
- Bila **tidak memakai stepper idle** (pin 11-14 kosong), kebutuhan 0.5 mm² turun menjadi **28 kabel**.
- Jika 0.75 dan 0.85 mm² digabung menjadi satu jenis, kebutuhannya menjadi **12 kabel 0.85 mm²**.

---

## Ringkasan Perbandingan Tiga Tipe

| Ukuran | LITE v0.2 | Compact 4CH v2.5 | Mini 6CH v1.3C |
|--------|-----------|------------------|----------------|
| 0.5 mm² (20 AWG) | 20 | 19 | 32 |
| 0.75 mm² (18 AWG) | 4 | 4 | 4 |
| 0.85 mm² (18 AWG) | 6 | 6 | 8 |
| 1.25 mm² (16 AWG) | 3 | 4 | 4 |
| **Total pin konektor** | **33** | **33** | **48** |

Angka di atas memakai konfigurasi default masing-masing board (LITE mode Smart Coil, Compact pin 21 sebagai GND, Mini 6CH pin 22 pada 1.25 mm²).

## Estimasi Kebutuhan Panjang Kabel

Untuk memperkirakan pembelian, gunakan rata-rata panjang per kabel berikut (harness engine bay standar, ECU di dalam kabin atau di firewall):

| Kelompok | Rata-rata per kabel | LITE v0.2 | Compact 4CH v2.5 | Mini 6CH v1.3C |
|----------|--------------------|-----------|------------------|----------------|
| 0.5 mm² | 1.5 m | ~30 m | ~29 m | ~48 m |
| 0.75 mm² | 2.0 m | ~8 m | ~8 m | ~8 m |
| 0.85 mm² | 1.5 m | ~9 m | ~9 m | ~12 m |
| 1.25 mm² | 2.0 m | ~6 m | ~8 m | ~8 m |

Tambahkan **cadangan 20%** untuk kesalahan potong, routing ulang, dan service loop.

## Pemilihan Jenis Kabel

| Kebutuhan | Jenis kabel | Alasan |
|-----------|-------------|--------|
| Kabel sinyal dan power umum | AVSS / AVSSF / TXL / GXL | Thin-wall, rating 105-125°C, isolasi tahan oli dan bensin |
| Trigger VR, knock | Shielded twisted pair | Menolak noise dari koil dan alternator |
| CAN Bus | Twisted pair 120 ohm | Impedansi sesuai spesifikasi CAN |
| Area dekat exhaust / turbo | Kabel rating 150-200°C + selongsong heat sleeve | Isolasi PVC biasa akan meleleh |

**Hindari:**

- Kabel CCA (Copper Clad Aluminium) — resistansi lebih tinggi dan mudah patah di titik crimp
- Kabel serabut instalasi rumah (NYAF) — isolasi tidak tahan oli, bensin, dan suhu ruang mesin
- Kabel speaker atau kabel jaringan untuk jalur power

## Praktik Terminasi

- Gunakan **crimp**, bukan solder, pada terminal konektor. Sambungan solder menjadi kaku dan mudah patah karena getaran.
- Satu terminal untuk satu kabel. Bila perlu menggabungkan, lakukan splice sebelum terminal dengan solder seal atau crimp splice, lalu tutup heat shrink berperekat.
- Gunakan **heat shrink adhesive-lined** pada setiap sambungan yang terkena ruang mesin.
- Beri **service loop** (kabel berlebih melingkar) di dekat konektor ECU agar konektor bisa dilepas tanpa menarik harness.
- Ikat harness dengan **tesa tape** atau split loom, jangan cable tie langsung ke kabel tanpa pelindung.

## Referensi Terkait

- [Persiapan Sensor dan Wiring](persiapan-sensor-wiring.md) — prinsip grounding, routing, dan checklist sebelum power-up
