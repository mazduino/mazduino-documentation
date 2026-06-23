# Limits and Protection - TunerStudio

Sistem proteksi dan pembatasan untuk melindungi engine dari kondisi yang dapat menyebabkan kerusakan. Menu **Limits and Protection** berisi pengaturan essential untuk menjaga engine dalam parameter operasi yang aman.

![Limits and Protection Menu][image29]

## Overview Limits and Protection

Submenu **Limits and Protection** di bawah **Base Engine** mencakup pengaturan essential untuk melindungi engine dengan menetapkan batas operasional. Bagian ini crucial untuk melindungi engine dari kondisi yang dapat menyebabkan kerusakan.

### Opsi yang Tersedia:

#### 1. Limits and Fallbacks
- Memungkinkan pengguna menentukan batas operasional maksimum untuk berbagai parameter engine
- Saat batas tercapai, strategi fallback (seperti mengurangi power atau memicu safe mode) diaktivasi
- **Contoh**: Setting RPM limit untuk memastikan engine tidak melebihi threshold tertentu

#### 2. Oil Pressure Protection
- Monitors oil pressure levels untuk melindungi engine dari insufficient lubrication
- Jika oil pressure turun di bawah level yang aman, fitur ini dapat mengaktivasi warning atau shutdown engine
- **Catatan**: Pastikan oil pressure sensor dikalibrasi dengan benar dalam TunerStudio

#### 3. Lambda Protection
- Monitors air-fuel ratios (AFR) untuk memastikan engine beroperasi dalam parameter pembakaran yang aman
- Jika AFR menyimpang dari range yang aman, dapat memicu corrective actions
- **Tip**: Lambda protection essential untuk turbocharged atau high-performance engines

## Limits and Fallbacks Configuration

![Limits and Fallbacks][image30]

### Main Options

#### RPM Limiting Methods

1. **Cut fuel on RPM limit**:
   - Memotong suplai fuel saat RPM limit tercapai
   - Memberikan limiting action yang lebih smooth
   - Dapat mengakibatkan temperature combustion chamber sedikit lebih tinggi

2. **Cut spark on RPM limit**:
   - Memotong spark untuk membatasi RPM
   - Dapat menghasilkan flames dari exhaust karena unburned fuel
   - Unburned fuel membantu mendinginkan combustion chamber

3. **Use CLT-based RPM limit curve**:
   - Mengaktifkan RPM limit yang bervariasi dengan coolant temperature
   - Menggunakan control panel di sebelah kanan
   - Memungkinkan pengaturan RPM limit berbeda berdasarkan temperature engine

### RPM Limits Configuration

#### Basic RPM Settings
- **RPM hard limit (RPM)**: RPM maksimum sebelum cut actions (fuel atau spark) dipicu

- **RPM limit hysteresis (RPM)**: Buffer di bawah RPM hard limit untuk menghindari rapid cycling

#### Boost Cut Limits
- **Boost cut pressure (kPa absolute)**: Tekanan boost maksimum absolut yang diizinkan

- **Boost cut pressure hysteresis (kPa absolute)**: Range tekanan di bawah cut limit untuk kontrol yang lebih smooth

### Injector Duty Cycle Limiter

#### Immediate Protection
- **Instantaneous injector duty cycle limit (%)**: 
  - Limit immediate pada injector duty cycle
  - Jika threshold tercapai, sistem langsung cut injectors

#### Sustained Protection
- **Sustained injector duty cycle limit (%)**: Limit untuk operasi berkelanjutan

- **Sustained injector duty cycle delay (seconds)**: Waktu delay sebelum limit sustained aktif

- Memungkinkan high fuel demands sementara sambil melindungi injectors dari prolonged stress

### Soft RPM Limit Options

#### Gradual Engagement
- **Window size (RPM)**: Range RPM untuk gradual engagement

- **Timing retard (degrees)**: Retard timing secara bertahap

- **Fuel added (%)**: Tambahan fuel untuk smooth transition

Opsi-opsi ini memungkinkan membuat "soft" limiter yang gradually engage, bukan abruptly cutting fuel atau spark.

### Electronic Throttle Limiting

#### Throttle-Based Limiting
- **Soft limiter start RPM**: RPM mulai throttle closing

- **Soft limiter range (RPM)**: Range RPM untuk gradual throttle closing

Secara bertahap menutup throttle saat RPM mendekati limit, memberikan smooth limiter response.

## Oil Pressure Protection

![Oil Pressure Protection][image31]

### Configuration Options

**Minimum oil pressure after start (kPa)**:

- Field untuk memasukkan nilai minimum oil pressure dalam kilopascals
- Jika oil pressure turun di bawah threshold ini selama operasi, sistem akan mengaktivasi protective measure
- Essential untuk engine longevity, terutama high-performance atau heavily modified engines

### Implementation Notes
- Pastikan oil pressure sensor terkalibrasi dengan benar
- Test threshold values pada kondisi operasi normal
- Consider engine warm-up characteristics saat setting values

## Lambda Protection

![Lambda Protection][image32]

### Enable/Disable Settings

**Enable lambda protection**: Toggle untuk mengaktifkan/menonaktifkan Lambda Protection

### Activation Conditions

Lambda protection hanya aktif saat semua kondisi berikut terpenuhi:

1. **Check above load (%)**: Load engine melebihi percentage threshold ini
2. **and above TPS (%)**: Throttle position sensor melebihi percentage ini
3. **and above RPM**: RPM di atas threshold yang ditentukan
4. **and after delay (s)**: Delay time sebelum Lambda Protection engage

### Cut Fuel Conditions

**Cut Fuel Until** section menentukan kondisi di mana fuel akan dipotong:

1. **Load less than (%)**: Fuel dipotong hingga engine load turun di bawah percentage ini
2. **and TPS less than (%)**: Fuel cut berlanjut hingga TPS di bawah percentage ini
3. **and RPM less than (RPM)**: Fuel cut aktif hingga RPM turun di bawah threshold ini

### Lambda Difference Table

**Lambda Difference Table** (sisi kanan window) memungkinkan setting maksimum allowable deviation dalam Lambda values:

- **Y-axis**: Load

- **X-axis**: RPM  

- **Z-axis values**: Lambda values (bukan AFR)

Table ini membantu menentukan Lambda deviation limits di bawah berbagai engine loads dan RPMs.

## Rekomendasi Setting

### Conservative Settings (Recommended untuk pemula)
- **RPM limit**: 500-1000 RPM di bawah engine redline

- **Oil pressure minimum**: Sesuai spesifikasi engine manufacturer

- **Lambda protection**: Aktif di atas 70% load dan 3000 RPM

### Performance Settings
- **Soft RPM limit**: Window size 200-500 RPM untuk smooth engagement

- **Lambda protection**: Tighter tolerances untuk precision control

- **Boost cut**: 50-100 kPa di bawah maximum safe boost

### Troubleshooting Protection Issues

#### RPM Limiter Tidak Aktif
- Verifikasi RPM sensor signal quality
- Check trigger settings dan sync
- Pastikan limit values realistic

#### Oil Pressure False Alarms  
- Kalibrasi ulang oil pressure sensor
- Check wiring dan ground connections
- Adjust minimum pressure sesuai engine characteristics

#### Lambda Protection Terlalu Sensitive
- Increase load/RPM thresholds
- Expand Lambda difference table tolerances  
- Add delay time untuk prevent false triggers

---

**Selanjutnya**: [Trigger Configuration](tunerstudio-trigger.md)

<!-- Image References -->
[image29]: # "Limits and Protection Menu"
[image30]: # "Limits and Fallbacks Configuration"
[image31]: # "Oil Pressure Protection"
[image32]: # "Lambda Protection"