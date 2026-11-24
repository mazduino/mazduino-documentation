# Mazduino Core

## Overview

The Mazduino Core is a new-generation ECU built on a 48-pin automotive connector, with a more complete I/O architecture than the Mini 6CH line. It uses an **ARM Cortex-M4 180 MHz** as its main MCU for advanced engine control, including support for **dual ETB**, **dual CAN bus**, combined **Hall + VR** inputs, and more actuator outputs for modern engines.

This documentation is based on the Mazduino Core product specification and the hardware reference in the MAZDUINO CORE document.

![Mazduino Core product photo](img/core/mazduino-core.jpeg)

## Key Features

- **ARM Cortex-M4 180 MHz** MCU
- Built-in **5V sensor supply** with internal protection
- **4x Hall/Digital inputs** for CKP, CMP, VSS, clutch, launch, or other switches
- **12x analog inputs** for MAP, TPS, O2, pressure, temperature, PPS, and additional sensors
- **6x ignition outputs** (for smart coils, 5V/12V depending on configuration)
- **10x 3A low side outputs** for injectors, idle PWM, boost, VVT, and medium-load actuators
- **5x low current low side outputs** for relays (main relay, fuel pump, fan, AC, tach)
- **2x 1.3A high side outputs** for 12V switching loads
	- Example uses: **alternator control**, 12V solenoids, and other switching actuators within the current limit.

- **2x CAN bus** (depending on trace/jumper configuration)
- **2x VR inputs** for variable reluctor CKP/CMP sensors
- **2x ETB outputs** (ETB1 and ETB2)
- **Dual ETB IC (ETB1 and ETB2)** can also be used for **Idle Stepper** control
- USB, Serial, and CAN communication
- Firmware support for **rusEFI based** firmware only (official or custom firmware for the F4 MCU)

## Hardware and Jumper Configuration

The Mazduino Core has several pins whose function can be switched with solder jumpers. This lets one board be used for many different engine configurations.

### Solder Jumper Positions JP3, JP4, and JP5

![Solder jumper positions JP3 JP4 JP5](img/core/Picture1.png)

The **JP3**, **JP4**, and **JP5** solder jumpers are on the bottom of the board.

On the back of the board there are jumpers that can be set to suit your needs, or as requested when you order: whether the board will be used on a 6-cylinder or only a 4-cylinder car, or whether you need extra analog inputs or a high side output (12v switching).

On JP3, JP4 and JP5, solder the jumper across 2 pins toward the center to pass the signal through to the ECU connector.

### Solderless Pin Header Jumpers

![Solderless pin header jumpers](img/core/Picture2.png)

The solderless pin header jumpers are set as requested when you order, or you can move them yourself as needed. The ECU connector will then carry CANL or VR2-, Digital 4 or VR1-, CANH or VR2+, Digital 3 or VR1+.

### Additional Pin Headers (Prototype)

For prototyping, there are 4 six-pin headers that accept **JST XH 2.54** connectors.

| Header | Pinout |
|--------|--------|
| J2 | 5V, Analog Temp 4, Analog Volt 2, Analog Volt 3, GND, GND |
| J5 | 12V, CANL1, CANH1, CANL2, CANH2, GND |
| J6 | 5V, 5V, 5V, USB D-, USB D+, GND |
| J7 | 3.3V, 3.3V, 3.3V, 3.3V, GND |

### Ignition Volt Drive Jumper (12V / 5V)

The **Ignition Volt Drive** jumper selects the voltage level of the coil trigger signal: **12V** or **5V**.

Be careful and make sure the coil signal voltage is correct. If the voltage level is wrong, the coil can be damaged beyond use.

### ETB and Idle Stepper Notes

Because there are dual ICs for **ETB1** and **ETB2** control, those driver channels can also be used for **Idle Stepper** control, depending on the firmware configuration and wiring.

### Important Jumper Options

- **JP3 (Pin 4)**: select **AVS2 (Analog Volt 5)** or **Ignition 6**

- **JP4 (Pin 20)**: select **ATS2 (Analog Temp 4)** or **Ignition 5**

- **JP5 (Pin 5)**: select **AVS3 (Analog Volt 6)** or **High Side 2**

- **IN22**: select **Digital 3** or **VR1+**

- **IN38**: select **Digital 4** or **VR1-**

- **IN33**: select **CANH1** or **VR2+**

- **IN34**: select **CANL1** or **VR2-**

### Configuration Notes

- For a **full 6-ignition** setup, enable ignition mode on Pin 4 and Pin 20.
- For a setup that needs extra analog inputs, enable analog mode on Pin 4/5/20.
- For VR trigger sensors, switch the Digital 3/4 or CANH/CANL channels to VR as needed.
- Always switch off ECU power before changing the jumper configuration.

## Wiring and Installation
![Mazduino Core 48-pin Connector](img/mazduino-48p-connector.jpeg)

### 48-pin Connector Layout

```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

### 48-pin ECU Connector Pin Assignment

| Pin | Function | Description |
|-----|--------|------------|
| 1 | 12V ECU | Main ECU power supply |
| 2 | Ignition 1 | Ignition output 1 |
| 3 | High Side 1 | 1.3A high side output for 12V switching (example: alternator control) |
| 4 | OUT4 (JP3) | Select AVS2 (Analog Volt 5) or Ignition 6 |
| 5 | OUT5 (JP5) | Select AVS3 (Analog Volt 6) or High Side 2 for 12V switching |
| 6 | 5V Sensor Supply | 5V sensor reference |
| 7 | ETB1+ | ETB 1 positive output |
| 8 | ETB1- | ETB 1 negative output |
| 9 | ETB2+ | ETB 2 positive output |
| 10 | ETB2- | ETB 2 negative output |
| 11 | Low Side 10 | 3A low side output |
| 12 | Low Side 9 | 3A low side output |
| 13 | Low Side 8 | 3A low side output |
| 14 | Low Side 7 | 3A low side output |
| 15 | Low Side 6 | 3A low side output |
| 16 | Low Side 5 | 3A low side output |
| 17 | Ground | Power ground |
| 18 | Ground | Power ground |
| 19 | Ignition 2 | Ignition output 2 |
| 20 | OUT20 (JP4) | Select ATS2 (Analog Temp 4) or Ignition 5 |
| 21 | Digital 1 | Hall/digital input |
| 22 | IN22 | Select Digital 3 or VR1+ |
| 23 | Analog Temp 1 | Temperature input |
| 24 | Analog Temp 2 | Temperature input |
| 25 | Analog Volt 7 | 0-5V analog input |
| 26 | Analog Temp 3 | Temperature input |
| 27 | Low Side LC 15 | Low current output |
| 28 | Low Side LC 14 | Low current output |
| 29 | Low Side LC 13 | Low current output |
| 30 | Low Side LC 12 | Low current output |
| 31 | Low Side LC 11 / RPM | Low current output / tach |
| 32 | Low Side 4 | 3A low side output |
| 33 | IN33 | Select CANH1 or VR2+ |
| 34 | IN34 | Select CANL1 or VR2- |
| 35 | Ignition 3 | Ignition output 3 |
| 36 | Ignition 4 | Ignition output 4 |
| 37 | Digital 2 | Hall/digital input |
| 38 | IN38 | Select Digital 4 or VR1- |
| 39 | Ground | Ground |
| 40 | Ground | Ground |
| 41 | Analog Volt 8 | 0-5V analog input |
| 42 | Analog Volt 1 | 0-5V analog input |
| 43 | Analog Volt 2 | 0-5V analog input |
| 44 | Analog Volt 3 | 0-5V analog input |
| 45 | Analog Volt 4 | 0-5V analog input |
| 46 | Low Side 3 | 3A low side output |
| 47 | Low Side 2 | 3A low side output |
| 48 | Low Side 1 | 3A low side output |

## I/O Count Summary

| Group | Count | Notes |
|----------|--------|------------|
| Hall/Digital Input | 4 | Digital 1, 2, 3, 4 (3/4 via jumper) |
| VR Input | 2 | VR1 (+/-) and VR2 (+/-) via jumper channels |
| Analog Input | 12 | Analog Volt + Analog Temp, including jumper option pins |
| Ignition Output | 6 | Ignition 1-6 (5/6 via jumper) |
| Low Side 3A | 10 | Lowside 1-10 |
| Low Side Low Current | 5 | LC 11-15 |
| High Side 1.3A | 2 | High Side 1 + High Side 2 (via jumper), usable for 12V switching such as alternator control |
| ETB Output | 2 sets | ETB1 (+/-), ETB2 (+/-) |
| CAN Bus | 2 | CAN1 via jumper pins; CAN2 depending on board/firmware configuration |

## Firmware Function Mapping

Below is a typical function mapping for the firmware setup. The assignment can be adapted to the engine and the tuning strategy.

| Typical Function | Default Channel |
|------------|---------------|
| Ignition 1-6 | Ign 1 to Ign 6 |
| Injector 1-10 | Low Side 1 to Low Side 10 |
| Main Relay / Fuel Pump / Fan / AC / Tacho | Low Side Low Current 11 to 15 |
| MAP / TPS / O2 / PPS / Pressure sensors | Analog Volt 1 to 8 |
| CLT / IAT / Additional temp | Analog Temp 1 to 4 |
| CKP / CMP Hall | Digital 1 and Digital 2 |
| CKP / CMP VR | VR1 and VR2 (via jumper configuration) |
| ETB1 | ETB1+ and ETB1- |
| ETB2 | ETB2+ and ETB2- |

## MCU Information

- **MCU**: ARM Cortex-M4 180 MHz

- In the firmware, the ETB control lines are usually mapped to dedicated MCU pins (DIR/DIS/PWM) according to the firmware package.
- Use the firmware configuration file made specifically for the **Mazduino Core** so that all pins work as the board was designed.
- Firmware for this board is **rusEFI based** only (either official or custom firmware for the F4 MCU).

## Quick Installation Guide

1. Make sure all main grounds (pins 17/18/39/40) are well connected.
2. Connect pin 1 to a stable 12V ECU supply.
3. Configure the jumpers before fitting the ECU to the final harness.
4. Select Hall or VR trigger mode according to the CKP/CMP sensor type.
5. If you use 6 ignition channels, enable the ignition option on the related jumper pins.
6. If you use dual ETB, verify the ETB1 and ETB2 wiring and calibrate TPS/PPS.
7. Check the outputs with test mode in TunerStudio/rusEFI before starting the engine.

## Important Notes

- The ignition outputs are intended for **smart coils**. Dumb coils require an external driver/IGBT.
- The low current outputs are for relays or light loads, not for driving motors directly.
- **HS1 and HS2** can be used as **12V switching** outputs, for example for **alternator control**.
- Make sure the **Ignition Volt Drive** setting (12V/5V) matches the coil specification before powering up the system.
- All jumper changes must be made with the ECU **unpowered**.
- To use **CAN2**, follow the hardware schematic and the firmware configuration for your board revision.

## Software Tuning

- Download TunerStudio: [TunerStudio Downloads][tunerstudio-dl]

- rusEFI firmware reference: [wiki.rusefi.com][rusefi-wiki]

- Product information: [www.mazduino.com][mazduino-site]

[tunerstudio-dl]: https://www.tunerstudio.com/index.php/downloads
[rusefi-wiki]: https://wiki.rusefi.com
[mazduino-site]: https://www.mazduino.com

