# Mazduino Mini 6CH (v1.3C)

## Gambaran Umum

Mazduino Mini 6CH v1.3C adalah perbaikan dan peningkatan dari versi v1.3B, dirancang sebagai Engine Control Unit 6-channel yang lebih optimal. Dibangun di sekitar prosesor **STM32F427VGT6** ARM 32-bit yang powerful, memberikan manajemen mesin komprehensif dalam faktor bentuk kompak yang cocok untuk mesin 6-silinder atau mesin 4-silinder dengan output arus tinggi tambahan.

**Perbaikan v1.3C dari v1.3B:**

- **Optimisasi Pin MCU**: Pemindahan pin TPS ke PA6 dan Battery/Voltage Reference ke PA7 untuk routing sinyal yang lebih baik

- **Knock Input Tunggal**: Konsolidasi dari 2 input knock (PC0, PC1) menjadi 1 input knock (PA3) yang lebih efisien

- **VDrive Ignition Terpisah**: Dua jumper VDrive terpisah — satu untuk channel ignition 1-4 dan satu untuk channel ignition 5-6, memberikan fleksibilitas konfigurasi tegangan yang lebih baik

- **Fleksibilitas Channel**: 6 channel ignition dan 6 channel injection yang semuanya dapat dikonfigurasi sesuai kebutuhan aplikasi

![Mazduino Mini 6ch](img/mazduino-mini-6ch-v1.3B.jpeg)

## Fitur Utama
- Input trigger utama untuk sensor CKP VR, hall atau optical
- Input trigger kedua untuk sensor CMP VR, hall atau optical
- 8 input analog (0-5V) untuk MAP, TPS, IAT, CLT, O2, dan 3 cadangan termasuk input analog khusus untuk TPS2/ETB yang dapat digunakan untuk sensor tekanan bahan bakar atau sensor lainnya
- Catu daya 5V untuk sensor dengan perlindungan fuse internal
- 4 input digital pullup untuk AC Switch, VSS, Clutch, Launch Control
- 8x driver low-side arus tinggi 3A untuk injektor high-impedance, idle PWM (ISC), Boost, VVT dan lainnya
- 5x driver low-side arus rendah untuk relay utama, pompa bahan bakar, kompresor AC, kipas, dan kontrol tachometer
- **6x output ignition** dengan VDrive terpisah untuk channel 1-4 dan channel 5-6 (masing-masing dapat dikonfigurasi 5V atau 12V)
- **Knock Input (v1.3C)**: Satu input sensor knock yang dioptimalkan (PA3)

- **ETB Support**: Kontrol Electronic Throttle Body dengan TPS1 dan TPS2

- Dukungan untuk Modul VR Conditioner tambahan
- Dukungan untuk Modul Stepper Idle tambahan
- **Prosesor 180 MHz ARM Cortex-M4 (STM32F427VGT6)**

- Komunikasi data via CANbus
- Komunikasi data via USB Type-C
- Komunikasi Serial RX/TX
- Konektor otomotif 48-pin
- Kartu SD untuk data logging

![Mazduino Mini 6ch](img/mazduino-mini6ch-new-case.jpeg)

## Konfigurasi Channel 6CH

Mazduino Mini 6CH v1.3C memiliki 6 channel ignition dan 6 channel injection yang seluruhnya dapat dikonfigurasi sesuai kebutuhan aplikasi.

### Ignition Channel (6x)

| Channel | Penggunaan Default | Penggunaan Alternatif |
|---------|-------------------|----------------------|
| Ignition 1-4 | Channel pengapian silinder 1-4 | — |
| Ignition 5-6 | Channel pengapian silinder 5-6 | Switching control 5V atau 12V (on/off atau PWM) |

Untuk mesin 4-silinder, **channel ignition 5 dan 6 dapat digunakan sebagai output switching control** (5V atau 12V) sesuai konfigurasi jumper VDrive 5-6 di bagian bawah PCB.

### Injection Channel (6x)

| Channel | Penggunaan Default | Penggunaan Alternatif |
|---------|-------------------|----------------------|
| Injector 1-4 | Channel injektor silinder 1-4 | — |
| Injector 5-6 | Channel injektor silinder 5-6 | Output low-side arus tinggi cadangan |

Untuk mesin 4-silinder, **channel injector 5 dan 6 dapat digunakan sebagai output low-side** untuk selenoid on/off, kontrol boost, VVT, injeksi air/methanol, atau kontrol PWM lainnya.

## Konfigurasi Jumper

Mazduino Mini 6CH v1.3C dilengkapi dengan sistem jumper solder yang memungkinkan kustomisasi fungsi sesuai kebutuhan aplikasi Anda. Jumper ini memberikan fleksibilitas konfigurasi tanpa perlu mengubah firmware, memastikan kompatibilitas optimal dengan berbagai setup mesin.

![Mazduino Mini 6ch](img/mini6ch/IMG_6232.jpeg)

### Zona Konfigurasi Atas (Kanan)

#### JP11 - Tachometer Pullup
- **Fungsi**: Menentukan tegangan sinyal output tachometer

- **Pilihan**: 12V atau 5V

- **Aplikasi**: Sesuaikan dengan kompatibilitas dashboard kendaraan Anda

#### Ignition VDrive 1-4 Jumper
- **Fungsi**: Mengatur tegangan sinyal pengapian untuk channel **Ignition 1, 2, 3, 4** — Smart Coil Only

- **Pilihan**: Sinyal 12V atau 5V

- **Khusus Smart Coil**: Jumper ini hanya untuk smart coil dengan driver internal

- **Alternatif**: Ketika channel 1-4 digunakan untuk pengapian 4-silinder, channel 5-6 tetap independen

- **PENTING**: Dump coil memerlukan IGBT eksternal

#### Ignition VDrive 5-6 Jumper *(Baru di v1.3C)*
- **Fungsi**: Mengatur tegangan sinyal untuk channel **Ignition 5 dan 6** secara **terpisah** dari channel 1-4

- **Pilihan**: Sinyal 12V atau 5V

- **Fleksibilitas**: Channel 5-6 dapat dikonfigurasi tegangan berbeda dari channel 1-4

- **Penggunaan Alternatif**: Saat digunakan sebagai switching control, sesuaikan tegangan (5V atau 12V) dengan kebutuhan beban

- **Lokasi**: Bagian bawah PCB (lihat foto jumper)

- **PENTING**: Dump coil memerlukan IGBT eksternal

#### Knock/PC13 Input Selection
- **Mode Knock**: Input sensor knock untuk deteksi ketukan mesin (default)

- **Mode PC13**: Akses langsung ke pin MCU untuk fungsi custom

- **v1.3C**: Satu input knock yang dioptimalkan pada pin MCU PA3

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper.jpeg)

### Zona Konfigurasi Tengah

#### JP5 & JP4 - Sensor Pullup Configuration
- **JP5**: Pullup 5V untuk sinyal CKP (Crankshaft Position)

- **JP4**: Pullup 5V untuk sinyal CMP (Camshaft Position)

- **Manfaat**: Sinyal trigger yang bersih dan stabil

#### JP3 & JP2 - Sensor Type Selection
- **JP3**: Mode sinyal CKP (VR atau Hall sensor)

- **JP2**: Mode sinyal CMP (VR atau Hall sensor)

- **Fleksibilitas**: Kompatibel dengan berbagai jenis sensor posisi

![Mazduino Mini 6ch](img/mini6ch/IMG_6230.jpeg)

### Zona Konfigurasi Kiri

#### JP6 - Stepper Motor Enable
- **Fungsi**: Kontrol aktivasi driver stepper motor

- **Note**: Konsultasi skematik untuk konfigurasi optimal

- **Aplikasi**: Idle Air Control (IAC) dengan presisi tinggi

#### JP7 & JP8 - Knock Sensor Filter Bypass
- **Fungsi**: Bypass filter internal untuk sensor knock

- **JP7**: Bypass filter internal knock stage 1

- **JP8**: Bypass filter internal knock stage 2

- **Note**: Untuk satu input knock di konektor ECU (pin 8)

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper2.jpeg)

### Tips Konfigurasi Jumper

#### Pengaturan Optimal:

- **Smart Coils 1-4**: Gunakan VDrive 1-4 sesuai spesifikasi coil (5V atau 12V)

- **Smart Coils 5-6**: Gunakan VDrive 5-6 sesuai spesifikasi coil atau beban alternatif — **dapat berbeda dari 1-4**

- **Dump/Conventional Coils**: Memerlukan IGBT eksternal

- **VR Sensors**: Aktifkan pullup dan pilih mode VR untuk sinyal bersih

- **Hall Sensors**: Nonaktifkan pullup dan pilih mode Hall

#### Best Practices:

1. **Pre-Installation**: Konfigurasi jumper sebelum instalasi final
2. **VDrive Terpisah**: Manfaatkan VDrive 5-6 yang independen untuk aplikasi mixed-voltage
3. **Documentation**: Catat konfigurasi jumper untuk referensi masa depan
4. **Testing**: Verifikasi sinyal setelah perubahan konfigurasi jumper
5. **Compatibility**: Pastikan jumper sesuai dengan hardware yang digunakan

#### Perhatian Khusus:

- **Jenis Coil Kritis**: VDrive hanya untuk smart coil - dump coil butuh IGBT eksternal

- **VDrive Terpisah**: VDrive 1-4 dan VDrive 5-6 adalah jumper yang **berbeda** di bawah PCB

- **Solder dengan Hati-hati**: Gunakan suhu solder yang tepat

- **Verifikasi Koneksi**: Pastikan sambungan solder yang solid

- **Konsultasi Skematik**: Rujuk diagram untuk konfigurasi lanjutan

- **Power Off**: Selalu matikan power saat mengubah jumper

## Wiring dan Instalasi

### Pin Mapping Konektor

Mazduino Mini 6CH v1.3C menggunakan konektor ECU Yamaha 48-pin dengan pin assignment sebagai berikut:

![Mazduino Mini 48-pin Connector](img/mazduino-48p-connector.jpeg)

#### Layout Konektor
```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

#### Pin Assignment (v1.3C)

| Pin | Fungsi | Deskripsi |
|-----|----------|-------------|
| 1 | 12V ECU | Catu daya utama ECU |
| 2 | IDLE1 | Output kontrol idle 1 |
| 3 | IDLE2 | Output kontrol idle 2 |
| 4 | CANH | CAN bus high |
| 5 | 5V | Output referensi 5V |
| 6 | AC-OUT / AC COMPRESOR | Kontrol kompresor AC |
| 7 | FUEL PUMP | Kontrol relay pompa bahan bakar |
| 8 | **Knock/PC13** | Input sensor knock (default) atau akses pin MCU langsung |
| 9 | VR1- | Input VR conditioner 1 negatif |
| 10 | VR2- | Input VR conditioner 2 negatif |
| 11 | Stepper B2 | Motor stepper fase B2 |
| 12 | Stepper B1 | Motor stepper fase B1 |
| 13 | Stepper A1 | Motor stepper fase A1 |
| 14 | Stepper A2 | Motor stepper fase A2 |
| 15 | Injector 5 | Injektor 5 atau output low-side arus tinggi cadangan |
| 16 | Injector 6 | Injektor 6 atau output low-side arus tinggi cadangan |
| 17 | Main Relay | Kontrol relay utama (low current low side) |
| 18 | **Spare Analog Input 1 / PPS1** | Input analog cadangan 1 atau Pedal Position Sensor 1 untuk ETB |
| 19 | VSS | Vehicle Speed Sensor |
| 20 | **AC-IN / AC Switch** | Input switch AC (Hanya menerima **GROUND** sebagai sinyal ON) |
| 21 | CANL | CAN bus low |
| 22 | **GND** | Ground ECU |
| 23 | FAN | Kontrol relay kipas |
| 24 | **Ignition 6** | Channel pengapian 6 atau switching control (5V/12V sesuai VDrive 5-6) |
| 25 | **Ignition 5** | Channel pengapian 5 atau switching control (5V/12V sesuai VDrive 5-6) |
| 26 | Ignition 1 | Channel pengapian 1 |
| 27 | Ignition 2 | Channel pengapian 2 |
| 28 | Ignition 3 | Channel pengapian 3 |
| 29 | Ignition 4 | Channel pengapian 4 |
| 30 | TPS | Sensor posisi throttle |
| 31 | MAP | Tekanan absolut manifold |
| 32 | Injector 4 | Channel injektor 4 |
| 33 | **ETB-** | Electronic Throttle Body negatif |
| 34 | **ETB+** | Electronic Throttle Body positif |
| 35 | **Spare Analog Input 2 / PPS2** | Input analog cadangan 2 atau Pedal Position Sensor 2 untuk ETB |
| 36 | Clutch | Input posisi kopling |
| 37 | **GND Sensor** | Ground sensor |
| 38 | **GND Sensor** | Ground sensor |
| 39 | **RPM / Tacho** | Output tachometer |
| 40 | **Spare Input 3 / TPS2** | Input cadangan 3 atau TPS2 untuk ETB |
| 41 | VR1+ | Sensor VR 1 positif |
| 42 | VR2+ | Sensor VR 2 positif |
| 43 | **O2** | Sensor oksigen (analog 5V, dari wideband controller analog output 1-5V) |
| 44 | IAT | Suhu udara masuk |
| 45 | CLT | Suhu coolant |
| 46 | Injector 2 | Channel injektor 2 |
| 47 | Injector 1 | Channel injektor 1 |
| 48 | Injector 3 | Channel injektor 3 |

### Pin Mapping MCU (v1.3C)

Pin assignment **STM32F427VGT6** yang telah dioptimalkan untuk v1.3C:

| Function | MCU Pin | Perubahan dari v1.3B |
|----------|---------|----------------------|
| Ignition Output 1 | PE15 | — |
| Ignition Output 2 | PE14 | — |
| Ignition Output 3 | PD13 | — |
| Ignition Output 4 | PE5 | — |
| Ignition Output 5 | PE2 | — |
| Ignition Output 6 | PE3 | — |
| Injection Output 1 | PD8 | — |
| Injection Output 2 | PB15 | — |
| Injection Output 3 | PB14 | — |
| Injection Output 4 | PB13 | — |
| Injection Output 5 | PD9 | — |
| Injection Output 6 | PE8 | — |
| MAP Sensor | PA0 | — |
| **TPS** | **PA6** | **Dipindah dari PA3** |
| IAT Sensor | PA5 | — |
| CLT Sensor | PA4 | — |
| O2 Sensor | PA1 | — |
| **Battery/Voltage Reff** | **PA7** | **Dipindah dari PA6** |
| Analog Spare Input 1 | PB0 | — |
| Analog Spare Input 2 | PB1 | — |
| Analog Spare Input 3 | PA2 | — |
| AC Input | PB5 | — |
| Clutch Input | PE12 | — |
| VSS | PD7 | — |
| CKP | PD3 | — |
| CMP | PD4 | — |
| Tacho | PC9 | — |
| Fuelpump Relay | PC8 | — |
| FAN Relay | PA15 | — |
| AC Compresor Relay | PC7 | — |
| Main Relay | PC5 | — |
| Idle 1 | PD10 | — |
| Idle 2 | PE9 | — |
| Stepper DIR | PD12 | — |
| Stepper ENBL | PD14 | — |
| Stepper STEP | PD15 | — |
| **Knock** | **PA3** | **Dari PC0+PC1 ke satu input PA3** |
| ETB-DIR | PB8 | — |
| ETB-DIS | PB9 | — |
| ETB-PWM | PA8 | — |
| TXD1 | PA9 | — |
| RXD1 | PA10 | — |
| TXD3 | PB10 | — |
| RXD3 | PB11 | — |
| TXCAN | PD1 | — |
| RXCAN | PD0 | — |
| SD CS | PD2 | — |
| SPI3 CLK | PC10 | — |
| SPI3 MISO | PC11 | — |
| SPI3 MOSI | PC12 | — |

### Fitur Khusus v1.3C

#### Konfigurasi Channel Fleksibel

**Ignition 6-Channel:**

- **6-silinder**: Gunakan semua channel 1-6 untuk pengapian mesin

- **4-silinder**: Channel 1-4 untuk pengapian, channel 5-6 tersedia sebagai **switching control**

- **Channel 5-6 Alternatif**: Output switching 5V atau 12V sesuai VDrive 5-6, dapat digunakan untuk kontrol selenoid, relay, atau beban lainnya

- **VDrive Terpisah**: Channel 1-4 dan 5-6 memiliki konfigurasi tegangan yang **independen**

**Injection 6-Channel:**

- **6-silinder**: Gunakan semua channel 1-6 untuk injektor mesin

- **4-silinder**: Channel 1-4 untuk injektor, channel 5-6 tersedia sebagai **output low-side cadangan**

- **Channel 5-6 Alternatif**: Output low-side 3A untuk kontrol boost, VVT, selenoid on/off, injeksi air/methanol, atau aplikasi PWM lainnya

#### Knock Input (Dioptimalkan di v1.3C)
- **Pin 8 (Knock/PC13)**: Input sensor knock dengan solder jumper default

- **Single Knock Input**: Satu input knock (**PA3**) — dikonsolidasi dari dua input (PC0 + PC1) pada v1.3B

- **Aplikasi**: Deteksi ketukan mesin untuk perlindungan dan optimasi timing pengapian

#### Electronic Throttle Body (ETB)
- **Pin 33 (ETB-)**: Output negatif untuk kontrol ETB

- **Pin 34 (ETB+)**: Output positif untuk kontrol ETB

- **Pin 40 (TPS2)**: Input analog khusus untuk sensor TPS2 yang dedicated untuk ETB

- **Pin 18/35 (PPS1/PPS2)**: Dual Pedal Position Sensor untuk kontrol ETB

- **ETB Control**: PWM (PA8), Direction (PB8), Disable (PB9)

#### Ignition VDrive Terpisah (Baru di v1.3C)
- **VDrive 1-4**: Jumper solder untuk tegangan sinyal ignition channel 1, 2, 3, 4 (5V atau 12V)

- **VDrive 5-6**: Jumper solder **terpisah** untuk tegangan sinyal ignition channel 5 dan 6 (5V atau 12V)

- **Lokasi**: Keduanya terdapat di bagian **bawah PCB**

- **Fleksibilitas**: Memungkinkan channel 5-6 dikonfigurasi tegangan berbeda dari channel 1-4 sesuai kebutuhan aplikasi

#### Dukungan VR Conditioner
- **VR1- & VR2-**: Pin input untuk modul VR conditioner (DIP 8) - negatif

- **VR1+ & VR2+**: Input sensor VR positif

#### Kontrol Stepper Motor
- **Stepper A1/A2**: Output fase A untuk stepper motor (DRV8825)

- **Stepper B1/B2**: Output fase B untuk stepper motor

- **Direction/Enable/Step**: Sinyal kontrol untuk driver stepper

### Panduan Instalasi
1. **Pemasangan**: Pasang ECU di lokasi yang tepat dengan pendinginan yang memadai
2. **Koneksi Daya**: Hubungkan daya 12V (pin 1) dan ground (pin 22)
3. **Ground Sensor**: Gunakan beberapa pin ground sensor (37, 38) untuk sinyal yang bersih
4. **Sensor Posisi Mesin**: Hubungkan sensor CKP/CMP atau gunakan input VR sesuai kebutuhan
5. **Knock Sensor**: Hubungkan sensor knock ke pin 8 (default konfigurasi)
6. **ETB Setup**: Hubungkan ETB ke pin 33/34 dan TPS2 ke pin 40 jika menggunakan throttle elektronik
7. **AC Switch**: Pastikan switch AC hanya memberikan sinyal GROUND untuk kondisi ON
8. **Konfigurasi VDrive**: Atur jumper VDrive 1-4 dan VDrive 5-6 secara terpisah di bagian bawah PCB sesuai jenis coil atau beban
9. **Channel Spare**: Konfigurasi channel injector 5-6 dan/atau ignition 5-6 sesuai kebutuhan aplikasi
10. **Instalasi Modul**: Pasang modul VR-Conditioner dan/atau Stepper jika diperlukan
11. **Verifikasi**: Test semua koneksi sebelum startup awal

### Catatan Wiring v1.3C
- **VDrive Terpisah**: Jumper VDrive 1-4 dan VDrive 5-6 berada di bagian **bawah PCB** — konfigurasi sebelum instalasi final

- **AC Switch Logic**: Pin 20 hanya menerima GROUND sebagai sinyal ON — jangan hubungkan 12V langsung

- **TPS Pin MCU**: TPS menggunakan PA6 (bukan PA3 seperti v1.3B) — pastikan konfigurasi firmware benar

- **Channel Spare**: Pin 15-16 (Injector 5-6) dan Pin 24-25 (Ignition 5-6) tersedia untuk penggunaan alternatif pada mesin 4-silinder

- **Referensi**: Informasi wiring sensor tambahan di [Speeduino Wiki][speeduino-wiring]

## Informasi Hardware

Mazduino Mini 6CH v1.3C didesain dengan **STM32F427VGT6** sebagai MCU utama, memberikan performa tinggi dengan clock 180MHz. Mendukung beberapa module tambahan seperti VR Conditioner Module dan Idle Stepper Module. Secara bawaan Mazduino Mini 6CH v1.3C hanya mendukung sinyal CKP dan CMP dalam bentuk digital, seperti sensor hall dan optical. Untuk kendaraan yang masih menggunakan VR sensor perlu menambahkan VR Module (atau bisa custom sensor ke hall).

![VR Module](img/mini6ch/vr-module.jpeg)

Kemudian untuk bagian Idle, Mazduino Mini 6CH v1.3C sudah support Idle PWM, terdapat 2 output dari low side mosfet yang dapat digunakan untuk kontrol IDLE PWM.

Untuk jenis Idle Control yang menggunakan stepper motor diperlukan module tambahan yaitu Idle Stepper Motor Module. Disini bisa menggunakan driver DRV8825.

![Stepper Module](img/mini6ch/stepper-module.jpeg)

Terdapat solder jumper di bagian belakang PCB:

**Solder Jumper v1.3C:**

- **Tach Pullup:** Pullup untuk tachometer/RPM Speedometer menggunakan 12V atau 5V

- **Ignition VDrive 1-4:** Tegangan sinyal untuk Ignition channel 1, 2, 3, 4 (12V atau 5V)

- **Ignition VDrive 5-6:** Tegangan sinyal untuk Ignition channel 5 dan 6 (12V atau 5V) — **terpisah dari jumper 1-4**

- **Knock/MCU PC13:** Opsi input Knock sensor atau langsung ke pin MCU PC13 (default untuk Knock)

- **JP4:** Pullup trigger CKP/Primary

- **JP5:** Pullup trigger CMP/Secondary

- **JP2:** Opsi VR atau Hall untuk CKP/Primary

- **JP3:** Opsi VR atau Hall untuk CMP/Secondary

- **JP6:** Bypass Idle Stepper

- **JP7 & JP8:** Bypass filter knock

- **Pullup Launch:** Digunakan untuk pullup pada pin spare input 3 jika digunakan untuk tombol aktivasi launch control/input lainnya yang membutuhkan pullup

## Software Tuning

### Download Software
Download software TunerStudio: [TunerStudio Downloads][tunerstudio-dl]

![TunerStudio](img/manual/tunerstudio-download.png)

### Konfigurasi Khusus v1.3C
- **TPS Pin**: Pastikan konfigurasi TPS menggunakan **PA6** (bukan PA3 seperti v1.3B)

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system {:target="_blank"}
[tunerstudio-dl]: https://www.tunerstudio.com/index.php/downloads {:target="_blank"}

- **Battery/VRef Pin**: Pastikan konfigurasi Battery/Voltage Reference menggunakan **PA7**

- **Knock Detection**: Gunakan **PA3** untuk konfigurasi knock sensor tunggal

- **ETB Setup**: Konfigurasi TPS2 pada pin 40

- **AC Switch Logic**: Pastikan konfigurasi AC switch menggunakan logic GROUND untuk ON

- **Pin Mapping**: Gunakan file konfigurasi pin mapping khusus v1.3C

### Firmware Support
- **rusEFI**: Dukungan penuh untuk v1.3C dengan pin mapping yang diperbarui

- **Speeduino**: Kompatibel dengan konfigurasi pin mapping terbaru

- **File Konfigurasi**: Tersedia di [halaman download](downloads.md)

## Wiring Diagram

### Wiring Sensor
![Sensor Wiring](img/sensor-wiring.png)

*Catatan: Pastikan AC Switch hanya menggunakan sinyal GROUND untuk kondisi ON*

### Injector Wiring
![Injector Wiring](img/injector-wiring.png)

### Ignition Wiring
![Ignition Wiring](img/ignition-wiring.png)

## Catatan Penting v1.3C

### Persyaratan Sistem Pengapian
- **Smart Coils**: Koneksi langsung didukung — VDrive 1-4 dan VDrive 5-6 dapat dikonfigurasi tegangan berbeda (5V atau 12V per grup)

- **Dump Coils**: IGBT eksternal diperlukan; VDrive jumper **tidak** digunakan untuk dump coil

### Migrasi dari v1.3B
- **TPS**: Update ke **PA6** (dari PA3) — wajib diubah di konfigurasi firmware

- **Battery/VRef**: Update ke **PA7** (dari PA6) — mengikuti perubahan TPS

- **Knock**: Hanya satu input (**PA3**) — hapus konfigurasi knock kedua jika ada

- **VDrive**: Konfigurasi ulang jumper VDrive 1-4 dan VDrive 5-6 di bagian bawah PCB secara terpisah

**[Download firmware dan file konfigurasi](downloads.md)**
