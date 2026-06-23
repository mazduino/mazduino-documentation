# CAN Virtual Input (Digital)

CAN Virtual Input memungkinkan satu bit dalam frame CAN digunakan sebagai **pin digital (saklar)** di ECU — seperti saklar fisik yang terhubung ke konektor ECU.

Berguna untuk menerima sinyal on/off dari perangkat CAN, misalnya: tombol pada setir, sinyal dari gearbox controller, atau konfirmasi dari modul eksternal.

---

## Cara Kerja

ECU membaca bit tertentu dari frame CAN yang diterima dan memperlakukannya sebagai pin digital. Tersedia **8 pin virtual** (`CAN_INPUT_0` s/d `CAN_INPUT_7`) yang dapat digunakan di mana pun input digital diperlukan — clutch switch, launch enable, AC request, dll.

---

## Konfigurasi di TunerStudio

Buka: **CAN Bus → CAN Input → CAN Virtual Input**

Tersedia **8 slot**. Untuk setiap slot:

| Parameter | Keterangan |
|---|---|
| **CAN ID** | ID frame CAN dari perangkat sumber |
| **Byte Offset** | Posisi byte dalam payload CAN (0–7) |
| **Bit Position** | Posisi bit dalam byte tersebut (0–7) |
| **Active Low** | Centang jika logika terbalik (0 = aktif) |

Setelah dikonfigurasi, pin `CAN_INPUT_0` s/d `CAN_INPUT_7` akan muncul di dropdown pilihan pin untuk input digital (clutch, launch, AC, dll.).

---

## Contoh: Tombol Launch Control via CAN

Tombol launch pada setir mengirim byte status di CAN ID `0x101`, byte 0, bit 3:

```
CAN ID       = 0x101
Byte Offset  = 0
Bit Position = 3
Active Low   = No
```

Lalu di konfigurasi Launch Control, pilih `CAN_INPUT_0` sebagai pin enable.
