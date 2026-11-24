# Mazduino Mini 6CH (v1.3E)

## Gambaran Umum

Mazduino Mini 6CH v1.3E adalah **versi produksi terbaru** dari lini Mini 6CH. Pinout konektor dan pemetaan pin MCU sama dengan v1.3D; yang berubah adalah setelan input analog dan sensor suhu, serta soket driver stepper. Board kompak ini memakai prosesor 32-bit **ARM Cortex-M4 180 MHz** dan cocok untuk mesin 6-silinder atau mesin 4-silinder dengan output arus tinggi tambahan.

**Perubahan v1.3E dari v1.3D:**

- **Analog Divider Ratio 1.56**: Nilai **Analog divider ratio** untuk v1.3E adalah **1.56** (v1.3D: 1.516) dan **wajib** diatur di firmware — lihat [Setelan Firmware v1.3E](#setelan-firmware-v13e)

- **Sensor IAT dan CLT**: Nilai **Pullup resistor** pada setelan sensor CLT dan IAT adalah 2700 Ω

- **Soket Stepper untuk A4988 atau DRV8825**: Solder jumper baru **JP13** memilih jenis driver stepper

- **JP8 Dihapus**: Bypass filter knock tinggal satu jumper, JP7

- **Test Point PC2 dan PC3**: Titik solder untuk akses langsung ke pin MCU PC2 dan PC3

!!! info "Pinout tidak berubah"
    Pinout konektor 48-pin dan pemetaan pin MCU **identik dengan v1.3D**. Tune v1.3D dapat dipakai, dengan satu perubahan wajib: **Analog divider ratio** diatur ke **1.56**.

**Sudah ada sejak v1.3D:**

- **Pembacaan Sensor Analog Lebih Stabil**: Pembacaan semua input analog stabil dan konsisten, tanpa setelan tambahan

- **Terminasi CAN Onboard**: Resistor **120 Ω terpasang tetap** antara CANH dan CANL (pin 4 dan 21). Lihat [catatan soal terminasi](#terminasi-can-onboard) sebelum menyambung ke bus yang sudah punya terminator

- **JP9 Tanpa Bridge Pabrik**: Jumper Knock/PC13 datang **terbuka**; pin 8 belum tersambung sampai Anda menjembatani salah satu sisinya

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
- **Knock Input**: Satu input sensor knock (PA3)
- **ETB Support**: Kontrol Electronic Throttle Body dengan TPS1 dan TPS2
- Dukungan untuk Modul VR Conditioner tambahan
- Dukungan untuk Modul Stepper Idle tambahan (driver A4988 atau DRV8825)
- **Prosesor 180 MHz ARM Cortex-M4**
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

Untuk mesin 4-silinder, **channel ignition 5 dan 6 (pin 25 dan 24) dapat digunakan sebagai output switching control** (5V atau 12V) sesuai konfigurasi jumper VDrive 5-6 di bagian bawah PCB, misalnya untuk selenoid, relay, atau beban lainnya.

### Injection Channel (6x)

| Channel | Penggunaan Default | Penggunaan Alternatif |
|---------|-------------------|----------------------|
| Injector 1-4 | Channel injektor silinder 1-4 | — |
| Injector 5-6 | Channel injektor silinder 5-6 | Output low-side arus tinggi cadangan |

Untuk mesin 4-silinder, **channel injector 5 dan 6 (pin 15 dan 16) dapat digunakan sebagai output low-side 3A** untuk selenoid on/off, kontrol boost, VVT, injeksi air/methanol, atau kontrol PWM lainnya.

## Konfigurasi Jumper

Solder jumper di bagian belakang PCB menentukan fungsi beberapa input dan output tanpa perlu mengubah firmware.

![Mazduino Mini 6ch](img/mini6ch/IMG_6232.jpeg)

### Zona Konfigurasi Atas (Kanan)

#### JP11 - Tachometer Pullup
- **Fungsi**: Menentukan tegangan sinyal output tachometer

- **Pilihan**: 12V atau 5V

- **Aplikasi**: Sesuaikan dengan kompatibilitas dashboard kendaraan Anda

#### Ignition VDrive 1-4 Jumper
- **Fungsi**: Mengatur tegangan sinyal pengapian untuk channel **Ignition 1, 2, 3, 4** — hanya untuk smart coil dengan driver internal; untuk dumb coil lihat [Persyaratan Sistem Pengapian](#persyaratan-sistem-pengapian)

- **Pilihan**: Sinyal 12V atau 5V

#### Ignition VDrive 5-6 Jumper
- **Fungsi**: Mengatur tegangan sinyal untuk channel **Ignition 5 dan 6** secara **terpisah** dari channel 1-4

- **Pilihan**: Sinyal 12V atau 5V

- **Penggunaan Alternatif**: Saat digunakan sebagai switching control, sesuaikan tegangan (5V atau 12V) dengan kebutuhan beban

- **Lokasi**: Bagian bawah PCB (lihat foto jumper)

#### Knock/PC13 Input Selection (JP9)
- **Mode Knock**: Input sensor knock untuk deteksi ketukan mesin

- **Mode PC13**: Akses langsung ke pin MCU untuk fungsi custom

- **Datang Terbuka**: Pin 8 tidak tersambung ke mana pun sampai Anda menjembatani salah satu sisi JP9. **Jika sensor knock tidak terbaca sama sekali pada board baru, periksa JP9 lebih dulu.**

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

#### JP13 - Pilihan Driver Stepper (Baru di v1.3E)
- **Tutup (bridge)**: Untuk driver **A4988**

- **Buka**: Untuk driver **DRV8825**

- **Silkscreen**: "A4988:CLOSE / DRV:OPEN"

#### JP7 - Knock Sensor Filter Bypass
- **Fungsi**: Bypass filter internal untuk input knock di konektor ECU (pin 8)

- **Berubah di v1.3E**: JP8 sudah tidak ada

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper2.jpeg)

### Pullup Launch
Pullup untuk pin spare input 3, dipakai jika pin itu digunakan untuk tombol aktivasi launch control atau input lain yang membutuhkan pullup.

### Tips Konfigurasi Jumper

- **VR Sensors**: Pilih mode VR (sinyal lewat modul VR Conditioner) dan **lepas** pullup — pullup akan membebani kumparan sensor VR

- **Hall / Optical Sensors**: Pilih mode Hall dan **pasang** pullup (JP5 untuk CKP, JP4 untuk CMP). Sensor hall umumnya open-collector dan tidak bisa menghasilkan level HIGH sendiri; tanpa pullup, pin trigger mengambang dan terkena noise sehingga muncul trigger error saat mesin hidup. Pullup hanya boleh dilepas untuk sensor yang outputnya push-pull 5V

## Wiring dan Instalasi

### Pin Mapping Konektor

Mazduino Mini 6CH v1.3E menggunakan konektor ECU Yamaha 48-pin dengan pin assignment sebagai berikut:

![Mazduino Mini 48-pin Connector](img/mazduino-48p-connector.jpeg)

#### Layout Konektor
```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

#### Pin Assignment (v1.3E)

| Pin | Fungsi | Deskripsi |
|-----|----------|-------------|
| 1 | 12V ECU | Catu daya utama ECU |
| 2 | IDLE1 | Output kontrol idle 1 |
| 3 | IDLE2 | Output kontrol idle 2 |
| 4 | CANH | CAN bus high |
| 5 | 5V | Output referensi 5V |
| 6 | AC-OUT / AC COMPRESOR | Kontrol kompresor AC |
| 7 | FUEL PUMP | Kontrol relay pompa bahan bakar |
| 8 | **Knock/PC13** | Input sensor knock atau akses pin MCU langsung — pilih lewat JP9, yang datang terbuka dari pabrik |
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

### Pin Mapping MCU (v1.3E)

Pin assignment **STM32F427VGT6** untuk v1.3E. **Tidak ada satu pun pin yang berpindah dari v1.3D dan v1.3C.** Kolom terakhir mencatat perubahan pada v1.3C relatif terhadap v1.3B, untuk pengguna yang datang dari board lama, serta pin yang baru dipakai di v1.3E.

| Function | MCU Pin | Perubahan |
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
| Trigger scope (CKP) | PC1 | Baru di v1.3E; firmware belum tersedia |
| Test point | PC2 | Baru di v1.3E |
| Test point | PC3 | Baru di v1.3E |
| Board revision ID | PC4 | Baru di v1.3E |

### Catatan Wiring
- **Terminasi CAN**: Resistor terminasi 120 Ω terpasang tetap di board. Pastikan seluruh bus CAN tetap punya tepat dua terminator — lihat [Terminasi CAN Onboard](#terminasi-can-onboard)
- **AC Switch Logic**: Pin 20 hanya menerima GROUND sebagai sinyal ON — jangan hubungkan 12V langsung. Pastikan juga konfigurasi AC switch di firmware memakai logic GROUND untuk ON
- **ETB**: Hubungkan ETB ke pin 33 (ETB-) dan 34 (ETB+), TPS2 ke pin 40, dan Pedal Position Sensor PPS1/PPS2 ke pin 18/35
- **Referensi**: Informasi wiring sensor tambahan di [Speeduino Wiki][speeduino-wiring]

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system

## Informasi Hardware

### Modul VR-Conditioner
Secara bawaan Mazduino Mini 6CH v1.3E hanya mendukung sinyal CKP dan CMP dalam bentuk digital, seperti sensor hall dan optical. Untuk kendaraan yang masih menggunakan sensor VR perlu menambahkan modul VR conditioner (DIP 8), atau sensornya bisa diganti ke hall. Sensor VR dihubungkan ke VR1+/VR2+ (pin 41, 42) dan VR1-/VR2- (pin 9, 10).

![VR Module](img/mini6ch/vr-conditioner-module.jpeg)

### Kontrol Idle
Mazduino Mini 6CH v1.3E mendukung Idle PWM lewat 2 output low-side (IDLE1 dan IDLE2, pin 2 dan 3).

Untuk Idle Control yang memakai stepper motor diperlukan modul tambahan, yaitu Idle Stepper Motor Module dengan driver **A4988** atau **DRV8825**. Atur JP13 sesuai driver yang dipasang: **tutup untuk A4988, buka untuk DRV8825**. Output fase A1/A2 dan B1/B2 ada di pin 11-14.

![Stepper Module](img/mini6ch/drv8825-stepper.jpeg)

### Terminasi CAN Onboard
- **Resistor terminasi 120 Ω**: Terpasang **tetap** antara CANH (pin 4) dan CANL (pin 21). Tidak ada jumper untuk melepasnya

- **Kapan ini benar**: ECU berada di **ujung** bus CAN. Bus CAN yang sehat punya tepat **dua** terminator 120 Ω, satu di tiap ujung

- **PERHATIAN**: Jika ECU dipasang di **tengah** bus yang kedua ujungnya sudah diterminasi, total resistansi turun ke 40 Ω dan bus bisa gagal berkomunikasi. Pada kasus itu **lepas salah satu terminator lain**, atau lepas resistor terminasi (R13) dari board

- **Perangkat Mazduino lain**: Racedash dan WBO CAN Controller juga bisa membawa terminatornya sendiri — hitung total terminator di seluruh jaringan, bukan per perangkat

## Software Tuning

### Download Software
Download software TunerStudio: [TunerStudio Downloads][tunerstudio-dl]

![TunerStudio](img/manual/ts-download-page-overview.png)

[tunerstudio-dl]: https://www.tunerstudio.com/index.php/downloads

### Setelan Firmware v1.3E
- **rusEFI**: Didukung, memakai firmware `mazduino-mini6ch` yang sama dengan v1.3C dan v1.3D
- **Speeduino**: Tidak didukung pada v1.3E — gunakan rusEFI
- **Analog divider ratio** (Analog Input Settings): atur ke **1.56**. Tune dari board v1.3D atau lebih lama memakai 1.516; dengan nilai itu semua sensor analog terbaca sekitar 3% terlalu rendah
- **Pullup resistor** (CLT sensor dan IAT sensor): **2700** Ω
- **Download**: Firmware dan file konfigurasi tersedia di [halaman download](downloads.md)

## Wiring Diagram

### Wiring Sensor
![Sensor Wiring](img/sensor-wiring.png)

### Injector Wiring
![Injector Wiring](img/injector-wiring.png)

### Ignition Wiring
![Ignition Wiring](img/ignition-wiring.png)

## Catatan Penting v1.3E

### Persyaratan Sistem Pengapian
- **Smart Coils**: Koneksi langsung didukung — VDrive 1-4 dan VDrive 5-6 dapat dikonfigurasi tegangan berbeda (5V atau 12V per grup)

- **Dumb Coils**: IGBT eksternal diperlukan; VDrive jumper **tidak** digunakan untuk dumb coil

### Migrasi dari v1.3D
- **Analog divider ratio**: Ubah ke **1.56** (dari 1.516) — wajib

- **Pullup resistor CLT dan IAT**: Pastikan bernilai **2700** Ω

- **Driver Stepper**: Jika memakai A4988, tutup JP13. Untuk DRV8825 biarkan terbuka

- **Pinout dan Wiring**: Tidak ada yang berubah — harness v1.3D dapat dipakai langsung

### Migrasi dari v1.3C atau v1.3B
Ikuti juga langkah [migrasi pada halaman v1.3D](mazduino-mini-6ch-v1.3d.md), lalu langkah migrasi dari v1.3D di atas.

## Wiring Harness

Rekomendasi ukuran kabel per pin untuk Mazduino Mini 6CH v1.3E, lengkap dengan rekap jumlah kabel tiap ukuran, tersedia di [Rekomendasi Ukuran Kabel Harness](rekomendasi-ukuran-kabel.md).
