# Tentang ECU Mazduino

ECU Mazduino adalah Engine Control Unit (ECU) standalone open-source yang dibangun di atas mikrokontroler ARM Cortex-M4 @ 168MHz. Dirancang untuk penggemar otomotif dan profesional yang membutuhkan solusi manajemen mesin yang fleksibel.

## Firmware

### rusEFI (Direkomendasikan)

Mazduino menggunakan **rusEFI** sebagai firmware utama — firmware manajemen mesin open-source yang mendukung:

- Injeksi bahan bakar dan timing pengapian
- Tuning real-time via TunerStudio
- Data logging, CAN Bus, dan diagnostik

Firmware Mazduino tersedia di [github.com/mazduino/mazduino-fw][mazduino-fw] — fork rusEFI dengan pin mapping pre-configured untuk semua board Mazduino.

### Speeduino

Sebagian model Mazduino — Compact, Mini 6CH v1.3 dan v1.3B, serta LITE — juga dapat menjalankan Speeduino dengan firmware khusus. **Tidak kompatibel** dengan official Speeduino karena perbedaan pin mapping.

**Pengembangan Speeduino sudah dihentikan.** Mazduino kini fokus pada firmware sendiri yang berbasis rusEFI, dan itu yang disarankan untuk pemasangan baru — seluruh fitur board hanya tersedia di sana. Rincian per model ada di [tabel kompatibilitas](downloads.md#tabel-kompatibilitas).

## Open Source

Mazduino sepenuhnya open source — schematic, PCB layout, BOM, dan firmware tersedia publik. Detail PCB tersedia di [Mazduino Wiki][mazduino-hw].

---

## Referensi & Inspirasi

Firmware Mazduino dibangun di atas fondasi proyek-proyek open source berikut.

### rusEFI

Firmware Mazduino berbasis **[rusEFI][rusefi]** — proyek firmware engine management open source yang komprehensif dan aktif dikembangkan oleh komunitas global.

- Dokumentasi: [wiki.rusefi.com][rusefi-wiki]
- Kode sumber: [github.com/rusefi/rusefi][rusefi-gh]

### FOME

**[FOME][fome]** adalah fork rusEFI yang berfokus pada kesederhanaan, stabilitas, dan kemudahan konfigurasi. Pendekatan arsitektur dan beberapa konsep implementasi dari FOME memberikan inspirasi dalam pengembangan firmware Mazduino.

- Dokumentasi: [wiki.fome.tech][fome-wiki]

### Zgrywus

**[Zgrywus][zgrywus]** adalah proyek ECU open source berbasis rusEFI dengan implementasi fitur CAN yang sangat matang. Fitur-fitur CAN pada firmware Mazduino terinspirasi dan dikembangkan berdasarkan implementasi dari Zgrywus:

- CAN Virtual Input, CAN Analog Input, CAN Sensor Input, CAN Output

- Dokumentasi: [wiki.zgrywus.com][zgrywus-wiki]

### EpicEFI

**[EpicEFI][epicefi]** adalah proyek engine management berbasis rusEFI dengan
unit epicECU. Dua bagiannya lebih lengkap dibanding rusEFI official, dan
keduanya menjadi rujukan dalam pengembangan firmware Mazduino:

- **CAN Bus** — cakupan fitur yang lebih luas
- **Transmisi otomatis** — kontrol yang lebih lengkap

- Dokumentasi: [content.epicefi.com][epicefi-docs]

### Komunitas

Terima kasih kepada seluruh kontributor, tester, dan pengguna yang telah membantu pengembangan proyek ini. Mazduino berkomitmen untuk tetap open source dan berkontribusi kembali kepada komunitas.

[mazduino-fw]: https://github.com/mazduino/mazduino-fw
[mazduino-hw]: https://github.com/mazduino/mazduino/wiki
[epicefi]: https://epicefi.com/
[epicefi-docs]: http://content.epicefi.com/
[rusefi]: https://rusefi.com/
[rusefi-wiki]: https://wiki.rusefi.com/
[rusefi-gh]: https://github.com/rusefi/rusefi
[fome]: https://wiki.fome.tech/
[fome-wiki]: https://wiki.fome.tech/
[zgrywus]: https://wiki.zgrywus.com/
[zgrywus-wiki]: https://wiki.zgrywus.com/
