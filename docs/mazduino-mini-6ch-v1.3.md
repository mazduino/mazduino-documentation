# Mazduino Mini 6CH (v1.3)

## Gambaran Umum

Mazduino Mini 6CH v1.3 adalah Engine Control Unit 6-channel yang kompak dirancang untuk digunakan dengan firmware rusEFI dan Speeduino. Dibangun di sekitar prosesor ARM Cortex-M4 32-bit, dalam faktor bentuk kompak yang cocok untuk mesin 6-silinder atau mesin 4-silinder dengan output arus tinggi tambahan.

![Mazduino Mini 6ch](img/mazduino-mini-6ch-v1.3.jpeg)

## Fitur Utama
- Input trigger utama untuk sensor CKP VR, hall atau optical
- Input trigger kedua untuk sensor CMP VR, hall atau optical
- 7 input analog (0-5V) untuk MAP, TPS, IAT, CLT, O2, dan 2 cadangan yang dapat digunakan untuk sensor tekanan bahan bakar atau sensor lainnya
- Catu daya 5V untuk sensor dengan perlindungan fuse internal
- 4 input digital pullup untuk AC Switch, VSS, Clutch, Launch Control
- 8x driver low-side arus tinggi 3A untuk injektor high-impedance, idle PWM (ISC), Boost, VVT dan lainnya
- 5x driver low-side arus rendah untuk relay utama, pompa bahan bakar, kompresor AC, kipas, dan kontrol tachometer
- 6x output 12V atau 5V untuk sinyal koil pengapian
- **Knock Input (baru di v1.3)**: Input sensor knock untuk deteksi ketukan mesin
- **ETB Support (baru di v1.3)**: Kontrol Electronic Throttle Body dengan TPS1 dan TPS2
- Dukungan untuk Modul VR Conditioner tambahan
- Dukungan untuk Modul Stepper Idle tambahan
- Prosesor 168 MHz ARM Cortex-M4
- Komunikasi data via CANbus
- Komunikasi data via USB Type-C
- Komunikasi Serial RX/TX
- Konektor otomotif 48-pin
- Kartu SD untuk data logging

## Konfigurasi Jumper

Beberapa fungsi Mazduino Mini 6CH v1.3 dipilih dengan jumper solder, tanpa mengubah firmware.

![Mazduino Mini 6ch](img/mini6ch/IMG_6232.jpeg)

### Zona Konfigurasi Atas (Kanan)

#### JP11 - Tachometer Pullup
- **Fungsi**: Menentukan tegangan sinyal output tachometer
- **Pilihan**: 12V atau 5V, sesuaikan dengan dashboard kendaraan Anda

#### Ignition VDrive Jumper
- **Fungsi**: Mengatur tegangan sinyal pengapian, **khusus smart coil** (coil dengan driver internal)
- **Pilihan**: 5V untuk coil dengan sinyal 5V, 12V untuk coil dengan sinyal 12V

#### Knock/PC13 Input Selection
- **Mode Knock**: Input sensor knock untuk deteksi ketukan mesin (default)
- **Mode PC13**: Akses langsung ke pin MCU untuk fungsi custom

![Mazduino Mini 6ch](img/mini6ch/IMG_6229.jpeg)

### Zona Konfigurasi Tengah

#### JP5 & JP4 - Sensor Pullup Configuration
- **JP5**: Pullup 5V untuk sinyal CKP (Crankshaft Position)
- **JP4**: Pullup 5V untuk sinyal CMP (Camshaft Position)

#### JP2 & JP3 - Sensor Type Selection
- **JP2**: Mode sinyal CKP (VR atau Hall sensor)
- **JP3**: Mode sinyal CMP (VR atau Hall sensor)

![Mazduino Mini 6ch](img/mini6ch/IMG_6230.jpeg)

### Zona Konfigurasi Kiri

#### JP10 - CAN Bus Controller
- **Fungsi**: Mengaktifkan IC CAN bus TJA1051T/3
- **Protocol**: Mendukung standar automotive CAN 2.0

#### JP6 - Stepper Motor Enable
- **Fungsi**: Kontrol aktivasi driver stepper motor untuk Idle Air Control (IAC)

#### JP7 & JP8 - Knock Sensor Filter Bypass
- **Fungsi**: Bypass filter untuk sensor knock, untuk menyesuaikan sensitivitas deteksi knock
- **JP7**: Bypass filter knock channel 1
- **JP8**: Bypass filter knock channel 2

![Mazduino Mini 6ch](img/mini6ch/IMG_6231.jpeg)

### Tips Konfigurasi Jumper

- **VR Sensors**: Pilih mode VR (sinyal lewat modul VR Conditioner) dan **lepas** pullup — pullup akan membebani kumparan sensor VR
- **Hall / Optical Sensors**: Pilih mode Hall dan **pasang** pullup (JP5 untuk CKP, JP4 untuk CMP). Sensor hall umumnya open-collector dan tidak bisa menghasilkan level HIGH sendiri; tanpa pullup, pin trigger mengambang dan terkena noise sehingga muncul trigger error saat mesin hidup. Pullup hanya boleh dilepas untuk sensor yang outputnya push-pull 5V

## Wiring dan Instalasi

### Pin Mapping Konektor

Mazduino Mini 6CH v1.3 menggunakan konektor ECU Yamaha 48-pin dengan pin assignment sebagai berikut:

![Mazduino Mini 48-pin Connector](img/mazduino-48p-connector.jpeg)

#### Layout Konektor
```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

#### Pin Assignment

| Pin | Fungsi | Deskripsi |
|-----|----------|-------------|
| 1 | 12V ECU | Catu daya utama ECU |
| 2 | IDLE1 | Output kontrol idle 1 |
| 3 | IDLE2 | Output kontrol idle 2 |
| 4 | CANH | CAN bus high |
| 5 | 5V | Output referensi 5V |
| 6 | AC Compressor | Kontrol kompresor AC |
| 7 | Fuel Pump | Kontrol relay pompa bahan bakar |
| 8 | **Knock/PC13** | Input sensor knock (default) atau akses pin MCU langsung |
| 9 | VR-1 | Input VR conditioner 1 |
| 10 | VR-2 | Input VR conditioner 2 |
| 11 | Stepper B2 | Motor stepper fase B2 |
| 12 | Stepper B1 | Motor stepper fase B1 |
| 13 | Stepper A1 | Motor stepper fase A1 |
| 14 | Stepper A2 | Motor stepper fase A2 |
| 15 | Injector 5 | Injektor 5 atau output arus tinggi cadangan |
| 16 | Injector 6 | Injektor 6 atau output arus tinggi cadangan |
| 17 | Main Relay | Kontrol relay utama (low current low side) |
| 18 | **Spare Analog 1/PPS1** | Input analog cadangan 1 atau Pedal Position Sensor 1 |
| 19 | VSS | Sensor kecepatan kendaraan |
| 20 | AC Switch | Input switch AC |
| 21 | CANL | CAN bus low |
| 22 | GND | Ground ECU |
| 23 | Fan | Kontrol relay kipas |
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
| 35 | **Spare Analog 2/PPS2** | Input analog cadangan 2 atau Pedal Position Sensor 2 |
| 36 | Clutch | Input posisi kopling |
| 37 | GND Sensor | Ground sensor |
| 38 | GND Sensor | Ground sensor |
| 39 | Tacho | Output tachometer |
| 40 | Launch Control | Input launch control |
| 41 | VR1+ | Sensor VR 1 positif |
| 42 | VR2+ | Sensor VR 2 positif |
| 43 | **O2/TPS2** | Sensor oksigen (1-5V dari kontroler wideband) atau TPS2 untuk ETB |
| 44 | IAT | Suhu udara masuk |
| 45 | CLT | Suhu coolant |
| 46 | Injector 2 | Channel injektor 2 |
| 47 | Injector 1 | Channel injektor 1 |
| 48 | Injector 3 | Channel injektor 3 |

### Pin Mapping MCU

Untuk pengguna lanjutan dan pengembangan firmware, berikut adalah pin assignment STM32F407VGT6 untuk v1.3:

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
| Battery/Voltage Ref | PA2 |
| Analog Spare Input 1 | PB0 |
| Analog Spare Input 2 | PB1 |
| AC Input | PB5 |
| Launch Control Input | PE13 |
| Clutch Input | PE12 |
| VSS | PD7 |
| CKP | PD3 |
| CMP | PD4 |
| **Knock1** | **PC0** |
| **Knock2** | **PC1** |
| **ETB-DIR** | **PB8** |
| **ETB-DIS** | **PB9** |
| **ETB-PWM** | **PA8** |
| Tacho | PC9 |
| Fuel Pump Relay | PC8 |
| FAN Relay | PA15 |
| AC Compressor Relay | PC7 |
| Main Relay | PC5 |
| Idle 1 | PD10 |
| Idle 2 | PE9 |
| Stepper DIR | PD12 |
| Stepper ENBL | PD14 |
| Stepper STEP | PD15 |
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


### Catatan Wiring
- **ETB**: ETB dihubungkan ke pin 33 (ETB-) dan 34 (ETB+), dengan dual TPS di pin 30 (TPS) dan 43 (TPS2) serta dual Pedal Position Sensor di pin 18 (PPS1) dan 35 (PPS2)
- Wiring kompatibel dengan standar wiring Speeduino
- Informasi wiring sensor tambahan ada di [Speeduino Wiki][speeduino-wiring]

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system

## Dukungan Modul

### Modul VR-Conditioner
Modul VR conditioner (DIP 8) mengubah sinyal sensor VR menjadi sinyal digital. Sensor VR dihubungkan ke VR1+/VR2+ (pin 41, 42) dan VR-1/VR-2 (pin 9, 10).

### Modul Stepper Motor
Modul driver stepper DRV8825 untuk idle air control. Output fase A1/A2 dan B1/B2 ada di pin 11-14.

## Konfigurasi Injector Fleksibel
Pada mesin 4-silinder, Injector 5 dan 6 dapat dipakai sebagai output arus tinggi cadangan untuk kontrol boost, kontrol VVT, injeksi air/methanol, dll.

## Persyaratan Sistem Pengapian
- **Smart coil**: dapat dihubungkan langsung; pilih VDrive 5V atau 12V sesuai spesifikasi coil
- **Dumb coil**: memerlukan IGBT eksternal; jumper VDrive **tidak** digunakan untuk dumb coil

## File Firmware & Konfigurasi
**[Download firmware dan file konfigurasi](downloads.md)**
