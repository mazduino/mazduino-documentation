# Examples & Map Switching TunerStudio

## Pengantar
Bagian ini menyediakan contoh praktis implementasi fitur TunerStudio Mazduino, dengan fokus khusus pada Map Switching yang memungkinkan pergantian tune secara real-time untuk kondisi operasi yang berbeda.

## Map Switching

![Map Switching Overview](images/map-switching-overview.png)

Map Switching adalah fitur powerful yang memungkinkan ECU untuk beralih antara konfigurasi tune yang berbeda berdasarkan input eksternal seperti switch, sensor, atau kondisi operasi tertentu.

### Konsep Dasar Map Switching

Map Switching bekerja dengan cara "blending" atau mencampur table utama (base table) dengan table tambahan (blend table) berdasarkan parameter tertentu. Hasil akhir adalah interpolasi antara kedua table sesuai dengan kondisi yang diinginkan.

**Keuntungan Map Switching**:

- Optimasi untuk kondisi operasi berbeda (street vs track)
- Adaptasi untuk kualitas bahan bakar berbeda (octane rating)
- Penyesuaian untuk kondisi cuaca atau ketinggian
- Tuning progressive untuk performa bertahap

## Implementasi Map Switching

### 1. Wiring Switch

![Switch Wiring](images/switch-wiring.png)

Untuk mengaktifkan map switching, Anda perlu menghubungkan switch fisik antara pin +5V ECU dan pin analog input yang tersedia (misalnya salah satu Aux Linear Sensor).

**Konfigurasi Wiring**:

- **Switch OFF**: Analog input membaca 0V

- **Switch ON**: Analog input membaca +5V

- **Threshold**: Kalibrasi seperti gambar berikut, dimana nilai di bawah 3V dianggap sebagai 0, dan nilai di atas 3.5V dianggap sebagai 1

**Langkah Wiring**:

1. Identifikasi pin analog input yang tidak digunakan
2. Hubungkan satu terminal switch ke pin +5V ECU
3. Hubungkan terminal lain switch ke analog input terpilih
4. Tambahkan pull-down resistor (10kΩ) dari analog input ke ground
5. Test kontinuitas dan isolasi dengan multimeter

### 2. Konfigurasi Blend Table

![Blend Table Configuration](images/blend-table-config.png)

Setelah wiring selesai, konfigurasikan blend table yang diinginkan di TunerStudio:

#### Memilih Blend Table
1. **VE Blend Table**: Untuk modifikasi fuel mapping
2. **Ignition Blend Table**: Untuk adjustment timing
3. **Boost Blend Table**: Untuk kontrol turbo yang berbeda
4. **Lambda Target Blend**: Untuk AFR target yang berbeda

#### Pengaturan Blend Parameter Source
**Blend Parameter** diatur ke analog input (misalnya **Aux Linear 1**) dimana switch dihubungkan. Input ini menentukan seberapa banyak blend table yang dicampur ke base table.

- **Switch OFF (0V)**: Parameter value minimum (0), ECU menggunakan nilai "Bias" yang didefinisikan dalam table (misalnya 0% blend)

- **Switch ON (5V)**: Parameter value maksimum (misalnya 1.0), ECU menggunakan **100% dari blend table**

### 3. Cara Kerja Bias Table

![Bias Table Function](images/bias-table-function.png)

**Bias Table** mendefinisikan persentase blend table yang akan diterapkan:

- **Param = 0**: Bias value **0%**, tidak ada blend yang diterapkan, base table tetap aktif

- **Param = 1.0**: Bias value **100%**, ECU sepenuhnya menggunakan blend table

**Contoh Praktis VE Blend**:

- **Switch OFF (0V)**: Blend table diabaikan (0% bias)

- **Switch ON (5V)**: Blend table sepenuhnya diterapkan (100% bias)

- Dalam VE blend ini, ketika switch tidak diaktifkan, table diabaikan. Setelah switch diaktifkan, table ini secara langsung menambah ke base VE table, artinya jika switch diaktifkan dan kita berada di 4000RPM dengan 80% load, kita akan menambahkan 10% VE ke kalkulasi fueling utama.

## Contoh Aplikasi Map Switching

### 1. Street vs Track Mode

![Street vs Track Mode](images/street-track-mode.png)

**Setup**:

- **Base Map**: Tune conservative untuk penggunaan harian

- **Blend Map**: Modifikasi aggressive untuk track day

**Konfigurasi**:
```
Base VE Table: Conservative fueling untuk reliability
Blend VE Table: +5% VE di high load areas untuk power
Ignition Base: Safe timing untuk pump gas
Ignition Blend: +3° advance untuk race fuel
```

**Operasi**:

- Switch OFF: Street mode dengan fueling conservative dan timing safe

- Switch ON: Track mode dengan fueling enriched dan timing advanced

### 2. Fuel Quality Switching

![Fuel Quality Switching](images/fuel-quality-switch.png)

**Setup**:

- **Base Map**: Tune untuk premium fuel (RON 92-95)

- **Blend Map**: Adjustment untuk race fuel (RON 98+)

**Konfigurasi**:
```
Base Tables: Optimized untuk pump gas
Ignition Blend: +4-6° timing advance untuk high octane
Lambda Target Blend: Leaner targets untuk better power
Boost Blend: +0.2 bar additional boost untuk race fuel
```

### 3. Progressive Tuning

![Progressive Tuning](images/progressive-tuning.png)

Gunakan analog input variable (potensiometer) alih-alih switch on/off untuk progressive blending:

**Setup Potensiometer**:

- **0V**: 0% blend (full base map)

- **2.5V**: 50% blend (mixture of base and blend)

- **5V**: 100% blend (full blend map)

**Aplikasi**:

- Driver dapat adjust level aggressiveness secara real-time
- Testing berbagai setting tanpa reflash ECU
- Gradual transition antara tune yang berbeda

## Advanced Map Switching Techniques

### 1. Multi-Parameter Switching

![Multi-Parameter Switching](images/multi-parameter-switching.png)

Gunakan multiple inputs untuk switching yang lebih kompleks:

**Contoh Setup**:
```
Aux Linear 1: Fuel quality switch (91/95/98 octane)
Aux Linear 2: Weather conditions (hot/cold/humid)
Aux Linear 3: Load condition (street/highway/track)
```

**Table Configuration**:

- Base table untuk kondisi normal
- Multiple blend tables untuk kombinasi kondisi
- Advanced blending logic menggunakan multiple parameters

### 2. Automatic Switching

![Automatic Switching](images/auto-switching.png)

Implementasi switching otomatis berdasarkan kondisi operasi:

**Trigger Conditions**:

- **RPM Range**: Switch ke high-RPM tune di atas 6000 RPM

- **Load Based**: Aggressive tune hanya pada high load (>80% TPS)

- **Temperature**: Cold start enrichment automatic switching

- **Speed Based**: Highway vs city driving modes

**Configuration Example**:
```
Blend Parameter: RPM
Bias Table:

- RPM < 4000: 0% blend (base tune)

- RPM 4000-6000: Progressive blend 0-50%

- RPM > 6000: 100% blend (performance tune)
```

### 3. Safety Switching

![Safety Switching](images/safety-switching.png)

Implementasi safety features dengan map switching:

**Limp Mode**:

- Automatic switch ke safe tune jika sensor error
- Reduced power dan conservative timing
- Enable basic engine operation untuk safely reach service

**Example Safety Configuration**:
```
Error Condition: MAP sensor fault
Action: Switch to Speed Density backup tune
Limitations: Max 3000 RPM, conservative timing
Duration: Until error cleared and ECU reset
```

## Troubleshooting Map Switching

### Common Issues

1. **Switch Not Responding**:
   - Verify wiring continuity dan voltage levels
   - Check analog input calibration
   - Ensure proper pull-up/pull-down resistor values

2. **Erratic Switching**:
   - Add filtering atau hysteresis ke switching logic
   - Check for electrical noise di switching signal
   - Verify stable power supply

3. **Unexpected Behavior**:
   - Verify blend table values dan scaling
   - Check bias table configuration
   - Ensure parameter source assignment correct

### Diagnostic Steps

1. **Monitor Raw Input**: Gunakan TunerStudio untuk monitor raw voltage dari switching input
2. **Test Tables**: Verify base dan blend table values masuk akal
3. **Log Data**: Record switching events dan resulting behavior
4. **Incremental Testing**: Test switching dengan engine off terlebih dahulu

## Best Practices

### Design Guidelines

1. **Start Simple**: Mulai dengan simple on/off switching sebelum advanced blending
2. **Safety First**: Selalu include safety limits di blend tables
3. **Documentation**: Document semua switching logic dan table purposes
4. **Testing**: Comprehensive testing di controlled environment

### Tuning Recommendations

1. **Conservative Base**: Base map harus safe untuk semua kondisi
2. **Gradual Changes**: Blend table harus smooth transitions
3. **Limit Extremes**: Avoid extreme values di blend tables
4. **Monitor Results**: Always monitor AFR dan timing saat switching

### Maintenance

1. **Regular Inspection**: Periksa switch mechanical condition
2. **Electrical Check**: Monitor input signal stability
3. **Table Review**: Periodic review table accuracy
4. **Update Documentation**: Keep switching logic documented

## Integration dengan Fitur Lain

### Launch Control Integration

Map switching dapat diintegrasikan dengan launch control:
```
Launch Active: Switch to launch timing map
Normal Operation: Return to selected tune map
```

### Traction Control Integration

Different maps untuk kondisi traction:
```
Good Traction: Full performance map
Slip Detected: Reduced torque map dengan timing retard
```

### Boost Control Integration

Coordinate map switching dengan boost control:
```
Base Map: Conservative boost targets
Blend Map: Increased boost dengan supporting fuel/timing
```

## Warranty Considerations

### Approved Uses

Map switching untuk approved applications tidak void warranty:

- Different fuel grades switching
- Weather condition adaptation
- Conservative vs performance modes

### Restricted Uses

Certain extreme applications dapat void warranty:

- Nitrous oxide switching (requires approval)
- Extreme boost level switching
- Racing-only applications tanpa safety limits

## Kesimpulan

Map switching adalah tool powerful yang memberikan fleksibilitas tremendous untuk adaptasi tune terhadap berbagai kondisi operasi. Dengan implementasi yang tepat, fitur ini dapat significantly improve drivability, performance, dan safety dari engine management system.

Key points untuk successful map switching:

- Proper electrical installation dan calibration
- Conservative base maps dengan well-designed blend tables
- Thorough testing dan documentation
- Regular maintenance dan monitoring
