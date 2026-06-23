# Fitur Firmware Mazduino

Mazduino menggunakan firmware berbasis rusEFI dengan tambahan fitur khusus. Halaman-halaman berikut menjelaskan cara menggunakan fitur-fitur tersebut melalui TunerStudio.

---

## CAN Input

ECU dapat menerima data dari bus CAN dan menggunakannya sebagai input sensor atau pin digital:

| Fitur | Kegunaan |
|---|---|
| [CAN Sensor Input](can-sensor-input.md) | Nilai dari perangkat CAN digunakan langsung sebagai sensor (MAP, TPS, CLT, RPM, dll.) |
| [CAN Analog Input](can-analog-input.md) | Nilai dari perangkat CAN digunakan sebagai input analog (seperti tegangan sensor) |
| [CAN Virtual Input](can-virtual-input.md) | Bit dalam frame CAN digunakan sebagai saklar digital (on/off) |

## CAN Output

| Fitur | Kegunaan |
|---|---|
| [CAN Output](can-output.md) | ECU mengirim data engine ke bus CAN — untuk dashboard, datalogger, atau perangkat lain |

## Komputasi & Tabel

| Fitur | Kegunaan |
|---|---|
| [Math Channels](math-channels.md) | Buat channel nilai kustom dari perhitungan kombinasi channel yang sudah ada |
| [User Tables](user-tables.md) | Tabel lookup kustom yang dapat diisi dan digunakan dalam konfigurasi |

## Output Logika

| Fitur | Kegunaan |
|---|---|
| [Logic Outputs](logic-outputs.md) | Output digital yang aktif berdasarkan kondisi yang dapat dikonfigurasi |
