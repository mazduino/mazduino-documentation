# CAN IO Extender

## Gambaran Umum

CAN IO Extender menambah **input dan output** ke Racedash lewat bus CAN yang
sama dengan ECU. Modul ini membaca sensor dan saklar yang tidak diketahui ECU —
misalnya lampu sein, rem tangan, lampu jauh, sensor tekanan tambahan, atau
sensor kecepatan roda — lalu mem-broadcast-nya sebagai frame CAN yang bisa dibaca
dash. Sebaliknya, dash juga bisa menyalakan output modul ini untuk menggerakkan
relay, pompa, kipas, atau solenoid.

Modul bekerja mandiri: bitrate bus dideteksi sendiri, dan tidak ada yang perlu
diatur lewat aplikasi. Semua pemilihan fungsi pin dilakukan lewat **jumper** di
board.

| Kemampuan | Jumlah | Keterangan |
| :--- | :---: | :--- |
| Analog input | 11 | A0 dipakai untuk tegangan aki; A1–A2 punya pull-up 2k7 untuk sensor NTC |
| Switch input 12 V | 4 | SW1–SW4, berbagi pin dengan A3–A6 lewat jumper |
| Hall / frequency input | 4 | HALL1–HALL4, berbagi pin dengan A7–A10 lewat jumper |
| Low-side output | 5 + 2 | LC1–LC5 arus kecil, LS1–LS2 arus besar |
| High-side output | 2 | Mendukung PWM dan melaporkan fault |
| Logic output | 2 | Push-pull, 5 V atau 12 V lewat jumper |

Tujuh output tersedia sekaligus di konektor utama; dua lagi berbagi pin dengan
logic output lewat jumper J14/J15.

!!! warning "Periksa dulu sebelum memakai di bus Haltech"
    Board versi sekarang memakai crystal **8 MHz**, sehingga bitrate CAN
    maksimalnya **500 kbps**. Bus **Haltech berjalan di 1 Mbps**, jadi modul ini
    **tidak bisa bergabung ke bus Haltech** apa adanya. Bus rusEFI, MaxxECU,
    OBD-II (500 kbps), dan aRacer (250 kbps) tidak terpengaruh.

## Daya, CAN, dan Terminasi

| Pin konektor | Fungsi |
| :--- | :--- |
| J2-24 | 12 V dari kontak (switched) |
| J2-12 | Ground |
| J2-14 | CAN H |
| J2-13 | CAN L |

Tersedia juga header CAN + daya 4 pin terpisah (J12) sebagai alternatif.

**Terminasi:** jumper **J1** memasang resistor 120 Ω di board. Pasang **hanya
kalau modul ini berada di salah satu ujung bus**. Sebuah bus CAN perlu tepat dua
terminator, dan menambah yang ketiga akan membuat komunikasi gagal.

## Input

Setiap pin input bisa dipakai sebagai **analog atau digital**, dipilih lewat
jumper: hubungkan pin 2–1 untuk analog, pin 2–3 untuk digital.

| Pin konektor | Jumper | Analog | Digital |
| :--- | :--- | :--- | :--- |
| J2-9 | J8 | A3 | SW1 |
| J2-8 | J9 | A4 | SW2 |
| J2-7 | J10 | A5 | SW3 |
| J2-6 | J11 | A6 | SW4 |
| J2-5 | J3 | A7 | HALL1 |
| J2-4 | J4 | A8 | HALL2 |
| J2-3 | J5 | A9 | HALL3 |
| J2-2 | J6 | A10 | HALL4 |

J2-10 dan J2-11 hanya analog (A2 dan A1) dan sudah dilengkapi pull-up 2k7 —
inilah yang dibutuhkan sensor NTC seperti sensor suhu air atau suhu udara masuk.

**SW1–SW4 menerima 12 V langsung.** Gunakan untuk apa pun yang disaklar oleh
12 V kendaraan: lampu sein, lampu jauh, lampu rem, rem tangan.

**HALL1–HALL4** membaca logic 5 V, tahan terhadap 12 V, dan keempatnya juga
berfungsi sebagai **frequency counter** — cocok untuk sensor kecepatan roda atau
flow meter.

## Output

| Output | Pin konektor | Tipe | Keterangan |
| :--- | :--- | :--- | :--- |
| LC1 | J2-23 | Low-side, arus kecil | |
| LC2 | J2-22 | Low-side, arus kecil | |
| LC3 | J2-20 | Low-side, arus kecil | |
| LC4 | J2-19 | Low-side, arus kecil | Berbagi pin dengan LOGIC1 lewat J14 |
| LC5 | J2-17 | Low-side, arus kecil | Berbagi pin dengan LOGIC2 lewat J15 |
| LS1 | J2-15 | Low-side, arus besar | |
| LS2 | J2-16 | Low-side, arus besar | |
| HS1 | J2-21 | **High-side** | Mendukung PWM, melaporkan fault |
| HS2 | J2-18 | **High-side** | Mendukung PWM, melaporkan fault |

**Ini kesalahan wiring yang paling sering terjadi:** output **low-side**
menyaklar sisi **ground**, jadi ujung beban yang lain harus di 12 V. Output
**high-side** justru mengeluarkan 12 V, jadi ujung beban yang lain harus di
ground. Tertukar berarti beban tidak akan bekerja.

Hanya **HS1 dan HS2** yang menerima nilai PWM; output lain hanya on/off.

**Logic output** (LOGIC1 dan LOGIC2) adalah output sinyal, bukan driver coil.
Jumper **J13** menentukan tegangannya: pin 2–1 untuk 12 V, pin 2–3 untuk 5 V.

!!! danger "Output mati sendiri kalau perintah berhenti"
    Semua output dimatikan bila perintah dari dash tidak diterima selama
    **500 ms**, dan modul memang menyala dalam keadaan semua output mati. Jadi
    kalau dash mati atau kabel CAN lepas, pompa atau solenoid tidak akan terus
    menyala. Kondisi ini normal, bukan kerusakan.

## Memakai dengan Racedash Pro (M4, M5, M7)

Bisa langsung dipakai tanpa ganti firmware, **bersamaan dengan protokol ECU yang
sedang aktif**.

### Lampu indikator dari saklar kendaraan

Di DashTune, buka pengaturan indikator, pilih mode **CAN**, lalu isi:

| Lampu | CAN ID | Byte | Bit | Sambungkan ke |
| :--- | :--- | :---: | :---: | :--- |
| Turn left | `0x643` | 0 | 0 | J2-9 |
| Turn right | `0x643` | 0 | 1 | J2-8 |
| High beam | `0x643` | 0 | 2 | J2-7 |
| Hand brake | `0x643` | 0 | 3 | J2-6 |
| Head light | `0x643` | 0 | 4 | J2-5 |
| Park light | `0x643` | 0 | 5 | J2-4 |

Pastikan jumper pin tersebut diset ke posisi **digital**, dan biarkan pilihan
**invert dalam keadaan mati** — modul sudah melaporkan 1 = aktif, termasuk untuk
SW1–SW4 yang secara hardware aktif-rendah.

### Nilai sensor tambahan

Nilai seperti tegangan aki, sensor analog, atau frequency input bisa
ditampilkan lewat **Custom Channel** di DashTune. Custom Channel menumpang pada
protokol ECU yang sedang aktif, jadi data ECU tetap terbaca seperti biasa.

Gunakan daftar frame di [bagian berikutnya](#data-yang-dikirim-modul) sebagai
acuan CAN ID, posisi byte, dan skalanya.

## Memakai dengan Racedash 3.5" dan 4"

!!! warning "Tidak bisa bersamaan dengan protokol ECU"
    Pada varian ini, modul hanya terbaca kalau protokol dash diset ke
    **Custom**, dan mode Custom menggantikan decoder ECU bawaan. Artinya dash
    bisa membaca **modul ini atau ECU**, tidak keduanya sekaligus. Kalau Anda
    butuh dua-duanya, gunakan Racedash Pro.

Langkahnya: set protokol dash ke **Custom**, samakan bitrate dengan bus, lalu
susun channel-nya lewat DashTune. Semua nilai **little-endian**, jadi biarkan
pilihan **MSB first (Motorola) mati**.

Kalau Anda memakai Custom CAN map untuk keperluan lain, jangan memakai CAN ID
`0x640`–`0x67F` agar tidak bentrok dengan modul ini.

## Data yang Dikirim Modul

CAN ID di bawah berlaku untuk modul node 0. Semua nilai **little-endian**.

| CAN ID | Isi | Rate |
| :--- | :--- | :--- |
| `0x640` | Tegangan aki, lalu AV1, AV2, AV3 | 50 Hz |
| `0x641` | AV4, AV5, AV6, AV7 | 50 Hz |
| `0x642` | AV8, AV9, AV10 | 50 Hz |
| `0x643` | Status digital input, diagnosa, status output | 50 Hz |
| `0x644` | Frekuensi HALL1–HALL4 | 20 Hz |

**Frame analog** (`0x640`–`0x642`) berisi empat nilai `uint16` berurutan, dalam
**milivolt**. Tegangan aki sudah dikalikan faktor pembaginya, jadi angka `13800`
berarti 13,8 V. Untuk menampilkan sebagai volt, pakai scale `0.001`.

**Frame digital** (`0x643`):

| Byte | Isi |
| :---: | :--- |
| 0 | bit 0–3 = SW1–SW4, bit 4–7 = HALL1–HALL4 |
| 1 | bit 0–1 = fault high-side output |
| 2–3 | status output yang benar-benar aktif |
| 4 | bit 0 = failsafe aktif, bit 1 = bitrate sudah terkunci |
| 5–6 | uptime dalam detik |
| 7 | versi firmware dan nomor node |

**Frame frekuensi** (`0x644`) berisi empat nilai `uint16` dalam satuan 0,1 Hz —
kalikan `0.1` untuk mendapatkan Hz.

## Memakai Dua Modul

Satu bus bisa memuat sampai **empat** modul. Tiap modul harus memakai nomor node
berbeda, yang ditentukan saat firmware di-flash. Nomor node menggeser blok CAN
ID-nya:

| Node | Blok CAN ID |
| :---: | :--- |
| 0 | `0x640`–`0x64F` |
| 1 | `0x650`–`0x65F` |
| 2 | `0x660`–`0x66F` |
| 3 | `0x670`–`0x67F` |

## Troubleshooting

| Gejala | Penyebab yang paling sering |
| :--- | :--- |
| Modul tidak pernah mengunci bitrate | CAN H dan CAN L tertukar, terminasi kurang, atau tidak ada perangkat lain yang mengirim di bus — modul mengunci pada frame valid pertama, jadi bus yang sepi tidak akan pernah terkunci |
| Bus terkunci, tetapi dash tidak menampilkan apa-apa | CAN ID di dash tidak sama dengan blok node modul |
| Bus Haltech tidak pernah terkunci | Memang tidak didukung dengan crystal 8 MHz — lihat peringatan di awal halaman |
| Output tidak mau menyala | Dash belum mengirim perintah output, sehingga modul tetap dalam kondisi failsafe |
| Output 4 atau 5 tidak bekerja | Periksa jumper J14/J15 — pin itu sedang dipakai logic output |
| Tegangan aki terbaca meleset | Rail 5 V board tidak tepat 5,000 V; nilai acuannya perlu disesuaikan saat flash firmware |
| Switch input terbaca terbalik | Jumper masih di posisi analog; pindahkan ke posisi digital (pin 2–3) |
