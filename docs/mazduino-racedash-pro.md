# Mazduino Racedash Pro

## Gambaran Umum

![Mazduino Racedash Pro M4](img/dash/racedash-pro-m4.jpeg)

*Racedash Pro M4 (4.3") — delapan LED shift light di atas layar, dengan
Template 1 dan sebuah CAN button "Start Engine"*

Mazduino Racedash Pro adalah varian dash display digital dengan layar berukuran lebih besar, tersedia dalam pilihan **4.3", 5", dan 7"**. Berbeda dengan varian [Mazduino Racedash](mazduino-racedash.md) (3.5" dan 4") yang dikonfigurasi melalui WiFi dan browser, Racedash Pro dapat diatur **langsung dari layar (touchscreen)** tanpa perlu terhubung ke HP/laptop. Tersedia juga aplikasi Android **DashTune** lewat Bluetooth untuk pengaturan yang tidak ada di menu layar.

| Varian | Ukuran Layar | Konektor |
| :---- | :---- | :---- |
| Racedash Pro 4.3" (M4) | 4.3 inch | DTM4 (Deutsch DTM 4 Pin) |
| Racedash Pro 5" (M5) | 5 inch | DTM4 (Deutsch DTM 4 Pin) |
| Racedash Pro 7" (M7) | 7 inch | DTM4 (Deutsch DTM 4 Pin) |

## Fitur Utama

- Layar sentuh (touchscreen) sehingga pengaturan dashboard bisa dilakukan langsung di layar, tanpa aplikasi atau koneksi WiFi tambahan
- Menampilkan RPM, gear indicator, kecepatan, dan data sensor lain secara real-time
- Mendukung komunikasi ke ECU melalui **CAN Bus** atau **Serial**, tergantung ECU yang digunakan. ECU berbasis **Speeduino** menggunakan mode Serial, sedangkan **rusEFI**, **Haltech**, dan **MaxxECU** menggunakan mode CAN Bus
- Kendaraan tanpa CAN bus bisa memakai protokol **M-Link** bersama [CAN IO Extender](can-io-extender.md#kendaraan-tanpa-can-bus-protokol-m-link), yang membaca sensor, saklar, dan RPM lalu mengirimnya ke dash

## Konektor DTM4 / 4 Pin

Racedash Pro menggunakan konektor **DTM4 (Deutsch DTM 4 Pin)** yang sama dengan varian [Racedash 4"](mazduino-racedash.md#racedash-4-cabus-konektor-dtm4), baik dari sisi bentuk fisik konektor maupun fungsi pin.

![Sisi konektor Racedash](img/dash/racedash-dtm4-connector-side.png)

*Dash connector side*

![Sisi konektor kabel](img/dash/racedash-dtm4-cable-connector.png)

*Cable connector side*

| No. Pin | Deskripsi |
| :---- | :---- |
| 1 | 12V Power Supply |
| 2 | Ground |
| 3 | CAN High / TX |
| 4 | CAN Low / RX |

**Catatan:**

- Pin 3 dan 4 berfungsi sebagai **CAN High/CAN Low** untuk ECU **rusEFI**, **Haltech**, dan **MaxxECU** (mode CAN Bus).
- Khusus untuk ECU **Speeduino**, pin 3 dan 4 berfungsi sebagai **TX/RX Serial**, karena Speeduino tidak memiliki CAN Bus native.

## Racedash Pro M4 / M5 / M7

Bagian ini membahas M4 (4.3"), M5 (5"), dan M7 (7"). Konektor dan
pemasangan kabelnya sama persis dengan yang dijelaskan di
[Konektor DTM4 / 4 Pin](#konektor-dtm4-4-pin) di atas.

![Mazduino Racedash Pro M7](img/dash/racedash-pro-m7.jpeg)

*Racedash Pro M7 (7") — tampak depan saat menyala, tampak depan, sisi belakang
beserta dudukannya, dan tampak samping*

![Sisi belakang Racedash Pro M7](img/dash/racedash-pro-m7-belakang.jpeg)

*Sisi belakang dengan konektor terpasang*

### ECU yang didukung

| ECU | Cara sambung | Catatan |
| :---- | :---- | :---- |
| rusEFI | CAN Bus 500 kbps | Paling lengkap datanya |
| Haltech | CAN Bus 1 Mbps | Satu-satunya yang mengirim data lampu sein, rem tangan, dan tekanan ban |
| MaxxECU | CAN Bus 500 kbps | |
| Speeduino | Serial | Speeduino tidak punya CAN, jadi pin 3 dan 4 dipakai sebagai TX/RX |
| OBD-II | CAN Bus (ISO 15765-4) | Untuk ECU standar bawaan mobil — [baca batasannya](#batasan-obd-ii) |

Tipe ECU dipilih dari aplikasi DashTune atau dari menu di layar, dan **tidak
perlu ganti firmware**. Kecepatan CAN mengikuti ECU yang dipilih secara
otomatis.

Selain rusEFI, Haltech, MaxxECU, Speeduino, dan OBD-II di tabel ini, Racedash
Pro juga mendukung **ECUMASTER EMU Black** dan **Link Generic Dash**. Apa yang
harus diaktifkan di masing-masing ECU dibahas di
[Konfigurasi ECU untuk Racedash](setting-ecu-racedash.md).

Data yang tampil di semua ECU: RPM, MAP, TPS, timing pengapian, duty injektor,
AFR/lambda, tekanan dan suhu (air, oli, bahan bakar, udara masuk), EGT 1–4,
gigi, kadar etanol, dan tegangan aki.

> **Catatan**: Lampu **sein**, **rem tangan**, dan **tekanan ban** hanya
> menyala kalau memakai **Haltech**, karena hanya Haltech yang mengirimkan
> datanya. Pada rusEFI dan MaxxECU ketiga lampu itu memang tidak akan menyala —
> bukan kerusakan.

#### Batasan OBD-II

> **Tidak semua mobil OBD-II dapat dibaca dash ini, dan kami tidak menjamin
> mobil Anda termasuk yang bisa.** Pastikan hal berikut sebelum membeli untuk
> keperluan OBD-II.

Yang didukung hanya **OBD-II di atas CAN Bus**, yaitu **ISO 15765-4** dengan
**identifier 11-bit**, pada kecepatan **500 kbps**.

Yang **tidak** didukung:

| Protokol | Keterangan |
| :---- | :---- |
| ISO 9141-2 | K-line, umum pada mobil lama |
| ISO 14230-4 (KWP2000) | K-line |
| SAE J1850 PWM / VPW | Umum pada mobil Amerika lama |
| ISO 15765-4 identifier 29-bit | Varian CAN yang dipakai sebagian kendaraan |

Secara umum, mobil produksi **2008 ke atas** di banyak pasar sudah memakai
OBD-II di atas CAN, tetapi ini bukan jaminan — tahun peralihan berbeda-beda
antar merek dan negara.

Meski protokolnya cocok, data yang muncul **bergantung pada apa yang direspons
mobil Anda**. Dash menanyakan dulu PID mana yang didukung, lalu hanya membaca
yang dijawab. PID yang dibaca: RPM, kecepatan, TPS, MAP, suhu coolant, suhu udara
masuk, tegangan, dan suhu oli. Banyak
mobil tidak menjawab sebagian di antaranya — suhu oli termasuk yang paling
sering tidak tersedia.

OBD-II juga lebih lambat dibanding protokol CAN khusus ECU standalone, karena
dash harus bertanya lalu menunggu jawaban untuk tiap nilai, bukan menerima
broadcast berkala.

### Mengganti tampilan (template)

Dash menyediakan beberapa tampilan dashboard. Untuk berpindah, **geser kiri
atau kanan di bagian atas layar** (di area bar RPM). Bagian bawah layar sengaja
tidak menerima geseran supaya tombol CAN tidak ikut tersentuh.

Tampilan terakhir yang dipakai akan diingat, jadi saat dinyalakan lagi dash
langsung membuka tampilan yang sama.

Beberapa contoh tampilan pada Racedash Pro M7:

<!-- A flex row rather than a table: a two-column table gives each cell a fixed
     share of the width and the images do not shrink to fit it, so the second
     column was being cut off. These wrap and scale instead. -->
<div style="display:flex;flex-wrap:wrap;gap:12px;margin:16px 0">
  <img src="../img/dash/racedash-pro-m7-template-1.jpeg" alt="Tampilan dashboard Racedash Pro" style="flex:1 1 280px;min-width:0;max-width:100%;height:auto;border-radius:6px">
  <img src="../img/dash/racedash-pro-m7-template-2.jpeg" alt="Tampilan dashboard Racedash Pro" style="flex:1 1 280px;min-width:0;max-width:100%;height:auto;border-radius:6px">
  <img src="../img/dash/racedash-pro-m7-template-3.jpeg" alt="Tampilan dashboard Racedash Pro" style="flex:1 1 280px;min-width:0;max-width:100%;height:auto;border-radius:6px">
  <img src="../img/dash/racedash-pro-m7-template-4.jpeg" alt="Tampilan dashboard Racedash Pro" style="flex:1 1 280px;min-width:0;max-width:100%;height:auto;border-radius:6px">
</div>

Warna gauge dan isi tiap panel dapat diubah, jadi tampilan di dash Anda bisa
berbeda dari contoh di atas.

### Menu di layar (M4 / M5 / M7)

#### Gerakan di layar

| Gerakan | Hasil |
| :---- | :---- |
| Geser kiri / kanan **di bar RPM (bagian atas layar)** | Ganti tampilan dashboard |
| Geser ke atas | Buka halaman tombol CAN |
| **Cubit dua jari** (pinch) | Buka menu utama |

Geseran hanya ditangkap di bagian atas layar. Bagian bawah sengaja dibiarkan
bebas supaya tombol CAN yang diletakkan di sana tidak ikut tersentuh saat
berpindah tampilan.

![Menu utama Racedash Pro M7](img/dash/racedash-pro-m7-menu.jpeg)

*Menu utama, dibuka dengan cubit dua jari*

![Halaman tombol CAN](img/dash/racedash-pro-m7-can-buttons.jpeg)

*Halaman tombol CAN, dibuka dengan geser ke atas*

#### Susunan menu

```
Menu
├── Dash      → kembali ke dashboard terakhir
├── CAN       → halaman tombol CAN
└── Setting
    ├── Display Setting   → pilih template, lalu atur isi tiap panelnya
    ├── General Setting   → satuan, RPM maksimum, rentang tiap data
    └── CAN
        ├── Protokol      → pilih tipe ECU
        └── CAN Button    → buat dan ubah tombol CAN
```

#### Display Setting — mengatur isi tiap template

**Menu → Setting → Display Setting**, lalu pilih template yang ingin diubah
(Template 1 sampai Template 5). Setiap kotak data pada template bisa diganti
isinya — misalnya dari tekanan oli menjadi suhu gearbox — dengan
tombol panah kiri/kanan.

Tekan **Save** untuk menyimpan, atau **Discard** untuk membatalkan. Pengaturan
tersimpan di dash dan tidak hilang saat mesin dimatikan.

> **Catatan untuk M7**: **Template 3** pada M7 sudah tetap isinya, jadi
> memilihnya di Display Setting akan langsung membuka tampilannya, bukan
> halaman pengaturan.

#### General Setting — satuan dan rentang data

**Menu → Setting → General Setting**:

- **Satuan tekanan** — kPa atau PSI
- **Satuan suhu** — °C atau °F
- **RPM maksimum** — skala penuh semua gauge RPM, diatur naik-turun 250 RPM;
  garis merah otomatis di sekitar 5/6 dari angka ini
- **Data Source** — daftar semua data source. Pilih salah satu untuk mengatur
  **nilai minimum dan maksimum**-nya, yang menentukan rentang gauge dan angka
  min/max yang tercetak di layar

Perubahan satuan dan RPM maksimum langsung terlihat di semua template.

#### CAN — tipe ECU dan tombol

**Menu → Setting → CAN** berisi dua hal:

- **Protokol** — memilih tipe ECU (rusEFI, Haltech, MaxxECU, Speeduino, OBD-II).
  Kecepatan CAN ikut menyesuaikan sendiri. **Tidak perlu ganti firmware dan
  tidak perlu restart** — begitu disimpan, dash langsung membaca dengan
  protokol yang baru.
- **CAN Button** — membuat dan mengubah tombol CAN: nama, ID, dan data yang
  dikirim. Tombol yang sudah dibuat muncul di halaman tombol CAN.

![Pengaturan protokol ECU di layar dash](img/dash/racedash-pro-m7-ecu-protocol.jpeg)

*Menu → Setting → CAN → Protokol*

#### Tombol CAN

Geser ke atas dari dashboard untuk membukanya. Halaman ini dipakai untuk
mengirim perintah ke ECU atau perangkat lain di jaringan CAN — misalnya
menyalakan kipas atau memicu launch control — cukup dengan menekan tombol di
layar. Tombolnya bisa diatur dari layar (Setting → CAN → CAN Button) maupun
dari aplikasi DashTune.

### Pengaturan lain yang hanya ada di DashTune

Beberapa pengaturan tidak tersedia di menu layar dan hanya bisa diubah dari
aplikasi:

- **Mode MAP** — *Absolute* (angka apa adanya, sekitar 101 kPa saat idle) atau
  *Boost* (dihitung dari tekanan udara luar, jadi saat vakum angkanya minus dan
  0 berarti belum ada boost)
- **Lama splash screen** saat dinyalakan
- **Modul GPS** — hanya untuk unit yang memang dipasangi modul GPS

> **Modul GPS bersifat opsional dan tidak termasuk dalam unit yang dijual.**
> Racedash Pro dikirim tanpa modul GPS, sehingga pengaturan ini tidak perlu
> dinyalakan pada unit standar. Modul GPS hanya dipasang atas permintaan khusus
> saat pemesanan. Tanpa modul tersebut, data kecepatan tetap dibaca dari ECU
> seperti biasa.

Pengaturan splash dan GPS baru berlaku setelah dash dimatikan dan dinyalakan
kembali.

### Lampu indikator

Lampu-lampu peringatan menyala otomatis:

| Lampu | Menyala saat |
| :---- | :---- |
| Check engine | ECU melaporkan ada kode kesalahan |
| Aki | Tegangan di luar 11,5–15,5 V |
| Suhu air | Di atas 105 °C |
| Suhu oli | Di atas 130 °C |
| Tekanan oli | Mesin hidup (di atas 800 RPM) tapi tekanan di bawah 100 kPa |
| Sein kiri/kanan, rem tangan, tekanan ban | Hanya pada Haltech |

Semua lampu ikut padam kalau sambungan ke ECU terputus, jadi tidak ada lampu
yang menyala terus setelah kunci kontak dimatikan.

Untuk ECU selain Haltech, lampu sein, rem tangan, lampu jauh, dan lampu kota
tetap bisa dinyalakan dari saklar kendaraan dengan menambahkan
[CAN IO Extender](can-io-extender.md).

---

## Panduan Aplikasi DashTune

DashTune adalah aplikasi Android untuk mengatur dash dari HP. Untuk Racedash
Pro M4/M5/M7, sambungannya lewat **Bluetooth** — tidak perlu WiFi dan tidak
perlu mencabut apa pun.

> **Mendapatkan aplikasinya:** buka **[www.mazduino.com](https://www.mazduino.com/)**
> dan cari bagian DashTune di halaman depan. Aplikasi ini masih dalam tahap uji
> tertutup, jadi aksesnya diberikan per akun — masukkan alamat email akun Google
> Play Anda di sana, dan undangan akan dikirim lewat email.

### Menyambungkan pertama kali

1. Nyalakan kunci kontak sampai dash menyala.
2. Buka DashTune, masuk ke tab **Perangkat**, tekan **Tambah Dash**.
3. Tekan **Pindai**. Dash akan muncul dengan sendirinya.
4. Pilih dash tersebut. Setelah tersambung, aplikasi langsung membuka halaman
   menu.

Kalau tidak ketemu: pastikan Bluetooth HP menyala, dash dalam keadaan hidup,
dan dash tidak sedang tersambung ke HP lain. Bisa juga memilih modelnya secara
manual di bagian **Model Dash** di layar yang sama.

Dash yang sudah pernah disambungkan akan diingat, dan aplikasi menyambung
sendiri saat dibuka berikutnya.

### Isi menu DashTune

| Menu | Fungsi |
| :---- | :---- |
| **CAN Buttons** | Membuat dan mengatur tombol CAN yang tampil di layar dash |
| **General Setting** | Satuan, mode MAP, RPM maksimum, rentang tiap data — sama dengan menu di layar dash |
| **Dashboard** | Mengatur tata letak panel dan data yang tampil pada tiap template |
| **Splash** | Membuat gambar pembuka sendiri (lihat di bawah) |
| **Info** | Versi firmware dan kondisi perangkat |
| **Update Firmware** | Memperbarui firmware dash |

### Membuat splash screen sendiri

Masuk ke menu **Splash**. Di sana bisa menambahkan gambar dari galeri,
menambah tulisan, menggeser dan memperbesar-kecilkan, lalu memilih warna latar.
Setelah selesai tekan kirim.

Karena gambar dikirim lewat WiFi, dash akan otomatis menyalakan WiFi-nya
sendiri sebentar, HP berpindah ke sana, gambar dikirim, lalu HP kembali ke
jaringan semula. Prosesnya berjalan sendiri — cukup **biarkan layar HP menyala
dan jangan tutup aplikasi** sampai selesai.

Tersedia juga pengaturan **lama tampil** splash, dan tombol untuk menghapusnya
kembali ke gambar bawaan.

#### Kalau kirim splash gagal atau splash hilang

Di Racedash Pro M4, M4.1, M5, M5.1, M5.2, dan M7 dengan firmware sebelum
6 November 2026, penyimpanan dash bisa macet setelah beberapa kali mengganti
splash, template, atau animasi. M7 Pro tidak terkena masalah ini. Gejalanya:

- Kirim splash gagal, misalnya muncul **"connection reset by peer"** atau
  **"Dash tidak bisa menyimpan file"**.
- Splash lama ikut hilang, sehingga dash menyala tanpa gambar pembuka.

Cara mengatasinya:

1. Update aplikasi DashTune ke versi **1.2.11** atau lebih baru.
2. Update firmware dash lewat menu **Update Firmware** ke versi
   **2026-11-06** atau lebih baru. Update firmware tetap bisa dilakukan
   walaupun kirim splash gagal.
3. Kirim splash lagi. Kiriman pertama setelah update bisa makan waktu sekitar
   satu menit lebih lama, karena dash merapikan penyimpanannya dulu. Biarkan
   layar HP menyala dan aplikasi terbuka sampai selesai.

Mulai firmware tersebut, splash lama tidak lagi terhapus kalau pengiriman
gagal. Kalau file memang terlalu besar, DashTune menampilkan **"Ruang di dash
tidak cukup"**; hapus tema atau animasi yang tidak dipakai, atau perpendek
splash, lalu coba lagi.

Kalau HP sudah masuk WiFi **Mazduino-Dash** tetapi muncul **"connection timed
out"** atau pesan bahwa dash tidak terjangkau, matikan dulu VPN atau aplikasi
pemblokir iklan di HP. Aplikasi seperti itu membelokkan koneksi sehingga tidak
sampai ke dash.

Kalau masih gagal, hubungi support@mazduino.com dengan menyebut model dash,
versi firmware (Setting > About), dan pesan error yang muncul.

### Update firmware

Masuk ke menu **Update Firmware**, aplikasi akan memeriksa versi terbaru dan
menampilkan versi yang terpasang sekarang. Kalau ada versi baru, tekan tombol
update.

> **Peringatan**: Jangan lakukan update sambil berkendara. Selama update layar
> dash akan mati beberapa saat lalu menyala kembali sendiri. Pastikan kendaraan
> dalam keadaan aman, listrik tidak terputus, dan aplikasi tidak ditutup sampai
> selesai. Update yang terputus di tengah jalan bisa membuat dash gagal menyala.

### Fitur relay: Google Maps dan musik

DashTune bisa meneruskan **petunjuk arah Google Maps** dan **judul lagu yang
sedang diputar** ke layar dash. Pengaturannya ada di tab **Lainnya → Relay**.

Fitur ini perlu izin akses notifikasi di HP, dan aplikasi akan mengarahkan ke
halaman pengaturannya saat pertama kali diaktifkan.

## Referensi

- Website Mazduino - [https://www.mazduino.com/](https://www.mazduino.com/)
- Wiki Mazduino - [https://wiki.mazduino.com/](https://wiki.mazduino.com/)
- Github Mazduino - [https://github.com/mazduino/mazduino](https://github.com/mazduino/mazduino)
