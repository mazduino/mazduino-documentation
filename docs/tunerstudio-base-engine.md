# Base Engine Settings - TunerStudio

Konfigurasi dasar mesin untuk ECU Mazduino menggunakan TunerStudio. Pengaturan ini mencakup parameter fundamental engine yang crucial untuk operasi ECU yang tepat.

## Menu Base Engine Overview

Menu **Base Engine** dalam TunerStudio berisi pengaturan esensial yang berkaitan dengan konfigurasi fundamental engine. Untuk unit **Plug and Play**, sebagian besar pengaturan ini sudah dikonfigurasi dalam basemap yang disertakan, tetapi penyesuaian masih dapat dilakukan sesuai kebutuhan spesifik. Untuk unit **Metal-series Wire In**, semua pengaturan ini perlu dikonfigurasi dengan hati-hati.

![Base Engine Menu][image27]

### Submenu yang Tersedia:

1. **Base Engine**: Konfigurasi engine dasar seperti displacement, firing order, dan parameter crucial lainnya untuk operasi ECU yang tepat

2. **Limits and Protection**: Memungkinkan pengaturan batas keselamatan untuk parameter engine seperti RPM, coolant temperature, dan oil pressure

3. **Trigger**: Berisi pengaturan untuk konfigurasi crankshaft atau camshaft position sensor (trigger) yang essential untuk sinkronisasi ECU dengan rotasi engine

4. **Advanced Trigger**: Menyediakan konfigurasi lebih detail untuk trigger system, termasuk pengaturan untuk advanced triggering modes

5. **Trigger Gap Override**: Memungkinkan pengaturan manual gap override untuk trigger signal

6. **Battery and Alternator**: Mengelola pengaturan yang berkaitan dengan battery charging dan alternator functionality

7. **Outputs**: Mengkonfigurasi berbagai ECU output yang mengontrol komponen engine

8. **Air Conditioning**: Mengontrol pengaturan untuk interface dengan sistem A/C kendaraan

9. **Status LEDs**: Memungkinkan konfigurasi status LED pada ECU (jika applicable)

## Base Engine Settings Window

### Layout Selection

**Layout** dropdown memungkinkan Anda memilih kompleksitas tampilan pengaturan:

- **Tuning Layout**: Direkomendasikan untuk sebagian besar pengguna, terutama yang menggunakan Mazduino Plug and Play. Layout ini menyembunyikan beberapa tombol yang jarang digunakan, menciptakan interface yang lebih bersih

- **Full Layout**: Menampilkan semua opsi untuk konfigurasi lengkap. Manual ini menggunakan Full layout untuk memastikan kejelasan

![Base Engine Settings][image28]

### Engine Configuration

#### Basic Engine Parameters

1. **Number of Cylinders**: Atur jumlah silinder engine Anda (misalnya 4, 6, 8)
   - Pengaturan ini mempengaruhi kalkulasi timing dan fuel delivery
   - Pastikan sesuai dengan spesifikasi engine aktual

2. **Displacement (L)**: Masukkan displacement engine dalam liter
   - Input essential untuk menghitung air-fuel ratio dan parameter tuning lainnya
   - Digunakan untuk kalkulasi volumetric efficiency

3. **Firing Order**: Tentukan firing order engine Anda
   - Asumsi bahwa wiring kendaraan di-map langsung
   - Setiap silinder terhubung ke output number yang sesuai (Silinder 1 ke Output 1, dll.)
   - Memastikan sinkronisasi yang tepat antara ECU dan engine

#### Engine Metadata

Field-field ini digunakan terutama oleh rusEFI Online dan memberikan konteks tambahan:

1. **Engine Make**: Masukkan manufacturer atau brand engine (contoh: Toyota)
2. **Manufacturer Engine Code**: Masukkan kode engine (contoh: 22R)
3. **Vehicle Name**: Nama custom untuk kendaraan (contoh: "ProjectCar")
4. **Forced Induction**: Toggle opsi ini jika engine memiliki forced induction (turbo/supercharger)

### Fuel Strategy

Menentukan metode yang digunakan untuk menghitung fuel delivery. Opsi yang tersedia:

#### 1. Speed Density
- **Prinsip**: Menggunakan intake manifold pressure (MAP) dan intake air temperature (IAT) untuk menghitung air density dan fuel requirements

- **Aplikasi**: Strategi umum, terutama untuk naturally aspirated atau turbocharged engines

- **Keuntungan**: Reliable dan well-tested untuk sebagian besar aplikasi

#### 2. MAF Air Charge
- **Prinsip**: Bergantung pada Mass Air Flow (MAF) sensor untuk mengukur jumlah udara yang masuk engine secara langsung

- **Aplikasi**: Efektif untuk engine yang dilengkapi dengan MAF sensor

- **Keuntungan**: Direct measurement dari airflow

#### 3. Alpha-N
- **Prinsip**: Menggunakan throttle position sebagai load input utama untuk kalkulasi fuel

- **Aplikasi**: Digunakan pada engine dengan individual throttle bodies atau yang tidak memiliki MAP signal yang reliable

- **Keuntungan**: Cocok untuk ITB setups dan modified intake systems

#### 4. Lua
- **Prinsip**: Memungkinkan kalkulasi fuel custom menggunakan Lua scripting

- **Aplikasi**: Aplikasi tuning yang highly specific di mana strategi lain tidak applicable

- **Keuntungan**: Fleksibilitas maksimum untuk custom applications

## Rekomendasi Berdasarkan Tipe Unit

### Plug and Play Units
- Sebagian besar pengaturan sudah dikonfigurasi optimal dalam basemap
- Fokus pada penyesuaian engine-specific parameters:
  - Engine displacement jika berbeda dari default
  - Firing order jika custom
  - Fuel strategy jika menggunakan setup khusus

### Metal-series Wire In Units
- Semua pengaturan perlu dikonfigurasi dari awal
- Mulai dengan basic engine parameters
- Verifikasi fuel strategy sesuai dengan sensor setup
- Test dan validasi semua pengaturan sebelum first start

## Tips Konfigurasi

### Best Practices
1. **Double-check engine specifications** sebelum input parameters
2. **Start conservative** dengan pengaturan dasar
3. **Verify wiring** sesuai dengan firing order yang dipilih
4. **Test incrementally** setiap perubahan configuration

### Common Mistakes
1. **Salah firing order** - dapat menyebabkan rough idle atau misfire
2. **Displacement tidak akurat** - mempengaruhi fuel calculations
3. **Fuel strategy tidak sesuai** dengan sensor setup yang ada
4. **Forced induction setting** yang salah untuk NA engines

### Troubleshooting
- **Engine tidak start**: Periksa firing order dan trigger settings

- **Rough idle**: Verifikasi number of cylinders dan displacement

- **Poor fuel economy**: Review fuel strategy selection

- **Inconsistent performance**: Check engine metadata untuk akurasi

---

**Selanjutnya**: [Limits and Protection](tunerstudio-limits-protection.md)

<!-- Image References -->
[image27]: # "Base Engine Menu"
[image28]: # "Base Engine Settings Window"