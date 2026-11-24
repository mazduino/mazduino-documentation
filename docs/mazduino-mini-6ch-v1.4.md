# Mazduino Mini 6CH (v1.4)

> **Catatan**: v1.4 sempat diproduksi. Setelah itu lini Mini 6CH kembali ke seri v1.3, karena seri tersebut mendukung modul stepper DRV8825, dan revisinya berlanjut hingga **[v1.3E](mazduino-mini-6ch-v1.3e.md)**, versi produksi terbaru.

## Gambaran Umum

Mazduino Mini 6CH v1.4 adalah Engine Control Unit 6-channel untuk firmware rusEFI, dengan prosesor ARM Cortex-M4 32-bit.

**Fitur Baru v1.4:**

- **VVT (Variable Valve Timing)**: Output kontrol timing katup variabel
- **BOOST Control**: Output kontrol boost pressure untuk aplikasi forced induction
- **Dual ETB IC**: Dukungan dual Electronic Throttle Body dengan IC driver terintegrasi
- **Idle Stepper lewat Dual H-Bridge**: Motor stepper idle digerakkan oleh dua IC driver ETB, tanpa modul stepper tambahan — lihat [Idle Stepper lewat Dual H-Bridge](#idle-stepper-lewat-dual-h-bridge)

![Mazduino Mini 6ch](img/mazduino-mini-6ch-v1.4.jpeg)

## Fitur Utama
- Input trigger utama untuk sensor CKP VR, hall atau optical
- Input trigger kedua untuk sensor CMP VR, hall atau optical
- 8 input analog (0-5V) di konektor 48-pin untuk MAP, TPS, IAT, CLT, O2, dan 3 cadangan (pin 18, 35, 13), ditambah 1 input analog cadangan (IN4) di header 6-pin pada board; input cadangan dapat digunakan untuk sensor tekanan bahan bakar atau sensor lainnya
- Catu daya 5V untuk sensor dengan perlindungan fuse internal
- 4 input digital pullup untuk AC Switch, VSS, Clutch, Launch Control
- 8x driver low-side arus tinggi 3A untuk injektor high-impedance, idle PWM (ISC), Boost, VVT dan lainnya
- 5x driver low-side arus rendah untuk relay utama, pompa bahan bakar, kompresor AC, kipas, dan kontrol tachometer
- 6x output 12V atau 5V untuk sinyal koil pengapian
- Knock Input untuk deteksi ketukan mesin
- Dukungan untuk Modul VR Conditioner tambahan
- Prosesor 168 MHz ARM Cortex-M4
- Komunikasi data via CANbus
- Komunikasi data via USB Type-C
- Komunikasi Serial RX/TX
- Konektor otomotif 48-pin
- Kartu SD untuk data logging

## Konfigurasi Jumper

Fungsi board disesuaikan dengan jumper solder, tanpa mengubah firmware.

![Mazduino Mini 6ch](img/mini6ch/IMG_6232.jpeg)

### Zona Konfigurasi Atas (Kanan)

#### JP11 - Tachometer Pullup
- **Fungsi**: Menentukan tegangan sinyal output tachometer

- **Pilihan**: 12V atau 5V

- **Aplikasi**: Sesuaikan dengan kompatibilitas dashboard kendaraan Anda

#### Ignition VDrive Jumper
- **Fungsi**: Mengatur tegangan sinyal pengapian untuk **Smart Coil Only** (smart coil dengan driver internal, dapat dihubungkan langsung)

- **Pilihan**: Sinyal 12V atau 5V. Gunakan 5V untuk coil dengan sinyal 5V dan 12V untuk coil dengan sinyal 12V

- **PENTING**: Dumb coil (coil konvensional) memerlukan IGBT eksternal

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
- **Fungsi**: Mengaktifkan IC CAN bus

#### JP7 - Knock Sensor Filter Bypass
- **Fungsi**: Bypass filter untuk input knock di konektor ECU (pin 8)

![Mazduino Mini 6ch](img/mini6ch/IMG_6231.jpeg)

### Tips Konfigurasi Jumper

- **VR Sensors**: Pilih mode VR (sinyal lewat modul VR Conditioner) dan **lepas** pullup — pullup akan membebani kumparan sensor VR

- **Hall / Optical Sensors**: Pilih mode Hall dan **pasang** pullup (JP5 untuk CKP, JP4 untuk CMP). Sensor hall umumnya open-collector dan tidak bisa menghasilkan level HIGH sendiri; tanpa pullup, pin trigger mengambang dan terkena noise sehingga muncul trigger error saat mesin hidup. Pullup hanya boleh dilepas untuk sensor yang outputnya push-pull 5V

## Wiring dan Instalasi

### Pin Mapping Konektor

Mazduino Mini 6CH v1.4 menggunakan konektor ECU Yamaha 48-pin dengan pin assignment sebagai berikut:

![Mazduino Mini 48-pin Connector](img/mazduino-48p-connector.jpeg)

#### Layout Konektor
```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

#### Pin Assignment v1.4

| Pin | Fungsi | Deskripsi |
|-----|----------|-------------|
| 1 | **12V ECU** | Catu daya utama ECU |
| 2 | **IDLE2** | Output kontrol idle 2 |
| 3 | **IDLE1** | Output kontrol idle 1 |
| 4 | **VVT** | **[BARU v1.4]** Variable Valve Timing control output |
| 5 | **5V** | Output referensi 5V untuk sensor |
| 6 | **BOOST** | **[BARU v1.4]** Boost control PWM output |
| 7 | **Fuel Pump** | Kontrol relay pompa bahan bakar |
| 8 | **Knock/PC13** | Input sensor knock (default) atau akses pin MCU langsung |
| 9 | **VR1-** | Input VR conditioner 1 negatif |
| 10 | **VR2-** | Input VR conditioner 2 negatif |
| 11 | **ETB2-** | **[BARU v1.4]** Electronic Throttle Body 2 negatif |
| 12 | **ETB2+** | **[BARU v1.4]** Electronic Throttle Body 2 positif |
| 13 | **Spare Input 3** | Input analog cadangan 3 |
| 14 | **High Side** | 12V Switching / Alternator Control / VTEC Control |
| 15 | **Injector 5** | Injektor 5 atau output arus tinggi cadangan (boost/vvt/control pwm) |
| 16 | **Injector 6** | Injektor 6 atau output arus tinggi cadangan (boost/vvt/control pwm) |
| 17 | **Main Relay** | Kontrol relay utama (low current low side) |
| 18 | **Spare Analog 1/PPS1** | Input analog cadangan 1 atau Pedal Position Sensor 1 |
| 19 | **VSS** | Sensor kecepatan kendaraan (Vehicle Speed Sensor) |
| 20 | **AC-IN** | Input switch AC |
| 21 | **AC Relay** | Kontrol relay kompresor AC |
| 22 | **GND** | Ground ECU |
| 23 | **Fan** | Kontrol relay kipas |
| 24 | **Ignition 6** | Channel pengapian 6 |
| 25 | **Ignition 5** | Channel pengapian 5 |
| 26 | **Ignition 1** | Channel pengapian 1 |
| 27 | **Ignition 2** | Channel pengapian 2 |
| 28 | **Ignition 3** | Channel pengapian 3 |
| 29 | **Ignition 4** | Channel pengapian 4 |
| 30 | **TPS** | Sensor posisi throttle (TPS1) |
| 31 | **MAP** | Sensor tekanan absolut manifold |
| 32 | **Injector 4** | Channel injektor 4 |
| 33 | **ETB-** | Electronic Throttle Body 1 negatif |
| 34 | **ETB+** | Electronic Throttle Body 1 positif |
| 35 | **Spare Analog 2/PPS2** | Input analog cadangan 2 atau Pedal Position Sensor 2 |
| 36 | **Clutch** | Input posisi kopling |
| 37 | **GND Sensor** | Ground sensor |
| 38 | **GND Sensor** | Ground sensor |
| 39 | **RPM/Tacho** | Output tachometer |
| 40 | **Launch Control** | Input launch control |
| 41 | **VR1+** | Sensor VR 1 positif |
| 42 | **VR2+** | Sensor VR 2 positif |
| 43 | **O2/TPS2** | Sensor oksigen (1-5V dari kontroler wideband) atau TPS2 untuk ETB |
| 44 | **IAT** | Sensor suhu udara masuk |
| 45 | **CLT** | Sensor suhu coolant |
| 46 | **Injector 2** | Channel injektor 2 |
| 47 | **Injector 1** | Channel injektor 1 |
| 48 | **Injector 3** | Channel injektor 3 |

### Pin Mapping MCU v1.4

Untuk pengguna lanjutan dan pengembangan firmware, berikut adalah pin assignment STM32F407VGT6 untuk v1.4:

| Function | MCU Pin | Keterangan |
|----------|---------|------------|
| Ignition Output 1 | PE15 | Channel pengapian 1 |
| Ignition Output 2 | PE14 | Channel pengapian 2 |
| Ignition Output 3 | PD13 | Channel pengapian 3 |
| Ignition Output 4 | PE5 | Channel pengapian 4 |
| Ignition Output 5 | PE2 | Channel pengapian 5 |
| Ignition Output 6 | PE3 | Channel pengapian 6 |
| Injection Output 1 | PD8 | Channel injektor 1 |
| Injection Output 2 | PB15 | Channel injektor 2 |
| Injection Output 3 | PB14 | Channel injektor 3 |
| Injection Output 4 | PB13 | Channel injektor 4 |
| Injection Output 5 | PD9 | Channel injektor 5 |
| Injection Output 6 | PE8 | Channel injektor 6 |
| MAP Sensor | PC0 | Input sensor MAP |
| TPS | PA2 | Input sensor TPS1 |
| IAT Sensor | PA5 | Input sensor suhu udara |
| CLT Sensor | PA4 | Input sensor suhu coolant |
| O2 Sensor | PA0 | Input sensor oksigen |
| Battery/Voltage Ref | PA7 | Referensi tegangan baterai |
| Analog Spare Input 1 | PB0 | Input analog cadangan 1 |
| Analog Spare Input 2 | PB1 | Input analog cadangan 2 |
| Analog Spare Input 3 | PA1 | Input analog cadangan 3 |
| Analog Spare Input 4 | PC1 | Input analog cadangan 4 (IN4, header 6-pin) |
| AC Input | PB5 | Input switch AC |
| Launch Control Input | PE13 | Input launch control |
| Clutch Input | PE12 | Input sensor kopling |
| VSS | PD7 | Input sensor kecepatan |
| CKP | PD3 | Input sensor posisi crankshaft |
| CMP | PD4 | Input sensor posisi camshaft |
| Tacho | PC9 | Output tachometer |
| Fuelpump Relay | PC8 | Kontrol relay pompa bahan bakar |
| FAN Relay | PA15 | Kontrol relay kipas |
| AC Compressor Relay | PC7 | Kontrol relay kompresor AC |
| Main Relay | PC5 | Kontrol relay utama |
| Idle 1 | PD10 | Output idle control 1 (pin 3) |
| Idle 2 | PE9 | Output idle control 2 (pin 2) |
| High Side | PD15 | Output 12V switching |
| **ETB-DIR** | **PB8** | **[v1.4]** ETB direction control |
| **ETB-DIS** | **PB9** | **[v1.4]** ETB disable control |
| **ETB-PWM** | **PA8** | **[v1.4]** ETB PWM control |
| **ETB2-DIR** | **PD12** | **[BARU v1.4]** ETB2 direction control |
| **ETB2-DIS** | **PD11** | **[BARU v1.4]** ETB2 disable control |
| **ETB2-PWM** | **PD14** | **[BARU v1.4]** ETB2 PWM control |
| **VVT** | **PB6** | **[BARU v1.4]** Variable valve timing |
| **BOOST** | **PB4** | **[BARU v1.4]** Boost control PWM |
| Knock | PA3 | Input sensor knock |
| TXD1 | PA9 | UART1 transmit |
| RXD1 | PA10 | UART1 receive |
| TXD3 | PB10 | UART3 transmit |
| RXD3 | PB11 | UART3 receive |
| TXCAN | PD1 | CAN transmit |
| RXCAN | PD0 | CAN receive |
| SD CS | PD2 | SD card chip select |
| SPI3 CLK | PC10 | SPI3 clock |
| SPI3 MISO | PC11 | SPI3 master in |
| SPI3 MOSI | PC12 | SPI3 master out |

### Fitur Khusus v1.4

#### Variable Valve Timing (VVT)
- Pin 4 (VVT), MCU PB6: output PWM low-side untuk solenoid VVT; sisi lain solenoid dihubungkan ke 12V

#### Boost Control
- Pin 6 (BOOST), MCU PB4: output PWM low-side untuk solenoid boost control; sisi lain solenoid dihubungkan ke 12V

#### Dual Electronic Throttle Body (ETB)
- **ETB1**: Pin 33/34 (ETB-/ETB+) dengan kontrol PB8, PB9, PA8; TPS1 di pin 30 dan TPS2 di pin 43
- **ETB2**: Pin 11/12 (ETB2-/ETB2+) dengan kontrol PD12, PD11, PD14; feedback TPS memakai input analog tambahan
- **Pedal**: PPS1 di pin 18 dan PPS2 di pin 35

#### Idle Stepper lewat Dual H-Bridge
v1.4 tidak memakai modul stepper DRV8825. Motor stepper idle (bipolar, 4 kabel) digerakkan oleh dua driver H-bridge ETB:

- **Kumparan A**: pin 33/34 (ETB-/ETB+)
- **Kumparan B**: pin 11/12 (ETB2-/ETB2+)
- **Firmware**: aktifkan **Drive stepper with dual H bridges** di pengaturan Idle Stepper, lalu isi **H-Bridge Hardware No1** dan **No2** dengan pin ETB dan ETB2 dari [tabel pin MCU](#pin-mapping-mcu-v14)
- Saat kedua H-bridge dipakai untuk stepper, ETB tidak dapat dipakai

#### Injector 5 & 6 sebagai Output Arus Tinggi
Injector 5 dan 6 (pin 15, 16) dapat dipakai sebagai output arus tinggi cadangan (3A kontinu per channel) untuk VVT atau boost tambahan, output kontrol PWM lain, atau injeksi air/methanol.

## File Firmware & Konfigurasi
**[Download firmware dan file konfigurasi](downloads.md)**
