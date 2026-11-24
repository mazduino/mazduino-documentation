# CAN Analog Input

CAN Analog Input lets a numeric value from a CAN frame be used as a **virtual ADC channel** — just like a voltage signal from a physical sensor.

Useful for reading values from CAN devices (for example a pressure sensor or position sensor) and connecting them to the ECU sensor configuration without extra wiring.

---

## How It Works

The value from the CAN frame is converted to a virtual voltage (0–5V), then processed by the ECU using the configured sensor calibration.

---

## Configuration in TunerStudio

Open: **CAN Bus → CAN Input → CAN Analog Input**

There are **8 channels** (`EFI_ADC_48` to `EFI_ADC_55`). For each channel:

| Parameter | Description |
|---|---|
| **CAN ID** | CAN frame ID of the source device. Leave empty to disable. |
| **Byte Offset** | Byte position in the CAN payload (0–7) |
| **Data Type** | 8-bit or 16-bit |
| **Byte Order** | Big Endian or Little Endian |
| **Scale** | Multiplier to get the voltage value (Volts) |
| **Offset** | Value added after multiplying |
| **Target Channel** | Destination virtual ADC channel (`EFI_ADC_48` to `EFI_ADC_55`) |

Once the slot is configured, select that channel in the settings of the sensor you want (for example: MAP sensor → select `EFI_ADC_48`).

!!! tip
    The conversion result is a voltage (Volts). Adjust Scale and Offset so the raw CAN value
    produces a voltage that matches the configured sensor curve.

---

## Example: Fuel Pressure Sensor via CAN

The sensor sends pressure in bar × 100 as 16-bit on CAN ID `0x420`, bytes 2–3:

```
CAN ID       = 0x420
Byte Offset  = 2
Data Type    = 16-bit
Byte Order   = Little Endian
Scale        = 0.00005   (10000 counts = 5V)
Offset       = 0
Target       = EFI_ADC_48
```

Then in the fuel pressure sensor configuration, select `EFI_ADC_48` as the input.
