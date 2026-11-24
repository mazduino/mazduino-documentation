# Mazduino Mini 6CH (v1.3B)

## Gambaran Umum

Mazduino Mini 6CH v1.3B adalah perbaikan dari v1.3: Engine Control Unit 6-channel dengan prosesor **ARM Cortex-M4 180 MHz** 32-bit, dalam faktor bentuk kompak yang cocok untuk mesin 6-silinder atau mesin 4-silinder dengan output arus tinggi tambahan.

**Perbaikan v1.3B dari v1.3:**

- **Upgrade MCU**: Menggunakan ARM Cortex-M4 180 MHz, naik dari 168 MHz pada v1.3
- **Penambahan Input Analog**: Menambahkan 1 spare input analog khusus (pin 40) untuk sensor TPS2 yang dibutuhkan untuk ETB
- **Optimisasi Hardware**: Menghapus komponen yang tidak digunakan
- **Layout Komponen**: Menata ulang layout komponen untuk kinerja dan manufaktur yang lebih optimal

![Mazduino Mini 6ch](img/mazduino-mini-6ch-v1.3B.jpeg)

## Fitur Utama
- Input trigger utama untuk sensor CKP VR, hall atau optical
- Input trigger kedua untuk sensor CMP VR, hall atau optical
- 8 input analog (0-5V) untuk MAP, TPS, IAT, CLT, O2, dan 3 cadangan termasuk input analog khusus untuk TPS2/ETB yang dapat digunakan untuk sensor tekanan bahan bakar atau sensor lainnya
- Catu daya 5V untuk sensor dengan perlindungan fuse internal
- 4 input digital pullup untuk AC Switch, VSS, Clutch, Launch Control
- 8x driver low-side arus tinggi 3A untuk injektor high-impedance, idle PWM (ISC), Boost, VVT dan lainnya
- 5x driver low-side arus rendah untuk relay utama, pompa bahan bakar, kompresor AC, kipas, dan kontrol tachometer
- 6x output 12V atau 5V untuk sinyal koil pengapian
- Input sensor knock, diperbaiki di v1.3B
- Kontrol Electronic Throttle Body (ETB) dengan TPS1 dan TPS2
- Dukungan untuk Modul VR Conditioner tambahan
- Dukungan untuk Modul Stepper Idle tambahan
- Prosesor 180 MHz ARM Cortex-M4
- Komunikasi data via CANbus
- Komunikasi data via USB Type-C
- Komunikasi Serial RX/TX
- Konektor otomotif 48-pin
- Kartu SD untuk data logging

![Mazduino Mini 6ch](img/mazduino-mini6ch-new-case.jpeg)

## Konfigurasi Jumper

Mazduino Mini 6CH v1.3B memakai solder jumper untuk mengatur fungsi hardware tanpa mengubah firmware. Solder jumper Tach Pullup, Ignition VDrive dan Knock/PC13 ada di bagian belakang board.

![Mazduino Mini 6ch](img/mini6ch/IMG_6232.jpeg)

### Zona Konfigurasi Atas (Kanan)

#### JP11 - Tachometer Pullup
- **Fungsi**: Menentukan tegangan sinyal output tachometer

- **Pilihan**: 12V atau 5V

- **Aplikasi**: Sesuaikan dengan kompatibilitas dashboard kendaraan Anda

#### Ignition VDrive Jumper
- **Fungsi**: Mengatur tegangan sinyal pengapian untuk **Smart Coil Only**

- **Pilihan**: Sinyal 12V atau 5V. Gunakan 5V untuk coil dengan sinyal 5V dan 12V untuk coil dengan sinyal 12V

- **Khusus Smart Coil**: Jumper ini hanya untuk smart coil dengan driver internal; smart coil dapat dihubungkan langsung

- **PENTING**: Dumb coil memerlukan IGBT eksternal; jumper VDrive **tidak** digunakan untuk dumb coil

#### Knock/PC13 Input Selection
- **Mode Knock**: Input sensor knock untuk deteksi ketukan mesin (default)

- **Mode PC13**: Akses langsung ke pin MCU untuk fungsi custom

- **Perbaikan v1.3B**: Deteksi knock yang lebih stabil dan akurat

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

- **Note**: Konsultasi skematik untuk konfigurasi optimal

- **Aplikasi**: Idle Air Control (IAC) dengan presisi tinggi

#### JP7 & JP8 - Knock Sensor Filter Bypass
- **Fungsi**: Bypass filter internal untuk sensor knock

- **JP7**: Bypass filter internal knock stage 1

- **JP8**: Bypass filter internal knock stage 2

- **v1.3B Improvement**: Filter yang dioptimalkan untuk sensitivitas deteksi knock

- **Note**: Untuk satu input knock di konektor ECU (pin 8)

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper2.jpeg)

### Pullup Launch
Digunakan untuk pullup pada pin spare input 3 jika digunakan untuk tombol aktivasi launch control/input lainnya yang membutuhkan pullup.

### Tips Konfigurasi Jumper

- **VR Sensors**: Pilih mode VR (sinyal lewat modul VR Conditioner) dan **lepas** pullup — pullup akan membebani kumparan sensor VR

- **Hall / Optical Sensors**: Pilih mode Hall dan **pasang** pullup (JP5 untuk CKP, JP4 untuk CMP). Sensor hall umumnya open-collector dan tidak bisa menghasilkan level HIGH sendiri; tanpa pullup, pin trigger mengambang dan terkena noise sehingga muncul trigger error saat mesin hidup. Pullup hanya boleh dilepas untuk sensor yang outputnya push-pull 5V

## Wiring dan Instalasi

### Pin Mapping Konektor

Mazduino Mini 6CH v1.3B menggunakan konektor ECU Yamaha 48-pin dengan pin assignment yang diperbaiki sebagai berikut:

![Mazduino Mini 48-pin Connector](img/mazduino-48p-connector.jpeg)

#### Layout Konektor
```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

#### Pin Assignment (v1.3B)

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
| 15 | Injector 5 | Injektor 5 atau output arus tinggi cadangan |
| 16 | Injector 6 | Injektor 6 atau output arus tinggi cadangan |
| 17 | Main Relay | Kontrol relay utama (low current low side) |
| 18 | **Spare Analog Input 1 / PPS1** | Input analog cadangan 1 atau Pedal Position Sensor 1 untuk ETB |
| 19 | VSS | Vehicle Speed Sensor |
| 20 | **AC-IN / AC Switch** | Input switch AC (Hanya menerima **GROUND** sebagai sinyal ON) |
| 21 | CANL | CAN bus low |
| 22 | **GND** | Ground ECU |
| 23 | FAN | Kontrol relay kipas |
| 24 | Ignition 6 | Channel pengapian 6 |
| 25 | Ignition 5 | Channel pengapian 5 |
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

### Pin Mapping MCU (v1.3B)

Pin assignment **STM32F427VGT6** yang telah diperbaiki untuk v1.3B:

| Function | MCU Pin |
|----------|---------|
| Ignition Output 1 | PE15 |
| Ignition Output 2 | PE14 |
| Ignition Output 3 | PD13 |
| Ignition Output 4 | PE5 |
| Ignition Output 5 | PE2 |
| Ignition Output 6 | PE3 |
| Injection Output 1 | PD8 |
| Injection Output 2 | PB15 |
| Injection Output 3 | PB14 |
| Injection Output 4 | PB13 |
| Injection Output 5 | PD9 |
| Injection Output 6 | PE8 |
| MAP Sensor | PA0 |
| TPS | PA3 |
| IAT Sensor | PA5 |
| CLT Sensor | PA4 |
| O2 Sensor | PA1 |
| Battery/Voltage Reff | PA7 |
| Analog Spare Input 1 | PB0 |
| Analog Spare Input 2 | PB1 |
| **Analog Spare Input 3** | **PA2** |
| AC Input | PB5 |
| Clutch Input | PE12 |
| VSS | PD7 |
| CKP | PD3 |
| CMP | PD4 |
| Tacho | PC9 |
| Fuelpump Relay | PC8 |
| FAN Relay | PA15 |
| AC Compresor Relay | PC7 |
| Main Relay | PC5 |
| Idle 1 | PD10 |
| Idle 2 | PE9 |
| Stepper DIR | PD12 |
| Stepper ENBL | PD14 |
| Stepper STEP | PD15 |
| **Knock1** | **PC0** |
| **Knock2** | **PC1** |
| **ETB-DIR** | **PB8** |
| **ETB-DIS** | **PB9** |
| **ETB-PWM** | **PA8** |
| TXD1 | PA9 |
| RXD1 | PA10 |
| TXD3 | PB10 |
| RXD3 | PB11 |
| TXCAN | PD1 |
| RXCAN | PD0 |
| SD CS | PD2 |
| SPI3 CLK | PC10 |
| SPI3 MISO | PC11 |
| SPI3 MOSI | PC12 |

### Catatan Wiring v1.3B
- **O2 Sensor**: Pin 43 khusus untuk O2 sensor dengan path analog yang dioptimalkan (1-5V dari wideband controller)

- **TPS2 Dedicated**: Pin 40 adalah input analog tambahan khusus untuk sensor TPS2/ETB — **fitur baru v1.3B** (berbeda dari v1.3 yang menggunakan pin 43 untuk TPS2)

- **AC Switch Logic**: Pin 20 hanya menerima GROUND sebagai sinyal ON — jangan hubungkan 12V langsung

- **Knock**: Satu input knock di konektor ECU adalah pin 8 (MCU PC0)

- **Referensi**: Informasi wiring sensor tambahan di [Speeduino Wiki][speeduino-wiring]

## Informasi Hardware

Mazduino Mini 6CH v1.3B mendukung beberapa module tambahan seperti VR Conditioner Module dan Idle Stepper Module. Secara bawaan Mazduino Mini 6CH v1.3B hanya mendukung sinyal CKP dan CMP dalam bentuk digital, seperti sensor hall dan optical. Untuk kendaraan yang masih menggunakan VR sensor perlu menambahkan VR Module (atau bisa custom sensor ke hall).

Modul VR conditioner (DIP 8): sensor VR dihubungkan ke VR1+/VR2+ (pin 41, 42) dan VR1-/VR2- (pin 9, 10).

![VR Module](img/mini6ch/vr-conditioner-module.jpeg)

Kemudian untuk bagian Idle, Mazduino Mini 6CH v1.3B sudah support Idle PWM, terdapat 2 output dari low side mosfet yang dapat digunakan untuk kontrol IDLE PWM.

Untuk jenis Idle Control yang menggunakan stepper motor diperlukan module tambahan yaitu Idle Stepper Motor Module. Disini bisa menggunakan driver DRV8825. Output fase A1/A2 dan B1/B2 ada di pin 11-14.

![Stepper Module](img/mini6ch/drv8825-stepper.jpeg)

### Konfigurasi Injector Fleksibel
Pada mesin 4-silinder, Injector 5 dan 6 dapat dipakai sebagai output arus tinggi cadangan untuk kontrol boost, kontrol VVT, injeksi air/methanol, dll.

## Software Tuning

### Download Software
Download software TunerStudio: [TunerStudio Downloads][tunerstudio-dl]

![TunerStudio](img/manual/ts-download-page-overview.png)

### Konfigurasi Khusus v1.3B
- **Knock Detection**: Gunakan konfigurasi knock sensor yang dioptimalkan untuk v1.3B

- **ETB Setup**: Konfigurasi TPS2 pada pin 40 (bukan pin 43 seperti v1.3)

- **AC Switch Logic**: Pastikan konfigurasi AC switch menggunakan logic GROUND untuk ON

- **Pin Mapping**: Gunakan file konfigurasi pin mapping khusus v1.3B

### Firmware Support
- **rusEFI**: Dukungan penuh untuk v1.3B dengan pin mapping yang diperbaiki

- **Speeduino**: Kompatibel dengan konfigurasi pin mapping terbaru

- **File Konfigurasi**: Firmware dan file konfigurasi tersedia di [halaman download](downloads.md)

## Wiring Diagram

### Wiring Sensor
![Sensor Wiring](img/sensor-wiring.png)

### Injector Wiring
![Injector Wiring](img/injector-wiring.png)

### Ignition Wiring
![Ignition Wiring](img/ignition-wiring.png)

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system
[tunerstudio-dl]: https://www.tunerstudio.com/index.php/downloads
