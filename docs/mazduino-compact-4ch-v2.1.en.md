# Mazduino Compact ECU (v2.1)

## Overview

The Mazduino Compact v2.1 ECU is a 4-channel standalone Engine Control Unit designed for versatile engine management applications. Built specifically for rusEFI and Speeduino firmware, it provides comprehensive engine control in a compact package suited to full sequential 4-cylinder or paired 8-cylinder operation.

**New in v2.1:**

- **33-pin Yamaha connector**: Upgrade from Microfit to a professional automotive-grade connector

- **Knock Sensor Input**: Dedicated IC for reading the knock sensor and detecting engine knock

- **6 High Current MOSFETs**: One more high-current MOSFET (from 5 to 6) for Idle 2/Boost/VVT control

![Mazduino Compact 4ch](img/mazduino-compact-4ch-v2.1.jpeg)

## Key Features
- Primary trigger input for hall or optical CKP sensors only
- Secondary trigger input for hall or optical CMP sensors only
- 6 analog inputs (0-5V) for MAP, TPS, IAT, CLT, O2, and 1 spare that can be used for a fuel pressure sensor or other sensors
- **Knock Sensor Input (v2.1)**: Dedicated knock sensor input with a conditioning IC

- 5V sensor power supply with internal fuse protection
- 3 pullup digital inputs for AC Switch, VSS, Clutch (AC or VSS can be used for a Launch Control button if not needed)
- **6x 3A high-current low-side drivers (v2.1)**: 4 injectors + Idle 1 + Idle 2 for high-impedance injectors, idle PWM, boost control, VVT

- 5x low-current low-side drivers for main relay, fuel pump, AC compressor, fan, and tachometer control
- 4x 12V or 5V outputs for ignition coil signals
- 168 MHz ARM Cortex-M4 processor
- Data communication over CANbus
- Data communication over USB Type-C
- Serial RX/TX communication
- **33-pin Yamaha connector (v2.1)**: Professional automotive-grade connector with an optimized pin assignment

- SD card for data logging

## Wiring and Installation

### Connector Pin Mapping

The Mazduino Compact v2.1 ECU uses a 33-pin Yamaha connector with the following pin assignment:

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
| 12 | **Idle 2** | **Idle control output 2 (high current 3A) - can be used for boost/VVT** |
| 13 | Ignition 4 | Ignition channel 4 |
| 14 | Ignition 3 | Ignition channel 3 |
| 15 | Ignition 2 | Ignition channel 2 |
| 16 | Ignition 1 | Ignition channel 1 |
| 17 | Fuel Pump | Fuel pump relay control |
| 18 | AC Compressor | AC compressor relay |
| 19 | CKP | Crankshaft position sensor (Trigger 1) |
| 20 | GND | Ground |
| 21 | GND | Ground |
| 22 | GND | Ground |
| 23 | CLT | Coolant temperature |
| 24 | TPS | Throttle position sensor |
| 25 | O2 | Oxygen sensor |
| 26 | MAP | Manifold absolute pressure |
| 27 | IAT | Intake air temperature |
| 28 | Spare Analog | Spare analog input |
| 29 | CMP | Camshaft position sensor (Trigger 2) |
| 30 | **Knock Sensor** | Knock sensor input with conditioning IC |
| 31 | AC Switch | AC switch input (active ground) |
| 32 | Clutch | Clutch position input |
| 33 | VSS | Vehicle speed sensor |

### MCU Pin Mapping

For advanced users and firmware development, this is the STM32F407VGT6 pin assignment for v2.1:

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

### v2.1 Specific Features

#### 33-pin Yamaha Connector (New in v2.1)
- **Connector Upgrade**: From 30-pin Microfit to automotive-grade 33-pin Yamaha

- **High Reliability**: Weatherproof and vibration-resistant connector

- **Optimized Pin Layout**: A better organized pin assignment for easier installation

- **Better Grounding**: Multiple ground pins (11, 20, 21, 22) for signal integrity

#### Knock Sensor Support (New in v2.1)
- **Pin 30**: Dedicated knock sensor input

- **Conditioning IC**: Dedicated circuit to process the knock sensor signal

- **MCU Pin PA6**: Dedicated pin for the knock sensor input

- **Application**: Engine knock detection for protection and timing optimization

#### Enhanced High Current Outputs (v2.1)
- **6 High Current MOSFETs**: Upgrade from 5 to 6 3A high-current MOSFETs

- **Dual Idle Control**: Idle 1 and Idle 2 for more precise idle control

- **Flexible Applications**: Idle 2 can be used for boost control, VVT, or other PWM control

- **Output Capacity**: 6 high-current outputs in total vs 5 outputs on v1

#### Solder Jumper
The PCB has solder jumpers on the back for configuration:

- **Input/Output Selection**: Pin configuration for different functions

- **Ignition voltage selection**: Select the voltage that suits your ignition coils

- **Knock Sensor Enable**: Enables the knock sensor input

### Installation Steps
1. **Mounting**: Secure the ECU in a suitable location with good access to the connector
2. **Power Connection**: Connect main power (pin 9) and ground (pins 11, 20, 21, 22)
3. **Sensor Wiring**: Connect the engine sensors according to the pin mapping above
4. **Knock Sensor**: Connect the knock sensor to pin 30 if used
5. **Actuator Wiring**: Connect the injectors and ignition coils to their pins
6. **Verification**: Check all connections before power-up

### Wiring Notes
- **Multiple Ground**: Use all ground pins (11, 20, 21, 22) for the best connection

- **5V Reference**: Pin 8 provides the 5V reference for sensors

- **Knock Sensor**: Pin 30 has a dedicated conditioning IC for the knock signal

- **High Current Outputs**: Pins 1-5 and 12 are 3A high-current outputs for injectors and PWM control

- **Idle 2 Flexibility**: Pin 12 (Idle 2) can be used for idle control, boost control, VVT, or other high-current PWM control

- **Yamaha Connector**: High-reliability automotive-grade connector

- **AC Switch**: Pin 31 is an active-ground input for the AC switch

- **Wiring Compatibility**: Compatible with the Speeduino standard, with an updated pin mapping

- **References**: Additional wiring information is available on the [Speeduino Wiki][speeduino-wiring]

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system

## v1 vs v2.1 Comparison

| Feature | v1 | v2.1 |
|--------|-----|------|
| Connector | Microfit 30-pin (2x12 + 2x3) | Yamaha 33-pin automotive |
| Knock Input | None | Pin 30 with conditioning IC |
| Ground Pins | 3 pins (5, 19, 20) | 4 pins (11, 20, 21, 22) |
| Pin Layout | Separate 6-pin and 24-pin | 33-pin single connector |
| MCU Pin Knock | - | PA6 |
| **High Current MOSFET** | **5 (4 injectors + 1 idle)** | **6 (4 injectors + 2 idle)** |
| Idle Outputs | 1 (Idle PWM) | 2 (Idle 1 & Idle 2) |

## Support and Resources

### Documentation
- v2.1 installation guide - Complete setup instructions for the Yamaha connector
- Wiring diagram - Detailed 33-pin connector pin assignment (see above)
- Tuning guide - Engine configuration and optimization with knock detection
- Knock sensor guide - Knock sensor setup and calibration
- Troubleshooting - Common problems and solutions for v2.1

### Firmware & Configuration Files
- [Download Page](downloads.md) - Get the latest firmware and TunerStudio configuration files for v2.1
- rusEFI and Speeduino firmware available with knock sensor support
- Pin mapping configuration specific to v2.1 is included
- Knock sensor configuration templates for different engine types

### Support and Community
- Mazduino forum for v2.1 technical questions
- Upgrade documentation from v1 to v2.1
- Configuration and wiring migration guide
