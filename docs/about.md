# Tentang ECU Mazduino

ECU Mazduino adalah Engine Control Unit (ECU) standalone open-source yang dibangun di atas mikrokontroler STM32F407VGT6 (ARM Cortex-M4 @ 168MHz). Dirancang untuk penggemar otomotif dan profesional yang membutuhkan solusi manajemen mesin yang fleksibel.

## Firmware

### rusEFI (Direkomendasikan)

Mazduino menggunakan **rusEFI** sebagai firmware utama — firmware manajemen mesin open-source yang mendukung:

- Injeksi bahan bakar dan timing pengapian
- Tuning real-time via TunerStudio
- Data logging, CAN Bus, dan diagnostik

Firmware Mazduino tersedia di [github.com/mazduino/mazduino-fw][mazduino-fw] — fork rusEFI dengan pin mapping pre-configured untuk semua board Mazduino.

### Speeduino

Beberapa model Mazduino (Compact dan Mini 6CH v1.3+) juga mendukung Speeduino dengan firmware khusus. **Tidak kompatibel** dengan official Speeduino karena perbedaan pin mapping.

## Open Source

Mazduino sepenuhnya open source — schematic, PCB layout, BOM, dan firmware tersedia publik. Detail PCB tersedia di [Mazduino Wiki][mazduino-hw].

[mazduino-fw]: https://github.com/mazduino/mazduino-fw {:target="_blank"}
[mazduino-hw]: https://github.com/mazduino/mazduino-hw/wiki {:target="_blank"}
