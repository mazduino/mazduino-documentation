# CAN Analog Input

CAN Analog Input memungkinkan nilai numerik dari frame CAN digunakan sebagai **channel ADC virtual** — sama seperti sinyal tegangan dari sensor fisik.

Berguna untuk membaca nilai dari perangkat CAN (misalnya sensor tekanan, sensor posisi) dan menghubungkannya ke konfigurasi sensor ECU tanpa kabel tambahan.

---

## Cara Kerja

Nilai dari frame CAN dikonversi menjadi tegangan virtual (0–5V), kemudian diproses oleh ECU menggunakan kalibrasi sensor yang sudah dikonfigurasi.

---

## Konfigurasi di TunerStudio

Buka: **CAN Bus → CAN Input → CAN Analog Input**

Tersedia **8 channel** (`EFI_ADC_48` s/d `EFI_ADC_55`). Untuk setiap channel:

| Parameter | Keterangan |
|---|---|
| **CAN ID** | ID frame CAN dari perangkat sumber. Kosongkan untuk nonaktif. |
| **Byte Offset** | Posisi byte dalam payload CAN (0–7) |
| **Data Type** | 8-bit atau 16-bit |
| **Byte Order** | Big Endian atau Little Endian |
| **Scale** | Pengali untuk mendapatkan nilai tegangan (Volt) |
| **Offset** | Nilai tambahan setelah pengalian |
| **Target Channel** | Channel ADC virtual tujuan (`EFI_ADC_48` s/d `EFI_ADC_55`) |

Setelah slot dikonfigurasi, pilih channel tersebut di pengaturan sensor yang diinginkan (misalnya: MAP sensor → pilih `EFI_ADC_48`).

!!! tip
    Hasil konversi adalah tegangan (Volt). Sesuaikan Scale dan Offset agar nilai mentah CAN
    menghasilkan tegangan yang sesuai dengan kurva sensor yang dikonfigurasi.

---

## Contoh: Sensor Tekanan Bahan Bakar via CAN

Sensor mengirim tekanan bar × 100 sebagai 16-bit di CAN ID `0x420`, byte 2–3:

```
CAN ID       = 0x420
Byte Offset  = 2
Data Type    = 16-bit
Byte Order   = Little Endian
Scale        = 0.00005   (10000 counts = 5V)
Offset       = 0
Target       = EFI_ADC_48
```

Lalu di konfigurasi sensor tekanan bahan bakar, pilih `EFI_ADC_48` sebagai input.
