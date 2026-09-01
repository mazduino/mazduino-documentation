# Mazduino Core

## Gambaran Umum

Mazduino Core adalah ECU generasi baru berbasis konektor otomotif 48-pin dengan arsitektur I/O yang lebih lengkap dari lini Mini 6CH. Produk ini menggunakan **ARM Cortex-M4 180 MHz** sebagai MCU utama untuk kebutuhan kontrol mesin advanced, termasuk dukungan **dual ETB**, **dual CAN bus**, kombinasi input **Hall + VR**, serta output aktuator yang lebih banyak untuk mesin modern.

Dokumentasi ini disusun berdasarkan spesifikasi produk Mazduino Core dan referensi hardware pada dokumen MAZDUINO CORE.

![Foto produk Mazduino Core](img/core/mazduino-core.jpeg)

## Fitur Utama

- MCU **ARM Cortex-M4 180 MHz**
- Built-in **5V sensor supply** dengan proteksi internal
- **4x input Hall/Digital** untuk CKP, CMP, VSS, clutch, launch, atau switch lainnya
- **12x input analog** untuk MAP, TPS, O2, tekanan, temperatur, PPS, dan sensor tambahan
- **6x output ignition** (untuk smart coil, 5V/12V sesuai konfigurasi)
- **10x output low side 3A** untuk injektor, idle PWM, boost, VVT, dan aktuator beban menengah
- **5x output low side low current** untuk relay (main relay, fuel pump, fan, AC, tach)
- **2x output high side 1.3A** untuk beban 12V switching
	- Contoh penggunaan: **alternator control**, solenoid 12V, dan aktuator switching lain sesuai batas arus.

- **2x CAN bus** (tergantung konfigurasi jalur/jumper)
- **2x input VR** untuk CKP/CMP tipe variable reluctor
- **2x ETB output** (ETB1 dan ETB2)
- **Dual IC ETB (ETB1 dan ETB2)** dapat juga digunakan untuk kontrol **Idle Stepper**
- Komunikasi USB, Serial, dan CAN
- Dukungan firmware **rusEFI based** saja (official atau custom firmware dengan MCU F4)

## Konfigurasi Hardware dan Jumper

Mazduino Core memiliki beberapa pin yang dapat dialihkan fungsinya melalui jumper solder. Konsep ini memberi fleksibilitas agar satu board bisa dipakai untuk berbagai konfigurasi mesin.

### Posisi Jumper Solder JP3, JP4, dan JP5

![Posisi jumper solder JP3 JP4 JP5](img/core/Picture1.png)

Posisi pin **JP3**, **JP4**, dan **JP5** berada di bagian bawah board dengan model solder jumper.

Dibagian belakang board ada jumper yang bisa disesuaikan kebutuhan atau permintaan diawal pesanan. ingin digunakan untuk mobil dengan 6 silinder atau hanya 4 silinder. Atau butuh ekstra analog input atau high side output (12v switching).

Solder Jumper 2 pin ke tengah untuk meneruskan ke konektor ECU pada JP3, JP4 dan JP5.

### Pin Header Jumper Tanpa Solder

![Pin header jumper tanpa solder](img/core/Picture2.png)

Pin header jumper tanpa solder sesuai permintaan saat awal pesanan atau dapat dipindahkan sendiri sesuai kebutuhan. konektor ECU akan mengeluarkan CANL atau VR2-, Digital 4 atau VR1-, CANH atau VR2+, Digital 3 atau VR1+.

### Pin Header Tambahan (Prototype)

Untuk kebutuhan prototype, tersedia 4 buah pin header 6 pin yang bisa menggunakan konektor **JST XH 2.54**.

| Header | Pinout |
|--------|--------|
| J2 | 5V, Analog Temp 4, Analog Volt 2, Analog Volt 3, GND, GND |
| J5 | 12V, CANL1, CANH1, CANL2, CANH2, GND |
| J6 | 5V, 5V, 5V, USB D-, USB D+, GND |
| J7 | 3.3V, 3.3V, 3.3V, 3.3V, GND |

### Jumper Ignition Volt Drive (12V / 5V)

Jumper **Ignition Volt Drive** digunakan untuk memilih level tegangan trigger sinyal coil, yaitu **12V** atau **5V**.

Harap berhati-hati dan pastikan tegangan sinyal coil sesuai. Jika level tegangan tidak sesuai, coil dapat rusak dan tidak dapat digunakan lagi.

### Catatan ETB dan Idle Stepper

Karena terdapat dual IC untuk kontrol **ETB1** dan **ETB2**, jalur driver tersebut juga dapat dimanfaatkan untuk kontrol **Idle Stepper** sesuai konfigurasi firmware dan wiring.

### Opsi Jumper Penting

- **JP3 (Pin 4)**: pilih **AVS2 (Analog Volt 5)** atau **Ignition 6**

- **JP4 (Pin 20)**: pilih **ATS2 (Analog Temp 4)** atau **Ignition 5**

- **JP5 (Pin 5)**: pilih **AVS3 (Analog Volt 6)** atau **High Side 2**

- **IN22**: pilih **Digital 3** atau **VR1+**

- **IN38**: pilih **Digital 4** atau **VR1-**

- **IN33**: pilih **CANH1** atau **VR2+**

- **IN34**: pilih **CANL1** atau **VR2-**

### Catatan Konfigurasi

- Untuk setup **6 ignition penuh**, aktifkan mode ignition pada Pin 4 dan Pin 20.
- Untuk setup yang butuh analog ekstra, aktifkan mode analog di Pin 4/5/20.
- Untuk sensor trigger VR, pindahkan jalur Digital 3/4 atau CANH/CANL ke VR sesuai kebutuhan.
- Selalu matikan sumber daya ECU sebelum mengubah konfigurasi jumper.

## Wiring dan Instalasi
![Mazduino Core 48-pin Connector](img/mazduino-48p-connector.jpeg)

### Layout Konektor 48-pin

```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

### Pin Assignment Konektor ECU 48-pin

| Pin | Fungsi | Keterangan |
|-----|--------|------------|
| 1 | 12V ECU | Catu daya utama ECU |
| 2 | Ignition 1 | Output pengapian 1 |
| 3 | High Side 1 | Output high side 1.3A untuk 12V switching (contoh: alternator control) |
| 4 | OUT4 (JP3) | Pilih AVS2 (Analog Volt 5) atau Ignition 6 |
| 5 | OUT5 (JP5) | Pilih AVS3 (Analog Volt 6) atau High Side 2 untuk 12V switching |
| 6 | 5V Sensor Supply | Referensi 5V sensor |
| 7 | ETB1+ | Output ETB 1 positif |
| 8 | ETB1- | Output ETB 1 negatif |
| 9 | ETB2+ | Output ETB 2 positif |
| 10 | ETB2- | Output ETB 2 negatif |
| 11 | Low Side 10 | Output low side 3A |
| 12 | Low Side 9 | Output low side 3A |
| 13 | Low Side 8 | Output low side 3A |
| 14 | Low Side 7 | Output low side 3A |
| 15 | Low Side 6 | Output low side 3A |
| 16 | Low Side 5 | Output low side 3A |
| 17 | Ground | Ground power |
| 18 | Ground | Ground power |
| 19 | Ignition 2 | Output pengapian 2 |
| 20 | OUT20 (JP4) | Pilih ATS2 (Analog Temp 4) atau Ignition 5 |
| 21 | Digital 1 | Input hall/digital |
| 22 | IN22 | Pilih Digital 3 atau VR1+ |
| 23 | Analog Temp 1 | Input temperatur |
| 24 | Analog Temp 2 | Input temperatur |
| 25 | Analog Volt 7 | Input analog 0-5V |
| 26 | Analog Temp 3 | Input temperatur |
| 27 | Low Side LC 15 | Output low current |
| 28 | Low Side LC 14 | Output low current |
| 29 | Low Side LC 13 | Output low current |
| 30 | Low Side LC 12 | Output low current |
| 31 | Low Side LC 11 / RPM | Output low current / tach |
| 32 | Low Side 4 | Output low side 3A |
| 33 | IN33 | Pilih CANH1 atau VR2+ |
| 34 | IN34 | Pilih CANL1 atau VR2- |
| 35 | Ignition 3 | Output pengapian 3 |
| 36 | Ignition 4 | Output pengapian 4 |
| 37 | Digital 2 | Input hall/digital |
| 38 | IN38 | Pilih Digital 4 atau VR1- |
| 39 | Ground | Ground |
| 40 | Ground | Ground |
| 41 | Analog Volt 8 | Input analog 0-5V |
| 42 | Analog Volt 1 | Input analog 0-5V |
| 43 | Analog Volt 2 | Input analog 0-5V |
| 44 | Analog Volt 3 | Input analog 0-5V |
| 45 | Analog Volt 4 | Input analog 0-5V |
| 46 | Low Side 3 | Output low side 3A |
| 47 | Low Side 2 | Output low side 3A |
| 48 | Low Side 1 | Output low side 3A |

## Ringkasan Jumlah I/O

| Kelompok | Jumlah | Keterangan |
|----------|--------|------------|
| Input Hall/Digital | 4 | Digital 1, 2, 3, 4 (3/4 via jumper) |
| Input VR | 2 | VR1 (+/-) dan VR2 (+/-) melalui jalur jumper |
| Input Analog | 12 | Analog Volt + Analog Temp termasuk pin opsi jumper |
| Ignition Output | 6 | Ignition 1-6 (5/6 via jumper) |
| Low Side 3A | 10 | Lowside 1-10 |
| Low Side Low Current | 5 | LC 11-15 |
| High Side 1.3A | 2 | High Side 1 + High Side 2 (via jumper), dapat dipakai untuk 12V switching seperti alternator control |
| ETB Output | 2 set | ETB1 (+/-), ETB2 (+/-) |
| CAN Bus | 2 | CAN1 via pin jumper; CAN2 sesuai konfigurasi board/firmware |

## Mapping Fungsional Firmware

Berikut mapping fungsi umum untuk setup firmware. Assignment dapat disesuaikan dengan kebutuhan mesin dan strategi tuning.

| Fungsi Umum | Jalur Default |
|------------|---------------|
| Ignition 1-6 | Ign 1 sampai Ign 6 |
| Injector 1-10 | Low Side 1 sampai Low Side 10 |
| Main Relay / Fuel Pump / Fan / AC / Tacho | Low Side Low Current 11 sampai 15 |
| MAP / TPS / O2 / PPS / Sensor tekanan | Analog Volt 1 sampai 8 |
| CLT / IAT / Temp tambahan | Analog Temp 1 sampai 4 |
| CKP / CMP Hall | Digital 1 dan Digital 2 |
| CKP / CMP VR | VR1 dan VR2 (melalui konfigurasi jumper) |
| ETB1 | ETB1+ dan ETB1- |
| ETB2 | ETB2+ dan ETB2- |

## Informasi MCU

- **MCU**: ARM Cortex-M4 180 MHz

- ETB control lines pada firmware biasanya dipetakan ke pin MCU khusus (DIR/DIS/PWM) sesuai package firmware.
- Gunakan file konfigurasi firmware yang memang ditujukan untuk **Mazduino Core** agar semua pin berfungsi sesuai desain board.
- Firmware untuk board ini hanya untuk **rusEFI based** (baik official maupun custom firmware dengan MCU F4).

## Panduan Instalasi Singkat

1. Pastikan semua ground utama (pin 17/18/39/40) terhubung baik.
2. Hubungkan pin 1 ke suplai 12V ECU yang stabil.
3. Konfigurasikan jumper dulu sebelum ECU dipasang ke harness final.
4. Pilih mode trigger Hall atau VR sesuai jenis sensor CKP/CMP.
5. Jika menggunakan 6 ignition, aktifkan opsi ignition pada pin jumper terkait.
6. Jika menggunakan ETB ganda, verifikasi wiring ETB1 dan ETB2 serta kalibrasi TPS/PPS.
7. Lakukan pengecekan output dengan test mode di TunerStudio/rusEFI sebelum start engine.

## Catatan Penting

- Output ignition ditujukan untuk **smart coil**. Untuk dumb coil wajib menggunakan driver/IGBT eksternal.
- Jalur output low current dipakai untuk relay atau beban ringan, bukan beban motor langsung.
- **HS1 dan HS2** dapat digunakan sebagai output **12V switching**, misalnya untuk **alternator control**.
- Pastikan setting **Ignition Volt Drive** (12V/5V) sesuai spesifikasi coil sebelum menyalakan sistem.
- Semua perubahan jumper harus dilakukan saat ECU **tanpa daya**.
- Untuk pemanfaatan **CAN2**, ikuti skema hardware dan konfigurasi firmware yang sesuai revisi board.

## Software Tuning

- Download TunerStudio: [TunerStudio Downloads][tunerstudio-dl]

- Referensi firmware rusEFI: [wiki.rusefi.com][rusefi-wiki]

- Informasi produk: [www.mazduino.com][mazduino-site]

[tunerstudio-dl]: https://www.tunerstudio.com/index.php/downloads
[rusefi-wiki]: https://wiki.rusefi.com
[mazduino-site]: https://www.mazduino.com

