# Mazduino LITE v0.1

## Introduction

Mazduino LITE v0.1 is the first variant of the Mazduino LITE ECU family, designed for 4-cylinder engines with 4 injector channels and 2 ignition channels. This version is ideal for a **Coil On Plug** setup or for applications with an **External IGBT**.

> **Firmware**: LITE runs rusEFI, and it can also run **Speeduino**
> firmware, using the build made for Mazduino Compact rather than a separate
> build. Both have been tested running. See the
> [Downloads page](downloads.md#firmware-speeduino).


![Mazduino LITE ECU](img/lite/mazduino-lite-with-case.jpeg)

**Important Notes for v0.1**: 

- The IGBT footprint is uncommon - use an external IGBT or Coil On Plug

## Key Features

### Input System
- **Trigger Input**: CKP and CMP for Hall/Optical sensors

- **VR Support**: Variable Reluctance sensors with a conditioner module

- **Analog Inputs**: 6x (0-5V) for MAP, TPS, IAT, CLT, O2, and a spare

- **Digital Inputs**: 5x pullup for AC Switch, VSS, Clutch, and launch control

- **Sensor Power**: Regulated 5V with internal fuse protection

### Output System
- **Injection**: 4x high-current drivers for sequential or batch mode

- **Ignition**: 2x outputs with Smart Coil (5V/12V) support
  - **v0.1**: The IGBT footprint is uncommon - **use an external IGBT or COP**

- **Control**: 5x relay outputs for fuel pump, fan, AC, main relay, tachometer

- **Idle Control**: 2x PWM outputs for the ISC valve

### Communication
- **USB Type-C**: Modern connector for tuning and programming

- **CAN Bus**: 4-pin connector with power selection (5V/12V)

- **Serial**: RX/TX pins for additional communication

### Storage and Timing
- **SD Card**: Micro SD for onboard data logging (max 32GB)

- **RTC**: Battery-backed real-time clock

- **Processor**: ARM Cortex-M4

## Connector System

### 33-Pin Main Connector

![Connector Layout](img/lite/mazduino-lite-connector-layout.jpeg)

#### Connector Layout
```
11  10   9   8   7   6   5   4   3   2   1
22  21  20  19  18  17  16  15  14  13  12
33  32  31  30  29  28  27  26  25  24  23
```

#### Pin Assignment v0.1

| Pin | Function | Description |
|-----|----------|-------------|
| 1 | Idle 1 | Idle control output 1 |
| 2 | Idle 2 | Idle control output 2 |
| 3 | CKP/Digital1 | Crankshaft position |
| 4 | VR1- | VR sensor negative |
| 5 | Ignition 1 | Ignition channel 1 |
| 6 | Main Relay | Main relay control |
| 7 | **Ignition 2** | **Ignition channel 2** |
| 8 | Tacho/RPM | Tachometer output |
| 9 | **Ground Coil** | **Ground for the coil** |
| 10 | +5V | 5V reference output |
| 11 | +12V | Main power supply |
| 12 | Injector 3 | Injector channel 3 |
| 13 | Injector 4 | Injector channel 4 |
| 14 | CMP/Digital2 | Camshaft position |
| 15 | VR2- | VR sensor negative 2 |
| 16 | VR2+ | VR sensor positive 2 |
| 17 | AC Relay | AC relay control |
| 18 | Fuel Pump Relay | Fuel pump control |
| 19 | Fan Relay | Fan relay control |
| 20 | IAT | Intake air temperature |
| 21 | TPS | Throttle position sensor |
| 22 | Ground ECU | ECU ground |
| 23 | Injector 2 | Injector channel 2 |
| 24 | Injector 1 | Injector channel 1 |
| 25 | Ground Sensor | Sensor ground |
| 26 | Ground Sensor | Sensor ground |
| 27 | VR1+ | VR sensor positive 1 |
| 28 | MAP | Manifold absolute pressure |
| 29 | Clutch/Digital3 | Clutch position input |
| 30 | CLT | Coolant temperature |
| 31 | AC Switch Input | AC switch input (Active Ground) |
| 32 | VSS/Digital4 | Vehicle speed sensor |
| 33 | O2 Sensor | Oxygen sensor |

**Important**: On v0.1, pins 7 and 9 are **Ignition 2** and **Ground Coil**

### CAN Bus Connector (4-Pin)

| Pin | Function |
|-----|----------|
| 1 | Power (12V/5V selectable) |
| 2 | CAN Low |
| 3 | CAN High |
| 4 | Ground |

## MCU Pin Mapping

For advanced users and firmware development:

| Function | MCU Pin |
|----------|---------|
| Ignition Output 1 | PE15 |
| Ignition Output 2 | PE14 |
| Injection Output 1 | PD8 |
| Injection Output 2 | PB15 |
| Injection Output 3 | PB14 |
| Injection Output 4 | PB13 |
| MAP Sensor | PA0 |
| TPS | PA3 |
| IAT Sensor | PA5 |
| CLT Sensor | PA4 |
| O2 Sensor | PA1 |
| Battery/Voltage Reff | PA2 |
| Analog Spare Input 1 | PB1 |
| AC Input | PB0 |
| Clutch Input | PE13 |
| VSS | PD7 |
| CKP | PC6 |
| CMP | PE11 |
| VR1 | PD3 |
| VR2 | PD4 |
| Tacho | PC9 |
| Fuelpump Relay | PC8 |
| FAN Relay | PA15 |
| AC Compresor Relay | PC7 |
| Main Relay | PE8 |
| Idle 1 | PD9 |
| Idle 2 | PD10 |
| TXD1 | PA9 |
| RXD1 | PA10 |
| TXD3 | PB10 |
| RXD3 | PB11 |
| TXCAN | PD1 |
| RXCAN | PD0 |
| SD CS | PD2 |
| SPI3 CLK | PC10 |
| SPI3 MISO | PC11 |
| SPI3 MOSI | PC12 |

## Hardware Configuration

### Critical Jumper Settings

**IMPORTANT**: The jumper configuration must be correct before power-up!

#### Top Side Board
- **Coil Voltage**: 12V/5V selection (default depends on coil type)

- **CAN Terminator**: Enable/disable the terminator resistor

- **VR Conditioner**: 8-pin connector for the VR module

#### Bottom Side Board
- **Tacho Signal**: 5V/12V output selection (default 12V)

- **IGN1/IGN2 Mode**: Smart Coil selection (JP3/JP4)
  - **v0.1**: **Use Smart Coil only** - the IGBT footprint is uncommon

- **VR1/Hall, VR2/Hall**: Input type selection

- **Digital Pullup**: Enable internal pullup resistors

- **CAN Power**: 12V/5V on the CAN connector

### Safety Warnings

**WARNING**:

- **Do not connect 12V signals directly to an ECU input**
- **Verify the coil voltage jumper before connecting**
- **Keep sensor ground separate from power ground**
- **Check all jumper settings before first power-up**
---
