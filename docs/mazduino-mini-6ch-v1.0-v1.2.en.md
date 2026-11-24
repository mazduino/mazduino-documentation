# Mazduino Mini 6CH (v1.0 - v1.2)

## Overview

Mazduino Mini 6CH v1.0-v1.2 is a compact 6-channel Engine Control Unit designed for use with rusEFI and Speeduino firmware. Built around a powerful 32-bit ARM Cortex-M4 processor, it provides comprehensive engine management in a compact form factor suited to 6-cylinder engines, or 4-cylinder engines with additional high-current outputs.

![Mazduino Mini 6ch](img/mazduino-mini-6ch.jpg)

## Key Features
- Primary trigger input for VR, hall or optical CKP sensors
- Secondary trigger input for VR, hall or optical CMP sensors
- 7 analog inputs (0-5V) for MAP, TPS, IAT, CLT, O2, and 2 spares that can be used for a fuel pressure sensor or other sensors
- 5V sensor power supply with internal fuse protection
- 4 pullup digital inputs for AC Switch, VSS, Clutch, Launch Control
- 8x 3A high-current low-side drivers for high-impedance injectors, idle PWM (ISC), Boost, VVT and more
- 5x low-current low-side drivers for main relay, fuel pump, AC compressor, fan, and tachometer control
- 6x 12V or 5V outputs for ignition coil signals
- Support for an add-on VR Conditioner Module
- Support for an add-on Idle Stepper Module
- 168 MHz ARM Cortex-M4 processor
- Data communication via CANbus
- Data communication via USB Type-C
- Serial RX/TX communication
- 48-pin automotive connector
- SD card for data logging

## Wiring and Installation

### Connector Pin Mapping

Mazduino Mini 6CH uses a 48-pin Yamaha ECU connector with the following pin assignment:

![Mazduino Mini 48-pin Connector](img/mazduino-48p-connector.jpeg)

#### Connector Layout
```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

#### Pin Assignment

| Pin | Function | Description |
|-----|----------|-------------|
| 1 | 12V ECU | ECU main power supply |
| 2 | IDLE1 | Idle control output 1 |
| 3 | IDLE2 | Idle control output 2 |
| 4 | CANH | CAN bus high |
| 5 | 5V | 5V reference output |
| 6 | AC Compressor | AC compressor control |
| 7 | Fuel Pump | Fuel pump relay control |
| 8 | PC13 | Direct MCU pin access |
| 9 | VR-1 | VR conditioner input 1 |
| 10 | VR-2 | VR conditioner input 2 |
| 11 | Stepper B2 | Stepper motor phase B2 |
| 12 | Stepper B1 | Stepper motor phase B1 |
| 13 | Stepper A1 | Stepper motor phase A1 |
| 14 | Stepper A2 | Stepper motor phase A2 |
| 15 | Injector 5 | Injector 5 or spare high-current output |
| 16 | Injector 6 | Injector 6 or spare high-current output |
| 17 | GND ECU | ECU ground |
| 18 | Spare Analog 1 | Spare analog input 1 |
| 19 | VSS | Vehicle speed sensor |
| 20 | AC Switch | AC switch input |
| 21 | CANL | CAN bus low |
| 22 | GND Sensor | Sensor ground |
| 23 | Fan | Fan relay control |
| 24 | Ignition 6 | Ignition channel 6 |
| 25 | Ignition 5 | Ignition channel 5 |
| 26 | Ignition 1 | Ignition channel 1 |
| 27 | Ignition 2 | Ignition channel 2 |
| 28 | Ignition 3 | Ignition channel 3 |
| 29 | Ignition 4 | Ignition channel 4 |
| 30 | TPS | Throttle position sensor |
| 31 | MAP | Manifold absolute pressure |
| 32 | Injector 4 | Injector channel 4 |
| 33 | Main Relay | Main relay control |
| 34 | GND Sensor | Sensor ground |
| 35 | Spare Analog 2 | Spare analog input 2 |
| 36 | Clutch | Clutch position input |
| 37 | GND Sensor | Sensor ground |
| 38 | GND Sensor | Sensor ground |
| 39 | Tacho | Tachometer output |
| 40 | Launch Control | Launch control input |
| 41 | VR1+ | VR sensor 1 positive |
| 42 | VR2+ | VR sensor 2 positive |
| 43 | O2 | Oxygen sensor (1-5V from wideband controller) |
| 44 | IAT | Intake air temperature |
| 45 | CLT | Coolant temperature |
| 46 | Injector 2 | Injector channel 2 |
| 47 | Injector 1 | Injector channel 1 |
| 48 | Injector 3 | Injector channel 3 |

### MCU Pin Mapping

For advanced users and firmware development, this is the STM32F407VGT6 pin assignment:

| Function | MCU Pin |
|----------|---------|
| Ignition Output 1 | PE15 |
| Ignition Output 2 | PE14 |
| Ignition Output 3 | PD13 |
| Ignition Output 4 | PE5 |
| Ignition Output 5 | PE2 |
| Ignition Output 6 | PE3 |
| Injection Output 1 | PD8 |
| Injection Output 2 | PB15 |
| Injection Output 3 | PB14 |
| Injection Output 4 | PB13 |
| Injection Output 5 | PD9 |
| Injection Output 6 | PE8 |
| MAP Sensor | PA0 |
| TPS | PA3 |
| IAT Sensor | PA5 |
| CLT Sensor | PA4 |
| O2 Sensor | PA1 |
| Battery/Voltage Ref | PA2 |
| Analog Spare Input 1 | PB0 |
| Analog Spare Input 2 | PB1 |
| AC Input | PB5 |
| Launch Control Input | PE13 |
| Clutch Input | PB10 |
| VSS | PD7 |
| CKP | PD3 |
| CMP | PD4 |
| Tacho | PC9 |
| Fuel Pump Relay | PC8 |
| FAN Relay | PA15 |
| AC Compressor Relay | PC7 |
| Main Relay | PC6 |
| Idle 1 | PD10 |
| Idle 2 | PE9 |
| Stepper DIR | PD12 |
| Stepper ENBL | PD14 |
| Stepper STEP | PD15 |
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

!!! note "Clutch and TXD3"
    The Clutch input (pin 36) uses PB10, the same pin as TXD3. So while the Clutch input is in use, the TXD3/RXD3 serial port cannot be used at the same time.

### Wiring Notes
- Wiring is compatible with the Speeduino wiring standard
- More sensor wiring information is on the [Speeduino Wiki][speeduino-wiring]

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system

## Module Support

### VR-Conditioner Module
The VR conditioner module (DIP 8) converts VR sensor signals to digital. VR sensors connect to VR1+/VR2+ (pins 41, 42) and VR-1/VR-2 (pins 9, 10).

### Stepper Motor Module
DRV8825 stepper driver module for idle air control. The phase A1/A2 and B1/B2 outputs are on pins 11-14.

## Flexible Injector Configuration
On 4-cylinder engines, Injector 5 and 6 can be used as spare high-current outputs for boost control, VVT control, water/methanol injection, etc.

## Ignition System Requirements
- **Smart coils**: can be connected directly
- **Dumb coils**: need an external IGBT

## Firmware & Configuration Files
The latest rusEFI firmware and TunerStudio configuration files are on the [Download Page](downloads.md).
