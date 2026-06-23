# Ucapan Terima Kasih

Mazduino ECU dibangun di atas fondasi luar biasa dari proyek-proyek open source berikut.
Kami sangat menghargai kontribusi mereka terhadap komunitas engine management.

---

## rusEFI

Firmware Mazduino berbasis **[rusEFI](https://rusefi.com/)** — proyek firmware engine management open source yang komprehensif dan aktif dikembangkan oleh komunitas global.

Mazduino menggunakan rusEFI sebagai firmware utama, dengan fork khusus yang disesuaikan untuk hardware dan kebutuhan pengguna Mazduino.

- Dokumentasi rusEFI: [wiki.rusefi.com](https://wiki.rusefi.com/)

- Kode sumber: [github.com/rusefi/rusefi](https://github.com/rusefi/rusefi)

---

## FOME

**[FOME (Firmware Open-source Mazda Engine)](https://wiki.fome.tech/)** adalah fork rusEFI yang berfokus pada kesederhanaan, stabilitas, dan kemudahan konfigurasi.

Pendekatan arsitektur dan beberapa konsep implementasi dari FOME memberikan inspirasi dalam pengembangan firmware Mazduino.

- Dokumentasi FOME: [wiki.fome.tech](https://wiki.fome.tech/)

---

## Zgrywus

**[Zgrywus](https://wiki.zgrywus.com/)** adalah proyek ECU open source berbasis rusEFI dengan implementasi fitur CAN yang sangat matang.

Fitur-fitur berikut pada firmware Mazduino terinspirasi dan dikembangkan berdasarkan implementasi dari Zgrywus:

- **CAN Virtual Input** — penggunaan bit dalam frame CAN sebagai digital pin (`CAN_INPUT_0`–`CAN_INPUT_7`)
- **CAN Analog Input** — penggunaan nilai dalam frame CAN sebagai saluran ADC virtual
- **CAN Sensor Input** — override langsung sensor internal (MAP, TPS, CLT, RPM, dll.) melalui CAN
- **CAN Output** — transmisi data ECU ke bus CAN secara periodik maupun dipicu sinyal digital

Dokumentasi lengkap fitur-fitur ini tersedia di bagian **[Firmware](../firmware/)** pada wiki ini.

- Dokumentasi Zgrywus: [wiki.zgrywus.com](https://wiki.zgrywus.com/)

---

## Komunitas Open Source

Mazduino berkomitmen untuk tetap open source dan berkontribusi kembali kepada komunitas.
Terima kasih kepada seluruh kontributor, tester, dan pengguna yang telah membantu pengembangan proyek ini.
