# ECU Mazduino Compact (v2.2)

## Gambaran Umum

ECU Mazduino Compact v2.2 adalah evolusi terbaru dari Engine Control Unit standalone 4-channel yang dirancang untuk aplikasi manajemen mesin yang serbaguna. Dibuat khusus untuk firmware rusEFI dan Speeduino, memberikan engine control komprehensif dalam paket kompak yang cocok untuk operasi 4-silinder sequential penuh atau 8-silinder paired.

**Fitur Baru v2.2:**

- **High Side Switching**: Output high-side MOSFET untuk kontrol alternator, VVT, dan switching 12V lainnya

- **Enhanced Pin Mapping**: Pin 22 konektor dialokasikan untuk output High Side

- **PA8 MCU Support**: Kontrol high-side melalui pin MCU PA8

![Mazduino Compact 4ch v2.2](img/mazduino-compact-4ch-v2.2.jpeg)

## Fitur Utama

### Core Features
- Input trigger utama untuk sensor CKP hall atau optical saja
- Input trigger kedua untuk sensor CMP hall atau optical saja  
- 6 input analog (0-5V) untuk MAP, TPS, IAT, CLT, O2, dan 1 cadangan
- **Knock Sensor Input**: Input khusus untuk sensor knock dengan IC conditioning

- Catu daya 5V untuk sensor dengan perlindungan fuse internal
- 3 input digital pullup untuk AC Switch, VSS, Clutch (AC atau VSS dapat digunakan untuk tombol Launch Control jika tidak diperlukan)
- **6x driver low-side arus tinggi 3A**: 4 injektor + Idle 1 + Idle 2 untuk high-impedance injector, idle PWM, boost control, VVT

- 5x driver low-side arus rendah untuk relay utama, pompa bahan bakar, kompresor AC, kipas, dan kontrol tachometer
- 4x output 12V atau 5V untuk sinyal koil pengapian
- **NEW: 1x High Side Switching** untuk kontrol alternator/VVT/12V switching

- Prosesor 168 MHz ARM Cortex-M4
- Komunikasi data via CANbus
- Komunikasi data via USB Type-C
- Komunikasi Serial RX/TX
- **Konektor Yamaha 33-pin**: Konektor otomotif grade profesional dengan pin assignment yang optimal

- Kartu SD untuk data logging

### High Side Switching (v2.2)
- **Output Type**: High-side MOSFET switching

- **Voltage**: 12V switching capability

- **Current Rating**: High current handling untuk beban berat

- **Applications**: 
  - Kontrol alternator field
  - Variable Valve Timing (VVT) solenoid
  - High current 12V loads
  - Auxiliary systems control
- **MCU Control**: Pin PA8 untuk kontrol PWM dan digital switching

## Wiring dan Instalasi

### Pin Mapping Konektor

ECU Mazduino Compact v2.2 menggunakan konektor Yamaha 33-pin dengan pin assignment sebagai berikut:

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
| 12 | Idle 2 | Output kontrol idle 2 (high current 3A) - dapat digunakan untuk boost/VVT |
| 13 | Ignition 4 | Channel pengapian 4 |
| 14 | Ignition 3 | Channel pengapian 3 |
| 15 | Ignition 2 | Channel pengapian 2 |
| 16 | Ignition 1 | Channel pengapian 1 |
| 17 | Fuel Pump | Kontrol relay pompa bahan bakar |
| 18 | AC Compressor | Relay kompresor AC |
| 19 | CKP | Sensor posisi crankshaft (Trigger 1) |
| 20 | GND | Ground |
| 21 | GND | Ground |
| **22** | **High Side Out** | **Output High Side MOSFET** |
| 23 | CLT | Suhu coolant |
| 24 | TPS | Sensor posisi throttle |
| 25 | O2 | Sensor oksigen |
| 26 | MAP | Tekanan absolut manifold |
| 27 | IAT | Suhu udara masuk |
| 28 | Spare Analog | Input analog cadangan |
| 29 | CMP | Sensor posisi camshaft (Trigger 2) |
| 30 | Knock Sensor | Input sensor knock dengan IC conditioning |
| 31 | AC Switch | Input switch AC (aktif ground) |
| 32 | Clutch | Input posisi kopling |
| 33 | VSS | Sensor kecepatan kendaraan |

### Pin Mapping MCU

Untuk pengguna lanjutan dan pengembangan firmware, berikut adalah pin assignment STM32F407VGT6 untuk v2.2:

| Fungsi | Pin MCU |
|----------|---------|
| Output Pengapian 1 | PE15 |
| Output Pengapian 2 | PE14 |
| Output Pengapian 3 | PD13 |
| Output Pengapian 4 | PE5 |
| Output Injeksi 1 | PD8 |
| Output Injeksi 2 | PB15 |
| Output Injeksi 3 | PB14 |
| Output Injeksi 4 | PB13 |
| **High Side Output** | **PA8** |
| Sensor MAP | PA0 |
| TPS | PA3 |
| Sensor IAT | PA5 |
| Sensor CLT | PA4 |
| Sensor O2 | PA1 |
| Battery/Voltage Ref | PA2 |
| Input Analog Cadangan 1 | PB1 |
| **Knock Sensor** | **PA6** |
| Input AC | PB0 |
| Input Clutch | PE13 |
| VSS | PD7 |
| CKP | PD3 |
| CMP | PD4 |
| Tacho | PC9 |
| Relay Pompa Bahan Bakar | PC8 |
| Relay FAN | PA15 |
| Relay Kompresor AC | PC7 |
| Relay Utama | PE8 |
| Idle 1 | PD9 |
| Idle 2 | PD10 |
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

## High Side Switching

- **MCU Pin**: PA8, **Connector Pin**: Pin 22

- **Output Type**: High-side P-channel MOSFET, 12V, PWM/digital support

- **Aplikasi**: Kontrol alternator field, VVT solenoid, atau beban 12V lainnya

Contoh wiring:
```
Pin 22 (High Side) → VVT Solenoid (+)
VVT Solenoid (-) → Vehicle Ground
```

> Selalu gunakan fuse sesuai rating beban. Matikan power sebelum wiring.

## Catatan

- **Smart Coils**: Koneksi langsung didukung. **Dump Coils**: Memerlukan IGBT eksternal.

- **Upgrade dari v2.1**: Pin 22 berubah menjadi High Side Output — sesuaikan wiring jika upgrade.

- Solder jumper di bagian belakang PCB untuk konfigurasi tegangan pengapian dan knock sensor enable.

**[Download firmware dan file konfigurasi](downloads.md)**

## Perbandingan Versi

| Feature | v2.1 | v2.2 |
|---------|------|------|
| Core MCU | ARM Cortex-M4 168 MHz | ARM Cortex-M4 168 MHz |
| Ignition Outputs | 4x | 4x |
| Injection Outputs | 4x | 4x |
| Low Side Outputs | 5x | 5x |
| **High Side Output** | **Tidak** | **Ya (Pin 22)** |
| **MCU Pin PA8** | **Unused** | **High Side Control** |
| CAN Bus | Ya | Ya |
| USB Type-C | Ya | Ya |
| SD Card | Ya | Ya |
| Knock Sensor | Ya (Pin 30) | Ya (Pin 30) |
| High Current MOSFET | 6 (4 injektor + 2 idle) | 6 (4 injektor + 2 idle) |
| Stepper Support | Ya | Ya |

---

**Update v2.2**: Menambahkan High Side Switching untuk kontrol alternator, VVT, dan aplikasi 12V switching lainnya melalui pin 22 konektor dan pin PA8 MCU.
