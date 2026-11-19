# Varian BIGFUEL

Varian BIGFUEL memakai hardware dan pinout yang sama dengan board dasarnya, tapi dengan **tabel VE dan tabel ignition 32x32**. Board standar memakai 16x16. Resolusi yang lebih rapat berguna untuk mesin dengan rentang RPM dan load yang lebar, misalnya mesin turbo atau mesin balap.

---

## Board yang Tersedia

| Varian | Board dasar |
|---|---|
| `mazduino-compact-bigfuel` | Mazduino Compact |
| `mazduino-core-bigfuel` | Mazduino Core |
| `mazduino-lite-bigfuel` | Mazduino Lite |
| `mazduino-mini6ch-bigfuel` | Mazduino Mini 6CH |

Mega100 dan Mega100-512 tidak punya varian BIGFUEL.

Firmware ada di [halaman Downloads](../downloads.md) dan di setiap nightly release, dengan nama file `rusefi_bundle_mazduino-<board>-bigfuel.zip`. INI TunerStudio-nya juga terpisah dari board dasar.

---

## Yang Berbeda

| | Board standar | BIGFUEL |
|---|---|---|
| Tabel VE | 16x16 | 32x32 |
| Tabel ignition | 16x16 | 32x32 |
| Second VE / Second Ignition table | 16x16 | 32x32 |
| Tabel LTFT (long term fuel trim) | 16x16 | 16x16 |
| Engine sniffer | Ada | **Tidak ada** |

Tabel LTFT tetap 16x16 untuk menghemat RAM. Koreksinya diinterpolasi ke tabel VE saat dipakai, jadi tidak mengurangi resolusi tuning.

**Engine sniffer** dimatikan supaya tabel 32x32 muat di RAM. Akibatnya **Trigger sniffer** di Mazduino Tuner dan grafik engine sniffer di TunerStudio tidak tersedia. Trigger logger (tooth logger) tetap bisa dipakai. Fitur lain sama dengan board dasar.

---

## Tune Tidak Bisa Dipindah Langsung

Karena ukuran tabel berbeda, **tune dari board standar tidak bisa langsung dimuat ke BIGFUEL**, begitu juga sebaliknya.

Pindah dari board standar ke BIGFUEL:

1. Simpan tune lama.
2. Flash firmware BIGFUEL dan pakai INI BIGFUEL.
3. Tabel yang ukurannya berbeda tidak ikut terbaca dari tune lama. Isi ulang tabel VE dan ignition 32x32, lalu periksa semua pengaturan lain (sensor, injektor, trigger) sebelum mesin dinyalakan.
