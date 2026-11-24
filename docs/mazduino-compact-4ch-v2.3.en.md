# ECU Mazduino Compact (v2.3)

## Overview

The Mazduino Compact v2.3 ECU is the latest version of the 4-channel standalone Engine Control Unit, bringing important fixes and additional features. Built specifically for rusEFI and Speeduino firmware, it provides comprehensive engine control in a compact package suited to fully sequential 4-cylinder or paired 8-cylinder operation.

**v2.3 Updates:**

- **MCU Pin Mapping Fix**: Optimized MCU pin mapping for better performance

- **Knock Sensor Fix**: Knock sensor fixed so it no longer conflicts with the TPS

- **RTC Battery Support**: Added RTC battery support for real-time data logging to the SD Card (optional)

- **PCB Optimization**: Optimized PCB traces for better performance and reliability

- **Enhanced Compatibility**: Improved compatibility with a range of sensors and actuators

![Mazduino Compact 4ch v2.3](img/mazduino-compact-4ch-v2.3.jpeg)

## Key Features

### Core Features
- Primary trigger input for hall or optical CKP sensors only
- Secondary trigger input for hall or optical CMP sensors only  
- 6 analog inputs (0-5V) for MAP, TPS, IAT, CLT, O2 and 1 spare
- **Knock Sensor Input**: Dedicated knock sensor input with an improved conditioning IC

- 5V sensor power supply with internal fuse protection
- 3 pullup digital inputs for AC Switch, VSS, Clutch (AC or VSS can be used for a Launch Control button if not needed)
- **6x high-current 3A low-side drivers**: 4 injectors + Idle 1 + Idle 2 for high-impedance injectors, idle PWM, boost control, VVT

- 5x low-current low-side drivers for main relay, fuel pump, AC compressor, fan and tachometer control
- 4x 12V or 5V outputs for ignition coil signals
- **1x High Side Switching** for alternator/VVT/12V switching control
- 168 MHz ARM Cortex-M4 processor
- Data communication via CANbus
- Data communication via USB Type-C
- Serial RX/TX communication
- **Yamaha 33-pin connector**: Professional-grade automotive connector with an optimized pin assignment

- **SD Card with RTC**: Real-time data logging with RTC battery support (optional)

### Knock Sensor Fix (v2.3)
- **MCU Pin**: PA3 (moved from PA6 to avoid a conflict with the TPS)

- **Official Firmware Support**: PA3 works with the official rusEFI firmware

- **Backward Compatibility**: PA6 can still be used with custom firmware

- **IC Conditioning**: Improved conditioning circuit for optimal sensitivity

- **Noise Immunity**: Better resistance to electrical noise

- **Firmware Flexibility**: Choice between official firmware (PA3) or custom firmware (PA6)

### RTC Battery Support (v2.3)
- **Real-time Clock**: RTC support for accurate timestamps in data logs

- **Battery Backup**: Coin battery slot keeps the time while the ECU is off

- **Problem Solved**: Previously, data logs showed the time as 00:00:00

- **Solution**: The coin battery keeps the real time permanently

- **SD Card Logging**: Enhanced logging with accurate, persistent timestamps

- **Data Integrity**: Ensures data integrity with the time always kept

## Wiring and Installation

### Connector Pin Mapping

The Mazduino Compact v2.3 ECU uses a Yamaha 33-pin connector with the following pin assignment:

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
| 12 | Idle 2 | Idle control output 2 (high current 3A) |
| 13 | Ignition 4 | Ignition channel 4 |
| 14 | Ignition 3 | Ignition channel 3 |
| 15 | Ignition 2 | Ignition channel 2 |
| 16 | Ignition 1 | Ignition channel 1 |
| 17 | Fuel Pump | Fuel pump relay control |
| 18 | AC Compressor | AC compressor relay |
| 19 | CKP | Crankshaft position sensor (Trigger 1) |
| 20 | GND | Ground |
| 21 | GND | Ground |
| 22 | High Side Out | High Side MOSFET output |
| 23 | CLT | Coolant temperature |
| 24 | TPS | Throttle position sensor |
| 25 | O2 | Oxygen sensor |
| 26 | MAP | Manifold absolute pressure |
| 27 | IAT | Intake air temperature |
| 28 | Spare Analog | Spare analog input |
| 29 | CMP | Camshaft position sensor (Trigger 2) |
| **30** | **Knock Sensor** | **Knock sensor input (fixed in v2.3)** |
| 31 | AC Switch | AC switch input (active ground) |
| 32 | Clutch | Clutch position input |
| 33 | VSS | Vehicle speed sensor |

### MCU Pin Mapping (v2.3)

Updated STM32F407VGT6 MCU pin mapping in v2.3:

| Function | MCU Pin | v2.3 Change |
|----------|---------|----------------|
| Ignition Output 1 | PE15 | - |
| Ignition Output 2 | PE14 | - |
| Ignition Output 3 | PD13 | - |
| Ignition Output 4 | PE5 | - |
| Injection Output 1 | PD8 | - |
| Injection Output 2 | PB15 | - |
| Injection Output 3 | PB14 | - |
| Injection Output 4 | PB13 | - |
| High Side Output | PA8 | - |
| MAP Sensor | PA0 | - |
| **TPS** | **PA6** | **🔄 Optimized** |
| IAT Sensor | PA5 | - |
| CLT Sensor | PA4 | - |
| O2 Sensor | PA1 | - |
| Battery/Voltage Ref | PA2 | - |
| **Knock Sensor** | **PA3** | **🔄 Moved from PA6** |
| Spare Analog Input 1 | PB1 | - |
| Spare Analog Input 2 | PA7 | On the board only, not wired to the 33-pin connector |
| AC Input | PB0 | - |
| Clutch Input | PE13 | - |
| VSS | PD7 | - |
| CKP | PD3 | - |
| CMP | PD4 | - |
| Tacho | PC9 | - |
| Fuel Pump Relay | PC8 | - |
| FAN Relay | PA15 | - |
| AC Compressor Relay | PC7 | - |
| Main Relay | PE8 | - |
| Idle 1 | PD9 | - |
| Idle 2 | PD10 | - |
| TXD1 | PA9 | - |
| RXD1 | PA10 | - |
| TXD3 | PB10 | - |
| RXD3 | PB11 | - |
| TXCAN | PD1 | - |
| RXCAN | PD0 | - |
| **SD CS** | **PD2** | **🔄 Enhanced for RTC** |
| SPI3 CLK | PC10 | - |
| SPI3 MISO | PC11 | - |
| SPI3 MOSI | PC12 | - |

## Technical Specifications

| Parameter | Value |
|-----------|--------|
| Input Voltage | 12V (9V - 16V) |
| MCU | ARM Cortex-M4 168 MHz |
| Clock Speed | 168 MHz |
| Flash Memory | 1MB |
| RAM | 192KB |
| Analog Inputs | 6 channels on the 33-pin connector (0-5V), plus 1 spare on the board that is not wired to the connector |
| Digital Inputs | 4 channels |
| Ignition Outputs | 4 channels (12V/5V) |
| Injection Outputs | 4 channels (3A max) |
| Auxiliary Outputs | 7 channels |
| High Side Output | 1 channel |
| Communication | USB-C, CAN, Serial |
| Data Logging | SD Card with RTC |
| Operating Temp | -40°C to +85°C |
| Dimensions | 100mm x 80mm |
| Connector | Yamaha 33-pin |
