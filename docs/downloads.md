# Downloads - Firmware dan Konfigurasi Mazduino

Halaman ini menyediakan firmware dan file konfigurasi untuk perangkat Mazduino.

- **[Firmware ECU](#firmware-ecu)** — rusEFI dan Speeduino untuk semua model ECU,
  di-flash lewat ST-Link, DFU, atau rusEFI Console.
- **[Firmware Racedash](#firmware-racedash)** — dash display; tidak diunduh
  manual, melainkan lewat Mazduino Flasher atau aplikasi DashTune.
- **[Firmware CAN IO Extender](#firmware-can-io-extender)** — satu file `.zip`
  berisi `.hex`, `.bin` dan INI TunerStudio, di-flash lewat USB.

---

## Firmware ECU

Pilih firmware yang sesuai berdasarkan model ECU dan kebutuhan Anda.

> **Mazduino menyarankan firmware berbasis rusEFI.** Firmware itu yang
> dikembangkan Mazduino sendiri dan terus diperbarui, sehingga seluruh fitur
> board dapat dipakai optimal dengan risiko masalah paling kecil. Dukungan
> Speeduino masih ada untuk board yang sudah memakainya, tetapi
> **pengembangannya sudah dihentikan** — tidak ada fitur atau perbaikan baru.

### Firmware rusEFI

Ada dua pilihan firmware rusEFI untuk ECU Mazduino.

#### Mazduino Firmware (Direkomendasikan)

Firmware rusEFI yang dikustomisasi dan dioptimalkan khusus untuk semua board Mazduino.

- **Repositori**: [github.com/mazduino/mazduino-fw][mazduino-fw]

- **Releases**: [github.com/mazduino/mazduino-fw/releases][mazduino-releases]

- **Build terbaru**: [Build Matrix Workflow][mazduino-build]

- **File INI untuk TunerStudio**: disertakan dalam bundle release (file `.zip` di halaman releases), dan semua versinya juga tersedia di [mazduino.github.io/mazduino-fw][mazduino-ini] — lihat [File INI per Versi Firmware](#file-ini-per-versi-firmware)

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

#### File INI per Versi Firmware

Setiap firmware Mazduino yang pernah dirilis punya file INI-nya sendiri di
**[mazduino.github.io/mazduino-fw][mazduino-ini]**. Halaman ini berguna kalau
bundle release-nya sudah tidak ada, atau TunerStudio menolak tersambung karena
INI di project tidak cocok dengan firmware di ECU.

File INI dicocokkan lewat **signature** firmware. Signature terlihat di
TunerStudio saat muncul peringatan signature tidak cocok, dan juga di baris
`signature` file `projectCfg/mainController.ini` di folder project. Contoh:

```
rusEFI master.2026.09.08.mazduino-lite.969326114
```

Signature itu dipecah menjadi lokasi file INI:

| Bagian | Contoh | Arti |
|---|---|---|
| Branch | `master` | branch build firmware |
| Tanggal | `2026.09.08` | tanggal build (tahun, bulan, hari) |
| Board | `mazduino-lite` | target board |
| Hash | `969326114` | hash konfigurasi, jadi nama file |

Jadi signature contoh di atas ada di:

```
https://mazduino.github.io/mazduino-fw/ini/master/2026/09/08/mazduino-lite/969326114.ini
```

Di halaman tersebut file INI dikelompokkan per board, dengan yang terbaru di
atas. Untuk memakainya: download file INI yang hash-nya sama dengan firmware
di ECU, lalu di TunerStudio buka **File → Project Properties**, ganti file
INI (ECU Definition) dengan file yang baru di-download, kemudian tutup dan buka
lagi project-nya.

> **Hash harus sama persis.** INI dengan hash berbeda bisa saja tetap
> tersambung, tetapi posisi setting di memori ECU tidak cocok, sehingga nilai
> yang tampil dan yang tersimpan bisa salah.

#### Official rusEFI Firmware

Firmware standar dari proyek rusEFI tanpa kustomisasi Mazduino.

- **Download**: [rusefi.com/build_server/][rusefi-build]

Gunakan build **mega100-F4** atau **F407 Discovery** untuk board Mazduino. Firmware ini memerlukan konfigurasi pin mapping manual agar sesuai dengan hardware Mazduino. Direkomendasikan hanya untuk pengguna yang sudah familiar dengan rusEFI dan membutuhkan fitur upstream terbaru.

---

### Firmware Speeduino

> **Tidak lagi dikembangkan.** Build ini tetap tersedia untuk board yang sudah
> berjalan dengannya, tetapi tidak lagi mendapat fitur maupun perbaikan baru.
> Untuk pemasangan baru, gunakan [firmware rusEFI](#firmware-rusefi) — fitur
> board yang lebih baru hanya ada di sana.

Tersedia firmware Speeduino yang telah dikustomisasi untuk ECU Mazduino Compact, Mini 6CH v1.3/v1.3B, dan LITE. LITE memakai build yang dibuat untuk Compact.

- **Download**: [github.com/mazduino/speeduino-fw/releases][speeduino-releases]

**Peringatan**: ECU Mazduino tidak kompatibel dengan official Speeduino. Gunakan hanya custom version di atas.

Yang sudah benar-benar diuji jalan dengan Speeduino hanya **Compact v1**, **Mini 6CH v1.3 polos**, dan **LITE** — LITE memakai firmware yang dibuat untuk Compact, bukan build tersendiri.

**Belum diuji** berarti secara hardware mestinya jalan tetapi belum pernah dibuktikan: Compact v2.1 dan v2.2 ke atas masuk kategori ini, jadi siapkan rencana cadangan ke rusEFI kalau ternyata tidak jalan.

**Tidak didukung** berarti memang tidak bisa: Mini 6CH v1.0-v1.2, Mini 6CH v1.3C ke atas, dan Mega100 — gunakan rusEFI.

---

### Tabel Kompatibilitas

| Model ECU | rusEFI Official | rusEFI Mazduino | Speeduino Custom |
|-----------|:--------------:|:---------------:|:----------------:|
| Compact v1 | Manual config | Siap pakai | Didukung, teruji |
| Compact v2.1 | Manual config | Siap pakai | Belum diuji |
| Compact v2.2+ | Manual config | Siap pakai | Belum diuji |
| Mini 6CH v1.0-v1.2 | Manual config | Siap pakai | Tidak didukung |
| Mini 6CH v1.3 (polos) | Manual config | Siap pakai | Didukung, teruji |
| Mini 6CH v1.3B | Manual config | Siap pakai | Didukung |
| Mini 6CH v1.3C ke atas | Manual config | Siap pakai | Tidak didukung |
| LITE | Manual config | Siap pakai | Didukung, teruji — pakai firmware Compact |
| Mega100 | Manual config | Siap pakai | Tidak didukung |

---

### Software yang Dibutuhkan

- **Mazduino Tuner** (alpha): [github.com/mazduino/mazduino-tuner/releases][mazduino-tuner] —
  software tuning Mazduino, termasuk update firmware lewat USB. Lihat
  [Manual Mazduino Tuner](mazduino-tuner-manual.md).

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
| Racedash 3.5" & 4" (M1, M2, M3, C1) | Aplikasi **DashTune** — lewat WiFi dash | Tidak |
| Racedash 3.5" & 4" (M1, M2, M3, C1) | **Mazduino Flasher** dari laptop — lewat WiFi dash | Tidak |
| Racedash 3.5" & 4" | USB TTL internal | Ya |
| Racedash Pro M4, M5, M7 | Aplikasi **DashTune** | Tidak |

### Lewat DashTune (Racedash 3.5" & 4")

Sambungkan HP ke WiFi dash, buka DashTune, lalu pilih **Update Firmware** di
Beranda. Aplikasi memilih firmware yang cocok untuk dash Anda dan mengunduhnya
lewat data seluler. Langkah lengkapnya ada di
[Update Firmware di DashTune](mazduino-racedash.md#7-update-firmware).

### Lewat Mazduino Flasher (OTA)

Perlu login ke akun Mazduino terlebih dahulu, lalu buka
**[mazduino.com/dashboard/flasher](https://www.mazduino.com/dashboard/flasher)**.
Hubungkan HP/laptop ke WiFi yang dipancarkan dash, pilih model yang benar pada
**Select Device**, lalu mulai flashing.

> **Pastikan model yang dipilih benar.** Flasher tidak bisa menebaknya untuk
> Anda, dan firmware model lain akan membuat dash gagal menyala.

Langkah lengkapnya ada di
[Update Firmware Racedash](mazduino-racedash.md#update-firmware).

### Lewat DashTune (Racedash Pro M4 / M5 / M7)

Racedash Pro M4/M5/M7 diperbarui dari aplikasi Android **DashTune**: menu **Update
Firmware** memeriksa versi terbaru dan memasangnya sendiri, tanpa kabel maupun
situs web. Aplikasinya masih uji tertutup — cara mendapatkannya ada di
[Panduan Aplikasi DashTune](mazduino-racedash-pro.md#panduan-aplikasi-dashtune).

> **Jangan update sambil berkendara.** Layar dash mati beberapa saat selama
> proses berlangsung.

---

## Firmware CAN IO Extender

Modul dikirim sudah berisi firmware node 0, jadi file ini hanya dibutuhkan untuk
update atau untuk modul kedua dan seterusnya di bus yang sama.

- **Download**: [github.com/mazduino/can-io-extender/releases][iox-releases]
- **Isi file rilis**: satu file `can-io-extender-vX.Y.Z.zip` berisi folder
  `hex/` dan `bin/` (firmware tiap node) serta `tunerstudio/mazduino-iox.ini` —
  INI untuk kalibrasi sensor dan pengaturan node
- **Cara memilih file dan flash**: [CAN IO Extender → Firmware](can-io-extender.md#firmware)

---

## Konfigurasi TunerStudio

Setelah firmware ECU ter-flash:

1. Install TunerStudio dari [tunerstudio.com][tunerstudio].
2. Buat project baru di TunerStudio.
3. Extract bundle release dan load file `.ini` yang sesuai versi firmware yang digunakan. Kalau bundle-nya tidak ada, ambil file `.ini` dari [mazduino.github.io/mazduino-fw][mazduino-ini] sesuai signature firmware.
4. Hubungkan ECU ke PC via USB dan pilih port yang benar.
5. Load base map sesuai konfigurasi mesin Anda sebagai titik awal tuning.

[mazduino-fw]: https://github.com/mazduino/mazduino-fw
[mazduino-releases]: https://github.com/mazduino/mazduino-fw/releases
[mazduino-build]: https://github.com/mazduino/mazduino-fw/actions/workflows/build-matrix.yaml
[mazduino-ini]: https://mazduino.github.io/mazduino-fw/
[rusefi-build]: https://rusefi.com/build_server/
[speeduino-releases]: https://github.com/mazduino/speeduino-fw/releases
[tunerstudio]: https://www.tunerstudio.com
[mazduino-tuner]: https://github.com/mazduino/mazduino-tuner/releases
[stm32cubeprog]: https://www.st.com/en/development-tools/stm32cubeprog.html
[rusefi]: https://rusefi.com
[iox-releases]: https://github.com/mazduino/can-io-extender/releases
