# Mazduino LITE v0.3

## Pengantar

Mazduino LITE v0.3 adalah versi terbaru dari keluarga ECU Mazduino LITE. Dirancang untuk aplikasi engine 4-silinder dengan 4 channel injector dan 2 channel ignition. Dibanding v0.2, board ini praktis sama — yang ditambahkan adalah header I2C untuk perangkat tambahan.

![Mazduino LITE ECU](img/lite/mazduino-lite-with-case.jpeg)

> **Firmware**: LITE berjalan dengan rusEFI, dan juga dapat memakai firmware
> **Speeduino** — memakai build yang dibuat untuk Mazduino Compact, bukan build
> tersendiri. Keduanya sudah diuji jalan. Lihat
> [halaman Downloads](downloads.md#firmware-speeduino).


**Perubahan v0.3 dari v0.2:**

- **Header I2C (J10)**: Dua pin SDA dan SCL dibawa keluar ke header, sebaris dengan header serial RX/TX yang sudah ada. Bus-nya sama dengan yang dipakai sensor barometer internal

!!! info "Pinout tidak berubah"
    Konektor utama 33-pin dan pemetaan pin MCU **identik dengan v0.2** (diverifikasi pin per pin dari file desain). Wiring harness dan konfigurasi firmware v0.2 dapat dipakai langsung tanpa perubahan.

**Yang diwarisi dari v0.2:**

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

- **Barometer Internal**: **Optional, tidak terpasang default kecuali diminta** (sejak v0.2)

### Sistem Output
- **Injection**: 4x high-current drivers untuk sequential atau batch mode

- **Ignition**: 2x outputs dengan Smart Coil (5V/12V) dan IGBT support
  - IGBT footprint **D2Pak to 263** yang umum dan mudah ditemukan (sejak v0.2)

- **Control**: 5x relay outputs untuk fuel pump, fan, AC, main relay, tachometer

- **Idle Control**: 2x PWM outputs untuk ISC valve

### Komunikasi
- **USB Type-C**: Modern connector untuk tuning dan programming

- **CAN Bus**: 4-pin connector dengan power selection (5V/12V)

- **Serial**: Header RX/TX untuk komunikasi tambahan

- **I2C (Baru di v0.3)**: Header SDA/SCL untuk perangkat I2C tambahan

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

#### Pin Assignment v0.3

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

**Perbedaan Penting terhadap v0.1**: Pin 7 dan 9 **ditukar** sejak v0.2 — Pin 7 adalah **Ground Coil**, Pin 9 adalah **Ignition 2**. Pinout v0.3 sama persis dengan v0.2

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

**Barometric Pressure Sensor** (sejak v0.2)

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
  - IGBT internal dengan footprint **D2Pak to 263** (umum & mudah ditemukan)

- **VR1/Hall, VR2/Hall**: Input type selection

- **Digital Pullup**: Enable internal pullup resistors

- **CAN Power**: 12V/5V pada CAN connector

### Perbaikan yang Dibawa dari v0.2

**Perbaikan Utama:**

- **Jalur PCB**: Perbaikan routing dan koreksi jalur untuk kemudahan jumper

- **IGBT Compatibility**: Footprint yang lebih umum dan mudah ditemukan

- **Barometer Support**: Mounting untuk sensor barometer internal (optional)

- **Pin Assignment**: Optimasi pin assignment untuk konektor 33-pin

### Header I2C (Baru di v0.3)

Dua pin bus I2C dibawa keluar ke header **J10**, sebaris dengan header serial RX/TX yang sudah ada di v0.2.

| Pin J10 | Sinyal | Pin MCU |
|---------|--------|---------|
| 1 | SDA | PB11 |
| 2 | SCL | PB10 |

**Yang perlu diperhatikan:**

- **Level 3.3V**: Bus ini bekerja di 3.3V — kedua jalur sudah di-pullup ke 3.3V di board. **Jangan sambungkan modul I2C yang jalurnya bekerja di 5V** tanpa level shifter, karena tegangan itu masuk langsung ke pin MCU

- **Pull-up sudah ada**: Modul tambahan tidak perlu membawa pull-up sendiri

- **Hanya dua jalur**: Header ini hanya membawa SDA dan SCL — tidak ada catu daya maupun ground di situ, jadi modul tambahan perlu mengambil daya dan ground dari tempat lain

- **Bus dipakai bersama**: Ini bus yang sama dengan sensor barometer internal. Modul tambahan harus memakai alamat I2C yang berbeda dari barometer

- **Dukungan firmware**: Header ini hanya menyediakan jalurnya — perangkat yang disambungkan tetap harus didukung firmware yang Anda pakai

### Sensor Barometer Internal (Optional)

Sensor barometer internal tersedia sebagai opsi sejak v0.2

**Spesifikasi:**

- **Sensor Type**: Barometric Pressure Sensor

- **Interface**: I2C

- **Pin MCU**: BARO SCL (PB10), BARO SDA (PB11)

- **Ketersediaan**: Optional - tidak terpasang default, dapat diminta saat pembelian

- **Fungsi**: Koreksi altitude dan referensi tekanan atmosfer

**Cara Pemesanan:**
Hubungi tim Mazduino dan sebutkan kebutuhan "barometer internal" saat pembelian LITE v0.3

### Rekomendasi Penggunaan v0.3

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

**CATATAN PINOUT v0.3**:

- **Pin 7**: Ground Coil (berbeda dengan v0.1)

- **Pin 9**: Ignition 2 (berbeda dengan v0.1)

- **Periksa kembali koneksi saat upgrade dari v0.1**

## Perbandingan Antar Versi

| Aspek | v0.1 | v0.2 | v0.3 |
|-------|------|------|------|
| **IGBT Footprint** | Tidak umum (issue) | D2Pak to 263 (umum) | D2Pak to 263 (umum) |
| **Pin 7** | Ignition 2 | Ground Coil | Ground Coil |
| **Pin 9** | Ground Coil | Ignition 2 | Ignition 2 |
| **Barometer Internal** | Tidak tersedia | Optional | Optional |
| **Jalur PCB** | Standard | Diperbaiki | Diperbaiki |
| **Header I2C** | Tidak ada | Tidak ada | Ada (J10) |
| **Rekomendasi** | COP/IGBT Eksternal | Semua aplikasi | Semua aplikasi |

Upgrade dari v0.2 ke v0.3 tidak menuntut perubahan apa pun pada harness maupun konfigurasi firmware.

---

## Wiring Harness

Rekomendasi ukuran kabel per pin untuk Mazduino LITE v0.3, lengkap dengan rekap jumlah kabel tiap ukuran, tersedia di [Rekomendasi Ukuran Kabel Harness](rekomendasi-ukuran-kabel.md).
