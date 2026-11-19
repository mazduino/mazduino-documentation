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

### Idle

| Fitur | Kegunaan |
|---|---|
| [Rotational Idle](rotational-idle.md) | Cut spark atau fuel bergiliran antar silinder untuk suara idle "lumpy" |
