# ECU Mazduino Compact (v2.3)

## Gambaran Umum

ECU Mazduino Compact v2.3 adalah versi terbaru dari Engine Control Unit standalone 4-channel yang menghadirkan perbaikan penting dan fitur tambahan. Dibuat khusus untuk firmware rusEFI dan Speeduino, memberikan engine control komprehensif dalam paket kompak yang cocok untuk operasi 4-silinder sequential penuh atau 8-silinder paired.

**Pembaruan v2.3:**

- **Perbaikan Pin Mapping MCU**: Pin mapping MCU yang dioptimalkan untuk performa lebih baik

- **Fix Knock Sensor**: Perbaikan knock sensor agar tidak konflik dengan TPS

- **RTC Battery Support**: Penambahan dukungan baterai RTC untuk real-time data logging menggunakan SD Card (opsional)

- **PCB Optimization**: Optimasi jalur pada PCB untuk performa dan reliabilitas yang lebih baik

- **Enhanced Compatibility**: Kompatibilitas yang ditingkatkan dengan berbagai sensor dan aktuator

![Mazduino Compact 4ch v2.3](img/mazduino-compact-4ch-v2.3.jpeg)

## Fitur Utama

### Core Features
- Input trigger utama untuk sensor CKP hall atau optical saja
- Input trigger kedua untuk sensor CMP hall atau optical saja  
- 6 input analog (0-5V) untuk MAP, TPS, IAT, CLT, O2, dan 1 cadangan
- **Knock Sensor Input**: Input khusus untuk sensor knock dengan IC conditioning yang diperbaiki

- Catu daya 5V untuk sensor dengan perlindungan fuse internal
- 3 input digital pullup untuk AC Switch, VSS, Clutch (AC atau VSS dapat digunakan untuk tombol Launch Control jika tidak diperlukan)
- **6x driver low-side arus tinggi 3A**: 4 injektor + Idle 1 + Idle 2 untuk high-impedance injector, idle PWM, boost control, VVT

- 5x driver low-side arus rendah untuk relay utama, pompa bahan bakar, kompresor AC, kipas, dan kontrol tachometer
- 4x output 12V atau 5V untuk sinyal koil pengapian
- **1x High Side Switching** untuk kontrol alternator/VVT/12V switching
- Prosesor 168 MHz ARM Cortex-M4
- Komunikasi data via CANbus
- Komunikasi data via USB Type-C
- Komunikasi Serial RX/TX
- **Konektor Yamaha 33-pin**: Konektor otomotif grade profesional dengan pin assignment yang optimal

- **SD Card dengan RTC**: Data logging real-time dengan dukungan baterai RTC (opsional)

### Perbaikan Knock Sensor (v2.3)
- **Pin MCU**: PA3 (dipindahkan dari PA6 untuk menghindari konflik dengan TPS)

- **Official Firmware Support**: PA3 dapat menggunakan firmware official rusEFI

- **Backward Compatibility**: PA6 tetap dapat digunakan dengan custom firmware

- **IC Conditioning**: Sirkuit kondisioning yang diperbaiki untuk sensitivitas optimal

- **Noise Immunity**: Peningkatan ketahanan terhadap noise elektrik

- **Firmware Flexibility**: Pilihan antara official firmware (PA3) atau custom firmware (PA6)

### RTC Battery Support (v2.3)
- **Real-time Clock**: Dukungan RTC untuk timestamp akurat pada data logging

- **Battery Backup**: Slot baterai koin untuk menjaga waktu saat ECU mati

- **Masalah yang Dipecahkan**: Sebelumnya data logging menunjukkan waktu 00:00:00

- **Solusi**: Baterai koin mempertahankan waktu real-time secara permanen

- **SD Card Logging**: Enhanced logging dengan timestamp yang akurat dan persisten

- **Data Integrity**: Memastikan integritas data dengan waktu yang selalu tersimpan

## Wiring dan Instalasi

### Pin Mapping Konektor

ECU Mazduino Compact v2.3 menggunakan konektor Yamaha 33-pin dengan pin assignment sebagai berikut:

![Mazduino Compact 33-pin Connector](img/connector-33p.jpeg)

#### Layout Konektor
```
11  10   9   8   7   6   5   4   3   2   1
22  21  20  19  18  17  16  15  14  13  12
33  32  31  30  29  28  27  26  25  24  23
```

#### Pin Assignment

| Pin | Fungsi | Deskripsi |
|-----|----------|-------------|
| 1 | Injector 1 | Channel injektor 1 |
| 2 | Injector 2 | Channel injektor 2 |
| 3 | Injector 3 | Channel injektor 3 |
| 4 | Injector 4 | Channel injektor 4 |
| 5 | Idle 1 | Output kontrol idle 1 (high current 3A) |
| 6 | Tacho | Output tachometer |
| 7 | Fan | Kontrol relay kipas |
| 8 | 5V | Output referensi 5V |
| 9 | 12V | Catu daya utama |
| 10 | Main Relay | Kontrol relay utama |
| 11 | GND | Ground |
| 12 | Idle 2 | Output kontrol idle 2 (high current 3A) |
| 13 | Ignition 4 | Channel pengapian 4 |
| 14 | Ignition 3 | Channel pengapian 3 |
| 15 | Ignition 2 | Channel pengapian 2 |
| 16 | Ignition 1 | Channel pengapian 1 |
| 17 | Fuel Pump | Kontrol relay pompa bahan bakar |
| 18 | AC Compressor | Relay kompresor AC |
| 19 | CKP | Sensor posisi crankshaft (Trigger 1) |
| 20 | GND | Ground |
| 21 | GND | Ground |
| 22 | High Side Out | Output High Side MOSFET |
| 23 | CLT | Suhu coolant |
| 24 | TPS | Sensor posisi throttle |
| 25 | O2 | Sensor oksigen |
| 26 | MAP | Tekanan absolut manifold |
| 27 | IAT | Suhu udara masuk |
| 28 | Spare Analog | Input analog cadangan |
| 29 | CMP | Sensor posisi camshaft (Trigger 2) |
| **30** | **Knock Sensor** | **Input sensor knock (diperbaiki di v2.3)** |
| 31 | AC Switch | Input switch AC (aktif ground) |
| 32 | Clutch | Input posisi kopling |
| 33 | VSS | Sensor kecepatan kendaraan |

### Pin Mapping MCU (v2.3)

Pin mapping MCU yang diperbarui untuk STM32F407VGT6 di v2.3:

| Fungsi | Pin MCU | Perubahan v2.3 |
|----------|---------|----------------|
| Output Pengapian 1 | PE15 | - |
| Output Pengapian 2 | PE14 | - |
| Output Pengapian 3 | PD13 | - |
| Output Pengapian 4 | PE5 | - |
| Output Injeksi 1 | PD8 | - |
| Output Injeksi 2 | PB15 | - |
| Output Injeksi 3 | PB14 | - |
| Output Injeksi 4 | PB13 | - |
| High Side Output | PA8 | - |
| Sensor MAP | PA0 | - |
| **TPS** | **PA6** | **🔄 Optimized** |
| Sensor IAT | PA5 | - |
| Sensor CLT | PA4 | - |
| Sensor O2 | PA1 | - |
| Battery/Voltage Ref | PA2 | - |
| **Knock Sensor** | **PA3** | **🔄 Dipindahkan dari PA6** |
| Input Analog Spare 1 | PB1 | - |
| Input Analog Spare 2 | PA7 | - |
| Input AC | PB0 | - |
| Input Clutch | PE13 | - |
| VSS | PD7 | - |
| CKP | PD3 | - |
| CMP | PD4 | - |
| Tacho | PC9 | - |
| Relay Pompa Bahan Bakar | PC8 | - |
| Relay FAN | PA15 | - |
| Relay Kompresor AC | PC7 | - |
| Relay Utama | PE8 | - |
| Idle 1 | PD9 | - |
| Idle 2 | PD10 | - |
| TXD1 | PA9 | - |
| RXD1 | PA10 | - |
| TXD3 | PB10 | - |
| RXD3 | PB11 | - |
| TXCAN | PD1 | - |
| RXCAN | PD0 | - |
| **SD CS** | **PD2** | **🔄 Enhanced untuk RTC** |
| SPI3 CLK | PC10 | - |
| SPI3 MISO | PC11 | - |
| SPI3 MOSI | PC12 | - |

## Spesifikasi Teknis

| Parameter | Nilai |
|-----------|--------|
| Input Voltage | 12V (9V - 16V) |
| MCU | ARM Cortex-M4 168 MHz |
| Clock Speed | 168 MHz |
| Flash Memory | 1MB |
| RAM | 192KB |
| Analog Inputs | 7 channels (0-5V) |
| Digital Inputs | 4 channels |
| Ignition Outputs | 4 channels (12V/5V) |
| Injection Outputs | 4 channels (3A max) |
| Auxiliary Outputs | 7 channels |
| High Side Output | 1 channel |
| Communication | USB-C, CAN, Serial |
| Data Logging | SD Card dengan RTC |
| Operating Temp | -40°C to +85°C |
| Dimensions | 100mm x 80mm |
| Connector | Yamaha 33-pin |
