# TunerStudio lewat Bluetooth

Semua board Mazduino bisa terhubung ke TunerStudio tanpa kabel USB, lewat modul Bluetooth serial seperti **HC-05** atau **HC-06**. Port USB tetap bisa dipakai seperti biasa.

Butuh firmware Mazduino **Nightly 4 November 2026** atau lebih baru. Board varian BIGFUEL memakai pin yang sama dengan board dasarnya.

---

## Pin per Board

| Board | ECU TX → RX modul | ECU RX ← TX modul | Baud rate |
|---|---|---|---|
| Mazduino Compact | PB10 (TXD3) | PB11 (RXD3) | `tunerStudioSerialSpeed`, default 38400 |
| Mazduino Mini 6CH | PB10 (TXD3) | PB11 (RXD3) | `tunerStudioSerialSpeed`, default 38400 |
| Mazduino Mega100 / Mega100-512 | PB10 (TXD3, D16) | PB11 (RXD3, D17) | `tunerStudioSerialSpeed`, default 38400 |
| Mazduino Lite | PA9 (TXD1) | PA10 (RXD1) | `tunerStudioSerialSpeed`, default 38400 |
| Mazduino Core | PD5 | PD6 | `uartConsoleSerialSpeed`, default 115200 |

Mazduino Lite memakai PA9/PA10 karena PB10/PB11 dipakai sensor baro.

!!! warning "Tune dari firmware lama"
    Firmware sebelum Nightly 4 November 2026 tidak punya port Bluetooth di Lite, Compact, Mega100, dan Mega100-512. Field TX pin dan RX pin tetap tampil di TunerStudio, tapi ECU tidak mengirim data apa pun ke modul.

    Setelah update firmware, tune lama tetap menyimpan pin lama, biasanya PC10/PC11. Pin itu bukan port Bluetooth, dan di board Mazduino dipakai SD card. Isi **TX pin** dan **RX pin** sesuai tabel di atas, burn, lalu restart ECU.

    Pin lain tidak bisa dipakai. Port Bluetooth terikat ke USART tertentu, jadi hanya pin di tabel ini yang bekerja. Contoh: PA0 di Lite adalah pin sensor MAP dan bukan pin USART1.

Pada Mega100 dengan preset Speeduino yang memakai D16/D17 untuk driver stepper, port Bluetooth otomatis dimatikan supaya tidak bentrok.

---

## Wiring

1. **TX ECU** ke **RXD modul**, dan **RX ECU** ke **TXD modul**. TX dan RX disilang.
2. **GND** modul ke ground ECU.
3. **VCC** modul ke 5V. Kebanyakan board HC-05/HC-06 punya regulator sendiri dan level logika 3,3V, sesuai dengan pin ECU.

Lokasi pin TXD/RXD ada di halaman pinout tiap board.

---

## Baud Rate

Baud rate ECU dan modul **harus sama**.

- Di TunerStudio: **Controller → Connection**. Di Mazduino Tuner: **Configuration → Connection settings**.
- Default ECU 38400 (Core: 115200).
- Modul HC-05/HC-06 baru biasanya 9600. Ubah baud modul ke 38400 lewat AT command, atau ubah `tunerStudioSerialSpeed` ECU ke 9600.
- Setelah mengubah baud rate di ECU, burn lalu **restart ECU**. Port Bluetooth hanya dibuka sekali saat ECU menyala.

Field **TX pin** dan **RX pin** di dialog yang sama sebaiknya dibiarkan sesuai default board.

---

## Menghubungkan

1. Pair modul Bluetooth dengan laptop (PIN HC-05/HC-06 biasanya `1234` atau `0000`).
2. Setelah pairing, laptop membuat port serial baru (COM di Windows, `/dev/tty.*` di macOS).
3. Di TunerStudio, buka **Communications → Settings**, pilih port itu dengan baud rate yang sama dengan ECU.

Bluetooth lebih lambat dari USB. Untuk datalog cepat atau update firmware, tetap pakai USB.
