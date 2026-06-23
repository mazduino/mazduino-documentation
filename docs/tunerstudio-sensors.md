# Konfigurasi Sensor TunerStudio

## Pengantar
Menu **Sensors** menyediakan akses untuk mengkonfigurasi berbagai sensor yang diperlukan untuk operasi ECU Mazduino. Setiap opsi didedikasikan untuk sensor atau jenis pengukuran tertentu dan memungkinkan penyesuaian parameter sensor yang tepat.

![Sensor Configuration Menu](images/sensor-configuration-menu.png)

## Opsi Konfigurasi Sensor

### 1. Misc Sensors
Mengkonfigurasi sensor non-standar atau input umum untuk berbagai kebutuhan.

### 2. Analog Input Settings
Mendefinisikan pengaturan untuk input analog tambahan yang terhubung ke ECU.

### 3. CLT Sensor (Coolant Temperature)
Mengatur kalibrasi sensor suhu coolant, penting untuk pengkayaan cold start dan kontrol kipas.

### 4. IAT Sensor (Intake Air Temperature) 
Mengkonfigurasi parameter sensor suhu udara masuk yang membantu menghitung kepadatan udara untuk bahan bakar.

### 5. Auxiliary Temperature Sensors (1 & 2)
Menetapkan dan mengkalibrasi sensor suhu tambahan untuk monitoring komponen tambahan.

### 6. TPS (Throttle Position Sensor)
Menyesuaikan pengaturan sensor posisi throttle, vital untuk acceleration enrichment dan idle control.

### 7. Accelerator Pedal Sensor
Mengatur kalibrasi untuk sistem drive-by-wire dimana posisi pedal dimonitor secara elektronik.

### 8. MAP Sensor (Manifold Absolute Pressure)
Mengkonfigurasi sensor MAP untuk kalkulasi load, manajemen turbo boost, atau koreksi barometrik.

### 9. MAP Sampling
Menyesuaikan interval sampling sensor MAP untuk pembacaan yang konsisten dan akurat.

### 10. Barometric Pressure Sensor
Mengkonfigurasi sensor barometrik untuk penyesuaian bahan bakar berdasarkan ketinggian.

### 11. MAF Sensor (Mass Airflow)
Mengatur sensor mass airflow untuk mengukur udara masuk untuk kalkulasi bahan bakar.

### 12. MAF Transfer Function
Mendefinisikan kurva kalibrasi sensor MAF untuk konversi voltase ke airflow.

### 13. O2 Sensor
Mengkonfigurasi sensor oksigen untuk monitoring air-fuel ratio.

### 14. rusEFI Wideband Controller
Mengkalibrasi dan mengintegrasikan kontroler O2 wideband untuk tuning AFR yang presisi.

### 15. VR Sensor Threshold
Menyesuaikan parameter untuk sensor VR (Variable Reluctance), biasanya digunakan untuk deteksi posisi crankshaft dan camshaft.

### 16. Vehicle Speed Sensor
Mengatur sensor kecepatan untuk menentukan kecepatan kendaraan, digunakan dalam fitur kontrol lanjutan seperti launch control atau manajemen boost.

### 17. Oil Pressure Sensor
Mengkonfigurasi pengaturan untuk monitoring tekanan oli mesin untuk mencegah kerusakan.

### 18. Oil Temperature Sensor
Mengatur kalibrasi untuk tracking suhu oli untuk monitoring keselamatan dan performa.

### 19. Fuel Pressure Sensor
Mengkonfigurasi sensor untuk memastikan pengiriman bahan bakar yang konsisten di berbagai beban.

### 20. Fuel Temperature Sensor
Mengatur sensor untuk monitoring suhu bahan bakar yang dapat mempengaruhi densitas dan aliran.

### 21. Fuel Level Sensor
Menyesuaikan kalibrasi sensor level bahan bakar untuk menampilkan pembacaan yang akurat.

### 22. Ambient Temperature Sensor
Mengkonfigurasi sensor untuk monitoring suhu lingkungan.

### 23. Compressor Discharge Temp
Mengatur sensor ini untuk monitoring suhu output turbocharger/intercooler.

### 24. Wastegate and Idle Position Sensors
Mengkalibrasi sensor posisi wastegate atau bypass valve untuk manajemen boost.

### 25. A/C Pressure Sensor
Mengkonfigurasi sensor untuk monitoring sistem air conditioning.

### 26. Aux Sensors
Input sensor tambahan yang dapat dikustomisasi untuk monitoring berbagai komponen atau sistem.

## Input Sensor Lainnya

![Other Sensor Inputs](images/other-sensor-inputs.png)

Dialog **Other Sensor Inputs** memungkinkan konfigurasi sensor tambahan yang berperan dalam kontrol mesin khusus atau fitur lanjutan. Ini termasuk input untuk kopling, rem, throttle, turbo, dan berbagai sensor terkait tekanan.

### Opsi Input Sensor

#### 1. Clutch Down
- **Signal**: Menetapkan pin dan jenis input untuk mendeteksi ketika kopling ditekan penuh

- **Mode**: Opsi termasuk **Pull-up** atau **Pull-down** untuk mengkonfigurasi polaritas sinyal  

- **Signal Polarity**: Dapat diatur ke **Normal** atau **Inverted**, tergantung cara kerja sensor

#### 2. Clutch Up
- **Signal**: Mengkonfigurasi pin untuk mendeteksi ketika kopling dilepas penuh

- **Mode**: Mirip dengan clutch down, dapat diatur ke **Pull-up** atau **Pull-down**

- **Signal Polarity**: Pilih antara **Normal** dan **Inverted**

#### 3. Throttle Up Switch
Menetapkan sinyal untuk aktuasi throttle ketika input sekunder diperlukan.

#### 4. Brake Pedal
- **Signal**: Mendeteksi aktivasi pedal rem

- **Mode**: Mengkonfigurasi polaritas sinyal untuk input rem (mis. Pull-up atau Pull-down)

- **Signal Polarity**: Opsi termasuk **Normal** atau **Inverted**

#### 5. Flex Fuel Sensor
- Menetapkan sinyal untuk monitoring konten ethanol untuk memungkinkan penyesuaian bahan bakar dinamis
- **Signal Type**: Mengkonfigurasi format input yang diharapkan (mis. Pull-up atau Pull-down)

#### 6. Turbo Speed Sensor
- Menetapkan input sensor untuk monitoring RPM turbocharger
- **Turbo Speed Multiplier**: Memungkinkan kalibrasi berdasarkan setup turbocharger spesifik

#### 7. Throttle Inlet Pressure Sensor
Mengkonfigurasi sensor tekanan khusus untuk mengukur tekanan manifold sebelum throttle body.

#### 8. Compressor Discharge Pressure Sensor
Mengkalibrasi sensor untuk monitoring tekanan output dari turbocharger atau supercharger.

### Catatan Penggunaan

- **Signal Polarity (Normal/Inverted)**: Saat mengkonfigurasi input dengan opsi **Normal/Inverted**, pastikan pengaturan sesuai dengan perilaku sensor yang diharapkan. Misalnya, sinyal inverted membalik logika input untuk mencocokkan wiring perangkat keras.

- **Flex Fuel dan Turbo Sensors**: Ini opsional tetapi direkomendasikan untuk setup yang memerlukan manajemen ethanol atau turbocharger yang presisi.

- Kalibrasi yang tepat sangat penting untuk sensor seperti **turbo speed** dan **pressure sensors** untuk memastikan akurasi dan menghindari masalah performa.

## Konfigurasi TPS dan Accelerator Pedal

![TPS and Accelerator Pedal Setup](images/tps-accelerator-setup.png)

Window **TPS (Throttle Position Sensor)** dan **Accelerator Pedal Sensor (PPS)** digunakan untuk mengkalibrasi dan mengkonfigurasi sensor yang diperlukan saat menggunakan **electronic throttle bodies (ETB)**. Kalibrasi yang tepat di bagian ini sangat penting untuk fungsi mesin, karena setup yang salah atau tidak lengkap dapat menyebabkan ECU mengeluarkan error dan menolak untuk berjalan sampai masalah diselesaikan.

### Setup TPS

- **Ford/Toyota Redundant TPS Mode**:
  - Mode ini dirancang khusus untuk **sensor TPS/PPS tertentu yang dibuat oleh Ford dan Toyota**, yang memiliki skala berbeda dibandingkan setup TPS/PPS biasa
  - Semua TPS/PPS menggunakan sensor redundan, tetapi mode ini hanya diperlukan ketika sensor kedua menunjukkan skala ganjil yang unik untuk manufaktur ini
  - Pastikan mode ini diaktifkan jika sensor tersebut digunakan

- **TPS/PPS Limits**:
  - **Minimum Valid Value (%)**: Nilai sensor terendah yang dapat diterima
  - **Maximum Valid Value (%)**: Nilai sensor tertinggi yang dapat diterima  
  - **Error Detection Threshold (%)**: Menentukan kapan ECU menandai fault berdasarkan deviasi dari nilai yang diharapkan

- **Throttle Body #1 dan #2 Sensors**:
  - Kalibrasi melibatkan pengaturan nilai **minimum (ADC)** dan **maximum (ADC)** menggunakan tombol **Auto Calibrate**
  - Pastikan input sensor ditetapkan dengan benar (mis. TPS1 Primary, TPS1 Secondary)
  - **Catatan**: Jika kalibrasi tidak lengkap atau salah, ECU akan menandai error dan menolak untuk berfungsi sampai dibersihkan

### Setup Accelerator Pedal

- **Accelerator Position Sensor**:
  - Tetapkan input untuk sensor pedal **primary** dan **secondary**
  - Gunakan tombol **Grab Up** untuk merekam voltase ketika pedal **tidak ditekan**
  - Gunakan tombol **Grab Down** untuk merekam voltase ketika pedal **ditekan penuh**
  - Pastikan kalibrasi presisi; deviasi dapat memicu error ECU

### Catatan Penting

- **Persyaratan Kalibrasi**: Kalibrasi TPS dan PPS harus diselesaikan dengan sukses agar ECU berfungsi dengan baik dengan ETB

- **Penanganan Error**: Jika kalibrasi gagal atau pengaturan salah, ECU akan menampilkan error dan mencegah mesin berjalan sampai masalah diselesaikan dan error dibersihkan

- Pengaturan ini **hanya diperlukan untuk setup ETB**. Untuk setup throttle drive-by-cable tradisional, konfigurasi ini tidak berlaku

## Konfigurasi Sensor O2

![O2 Sensor Configuration](images/o2-sensor-config.png)

Window **O2 Sensor** memungkinkan konfigurasi **unit wideband CAN** atau **sensor berbasis analog-input**, menyediakan fleksibilitas untuk berbagai setup.

### Konfigurasi CAN Wideband

- **Enable CAN Wideband**:
  - Bekerja dengan **unit wideband AEM** atau **Mazduino** yang dihubungkan melalui CAN
  - Pilih **channel CAN bus** tempat wideband terhubung
  - Jika channel tertukar, aktifkan **Swap Channels 1 and 2**
  - Opsi **Force O2 sensor heating** dapat mengesampingkan kontrol heating otomatis, meskipun biasanya diatur ke "No"

- **CAN Indicators**:
  - Menampilkan status operasional sistem wideband
  - Indikator hijau menandakan operasi yang tepat (mis. Heating Allowed, Communication OK)
  - Indikator merah menyoroti masalah seperti kegagalan heating atau sensor underheating/overheating

### Konfigurasi Analog Input

- **O2 Sensor I/O**:
  - **Input Channel**: Pilih input analog yang terhubung ke sensor
  - **Heater Output**: Tentukan channel output untuk kontrol heater

### Opsi Tipe O2

Dropdown **O2 Type** memungkinkan konfigurasi tipe sensor O2 yang digunakan untuk input analog:

- **Custom**: Memungkinkan konfigurasi manual skala voltase-ke-AFR sensor. Anda dapat mendefinisikan:
  - **Low Voltage (Volts)**: Voltase minimum yang dikeluarkan sensor
  - **Low Value (AFR)**: AFR yang sesuai dengan voltase rendah
  - **High Voltage (Volts)**: Voltase maksimum yang dikeluarkan sensor
  - **High Value (AFR)**: AFR yang sesuai dengan voltase tinggi

- **BP SX**: Skala predefined untuk sensor wideband BP SX

- **Innovate**: Skala predefined untuk kontroler wideband Innovate

- **14Point7**: Skala predefined untuk sensor wideband 14Point7

- **PLX**: Skala predefined untuk kontroler wideband PLX

- **Narrow Band**: Untuk sensor O2 narrowband tradisional. Terbatas pada perilaku switching stoichiometric

- **AEM**: Skala predefined untuk kontroler wideband AEM

### Pengaturan Opsi yang Benar

- Pilih **tipe predefined yang sesuai** jika menggunakan unit wideband umum untuk skala otomatis
- Gunakan **Custom** hanya jika tipe sensor Anda tidak terdaftar atau jika Anda perlu penyesuaian skala yang presisi. Masukkan data voltase dan AFR sensor di field yang disediakan
- Memilih tipe yang salah atau skala yang salah akan menghasilkan pembacaan AFR yang tidak akurat, yang dapat menyebabkan error tuning

### Catatan

- Skala yang tepat memastikan pembacaan AFR (Air-Fuel Ratio) yang akurat untuk sensor wideband dan narrowband
- Saat menggunakan wideband berbasis CAN, konfigurasi input analog di bagian bawah tidak diperlukan. Sebaliknya, untuk sensor analog, konfigurasi dan indikator CAN diabaikan

## VR Sensor Threshold

![VR Sensor Threshold](images/vr-sensor-threshold.png)

Screen ini digunakan untuk mengkonfigurasi **VR (Voltage Reference) Sensor Thresholds** untuk input sensor VR diskrit, yang hanya tersedia di unit Mazduino wire-in. Sensor VR umumnya digunakan untuk sensing posisi crankshaft dan camshaft.

### Konfigurasi

- **VR 1 Threshold**:
  - Mendefinisikan threshold voltase untuk sensor VR primer pada nilai RPM yang berbeda
  - ECU menggunakan threshold ini untuk mendeteksi zero-crossing sinyal VR secara akurat, memastikan pengukuran timing yang presisi
  - Tabel dan grafik memungkinkan penyesuaian untuk level voltase yang bervariasi pada RPM spesifik

- **VR 2 Threshold**:
  - Mengkonfigurasi threshold voltase untuk sensor VR sekunder (jika berlaku)
  - Mirip dengan VR 1, penyesuaian memastikan deteksi akurat dan pemrosesan sinyal untuk input VR sekunder

### Catatan Penting

- **Wire-in Only**: Fitur ini eksklusif untuk ECU wire-in dan tidak tersedia di unit plug-and-play

- **Kalibrasi**: Kalibrasi threshold yang tepat sangat penting untuk mencegah deteksi sinyal palsu atau pulse yang terlewat, terutama pada RPM tinggi

- **Penyesuaian**: Pastikan output voltase sensor VR selaras dengan threshold yang diatur dalam tabel untuk operasi yang akurat. Gunakan scope jika diperlukan untuk mengamati waveform VR dan memverifikasi pengaturan

Mengkonfigurasi threshold VR dengan benar memastikan operasi optimal sistem ignition dan timing, terutama dalam setup high-performance atau custom dimana sensor VR umumnya digunakan.

## Konfigurasi Speed Sensor

![Speed Sensor Configuration](images/speed-sensor-config.png)

Screen ini digunakan untuk mengkonfigurasi pengaturan speed sensor dan menghitung kecepatan kendaraan atau mendeteksi gear berdasarkan sinyal input.

### Pengaturan Speed Sensor

1. **Input**: Pilih pin input untuk sinyal speed sensor. Dalam contoh, "3B/4B - VR2" digunakan, menunjukkan speed sensor berbasis VR.

2. **Filter Parameter**: Menentukan filtering yang diterapkan pada sinyal speed sensor. Nilai yang lebih tinggi menghaluskan sinyal noise tetapi dapat mengurangi responsivitas.

3. **Wheel Revolutions per Kilometer (revs/km)**: Menentukan jumlah rotasi roda yang diperlukan untuk menempuh satu kilometer. Nilai ini tergantung pada ukuran ban dan harus akurat untuk kalkulasi kecepatan yang benar.

4. **Speed Sensor Gear Ratio**: Menentukan rasio gear dari speed sensor ke roda. Ini umumnya digunakan dalam kendaraan dimana speed sensor dipasang di gearbox.

5. **Speed Sensor Tooth Count**: Jumlah gigi atau pulsa yang dihasilkan per revolusi oleh speed sensor. Nilai ini penting untuk komputasi kecepatan yang akurat.

### CAN Vehicle Speed

1. **Enable CAN VSS**: Mengaktifkan penggunaan CAN-based Vehicle Speed Sensor (VSS) alih-alih input speed sensor langsung.

2. **CAN VSS Type**: Memilih tipe kendaraan untuk data kecepatan berbasis CAN (mis. BMW e46 dalam contoh).

3. **CAN VSS Scaling (ratio)**: Menyesuaikan faktor skala untuk data CAN VSS agar sesuai dengan kecepatan aktual.

### Pengaturan Gear Detection

1. **Wheel Revolutions per Kilometer (revs/km)**: Digunakan lagi di sini untuk menghitung kecepatan untuk deteksi gear.

2. **Final Drive Ratio**: Menentukan rasio antara driveshaft dan roda. Ini diperlukan untuk kalkulasi gear yang akurat.

3. **Forward Gear Count**: Jumlah gear maju yang tersedia. Dalam contoh ini, enam gear dikonfigurasi.

4. **Gear Ratios**: Mendefinisikan rasio gear untuk setiap gear. Rasio ini digunakan untuk menghitung dan mendeteksi gear mana yang terlibat berdasarkan kecepatan kendaraan dan RPM mesin.

### Catatan Kunci

- **Akurasi**: Konfigurasi yang tepat dari semua parameter sangat penting untuk deteksi kecepatan dan gear yang akurat

- **Kalibrasi**: Pastikan ukuran ban dan rasio gear diukur atau diverifikasi untuk menghindari error dalam kalkulasi kecepatan dan gear

- **CAN VSS**: Saat menggunakan CAN untuk kecepatan kendaraan, pastikan jaringan dikonfigurasi dan operasional untuk menghindari fallback ke pembacaan kecepatan yang salah

## Konfigurasi Sensor Fuel Pressure

![Fuel Pressure Sensor Configuration](images/fuel-pressure-sensor.png)

Screen ini memungkinkan konfigurasi sensor fuel pressure untuk sistem low-pressure dan high-pressure.

### Fuel Low Pressure Sensor

1. **Fuel Low Pressure Input**: Memilih channel input analog yang terhubung ke sensor low-pressure fuel. Jika tidak ada sensor yang digunakan, biarkan diatur ke `NONE`.

2. **Low Voltage (volts)**: Mendefinisikan voltase yang sesuai dengan tekanan terendah yang dapat diukur dari sensor.

3. **Low Pressure**: Menentukan tekanan aktual (dalam kPa atau unit lain) yang sesuai dengan voltase terendah sensor.

4. **High Voltage (volts)**: Mendefinisikan voltase yang sesuai dengan tekanan tertinggi yang dapat diukur dari sensor.

5. **High Pressure**: Menentukan tekanan aktual (dalam kPa atau unit lain) yang sesuai dengan voltase tertinggi sensor.

6. **Sensor Type**: Menunjukkan apakah sensor menyediakan pembacaan *Absolute* atau *Gauge*. Absolute termasuk tekanan atmosfer dalam pengukurannya, sedangkan Gauge hanya mengukur di atas tekanan atmosfer.

### Fuel High Pressure Sensor (Spesifik GDI)

1. **Fuel High Pressure Input**: Input ini khusus digunakan untuk sistem *Gasoline Direct Injection (GDI)*, yang memerlukan manajemen bahan bakar tekanan tinggi. Biarkan diatur ke `NONE` jika tidak berlaku.

2. **Low Voltage (volts)**: Mendefinisikan voltase yang sesuai dengan tekanan terendah yang dapat diukur untuk sensor high-pressure.

3. **Low Pressure**: Menentukan tekanan aktual (dalam bar atau unit lain) yang sesuai dengan voltase terendah.

4. **High Voltage (volts)**: Mendefinisikan voltase yang sesuai dengan tekanan tertinggi yang dapat diukur untuk sensor high-pressure.

5. **High Pressure**: Menentukan tekanan aktual (dalam bar atau unit lain) yang sesuai dengan voltase tertinggi.

### Catatan Penting

- **Kalibrasi**: Konfigurasi yang tepat dari voltase rendah dan tinggi dengan tekanan yang sesuai memastikan pembacaan sensor yang akurat

- **Raw Voltage Readout**: Gauge di sebelah kanan menampilkan sinyal voltase raw real-time dari sensor yang terhubung

- **Sensor Type**: Pastikan tipe sensor yang benar (Absolute atau Gauge) dipilih untuk menghindari misinterpretasi data

- **High Pressure**: Bagian *High Pressure* **hanya berlaku untuk sistem GDI**. Sistem port-injected tradisional tidak menggunakan fitur ini
