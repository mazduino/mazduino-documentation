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

### Enable/Disable Settings

**Enable Coasting Fuel Cutoff**: Mengaktifkan fuel cutoff selama coasting

**No cut below CLT(C)**: Coolant temperature minimum di bawah mana fuel cutoff tidak terjadi

### Activation Thresholds

**RPM cut fuel above**: RPM threshold di atas mana fuel cutoff akan engage selama deceleration

**RPM restore fuel below**: RPM di mana fuel di-restore setelah cutoff

**Vehicle speed cut above/restore below**: Speed thresholds untuk mengaktifkan/menonaktifkan fuel cutoff

**Cut fuel below TPS(%)**: Throttle position threshold untuk aktivasi fuel cutoff

**Cut fuel below MAP(kPa)**: Manifold pressure threshold untuk aktivasi fuel cutoff

### Advanced Settings

**Fuel cut delay**: Delay sebelum fuel cutoff engage setelah kondisi terpenuhi

**Inhibit closed loop fuel after cut**: Temporarily disable closed-loop fuel correction setelah fuel di-restore

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