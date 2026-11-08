# CAN Output (Triggered)

Halaman ini merupakan bagian dari [CAN Output](can-output.md).

Triggered CAN Output mengirim frame CAN hanya saat ada **edge (perubahan) pada pin digital** tertentu, bukan secara berkala.

---

## Kegunaan

- Konfirmasi aksi (misalnya: kirim frame saat ignition cut aktif)
- Sinyal event berbasis kondisi pin
- Efisien untuk data yang tidak perlu dikirim terus-menerus

---

## Konfigurasi

Buka: **CAN-bus → Triggered CAN Outputs → Triggered CAN Output 1** sampai **8**.

Untuk menggunakan mode Triggered:

1. Isi **CAN ID**, **CAN Bus**, **Byte order**, dan **DLC**.
2. Pilih **Trigger input**, yaitu pin digital yang memicu pengiriman, lalu **Trigger input mode** sesuai wiring.
3. Pilih **Trigger edge**: `Rising edge` (0→1), `Falling edge` (1→0), atau `Both edges`.
4. Isi payload seperti pada [CAN Output periodik](can-output.md).

---

## Menguji Frame

Setiap slot punya tombol **Send frame 1** sampai **Send frame 8**. Tombol ini langsung mengirim frame yang sudah dikonfigurasi, tanpa menunggu perubahan pin, sehingga isi frame bisa dicek di perangkat penerima atau di CAN analyzer.

!!! note
    Tombol Send frame membutuhkan firmware Nightly 2026-11-04 atau yang lebih baru. Pada firmware sebelumnya tombol ini tidak melakukan apa-apa.

!!! note
    Mode Triggered dan Periodic dapat dikonfigurasi pada slot yang berbeda secara bersamaan.
