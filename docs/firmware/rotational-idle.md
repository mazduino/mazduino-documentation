# Rotational Idle

Rotational idle memotong spark, fuel, atau keduanya pada sebagian siklus secara bergiliran antar silinder. Hasilnya suara idle yang "lumpy" seperti mesin dengan cam besar.

Fitur ini masih **experimental** dan bukan fitur yang dipakai semua orang.

Lokasi menu:

- TunerStudio: **Idle → Rotational Idle**
- Mazduino Tuner: **Expert → Rotational Idle**

!!! note "Firmware Nightly 20 November 2026 atau lebih baru"
    Batas CLT dan TPS, Stop short term fuel trim, Add idle air, dan Timing while active ada mulai firmware Nightly 20 November 2026. Firmware itu juga memperbaiki switch pin rotational idle: pada firmware lama pin hanya dibaca tanpa di-setup sebagai input, sehingga switch tidak terbaca dengan benar.

    Tune dari firmware lama tetap terbaca tanpa perubahan. Field baru terisi 0: Minimum CLT 0 °C, Maximum TPS/PPS tanpa batas, timing normal, STFT dan idle air tidak diubah.

!!! note "Firmware Nightly 24 November 2026 atau lebih baru"
    **Fuel multiplier while active** dan sinkron spark dengan fuel pada cut mode **Both** ada mulai firmware Nightly 24 November 2026. Nightly 23 November 2026 yang di-build ulang pada malam hari juga sudah memuatnya. Tune lama terbaca dengan Fuel multiplier 1.00.

---

## Cara Kerja

Rotational idle aktif kalau ketiga syarat ini terpenuhi:

1. **Enable** aktif.
2. **Semua batas terpenuhi**: RPM di antara Minimum dan Maximum RPM, CLT di atas Minimum CLT, dan TPS/PPS tidak di atas Maximum TPS/PPS.
3. **Salah satu pemicu aktif**: switch ON, atau auto enable CLT, atau auto enable TPS/PPS.

Batas di poin 2 berlaku untuk semua pemicu, **termasuk saat switch ON**. Jadi switch ON saat mesin dingin atau saat gas diinjak tidak menyalakan rotational idle.

| Pemicu | Aktif kalau |
|---|---|
| Switch | Pin switch diisi dan switch ON |
| Auto enable based on CLT | CLT di atas "Engage above this CLT" |
| Auto enable based on TPS/PPS | TPS/PPS sama dengan atau di bawah "Engage at or below this TPS/PPS" |

Kalau hanya ingin dinyalakan dari switch, matikan kedua auto enable. Rotational idle tidak akan menyala sendiri selama switch OFF.

---

## Pengaturan

### Umum

| Field | Keterangan |
|---|---|
| **Enable** | Menyalakan fitur. Field lain hanya bisa diubah kalau ini aktif. |
| **Cut mode** | **Spark**: hanya spark di-cut. **Fuel**: hanya injeksi di-cut. **Both**: spark dan fuel. |
| **Stop short term fuel trim while active** | STFT berhenti selama rotational idle aktif, dan LTFT berhenti belajar. Disarankan **yes** kalau memakai closed loop lambda. |
| **Add idle air while active** | Menambah udara idle selama aktif, untuk mengganti tenaga silinder yang di-cut. |
| **Idle air adder** | Persentase yang ditambahkan ke posisi idle valve open loop. Nilai negatif mengurangi udara. |
| **Fuel multiplier while active** | Pengali bahan bakar selama aktif. 1.00 = normal, 1.20 = 20% lebih banyak, 0.80 = 20% lebih sedikit. Range 0.50 sampai 2.50: di bawah 0.50 mesin misfire atau mati. Tune lama terbaca 1.00. |
| **Timing while active** | Timing pengapian selama aktif, menggantikan timing normal termasuk semua koreksinya. 0 = timing normal. Negatif berarti setelah TDC: -30 = 30° ATDC. Range -40 sampai 10. |

Kenapa STFT perlu dihentikan: silinder yang di-cut memompa udara (dan bahan bakar, pada mode Spark) ke exhaust. Sensor O2 membaca lean, lalu STFT menambah bahan bakar ke silinder yang masih menyala. Saat dihentikan, status STFT di dashboard tampil **Rotational idle**.

Timing while active tidak berlaku saat **Timing mode** diset fixed (untuk cek timing light). Timing fixed tetap dipakai.

### Pemicu

| Field | Keterangan |
|---|---|
| **Switch pin** | Pin input switch. Kosongkan kalau tidak memakai switch. |
| **Switch pin mode** | Untuk switch yang menghubungkan pin ke ground, pilih **INVERTED PULLUP**. |
| **Auto enable based on CLT** | Menyala otomatis berdasarkan suhu coolant. |
| **Engage above this CLT** | Menyala kalau CLT di atas nilai ini. |
| **Auto enable based on TPS/PPS** | Menyala otomatis saat gas dilepas. |
| **Engage at or below this TPS/PPS** | Menyala kalau TPS/PPS sama dengan atau di bawah nilai ini. **Jangan isi 0**: TPS saat gas lepas jarang terbaca tepat 0%. Isi 1–2%, atau sedikit di atas nilai TPS saat gas dilepas. |

### Batas

| Field | Keterangan |
|---|---|
| **Minimum CLT** | Rotational idle mati di bawah suhu coolant ini. |
| **Maximum TPS/PPS** | Rotational idle mati di atas TPS/PPS ini. 0 = tanpa batas. |
| **Minimum RPM** | Mati di bawah RPM ini. 0 = tanpa batas. |
| **Maximum RPM** | Mati di atas RPM ini. 0 = tanpa batas. |

### Accumulator (Pola Cut)

Ada 3 accumulator. Masing-masing punya **Max**, **Adder**, dan **Offset**. Setiap event spark menambah counter, dan setiap event injeksi menambah counter-nya sendiri. Event itu di-cut kalau:

```
((counter + Offset) mod Max) + Adder >= Max
```

Event di-cut kalau salah satu accumulator meminta cut. Di contoh pola di halaman ini, `x` = event menyala dan `_` = event di-cut.

- **Max** = panjang pola dalam event. 0 = accumulator ini tidak dipakai.
- **Adder** = berapa event di-cut dalam satu pola. Yang di-cut selalu event terakhir dalam pola, berurutan. Max 5 Adder 1: `xxxx_`. Max 5 Adder 2: `xxx__`.
- **Offset** = menggeser posisi cut di dalam pola. Lihat penjelasan di bawah.

**Kalau semua Max bernilai 0, tidak ada yang di-cut**, walaupun rotational idle aktif.

#### Offset

Offset memajukan posisi cut sebanyak Offset event. Contoh Max 7 Adder 1:

```
Offset 0:  xxxxxx_
Offset 3:  xxx_xxx
```

Dengan **satu** accumulator, Offset tidak mengubah suara: counter terus berjalan, jadi yang bergeser hanya titik mulai pola.

Offset baru berguna kalau beberapa accumulator dipakai dengan **Max yang sama**. Adder yang besar selalu memotong event secara berurutan. Beberapa accumulator dengan Offset berbeda bisa menyebar cut di dalam pola:

```
1 accumulator: Max 11, Adder 3                      xxxxxxxx___   cut berurutan, terdengar tersendat
3 accumulator: Max 11, Adder 1, Offset 0 / 4 / 7    xxx_xx_xxx_   cut tersebar, lope lebih rata
```

Keduanya sama-sama memotong 3 dari 11 event (27%), tapi iramanya berbeda.

Kalau Max-nya berbeda (misalnya 5 dan 7), Offset menggeser satu pola terhadap pola lainnya. Persentase cut tetap, tapi jarak antar cut dan iramanya berubah.

#### Memilih Max

Max dan jumlah silinder tidak boleh punya faktor yang sama. Kalau punya, cut hanya jatuh di sebagian silinder. Contoh di mesin 4 silinder:

- Max 4: yang di-cut selalu silinder yang sama.
- Max 6: hanya 2 dari 4 silinder yang pernah di-cut.

Silinder yang terus di-cut lebih dingin, dan businya cepat kotor.

| Jumlah silinder | Max yang cocok |
|---|---|
| 4 atau 8 | Ganjil: 3, 5, 7, 9, 11, 13 |
| 6 | Tidak habis dibagi 2 atau 3: 5, 7, 11, 13 |

Aturan ini berlaku untuk setiap accumulator yang dipakai.

#### Irama dan RPM

Jumlah event per detik = RPM × jumlah silinder / 120. Mesin 4 silinder di 900 RPM punya 30 event per detik, jadi pola Max 5 berulang 6 kali per detik. RPM idle yang lebih rendah atau Max yang lebih besar membuat irama lebih lambat dan lebih berat.

---

## Preset

Isi accumulator sesuai tabel. Accumulator yang tidak dipakai diisi **Max 0**. Format kolom accumulator: Max / Adder / Offset.

Semua preset merata di mesin 4, 6 dan 8 silinder, kecuali preset 5.

| No | Accumulator 1 | Accumulator 2 | Accumulator 3 | Cut | Pola | Catatan |
|---|---|---|---|---|---|---|
| 1 | 7 / 1 / 0 | 0 | 0 | 14% | `xxxxxx_` | Paling halus, seperti cam sedikit lebih besar dari standar |
| 2 | 5 / 1 / 0 | 0 | 0 | 20% | `xxxx_` | Seperti cam besar. Titik awal yang disarankan |
| 3 | 7 / 1 / 0 | 7 / 1 / 3 | 0 | 29% | `xxx_xx_` | Dua hentakan dengan jarak tidak sama |
| 4 | 11 / 3 / 0 | 0 | 0 | 27% | `xxxxxxxx___` | Jalan rata lalu tersendat |
| 5 | 3 / 1 / 0 | 0 | 0 | 33% | `xx_` | Derap teratur seperti langkah kuda. **Hanya 4 dan 8 silinder** |
| 6 | 5 / 2 / 0 | 0 | 0 | 40% | `xxx__` | Sangat kasar, gaya mesin drag |
| 7 | 5 / 1 / 0 | 7 / 1 / 2 | 0 | 31% | `xxxx_xxxx_x_xx_xxx__…` | Tidak beraturan, mirip idle rotary. Berulang tiap 35 event |
| 8 | 5 / 2 / 0 | 7 / 1 / 3 | 0 | 49% | `xxx__xxx___xx__xx___…` | Mirip rotary bridgeport. Butuh tambahan udara idle |
| 9 | 5 / 1 / 0 | 7 / 1 / 3 | 11 / 1 / 5 | 38% | `xxx___xxx__xxx_x__x_…` | Hampir tidak berulang (pola 385 event) |

Untuk mesin 6 silinder, preset 5 hanya memotong 2 dari 6 silinder. Pakai preset 3 atau 6 sebagai gantinya.

Suara rotary asli berasal dari 2 rotor dan port exhaust yang terbuka lebar, jadi nadanya tidak bisa ditiru mesin piston. Preset 7 dan 8 hanya meniru iramanya. Knalpot sangat menentukan hasil akhirnya.

### Setelan Pendukung

- **Stop short term fuel trim while active**: yes untuk semua preset.
- **Add idle air while active**: makin besar persentase cut, makin banyak udara yang dibutuhkan supaya RPM tidak turun. Sebagai titik awal, isi **Idle air adder** sekitar 5% untuk preset dengan cut 20% atau kurang, dan sekitar 10% untuk yang lebih berat. Lalu sesuaikan sampai RPM idle sama seperti saat rotational idle mati.
- **Maximum RPM** dan **Maximum TPS/PPS**: selalu isi, terutama untuk preset dengan cut di atas 30%.

### Cut Mode dan Timing

| Cut mode | Catatan |
|---|---|
| **Fuel** | Paling halus dan bersih. Silinder yang di-cut hanya memompa udara. |
| **Both** | Sama seperti Fuel, dan spark juga tidak dinyalakan pada event yang di-cut. Dengan injeksi sequential, spark mengikuti fuel per silinder: silinder yang tidak dapat bensin juga tidak dapat spark. |
| **Spark** | Paling keras, ada letupan di knalpot. Bahan bakar silinder yang di-cut ikut terbuang dan bisa terbakar di exhaust. Exhaust jadi panas, dan catalytic converter serta sensor O2 bisa rusak. |

Pola di tabel preset berlaku untuk spark, dan untuk fuel pada injeksi **sequential**. Pada injeksi batch atau simultaneous, satu event injeksi melayani lebih dari satu silinder, jadi pola fuel tidak sama dengan tabel. Pakai cut mode **Spark** kalau injeksinya batch.

Untuk letupan di knalpot, pakai cut mode **Spark** dengan **Fuel multiplier while active** sedikit di atas 1.00, misalnya 1.10 sampai 1.30. Bensin tambahan dari silinder yang di-cut terbakar di exhaust, jadi suhu exhaust ikut naik.

**Timing while active** di 0 memakai timing normal. Timing mundur, misalnya 0 sampai -10 (ATDC), membuat suara lebih berat tapi menaikkan suhu exhaust. Mulai dari nilai kecil, dan pantau EGT kalau ada sensornya.

!!! warning "Jangan dipakai terus-menerus"
    Preset berat, cut mode Spark, dan timing yang sangat mundur sama-sama menaikkan suhu exhaust. Untuk pemakaian show, nyalakan dari **switch** saja, bukan auto enable.

---

## Contoh Setup

### Hanya dari Switch

1. **Enable**: enabled
2. **Cut mode**: Spark
3. **Switch pin**: pin input yang dipakai, **Switch pin mode**: INVERTED PULLUP
4. **Auto enable based on CLT** dan **Auto enable based on TPS/PPS**: disabled
5. **Minimum CLT**: 60, **Maximum TPS/PPS**: 5
6. **Maximum RPM**: sedikit di atas RPM idle, misalnya 1500
7. **Accumulator**: preset 2 (Max 5, Adder 1, Offset 0, accumulator lain Max 0)
8. **Stop short term fuel trim while active**: yes

### Otomatis Saat Gas Dilepas

Sama seperti di atas, tapi switch pin dikosongkan dan **Auto enable based on TPS/PPS** diaktifkan dengan **Engage at or below this TPS/PPS** 1–2%. Maximum RPM wajib diisi supaya tidak menyala saat engine brake di RPM tinggi.

---

## Live Data

Panel live data ada di sebelah kanan dialog Rotational Idle:

| Indikator | Artinya |
|---|---|
| `rotationalIdleEngaged` | Rotational idle sedang aktif |
| `rotIdleEngineTooSlow` | RPM di bawah Minimum RPM |
| `rotIdleEngineTooFast` | RPM di atas Maximum RPM |
| `rotIdleEngineTooLowClt` | CLT di bawah Minimum CLT, atau di bawah "Engage above this CLT" pada auto enable CLT |
| `rotIdleTpsTooHigh` | TPS/PPS di atas Maximum TPS/PPS, atau di atas "Engage at or below this TPS/PPS" pada auto enable TPS/PPS |

---

## Rotational Idle Tidak Aktif? Cek Ini

1. **Enable** aktif dan tune sudah di-burn.
2. **Accumulator Max** tidak semuanya 0.
3. **Pemicu**: switch ON, atau salah satu auto enable aktif. Kalau memakai auto TPS/PPS, "Engage at or below this TPS/PPS" tidak 0.
4. **Batas**: cek indikator live data di atas untuk melihat batas mana yang menahan.
5. **Switch**: pin mode sesuai rangkaian, dan firmware Nightly 20 November 2026 atau lebih baru.
