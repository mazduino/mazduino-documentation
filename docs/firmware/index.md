# Custom Firmware Mazduino

Firmware Mazduino adalah fork dari **rusEFI** yang dikembangkan khusus untuk hardware Mazduino. Meskipun berbasis rusEFI, ada sejumlah perbedaan dan tambahan fitur yang tidak ada di firmware rusEFI resmi.

---

## Penambahan dari Official rusEFI

Berikut fitur yang ditambahkan pada custom firmware Mazduino:

- **Pin mapping pre-configured** — tidak perlu konfigurasi pin manual, langsung sesuai hardware setiap board
- **File .ini TunerStudio disertakan** — sudah tersedia dalam setiap release, tidak perlu generate sendiri
- **[CAN Virtual Input](#can-input)** — bit dalam frame CAN digunakan sebagai digital pin
- **[CAN Analog Input](#can-input)** — nilai dalam frame CAN digunakan sebagai ADC virtual
- **[CAN Sensor Input](#can-input)** — override sensor internal (MAP, TPS, CLT, RPM, dll.) langsung via CAN
- **[CAN Output](#can-output)** — kirim data engine ke bus CAN untuk dashboard atau datalogger eksternal
- **[Math Channels](#komputasi-tabel)** — kalkulasi channel kustom dari kombinasi channel yang ada
- **[User Tables](#komputasi-tabel)** — tabel lookup yang dapat dikonfigurasi bebas
- **[Logic Outputs](#output-logika)** — output digital yang aktif berdasarkan kondisi yang dapat dikonfigurasi
- **[Konsumsi Bahan Bakar](#konsumsi-bahan-bakar)** — perhitungan L/100km dan L/jam
- **[Varian BIGFUEL](bigfuel.md)** — tabel VE dan ignition 32x32 dengan hardware yang sama
- **[TunerStudio lewat Bluetooth](bluetooth.md)** — modul HC-05/HC-06 di semua board
- **[AC Idle fuel adder](../tunerstudio-ac-settings.md#mesin-alpha-n-tanpa-sensor-map)** — tambahan bahan bakar saat AC menyala untuk mesin Alpha-N
- **[STFT enable switch](../tunerstudio-fuel-system.md#enable-switch-stft-opsional)** — short term fuel trim bisa dimatikan dari switch
- **[DFCO enable switch](../tunerstudio-fuel-system.md#enable-switch-opsional)** — DFCO bisa dinyalakan dan dimatikan dari switch di kabin
- **[Temporary Cylinder Shutoff](../mazduino-tuner-diagnostik.md#temporary-cylinder-shutoff)** — mematikan silinder sementara untuk mencari silinder yang lemah (dari Mazduino Tuner)
- **[Analog Multi-Switch](analog-multi-switch.md)** — membaca sampai 16 posisi rotary switch dari satu input analog, 4 switch terpisah
- **[Rotational Idle](rotational-idle.md)** — batas CLT dan TPS yang juga berlaku saat switch ON, stop STFT, tambahan udara idle, dan timing khusus selama aktif

Download firmware ada di **[halaman Downloads](../downloads.md)**.

---

## Fitur Tambahan

### CAN Input

ECU dapat menerima data dari bus CAN dan menggunakannya sebagai input sensor atau pin digital:

| Fitur | Kegunaan |
|---|---|
| [CAN Sensor Input](can-sensor-input.md) | Nilai dari perangkat CAN digunakan langsung sebagai sensor (MAP, TPS, CLT, RPM, dll.) |
| [CAN Analog Input](can-analog-input.md) | Nilai dari perangkat CAN digunakan sebagai input analog (seperti tegangan sensor) |
| [CAN Virtual Input](can-virtual-input.md) | Bit dalam frame CAN digunakan sebagai saklar digital (on/off) |

### CAN Output

| Fitur | Kegunaan |
|---|---|
| [CAN Output](can-output.md) | ECU mengirim data engine ke bus CAN — untuk dashboard, datalogger, atau perangkat lain |

### Komputasi & Tabel

| Fitur | Kegunaan |
|---|---|
| [Math Channels](math-channels.md) | Buat channel nilai kustom dari perhitungan kombinasi channel yang sudah ada |
| [User Tables](user-tables.md) | Tabel lookup kustom yang dapat diisi dan digunakan dalam konfigurasi |

### Output Logika

| Fitur | Kegunaan |
|---|---|
| [Logic Outputs](logic-outputs.md) | Output digital yang aktif berdasarkan kondisi yang dapat dikonfigurasi |

### Konsumsi Bahan Bakar

| Fitur | Kegunaan |
|---|---|
| [Konsumsi Bahan Bakar](fuel-consumption.md) | Perhitungan konsumsi real-time dalam L/100km dan L/jam berdasarkan data injeksi dan VSS |

### Input

| Fitur | Kegunaan |
|---|---|
| [Analog Multi-Switch](analog-multi-switch.md) | Rotary switch banyak posisi lewat satu input analog, dibaca dari curve tegangan |

### Board dan Koneksi

| Fitur | Kegunaan |
|---|---|
| [Varian BIGFUEL](bigfuel.md) | Tabel VE dan ignition 32x32 untuk resolusi tuning lebih rapat, hardware sama dengan board dasar |
| [TunerStudio lewat Bluetooth](bluetooth.md) | Tuning tanpa kabel USB lewat modul HC-05/HC-06 |

### Fuel

| Fitur | Kegunaan |
|---|---|
| [AC Idle fuel adder](../tunerstudio-ac-settings.md#mesin-alpha-n-tanpa-sensor-map) | Tambahan bahan bakar saat AC menyala, untuk mesin Alpha-N dengan katup idle bypass |
| [STFT enable switch](../tunerstudio-fuel-system.md#enable-switch-stft-opsional) | Switch untuk menyalakan atau mematikan short term fuel trim |
| [DFCO enable switch](../tunerstudio-fuel-system.md#enable-switch-opsional) | Switch untuk menyalakan atau mematikan DFCO dari kabin |

### Diagnostik

| Fitur | Kegunaan |
|---|---|
| [Temporary Cylinder Shutoff](../mazduino-tuner-diagnostik.md#temporary-cylinder-shutoff) | Mematikan bahan bakar dan pengapian silinder sementara untuk mencari silinder yang lemah. Hanya ada di Mazduino Tuner |

### Idle

| Fitur | Kegunaan |
|---|---|
| [Rotational Idle](rotational-idle.md) | Cut spark atau fuel bergiliran antar silinder untuk suara idle "lumpy" |
