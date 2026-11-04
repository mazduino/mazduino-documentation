# Input Tambahan Dash R4

Kalau ECU Anda tidak mengirim data turn signal, head light, high beam, atau fuel
level, sinyalnya bisa diambil langsung dari mobil lewat pin cadangan Dash R4. Pin
ini juga bisa dipakai untuk tombol ganti tema. Halaman ini membahas rangkaian,
pengaturan di DashTune, dan kalibrasi fuel level.

Semua pengaturan ada di DashTune, menu **Input tambahan**. Pilihan di menu ini
tersimpan di dash dan tetap ada setelah kunci kontak dimatikan.

> **Penting:** semua pin bekerja di **3,3 V**, sedangkan listrik mobil 12–14,4 V
> dan bisa melonjak lebih tinggi saat starter atau alternator bekerja. **Jangan
> menyambungkan kabel mobil langsung ke pin.** Pin yang terkena 12 V akan rusak
> permanen. Selalu pakai rangkaian di bawah.

## Pin yang dipakai

| Fungsi | Pin yang disarankan | Jenis input |
| :---- | :---- | :---- |
| Turn signal kiri | GPIO 32 | Digital |
| Turn signal kanan | GPIO 33 | Digital |
| Head light | GPIO 46 | Digital |
| High beam | GPIO 47 | Digital |
| Tombol ganti tema | GPIO 48 | Digital |
| Fuel level | GPIO 20 (cadangan GPIO 23) | Analog |

Pin digital lain yang masih bisa dipilih: GPIO 2, 26, dan 27. Fuel level
hanya bisa memakai GPIO 20 atau GPIO 23, karena hanya dua pin ini yang bisa
membaca tegangan.

Kalau sebuah fungsi sudah diberi pin, dash membaca dari pin itu, bukan dari ECU.

## Turn signal, head light, dan high beam

Setiap sinyal memakai satu rangkaian optocoupler. Optocoupler membuat lonjakan
tegangan di kabel lampu tidak bisa sampai ke pin.

```
  SISI MOBIL                         PC817                 SISI DASH R4
                               ┌──────────────┐        3V3
                               │              │         │
                               │              │     [R2 10 kΩ]
                               │              │         │
  Kabel lampu ──[R1 2,2 kΩ]──┬─┤1 anoda      4├─────────┼──┬─── GPIO
  (+12 V saat lampu          │ │              │         │  │
   menyala)               D1 ┴ │              │            C1 100 nF
                     1N4148  ▲ │              │            │
  Ground mobil ──────────────┴─┤2 katoda     3├────────────┴─── GND
                               └──────────────┘
```

| Komponen | Nilai | Fungsi |
| :---- | :---- | :---- |
| U1 | PC817 | Memisahkan kabel mobil dari pin |
| R1 | 2,2 kΩ, ¼ W atau SMD 1206 | Membatasi arus LED, sekitar 5–7 mA |
| R2 | 10 kΩ | Menahan pin di 3,3 V saat lampu mati |
| C1 | 100 nF | Meredam noise |
| D1 | 1N4148 atau 1N4148W | Melindungi LED dari tegangan terbalik |

**Arah D1:** gelang pada dioda menghadap ke pin 1 PC817, sisi tanpa gelang ke
pin 2. Kalau terbalik, arus lewat dioda dan sinyal tidak terbaca.

**Ground:** pin 2 ke ground mobil, pin 3 ke GND dash. Jangan menggabungkan
keduanya di PCB. Keduanya memang bertemu di bodi mobil, tetapi jalur arus lampu
sebaiknya tidak melewati jalur GND dash.

### Pengaturan di DashTune

1. Buka **Input tambahan**, lalu pilih kartu fungsinya.
2. Pilih pin yang dipakai.
3. Set **Aktif saat: Ke ground**, karena optocoupler menarik pin ke GND saat
   lampu menyala.

### Dari mana sinyalnya diambil

- **Turn signal:** ambil dari kabel lampu turn signal **setelah relay flasher**,
  satu rangkaian untuk kiri dan satu untuk kanan. Kabel indikator di panel
  instrumen bawaan juga bisa dipakai.
- **Head light:** ambil dari kabel yang menyala saat lampu dihidupkan. Sinyal
  ini juga dipakai oleh **Redupkan layar saat lampu menyala**.
- **High beam:** ambil dari kabel lampu jauh atau indikatornya.

### Indikator turn signal mengikuti relay

Kalau turn signal memakai pin, dash tidak membuat kedipan sendiri. Indikator di
layar menyala saat ada tegangan di kabel dan mati saat tidak ada, jadi iramanya
sama dengan relay mobil.

Karena itu, kabel yang tegangannya tetap akan membuat indikator menyala terus.
Ini biasanya berarti sinyal diambil **sebelum** relay flasher, misalnya dari
saklar sein. Pindahkan ke kabel setelah relay.

Hazard terbaca saat turn signal kiri dan kanan menyala bersamaan.

### Kabel yang aktif ke ground

Pada sebagian mobil, kabel sinyal bernilai 12 V saat lampu mati dan terhubung ke
ground saat lampu menyala. Untuk kabel seperti ini, ubah sisi mobil:

- R1 disambungkan ke **12 V ACC**, bukan ke kabel sinyal.
- Pin 2 PC817 disambungkan ke **kabel sinyal**, bukan ke ground mobil.
- D1 tetap dipasang paralel dengan LED, gelang ke pin 1.

Pengaturan di DashTune tetap **Aktif saat: Ke ground**.

Kalau ragu, ukur kabelnya dengan multimeter saat lampu mati dan menyala.

## Tombol ganti tema

Tombol tekan di kabin bisa mengganti tema tanpa menyentuh layar. Setiap ditekan,
dash pindah ke tema berikutnya dan menampilkan namanya. Tema yang disembunyikan
dilewati, dan setelah tema terakhir urutannya kembali ke awal.

Pakai tombol **momentary**, yaitu tombol yang kembali sendiri saat dilepas.

```
  3V3 ──[R1 10 kΩ]──┬──[R2 1 kΩ]──┬──── GPIO 48
                    │             │
  Tombol ───────────┘          C1 100 nF
    │                             │
  GND dash ───────────────────────┘
```

| Komponen | Nilai | Fungsi |
| :---- | :---- | :---- |
| R1 | 10 kΩ | Menahan pin di 3,3 V saat tombol dilepas |
| R2 | 1 kΩ | Melindungi pin |
| C1 | 100 nF | Meredam noise dari kabel tombol |

> **Jangan sambungkan 12 V ke rangkaian ini.** Kalau tombolnya menghubungkan 12 V,
> pakai rangkaian optocoupler seperti pada turn signal.

### Pengaturan di DashTune

1. Buka **Input tambahan → Tombol ganti tema**, lalu pilih pin yang dipakai.
2. Set **Aktif saat: Ke ground**.
3. Tekan tombolnya. Status di DashTune harus berubah dari **Dilepas** ke **Ditekan**.

Kartu ini hanya muncul kalau firmware dash sudah mendukungnya. Tombol tidak bekerja
selama menu dash atau splash screen tampil. Tombol yang ditekan saat kunci kontak
dinyalakan baru terbaca setelah dilepas dan ditekan lagi.

## Fuel level

Fuel sender adalah resistor yang nilainya berubah mengikuti pelampung. Dash
membaca tegangannya, lalu mengubahnya menjadi persen dari hasil kalibrasi.
Rangkaiannya tergantung apakah sensor masih dipakai gauge bawaan.

### Sensor hanya untuk dash

Pakai rangkaian ini kalau gauge bawaan tidak dipakai lagi.

```
  3V3 ──[R1 470 Ω]──┬──[R2 4,7 kΩ]──┬──────────┬──── GPIO 20
                    │               │          │
  Kabel sensor ─────┘           C1 100 nF   D1 BAT54S ── ke 3V3 dan GND
  (fuel sender)                     │
                                   GND
  Body sensor ──── Ground mobil
```

| Komponen | Nilai | Fungsi |
| :---- | :---- | :---- |
| R1 | Lihat tabel di bawah; ¼ W atau SMD 1210 | Mengalirkan arus kecil ke sensor |
| R2 | 4,7 kΩ | Melindungi pin |
| C1 | 100 nF | Meredam noise dari kabel panjang |
| D1 | BAT54S, atau dua dioda BAT85/BAT43 | Menahan tegangan pin di antara GND dan 3V3 |

Tegangan di pin menurut perhitungan:

| Jenis sensor (kosong–penuh) | R1 yang disarankan | Saat kosong | Saat penuh |
| :---- | :---- | :---- | :---- |
| 240–33 Ω | 470 Ω | sekitar 1,12 V | sekitar 0,22 V |
| 110–3 Ω | 330 Ω | sekitar 0,83 V | sekitar 0,03 V |
| 0–90 Ω | 330 Ω | sekitar 0 V | sekitar 0,71 V |

Nilai pastinya tidak perlu dihitung, karena kalibrasi membaca tegangan yang
sebenarnya.

> **Ukuran R1:** kalau kabel sensor tidak sengaja terhubung ke 12–14,4 V, R1 bisa
> menerima daya sampai sekitar 260 mW. R1 ukuran SMD 0603 cukup untuk pemakaian
> normal, tetapi bisa putus saat korsleting seperti ini, dan fuel level akan
> terbaca salah. Pakai ukuran ¼ W atau SMD 1210 ke atas.

> **D1 jangan diganti zener 5 V.** Tegangan 5 V masih melebihi batas pin.

### Sensor juga dipakai gauge bawaan

Gauge bawaan sudah mengalirkan arus ke sensor. **Jangan pasang R1**, karena
bacaan gauge akan berubah. Ukur saja tegangan kabel sensor lewat pembagi tegangan
beresistansi tinggi.

```
  Kabel sensor ─[R1 22 kΩ]─┬──────────┬──────── GPIO 20
  (ke gauge                │          │
   bawaan juga)        [R2 10 kΩ]   D1 BAT54S ── ke 3V3 dan GND
                           │          │
                          GND     C1 100 nF
                                      │
                                     GND
```

Sebelum memasang, ukur tegangan kabel sensor dengan multimeter saat kunci kontak
ON. Pembagi ini aman sampai sekitar 10 V di kabel sensor, yaitu sekitar 3,1 V di
pin. Kalau tegangannya lebih tinggi, perbesar R1.

### Kalibrasi

1. Buka **Input tambahan → Fuel level**, lalu pilih pin yang dipakai.
2. Dengan tangki **kosong** atau di batas cadangan, tekan **Jadikan kosong**.
3. Dengan tangki **penuh**, tekan **Jadikan penuh**.

Tegangan kosong boleh lebih tinggi atau lebih rendah dari penuh. Kalau tegangan
sudah diketahui, ketuk nilai **Kosong** atau **Penuh** untuk mengisinya langsung.

Bacaan di dash dihaluskan beberapa detik, supaya goyangan bensin di tangki tidak
membuat angkanya naik-turun.

### Titik tambahan

Bacaan dari dua titik saja belum tentu akurat di tengah tangki, karena tegangan
sensor tidak berubah lurus dan bentuk tangki tidak selalu rata. Tambahkan sampai
6 titik di antara kosong dan penuh dengan **Tambah titik**.

1. Mulai dari tangki kosong, lalu isi dengan jumlah bensin yang diketahui,
   misalnya seperempat kapasitas tangki.
2. Pindahkan mobil ke tempat datar dan jauh dari pompa.
3. Dengan kunci kontak ON dan mesin mati, tunggu sampai tegangannya stabil.
4. Tekan **Tambah titik**, isi persen tangki, lalu simpan.
5. Ulangi untuk titik berikutnya.

> **Jangan menambah titik saat sedang mengisi bensin.** Selesaikan pengisian dan
> jauhi pompa dulu.

Tegangan harus berurutan dari kosong ke penuh. Kalau urutannya salah, DashTune
menampilkan peringatan, dan dash memakai garis lurus dari kosong ke penuh sampai
titiknya diperbaiki. Hal ini wajar kalau titik sudah diisi sebelum nilai penuh
diukur, dan peringatannya hilang setelah **Jadikan penuh**.

Kalau ECU sudah mengirim fuel level, biarkan pilihan pin di **Dari ECU**.

## Mengatasi masalah

| Gejala | Penyebab yang mungkin | Yang dicek |
| :---- | :---- | :---- |
| Indikator tidak pernah menyala | Salah pin, atau D1 terbalik | Pilihan pin di DashTune, arah gelang D1 |
| Indikator menyala saat lampu mati dan sebaliknya | **Aktif saat** tidak sesuai rangkaian | Set **Ke ground** untuk rangkaian optocoupler |
| Turn signal menyala terus | Sinyal diambil sebelum relay flasher | Pindahkan ke kabel setelah relay |
| Hazard tidak terbaca | Hanya satu sisi yang tersambung | Pasang rangkaian untuk kiri dan kanan |
| Tombol ganti tema tidak mengganti tema | Hanya ada satu tema yang tampil, atau **Aktif saat** salah | Daftar tema di DashTune, status **Ditekan** saat tombol ditekan |
| Fuel level terbalik | Kalibrasi kosong dan penuh tertukar | Ulangi **Jadikan kosong** dan **Jadikan penuh** |
| Fuel level selalu 0% atau 100% | Kabel sensor putus atau korsleting, atau R1 putus | Ukur tegangan di pin dan resistansi sensor |
| Muncul peringatan urutan titik | Tegangan titik tidak berurutan | Ukur ulang atau hapus titik yang salah |
