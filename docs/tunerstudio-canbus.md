# Konfigurasi CAN Bus TunerStudio

## Pengantar
Sistem CAN Bus pada Mazduino memungkinkan komunikasi dengan berbagai perangkat eksternal seperti dashboard, sensor, dan kontroler tambahan. Menu CAN Bus menyediakan konfigurasi lengkap untuk komunikasi data engine management.

![CAN Bus Menu](images/canbus-menu.png)

## Menu CAN Bus Overview

- **CAN Bus Settings** - Mengkonfigurasi baud rate jaringan CAN, ID, dan prioritas pesan untuk komunikasi dengan perangkat eksternal
- **CAN Vehicle Speed Sensor** - Mengatur data kecepatan kendaraan yang diterima melalui sensor kecepatan berbasis CAN
- **CAN O2 Sensors** - Mengaktifkan dan mengkonfigurasi sensor oksigen wideband yang berkomunikasi melalui jaringan CAN
- **CAN EGT Sensors** - Menetapkan dan menskala sensor suhu gas buang (EGT) berbasis CAN
- **CAN MS IO-Box Settings** - Mengkonfigurasi IO box eksternal untuk memperluas input dan output melalui jaringan CAN

## Pengaturan Komunikasi CAN Bus

![CAN Bus Communication Settings](images/canbus-communication.png)

### Konfigurasi Utama

1. **CAN Dash Type** - Pilih tipe dashboard yang terhubung via CAN. Opsi termasuk None, dashboard custom, atau dashboard predefined seperti yang digunakan dalam motorsports, memungkinkan kompatibilitas dengan display eksternal.

2. **Inertia Measurement Unit** - Pilih perangkat IMU eksternal jika digunakan. Pengaturan ini memungkinkan integrasi accelerometer dan gyroscope untuk sensing gerakan kendaraan lanjutan, umumnya digunakan dalam mobil balap.

3. **CAN Read Enabled** - Mengaktifkan ECU untuk menerima dan memproses data dari perangkat di bus CAN, seperti display dashboard atau sensor eksternal.

4. **CAN Write Enabled** - Memungkinkan ECU untuk mentransmisi data, mengaktifkan interaksi dengan dashboard, perangkat logging, atau sistem kontrol lainnya.

5. **Enable rusEFI CAN Broadcast** - Mengirim data format standar secara berkala melalui bus CAN untuk perangkat yang terhubung.

6. **Enable Extended rusEFI CAN Broadcast** - Menyiarkan data tambahan spesifik rusEFI untuk opsi integrasi yang diperluas, berguna untuk setup lanjutan seperti integrasi CAN custom.

7. **rusEFI CAN Data Bus** - Mendefinisikan apakah broadcast data terjadi di bus CAN pertama atau kedua, mengakomodasi sistem dual-bus.

8. **rusEFI CAN Base Address** - Alamat memori awal untuk data yang ditransmisi di jaringan CAN. Sesuaikan jika terjadi konflik dengan perangkat lain.

9. **rusEFI CAN Data Address Type** - Pilih antara format alamat CAN 11-bit (standar) atau 29-bit (extended) berdasarkan persyaratan jaringan. Extended addressing digunakan dalam sistem dengan lebih banyak perangkat.

10. **rusEFI CAN Data Period (ms)** - Menentukan frekuensi broadcasting data rusEFI. Misalnya, pengaturan 50 ms menghasilkan transmisi data setiap 50 milidetik.

### Pengaturan Primary CAN

11. **Primary CAN Verbose** - Mengkonfigurasi level pesan debugging untuk Primary CAN bus. Berguna untuk mendiagnosis masalah komunikasi.

12. **Primary CAN Bitrate** - Mengatur kecepatan komunikasi Primary CAN bus. Default adalah 500 kbps, tetapi rate yang lebih rendah atau tinggi mungkin diperlukan untuk setup spesifik.

13. **Primary CAN Allow OpenBLT** - Mengaktifkan kompatibilitas dengan bootloader OpenBLT, memungkinkan update firmware melalui Primary CAN bus.

### Pengaturan Secondary CAN

14. **Secondary CAN Verbose** - Sama dengan Primary CAN Verbose tetapi berlaku untuk Secondary CAN bus.

15. **Secondary CAN Bitrate** - Menyesuaikan kecepatan Secondary CAN bus, mencocokkannya dengan persyaratan perangkat yang terhubung.

16. **Secondary CAN Allow OpenBLT** - Memungkinkan update firmware melalui Secondary CAN bus menggunakan OpenBLT, berguna untuk setup dengan multiple networks.

## CAN O2 Sensor Configuration

![CAN O2 Sensor](images/can-o2-sensor.png)

### Konfigurasi CAN Wideband

**Enable CAN Wideband**:

- Bekerja dengan **unit wideband AEM** atau **Mazduino** yang dihubungkan melalui CAN
- Pilih **channel CAN bus** tempat wideband terhubung
- Jika channel tertukar, aktifkan **Swap Channels 1 and 2**
- Opsi **Force O2 sensor heating** dapat mengesampingkan kontrol heating otomatis, meskipun biasanya diatur ke "No"

**CAN Indicators**:

- Menampilkan status operasional sistem wideband
- Indikator hijau menandakan operasi yang tepat (mis. Heating Allowed, Communication OK)
- Indikator merah menyoroti masalah seperti kegagalan heating atau sensor underheating/overheating

### Keuntungan CAN Wideband

1. **Komunikasi Digital**: Menghilangkan noise analog dan memberikan akurasi tinggi
2. **Multiple Sensors**: Mendukung beberapa sensor wideband dalam satu bus CAN
3. **Diagnostics**: Informasi status real-time untuk troubleshooting
4. **Kalibrasi Otomatis**: Sensor CAN umumnya sudah dikalibrasi dari pabrik

## CAN Vehicle Speed Sensor

### Konfigurasi CAN VSS

1. **Enable CAN VSS**: Mengaktifkan penggunaan CAN-based Vehicle Speed Sensor (VSS) alih-alih input speed sensor langsung.

2. **CAN VSS Type**: Memilih tipe kendaraan untuk data kecepatan berbasis CAN:
   - BMW e46
   - Generic CAN
   - Custom protocol

3. **CAN VSS Scaling (ratio)**: Menyesuaikan faktor skala untuk data CAN VSS agar sesuai dengan kecepatan aktual.

### Keuntungan CAN VSS

- **Akurasi Tinggi**: Data digital memberikan akurasi lebih baik daripada sensor analog

- **Integrasi Mudah**: Menggunakan data yang sudah tersedia dari ECU OEM

- **Reduced Wiring**: Mengurangi kebutuhan wiring tambahan untuk sensor kecepatan

## CAN EGT Sensors

![CAN EGT Sensors](images/can-egt-sensors.png)

### Konfigurasi EGT

Sensor EGT (Exhaust Gas Temperature) berbasis CAN memungkinkan monitoring suhu gas buang untuk multiple silinder tanpa kompleksitas wiring analog.

1. **EGT Sensor Assignment**:
   - Tetapkan setiap sensor EGT ke silinder spesifik
   - Konfigurasikan CAN ID untuk setiap sensor
   - Set scaling dan offset untuk kalibrasi yang akurat

2. **Temperature Limits**:
   - Warning temperature untuk proteksi engine
   - Critical temperature untuk engine shutdown
   - Hysteresis untuk mencegah false triggering

3. **Averaging and Filtering**:
   - Time constant untuk smoothing pembacaan
   - Sample rate configuration
   - Error detection dan fallback values

### Aplikasi EGT Monitoring

- **Tuning Optimization**: Monitoring suhu untuk tuning yang aman

- **Engine Protection**: Deteksi kondisi lean atau overheating

- **Performance Analysis**: Analisis distribusi suhu antar silinder

- **Turbo Protection**: Monitoring suhu untuk proteksi turbocharger

## CAN IO Box Configuration

### MS IO-Box Settings

CAN IO Box memungkinkan ekspansi input/output melalui jaringan CAN, ideal untuk aplikasi yang membutuhkan banyak I/O.

1. **Box Assignment**:
   - Konfigurasikan alamat CAN untuk setiap IO box
   - Set communication timeout
   - Enable/disable individual boxes

2. **Input Configuration**:
   - Analog input scaling
   - Digital input pull-up/pull-down
   - Input filtering dan debouncing

3. **Output Configuration**:
   - PWM output frequency
   - Digital output current limits
   - Fault detection dan protection

### Keuntungan IO Box

- **Ekspansi I/O**: Menambah kemampuan input/output tanpa ECU yang lebih besar

- **Distributed Control**: IO dapat ditempatkan dekat dengan sensor/aktuator

- **Modular Design**: Mudah untuk menambah atau mengurangi I/O sesuai kebutuhan

- **Cost Effective**: Lebih ekonomis daripada upgrade ke ECU yang lebih besar

## Troubleshooting CAN Bus

### Common Issues

1. **Communication Timeout**:
   - Periksa wiring CAN High/Low
   - Verifikasi termination resistor (120Ω di setiap ujung bus)
   - Cek baud rate yang konsisten

2. **Message Conflicts**:
   - Pastikan CAN ID unik untuk setiap perangkat
   - Periksa message priority
   - Verifikasi timing configuration

3. **Data Corruption**:
   - Periksa kualitas wiring dan shielding
   - Verifikasi ground connections
   - Cek interferensi elektromagnetik

### Diagnostic Tools

- **CAN Bus Monitor**: Real-time monitoring pesan CAN

- **Error Counters**: Tracking error transmit/receive

- **Bus Load Analysis**: Monitoring utilisasi bandwidth CAN

- **Message Logging**: Recording untuk analisis offline

## Best Practices

### Wiring Guidelines

1. **Twisted Pair Cable**: Gunakan kabel twisted pair untuk CAN High/Low
2. **Proper Termination**: 120Ω resistor di kedua ujung bus
3. **Star Topology**: Hindari topologi star, gunakan linear bus
4. **Cable Length**: Maksimum panjang tergantung baud rate

### Network Design

1. **Baud Rate Selection**: Pilih rate yang sesuai dengan aplikasi
2. **Message Priority**: Set prioritas berdasarkan kritikalitas data
3. **Redundancy**: Pertimbangkan backup communication untuk sistem critical
4. **Error Handling**: Implement proper error detection dan recovery
