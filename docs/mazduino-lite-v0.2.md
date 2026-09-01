# Mazduino LITE v0.2

## Pengantar

Mazduino LITE v0.2 adalah versi yang diperbaiki dan direkomendasikan dari keluarga ECU Mazduino LITE. Versi ini dirancang untuk aplikasi engine 4-silinder dengan 4 channel injector dan 2 channel ignition, dengan perbaikan signifikan pada IGBT footprint dan penambahan sensor barometer internal.

![Mazduino LITE ECU](img/lite/mazduino-lite-with-case.jpeg)

> **Firmware**: LITE berjalan dengan rusEFI, dan juga dapat memakai firmware
> **Speeduino** — memakai build yang dibuat untuk Mazduino Compact, bukan build
> tersendiri. Keduanya sudah diuji jalan. Lihat
> [halaman Downloads](downloads.md#firmware-speeduino).


**Keunggulan v0.2**: 

- IGBT footprint D2Pak to 263 (umum & mudah ditemukan)
- Sensor barometer internal (optional)
- Jalur PCB yang diperbaiki

## Fitur Utama

### Sistem Input
- **Trigger Input**: CKP dan CMP untuk Hall/Optical sensors

- **VR Support**: Variable Reluctance sensors dengan konditioner module

- **Analog Inputs**: 6x (0-5V) untuk MAP, TPS, IAT, CLT, O2, dan spare

- **Digital Inputs**: 5x pullup untuk AC Switch, VSS, Clutch, dan launch control

- **Sensor Power**: 5V regulated dengan internal fuse protection

- **Barometer Internal**: **Tersedia pada v0.2 (optional, tidak terpasang default kecuali diminta)**

### Sistem Output
- **Injection**: 4x high-current drivers untuk sequential atau batch mode

- **Ignition**: 2x outputs dengan Smart Coil (5V/12V) dan IGBT support
  - **v0.2**: IGBT footprint **D2Pak to 263** yang umum dan mudah ditemukan

- **Control**: 5x relay outputs untuk fuel pump, fan, AC, main relay, tachometer

- **Idle Control**: 2x PWM outputs untuk ISC valve

### Komunikasi
- **USB Type-C**: Modern connector untuk tuning dan programming

- **CAN Bus**: 4-pin connector dengan power selection (5V/12V)

- **Serial**: RX/TX pins untuk additional communication

### Penyimpanan dan Timing
- **SD Card**: Micro SD untuk onboard data logging (max 32GB)

- **RTC**: Battery-backed real-time clock

- **Processor**: ARM Cortex-M4

## Sistem Konektor

### Konektor Utama 33-Pin

![Connector Layout](img/lite/mazduino-lite-connector-layout.jpeg)

#### Layout Konektor
```
11  10   9   8   7   6   5   4   3   2   1
22  21  20  19  18  17  16  15  14  13  12
33  32  31  30  29  28  27  26  25  24  23
```

#### Pin Assignment v0.2

| Pin | Fungsi | Deskripsi |
|-----|----------|-------------|
| 1 | Idle 1 | Output kontrol idle 1 |
| 2 | Idle 2 | Output kontrol idle 2 |
| 3 | CKP/Digital1 | Crankshaft position |
| 4 | VR1- | VR sensor negatif |
| 5 | Ignition 1 | Channel pengapian 1 |
| 6 | Main Relay | Kontrol relay utama |
| 7 | **Ground Coil** | **Ground untuk coil** |
| 8 | Tacho/RPM | Output tachometer |
| 9 | **Ignition 2** | **Channel pengapian 2** |
| 10 | +5V | Output referensi 5V |
| 11 | +12V | Catu daya utama |
| 12 | Injector 3 | Channel injektor 3 |
| 13 | Injector 4 | Channel injektor 4 |
| 14 | CMP/Digital2 | Camshaft position |
| 15 | VR2- | VR sensor negatif 2 |
| 16 | VR2+ | VR sensor positif 2 |
| 17 | AC Relay | Kontrol relay AC |
| 18 | Fuel Pump Relay | Kontrol pompa bahan bakar |
| 19 | Fan Relay | Kontrol relay kipas |
| 20 | IAT | Intake air temperature |
| 21 | TPS | Throttle position sensor |
| 22 | Ground ECU | Ground ECU |
| 23 | Injector 2 | Channel injektor 2 |
| 24 | Injector 1 | Channel injektor 1 |
| 25 | Ground Sensor | Ground sensor |
| 26 | Ground Sensor | Ground sensor |
| 27 | VR1+ | VR sensor positif 1 |
| 28 | MAP | Manifold absolute pressure |
| 29 | Clutch/Digital3 | Input posisi kopling |
| 30 | CLT | Coolant temperature |
| 31 | AC Switch Input | Input switch AC (Aktif Ground) |
| 32 | VSS/Digital4 | Vehicle speed sensor |
| 33 | O2 Sensor | Sensor oksigen |

**Perbedaan Penting v0.2**: Pin 7 dan 9 **ditukar** - Pin 7 adalah **Ground Coil**, Pin 9 adalah **Ignition 2**

### CAN Bus Konektor (4-Pin)

| Pin | Fungsi |
|-----|----------|
| 1 | Power (12V/5V selectable) |
| 2 | CAN Low |
| 3 | CAN High |
| 4 | Ground |

## Pin Mapping MCU

Untuk pengguna lanjutan dan pengembangan firmware:

| Fungsi | Pin MCU |
|----------|---------|
| Ignition Output 1 | PE15 |
| Ignition Output 2 | PE14 |
| Injection Output 1 | PD8 |
| Injection Output 2 | PB15 |
| Injection Output 3 | PB14 |
| Injection Output 4 | PB13 |
| MAP Sensor | PA0 |
| TPS | PA3 |
| IAT Sensor | PA5 |
| CLT Sensor | PA4 |
| O2 Sensor | PA1 |
| Battery/Voltage Reff | PA2 |
| Analog Spare Input 1 | PB1 |
| AC Input | PB0 |
| Clutch Input | PE13 |
| VSS | PD7 |
| CKP | PC6 |
| CMP | PE11 |
| VR1 | PD3 |
| VR2 | PD4 |
| Tacho | PC9 |
| Fuelpump Relay | PC8 |
| FAN Relay | PA15 |
| AC Compresor Relay | PC7 |
| Main Relay | PE8 |
| Idle 1 | PD9 |
| Idle 2 | PD10 |
| TXD1 | PA9 |
| RXD1 | PA10 |
| TXD3 | PB10 |
| RXD3 | PB11 |
| **BARO SCL** | **PB10** |
| **BARO SDA** | **PB11** |
| TXCAN | PD1 |
| RXCAN | PD0 |
| SD CS | PD2 |
| SPI3 CLK | PC10 |
| SPI3 MISO | PC11 |
| SPI3 MOSI | PC12 |

**Tambahan v0.2**: Pin mapping untuk **Barometric Pressure Sensor**

- **BARO SCL**: PB10 (shared dengan TXD3)

- **BARO SDA**: PB11 (shared dengan RXD3)

## Konfigurasi Hardware

### Pengaturan Jumper Kritis

**PENTING**: Konfigurasi jumper harus benar sebelum power-up!

#### Top Side Board
- **Coil Voltage**: 12V/5V selection (default berdasarkan coil type)

- **CAN Terminator**: Enable/disable resistor terminator

- **VR Conditioner**: 8-pin connector untuk VR module

#### Bottom Side Board
- **Tacho Signal**: 5V/12V output selection (default 12V)

- **IGN1/IGN2 Mode**: Smart Coil/IGBT selection (JP3/JP4)
  - **v0.2**: IGBT internal dengan footprint **D2Pak to 263** (umum & mudah ditemukan)

- **VR1/Hall, VR2/Hall**: Input type selection

- **Digital Pullup**: Enable internal pullup resistors

- **CAN Power**: 12V/5V pada CAN connector

### Perbaikan pada v0.2

**Perbaikan Utama:**

- **Jalur PCB**: Perbaikan routing dan koreksi jalur untuk kemudahan jumper

- **IGBT Compatibility**: Footprint yang lebih umum dan mudah ditemukan

- **Barometer Support**: Mounting untuk sensor barometer internal (optional)

- **Pin Assignment**: Optimasi pin assignment untuk konektor 33-pin

### Sensor Barometer Internal (Optional)

**Fitur Baru v0.2**: Sensor barometer internal tersedia sebagai opsi

**Spesifikasi:**

- **Sensor Type**: Barometric Pressure Sensor

- **Interface**: I2C

- **Pin MCU**: BARO SCL (PB10), BARO SDA (PB11)

- **Ketersediaan**: Optional - tidak terpasang default, dapat diminta saat pembelian

- **Fungsi**: Koreksi altitude dan referensi tekanan atmosfer

**Cara Pemesanan:**
Hubungi tim Mazduino dan sebutkan kebutuhan "barometer internal" saat pembelian LITE v0.2

### Rekomendasi Penggunaan v0.2

**Ideal untuk:**

- **Semua aplikasi** engine management
- Setup dengan **IGBT Internal**
- Aplikasi yang memerlukan **barometer internal**
- **Pengguna baru** dan instalasi yang mudah
- Project dengan komponen yang mudah ditemukan

**Keunggulan:**

- IGBT footprint umum (D2Pak to 263)
- Jalur PCB yang diperbaiki
- Optional barometer internal
- Reliability yang lebih baik

### Peringatan Keselamatan

**PERINGATAN**:

- **Jangan hubungkan sinyal 12V langsung ke ECU input**
- **Verifikasi coil voltage jumper sebelum koneksi**
- **Gunakan sensor ground terpisah dari power ground**
- **Check all jumper settings sebelum first power-up**

**CATATAN PINOUT v0.2**:

- **Pin 7**: Ground Coil (berbeda dengan v0.1)

- **Pin 9**: Ignition 2 (berbeda dengan v0.1)

- **Periksa kembali koneksi saat upgrade dari v0.1**

## Perbandingan dengan v0.1

| Aspek | v0.1 | v0.2 |
|-------|------|------|
| **IGBT Footprint** | Tidak umum (issue) | D2Pak to 263 (umum) |
| **Pin 7** | Ignition 2 | Ground Coil |
| **Pin 9** | Ground Coil | Ignition 2 |
| **Barometer Internal** | Tidak tersedia | Optional |
| **Jalur PCB** | Standard | Diperbaiki |
| **Rekomendasi** | COP/IGBT Eksternal | Semua aplikasi |

---

## Wiring Harness

Rekomendasi ukuran kabel per pin untuk Mazduino LITE v0.2, lengkap dengan rekap jumlah kabel tiap ukuran, tersedia di [Rekomendasi Ukuran Kabel Harness](rekomendasi-ukuran-kabel.md).
