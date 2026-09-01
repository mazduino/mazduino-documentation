# Downloads - Firmware dan Konfigurasi Mazduino

Halaman ini menyediakan firmware dan file konfigurasi untuk perangkat Mazduino.

- **[Firmware ECU](#firmware-ecu)** — rusEFI dan Speeduino untuk semua model ECU,
  di-flash lewat ST-Link, DFU, atau rusEFI Console.
- **[Firmware Racedash](#firmware-racedash)** — dash display; tidak diunduh
  manual, melainkan lewat Mazduino Flasher atau aplikasi DashTune.

---

## Firmware ECU

Pilih firmware yang sesuai berdasarkan model ECU dan kebutuhan Anda.

### Firmware rusEFI

Ada dua pilihan firmware rusEFI untuk ECU Mazduino.

#### Mazduino Firmware (Direkomendasikan)

Firmware rusEFI yang dikustomisasi dan dioptimalkan khusus untuk semua board Mazduino.

- **Repositori**: [github.com/mazduino/mazduino-fw][mazduino-fw]

- **Releases**: [github.com/mazduino/mazduino-fw/releases][mazduino-releases]

- **Build terbaru**: [Build Matrix Workflow][mazduino-build]

- **File INI untuk TunerStudio**: disertakan dalam bundle release (file `.zip` di halaman releases)

Board target yang tersedia:

- `mazduino-lite`
- `mazduino-compact`
- `mazduino-mega100`
- `mazduino-mega100-512`
- `mazduino-mini6ch`

Keunggulan dibanding firmware resmi:

- Pin mapping sudah pre-configured untuk semua versi Mazduino
- File .ini untuk TunerStudio sudah disertakan dan diuji
- Tidak perlu konfigurasi pin manual

**Catatan penting**: Selalu gunakan file .ini dari rilis yang sama dengan firmware yang di-flash. Mencampur versi firmware dan .ini dari rilis berbeda dapat menyebabkan konfigurasi yang tidak sesuai.

#### Official rusEFI Firmware

Firmware standar dari proyek rusEFI tanpa kustomisasi Mazduino.

- **Download**: [rusefi.com/build_server/][rusefi-build]

Gunakan build **mega100-F4** atau **F407 Discovery** untuk board Mazduino. Firmware ini memerlukan konfigurasi pin mapping manual agar sesuai dengan hardware Mazduino. Direkomendasikan hanya untuk pengguna yang sudah familiar dengan rusEFI dan membutuhkan fitur upstream terbaru.

---

### Firmware Speeduino

Untuk ECU Mazduino Compact dan Mini 6CH v1.3, tersedia firmware Speeduino yang telah dikustomisasi.

- **Download**: [github.com/mazduino/speeduino-fw/releases][speeduino-releases]

**Peringatan**: ECU Mazduino tidak kompatibel dengan official Speeduino. Gunakan hanya custom version di atas. Mini 6CH v1.0-v1.2 tidak didukung Speeduino — gunakan rusEFI.

---

### Tabel Kompatibilitas

| Model ECU | rusEFI Official | rusEFI Mazduino | Speeduino Custom |
|-----------|:--------------:|:---------------:|:----------------:|
| Compact v1 | Manual config | Siap pakai | Didukung |
| Compact v2.1 | Manual config | Siap pakai | Didukung |
| Compact v2.2+ | Manual config | Siap pakai | Didukung |
| Mini 6CH v1.0-v1.2 | Manual config | Siap pakai | Tidak didukung |
| Mini 6CH v1.3+ | Manual config | Siap pakai | Didukung |
| LITE | Manual config | Siap pakai | Tidak didukung |
| Mega100 | Manual config | Siap pakai | Tidak didukung |

---

### Software yang Dibutuhkan

- **TunerStudio MS**: [tunerstudio.com][tunerstudio] — software tuning dan konfigurasi ECU

- **STM32CubeProgrammer**: [st.com][stm32cubeprog] — untuk flashing firmware via ST-Link atau DFU

- **rusEFI Console**: [rusefi.com][rusefi] — untuk update firmware setelah instalasi pertama

---

### Metode Flash Firmware

#### ST-Link via SWD (Instalasi Pertama)

Metode ini digunakan saat ECU belum pernah di-flash sebelumnya, atau perlu full flash dari awal.

**Hardware yang dibutuhkan**: ST-Link V2 atau V3, kabel SWD 4-pin (VCC, GND, SWDIO, SWCLK).

1. Install STM32CubeProgrammer dari situs ST.
2. Hubungkan ST-Link ke ECU melalui port SWD.
3. Buka STM32CubeProgrammer, pilih ST-LINK sebagai interface, lalu klik Connect.
4. Browse dan pilih file .hex atau .bin firmware Mazduino.
5. Klik Download untuk mulai proses flash.
6. Setelah selesai, lepas ST-Link dan nyalakan ECU.

#### DFU via USB (Update Firmware)

Metode ini menggunakan mode DFU (Device Firmware Upgrade) melalui USB, tanpa memerlukan ST-Link. ECU harus sudah pernah di-flash sebelumnya.

1. Tekan dan tahan tombol Boot pada ECU, lalu tekan Reset.
2. Lepas tombol Reset, lalu lepas tombol Boot — ECU masuk ke mode DFU.
3. Hubungkan ECU ke PC via USB.
4. Buka STM32CubeProgrammer, pilih USB sebagai interface, lalu klik Connect.
5. Load file firmware dan klik Download.

#### rusEFI Console (Update Setelah Instalasi Pertama)

Setelah firmware pertama ter-install, update selanjutnya dapat dilakukan langsung melalui rusEFI Console tanpa mode DFU.

1. Hubungkan ECU ke PC via USB.
2. Buka rusEFI Console dan pilih port yang sesuai.
3. Gunakan fitur firmware update yang tersedia di console.

---

## Firmware Racedash

Firmware Racedash **tidak diunduh sebagai file** dari halaman ini. Dash mengambil
sendiri versi terbarunya, lewat alat yang berbeda tergantung varian.

| Varian | Cara update | Perlu buka case? |
| :---- | :---- | :---- |
| Racedash 3.5" & 4" (M1, M2, M3, C1) | **Mazduino Flasher** — OTA lewat WiFi | Tidak |
| Racedash 3.5" & 4" | USB TTL internal | Ya |
| Racedash Pro M4, M5, M7 | Aplikasi **DashTune** | Tidak |
| Racedash Pro generasi lama | **Mazduino Flasher** — OTA lewat WiFi | Tidak |

### Lewat Mazduino Flasher (OTA)

Perlu login ke akun Mazduino terlebih dahulu, lalu buka
**[mazduino.com/dashboard/flasher](https://www.mazduino.com/dashboard/flasher)**.
Hubungkan HP/laptop ke WiFi yang dipancarkan dash, pilih model yang benar pada
**Select Device**, lalu mulai flashing.

> **Pastikan model yang dipilih benar.** Flasher tidak bisa menebaknya untuk
> Anda, dan firmware model lain akan membuat dash gagal menyala.

Langkah lengkapnya ada di
[Update Firmware Racedash](mazduino-racedash.md#update-firmware-usb-atau-ota).

### Lewat DashTune (Racedash Pro M4 / M5 / M7)

Generasi M4/M5/M7 diperbarui dari aplikasi Android **DashTune**: menu **Update
Firmware** memeriksa versi terbaru dan memasangnya sendiri, tanpa kabel maupun
situs web. Aplikasinya masih uji tertutup — cara mendapatkannya ada di
[Panduan Aplikasi DashTune](mazduino-racedash-pro.md#panduan-aplikasi-dashtune).

> **Jangan update sambil berkendara.** Layar dash mati beberapa saat selama
> proses berlangsung.

---

## Konfigurasi TunerStudio

Setelah firmware ECU ter-flash:

1. Install TunerStudio dari [tunerstudio.com][tunerstudio].
2. Buat project baru di TunerStudio.
3. Extract bundle release dan load file `.ini` yang sesuai versi firmware yang digunakan.
4. Hubungkan ECU ke PC via USB dan pilih port yang benar.
5. Load base map sesuai konfigurasi mesin Anda sebagai titik awal tuning.

[mazduino-fw]: https://github.com/mazduino/mazduino-fw
[mazduino-releases]: https://github.com/mazduino/mazduino-fw/releases
[mazduino-build]: https://github.com/mazduino/mazduino-fw/actions/workflows/build-matrix.yaml
[rusefi-build]: https://rusefi.com/build_server/
[speeduino-releases]: https://github.com/mazduino/speeduino-fw/releases
[tunerstudio]: https://www.tunerstudio.com
[stm32cubeprog]: https://www.st.com/en/development-tools/stm32cubeprog.html
[rusefi]: https://rusefi.com
