# Setting ECU agar Terbaca Racedash

Halaman ini membahas sisi **ECU**-nya: apa yang harus diaktifkan di ECU supaya
datanya sampai ke dash. Untuk pengaturan dash-nya sendiri, lihat
[Racedash 3.5" & 4"](mazduino-racedash.md) atau
[Racedash Pro](mazduino-racedash-pro.md).

## Tiga hal yang menentukan berhasil atau tidak

**1. Dash hanya mendengarkan.** Racedash tidak mengirim apa pun ke bus CAN —
ia menunggu ECU menyiarkan datanya. Jadi kalau di ECU tidak ada broadcast/dash
stream yang diaktifkan, dash tidak akan menampilkan apa-apa meskipun kabelnya
benar. Satu-satunya pengecualian adalah OBD-II, yang memang harus bertanya
lebih dulu.

**2. Kecepatan CAN ditentukan oleh tipe ECU yang dipilih, bukan oleh Anda.**
Begitu tipe ECU dipilih, dash otomatis memakai kecepatan protokol itu dan
kecepatan tersebut tidak bisa diubah sendiri. Kalau ECU Anda diatur di
kecepatan yang berbeda, **dash tidak menerima satu frame pun** — layarnya
kosong, bukan salah nilai. Satu-satunya pengecualian adalah mode **Custom**
pada Racedash 3.5"/4", di mana kecepatannya memang Anda yang pilih.

**3. Tipe ECU di dash harus cocok dengan yang dikirim ECU.** Frame Haltech
yang dibaca dengan profil rusEFI tidak akan menghasilkan data yang benar.

## Ringkasan per ECU

| ECU | Racedash 3.5" & 4" | Racedash Pro M4/M5/M7 | Kecepatan | ID frame |
| :--- | :---: | :---: | :--- | :--- |
| rusEFI | Ya | Ya | 500 kbps | `0x200`–`0x209` |
| Haltech | Ya | Ya | **1 Mbps** | `0x360`–`0x3E4` |
| MaxxECU | Ya | Ya | 500 kbps | `0x500`–`0x5FF` |
| aRacer | Ya | — | **250 kbps** | `0x2D0`–`0x2D3` |
| ECUMASTER EMU Black | — | Ya | **1 Mbps** | `0x600`–`0x607` |
| Link G4+/G4X/G5 | — | Ya (eksperimental) | **1 Mbps** | `0x3E8` |
| OBD-II (ECU standar) | Firmware generik saja | Ya | 500 kbps | `0x7DF` / `0x7E8` |
| Speeduino | Ya | Ya | Serial 115200 | — |

Pada **Racedash Pro**, tipe ECU dipilih dari DashTune atau menu di layar tanpa
ganti firmware. Pada **Racedash 3.5"/4"**, tipe ECU melekat pada firmware yang
terpasang — menggantinya berarti mem-flash image protokol lain, yang bisa
dilakukan lewat DashTune.

---

## rusEFI

- **Kecepatan CAN:** 500 kbps
- **Yang harus aktif di ECU:** CAN bus menyala, dan **broadcast (verbose) CAN**
  diaktifkan dengan **base address `0x200`** (512 desimal) — itu nilai bawaan
  rusEFI
- **Frame yang dibaca dash:** `0x200` sampai `0x209`

Di TunerStudio, pengaturannya ada di bagian CAN bus. Nama menunya berbeda-beda
antar versi rusEFI, tetapi yang harus benar selalu sama: CAN aktif, baud 500
kbps, broadcast/verbose menyala, base address `0x200`.

Racedash 3.5"/4" juga membaca frame bench test rusEFI, sehingga fitur bench
test di dash hanya tersedia pada ECU rusEFI.

## Haltech

- **Kecepatan CAN:** **1 Mbps** — ini yang paling sering terlewat
- **Yang harus aktif di ECU:** broadcast standar Haltech (Haltech Broadcast
  Protocol). Pada Elite/Nexus ini menyala secara bawaan
- **Frame yang dibaca dash:** `0x360`–`0x373` dan `0x3E0`–`0x3E4`

Haltech adalah satu-satunya protokol yang mengirim data **lampu sein, rem
tangan, dan tekanan ban**, jadi hanya di Haltech ketiga indikator itu bisa
menyala. Pada ECU lain ketiganya memang tidak akan aktif — bukan kerusakan.

## MaxxECU

- **Kecepatan CAN:** 500 kbps
- **Yang harus aktif di ECU:** protokol CAN bawaan MaxxECU (MaxxECU default /
  CAN dash output)
- **Frame yang dibaca dash:** seluruh rentang `0x500`–`0x5FF`

Kalau ECU Anda memakai User Channel untuk sensor tambahan, kanalnya bisa
ditampilkan lewat Custom Channel — lihat [bagian Custom](#ecu-yang-tidak-ada-di-daftar).

## aRacer

**Hanya untuk Racedash 3.5" dan 4".** Racedash Pro tidak punya profil aRacer.

- **Kecepatan CAN:** **250 kbps**
- **Frame yang dibaca dash:** `0x2D0`–`0x2D3`

aRacer hanya mengirim kecepatan roda per gardan, sehingga kanal roda kanan
depan dan kanan belakang memang tidak terisi.

## ECUMASTER EMU Black

**Hanya untuk Racedash Pro.**

- **Kecepatan CAN:** **1 Mbps** — nilai bawaan EMU Black
- **Yang harus aktif di ECU:** "EMU stream" dengan **base ID `0x600`** (bawaan
  software EMU)
- **Frame yang dibaca dash:** `0x600`–`0x607`

EMU Black bisa diatur ke 500 kbps, tetapi dash membaca profil ini **hanya pada
1 Mbps**. Kalau ECU Anda terlanjur diatur 500 kbps, kembalikan ke 1 Mbps.

## Link G4+ / G4X / G5

**Hanya untuk Racedash Pro, dan statusnya masih eksperimental.** Susunan
byte-nya disusun dari sumber publik, belum diverifikasi terhadap ECU Link
asli, jadi sebagian nilai bisa saja tidak tepat.

- **Kecepatan CAN:** **1 Mbps**
- **Yang harus aktif di ECU:** stream **Generic Dash** di PCLink, dan
  transmisinya harus dinyalakan sendiri — tidak aktif secara bawaan
- **Frame yang dibaca dash:** semuanya di satu ID, `0x3E8` (1000 desimal),
  dengan nomor frame di dua byte pertama

## OBD-II (ECU standar bawaan mobil)

Tidak ada yang perlu diatur di mobil — dash yang bertanya. Yang perlu
dipastikan justru mobilnya memang mendukung: hanya **OBD-II di atas CAN
(ISO 15765-4, identifier 11-bit, 500 kbps)** yang bisa dibaca, dan data yang
muncul bergantung pada PID yang dijawab mobil Anda.

Baca [batasan OBD-II](mazduino-racedash-pro.md#batasan-obd-ii) sebelum
mengandalkan mode ini.

Pada Racedash 3.5"/4", OBD-II hanya ada di firmware generik, tidak pada
firmware yang terkunci ke satu ECU.

## Speeduino

Speeduino tidak punya CAN, jadi sambungannya lewat **serial**: pin TX/RX dash
ke secondary serial Speeduino, dengan ground yang sama.

- **Kecepatan:** 115200 baud
- **Yang harus aktif di ECU:** **Secondary Serial** dinyalakan
- **Protokol secondary serial:** **`Generic (Fixed List)`**

Pilihan protokol itu yang paling sering salah, dan salahnya sulit dikenali:

> Kalau dipilih **`Generic (ini File)`**, sambungannya tetap "jalan" — panjang
> datanya benar, tidak ada error, tetapi **semua nilainya salah** karena
> urutan byte-nya berbeda.

Catatan versi firmware Speeduino:

| Rilis Speeduino | Keterangan |
| :--- | :--- |
| 202402 ke atas | Ada pilihan protokol — pilih **Generic (Fixed List)** |
| 202310 | Selalu mengirim urutan ini File, **tidak bisa dipakai** dengan dash ini |
| 202305 ke bawah | Selalu mengirim fixed list, langsung cocok |

Pada Racedash Pro, memilih Speeduino otomatis mematikan modul GPS karena
keduanya memakai UART yang sama.

---

## ECU yang tidak ada di daftar

Kalau ECU Anda menyiarkan data lewat CAN tetapi protokolnya tidak ada di
daftar di atas, datanya masih bisa ditampilkan dengan memetakan sendiri CAN ID,
posisi byte, dan skalanya:

- **Racedash 3.5"/4"** — pilih protokol **Custom**, lalu susun petanya lewat
  DashTune. Hanya pada mode inilah kecepatan CAN bisa Anda pilih sendiri
  (125 kbps, 250 kbps, 500 kbps, atau 1 Mbps)
- **Racedash Pro** — pakai **Custom Channel** di DashTune. Kanal custom di sini
  menumpang pada protokol yang sedang aktif, jadi kecepatannya tetap mengikuti
  protokol tersebut

Cara ini juga berguna untuk kanal tambahan pada ECU yang sudah didukung,
misalnya User Channel MaxxECU atau output CAN cadangan rusEFI.

## Kalau dash tidak menampilkan data

| Gejala | Penyebab yang paling sering |
| :--- | :--- |
| Sama sekali tidak ada data | Kecepatan CAN tidak cocok, CANH/CANL tertukar, atau broadcast di ECU belum diaktifkan |
| Sama sekali tidak ada data, kecepatan sudah benar | Terminasi bus: sebuah bus CAN perlu tepat **dua** resistor 120 Ω |
| Sebagian kanal kosong terus | Memang tidak dikirim ECU itu. Setiap ECU punya kumpulan kanal berbeda |
| Data muncul tetapi nilainya aneh | Tipe ECU di dash tidak cocok dengan ECU sebenarnya. Pada Speeduino, hampir selalu karena protokol secondary serial-nya `Generic (ini File)` |
| Data sempat muncul lalu hilang | Kabel/ground, atau ECU berhenti broadcast |

Pastikan juga **ground dash dan ground ECU tersambung**. CAN memerlukan acuan
tegangan yang sama di kedua ujungnya.
