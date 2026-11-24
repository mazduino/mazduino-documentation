# Mazduino Custom Firmware

The Mazduino firmware is a fork of **rusEFI** developed specifically for Mazduino hardware. Although it is based on rusEFI, it has a number of differences and added features that are not in the official rusEFI firmware.

---

## Additions to Official rusEFI

The following features have been added in the Mazduino custom firmware:

- **Pre-configured pin mapping** — the default pins match the latest revision of each board; older revisions only need a few pins changed (see [pins to change](../downloads.md#pin-yang-perlu-diubah-pada-revisi-lama)), and the Mega100 uses the Speeduino board preset
- **TunerStudio .ini file included** — provided in every release, no need to generate it yourself
- **[CAN Virtual Input](#can-input)** — bits in a CAN frame are used as digital pins
- **[CAN Analog Input](#can-input)** — values in a CAN frame are used as virtual ADC
- **[CAN Sensor Input](#can-input)** — override internal sensors (MAP, TPS, CLT, RPM, etc.) directly via CAN
- **[CAN Output](#can-output)** — send engine data to the CAN bus for an external dashboard or datalogger
- **[Math Channels](#computation-tables)** (not available yet) — calculate custom channels from a combination of existing channels
- **[User Tables](#computation-tables)** (not available yet) — freely configurable lookup tables
- **[Logic Outputs](#logic-outputs)** (not available yet) — digital outputs that turn on based on configurable conditions
- **[Fuel Consumption](#fuel-consumption)** — L/100km and L/hour calculation
- **[BIGFUEL variant](bigfuel.md)** — 32x32 VE and ignition tables on the same hardware
- **[TunerStudio over Bluetooth](bluetooth.md)** — HC-05/HC-06 module on all boards
- **[AC Idle fuel adder](../tunerstudio-ac-settings.md#mesin-alpha-n-tanpa-sensor-map)** — extra fuel when the AC is on, for Alpha-N engines
- **[STFT enable switch](../tunerstudio-fuel-system.md#enable-switch-stft-opsional)** — short term fuel trim can be turned off from a switch
- **[DFCO enable switch](../tunerstudio-fuel-system.md#enable-switch-opsional)** — DFCO can be turned on and off from a switch in the cabin
- **[Temporary Cylinder Shutoff](../mazduino-tuner-diagnostik.md#temporary-cylinder-shutoff)** — temporarily shuts off a cylinder to find a weak cylinder (from Mazduino Tuner)
- **[Analog Multi-Switch](analog-multi-switch.md)** — reads up to 16 rotary switch positions from one analog input, 4 separate switches
- **[Rotational Idle](rotational-idle.md)** — CLT and TPS limits that also apply when the switch is ON, STFT stop, extra idle air, and dedicated timing while active

Firmware downloads are on the **[Downloads page](../downloads.md)**.

---

## Additional Features

### CAN Input

The ECU can receive data from the CAN bus and use it as a sensor input or digital pin:

| Feature | Use |
|---|---|
| [CAN Sensor Input](can-sensor-input.md) | Values from a CAN device are used directly as a sensor (MAP, TPS, CLT, RPM, etc.) |
| [CAN Analog Input](can-analog-input.md) | Values from a CAN device are used as an analog input (like a sensor voltage) |
| [CAN Virtual Input](can-virtual-input.md) | Bits in a CAN frame are used as a digital (on/off) switch |

### CAN Output

| Feature | Use |
|---|---|
| [CAN Output](can-output.md) | The ECU sends engine data to the CAN bus — for a dashboard, datalogger or other devices |

### Computation & Tables

| Feature | Use |
|---|---|
| [Math Channels](math-channels.md) | **Not available yet.** Create custom value channels calculated from a combination of existing channels |
| [User Tables](user-tables.md) | **Not available yet.** Custom lookup tables that can be filled in and used in the configuration |

### Logic Outputs

| Feature | Use |
|---|---|
| [Logic Outputs](logic-outputs.md) | **Not available yet.** Digital outputs that turn on based on configurable conditions |

### Fuel Consumption

| Feature | Use |
|---|---|
| [Fuel Consumption](fuel-consumption.md) | Real-time consumption in L/100km and L/hour, calculated from injection data and VSS |

### Input

| Feature | Use |
|---|---|
| [Analog Multi-Switch](analog-multi-switch.md) | Multi-position rotary switch through one analog input, read from a voltage curve |

### Boards and Connectivity

| Feature | Use |
|---|---|
| [BIGFUEL variant](bigfuel.md) | 32x32 VE and ignition tables for finer tuning resolution, same hardware as the base board |
| [TunerStudio over Bluetooth](bluetooth.md) | Tuning without a USB cable through an HC-05/HC-06 module |

### Fuel

| Feature | Use |
|---|---|
| [AC Idle fuel adder](../tunerstudio-ac-settings.md#mesin-alpha-n-tanpa-sensor-map) | Extra fuel when the AC is on, for Alpha-N engines with an idle bypass valve |
| [STFT enable switch](../tunerstudio-fuel-system.md#enable-switch-stft-opsional) | Switch to turn short term fuel trim on or off |
| [DFCO enable switch](../tunerstudio-fuel-system.md#enable-switch-opsional) | Switch to turn DFCO on or off from the cabin |

### Diagnostics

| Feature | Use |
|---|---|
| [Temporary Cylinder Shutoff](../mazduino-tuner-diagnostik.md#temporary-cylinder-shutoff) | Temporarily shuts off fuel and ignition to a cylinder to find a weak cylinder. Only in Mazduino Tuner |

### Idle

| Feature | Use |
|---|---|
| [Rotational Idle](rotational-idle.md) | Cuts spark or fuel in rotation between cylinders for a "lumpy" idle sound |
