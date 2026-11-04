# Input Tambahan Dash R4

Kalau ECU Anda tidak mengirim data turn signal, head light, high beam, atau fuel
level, sinyalnya bisa diambil langsung dari mobil lewat pin cadangan Dash R4. Pin
ini juga bisa dipakai untuk tombol ganti tema. Halaman ini membahas pilihan pin,
pengaturan di DashTune, dan kalibrasi fuel level.

Semua pengaturan ada di DashTune, menu **Input tambahan**. Pilihan di menu ini
tersimpan di dash dan tetap ada setelah kunci kontak dimatikan.

> **Penting:** semua pin bekerja di **3,3 V**, sedangkan listrik mobil 12–14,4 V
> dan bisa melonjak lebih tinggi saat starter atau alternator bekerja. **Jangan
> menyambungkan kabel mobil langsung ke pin.** Pin yang terkena 12 V akan rusak
> permanen. Untuk rangkaian pemasangannya, hubungi
> [support@mazduino.com](mailto:support@mazduino.com).

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

### Pengaturan di DashTune

1. Buka **Input tambahan**, lalu pilih kartu fungsinya.
2. Pilih pin yang dipakai.
3. Set **Aktif saat** sesuai pemasangan: **Ke ground** kalau pin terhubung ke
   ground saat lampu menyala, **Ada tegangan** kalau pin menerima 3,3 V saat lampu
   menyala.

### Dari mana sinyalnya diambil

- **Turn signal:** ambil dari kabel lampu turn signal **setelah relay flasher**,
  satu untuk kiri dan satu untuk kanan. Kabel indikator di panel instrumen bawaan
  juga bisa dipakai.
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

## Tombol ganti tema

Tombol tekan di kabin bisa mengganti tema tanpa menyentuh layar. Setiap ditekan,
dash pindah ke tema berikutnya dan menampilkan namanya. Tema yang disembunyikan
dilewati, dan setelah tema terakhir urutannya kembali ke awal.

Pakai tombol **momentary**, yaitu tombol yang kembali sendiri saat dilepas.

### Pengaturan di DashTune

1. Buka **Input tambahan → Tombol ganti tema**, lalu pilih pin yang dipakai.
2. Set **Aktif saat** sesuai pemasangan.
3. Tekan tombolnya. Status di DashTune harus berubah dari **Dilepas** ke **Ditekan**.

Kartu ini hanya muncul kalau firmware dash sudah mendukungnya. Tombol tidak bekerja
selama menu dash atau splash screen tampil. Tombol yang ditekan saat kunci kontak
dinyalakan baru terbaca setelah dilepas dan ditekan lagi.

## Fuel level

Fuel sender adalah resistor yang nilainya berubah mengikuti pelampung. Dash
membaca tegangannya, lalu mengubahnya menjadi persen dari hasil kalibrasi.

Saat menghubungi support untuk rangkaiannya, sebutkan apakah sensor masih dipakai
gauge bawaan, karena pemasangannya berbeda.

Kalau ECU sudah mengirim fuel level, biarkan pilihan pin di **Dari ECU**.

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

## Mengatasi masalah

| Gejala | Penyebab yang mungkin | Yang dicek |
| :---- | :---- | :---- |
| Indikator tidak pernah menyala | Salah pin, atau sinyal tidak sampai ke pin | Pilihan pin di DashTune, sambungan kabel |
| Indikator menyala saat lampu mati dan sebaliknya | **Aktif saat** tidak sesuai pemasangan | Ganti pilihan **Aktif saat** |
| Turn signal menyala terus | Sinyal diambil sebelum relay flasher | Pindahkan ke kabel setelah relay |
| Hazard tidak terbaca | Hanya satu sisi yang tersambung | Sambungkan kiri dan kanan |
| Tombol ganti tema tidak mengganti tema | Hanya ada satu tema yang tampil, atau **Aktif saat** salah | Daftar tema di DashTune, status **Ditekan** saat tombol ditekan |
| Fuel level terbalik | Kalibrasi kosong dan penuh tertukar | Ulangi **Jadikan kosong** dan **Jadikan penuh** |
| Fuel level selalu 0% atau 100% | Kabel sensor putus atau korsleting | Sambungan kabel dan sensor |
| Muncul peringatan urutan titik | Tegangan titik tidak berurutan | Ukur ulang atau hapus titik yang salah |
