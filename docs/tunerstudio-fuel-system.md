# Fuel System Configuration - TunerStudio

Konfigurasi komprehensif untuk sistem bahan bakar ECU Mazduino. Menu **Fuel** berisi berbagai pengaturan yang mengontrol fuel injection, enrichment, correction factors, dan kompensasi terkait fuel.

![Fuel Menu][image33]

## Fuel Menu Overview

Menu **Fuel** menyediakan akses ke berbagai pengaturan yang mengontrol fuel injection, enrichment, correction factors, dan kompensasi terkait fuel. Untuk unit **Plug and Play**, banyak pengaturan ini sudah dikonfigurasi dalam basemap yang disertakan, tetapi penyesuaian masih dapat dilakukan. Untuk unit **Metal-series Wire In**, kalibrasi penuh diperlukan berdasarkan setup kendaraan.

### Submenu yang Tersedia:

1. **Injection Configuration**: Setup parameter injection dasar seperti injection timing dan fuel injector configuration

2. **Injection Hardware**: Konfigurasi aspek fisik fuel injectors, termasuk flow rate dan injector characterization

3. **Cylinder Bank Selection**: Untuk engine dengan multiple injector banks, mengatur assignment silinder ke bank untuk optimal fuel delivery

4. **Injector Small-Pulse Correction**: Adjustment untuk injector behavior pada low pulse widths untuk smooth fuel delivery

5. **Staged Injection**: Untuk secondary injectors dalam aplikasi high-performance

6. **Cylinder Fuel Trims**: Individual fuel trim adjustments per cylinder

7. **VE (Volumetric Efficiency) Table**: Primary fuel table untuk mengatur VE values

8. **VE 3D View**: Representasi visual VE table dalam 3D

9. **VE Blend Tables**: Setup secondary VE tables untuk blending purposes

10. **Target AFR**: Menentukan target air-fuel ratio untuk berbagai kondisi operasi

11. **Charge Temperature Estimation**: Kompensasi untuk perubahan air density karena temperature

12. **CLT (Coolant Temperature) Multiplier**: Adjustment fuel delivery berdasarkan coolant temperature

13. **IAT (Intake Air Temperature) Multiplier**: Kompensasi untuk intake air temperature

14. **Closed Loop Fuel Correction**: Closed-loop control menggunakan feedback dari oxygen sensor

15. **Deceleration Fuel Cutoff (DFCO)**: Memotong fuel selama deceleration

16. **Injection Phase**: Adjustment timing injection event relatif terhadap intake stroke

17. **Acceleration Enrichment**: Tambahan fuel saat throttle dibuka dengan cepat

## Injection Configuration

![Injection Configuration][image34]

### Injection Settings

#### Basic Injection Parameters

**Enabled**: Set ke `true` untuk mengaktifkan fuel injection

**Mode**: Opsi meliputi:

- **Sequential**: Individual injector timing - setiap injector fire sesuai firing order

- **Batch**: Semua injectors fire bersamaan

- **Batch Injection with Individual Wiring**: Injectors diwiring terpisah tapi beroperasi dalam batch mode

**Alpha-N Uses IAT Density Correction**: Saat set ke `true`, mengaktifkan koreksi berbasis intake air temperature untuk strategi tuning Alpha-N

**Override VE Table Load Axis**: Memungkinkan mengubah default load axis yang digunakan untuk VE table (biasanya MAP)

**Override AFR Table Load Axis**: Override default load axis untuk target AFR table

**Injection Phase Control Mode**: Menentukan kapan fuel disuntikkan relatif terhadap intake valve opening

### Injector Settings

#### Flow and Characterization

**Injector Flow**: Specifies flow rate injector, biasanya dalam cc/min atau lbs/hr

**Injector Flow Units**: Pilih antara **Volumetric Flow** (cc/min) atau unit lainnya

**Injector Flow Compensation Mode**:

- **None**: Untuk setup dengan MAP-referenced fuel pressure regulator

- **Fixed Rail Pressure**: Untuk sistem dengan atmosphere-referenced fuel pressure regulator

- **Sensed Rail Pressure**: Untuk sistem dengan fuel pressure sensor

**Fuel Rail Pressure Sensor**: Hanya digunakan saat "Sensed Rail Pressure" dipilih

### Fuel Characteristics

**Stoichiometric Ratio**: Menentukan stoichiometric air-fuel ratio (AFR) untuk tipe fuel yang digunakan

**E100 Stoichiometric Ratio**: Menentukan stoichiometric AFR untuk E100 (pure ethanol) untuk ethanol blends

### Injector Dead Time

Menampilkan graph yang menunjukkan injector dead time (dalam milliseconds) sebagai fungsi battery voltage. Dead time menurun saat voltage naik, memastikan kontrol injector yang presisi di bawah kondisi elektrik yang bervariasi.

## VE (Volumetric Efficiency) Table

![VE Table][image35]

VE Table menampilkan nilai volumetric efficiency engine sebagai fungsi **load (kPa)** dan **RPM**. Values ini menentukan seberapa banyak fuel yang dibutuhkan berdasarkan karakteristik airflow engine pada operating points yang berbeda.

### Typical VE Values

#### Idle Conditions
- **Load**: 30-50 kPa, **RPM**: 500-1000

- **VE Values**: 30-40%

- Merepresentasikan airflow yang relatif rendah saat engine running pada low RPM dan tanpa load

#### High Load Conditions  
- **Load**: 100-250 kPa, **RPM**: 4000-7000

- **VE Values**: 80-100% atau lebih

- Engines dengan forced induction dapat memiliki values melebihi 100%

#### Troubleshooting VE Values

Jika VE values signifikan berbeda dari ranges ini, mungkin mengindikasikan **injectors belum correctly modeled**:

- Incorrect injector flow rates
- Dead time settings salah
- Kesalahan kalibrasi lainnya

## Target AFR Table

![Target AFR][image36]

Target AFR Table mengatur air-fuel mixture yang diinginkan untuk berbagai kondisi **RPM** dan **load (kPa)**. Values dalam table ini mempengaruhi seberapa rich atau lean mixture akan di berbagai operating conditions.

### Example Breakdown - Turbocharged Engine

Table contoh ini di-setup untuk turbocharged, cammed engine:

#### Idle AFR (14.0 AFR)
- Target untuk idle AFR yang lebih smooth, praktek umum untuk cammed engines
- Memberikan idle yang lebih stabil

#### Boost Conditions (150-250 kPa)
- AFR targets lebih rich: 10.7-11.0 AFR

- Mengurangi risiko detonation 
- Menjaga combustion temperatures aman
- Memastikan reliable performance di bawah high load

#### Mid-Range Conditions
- Balance antara performance dan efficiency
- Typical values: 12.5-13.5 AFR untuk partial load

## Closed Loop Fuel Correction

![Closed Loop Correction][image37]

### Basic Settings

**Enabled**: Mengaktifkan closed-loop correction system

**Startup delay**: Delay (dalam seconds) setelah startup sebelum koreksi dimulai

**Minimum CLT for correction**: Coolant temperature minimum untuk mulai corrections

**Minimum/Maximum AFR for correction**: Range AFR di mana corrections akan diaplikasikan

**Adjustment deadband**: Threshold di mana tidak ada corrections yang dibuat untuk menghindari fluktuasi minor

**Ignore error magnitude**: Mengontrol berapa AFR error yang diabaikan sebelum corrections diterapkan

### Region Configuration

**Region Configuration** memungkinkan kustomisasi RPM dan load thresholds:

- **Idle region RPM**: RPM yang dianggap sebagai idle threshold

- **Overrun region load**: Load limit untuk membedakan deceleration

- **Power region load**: Load limit untuk high load conditions

### Region-Specific Parameters

Setiap region (Main, Idle, Power, Overrun) memiliki **time constants** dan **maximum add/remove percentages**:

- **Time constant**: Mengontrol responsiveness corrections

- **Max add/remove**: Membatasi maximum fuel adjustment

## Coasting Fuel Cutoff (DFCO)

![Fuel Cutoff Settings][image38]

DFCO memutus injeksi saat engine brake, yaitu gas dilepas pada RPM tinggi. Bahan bakar lebih hemat dan engine brake terasa lebih kuat.

Lokasi menu:

- TunerStudio: **Fuel → Deceleration fuel cutoff (DFCO)**
- Mazduino Tuner: **Fuel → Overrun cut**

DFCO hanya aktif kalau **semua** syarat di bawah terpenuhi: CLT, TPS, MAP, RPM, kecepatan kendaraan, dan switch (kalau dipasang).

### Enable/Disable Settings

**Enable Coasting Fuel Cutoff**: Mengaktifkan fuel cutoff selama coasting

**No cut below CLT(C)**: DFCO hanya aktif di atas suhu coolant ini. Default 60 °C, jadi mesin yang masih dingin tidak kena cut.

### Activation Thresholds

**RPM cut fuel above**: Fuel di-cut kalau RPM di atas nilai ini. Default 1500 RPM.

**RPM restore fuel below**: Fuel kembali disuntik kalau RPM turun di bawah nilai ini. Default 1300 RPM. Nilai ini harus lebih rendah dari RPM cut, selisihnya mencegah DFCO on-off terus.

**Vehicle speed cut above/restore below**: Batas kecepatan kendaraan untuk cut dan restore. **Kalau tidak ada sensor kecepatan (VSS), isi keduanya 0.** Kalau "cut above" diisi lebih dari 0 tanpa VSS, kecepatan terbaca 0 dan DFCO tidak pernah aktif.

**Cut fuel below TPS(%)**: DFCO hanya aktif kalau TPS (atau pedal, pada ETB) di bawah nilai ini. Default 2%. Cek nilai TPS di gauge saat gas dilepas penuh: TPS yang belum dikalibrasi sering terbaca 3–5% dan DFCO tidak pernah aktif.

**Cut fuel below MAP(kPa)**: DFCO hanya aktif kalau MAP di bawah nilai ini. Default 30 kPa. Saat engine brake MAP biasanya 20–30 kPa. Kalau di mesin anda MAP saat engine brake lebih tinggi, naikkan nilai ini sedikit di atasnya. Tanpa sensor MAP, syarat ini diabaikan.

### Advanced Settings

**Fuel cut delay**: Delay sebelum fuel cutoff engage setelah kondisi terpenuhi. 0 = langsung cut.

**Inhibit closed loop fuel after cut**: Temporarily disable closed-loop fuel correction setelah fuel di-restore

**Ignition retard during cut**: Timing dimundurkan sebanyak ini (maksimal 30°) selama cut, supaya hentakan saat fuel kembali lebih halus.

**After cut timing ramp-in time**: Waktu untuk mengembalikan timing ke normal setelah fuel kembali disuntik.

### Enable Switch (Opsional)

Switch untuk menyalakan atau mematikan DFCO dari kabin, misalnya saat balap atau saat setting.

- **Switch ON**: DFCO aktif mengikuti semua syarat di atas
- **Switch OFF**: DFCO tidak pernah aktif
- **Pin tidak diisi (unassigned)**: DFCO hanya mengikuti syarat di atas, tanpa switch

**Enable switch pin**: Pin input untuk switch.

**Enable switch pin mode**: Untuk switch yang menghubungkan pin ke ground, pilih **INVERTED PULLUP**: pull-up internal aktif, dan pin yang terhubung ke ground terbaca ON.

!!! note "Firmware sebelum 19 November 2026"
    Pada firmware lama, pin switch DFCO hanya dibaca tanpa di-setup sebagai input, jadi pull-up atau pull-down dari pin mode tidak aktif dan switch tidak terbaca dengan benar. Update ke firmware 19 November 2026 atau lebih baru. Kalau belum bisa update, kosongkan pin switch supaya DFCO mengikuti syarat saja.

### DFCO Tidak Aktif? Cek Ini

Tambahkan indikator **`dfcoActive`** ke dashboard, lalu cek satu per satu saat engine brake:

1. **Enable Coasting Fuel Cutoff** aktif dan tune sudah di-burn.
2. **Switch**: kalau pin switch diisi, switch harus ON. Kalau tidak memakai switch, kosongkan pin.
3. **CLT** di atas "No cut below CLT".
4. **TPS** saat gas dilepas di bawah "Cut fuel below TPS".
5. **MAP** saat engine brake di bawah "Cut fuel below MAP".
6. **RPM** di atas "RPM cut fuel above".
7. **Kecepatan kendaraan**: tanpa VSS, isi kedua nilai kecepatan 0.
8. **Sensor**: kalau sensor TPS atau CLT error, DFCO dimatikan. Begitu juga MAP kalau sensor MAP terpasang tapi error.
9. **Sedang setting VE**: kalau **Detect Tuning and Suspend** aktif (di pengaturan closed loop fuel), DFCO dan STFT berhenti selama 20 detik setelah setiap perubahan tabel VE, termasuk dari autotune. Indikator `isTuningNow` menyala selama masa itu.
10. **Fuel cut delay** yang terlalu panjang membuat cut baru terjadi lama setelah gas dilepas.

## Acceleration Enrichment

![Acceleration Enrichment][image39]

### TPS-Based Enrichment

**Length (sec)**: Durasi enrichment pulse saat throttle movement terdeteksi

**Accel Threshold (roc)**: Rate of change threshold untuk trigger acceleration enrichment

**Decel Threshold (roc)**: ROC threshold untuk trigger deceleration enrichment

### Accelerator Pump Model

**Fraction Period (cycles)** dan **Fraction Divisor (coef)**: Mengontrol bagaimana enrichment dikirimkan selama rapid throttle changes

### Wall Wetting Compensation

**Wall fueling model type**: Model untuk calculating wall wetting fuel adjustments

**Evaporation time constant / tau**: Time constant untuk fuel evaporation dari intake walls

**Added to wall coef / beta**: Proporsi fuel yang menempel ke intake walls

## Rekomendasi Tuning

### Plug and Play Units
- Sebagian besar settings sudah optimal dalam basemap
- Focus pada adjustment engine-specific parameters
- Monitor AFR dan performance untuk fine-tuning

### Metal-series Wire In Units
- Semua parameters perlu dikonfigurasi dari awal
- Start dengan conservative values
- Incremental tuning dengan data logging

### Best Practices
1. **Start conservative** dengan fuel delivery
2. **Monitor AFR constantly** selama tuning
3. **Use data logging** untuk track performance
4. **Test incrementally** setiap perubahan

---

**Selanjutnya**: [Ignition System Configuration](tunerstudio-ignition.md)

<!-- Image References -->
[image33]: # "Fuel Menu Overview"
[image34]: # "Injection Configuration"
[image35]: # "VE Table"
[image36]: # "Target AFR Table"
[image37]: # "Closed Loop Correction"
[image38]: # "Fuel Cutoff Settings"
[image39]: # "Acceleration Enrichment"