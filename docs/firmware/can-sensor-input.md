# CAN Sensor Input

CAN Sensor Input memungkinkan ECU membaca nilai sensor dari perangkat di bus CAN dan menggunakannya seolah sensor tersebut terpasang langsung ke ECU.

Cocok untuk menghubungkan modul sensor eksternal, perangkat CAN, atau dashboard yang mengirim balik data sensor.

---

## Cara Kerja

Perangkat eksternal mengirim frame CAN. ECU menangkap frame tersebut dan langsung menerapkan nilainya ke sensor internal yang dipilih (MAP, TPS, CLT, IAT, RPM, dll.).

---

## Konfigurasi di TunerStudio

Buka: **CAN Bus → CAN Input → CAN Sensor Input**

Tersedia **8 slot** konfigurasi. Untuk setiap slot:

| Parameter | Keterangan |
|---|---|
| **CAN ID** | ID frame CAN dari perangkat sumber. Kosongkan untuk nonaktif. |
| **Byte Offset** | Posisi byte dalam payload CAN (0–7) |
| **Data Type** | Ukuran data: 8-bit atau 16-bit |
| **Byte Order** | Big Endian atau Little Endian |
| **Scale** | Faktor pengali untuk konversi nilai |
| **Offset** | Nilai tambahan setelah pengalian |
| **Target Sensor** | Sensor tujuan: MAP, TPS, CLT, IAT, RPM, dll. |

!!! tip
    Nilai yang diterima diproses menggunakan kalibrasi sensor yang sudah ada.
    Pastikan satuan data yang dikirim sesuai dengan kurva sensor yang dikonfigurasi.

---

## Contoh: Sensor MAP via CAN

Modul sensor mengirim tekanan dalam kPa × 10 sebagai 16-bit little-endian di CAN ID `0x300`, byte 0–1:

```
CAN ID       = 0x300
Byte Offset  = 0
Data Type    = 16-bit
Byte Order   = Little Endian
Scale        = 0.1
Offset       = 0
Target       = MAP
```
