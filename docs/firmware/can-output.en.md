# CAN Output

CAN Output makes the ECU send engine data to the CAN bus automatically, for a dashboard, datalogger or other connected device. The content of each byte in the frame can be set by you.

Menu location:

- TunerStudio: **CAN-bus → CAN Outputs → CAN Output 1–8** and **CAN-bus → Triggered CAN Outputs → Triggered CAN Output 1–8**
- Mazduino Tuner: **CAN Bus → CAN outputs** and **Expert → CAN-bus** (triggered)

!!! warning "Firmware before Nightly 20 November 2026"
    Nightly 20 November 2026 contains a fix for the channel selection in **Variable**. Update to this firmware or newer; the settings in the tune do not need to be changed.

---

## CAN Output Types

| Type | When it is sent | Number of slots |
|---|---|---|
| **CAN Output** | Continuously at the selected data rate | 8 |
| **Triggered CAN Output** | Once each time the trigger input changes | 8 |

CAN Output suits a dashboard that needs continuous data. Triggered CAN Output suits sending commands or events, for example a button in the cabin that turns something on in another CAN module.

---

## Frame Settings

### CAN Output

| Field | Description |
|---|---|
| **Enable mode** | **Enabled** to send, **Disabled** to turn this slot off. The "Enabled via Logic output" option does not work yet: the frame is not sent. |
| **CAN ID** | Frame ID, decimal or hex with the `0x` prefix. ID 0 is not sent. IDs above `0x7FF` are sent as an extended ID (29-bit). |
| **CAN Bus** | CAN 1 or CAN 2 |
| **Byte order** | Byte order for 16-bit values: Little endian (low byte first) or Big endian (high byte first) |
| **DLC** | Frame length, 1–8 bytes |
| **Data rate** | 1, 2, 4, 5, 10, 20, 50, 100, or 200 Hz |

### Triggered CAN Output

The CAN ID, CAN Bus, Byte order, and DLC fields are the same as above. In addition:

| Field | Description |
|---|---|
| **Trigger input** | Trigger input pin. Can be a physical pin or a CAN Switch from [CAN Virtual Input](can-virtual-input.md). |
| **Trigger input mode** | Pin mode. For a switch that connects the pin to ground, select **INVERTED PULLUP**. |
| **Trigger edge** | **Rising edge**: send when the input becomes active. **Falling edge**: send when the input stops being active. **Both edges**: send on both. |

The trigger input is debounced for 150 ms. The **Send frame** button in the dialog sends that frame once manually, for testing without pressing the switch.

---

## Byte Contents

Each byte is set with the following columns:

| Column | Description |
|---|---|
| **Type** | **Fixed 8-bit** / **Fixed 16-bit**: a fixed value. **Variable 8-bit** / **Variable 16-bit**: a value from an ECU channel. 16-bit types use two bytes, so the byte after it cannot be filled. |
| **Variable** | ECU channel to send (for Variable types) |
| **Fixed value** | Fixed value (for Fixed types) |
| **Multiplier** | Multiplier, integer |
| **Divider** | Divider, integer |
| **Offset** | Value added, integer, can be negative |

The value sent:

```
value = channel × Multiplier ÷ Divider + Offset
```

The result is rounded, then limited to 0–255 for 8-bit or 0–65535 for 16-bit. **Negative values are sent as 0**, so for data that can be negative (for example CLT below 0 °C) add an Offset so the result is always positive. The receiver then subtracts the same offset.

If the channel is not available (its sensor is not fitted), its value is counted as 0.

### Selectable Channels

The **Variable** list contains engine channels, sensors, raw sensor voltages, AC and cut status, VVT, knock, Lua gauges, CAN switches, and more.

Starting with Nightly 20 November 2026, these are added at the end of the list:

- **Analog multi-switch position 1–4** and **Analog multi-switch voltage 1–4**, from [Analog Multi-Switch](analog-multi-switch.md)
- **Fuel consumption L/100km** and **Fuel consumption L/h**, from [Fuel Consumption](fuel-consumption.md)

**Vehicle speed front left/right** and **rear left/right** are in the list, but the Mazduino firmware does not have per-wheel speed sensors yet, so their value is always 0. Use **Vehicle speed**.

---

## Example: RPM, CLT, and TPS to a Dashboard

CAN Output 1, CAN ID `0x600`, 20 Hz, DLC 4, Little endian:

| Byte | Type | Variable | Multiplier | Divider | Offset | Result |
|---|---|---|---|---|---|---|
| 1–2 | Variable 16-bit | RPM | 1 | 1 | 0 | RPM as is, 0–65535 |
| 3 | Variable 8-bit | CLT | 1 | 1 | 40 | CLT + 40: -40 °C is sent as 0, 90 °C is sent as 130 |
| 4 | Variable 8-bit | TPS1 | 1 | 1 | 0 | TPS in %, 0–100 |

On the dashboard: RPM = byte 1 + byte 2 × 256, CLT = byte 3 − 40, TPS = byte 4.

For finer resolution, for example AFR with one decimal place, use Multiplier 10 with Variable 16-bit (AFR 14.7 is sent as 147), then divide by 10 at the receiver.

---

## Not Being Sent? Check This

1. **Enable mode** = Enabled, not "Enabled via Logic output".
2. **CAN ID** is not 0.
3. **CAN Bus** matches the bus connected to the receiving device, and that bus is enabled in **CAN Bus Settings**.
4. The ECU CAN baud rate is the same as the receiving device.
5. Received value does not match the channel? Make sure the firmware is Nightly 20 November 2026 or newer (see the warning above).
