# ECU Mazduino Compact (v2.2)

## Overview

The Mazduino Compact v2.2 ECU is the latest evolution of the 4-channel standalone Engine Control Unit, designed for versatile engine management applications. Built specifically for rusEFI and Speeduino firmware, it provides comprehensive engine control in a compact package suited to fully sequential 4-cylinder or paired 8-cylinder operation.

**New in v2.2:**

- **High Side Switching**: High-side MOSFET output for alternator control, VVT and other 12V switching

- **Enhanced Pin Mapping**: Connector pin 22 is assigned to the High Side output

- **PA8 MCU Support**: High-side control through MCU pin PA8

![Mazduino Compact 4ch v2.2](img/mazduino-compact-4ch-v2.2.jpeg)

## Key Features

### Core Features
- Primary trigger input for hall or optical CKP sensors only
- Secondary trigger input for hall or optical CMP sensors only  
- 6 analog inputs (0-5V) for MAP, TPS, IAT, CLT, O2 and 1 spare
- **Knock Sensor Input**: Dedicated knock sensor input with a conditioning IC

- 5V sensor power supply with internal fuse protection
- 3 pullup digital inputs for AC Switch, VSS, Clutch (AC or VSS can be used for a Launch Control button if not needed)
- **6x high-current 3A low-side drivers**: 4 injectors + Idle 1 + Idle 2 for high-impedance injectors, idle PWM, boost control, VVT

- 5x low-current low-side drivers for main relay, fuel pump, AC compressor, fan and tachometer control
- 4x 12V or 5V outputs for ignition coil signals
- **NEW: 1x High Side Switching** for alternator/VVT/12V switching control

- 168 MHz ARM Cortex-M4 processor
- Data communication via CANbus
- Data communication via USB Type-C
- Serial RX/TX communication
- **Yamaha 33-pin connector**: Professional-grade automotive connector with an optimized pin assignment

- SD card for data logging

### High Side Switching (v2.2)
- **Output Type**: High-side MOSFET switching

- **Voltage**: 12V switching capability

- **Current Rating**: High current handling for heavy loads

- **Applications**: 
  - Alternator field control
  - Variable Valve Timing (VVT) solenoid
  - High current 12V loads
  - Auxiliary systems control
- **MCU Control**: Pin PA8 for PWM control and digital switching

## Wiring and Installation

### Connector Pin Mapping

The Mazduino Compact v2.2 ECU uses a Yamaha 33-pin connector with the following pin assignment:

![Mazduino Compact 33-pin Connector](img/connector-33p.jpeg)

#### Connector Layout
```
11  10   9   8   7   6   5   4   3   2   1
22  21  20  19  18  17  16  15  14  13  12
33  32  31  30  29  28  27  26  25  24  23
```

#### Pin Assignment

| Pin | Function | Description |
|-----|----------|-------------|
| 1 | Injector 1 | Injector channel 1 |
| 2 | Injector 2 | Injector channel 2 |
| 3 | Injector 3 | Injector channel 3 |
| 4 | Injector 4 | Injector channel 4 |
| 5 | Idle 1 | Idle control output 1 (high current 3A) |
| 6 | Tacho | Tachometer output |
| 7 | Fan | Fan relay control |
| 8 | 5V | 5V reference output |
| 9 | 12V | Main power supply |
| 10 | Main Relay | Main relay control |
| 11 | GND | Ground |
| 12 | Idle 2 | Idle control output 2 (high current 3A) - can be used for boost/VVT |
| 13 | Ignition 4 | Ignition channel 4 |
| 14 | Ignition 3 | Ignition channel 3 |
| 15 | Ignition 2 | Ignition channel 2 |
| 16 | Ignition 1 | Ignition channel 1 |
| 17 | Fuel Pump | Fuel pump relay control |
| 18 | AC Compressor | AC compressor relay |
| 19 | CKP | Crankshaft position sensor (Trigger 1) |
| 20 | GND | Ground |
| 21 | GND | Ground |
| **22** | **High Side Out** | **High Side MOSFET output** |
| 23 | CLT | Coolant temperature |
| 24 | TPS | Throttle position sensor |
| 25 | O2 | Oxygen sensor |
| 26 | MAP | Manifold absolute pressure |
| 27 | IAT | Intake air temperature |
| 28 | Spare Analog | Spare analog input |
| 29 | CMP | Camshaft position sensor (Trigger 2) |
| 30 | Knock Sensor | Knock sensor input with conditioning IC |
| 31 | AC Switch | AC switch input (active ground) |
| 32 | Clutch | Clutch position input |
| 33 | VSS | Vehicle speed sensor |

### MCU Pin Mapping

For advanced users and firmware development, here is the STM32F407VGT6 pin assignment for v2.2:

| Function | MCU Pin |
|----------|---------|
| Ignition Output 1 | PE15 |
| Ignition Output 2 | PE14 |
| Ignition Output 3 | PD13 |
| Ignition Output 4 | PE5 |
| Injection Output 1 | PD8 |
| Injection Output 2 | PB15 |
| Injection Output 3 | PB14 |
| Injection Output 4 | PB13 |
| **High Side Output** | **PA8** |
| MAP Sensor | PA0 |
| TPS | PA3 |
| IAT Sensor | PA5 |
| CLT Sensor | PA4 |
| O2 Sensor | PA1 |
| Battery/Voltage Ref | PA2 |
| Spare Analog Input 1 | PB1 |
| **Knock Sensor** | **PA6** |
| AC Input | PB0 |
| Clutch Input | PE13 |
| VSS | PD7 |
| CKP | PD3 |
| CMP | PD4 |
| Tacho | PC9 |
| Fuel Pump Relay | PC8 |
| FAN Relay | PA15 |
| AC Compressor Relay | PC7 |
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

## High Side Switching

- **MCU Pin**: PA8, **Connector Pin**: Pin 22

- **Output Type**: High-side P-channel MOSFET, 12V, PWM/digital support

- **Applications**: Alternator field control, VVT solenoid, or other 12V loads

Wiring example:
```
Pin 22 (High Side) → VVT Solenoid (+)
VVT Solenoid (-) → Vehicle Ground
```

> Always use a fuse that matches the load rating. Turn off power before wiring.

## Notes

- **Smart Coils**: Direct connection supported. **Dump Coils**: Require an external IGBT.

- **Upgrading from v2.1**: Pin 22 changes to High Side Output. Adjust your wiring if you upgrade.

- Solder jumpers on the back of the PCB set the ignition voltage and knock sensor enable.

**[Download firmware and configuration files](downloads.md)**

## Version Comparison

| Feature | v2.1 | v2.2 |
|---------|------|------|
| Core MCU | ARM Cortex-M4 168 MHz | ARM Cortex-M4 168 MHz |
| Ignition Outputs | 4x | 4x |
| Injection Outputs | 4x | 4x |
| Low Side Outputs | 5x | 5x |
| **High Side Output** | **No** | **Yes (Pin 22)** |
| **MCU Pin PA8** | **Unused** | **High Side Control** |
| CAN Bus | Yes | Yes |
| USB Type-C | Yes | Yes |
| SD Card | Yes | Yes |
| Knock Sensor | Yes (Pin 30) | Yes (Pin 30) |
| High Current MOSFET | 6 (4 injectors + 2 idle) | 6 (4 injectors + 2 idle) |
| Stepper Support | Yes | Yes |

---

**v2.2 Update**: Adds High Side Switching for alternator control, VVT and other 12V switching applications through connector pin 22 and MCU pin PA8.
