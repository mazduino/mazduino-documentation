# Interface dan Menu TunerStudio

Panduan lengkap untuk navigasi dan penggunaan interface TunerStudio beserta penjelasan menu-menu yang tersedia.

## Overview Interface TunerStudio

TunerStudio menyediakan interface yang komprehensif untuk monitoring, tuning, dan konfigurasi ECU Mazduino. Interface utama terdiri dari:

- **Dashboard**: Area utama dengan gauge dan indikator real-time

- **Menu Bar**: File, Options, Data Logging, Communications, Tools, Help

- **Status Indicators**: Menampilkan status sistem dan koneksi

- **Navigation Buttons**: Akses cepat ke berbagai fungsi tuning

## File Menu - Manajemen Project dan Tune

### 1. New Project
- Digunakan untuk membuat project baru
- Memandu Anda melalui setup konfigurasi fresh untuk ECU baru
- Berguna saat setup ECU pertama kali atau ganti hardware

### 2. Open Project
- Memungkinkan membuka project yang ada yang tersimpan di komputer
- Berguna untuk beralih antara setup ECU yang berbeda
- Mendukung file project (.prj)

### 3. Close Project
- Menutup project yang sedang terbuka
- Mengembalikan ke layar utama atau memungkinkan pilih project lain
- Tidak akan kehilangan data yang sudah disimpan

### 4. Load Tune (.msq)
Opsi ini memungkinkan memuat konfigurasi tuning yang tersimpan (file .msq) dari komputer langsung ke ECU. Berguna untuk:

- Menerapkan pengaturan yang tersimpan sebelumnya
- Beralih antara tune yang berbeda
- Restore backup tune

### 5. Save Tune
- Menyimpan konfigurasi tuning saat ini dengan menimpa tune yang tersimpan di komputer
- Gunakan untuk update file .msq yang ada dengan perubahan yang telah dibuat
- Shortcut: Ctrl+S

### 6. Save Tune As
- Memungkinkan membuat file .msq baru untuk menyimpan tune saat ini
- Memungkinkan menyimpan konfigurasi yang berbeda secara terpisah
- Berguna untuk menjaga library berbagai setup tuning

*Catatan*: **Tune Restore Points** dan **Compare Tune** adalah fitur yang tersedia hanya di versi berbayar TunerStudio dan di luar cakupan manual ini.

### 7. Recent Vehicle Projects
- Mencantumkan project yang baru digunakan
- Akses cepat ke konfigurasi yang sering digunakan tanpa mencari melalui file
- Berguna untuk mengakses setup yang sering digunakan

### 8. Gauge Cluster
- Memungkinkan kustomisasi layout gauge pada dashboard
- Dapat mengatur susunan dan jenis gauge untuk menampilkan informasi yang paling penting
- Mendukung multiple cluster layouts

### 9. Work Offline
- Memungkinkan beralih ke mode offline
- Berguna jika ingin mengakses dan memodifikasi pengaturan tanpa perlu koneksi aktif ke ECU
- Ideal untuk review atau prepare tune

### 10. Exit
- Menutup TunerStudio sepenuhnya
- Menyimpan pengaturan dan preferensi secara otomatis

## Options Menu - Pengaturan Interface

### 1. Language
- Memungkinkan mengubah bahasa tampilan TunerStudio
- Pilih bahasa yang diinginkan dari daftar
- Restart mungkin diperlukan untuk beberapa perubahan

### 2. Look and Feel
- Memungkinkan kustomisasi tampilan interface TunerStudio
- Termasuk gaya tombol dan layout
- Tersedia **Dark Mode** yang mungkin lebih disukai untuk lingkungan cahaya rendah

### 3. Navigation
- Pengaturan navigasi memungkinkan memodifikasi susunan tombol
- Dapat menggabungkannya menjadi satu baris atau mengubahnya ke layout dropdown menu dasar
- Memungkinkan interface yang lebih bersih jika diinginkan

### 4. View, Advanced, Preferences, dan Performance
- Berisi berbagai pengaturan yang sebagian besar kurang relevan untuk pengguna dasar
- Biasanya dapat dibiarkan pada nilai default
- Untuk pengguna advanced yang ingin fine-tuning interface

### 5. Preferred Units
- Memungkinkan menyesuaikan satuan untuk parameter tertentu
- Contoh: mengubah satuan Y-axis **Manifold Absolute Pressure** dari **kPa** ke **PSI**

- Berguna untuk preferensi regional atau kebiasaan pengguna

## Data Logging Menu - Recording dan Analisis

### 1. Start Logging
- Memulai recording data dari ECU
- Data logging memungkinkan capture metrik performa real-time
- Data dapat dianalisis kemudian untuk tuning atau troubleshooting

### 2. Stop
- Menghentikan sesi data logging aktif
- Gunakan saat sudah cukup capture data atau ingin mengakhiri recording
- Data otomatis tersimpan dengan timestamp

### 3. Logging Profiles
- Memungkinkan memilih atau membuat profil logging spesifik
- Profil dapat dikustomisasi untuk capture parameter atau konfigurasi tertentu
- Berguna untuk kebutuhan tuning yang berbeda

### 4. Triggered Logging
- Memungkinkan data logging dimulai secara otomatis saat kondisi tertentu terpenuhi
- Contoh: RPM tertentu atau posisi throttle

- Berguna untuk capture data hanya saat event tertentu terjadi

### 5. Data Logging Preferences
- Membuka preferensi untuk data logging
- Dapat menyesuaikan pengaturan terkait bagaimana data direkam dan disimpan
- Opsi untuk mengatur ukuran file, format data, dan detail logging lainnya

### 6. Import / Conversion
- Menyediakan opsi untuk import atau convert data log
- Memungkinkan bekerja dengan log dari sumber atau format lain
- Berguna untuk analisis komparatif

### 7. View with MegaLogViewer
- Membuka data log saat ini di **MegaLogViewer**
- Aplikasi terpisah yang dirancang untuk menganalisis data log TunerStudio
- Memungkinkan review dan analisis data yang lebih detail (tersedia jika MegaLogViewer terinstall)

### 8. Show DataLog Folder
- Membuka folder tempat TunerStudio menyimpan semua data log yang direkam secara default
- Berguna untuk mengakses atau mengorganisir file log dengan cepat
- Lokasi default dapat dikustomisasi

## Communications Menu - Pengaturan Koneksi

### 1. Settings
- Membuka pengaturan komunikasi untuk TunerStudio
- Memungkinkan menyesuaikan parameter terkait koneksi antara komputer dan ECU
- Termasuk baud rate atau COM port jika diperlukan

### 2. Data Rate
- Menyesuaikan data rate untuk koneksi
- Dapat mempengaruhi seberapa cepat data ditransmisikan dan diterima dari ECU
- Data rate yang lebih tinggi memberikan update lebih cepat tapi dapat mempengaruhi stabilitas tergantung kualitas koneksi

### 3. GPS Configuration
- Memungkinkan konfigurasi pengaturan GPS jika setup Anda termasuk data GPS
- Berguna untuk logging data berbasis lokasi selain parameter mesin
- Sering digunakan dalam aplikasi performa atau tracking

### 4. Mini Terminal
- Membuka interface terminal dalam TunerStudio
- Memungkinkan komunikasi langsung dengan ECU melalui perintah
- Berguna untuk pengguna advanced yang perlu troubleshoot atau mengirim instruksi spesifik ke ECU

### 5. Comm Debug Log
- Mengaktifkan log debug komunikasi
- Merekam detail komunikasi ECU-ke-TunerStudio
- Valuable untuk troubleshooting masalah komunikasi atau memahami perilaku transmisi data

## Tools Menu - Utilities dan Kalibrasi

### 1. Protocol Stats
- Menampilkan statistik terkait protokol komunikasi antara TunerStudio dan ECU
- Informasi berguna untuk mendiagnosis masalah komunikasi atau verifikasi kualitas transfer data
- Termasuk packet loss, response time, dll.

### 2. Update / Install Firmware
- Opsi ini memungkinkan update firmware atau instalasi baru untuk ECU yang kompatibel
- **PENTING**: Fungsi ini **tidak bekerja** dengan Mazduino, jadi hindari menggunakannya dengan setup Mazduino

- Gunakan metode flashing firmware yang disediakan dalam [dokumentasi downloads](downloads.md)

### 3. Add Custom Channel Wizard
- Memungkinkan penambahan channel data kustom
- Berguna jika ingin memonitor parameter tambahan yang tidak termasuk secara default di TunerStudio
- Memungkinkan pengalaman tuning yang lebih disesuaikan

### 4. Custom Channel Editor
- Membuka editor untuk channel kustom
- Dapat memodifikasi atau mengelola channel data kustom yang telah dibuat
- Berguna untuk pengguna advanced yang ingin menyesuaikan tracking data

### 5. Action Management
- Menyediakan opsi untuk konfigurasi action di TunerStudio
- Memungkinkan setup respons otomatis atau alert berdasarkan kondisi spesifik
- Meningkatkan pengalaman monitoring dengan action yang dapat disesuaikan

### 6. Calculators
- Menawarkan berbagai tools dan kalkulator yang membantu dengan kalkulasi tuning
- Termasuk air-fuel ratio, ukuran fuel injector, atau engine displacement
- Kalkulator berguna untuk membuat penyesuaian yang tepat selama tuning

### 7. TunerStudio Plug-ins
- Memungkinkan mengelola dan menginstal plugin untuk TunerStudio
- Plugin memperluas fungsionalitas TunerStudio
- Menambahkan fitur atau tools baru yang dapat lebih meningkatkan kemampuan tuning

### 8. Calibrate TPS
- Membuka tool kalibrasi Throttle Position Sensor (TPS)
- Essential untuk memastikan ECU menginterpretasikan posisi throttle dengan benar
- **PENTING**: Fungsi ini hanya kompatibel dengan cable throttle

- Untuk electronic throttle, prosedur kalibrasi spesifik diperlukan yang akan dibahas dalam bagian **Advanced**

## Help Menu - Bantuan dan Dokumentasi

### 1. Help Contents
- Akses ke dokumentasi bantuan TunerStudio
- Termasuk tutorial dan panduan penggunaan
- Search function untuk menemukan topik spesifik

### 2. Getting Started
- Tutorial untuk pengguna baru
- Panduan step-by-step untuk setup dasar
- Contoh-contoh konfigurasi umum

### 3. About TunerStudio
- Informasi versi dan license TunerStudio
- Contact information untuk support
- Link ke website dan update

### 4. Check for Updates
- Memungkinkan check update TunerStudio secara manual
- Notifikasi jika versi baru tersedia
- Link langsung untuk download update

## Tips Penggunaan Interface

### Keyboard Shortcuts Berguna
- **Ctrl + S**: Save tune

- **Ctrl + O**: Open project  

- **F1**: Help

- **Ctrl + L**: Start logging

- **Esc**: Cancel current operation

### Kustomisasi Dashboard
1. **Klik kanan** pada gauge untuk opsi kustomisasi
2. **Drag and drop** gauge untuk mengatur ulang layout
3. **Double click** gauge untuk pengaturan detail
4. **Right click** di area kosong untuk menambah gauge baru

### Best Practices
1. **Simpan project secara berkala** untuk menghindari kehilangan konfigurasi
2. **Gunakan nama project yang deskriptif** untuk identifikasi mudah
3. **Test koneksi** sebelum memulai tuning session
4. **Monitor communications stats** untuk masalah koneksi
5. **Backup tune files** secara teratur

---

**Selanjutnya**: [Pengaturan Output Controls](tunerstudio-output-controls.md)

<!-- Image References -->
[image21]: # "File Menu Options"
[image22]: # "Options Menu"
[image23]: # "Data Logging Menu"
[image24]: # "Communications Menu"
[image25]: # "Tools Menu"
[image26]: # "Help Menu"