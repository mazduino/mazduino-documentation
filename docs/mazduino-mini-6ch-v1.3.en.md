# Mazduino Mini 6CH (v1.3)

## Overview

Mazduino Mini 6CH v1.3 is a compact 6-channel Engine Control Unit designed for use with rusEFI and Speeduino firmware. Built around a powerful 32-bit ARM Cortex-M4 processor, it provides comprehensive engine management in a compact form factor suited to 6-cylinder engines, or 4-cylinder engines with additional high-current outputs.

**New Features in v1.3:**

- **Knock Input**: Knock sensor support for engine knock detection

- **ETB (Electronic Throttle Body)**: Integrated electronic throttle control

![Mazduino Mini 6ch](img/mazduino-mini-6ch-v1.3.jpeg)

## Key Features
- Primary trigger input for VR, hall or optical CKP sensors
- Secondary trigger input for VR, hall or optical CMP sensors
- 7 analog inputs (0-5V) for MAP, TPS, IAT, CLT, O2, and 2 spares that can be used for a fuel pressure sensor or other sensors
- 5V sensor power supply with internal fuse protection
- 4 pullup digital inputs for AC Switch, VSS, Clutch, Launch Control
- 8x 3A high-current low-side drivers for high-impedance injectors, idle PWM (ISC), Boost, VVT and more
- 5x low-current low-side drivers for main relay, fuel pump, AC compressor, fan, and tachometer control
- 6x 12V or 5V outputs for ignition coil signals
- **Knock Input (v1.3)**: Knock sensor input for engine knock detection

- **ETB Support (v1.3)**: Electronic Throttle Body control with TPS1 and TPS2

- Support for an add-on VR Conditioner Module
- Support for an add-on Idle Stepper Module
- 168 MHz ARM Cortex-M4 processor
- Data communication via CANbus
- Data communication via USB Type-C
- Serial RX/TX communication
- 48-pin automotive connector
- SD card for data logging

## Jumper Configuration

Mazduino Mini 6CH v1.3 has a solder jumper system that lets you customize functions to suit your application. These jumpers give configuration flexibility without changing the firmware, for good compatibility with a wide range of engine setups.

![Mazduino Mini 6ch](img/mini6ch/IMG_6232.jpeg)

### Top Configuration Zone (Right)

#### JP11 - Tachometer Pullup
- **Function**: Sets the voltage of the tachometer output signal

- **Options**: 12V or 5V

- **Application**: Match it to what your vehicle's dashboard accepts

#### Ignition VDrive Jumper
- **Function**: Sets the ignition signal voltage for **Smart Coil Only**

- **Options**: 12V or 5V signal

- **Smart Coil Only**: This jumper is only for smart coils with a built-in driver

- **IMPORTANT**: Dump coils need an external IGBT

#### Knock/PC13 Input Selection
- **Knock Mode**: Knock sensor input for engine knock detection (default)

- **PC13 Mode**: Direct access to the MCU pin for custom functions

- **New in v1.3**: Integrated knock detection support

![Mazduino Mini 6ch](img/mini6ch/IMG_6229.jpeg)

### Middle Configuration Zone

#### JP5 & JP4 - Sensor Pullup Configuration
- **JP5**: 5V pullup for the CKP (Crankshaft Position) signal

- **JP4**: 5V pullup for the CMP (Camshaft Position) signal

- **Benefit**: Clean, stable trigger signals

#### JP2 & JP3 - Sensor Type Selection
- **JP2**: CKP signal mode (VR or Hall sensor)

- **JP3**: CMP signal mode (VR or Hall sensor)

- **Flexibility**: Compatible with many types of position sensors

![Mazduino Mini 6ch](img/mini6ch/IMG_6230.jpeg)

### Left Configuration Zone

#### JP10 - CAN Bus Controller
- **Function**: Enables the TJA1051T/3 CAN bus IC

- **Application**: High-speed data communication with other devices

- **Protocol**: Supports the automotive CAN 2.0 standard

#### JP6 - Stepper Motor Enable
- **Function**: Controls activation of the stepper motor driver

- **Note**: Consult the schematic for the best configuration

- **Application**: High-precision Idle Air Control (IAC)

#### JP7 & JP8 - Knock Sensor Filter Bypass
- **Function**: Filter bypass for the knock sensor

- **JP7**: Knock channel 1 filter bypass

- **JP8**: Knock channel 2 filter bypass

- **Advanced Feature**: Fine-tuning of knock detection sensitivity

![Mazduino Mini 6ch](img/mini6ch/IMG_6231.jpeg)

### Jumper Configuration Tips

#### Optimal Settings:

- **Smart Coils**: Use VDrive 5V for coils with a 5V signal and 12V for coils with a 12V signal

- **Dump/Conventional Coils**: Require an external IGBT

- **VR Sensors**: Select VR mode (signal goes through the VR Conditioner module) and **remove** the pullup — the pullup loads the VR sensor coil

- **Hall / Optical Sensors**: Select Hall mode and **fit** the pullup (JP5 for CKP, JP4 for CMP). Hall sensors are usually open-collector and cannot produce a HIGH level on their own; without a pullup the trigger pin floats and picks up noise, which causes trigger errors while the engine runs. Only remove the pullup for sensors with a push-pull 5V output

#### Best Practices:

1. **Pre-Installation**: Configure the jumpers before final installation
2. **Documentation**: Write down the jumper configuration for future reference
3. **Testing**: Verify the signals after changing the jumper configuration
4. **Compatibility**: Make sure the jumpers match the hardware you use

#### Special Attention:

- **Coil Type Is Critical**: VDrive is only for smart coils - dump coils need an external IGBT

- **Solder Carefully**: Use the correct soldering temperature

- **Verify Connections**: Make sure the solder joints are solid

- **Consult the Schematic**: Refer to the diagram for advanced configuration

- **Power Off**: Always switch off power when changing jumpers

## Wiring and Installation

### Connector Pin Mapping

Mazduino Mini 6CH v1.3 uses a 48-pin Yamaha ECU connector with the following pin assignment:

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
| 8 | **Knock/PC13** | Knock sensor input (default) or direct MCU pin access |
| 9 | VR-1 | VR conditioner input 1 |
| 10 | VR-2 | VR conditioner input 2 |
| 11 | Stepper B2 | Stepper motor phase B2 |
| 12 | Stepper B1 | Stepper motor phase B1 |
| 13 | Stepper A1 | Stepper motor phase A1 |
| 14 | Stepper A2 | Stepper motor phase A2 |
| 15 | Injector 5 | Injector 5 or spare high-current output |
| 16 | Injector 6 | Injector 6 or spare high-current output |
| 17 | Main Relay | Main relay control (low current low side) |
| 18 | **Spare Analog 1/PPS1** | Spare analog input 1 or Pedal Position Sensor 1 |
| 19 | VSS | Vehicle speed sensor |
| 20 | AC Switch | AC switch input |
| 21 | CANL | CAN bus low |
| 22 | GND | ECU ground |
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
| 33 | **ETB-** | Electronic Throttle Body negative |
| 34 | **ETB+** | Electronic Throttle Body positive |
| 35 | **Spare Analog 2/PPS2** | Spare analog input 2 or Pedal Position Sensor 2 |
| 36 | Clutch | Clutch position input |
| 37 | GND Sensor | Sensor ground |
| 38 | GND Sensor | Sensor ground |
| 39 | Tacho | Tachometer output |
| 40 | Launch Control | Launch control input |
| 41 | VR1+ | VR sensor 1 positive |
| 42 | VR2+ | VR sensor 2 positive |
| 43 | **O2/TPS2** | Oxygen sensor (1-5V from wideband controller) or TPS2 for ETB |
| 44 | IAT | Intake air temperature |
| 45 | CLT | Coolant temperature |
| 46 | Injector 2 | Injector channel 2 |
| 47 | Injector 1 | Injector channel 1 |
| 48 | Injector 3 | Injector channel 3 |

### MCU Pin Mapping

For advanced users and firmware development, this is the STM32F407VGT6 pin assignment for v1.3:

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
| Clutch Input | PE12 |
| VSS | PD7 |
| CKP | PD3 |
| CMP | PD4 |
| **Knock1** | **PC0** |
| **Knock2** | **PC1** |
| **ETB-DIR** | **PB8** |
| **ETB-DIS** | **PB9** |
| **ETB-PWM** | **PA8** |
| Tacho | PC9 |
| Fuel Pump Relay | PC8 |
| FAN Relay | PA15 |
| AC Compressor Relay | PC7 |
| Main Relay | PC5 |
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

### Special Features of v1.3

#### Knock Input (New in v1.3)
- **Pin 8 (Knock/PC13)**: Knock sensor input, set by default with a solder jumper for knock detection

- **Dual Knock Support**: Knock1 (PC0) and Knock2 (PC1) for multi-cylinder monitoring

- **Application**: Engine knock detection for engine protection and ignition timing optimization

#### Electronic Throttle Body (New in v1.3)
- **Pin 33 (ETB-)**: Negative output for ETB control

- **Pin 34 (ETB+)**: Positive output for ETB control

- **Pin 43 (TPS2)**: Second throttle position sensor for ETB (dual TPS)

- **Pin 18/35 (PPS1/PPS2)**: Dual Pedal Position Sensor for ETB control

- **ETB Control**: PWM (PA8), Direction (PB8), Disable (PB9)

#### VR Conditioner Support
- **VR-1 & VR-2**: Input pins for the VR conditioner module (DIP 8)

- **VR1+ & VR2+**: VR sensor positive inputs

#### Stepper Motor Control
- **Stepper A1/A2**: Phase A outputs for the stepper motor (DRV8825)

- **Stepper B1/B2**: Phase B outputs for the stepper motor

- **Direction/Enable/Step**: Control signals for the stepper driver

#### Flexible Injector Configuration
For 4-cylinder engines:

- **Injector 5 & 6**: Can be used as spare high-current outputs

- **Application**: Boost control, VVT control, water/methanol injection, etc.

### Installation Guide
1. **Mounting**: Mount the ECU in a suitable location with adequate cooling
2. **Power Connection**: Connect 12V power (pin 1) and ground (pin 22)
3. **Sensor Ground**: Use several sensor ground pins (37, 38) for clean signals
4. **Engine Position Sensors**: Connect the CKP/CMP sensors or use the VR inputs as needed
5. **Knock Sensor**: Connect the knock sensor to pin 8 (default configuration)
6. **ETB Setup**: Connect the ETB to pins 33/34 and TPS2 to pin 43 if you use an electronic throttle
7. **Module Installation**: Install the VR-Conditioner and/or Stepper module if needed
8. **Verification**: Test all connections before the first startup

### Wiring Notes
- **Multiple Ground**: Use all available ground pins for optimal signal integrity

- **5V Reference**: Pin 5 provides a 5V reference for sensors that need it

- **O2/TPS2 Sensor**: Pin 43 can be used for the O2 sensor or for TPS2 for the ETB

- **VR Sensors**: Can use the digital input or the VR conditioner module input

- **Knock Sensor**: Pin 8 is set by default to knock input with a solder jumper

- **ETB Wiring**: The ETB needs a dual connection (pins 33/34) and dual TPS (pins 30/43)

- **Yamaha Connector**: Professional automotive-grade 48-pin connector

- **Wiring Compatibility**: Compatible with the Speeduino wiring standard

- **References**: More sensor wiring information on the [Speeduino Wiki][speeduino-wiring]

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system

## Important Notes

### Ignition System Requirements
- **Smart Coils**: Direct connection supported — select VDrive 5V or 12V to match the coil specification

- **Dump Coils**: External IGBT required; the VDrive jumper is **not** used for dump coils

**[Download firmware and configuration files](downloads.md)**
