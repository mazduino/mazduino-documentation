# Mazduino Mini 6CH (v1.3C)

## Gambaran Umum

Mazduino Mini 6CH v1.3C adalah versi Mini 6CH yang merupakan perbaikan dari versi v1.3B. Dibangun di sekitar prosesor 32-bit **ARM Cortex-M4 180 MHz**, cocok untuk mesin 6-silinder atau mesin 4-silinder dengan output arus tinggi tambahan.

**Perbaikan v1.3C dari v1.3B:**

- **Optimisasi Pin MCU**: Pemindahan pin TPS ke PA6 dan Battery/Voltage Reference ke PA7
- **Knock Input Tunggal**: Konsolidasi dari 2 input knock (PC0, PC1) menjadi 1 input knock (PA3)
- **VDrive Ignition Terpisah**: Dua jumper VDrive terpisah — satu untuk channel ignition 1-4 dan satu untuk channel ignition 5-6, sehingga kedua grup dapat diatur ke tegangan berbeda
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
- Satu input sensor knock (PA3)
- **ETB Support**: Kontrol Electronic Throttle Body dengan TPS1 dan TPS2
- Dukungan untuk Modul VR Conditioner tambahan
- Dukungan untuk Modul Stepper Idle tambahan
- Prosesor 180 MHz ARM Cortex-M4
- Komunikasi data via CANbus
- Komunikasi data via USB Type-C
- Komunikasi Serial RX/TX
- Konektor otomotif 48-pin
- Kartu SD untuk data logging

![Mazduino Mini 6ch](img/mazduino-mini6ch-new-case.jpeg)

## Konfigurasi Channel 6CH

### Ignition Channel (6x)

| Channel | Penggunaan Default | Penggunaan Alternatif |
|---------|-------------------|----------------------|
| Ignition 1-4 | Channel pengapian silinder 1-4 | — |
| Ignition 5-6 | Channel pengapian silinder 5-6 | Switching control 5V atau 12V (on/off atau PWM) |

Untuk mesin 4-silinder, **channel ignition 5 dan 6 (pin 25, 24) dapat digunakan sebagai output switching control** 5V atau 12V sesuai jumper VDrive 5-6, untuk kontrol selenoid, relay, atau beban lainnya.

### Injection Channel (6x)

| Channel | Penggunaan Default | Penggunaan Alternatif |
|---------|-------------------|----------------------|
| Injector 1-4 | Channel injektor silinder 1-4 | — |
| Injector 5-6 | Channel injektor silinder 5-6 | Output low-side arus tinggi cadangan |

Untuk mesin 4-silinder, **channel injector 5 dan 6 (pin 15, 16) dapat digunakan sebagai output low-side 3A** untuk selenoid on/off, kontrol boost, VVT, injeksi air/methanol, atau kontrol PWM lainnya.

## Konfigurasi Jumper

Beberapa fungsi input dan output diatur dengan jumper solder di bagian belakang PCB, tanpa perlu mengubah firmware.

![Mazduino Mini 6ch](img/mini6ch/IMG_6232.jpeg)

### Zona Konfigurasi Atas (Kanan)

#### JP11 - Tachometer Pullup
- **Fungsi**: Menentukan tegangan sinyal output tachometer
- **Pilihan**: 12V atau 5V, sesuaikan dengan kompatibilitas dashboard kendaraan Anda

#### Ignition VDrive 1-4 Jumper
- **Fungsi**: Mengatur tegangan sinyal pengapian untuk channel **Ignition 1, 2, 3, 4** — khusus smart coil dengan driver internal
- **Pilihan**: Sinyal 12V atau 5V, sesuai spesifikasi coil

#### Ignition VDrive 5-6 Jumper *(Baru di v1.3C)*
- **Fungsi**: Mengatur tegangan sinyal untuk channel **Ignition 5 dan 6** secara **terpisah** dari channel 1-4, sehingga tegangannya dapat berbeda dari channel 1-4
- **Pilihan**: Sinyal 12V atau 5V, sesuai spesifikasi coil; saat digunakan sebagai switching control, sesuaikan tegangan dengan kebutuhan beban
- **Lokasi**: VDrive 1-4 dan VDrive 5-6 adalah jumper yang **berbeda**, keduanya di bagian bawah PCB (lihat foto jumper). Atur sebelum instalasi final

#### Knock/PC13 Input Selection
- **Mode Knock**: Input sensor knock untuk deteksi ketukan mesin (default)
- **Mode PC13**: Akses langsung ke pin MCU untuk fungsi custom

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper.jpeg)

### Zona Konfigurasi Tengah

#### JP5 & JP4 - Sensor Pullup Configuration
- **JP5**: Pullup 5V untuk sinyal CKP (Crankshaft Position)
- **JP4**: Pullup 5V untuk sinyal CMP (Camshaft Position)

#### JP2 & JP3 - Sensor Type Selection
- **JP2**: Mode sinyal CKP (VR atau Hall sensor)
- **JP3**: Mode sinyal CMP (VR atau Hall sensor)

![Mazduino Mini 6ch](img/mini6ch/IMG_6230.jpeg)

### Zona Konfigurasi Kiri

#### JP6 - Stepper Motor Enable
- **Fungsi**: Kontrol aktivasi driver stepper motor (bypass Idle Stepper)
- **Aplikasi**: Idle Air Control (IAC)

#### JP7 & JP8 - Knock Sensor Filter Bypass
- **Fungsi**: Bypass filter internal untuk sensor knock
- **JP7**: Bypass filter internal knock stage 1
- **JP8**: Bypass filter internal knock stage 2
- **Note**: Untuk satu input knock di konektor ECU (pin 8)

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper2.jpeg)

### Pullup Launch
Pullup pada pin spare input 3 (pin 40), dipakai jika pin ini digunakan untuk tombol aktivasi launch control atau input lain yang membutuhkan pullup.

### Tips Konfigurasi Jumper
- **VR Sensors**: Pilih mode VR (sinyal lewat modul VR Conditioner) dan **lepas** pullup — pullup akan membebani kumparan sensor VR
- **Hall / Optical Sensors**: Pilih mode Hall dan **pasang** pullup (JP5 untuk CKP, JP4 untuk CMP). Sensor hall umumnya open-collector dan tidak bisa menghasilkan level HIGH sendiri; tanpa pullup, pin trigger mengambang dan terkena noise sehingga muncul trigger error saat mesin hidup. Pullup hanya boleh dilepas untuk sensor yang outputnya push-pull 5V

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

### Catatan Wiring
- **AC Switch Logic**: Pin 20 hanya menerima GROUND sebagai sinyal ON — jangan hubungkan 12V langsung
- Informasi wiring sensor tambahan ada di [Speeduino Wiki][speeduino-wiring]

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system

## Informasi Hardware

Secara bawaan Mazduino Mini 6CH v1.3C hanya mendukung sinyal CKP dan CMP dalam bentuk digital, seperti sensor hall dan optical. Untuk kendaraan yang masih menggunakan VR sensor perlu menambahkan VR Module (atau bisa custom sensor ke hall). Modul VR conditioner (DIP 8) dihubungkan ke VR1+/VR2+ (pin 41, 42) dan VR1-/VR2- (pin 9, 10).

![VR Module](img/mini6ch/vr-conditioner-module.jpeg)

Untuk Idle, Mazduino Mini 6CH v1.3C sudah support Idle PWM, terdapat 2 output low-side yang dapat digunakan untuk kontrol IDLE PWM.

Untuk jenis Idle Control yang menggunakan stepper motor diperlukan module tambahan yaitu Idle Stepper Motor Module dengan driver DRV8825. Output fase A1/A2 dan B1/B2 ada di pin 11-14; sinyal kontrol driver adalah Direction, Enable dan Step.

![Stepper Module](img/mini6ch/drv8825-stepper.jpeg)

## Software Tuning

### Download Software
Download software TunerStudio: [TunerStudio Downloads][tunerstudio-dl]

[tunerstudio-dl]: https://www.tunerstudio.com/index.php/downloads

![TunerStudio](img/manual/ts-download-page-overview.png)

### Konfigurasi Khusus v1.3C
- **Pin MCU**: TPS di **PA6**, Battery/Voltage Reference di **PA7**, knock sensor tunggal di **PA3** (lihat [Migrasi dari v1.3B](#migrasi-dari-v13b))
- **ETB Setup**: Konfigurasi TPS2 pada pin 40
- **AC Switch Logic**: Pastikan konfigurasi AC switch menggunakan logic GROUND untuk ON
- **Pin Mapping**: Gunakan file konfigurasi pin mapping khusus v1.3C

### Firmware Support
- **rusEFI**: Dukungan penuh untuk v1.3C dengan pin mapping yang diperbarui
- **Speeduino**: Tidak didukung pada v1.3C — gunakan rusEFI
- **Firmware dan file konfigurasi**: Tersedia di [halaman download](downloads.md)

## Wiring Diagram

### Wiring Sensor
![Sensor Wiring](img/sensor-wiring.png)

### Injector Wiring
![Injector Wiring](img/injector-wiring.png)

### Ignition Wiring
![Ignition Wiring](img/ignition-wiring.png)

## Persyaratan Sistem Pengapian
- **Smart coil**: dapat dihubungkan langsung — VDrive 1-4 dan VDrive 5-6 dapat dikonfigurasi tegangan berbeda (5V atau 12V per grup)
- **Dumb coil / coil konvensional**: memerlukan IGBT eksternal; jumper VDrive **tidak** digunakan untuk dumb coil

## Migrasi dari v1.3B
- **TPS**: Update ke **PA6** (dari PA3) — wajib diubah di konfigurasi firmware
- **Battery/VRef**: Update ke **PA7** (dari PA6) — mengikuti perubahan TPS
- **Knock**: Hanya satu input (**PA3**) — hapus konfigurasi knock kedua jika ada
- **VDrive**: Konfigurasi ulang jumper VDrive 1-4 dan VDrive 5-6 di bagian bawah PCB secara terpisah

## Wiring Harness

Rekomendasi ukuran kabel per pin untuk Mazduino Mini 6CH v1.3C, lengkap dengan rekap jumlah kabel tiap ukuran, tersedia di [Rekomendasi Ukuran Kabel Harness](rekomendasi-ukuran-kabel.md).
