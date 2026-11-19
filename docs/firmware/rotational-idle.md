# Rotational Idle

Rotational idle memotong spark, fuel, atau keduanya pada sebagian siklus secara bergiliran antar silinder. Hasilnya suara idle yang "lumpy" seperti mesin dengan cam besar.

Fitur ini masih **experimental** dan bukan fitur yang dipakai semua orang.

Lokasi menu:

- TunerStudio: **Idle → Rotational Idle**
- Mazduino Tuner: **Expert → Rotational Idle**

!!! note "Firmware Nightly 20 November 2026 atau lebih baru"
    Batas CLT dan TPS, Stop short term fuel trim, Add idle air, dan Timing while active ada mulai firmware Nightly 20 November 2026. Firmware itu juga memperbaiki switch pin rotational idle: pada firmware lama pin hanya dibaca tanpa di-setup sebagai input, sehingga switch tidak terbaca dengan benar.

    Tune dari firmware lama tetap terbaca tanpa perubahan. Field baru terisi 0: Minimum CLT 0 °C, Maximum TPS/PPS tanpa batas, timing normal, STFT dan idle air tidak diubah.

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

Ada 3 accumulator. Masing-masing punya **Max**, **Adder**, dan **Offset**. Setiap event spark (dan setiap event injeksi, dengan hitungan sendiri) menambah counter. Event itu di-cut kalau:

```
((counter + Offset) mod Max) + Adder >= Max
```

Event di-cut kalau salah satu accumulator meminta cut.

- **Max** = panjang pola. 0 = accumulator ini tidak dipakai.
- **Adder** = berapa event di-cut dalam satu pola. Max 5 dengan Adder 1 berarti 1 dari 5 event di-cut. Adder 2 berarti 2 dari 5.
- **Offset** = menggeser pola, berguna kalau memakai lebih dari satu accumulator.

**Kalau semua Max bernilai 0, tidak ada yang di-cut**, walaupun rotational idle aktif.

Nilai awal yang disarankan:

| Mesin | Max | Adder |
|---|---|---|
| 4 silinder | 5 | 1 |
| 6 silinder | 7 | 1 |

Rumus umum: Max = (jumlah silinder / 2 × X) ± 1, dengan X pengali untuk variasi pola. Hindari Max yang merupakan kelipatan jumlah silinder: pola tidak bergeser dan silinder yang sama terus di-cut.

---

## Contoh Setup

### Hanya dari Switch

1. **Enable**: enabled
2. **Cut mode**: Spark
3. **Switch pin**: pin input yang dipakai, **Switch pin mode**: INVERTED PULLUP
4. **Auto enable based on CLT** dan **Auto enable based on TPS/PPS**: disabled
5. **Minimum CLT**: 60, **Maximum TPS/PPS**: 5
6. **Maximum RPM**: sedikit di atas RPM idle, misalnya 1500
7. **Accumulator Max 1**: 5, **Adder 1**: 1 (mesin 4 silinder)
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
