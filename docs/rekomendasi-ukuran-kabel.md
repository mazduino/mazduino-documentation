# Rekomendasi Ukuran Kabel Harness

## Pengantar

Halaman ini berisi rekomendasi ukuran kabel (luas penampang, mm²) untuk setiap pin konektor ECU Mazduino, disusun berdasarkan fungsi dan arus yang benar-benar dilewati masing-masing pin. Tujuannya agar harness tidak overheat pada jalur arus tinggi, sekaligus tidak boros dan tidak kaku pada jalur sinyal.

Rekomendasi ini berlaku untuk versi berikut:

- [Mazduino LITE v0.2](mazduino-lite-v0.2.md)
- [Mazduino Compact 4CH v2.5](mazduino-compact-4ch-v2.5.md)
- [Mazduino Mini 6CH v1.3C](mazduino-mini-6ch-v1.3c.md)

> **Asumsi perhitungan**: panjang harness dari ECU ke komponen **maksimal 3 meter**, kabel otomotif thin-wall (AVSS/AVSSF/TXL) dengan rating suhu **minimal 105°C**, dan tembaga murni (bukan CCA/aluminium). Untuk harness lebih panjang dari 3 meter, naikkan satu tingkat ukuran pada jalur power dan ground.

## Prinsip: Ukuran Ditentukan Arus, Bukan Perasaan

Sebagian besar pin ECU adalah **jalur sinyal** yang arusnya di bawah 1 mA. Pada arus sekecil itu, kabel 0.3 mm² dan 2.0 mm² sama-sama tidak menghasilkan penurunan tegangan yang berarti — memakai kabel besar hanya membuat harness berat, kaku, susah dirapikan, dan membebani terminal konektor.

| Jalur | Arus nyata | Drop di 0.3 mm² (3 m) | Kesimpulan |
|-------|-----------|----------------------|------------|
| Sinyal sensor analog (MAP, TPS, CLT, IAT, O2) | < 1 mA | 0.000175 V | 0.3 mm² lebih dari cukup |
| Input digital (VSS, clutch, AC switch) | < 1 mA | 0.000175 V | 0.3 mm² lebih dari cukup |
| 5V referensi untuk 5 sensor | ~100 mA | 0.0175 V | 0.3 mm² masih aman, 0.5 mm² lebih lega |
| 12V suplai ECU | 0.3 - 0.8 A | — | 0.75 mm² sudah aman (drop 0.056 V) |
| Injector high-impedance (12 ohm) | ~1.2 A | 0.205 V | Pakai 0.5 mm² (drop 0.123 V) |
| Ground ECU (puncak semua low-side) | 5 - 8 A | — | 0.85 - 1.25 mm², **jangan dikecilkan** |

Yang benar-benar butuh penampang besar hanya **ground** dan **beban motor (ETB, stepper besar)**. Sisanya bisa jauh lebih kecil dari yang biasa dipakai orang.

## Tabel Konversi dan Kapasitas Arus

| mm² | AWG (setara) | Kapasitas kabel tunggal | Kapasitas praktis di dalam harness | Penggunaan pada ECU Mazduino |
|-----|--------------|------------------------|-----------------------------------|------------------------------|
| 0.3 | 22 AWG | ~6 A | ~3 A | Sinyal sensor analog, input digital, tacho |
| 0.5 | 20 AWG | ~9 A | ~4 A | Trigger, knock, CAN, ignition signal, injector, idle, output relay, 5V ref, ground sensor |
| 0.75 | 18 AWG | ~12 A | ~5 A | Suplai 12V ECU |
| 0.85 | 18 AWG | ~13 A | ~6 A | Ground ECU (board dengan 2-3 pin ground), injector low-impedance |
| 1.25 | 16 AWG | ~16 A | ~9 A | Ground ECU (board dengan 1 pin ground), ETB, ignition primer mode IGBT |
| 2.0 | 14 AWG | ~21 A | ~14 A | Ground coil mode IGBT internal |

**Kapasitas praktis** sudah memperhitungkan derating karena kabel terikat dalam bundel dan suhu ruang mesin hingga 85°C. Gunakan angka kolom ini sebagai patokan, bukan kapasitas kabel tunggal.

## Aturan Umum

### 0.3 mm² — jalur sinyal murni

Boleh dan dianjurkan untuk pin berikut:

- **Input sensor analog**: MAP, TPS, IAT, CLT, O2, spare analog, PPS1/PPS2, TPS2
- **Input digital**: AC switch, VSS, clutch, launch control
- **Output tachometer**

Ini ukuran yang dipakai pabrikan (Toyota, Honda, Suzuki) untuk jalur sensor, jadi secara kelistrikan sudah terbukti. Yang perlu diperhatikan bukan kemampuan arusnya, melainkan sisi mekanis:

- **Terminal harus mendukung 0.3 mm²**. Terminal seri 090 (Sumitomo/Yazaki) umumnya menerima 0.3-0.85 mm². Pakai crimp tool yang benar dengan die sesuai ukuran — crimp 0.3 mm² dengan die 0.85 akan longgar dan lepas karena getaran.
- **Lebih rapuh terhadap tarikan dan getaran.** Wajib ada strain relief di sisi konektor dan service loop.
- **Jangan dipakai untuk pin output apa pun** (injector, ignition, idle, relay, high side) atau untuk 5V/ground.

Kalau Anda tidak yakin dengan kualitas crimp atau harness sering dibongkar-pasang, tetap gunakan **0.5 mm²** untuk pin-pin di atas. Perbedaan kelistrikannya nol; yang Anda beli adalah ketahanan mekanis.

### 0.5 mm² — jalur kerja ringan

- **Input trigger** (CKP, CMP, VR): **0.5 mm² shielded**. Untuk VR wajib **shielded twisted pair**, shield di-ground **hanya di sisi ECU**. Ukuran ini bukan karena arus, tapi karena kabel shielded yang beredar umumnya 0.5 mm² dan butuh ketahanan mekanis di area mesin.
- **Input knock**: **0.5 mm² shielded**, shield di-ground hanya di sisi ECU.
- **CAN Bus** (CANH/CANL): **0.5 mm² twisted pair**, minimal 1 puntiran per 2-3 cm.
- **Output sinyal ignition ke smart coil / igniter**: **0.5 mm²**. Arusnya hanya sinyal logic (belasan mA), tapi kabel ini menuju area terpanas dan paling sering dilepas saat servis.
- **Output 5V referensi sensor**: **0.5 mm²**.
- **Ground sensor**: **0.5 mm²**.
- **Output relay low-side** (main relay, fuel pump, fan, AC): **0.5 mm²**. Yang lewat hanya arus coil relay, sekitar 150 mA.
- **Output injector high-impedance** (10-16 ohm): **0.5 mm²**. Arus ~1.2 A, drop hanya 0.123 V pada 3 meter.
- **Output idle valve / ISC PWM**: **0.5 mm²**.
- **Output stepper idle**: **0.5 mm²** per fase.
- **Output high side switching (Compact v2.5)**: **0.5 mm²**.

### 0.75 mm² — suplai 12V ECU

Konsumsi ECU Mazduino hanya **0.3-0.8 A** (MCU, regulator, driver logic). Daya untuk injector, koil, pompa bahan bakar, dan kipas **tidak lewat ECU** — semuanya dari relay masing-masing. Jadi 0.75 mm² sudah lebih dari cukup, dengan drop hanya 0.056 V pada 3 meter beban penuh. Pasang **fuse 5-7.5 A** pada jalur ini.

### 0.85 - 1.25 mm² — ground ECU (jangan dikecilkan)

Ini satu-satunya jalur yang saya sarankan tetap dilebihkan, dan alasannya bukan panas melainkan **akurasi sensor**. Pin ground ECU mengembalikan arus dari seluruh output low-side (injector, ignition, idle, relay) sekaligus menjadi referensi 0V untuk semua pembacaan analog. Setiap penurunan tegangan di kabel ground langsung menggeser semua pembacaan sensor:

| Ukuran ground | Drop pada puncak 6 A (1 meter) | Efek ke pembacaan sensor 0-5V |
|---------------|-------------------------------|-------------------------------|
| 0.5 mm² | 0.210 V | Pergeseran ~4% — terasa di AFR dan timing |
| 0.85 mm² | 0.124 V | Pergeseran ~2.5% |
| 1.25 mm² | 0.084 V | Pergeseran ~1.7% |
| 2.0 mm² | 0.053 V | Pergeseran ~1% |

Aturannya:

- Board dengan **2-3 pin ground** (LITE, Compact): **0.85 mm² per pin**, semuanya dipakai. Gabungan penampangnya sudah setara 1.7-2.5 mm².
- Board dengan **1 pin ground power** (Mini 6CH pin 22): **1.25 mm²**, dan **2.0 mm² untuk 6 silinder sequential penuh**.
- Sambung **sependek mungkin** langsung ke blok mesin atau negatif aki. Kabel pendek jauh lebih berpengaruh daripada kabel besar.
- **Pisahkan ground sensor dari ground power.** Ini yang membuat kabel ground sensor boleh tetap 0.5 mm² — dia tidak dilewati arus injector.

### 1.25 - 2.0 mm² — beban motor dan primer koil

- **Output ETB (motor throttle)**: **1.25 mm²** per kabel, arus motor bisa 5-8 A saat transisi cepat.
- **Ignition primer, mode IGBT internal** (LITE v0.2 dengan IGBT terpasang): **1.25 mm²**, karena melewatkan arus primer koil.
- **Ground coil, mode IGBT internal**: **2.0 mm²**.

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
| 1 | Idle 1 | 0.5 mm² | Output PWM ke solenoid ISC |
| 2 | Idle 2 | 0.5 mm² | Output PWM ke solenoid ISC |
| 3 | CKP / Digital1 | 0.5 mm² | Shielded, shield di-ground sisi ECU |
| 4 | VR1- | 0.5 mm² | Shielded twisted pair dengan pin 27 |
| 5 | Ignition 1 | 0.5 mm² | Sinyal ke smart coil. **Mode IGBT: 1.25 mm²** |
| 6 | Main Relay | 0.5 mm² | Low-side ke coil relay |
| 7 | Ground Coil | 0.85 mm² | **Mode IGBT: 2.0 mm²** |
| 8 | Tacho / RPM | 0.3 mm² | Sinyal ke tachometer |
| 9 | Ignition 2 | 0.5 mm² | Sinyal ke smart coil. **Mode IGBT: 1.25 mm²** |
| 10 | +5V | 0.5 mm² | Referensi sensor |
| 11 | +12V | 0.75 mm² | Fuse 5-7.5 A |
| 12 | Injector 3 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 13 | Injector 4 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 14 | CMP / Digital2 | 0.5 mm² | Shielded |
| 15 | VR2- | 0.5 mm² | Shielded twisted pair dengan pin 16 |
| 16 | VR2+ | 0.5 mm² | Shielded twisted pair dengan pin 15 |
| 17 | AC Relay | 0.5 mm² | Low-side ke coil relay |
| 18 | Fuel Pump Relay | 0.5 mm² | Low-side ke coil relay, bukan power pompa |
| 19 | Fan Relay | 0.5 mm² | Low-side ke coil relay, bukan power kipas |
| 20 | IAT | 0.3 mm² | Sinyal analog |
| 21 | TPS | 0.3 mm² | Sinyal analog |
| 22 | Ground ECU | 1.25 mm² | **Satu-satunya ground power**, langsung ke blok mesin |
| 23 | Injector 2 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 24 | Injector 1 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 25 | Ground Sensor | 0.5 mm² | Pisahkan dari ground power pin 22 |
| 26 | Ground Sensor | 0.5 mm² | Pisahkan dari ground power pin 22 |
| 27 | VR1+ | 0.5 mm² | Shielded twisted pair dengan pin 4 |
| 28 | MAP | 0.3 mm² | Sinyal analog |
| 29 | Clutch / Digital3 | 0.3 mm² | Input digital |
| 30 | CLT | 0.3 mm² | Sinyal analog |
| 31 | AC Switch Input | 0.3 mm² | Input digital, aktif ground |
| 32 | VSS / Digital4 | 0.3 mm² | Input digital |
| 33 | O2 Sensor | 0.3 mm² | Sinyal analog dari wideband controller |

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
| 0.3 mm² (22 AWG) | 9 kabel | 8, 20, 21, 28, 29, 30, 31, 32, 33 |
| 0.5 mm² (20 AWG) | 21 kabel | 1, 2, 3, 4, 5, 6, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 23, 24, 25, 26, 27 |
| 0.75 mm² (18 AWG) | 1 kabel | 11 |
| 0.85 mm² (18 AWG) | 1 kabel | 7 |
| 1.25 mm² (16 AWG) | 1 kabel | 22 |
| **Total konektor utama** | **33 kabel** | — |
| CAN Bus (opsional) | 4 kabel 0.5 mm² | Konektor CAN terpisah |

**Mode IGBT Internal:**

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.3 mm² (22 AWG) | 9 kabel | 8, 20, 21, 28, 29, 30, 31, 32, 33 |
| 0.5 mm² (20 AWG) | 19 kabel | 1, 2, 3, 4, 6, 10, 12, 13, 14, 15, 16, 17, 18, 19, 23, 24, 25, 26, 27 |
| 0.75 mm² (18 AWG) | 1 kabel | 11 |
| 1.25 mm² (16 AWG) | 3 kabel | 5, 9, 22 |
| 2.0 mm² (14 AWG) | 1 kabel | 7 (Ground Coil) |
| **Total konektor utama** | **33 kabel** | — |

---

## Mazduino Compact 4CH v2.5 (Konektor Yamaha 33-Pin)

| Pin | Fungsi | Ukuran Kabel | Catatan |
|-----|--------|--------------|---------|
| 1 | Injector 1 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 2 | Injector 2 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 3 | Injector 3 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 4 | Injector 4 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 5 | Idle 1 | 0.5 mm² | Solenoid ISC standar |
| 6 | Tacho / RPM | 0.3 mm² | Sinyal ke tachometer |
| 7 | Fan | 0.5 mm² | Low-side ke coil relay, bukan power kipas |
| 8 | 5V | 0.5 mm² | Referensi sensor |
| 9 | 12V | 0.75 mm² | Fuse 5-7.5 A |
| 10 | Main Relay | 0.5 mm² | Low-side ke coil relay |
| 11 | GND | 0.85 mm² | Ground power, langsung ke blok mesin |
| 12 | Idle 2 | 0.5 mm² | Solenoid ISC standar |
| 13 | Ignition 4 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 14 | Ignition 3 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 15 | Ignition 2 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 16 | Ignition 1 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 17 | Fuel Pump | 0.5 mm² | Low-side ke coil relay, bukan power pompa |
| 18 | AC Compressor Relay | 0.5 mm² | Low-side ke coil relay |
| 19 | CKP / Trigger 1 | 0.5 mm² | Shielded, shield di-ground sisi ECU |
| 20 | GND | 0.85 mm² | Dapat didedikasikan sebagai ground sensor (0.5 mm²) |
| 21 | GND / HS2 (Jumper) | 0.85 mm² (mode GND) / 0.5 mm² (mode HS2) | Sesuai konfigurasi jumper |
| 22 | HS1 | 0.5 mm² | **Hanya sinyal 12V**, bukan output daya |
| 23 | CLT | 0.3 mm² | Sinyal analog |
| 24 | TPS | 0.3 mm² | Sinyal analog |
| 25 | O2 | 0.3 mm² | Sinyal analog dari wideband controller |
| 26 | MAP | 0.3 mm² | Sinyal analog |
| 27 | IAT | 0.3 mm² | Sinyal analog |
| 28 | Spare Analog Input | 0.3 mm² | Sinyal analog |
| 29 | CMP / Trigger 2 | 0.5 mm² | Shielded |
| 30 | Knock Sensor | 0.5 mm² | Shielded, shield di-ground sisi ECU |
| 31 | AC Switch Input | 0.3 mm² | Input digital, aktif ground |
| 32 | Clutch Switch | 0.3 mm² | Input digital |
| 33 | VSS | 0.3 mm² | Input digital |

> **Catatan High Side (pin 21 mode HS2 dan pin 22 HS1)**: kedua output ini adalah **12V logic switching (sinyal)**, bukan output daya. Kabel 0.5 mm² sudah lebih dari cukup. **Jangan** menyambungkannya langsung ke solenoid, VVT solenoid, atau beban induktif lain — gunakan relay atau modul driver eksternal, lalu beban tersebut yang memakai kabel sesuai arusnya.

> **Catatan ground**: Compact v2.5 punya 2-3 pin ground. Pakai **semuanya**, jangan hanya satu. Alternatif yang lebih rapi: pin 11 dan 21 sebagai ground power (0.85 mm², ke blok mesin), pin 20 didedikasikan sebagai ground sensor (0.5 mm², hanya untuk sensor).

### Rekap Jumlah Kabel Compact 4CH v2.5

**Pin 21 dikonfigurasi sebagai GND (default):**

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.3 mm² (22 AWG) | 10 kabel | 6, 23, 24, 25, 26, 27, 28, 31, 32, 33 |
| 0.5 mm² (20 AWG) | 19 kabel | 1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14, 15, 16, 17, 18, 19, 22, 29, 30 |
| 0.75 mm² (18 AWG) | 1 kabel | 9 |
| 0.85 mm² (18 AWG) | 3 kabel | 11, 20, 21 |
| **Total** | **33 kabel** | — |

**Pin 21 dikonfigurasi sebagai HS2:**

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.3 mm² (22 AWG) | 10 kabel | 6, 23, 24, 25, 26, 27, 28, 31, 32, 33 |
| 0.5 mm² (20 AWG) | 20 kabel | 1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 29, 30 |
| 0.75 mm² (18 AWG) | 1 kabel | 9 |
| 0.85 mm² (18 AWG) | 2 kabel | 11, 20 |
| **Total** | **33 kabel** | — |

---

## Mazduino Mini 6CH v1.3C (Konektor 48-Pin)

| Pin | Fungsi | Ukuran Kabel | Catatan |
|-----|--------|--------------|---------|
| 1 | 12V ECU | 0.75 mm² | Fuse 5-7.5 A |
| 2 | IDLE1 | 0.5 mm² | Output PWM ke solenoid ISC |
| 3 | IDLE2 | 0.5 mm² | Output PWM ke solenoid ISC |
| 4 | CANH | 0.5 mm² | Twisted pair dengan pin 21 |
| 5 | 5V | 0.5 mm² | Referensi sensor |
| 6 | AC-OUT / AC Compressor | 0.5 mm² | Low-side ke coil relay |
| 7 | Fuel Pump | 0.5 mm² | Low-side ke coil relay, bukan power pompa |
| 8 | Knock / PC13 | 0.5 mm² | Shielded, shield di-ground sisi ECU |
| 9 | VR1- | 0.5 mm² | Shielded twisted pair dengan pin 41 |
| 10 | VR2- | 0.5 mm² | Shielded twisted pair dengan pin 42 |
| 11 | Stepper B2 | 0.5 mm² | Satu fase motor stepper |
| 12 | Stepper B1 | 0.5 mm² | Satu fase motor stepper |
| 13 | Stepper A1 | 0.5 mm² | Satu fase motor stepper |
| 14 | Stepper A2 | 0.5 mm² | Satu fase motor stepper |
| 15 | Injector 5 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 16 | Injector 6 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 17 | Main Relay | 0.5 mm² | Low-side ke coil relay |
| 18 | Spare Analog 1 / PPS1 | 0.3 mm² | Sinyal analog |
| 19 | VSS | 0.3 mm² | Input digital |
| 20 | AC-IN / AC Switch | 0.3 mm² | Input digital, hanya menerima ground |
| 21 | CANL | 0.5 mm² | Twisted pair dengan pin 4 |
| 22 | GND | 1.25 mm² | **2.0 mm² untuk 6 silinder sequential penuh** |
| 23 | FAN | 0.5 mm² | Low-side ke coil relay, bukan power kipas |
| 24 | Ignition 6 | 0.5 mm² | Sinyal ke smart coil / switching control |
| 25 | Ignition 5 | 0.5 mm² | Sinyal ke smart coil / switching control |
| 26 | Ignition 1 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 27 | Ignition 2 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 28 | Ignition 3 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 29 | Ignition 4 | 0.5 mm² | Sinyal ke smart coil / igniter |
| 30 | TPS | 0.3 mm² | Sinyal analog |
| 31 | MAP | 0.3 mm² | Sinyal analog |
| 32 | Injector 4 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 33 | ETB- | 1.25 mm² | Arus motor throttle bisa 5-8 A saat transisi |
| 34 | ETB+ | 1.25 mm² | Arus motor throttle bisa 5-8 A saat transisi |
| 35 | Spare Analog 2 / PPS2 | 0.3 mm² | Sinyal analog |
| 36 | Clutch | 0.3 mm² | Input digital |
| 37 | GND Sensor | 0.5 mm² | Pisahkan dari ground power pin 22 |
| 38 | GND Sensor | 0.5 mm² | Pisahkan dari ground power pin 22 |
| 39 | RPM / Tacho | 0.3 mm² | Sinyal ke tachometer |
| 40 | Spare Input 3 / TPS2 | 0.3 mm² | Sinyal analog |
| 41 | VR1+ | 0.5 mm² | Shielded twisted pair dengan pin 9 |
| 42 | VR2+ | 0.5 mm² | Shielded twisted pair dengan pin 10 |
| 43 | O2 | 0.3 mm² | Sinyal analog 1-5V dari wideband controller |
| 44 | IAT | 0.3 mm² | Sinyal analog |
| 45 | CLT | 0.3 mm² | Sinyal analog |
| 46 | Injector 2 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 47 | Injector 1 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |
| 48 | Injector 3 | 0.5 mm² | 0.85 mm² untuk injector low-impedance |

> **Perhatian pada pin 22 (GND)**: Mini 6CH v1.3C hanya memiliki **satu pin ground power** untuk mengembalikan arus dari 6 injector, 6 output ignition, 2 idle, dan seluruh output relay. Ini satu-satunya pin yang tidak boleh dikecilkan. Gunakan **minimal 1.25 mm²** dan **2.0 mm² untuk mesin 6 silinder sequential penuh**, disambung sependek mungkin langsung ke blok mesin atau negatif aki. Ground sensor (pin 37, 38) tetap dipisah dari ground power ini.

### Rekap Jumlah Kabel Mini 6CH v1.3C

| Ukuran | Jumlah | Pin |
|--------|--------|-----|
| 0.3 mm² (22 AWG) | 12 kabel | 18, 19, 20, 30, 31, 35, 36, 39, 40, 43, 44, 45 |
| 0.5 mm² (20 AWG) | 32 kabel | 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 21, 23, 24, 25, 26, 27, 28, 29, 32, 37, 38, 41, 42, 46, 47, 48 |
| 0.75 mm² (18 AWG) | 1 kabel | 1 |
| 1.25 mm² (16 AWG) | 3 kabel | 22, 33, 34 |
| **Total** | **48 kabel** | — |

Catatan penyesuaian:

- Bila memakai **2.0 mm² untuk pin 22** (6 silinder sequential penuh), rekap menjadi: **0.3 × 12**, **0.5 × 32**, **0.75 × 1**, **1.25 × 2**, **2.0 × 1**.
- Bila **tidak memakai ETB** (pin 33, 34 kosong), kebutuhan 1.25 mm² turun menjadi **1 kabel** dan total menjadi 46 kabel.
- Bila **tidak memakai stepper idle** (pin 11-14 kosong), kebutuhan 0.5 mm² turun menjadi **28 kabel** dan total menjadi 44 kabel.

---

## Ringkasan Perbandingan Tiga Tipe

| Ukuran | LITE v0.2 | Compact 4CH v2.5 | Mini 6CH v1.3C |
|--------|-----------|------------------|----------------|
| 0.3 mm² (22 AWG) | 9 | 10 | 12 |
| 0.5 mm² (20 AWG) | 21 | 19 | 32 |
| 0.75 mm² (18 AWG) | 1 | 1 | 1 |
| 0.85 mm² (18 AWG) | 1 | 3 | — |
| 1.25 mm² (16 AWG) | 1 | — | 3 |
| **Total pin konektor** | **33** | **33** | **48** |

Angka di atas memakai konfigurasi default masing-masing board (LITE mode Smart Coil, Compact pin 21 sebagai GND, Mini 6CH pin 22 pada 1.25 mm²).

Kalau Anda ingin menyederhanakan stok kabel, **0.3 mm² boleh diganti 0.5 mm²** tanpa konsekuensi kelistrikan apa pun. Dengan penyederhanaan itu kebutuhannya menjadi:

| Ukuran | LITE v0.2 | Compact 4CH v2.5 | Mini 6CH v1.3C |
|--------|-----------|------------------|----------------|
| 0.5 mm² | 30 | 29 | 44 |
| 0.75 mm² | 1 | 1 | 1 |
| 0.85 mm² | 1 | 3 | — |
| 1.25 mm² | 1 | — | 3 |
| **Total** | **33** | **33** | **48** |

## Estimasi Kebutuhan Panjang Kabel

Untuk memperkirakan pembelian, gunakan rata-rata panjang per kabel berikut (harness engine bay standar, ECU di dalam kabin atau di firewall):

| Kelompok | Rata-rata per kabel | LITE v0.2 | Compact 4CH v2.5 | Mini 6CH v1.3C |
|----------|--------------------|-----------|------------------|----------------|
| 0.3 mm² | 1.5 m | ~14 m | ~15 m | ~18 m |
| 0.5 mm² | 1.5 m | ~32 m | ~29 m | ~48 m |
| 0.75 mm² | 2.0 m | ~2 m | ~2 m | ~2 m |
| 0.85 mm² | 2.0 m | ~2 m | ~6 m | — |
| 1.25 mm² | 2.0 m | ~2 m | — | ~6 m |

Tambahkan **cadangan 20%** untuk kesalahan potong, routing ulang, dan service loop. Untuk ukuran yang hanya butuh 2 meter (0.75 dan 1.25 mm²), beli minimal 5 meter karena umumnya dijual per rol pendek dan sisanya berguna untuk perbaikan.

## Pemilihan Jenis Kabel

| Kebutuhan | Jenis kabel | Alasan |
|-----------|-------------|--------|
| Kabel sinyal dan power umum | AVSS / AVSSF / TXL / GXL | Thin-wall, rating 105-125°C, isolasi tahan oli dan bensin |
| Trigger VR, knock | Shielded twisted pair | Menolak noise dari koil dan alternator |
| CAN Bus | Twisted pair 120 ohm | Impedansi sesuai spesifikasi CAN |
| Area dekat exhaust / turbo | Kabel rating 150-200°C + selongsong heat sleeve | Isolasi PVC biasa akan meleleh |

**Hindari:**

- Kabel CCA (Copper Clad Aluminium) — resistansi lebih tinggi dan mudah patah di titik crimp. Pada 0.3 mm² masalah ini menjadi jauh lebih parah.
- Kabel serabut instalasi rumah (NYAF) — isolasi tidak tahan oli, bensin, dan suhu ruang mesin
- Kabel speaker atau kabel jaringan untuk jalur power

## Praktik Terminasi

- Gunakan **crimp**, bukan solder, pada terminal konektor. Sambungan solder menjadi kaku dan mudah patah karena getaran.
- **Cocokkan die crimp tool dengan ukuran kabel.** Ini paling kritis pada 0.3 mm² — crimp yang longgar akan lepas sendiri karena getaran mesin. Uji dengan tarikan ringan setiap selesai crimp.
- Satu terminal untuk satu kabel. Bila perlu menggabungkan, lakukan splice sebelum terminal dengan solder seal atau crimp splice, lalu tutup heat shrink berperekat.
- Gunakan **heat shrink adhesive-lined** pada setiap sambungan yang terkena ruang mesin.
- Beri **service loop** (kabel berlebih melingkar) di dekat konektor ECU agar konektor bisa dilepas tanpa menarik harness. Wajib untuk kabel 0.3 mm².
- Ikat harness dengan **tesa tape** atau split loom, jangan cable tie langsung ke kabel tanpa pelindung.

## Referensi Terkait

- [Persiapan Sensor dan Wiring](persiapan-sensor-wiring.md) — prinsip grounding, routing, dan checklist sebelum power-up
