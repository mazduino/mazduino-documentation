# Konfigurasi Project TunerStudio

Panduan lengkap untuk membuat project baru dan mengkonfigurasi TunerStudio untuk ECU Mazduino.

## Membuat Project Baru

### Langkah 13: Membuat Project Baru dalam TunerStudio

Ketika TunerStudio terbuka, Anda akan melihat beberapa opsi untuk memulai atau melanjutkan pekerjaan dengan project. Berikut penjelasan masing-masing opsi:

![TunerStudio Welcome Screen][image12]

*Referensi Gambar*: Pada screenshot, opsi-opsi ini ditampilkan pada welcome screen, memungkinkan Anda memilih metode yang paling sesuai untuk membuka atau membuat project di TunerStudio.

1. **Create New Project**:
   - Opsi ini memungkinkan Anda memulai project baru dari awal
   - Ideal untuk setup baru, opsi ini memandu Anda melalui langkah-langkah konfigurasi project TunerStudio untuk Mazduino Anda
   - Gunakan ini jika Anda mengatur TunerStudio untuk pertama kalinya atau jika Anda bekerja dengan ECU baru

2. **Open Project**:
   - Memilih opsi ini membuka kotak dialog di mana Anda dapat browse dan memilih file project yang ada dari komputer Anda
   - Gunakan ini jika Anda ingin memuat project yang tersimpan sebelumnya yang tidak terdaftar di bagian "recently used"
   - Ini berguna jika Anda memiliki beberapa project dan perlu memilih yang spesifik

3. **Open Last Project**:
   - Opsi ini membuka project terbaru yang Anda kerjakan di TunerStudio
   - Ini adalah shortcut yang nyaman jika Anda melanjutkan pekerjaan pada project terbaru tanpa perlu browse melalui file
   - Gunakan ini untuk akses cepat untuk melanjutkan tuning atau menganalisis data dari sesi terakhir

4. **Open Other Recently Used Projects**:
   - Bagian ini mencantumkan project yang baru digunakan, memungkinkan Anda dengan cepat membuka ulang konfigurasi terbaru
   - Klik nama project dalam daftar untuk membukanya langsung, menghemat waktu jika Anda sering beralih antar project

### Langkah 14: Konfigurasi Project Baru

1. **Project Name**: Di field **Project Name**, ketik nama khusus untuk project Anda. Nama ini akan membantu Anda mengidentifikasi konfigurasi spesifik untuk Mazduino Anda

2. **Project Directory**: Field **Project Directory** menampilkan folder tempat file project Anda akan disimpan. Anda dapat membiarkannya sebagai lokasi default atau klik **Browse** untuk memilih folder yang berbeda jika diinginkan

3. **Detect Firmware**:
   - Dengan Mazduino Anda terhubung, klik tombol **Detect** di sebelah bagian **Firmware**
   - TunerStudio akan secara otomatis mendeteksi versi firmware Mazduino Anda, memastikan kompatibilitas dengan setup project

4. **Additional Options** (Opsional): Jika Anda memerlukan opsi setup lanjutan, Anda dapat memilih **Show Advanced / Offline Setup** untuk kustomisasi lebih lanjut, meskipun ini biasanya tidak diperlukan untuk sebagian besar pengguna

5. **Klik Next**: Setelah project diberi nama dan firmware terdeteksi, klik **Next** untuk melanjutkan konfigurasi project baru

![Project Configuration][image13]

*Referensi Gambar*: Pada screenshot di atas, Anda dapat melihat jendela konfigurasi project tempat Anda memasukkan nama project dan mendeteksi firmware.

## Deteksi dan Koneksi ECU

### Langkah 15: Deteksi dan Pilih ECU

1. **Device Detection Window**: Setelah mengklik **Detect**, TunerStudio akan membuka jendela yang memindai device yang terhubung

2. **Tunggu Deteksi**: TunerStudio akan secara otomatis mencari melalui port yang tersedia untuk mendeteksi Mazduino yang terhubung. Anda akan melihat progress bar saat memindai

3. **Pilih ECU**:
   - Setelah Mazduino Anda muncul di kotak dialog, klik untuk highlight
   - Kemudian, klik **Accept** untuk mengonfirmasi pilihan dan melanjutkan dengan setup project

![Device Detection][image14]

*Referensi Gambar*: Pada screenshot di atas, jendela deteksi ditampilkan sedang memindai device. Setelah Mazduino Anda terdaftar, pilih dan klik **Accept**.

### Langkah 16: Konfirmasi Detail Project dan Melanjutkan

1. **Kembali ke Project Configuration**: Setelah mengklik **Accept** di jendela deteksi, TunerStudio akan kembali ke layar konfigurasi project. Kali ini, bagian **Firmware** harus secara otomatis terisi dengan detail Mazduino Anda

2. **Review Configuration**: Pastikan semua field, termasuk **Project Name**, **Project Directory**, dan **Firmware**, terisi dengan benar

3. **Klik Next**: Setelah semuanya dikonfirmasi, klik **Next** untuk melanjutkan dengan proses setup

![Project Configuration Complete][image15]

*Referensi Gambar*: Layar konfigurasi project sekarang menampilkan semua informasi relevan tentang Mazduino Anda. Klik **Next** untuk melanjutkan.

## Konfigurasi Display dan Komunikasi

### Langkah 17: Pilih Lambda Display

1. **Configuration Settings**: Jendela ini memungkinkan Anda memilih bagaimana air-fuel ratio (AFR) akan ditampilkan

2. **Pilih AFR atau Lambda**:
   - **AFR (Default)**: Ini adalah pengaturan yang paling umum digunakan dan menampilkan air-fuel ratio, yang familiar bagi sebagian besar pengguna
   - **Lambda**: Alternatifnya, Anda dapat memilih Lambda, pengukuran yang berbeda untuk air-fuel ratio, yang mungkin lebih disukai oleh beberapa pengguna

3. **Klik Next**: Setelah memilih opsi tampilan yang diinginkan, klik **Next** untuk melanjutkan

![Lambda Display Configuration][image16]

*Referensi Gambar*: Pada screenshot di atas, opsi AFR (Default) dipilih. Sebagian besar pengguna lebih memilih pengaturan ini.

### Langkah 18: Konfigurasi Communication Settings

1. **Communication Settings Window**: Di jendela ini, TunerStudio akan mencoba menampilkan COM port tempat Mazduino Anda terhubung

2. **Jika COM Port Terdeteksi Otomatis**:
   - Jika COM port yang benar ditampilkan, cukup klik **Next** untuk melanjutkan

3. **Jika COM Port Tidak Terdeteksi**:
   - Gunakan dropdown menu **COM Port** untuk secara manual memilih port yang benar untuk koneksi ECU Anda
   - Jika tidak ada COM port valid yang terdaftar, ini mungkin mengindikasikan masalah driver

4. **Troubleshooting Driver**:
   - Windows 10 dan yang lebih baru umumnya memiliki driver yang diperlukan pre-installed
   - Untuk versi Windows yang lebih lama atau jika software lain telah memodifikasi driver COM port, Anda mungkin perlu menginstal **STMicroelectronics Virtual COM Port (VCP) drivers**
   - Driver ini dapat diunduh dari website STMicroelectronics

5. **Testing the Connection (Opsional)**: Jika Anda ingin mengonfirmasi koneksi, klik **Test Port**. Opsi ini memverifikasi koneksi sebelum melanjutkan

![Communication Settings][image17]

*Referensi Gambar*: Pada screenshot di atas, pengaturan COM Port ditampilkan, dengan opsi untuk memilih port yang benar jika diperlukan. Setelah port diatur, klik **Next**.

## Menyelesaikan Setup

### Langkah 19: Pilih Dashboard dan Selesaikan Setup

1. **Select Dashboard**: Jendela ini memungkinkan Anda memilih layout dashboard untuk project Anda. Dashboard menampilkan berbagai gauge dan parameter untuk monitoring Mazduino secara real-time

2. **Pilih Default Dashboard**:
   - Untuk pengguna baru, disarankan untuk melanjutkan dengan **Default** dashboard yang dipilih
   - Jika Anda suka, Anda dapat menjelajahi layout dashboard tambahan dari dropdown menu untuk setup yang disesuaikan

3. **Klik Finish**: Setelah default dashboard dipilih, klik **Finish** untuk menyelesaikan setup project dan meluncurkan TunerStudio dengan konfigurasi baru Anda

![Dashboard Selection][image18]

*Referensi Gambar*: Pada screenshot di atas, opsi Default dashboard dipilih. Klik **Finish** untuk mulai menggunakan TunerStudio.

### Langkah 20: Verifikasi Koneksi dan Status Dashboard

1. **Dashboard Display**:
   - Setelah setup project selesai, jendela dashboard utama akan terbuka, menampilkan berbagai gauge untuk parameter mesin

2. **Periksa Connection Status**:
   - **Not Connected**: Jika gauge tampak abu-abu dan menampilkan "Not Connected," ini berarti ECU tidak terdeteksi dengan benar. Verifikasi koneksi USB dan pengaturan COM port, kemudian coba sambung kembali
   - **Connected**: Ketika ECU terdeteksi dengan benar, gauge akan muncul dengan wajah putih, dan data akan ditampilkan secara real time. Pesan "Not Connected" akan hilang, menunjukkan koneksi berhasil

3. **Periksa Indicator Status**:
   - Ketika terhubung, tombol indikator bawah akan menampilkan berbagai status dalam warna yang berbeda (misalnya "Fuel pump on," "Fan on," "Brake down"). Indikator ini memberikan feedback real-time tentang status sistem dan masalah potensial

![Dashboard Not Connected][image19]

*Referensi Gambar*: Pada screenshot pertama, dashboard menampilkan sebagai "Not Connected." Pada screenshot kedua, gauge aktif, dan indikator menampilkan berbagai status sistem.
![Dashboard Connected][image20]

## Troubleshooting Koneksi

### Masalah Umum dan Solusi

#### 1. ECU Tidak Terdeteksi

**Gejala**: 

- Gauge menampilkan "Not Connected"
- COM port tidak muncul dalam daftar
- Error message saat detect firmware

**Solusi**:

1. **Periksa Koneksi Fisik**:
   - Pastikan kabel USB terpasang dengan benar
   - Coba kabel USB yang berbeda
   - Periksa port USB komputer

2. **Periksa Driver**:
   - Buka Device Manager Windows
   - Cari "Ports (COM & LPT)"
   - Pastikan ada entry untuk Mazduino/STM32

3. **Reset ECU**:
   - Matikan ECU
   - Tunggu 10 detik
   - Nyalakan kembali dan coba deteksi

#### 2. Koneksi Terputus-putus

**Gejala**:

- Gauge kadang menampilkan data, kadang "Not Connected"
- Data freeze atau tidak update
- Error message intermittent

**Solusi**:

1. **Periksa Data Rate**:
   - Masuk ke Communications → Data Rate
   - Coba turunkan data rate jika terlalu tinggi

2. **Periksa Ground Connection**:
   - Pastikan ground ECU terhubung dengan baik
   - Periksa ground komputer/laptop

3. **EMI/RFI Interference**:
   - Jauhkan kabel USB dari sumber interferensi
   - Gunakan kabel USB berpelindung jika perlu

#### 3. Firmware Tidak Kompatibel

**Gejala**:

- TunerStudio mendeteksi ECU tapi tidak bisa komunikasi
- Error message tentang firmware version
- Fitur tidak berfungsi dengan benar

**Solusi**:

1. **Update Firmware**:
   - Download firmware terbaru dari [Download Page](downloads.md)
   - Flash firmware sesuai petunjuk

2. **Update TunerStudio**:
   - Download versi TunerStudio terbaru
   - Install ulang jika perlu

3. **Periksa Kompatibilitas**:
   - Pastikan versi firmware cocok dengan versi TunerStudio
   - Baca release notes untuk kompatibilitas

---

**Selanjutnya**: [Interface dan Menu TunerStudio](tunerstudio-interface.md)

<!-- Image References -->
[image12]: # "TunerStudio Welcome Screen"
[image13]: # "Project Configuration" 
[image14]: # "Device Detection"
[image15]: # "Project Configuration Complete"
[image16]: # "Lambda Display Configuration"
[image17]: # "Communication Settings"
[image18]: # "Dashboard Selection"
[image19]: # "Dashboard Not Connected"
[image20]: # "Dashboard Connected"