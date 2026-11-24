# ECU Mazduino Compact (v2.5)

## Overview

The Mazduino Compact v2.5 ECU is the latest development of the 4-channel Compact platform, focused on more flexible outputs and more stable signal reading. This version is still intended for rusEFI and Speeduino firmware, and suits fully sequential 4-cylinder or paired 8-cylinder setups.

**v2.5 Updates:**

- **High Side MCU Pin Mapping Update**: The high side is now two independent channels, mapped as **HS1 = PD15** and **HS2 = PD14**

- **Hall Input Optimization**: Improved traces and conditioning on the hall inputs (CKP/CMP) for a more stable trigger signal at both low and high rpm

- **Analog Input Optimization**: Refined analog filtering for more accurate sensor readings and better noise immunity

- **PCB Optimization**: Refined routing and jumper configuration for more flexible installation

![Mazduino Compact 4ch v2.5](img/mazduino-compact-4ch-v2.3.jpeg)

## Key Features

### Core Features
- Primary trigger input for hall or optical CKP sensors
- Secondary trigger input for hall or optical CMP sensors
- 6 analog inputs (0-5V) for MAP, TPS, IAT, CLT, O2 and 1 spare
- Dedicated knock sensor input with conditioning compatible with the official firmware
- 5V sensor power supply with internal fuse protection
- 3 pullup digital inputs for AC Switch, VSS and Clutch
- 6x high-current 3A low-side drivers: 4 injectors + Idle 1 + Idle 2

- 5x low-current low-side drivers for main relay, fuel pump, AC compressor, fan and tacho
- 4x 12V or 5V outputs for ignition coil signals
- **2x High Side Switching (12V signal / logic level)** for alternator control, VVT, or additional 12V switching. These outputs only provide a 12V signal and **cannot drive solenoids or inductive loads directly**. Use a relay or an external driver module
- 168 MHz ARM Cortex-M4 processor
- Communication via CANbus, USB Type-C and Serial RX/TX
- Automotive-grade Yamaha 33-pin connector
- SD Card data logging support

### High Side Update (v2.5)
- **HS1 (main)** uses MCU pin **PD15**

- **HS2 (additional)** uses MCU pin **PD14**

- On the connector there is a **GND / HS2 (Jumper)** option to select how the pin is used
- Allows a more flexible 12V signal output for advanced setups

> **Important**: HS1 and HS2 are **12V logic switching (signal)** outputs, not power outputs. They are not designed to draw high current and **must not be used directly for solenoids, VVT solenoids or other inductive loads**. To drive an actuator, connect the high side output to a suitable **relay or external driver/module**.

### Hall Input Optimization (v2.5)
- Hall pin assignment unchanged: **CKP = PD3** and **CMP = PD4**

- The improvement is in the input traces/circuit (no pin mapping change)
- Goal: better trigger stability and less noise interference

### Analog Input Optimization (v2.5)
- Analog pin assignment unchanged: MAP, TPS, IAT, CLT, O2 and spare analog stay the same

- The improvement is in the filtering and the quality of analog signal conditioning
- Goal: more consistent and accurate sensor readings

## Wiring and Installation

### Connector Pin Mapping

The Mazduino Compact v2.5 ECU uses a Yamaha 33-pin connector with the following pin assignment:

![Mazduino Compact 33-pin Connector](img/connector-33p.jpeg)

#### Connector Layout
```
11  10   9   8   7   6   5   4   3   2   1
22  21  20  19  18  17  16  15  14  13  12
33  32  31  30  29  28  27  26  25  24  23
```

#### Pin Assignment

| Pin | Function | Description |
|-----|--------|-----------|
| 1 | Injector 1 | Injector channel 1 |
| 2 | Injector 2 | Injector channel 2 |
| 3 | Injector 3 | Injector channel 3 |
| 4 | Injector 4 | Injector channel 4 |
| 5 | Idle 1 | Idle control output 1 (high current 3A) |
| 6 | Tacho/RPM | Tachometer output |
| 7 | Fan | Fan relay control |
| 8 | 5V | 5V reference output |
| 9 | 12V | Main power supply |
| 10 | Main Relay | Main relay control |
| 11 | GND | Ground |
| 12 | Idle 2 | Idle control output 2 (high current 3A) |
| 13 | Ignition 4 | Ignition channel 4 |
| 14 | Ignition 3 | Ignition channel 3 |
| 15 | Ignition 2 | Ignition channel 2 |
| 16 | Ignition 1 | Ignition channel 1 |
| 17 | Fuel Pump | Fuel pump relay control |
| 18 | AC Compressor Relay | AC compressor relay |
| 19 | CKP / Trigger 1 | Crankshaft position sensor |
| 20 | GND | Ground |
| **21** | **GND / HS2 (Jumper)** | **Ground or High Side 2 - 12V signal (depending on jumper configuration)** |
| **22** | **HS1** | **High Side Output 1 - 12V signal** |
| 23 | CLT | Coolant temperature sensor |
| 24 | TPS | Throttle position sensor |
| 25 | O2 | Oxygen sensor |
| 26 | MAP | Manifold pressure sensor |
| 27 | IAT | Intake air temperature sensor |
| 28 | Spare Analog Input | Spare analog input |
| 29 | CMP / Trigger 2 | Camshaft position sensor |
| 30 | Knock Sensor | Knock sensor input |
| 31 | AC Switch Input | AC switch input (active ground) |
| 32 | Clutch Switch | Clutch position input |
| 33 | VSS | Vehicle speed sensor |

### MCU Pin Mapping (v2.5)

STM32F407VGT6 MCU pin mapping on v2.5:

| Function | MCU Pin | v2.5 Change |
|--------|---------|----------------|
| Ignition Output 1 | PE15 | - |
| Ignition Output 2 | PE14 | - |
| Ignition Output 3 | PD13 | - |
| Ignition Output 4 | PE5 | - |
| Injection Output 1 | PD8 | - |
| Injection Output 2 | PB15 | - |
| Injection Output 3 | PB14 | - |
| Injection Output 4 | PB13 | - |
| MAP Sensor | PA0 | - |
| TPS | PA6 | Input circuit optimized |
| IAT Sensor | PA5 | Input circuit optimized |
| CLT Sensor | PA4 | Input circuit optimized |
| O2 Sensor | PA1 | Input circuit optimized |
| Battery/Voltage Ref | PA2 | Input circuit optimized |
| Knock Input | PA3 | - |
| Analog Spare Input 1 | PB1 | Input circuit optimized |
| Analog Spare Input 2 | PA7 | Input circuit optimized; on the board only, not wired to the 33-pin connector |
| AC Input | PB0 | - |
| Clutch Input | PE13 | - |
| VSS | PD7 | - |
| CKP | PD3 | Hall input trace optimized |
| CMP | PD4 | Hall input trace optimized |
| Tacho | PC9 | - |
| Fuelpump Relay | PC8 | - |
| FAN Relay | PA15 | - |
| AC Compressor Relay | PC7 | - |
| Main Relay | PE8 | - |
| Idle 1 | PD9 | - |
| Idle 2 | PD10 | - |
| **High Side Output 1 (HS1)** | **PD15** | **High side pin updated** |
| **High Side Output 2 (HS2)** | **PD14** | **New high side channel** |
| TXD1 | PA9 | - |
| RXD1 | PA10 | - |
| TXD3 | PB10 | - |
| RXD3 | PB11 | - |
| TXCAN | PD1 | - |
| RXCAN | PD0 | - |
| SD CS | PD2 | - |
| SPI3 CLK | PC10 | - |
| SPI3 MISO | PC11 | - |
| SPI3 MOSI | PC12 | - |

## Technical Specifications

| Parameter | Value |
|-----------|-------|
| Input Voltage | 12V (9V - 16V) |
| MCU | ARM Cortex-M4 168 MHz |
| Clock Speed | 168 MHz |
| Flash Memory | 1MB |
| RAM | 192KB |
| Analog Inputs | 6 channels on the 33-pin connector (0-5V), plus 1 spare on the board that is not wired to the connector |
| Digital Inputs | 4 channels |
| Ignition Outputs | 4 channels (12V/5V) |
| Low Side MOSFET Outputs | 6 channels (4 Injector + Idle 1 + Idle 2, 3A max) |
| Auxiliary Outputs | 7 channels |
| High Side Output | 2 channels (HS1 + HS2), 12V logic switching (signal, not a power output) |
| Communication | USB-C, CAN, Serial |
| Data Logging | SD Card |
| Operating Temp | -40C to +85C |
| Dimensions | 100mm x 80mm |
| Connector | Yamaha 33-pin |

## Wiring Harness

Recommended wire sizes per pin for the Mazduino Compact 4CH v2.5, with a count of wires for each size, are in [Harness Wire Size Recommendations](rekomendasi-ukuran-kabel.md).
