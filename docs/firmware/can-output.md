# CAN Output

CAN Output memungkinkan ECU mengirimkan data engine ke bus CAN secara otomatis — untuk dashboard, datalogger, atau perangkat lain yang terhubung.

---

## Jenis CAN Output

### Periodic (Berkala)
Frame CAN dikirim secara otomatis pada interval waktu yang ditentukan.
Cocok untuk dashboard yang membutuhkan update data terus-menerus.

### Triggered (Berdasarkan Trigger)
Frame CAN dikirim hanya ketika ada perubahan edge (rising/falling) pada pin digital tertentu.
Cocok untuk sinyal event atau konfirmasi aksi.

---

## Konfigurasi di TunerStudio

Buka: **CAN Bus → CAN Output**

Tersedia **8 slot output**. Untuk setiap slot:

| Parameter | Keterangan |
|---|---|
| **CAN ID** | ID frame CAN yang akan dikirim |
| **Period** | Interval pengiriman dalam ms (mode Periodic) |
| **Trigger Pin** | Pin digital pemicu (mode Triggered) |
| **Trigger Edge** | Rising atau Falling edge |

### Isi Payload (per Byte)

Setiap frame CAN berisi 8 byte. Untuk setiap byte dapat dipilih:

| Parameter | Keterangan |
|---|---|
| **Output Channel** | Data ECU yang dikirim: RPM, MAP, TPS, CLT, IAT, dll. |
| **Scale** | Pengali untuk mengubah satuan |
| **Offset** | Nilai tambahan |
| **Data Type** | 8-bit atau 16-bit |
| **Byte Order** | Big Endian atau Little Endian |

!!! tip
    Pilih channel yang dibutuhkan oleh dashboard atau perangkat penerima.
    Sesuaikan Scale agar satuan data cocok dengan yang diharapkan perangkat tersebut.

---

## Contoh: Kirim RPM dan CLT ke Dashboard

Frame CAN ID `0x600`, dikirim setiap 50 ms:

```
CAN ID  = 0x600
Period  = 50 ms

Byte 0–1: RPM        (16-bit, scale=1)
Byte 2:   CLT        (8-bit, offset=-40, scale=1)
Byte 3:   TPS        (8-bit, scale=2.55)  → 0–100% menjadi 0–255
```
