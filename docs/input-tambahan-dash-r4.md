# Input Tambahan Dash R4

Kalau ECU Anda tidak mengirim data turn signal, head light, atau fuel level,
sinyalnya bisa diambil langsung dari mobil lewat pin cadangan Dash R4. GPIO 46
juga bisa dipakai untuk tombol ganti tema, sebagai pengganti head light. Halaman
ini membahas pilihan pin, pengaturan di DashTune, dan kalibrasi fuel level.

Semua pengaturan ada di DashTune, menu **Input tambahan**. Pilihan di menu ini
tersimpan di dash dan tetap ada setelah kunci kontak dimatikan.

> **Penting:** semua pin bekerja di **3,3 V**, sedangkan listrik mobil 12–14,4 V
> dan bisa melonjak lebih tinggi saat starter atau alternator bekerja. Sinyal 12 V
> harus lewat proteksi optocoupler sebelum sampai ke pin. **Jangan menyambungkan
> kabel mobil langsung ke pin.** Pin yang terkena 12 V akan rusak permanen. Untuk
> rangkaian pemasangannya, hubungi
> [support@mazduino.com](mailto:support@mazduino.com).

## Pin yang dipakai

| Fungsi | Pin yang disarankan | Jenis input |
| :---- | :---- | :---- |
| Turn signal kiri | GPIO 32 | Digital |
| Turn signal kanan | GPIO 33 | Digital |
| Head light | GPIO 46 | Digital |
| Fuel level | GPIO 20 | Analog |

Ketiga input digital menerima sinyal 12 V lewat proteksi optocoupler dan aktif ke
ground: pin tersambung ke ground saat sinyal 12 V ada. Karena itu **Aktif saat**
untuk ketiganya selalu **Ke ground**.

GPIO 46 bersifat opsional. Pin ini bisa dipakai untuk head light atau tombol ganti
tema, tetapi tidak keduanya. Kalau dipakai untuk tombol, data head light dibaca
dari ECU.

Fuel level juga bisa memakai GPIO 23. Hanya GPIO 20 dan GPIO 23 yang bisa membaca
tegangan.

DashTune juga menyediakan pilihan high beam dan pin digital GPIO 2, 26, 27, 47,
dan 48, tetapi pin ini tidak termasuk konfigurasi di atas. Pin tambahan butuh
proteksi sendiri, jadi hubungi support sebelum memakainya.

Kalau sebuah fungsi sudah diberi pin, dash membaca dari pin itu, bukan dari ECU.

## Turn signal dan head light

### Pengaturan di DashTune

1. Buka **Input tambahan**, lalu pilih kartu fungsinya. Head light ada di kartu
   **Lampu**.
2. Pilih pin yang dipakai.
3. Set **Aktif saat** ke **Ke ground**, walaupun kabel mobilnya membawa 12 V.

### Dari mana sinyalnya diambil

- **Turn signal:** ambil dari kabel lampu turn signal **setelah relay flasher**,
  satu untuk kiri dan satu untuk kanan. Kabel indikator di panel instrumen bawaan
  juga bisa dipakai.
- **Head light:** ambil dari kabel yang menyala saat lampu dihidupkan. Sinyal
  ini juga dipakai oleh **Redupkan layar saat lampu menyala**.

### Indikator turn signal mengikuti relay

Kalau turn signal memakai pin, dash tidak membuat kedipan sendiri. Indikator di
layar menyala saat ada tegangan di kabel dan mati saat tidak ada, jadi iramanya
sama dengan relay mobil.

Karena itu, kabel yang tegangannya tetap akan membuat indikator menyala terus.
Ini biasanya berarti sinyal diambil **sebelum** relay flasher, misalnya dari
saklar sein. Pindahkan ke kabel setelah relay.

Hazard terbaca saat turn signal kiri dan kanan menyala bersamaan.

### Tema yang menampilkan turn signal

Tidak semua tema punya indikator turn signal. Yang punya: **Street**, **Car Status**,
**Classic Beetle**, **Vintage Speedo**, **Vintage Tach**, dan **Vintage Trio**. Di tema
lain, pin yang sudah benar tetap tidak terlihat di layar.

### Memeriksa sinyal di pin

Dengan **Aktif saat: Ke ground**, status di DashTune dan tegangan di pin artinya
seperti ini:

| Tegangan di pin | Status di DashTune | Artinya |
| :---- | :---- | :---- |
| 3,3 V, lampu mobil mati | Mati | Normal |
| 3,3 V, lampu mobil menyala | Mati | Sinyal tidak sampai ke pin. Cek kabel dan titik pengambilan sinyal |
| 0 V | Menyala | Dash sudah membaca dengan benar. Kalau layar kosong, ganti ke tema yang punya indikatornya |
| 0 V | Mati | Pin yang dipilih salah, atau **Aktif saat** masih di **Ada tegangan** |

Di DashTune, tegangan hanya tampil untuk fuel level. Tegangan pin digital diukur
dengan multimeter.

## Tombol ganti tema

Tombol tekan di kabin bisa mengganti tema tanpa menyentuh layar. Setiap ditekan,
dash pindah ke tema berikutnya dan menampilkan namanya. Tema yang disembunyikan
dilewati, dan setelah tema terakhir urutannya kembali ke awal.

Pakai tombol **momentary**, yaitu tombol yang kembali sendiri saat dilepas. Input
GPIO 46 menerima sinyal 12 V, jadi tombol harus mengirim 12 V saat ditekan. Tombol
yang hanya menyambung ke ground tidak akan terbaca.

### Pengaturan di DashTune

1. Buka **Input tambahan → Lampu**, lalu ubah pin ke **Tidak dipakai**. GPIO 46 tidak
   bisa dipilih untuk tombol selama masih dipakai lampu.
2. Buka **Tombol ganti tema**, lalu pilih GPIO 46.
3. Set **Aktif saat** ke **Ke ground**.
4. Tekan tombolnya. Status di DashTune harus berubah dari **Dilepas** ke **Ditekan**.

Minimal dua tema harus terpasang dan tidak disembunyikan. Kalau hanya ada satu,
status tetap berubah ke **Ditekan**, tetapi temanya tidak berganti.

Kartu ini butuh DashTune 1.2.10 atau lebih baru dan firmware terbaru dash. Tombol
yang disambung ke **Lampu** hanya terbaca sebagai lampu dan tidak mengganti tema.

Tombol tidak bekerja selama menu dash atau splash screen tampil. Tombol yang ditekan saat kunci kontak
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
| Indikator tidak pernah menyala | Salah pin, sinyal tidak sampai ke pin, atau **Aktif saat** di **Ada tegangan** | Pilihan pin di DashTune, sambungan kabel, set **Ke ground** |
| Status **Menyala**, tetapi indikator tidak tampil | Tema aktif tidak punya indikator turn signal | Ganti ke tema di [daftar di atas](#tema-yang-menampilkan-turn-signal) |
| Turn signal menyala terus | Sinyal diambil sebelum relay flasher | Pindahkan ke kabel setelah relay |
| Hazard tidak terbaca | Hanya satu sisi yang tersambung | Sambungkan kiri dan kanan |
| Kartu **Tombol ganti tema** tidak muncul | DashTune atau firmware dash belum mendukungnya | Perbarui DashTune ke 1.2.10 atau lebih baru, dan perbarui firmware dash |
| GPIO 46 tidak bisa dipilih untuk tombol | Pin masih dipakai **Lampu** | Ubah **Lampu** ke **Tidak dipakai** |
| Status tetap **Dilepas** saat tombol ditekan | **Aktif saat** di **Ada tegangan**, atau tombol tidak mengirim 12 V | Set **Ke ground**, cek sambungan tombol |
| Status **Ditekan** muncul, tetapi tema tidak berganti | Hanya satu tema yang tampil, atau menu dash sedang terbuka | Daftar tema di DashTune, tutup menu dash |
| Fuel level terbalik | Kalibrasi kosong dan penuh tertukar | Ulangi **Jadikan kosong** dan **Jadikan penuh** |
| Fuel level selalu 0% atau 100% | Kabel sensor putus atau korsleting | Sambungan kabel dan sensor |
| Muncul peringatan urutan titik | Tegangan titik tidak berurutan | Ukur ulang atau hapus titik yang salah |
