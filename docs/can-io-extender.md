# CAN IO Extender

## Gambaran Umum

CAN IO Extender menambah **input dan output** ke Racedash lewat bus CAN yang
sama dengan ECU. Modul ini membaca sensor dan saklar yang tidak diketahui ECU —
misalnya lampu sein, rem tangan, lampu jauh, sensor tekanan tambahan, atau
sensor kecepatan roda — lalu mem-broadcast-nya sebagai frame CAN yang bisa dibaca
dash. Sebaliknya, dash juga bisa menyalakan output modul ini untuk menggerakkan
relay, pompa, kipas, atau solenoid.

Modul bekerja mandiri: bitrate bus dideteksi sendiri, dan tidak ada yang perlu
diatur lewat aplikasi. Fungsi tiap pin ditentukan saat pemasangan, sesuai
kebutuhan kendaraan.

| Kemampuan | Jumlah | Keterangan |
| :--- | :---: | :--- |
| Analog input | 11 | Satu dipakai untuk tegangan aki; dua di antaranya sudah ber-pull-up untuk sensor NTC |
| Switch input 12 V | 4 | Berbagi pin dengan sebagian analog input |
| Hall / frequency input | 4 | Berbagi pin dengan sebagian analog input |
| Low-side output | 5 + 2 | Lima arus kecil, dua arus besar |
| High-side output | 2 | Mendukung PWM dan melaporkan fault |
| Logic output | 2 | Output sinyal 5 V atau 12 V |

Tujuh output tersedia sekaligus di konektor utama; dua lagi berbagi pin dengan
logic output.

## Daya, CAN, dan Terminasi

| Pin konektor | Fungsi |
| :--- | :--- |
| J2-24 | 12 V dari kontak (switched) |
| J2-12 | Ground |
| J2-14 | CAN H |
| J2-13 | CAN L |

Tersedia juga header CAN + daya 4 pin terpisah (J12) sebagai alternatif.

**Terminasi:** modul menyediakan resistor 120 Ω yang bisa diaktifkan di board.
Aktifkan **hanya kalau modul ini berada di salah satu ujung bus**. Sebuah bus
CAN perlu tepat dua terminator, dan menambah yang ketiga akan membuat
komunikasi gagal.

## Input

Delapan pin input bisa dipilih fungsinya, dan dua pin lagi khusus analog.

| Pin konektor | Dapat difungsikan sebagai |
| :--- | :--- |
| J2-9 | Analog input (A3) **atau** switch input 12 V (SW1) |
| J2-8 | Analog input (A4) **atau** switch input 12 V (SW2) |
| J2-7 | Analog input (A5) **atau** switch input 12 V (SW3) |
| J2-6 | Analog input (A6) **atau** switch input 12 V (SW4) |
| J2-5 | Analog input (A7) **atau** Hall / frequency input (HALL1) |
| J2-4 | Analog input (A8) **atau** Hall / frequency input (HALL2) |
| J2-3 | Analog input (A9) **atau** Hall / frequency input (HALL3) |
| J2-2 | Analog input (A10) **atau** Hall / frequency input (HALL4) |
| J2-11 | Analog input (A1), sudah ber-pull-up untuk sensor NTC |
| J2-10 | Analog input (A2), sudah ber-pull-up untuk sensor NTC |

Pull-up pada J2-10 dan J2-11 adalah yang dibutuhkan sensor NTC, seperti sensor
suhu air atau suhu udara masuk. Sensor yang mengeluarkan tegangan 0–5 V sendiri
— misalnya sensor tekanan — dipasang di pin analog mana pun.

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
| LC4 | J2-19 | Low-side, arus kecil | Pin ini dipakai untuk LC4 **atau** LOGIC1 |
| LC5 | J2-17 | Low-side, arus kecil | Pin ini dipakai untuk LC5 **atau** LOGIC2 |
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
Tegangannya bisa dipilih **5 V atau 12 V** saat pemasangan. Keduanya memakai pin
yang sama dengan LC4 dan LC5, jadi pilih salah satu fungsi per pin.

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

Pastikan keenam pin itu difungsikan sebagai **switch input 12 V**, dan biarkan
pilihan **invert dalam keadaan mati** — modul sudah melaporkan 1 = aktif.

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
| Output tidak mau menyala | Dash belum mengirim perintah output, sehingga modul tetap dalam kondisi failsafe |
| LC4 atau LC5 tidak bekerja | Pin itu sedang difungsikan sebagai logic output — satu pin hanya bisa satu fungsi |
| Tegangan aki terbaca meleset | Rail 5 V board tidak tepat 5,000 V; nilai acuannya perlu disesuaikan saat flash firmware |
| Switch input tidak terbaca | Pin itu masih difungsikan sebagai analog input, bukan switch input |
