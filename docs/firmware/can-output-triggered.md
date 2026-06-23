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

Buka: **CAN Bus → CAN Output**

Untuk menggunakan mode Triggered:

1. Pilih **Trigger Pin** — pin digital yang memicu pengiriman
2. Pilih **Trigger Edge** — `Rising` (0→1) atau `Falling` (1→0)
3. Isi payload seperti pada [CAN Output periodik](can-output.md)

!!! note
    Mode Triggered dan Periodic dapat dikonfigurasi pada slot yang berbeda secara bersamaan.
