# CAN Virtual Input (Digital)

CAN Virtual Input lets one bit in a CAN frame be used as a **digital pin (switch)** on the ECU — like a physical switch wired to the ECU connector.

Useful for receiving on/off signals from CAN devices, for example: steering wheel buttons, a signal from a gearbox controller, or a confirmation from an external module.

---

## How It Works

The ECU reads a specific bit from a received CAN frame and treats it as a digital pin. There are **8 virtual pins** (`CAN_INPUT_0` to `CAN_INPUT_7`) that can be used anywhere a digital input is needed — clutch switch, launch enable, AC request, etc.

---

## Configuration in TunerStudio

Open: **CAN Bus → CAN Input → CAN Virtual Input**

There are **8 slots**. For each slot:

| Parameter | Description |
|---|---|
| **CAN ID** | CAN frame ID of the source device |
| **Byte Offset** | Byte position in the CAN payload (0–7) |
| **Bit Position** | Bit position within that byte (0–7) |
| **Active Low** | Check if the logic is inverted (0 = active) |

Once configured, pins `CAN_INPUT_0` to `CAN_INPUT_7` appear in the pin selection dropdown for digital inputs (clutch, launch, AC, etc.).

---

## Example: Launch Control Button via CAN

The launch button on the steering wheel sends a status byte on CAN ID `0x101`, byte 0, bit 3:

```
CAN ID       = 0x101
Byte Offset  = 0
Bit Position = 3
Active Low   = No
```

Then in the Launch Control configuration, select `CAN_INPUT_0` as the enable pin.
