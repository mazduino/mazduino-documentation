# Analog Multi-Switch

Analog multi-switch membaca beberapa posisi switch dari **satu input analog**. Contohnya rotary switch untuk memilih map, launch RPM, atau mode traction control. Setiap posisi switch menghasilkan tegangan yang berbeda, lalu ECU mengubah tegangan itu menjadi nomor posisi.

Ada **4 analog multi-switch** yang berdiri sendiri. Masing-masing memakai satu input analog dan bisa membaca sampai 16 posisi.

Lokasi menu:

- TunerStudio: **Advanced → Analog multi-switch → Analog multi-switch 1–4**
- Mazduino Tuner: **Inputs → Multi position switch**

---

## Cara Kerja

Setiap switch punya curve 16 titik:

- **Voltage** (sumbu X): tegangan yang terukur di setiap posisi.
- **Position** (sumbu Y): nomor posisi yang dilaporkan untuk tegangan itu.

ECU membaca tegangan, mencari nilainya di curve, lalu membulatkan ke posisi terdekat. Tegangan yang jatuh di antara dua titik dibulatkan ke posisi yang lebih dekat, jadi batas antar posisi ada di tengah-tengah dua tegangan yang diukur.

Supaya tidak berkedip karena derau, tegangan dirata-rata dengan bacaan sebelumnya, dan posisi baru dipakai setelah terbaca sama dua kali berturut-turut.

Tidak perlu tahu nilai resistor di dalam switch. Cukup ukur tegangan di setiap posisi, lalu masukkan ke curve.

---

## Nilai Awal Curve

Mulai firmware **Nightly 20 November 2026**, curve sudah terisi nilai awal saat konfigurasi ECU masih default: posisi 0–15 tersebar rata di 0–5 V.

| Position | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Voltage | 0.00 | 0.34 | 0.66 | 1.00 | 1.34 | 1.66 | 2.00 | 2.34 | 2.66 | 3.00 | 3.34 | 3.66 | 4.00 | 4.34 | 4.66 | 5.00 |

Nilai ini hanya titik awal. Ganti dengan tegangan yang terukur dari switch Anda.

!!! note "Tune dari firmware lama"
    Tune yang dibuat dengan firmware sebelum Nightly 20 November 2026 menyimpan curve berisi 0 semua. Update firmware tidak mengubah tune, jadi curve tetap 0 dan switch tidak akan membaca posisi apa pun. Isi curve secara manual, atau salin nilai dari tabel di atas sebagai awal.

---

## Setup

1. Pasang switch ke salah satu input analog yang masih kosong.
2. Buka **Analog multi-switch 1**, pilih input itu di **Analog input**, lalu burn.
3. Putar switch ke setiap posisi dan catat nilai **Voltage** di dialog.
4. Isi curve: kolom **Voltage** dengan tegangan yang dicatat, kolom **Position** dengan nomor posisinya.
5. Burn, lalu putar switch lagi dan pastikan **Position** sesuai.

### Switch dengan Posisi Kurang dari 16

Curve selalu berisi 16 titik, dan **Voltage harus naik dari kiri ke kanan**. Untuk switch dengan posisi lebih sedikit, isi titik pertama sesuai posisi switch. Titik sisanya isi dengan tegangan yang terus naik sampai 5.00 V, dengan Position sama dengan posisi terakhir.

Contoh switch 4 posisi:

| Position | 1 | 2 | 3 | 4 | 4 | 4 | ... | 4 |
|---|---|---|---|---|---|---|---|---|
| Voltage | 0.50 | 1.70 | 2.90 | 4.10 | 4.30 | 4.50 | ... | 5.00 |

Dengan curve ini, tegangan di bawah 1.10 V terbaca posisi 1, antara 1.10 V dan 2.30 V posisi 2, dan seterusnya.

---

## Memakai Posisi Switch

Posisi dan tegangan setiap switch tersedia sebagai channel live data:

| Channel | Isi |
|---|---|
| `analogMultiSwitchPosition1` – `4` | Nomor posisi switch |
| `analogMultiSwitchVoltage1` – `4` | Tegangan input setelah dirata-rata |

Channel ini bisa ditampilkan sebagai gauge, direkam di datalog, dan dibaca dari Lua:

```lua
function onTick()
  local pos = getOutput("analogMultiSwitchPosition1")
  if pos == 2 then
    -- aksi untuk posisi 2
  end
end
```

Kalau **Analog input** diset NONE, posisi dan tegangan terbaca 0.

---

## Tidak Terbaca? Cek Ini

1. **Analog input** sudah dipilih dan tune sudah di-burn.
2. **Voltage** di dialog berubah saat switch diputar. Kalau tidak berubah, cek wiring dan input yang dipilih.
3. Curve tidak berisi 0 semua (lihat [Tune dari firmware lama](#nilai-awal-curve)).
4. Kolom Voltage di curve naik dari kiri ke kanan, tanpa nilai yang turun.
5. Tegangan antar posisi tidak terlalu rapat. Beri jarak minimal sekitar 0,2 V supaya derau tidak memindahkan posisi.
