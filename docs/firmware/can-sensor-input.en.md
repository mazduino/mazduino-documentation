# CAN Sensor Input

CAN Sensor Input lets the ECU read sensor values from devices on the CAN bus and use them as if the sensor were wired directly to the ECU.

Suitable for connecting external sensor modules, CAN devices, or a dashboard that sends sensor data back.

---

## How It Works

The external device sends a CAN frame. The ECU captures that frame and applies its value directly to the selected internal sensor (MAP, TPS, CLT, IAT, RPM, etc.).

---

## Configuration in TunerStudio

Open: **CAN Bus → CAN Input → CAN Sensor Input**

There are **8 configuration slots**. For each slot:

| Parameter | Description |
|---|---|
| **CAN ID** | CAN frame ID of the source device. Leave empty to disable. |
| **Byte Offset** | Byte position in the CAN payload (0–7) |
| **Data Type** | Data size: 8-bit or 16-bit |
| **Byte Order** | Big Endian or Little Endian |
| **Scale** | Multiplier for converting the value |
| **Offset** | Value added after multiplying |
| **Target Sensor** | Destination sensor: MAP, TPS, CLT, IAT, RPM, etc. |

!!! tip
    The received value is processed using the existing sensor calibration.
    Make sure the units of the data sent match the configured sensor curve.

---

## Example: MAP Sensor via CAN

A sensor module sends pressure in kPa × 10 as 16-bit little-endian on CAN ID `0x300`, bytes 0–1:

```
CAN ID       = 0x300
Byte Offset  = 0
Data Type    = 16-bit
Byte Order   = Little Endian
Scale        = 0.1
Offset       = 0
Target       = MAP
```
