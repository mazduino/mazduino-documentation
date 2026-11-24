# BIGFUEL Variant

The BIGFUEL variant uses the same hardware and pinout as its base board, but with **32x32 VE and ignition tables**. Standard boards use 16x16. The finer resolution is useful for engines with a wide RPM and load range, for example turbo engines or race engines.

---

## Available Boards

| Variant | Base board |
|---|---|
| `mazduino-compact-bigfuel` | Mazduino Compact |
| `mazduino-core-bigfuel` | Mazduino Core |
| `mazduino-lite-bigfuel` | Mazduino Lite |
| `mazduino-mini6ch-bigfuel` | Mazduino Mini 6CH |

The Mega100 and Mega100-512 have no BIGFUEL variant.

The firmware is on the [Downloads page](../downloads.md) and in every nightly release, with the file name `rusefi_bundle_mazduino-<board>-bigfuel.zip`. Its TunerStudio INI is also separate from the base board.

---

## What Is Different

| | Standard board | BIGFUEL |
|---|---|---|
| VE table | 16x16 | 32x32 |
| Ignition table | 16x16 | 32x32 |
| Second VE / Second Ignition table | 16x16 | 32x32 |
| LTFT (long term fuel trim) table | 16x16 | 16x16 |
| Engine sniffer | Yes | **No** |

The LTFT table stays 16x16 to save RAM. Its correction is interpolated onto the VE table when used, so it does not reduce tuning resolution.

**Engine sniffer** is turned off so the 32x32 tables fit in RAM. As a result, **Trigger sniffer** in Mazduino Tuner and the engine sniffer graph in TunerStudio are not available. The Trigger logger (tooth logger) can still be used. Other features are the same as the base board.

---

## Tunes Cannot Be Moved Directly

Because the table sizes are different, **a tune from a standard board cannot be loaded directly into BIGFUEL**, and the same applies the other way around.

Moving from a standard board to BIGFUEL:

1. Save the old tune.
2. Flash the BIGFUEL firmware and use the BIGFUEL INI.
3. Tables with a different size are not read from the old tune. Fill in the 32x32 VE and ignition tables again, then check all other settings (sensors, injectors, trigger) before starting the engine.
