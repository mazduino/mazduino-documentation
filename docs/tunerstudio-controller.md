# Controller & Diagnostics TunerStudio

## Pengantar
Menu **Controller** menyediakan akses ke berbagai tool diagnostik dan testing untuk ECU Mazduino. Fitur-fitur ini memungkinkan testing komprehensif, troubleshooting, dan konfigurasi lanjutan untuk memastikan operasi engine management yang optimal.

![Controller Menu](images/controller-menu.png)

## Opsi Menu Controller

### 1. ECU Stimulator
Mensimulasikan berbagai input untuk menguji fungsionalitas ECU tanpa engine yang berjalan.

### 2. Bench Test
Memungkinkan testing output seperti injektor dan ignition coil untuk troubleshooting atau setup.

### 3. Injector Test
Menyediakan cara terkontrol untuk menguji performa dan flow rate injektor.

### 4. Popular Vehicles
Konfigurasi predefined untuk kendaraan umum, menyederhanakan setup awal.

### 5. rusEFI Console
Interface terminal untuk debugging detail dan konfigurasi lanjutan.

### 6. SD Card Logger
Mengelola pengaturan logging onboard untuk penyimpanan dan pengambilan data.

### 7. Connection
Mengkonfigurasi parameter koneksi antara ECU dan software, seperti baud rate.

### 8. Full Pinout (1/3, 2/3, 3/3)
Menampilkan detail pinout lengkap untuk ECU wire-in sebagai referensi hardware.

### 9. Fancy Board
Tersedia di ECU wire-in, digunakan untuk mengkonfigurasi pengaturan I/O fleksibel.

### 10. Traction Control ETB Drop
Mengurangi posisi throttle untuk mengelola wheel slip selama event traction control.

### 11. Traction Control Timing Adjustment
Menyesuaikan ignition timing secara dinamis untuk kontrol wheel slip.

### 12. Traction Control Skip Ignition
Melewati event ignition untuk mengurangi power engine dan mengelola traksi.

### 13. Experimental 1, 2, 3
Fitur testing lanjutan untuk developer dan setup eksperimental.

### 14. Anti-Lag ALS
Mengkonfigurasi sistem anti-lag untuk engine turbocharged untuk mempertahankan tekanan boost.

### 15. Rotary
Mengaktifkan konfigurasi kontrol engine spesifik rotary.

### 16. Throttle Effective Area
Mengkalibrasi area efektif throttle body untuk modeling airflow.

## Bench Test & Commands

![Bench Test Commands](images/bench-test-commands.png)

Dialog **Bench Test & Commands** berisi beberapa grup tombol yang memungkinkan testing output spesifik dengan membuat pulsa sesuai pengaturan yang dikonfigurasi:

### Grup Testing

1. **Spark Test**: Membuat pulsa pada output ignition
2. **Injector Test**: Membuat pulsa pada output injektor  
3. **TCU Solenoid Test**: Membuat pulsa pada solenoid kontrol transmisi (jika tersedia)
4. **Lua Out Test**: Membuat pulsa pada output yang dikonfigurasi Lua
5. **Miscellaneous Commands**: Mengaktifkan fungsi spesifik seperti testing relay A/C, idle air valve, menghentikan engine, reboot ECU, atau reset konfigurasi

### Pengaturan Konfigurasi

Pengaturan yang dapat dikonfigurasi memungkinkan kontrol presisi atas testing:

- **Count**: Menentukan berapa banyak pulsa yang akan dihasilkan. Misalnya, setting 3 akan menghasilkan 3 pulsa.

- **On Time (ms)**: Menentukan berapa lama setiap output tetap aktif per pulsa. Misalnya, setting 4 ms akan mengaktifkan output selama 4 milidetik.

- **Off Time (ms)**: Menentukan durasi tidak aktif antara pulsa. Misalnya, setting 500 ms akan menciptakan delay 500 milidetik sebelum pulsa berikutnya.

Kontrol ini memastikan testing output yang konsisten dan dapat diulang untuk tujuan diagnostik dan validasi.

### Aplikasi Bench Test

1. **Verifikasi Wiring**: Memastikan koneksi yang benar untuk injektor dan coil
2. **Testing Flow Rate**: Menguji flow rate injektor dengan setting waktu yang presisi
3. **Troubleshooting**: Mendiagnosis masalah output tanpa menjalankan engine
4. **Setup Validation**: Memverifikasi konfigurasi sebelum start awal engine

## Fancy Board Configuration

![Fancy Board](images/fancy-board.png)

Fitur **Fancy Board** tersedia di ECU wire-in untuk konfigurasi I/O yang fleksibel:

### Mode Input Configuration

- **With Pull-Up**: Menambah resistor pull-up internal ke sirkuit, menarik line sinyal ke voltase tinggi (biasanya 5V) ketika tidak ada sinyal aktif. Ini cocok untuk sensor atau switch yang menarik sinyal low ketika dipicu.

- **With Pull-Down**: Menambah resistor pull-down internal, menarik line sinyal ke ground ketika tidak ada sinyal aktif. Ini ideal untuk sensor atau switch yang menggerakkan sinyal high ketika diaktifkan.

- **VR**: Memungkinkan switching input antara mode sensor VR (Variable Reluctance) two-wire dan mode input Hall. Sensor VR menghasilkan sinyal AC dan memerlukan pemrosesan khusus, sedangkan sensor Hall menghasilkan sinyal digital on/off. Memilih mode yang benar memastikan input memproses tipe sinyal dengan akurat.

### Keuntungan Konfigurasi Fleksibel

1. **Adaptabilitas**: Satu pin dapat dikonfigurasi untuk berbagai tipe sensor
2. **Cost Effective**: Mengurangi kebutuhan hardware eksternal
3. **Easy Reconfiguration**: Perubahan dapat dilakukan melalui software
4. **Signal Conditioning**: Built-in conditioning untuk berbagai tipe sinyal

## Traction Control Configuration

![Traction Control Tables](images/traction-control-tables.png)

### Overview Tabel Traction Control

1. **Y-Axis (Slip Ratio)**: Merepresentasikan jumlah wheel slip yang terdeteksi. Nilai `1.0` menunjukkan tidak ada slip, sedangkan nilai di atas `1.0` (mis. `1.1`) menunjukkan slip (mis. `1.1` merepresentasikan 10% slip).

2. **X-Axis (Vehicle Speed)**: Merepresentasikan kecepatan kendaraan dalam kilometer per jam.

3. **Timing Drop Table**: Menghilangkan ignition timing sebesar nilai positif yang ditentukan dalam tabel ketika slip terdeteksi. Semakin besar nilai, semakin banyak timing yang dikurangi.

4. **ETB Drop Table**: Memerintahkan pengurangan throttle (ETB = Electronic Throttle Body) sebesar nilai negatif yang ditentukan. Angka negatif yang lebih tinggi berarti pengurangan throttle yang lebih besar.

5. **Ignition Skip Table**: Melewati event ignition sebesar persentase yang ditentukan dalam tabel (mis. `50%` melewati setengah dari event ignition).

6. **Consecutive Ignition Skips (Dropdown)**: Memungkinkan kontrol atas melewati event ignition berturut-turut. Ketika diatur ke `true`, dua atau lebih event ignition dapat dilewati secara berurutan, yang direkomendasikan dalam sebagian besar kasus untuk traction control yang efektif. Ketika diatur ke `false`, skip berturut-turut tidak diizinkan.

### Strategi Traction Control

#### Timing Drop Strategy
- **Low Speed**: Pengurangan timing yang lebih agresif untuk kontrol slip yang efektif

- **High Speed**: Pengurangan timing yang lebih moderat untuk stabilitas

- **Progressive Control**: Pengurangan bertahap sesuai tingkat slip

#### Throttle Control Strategy
- **Immediate Response**: Pengurangan throttle cepat untuk kontrol slip instan

- **Smooth Operation**: Transisi throttle yang halus untuk comfort pengemudi

- **Load Dependent**: Pengurangan yang disesuaikan dengan kondisi beban

#### Ignition Skip Strategy
- **Severe Slip**: Skip ignition untuk pengurangan power dramatis

- **Mild Slip**: Skip minimal untuk kontrol halus

- **Pattern Control**: Skip pattern yang dioptimasi untuk efektivitas

### Tuning Guidelines

1. **Start Conservative**: Mulai dengan nilai rendah dan tingkatkan bertahap
2. **Test Safely**: Lakukan testing di lingkungan yang aman dan terkontrol
3. **Monitor Effectiveness**: Gunakan data logging untuk evaluasi performa
4. **Vehicle Specific**: Sesuaikan dengan karakteristik kendaraan spesifik

## SD Card Logger

![SD Card Logger](images/sd-card-logger.png)

### Konfigurasi Logging

SD Card Logger menyediakan kemampuan logging data onboard untuk analisis performa dan troubleshooting.

#### Pengaturan Logging

1. **Enable SD Logging**: Mengaktifkan/menonaktifkan fungsi logging SD card
2. **Logging Period**: Interval waktu antara sample data (ms)
3. **Buffer Size**: Ukuran buffer untuk data sebelum ditulis ke SD card
4. **Auto Start**: Memulai logging otomatis saat engine start

#### Parameter Logging

- **Engine Parameters**: RPM, Load, TPS, MAP, IAT, CLT

- **Fuel System**: Injector duty cycle, fuel pressure, AFR

- **Ignition System**: Timing advance, dwell time, knock events

- **Sensor Data**: Semua input sensor yang dikonfigurasi

- **Calculated Values**: VE, timing corrections, lambda targets

#### File Management

1. **File Naming**: Format nama file dengan timestamp
2. **File Rotation**: Otomatis membuat file baru setelah ukuran maksimum
3. **Storage Management**: Monitoring ruang tersedia di SD card
4. **Data Format**: Format CSV untuk kompatibilitas analisis

### Keuntungan SD Logging

- **Standalone Operation**: Logging tanpa koneksi laptop

- **High Resolution**: Sample rate tinggi untuk data detail

- **Large Capacity**: Kemampuan storage besar untuk session panjang

- **Portable**: Data dapat dianalisis di berbagai platform

## rusEFI Console

![rusEFI Console](images/rusefi-console.png)

### Interface Console

rusEFI Console menyediakan interface command-line untuk debugging dan konfigurasi lanjutan:

#### Command Categories

1. **Engine Commands**:
   - `info`: Informasi status engine
   - `status`: Status sistem real-time
   - `sensors`: Pembacaan sensor real-time
   - `actuators`: Status aktuator

2. **Calibration Commands**:
   - `calibrate_tps`: Kalibrasi TPS otomatis
   - `calibrate_pedal`: Kalibrasi pedal position
   - `learn_idle`: Learning mode untuk idle control

3. **Diagnostic Commands**:
   - `errors`: Menampilkan error codes aktif
   - `reset_errors`: Clear error codes
   - `test_injector`: Test injektor individual
   - `test_coil`: Test ignition coil individual

4. **Configuration Commands**:
   - `save_config`: Simpan konfigurasi ke flash
   - `load_config`: Load konfigurasi dari file
   - `factory_reset`: Reset ke pengaturan default

### Advanced Features

#### Real-time Monitoring
- Live data streaming dari semua sensor
- Calculated parameters dan internal states
- Error detection dan reporting
- Performance metrics

#### Tuning Support
- Live table editing
- Parameter adjustment tanpa restart
- Backup dan restore konfigurasi
- Batch command execution

#### Development Tools
- Memory dump dan analysis
- Register access untuk low-level debugging
- Timing analysis dan profiling
- Custom script execution

## Connection Configuration

### Communication Settings

1. **Port Selection**: Pilih port komunikasi (USB, Serial)
2. **Baud Rate**: Kecepatan komunikasi (115200, 256000)
3. **Protocol**: Format komunikasi (rusEFI, MSCAN)
4. **Timeout**: Waktu tunggu untuk response

### Connection Troubleshooting

1. **Driver Issues**: Pastikan driver USB terinstall dengan benar
2. **Port Conflicts**: Periksa port yang digunakan aplikasi lain
3. **Cable Quality**: Gunakan kabel USB berkualitas baik
4. **EMI Interference**: Hindari interferensi elektromagnetik
