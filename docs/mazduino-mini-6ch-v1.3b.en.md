# Mazduino Mini 6CH (v1.3B)

## Overview

Mazduino Mini 6CH v1.3B is a revised and improved version of v1.3, designed as a better-optimized 6-channel Engine Control Unit. Built around a more powerful 32-bit **180 MHz ARM Cortex-M4** processor, it provides comprehensive engine management in a compact form factor suited to 6-cylinder engines, or 4-cylinder engines with additional high-current outputs.

**Improvements in v1.3B over v1.3:**

- **MCU Upgrade**: Uses a 180 MHz ARM Cortex-M4, up from 168 MHz on v1.3

- **Additional Analog Input**: Adds 1 spare analog input dedicated to the TPS2 sensor needed for ETB

- **Hardware Optimization**: Unused components removed and optimized for better efficiency

- **Component Layout**: Component layout rearranged for better performance and manufacturing

- **Improved ETB Support**: Electronic Throttle Body support with a dedicated TPS2 analog input

- **Design Efficiency**: A more streamlined design focused on the functions that are needed

![Mazduino Mini 6ch](img/mazduino-mini-6ch-v1.3B.jpeg)

## Key Features
- Primary trigger input for VR, hall or optical CKP sensors
- Secondary trigger input for VR, hall or optical CMP sensors
- 8 analog inputs (0-5V) for MAP, TPS, IAT, CLT, O2, and 3 spares, including an analog input dedicated to TPS2/ETB, that can be used for a fuel pressure sensor or other sensors
- 5V sensor power supply with internal fuse protection
- 4 pullup digital inputs for AC Switch, VSS, Clutch, Launch Control
- 8x 3A high-current low-side drivers for high-impedance injectors, idle PWM (ISC), Boost, VVT and more
- 5x low-current low-side drivers for main relay, fuel pump, AC compressor, fan, and tachometer control
- 6x 12V or 5V outputs for ignition coil signals
- **Knock Input (v1.3B)**: Improved knock sensor input for engine knock detection

- **ETB Support (v1.3B)**: Optimized Electronic Throttle Body control with TPS1 and TPS2

- Support for an add-on VR Conditioner Module
- Support for an add-on Idle Stepper Module
- **180 MHz ARM Cortex-M4 processor** - **Upgrade from v1.3**

- Data communication via CANbus
- Data communication via USB Type-C
- Serial RX/TX communication
- 48-pin automotive connector
- SD card for data logging

![Mazduino Mini 6ch](img/mazduino-mini6ch-new-case.jpeg)

## Jumper Configuration

Mazduino Mini 6CH v1.3B has a solder jumper system that lets you customize functions to suit your application. These jumpers give configuration flexibility without changing the firmware, for good compatibility with a wide range of engine setups.

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

- **v1.3B Improvement**: More stable and accurate knock detection

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper.jpeg)

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

#### JP6 - Stepper Motor Enable
- **Function**: Controls activation of the stepper motor driver

- **Note**: Consult the schematic for the best configuration

- **Application**: High-precision Idle Air Control (IAC)

#### JP7 & JP8 - Knock Sensor Filter Bypass
- **Function**: Bypass of the internal knock sensor filter

- **JP7**: Bypass of internal knock filter stage 1

- **JP8**: Bypass of internal knock filter stage 2

- **v1.3B Improvement**: Filter optimized for knock detection sensitivity

- **Note**: For the single knock input on the ECU connector (pin 8)

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper2.jpeg)

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

Mazduino Mini 6CH v1.3B uses a 48-pin Yamaha ECU connector with the following revised pin assignment:

![Mazduino Mini 48-pin Connector](img/mazduino-48p-connector.jpeg)

#### Connector Layout
```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

#### Pin Assignment (v1.3B)

| Pin | Function | Description |
|-----|----------|-------------|
| 1 | 12V ECU | ECU main power supply |
| 2 | IDLE1 | Idle control output 1 |
| 3 | IDLE2 | Idle control output 2 |
| 4 | CANH | CAN bus high |
| 5 | 5V | 5V reference output |
| 6 | AC-OUT / AC COMPRESOR | AC compressor control |
| 7 | FUEL PUMP | Fuel pump relay control |
| 8 | **Knock/PC13** | Knock sensor input (default) or direct MCU pin access |
| 9 | VR1- | VR conditioner input 1 negative |
| 10 | VR2- | VR conditioner input 2 negative |
| 11 | Stepper B2 | Stepper motor phase B2 |
| 12 | Stepper B1 | Stepper motor phase B1 |
| 13 | Stepper A1 | Stepper motor phase A1 |
| 14 | Stepper A2 | Stepper motor phase A2 |
| 15 | Injector 5 | Injector 5 or spare high-current output |
| 16 | Injector 6 | Injector 6 or spare high-current output |
| 17 | Main Relay | Main relay control (low current low side) |
| 18 | **Spare Analog Input 1 / PPS1** | Spare analog input 1 or Pedal Position Sensor 1 for ETB |
| 19 | VSS | Vehicle Speed Sensor |
| 20 | **AC-IN / AC Switch** | AC switch input (accepts only **GROUND** as the ON signal) |
| 21 | CANL | CAN bus low |
| 22 | **GND** | ECU ground |
| 23 | FAN | Fan relay control |
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
| 35 | **Spare Analog Input 2 / PPS2** | Spare analog input 2 or Pedal Position Sensor 2 for ETB |
| 36 | Clutch | Clutch position input |
| 37 | **GND Sensor** | Sensor ground |
| 38 | **GND Sensor** | Sensor ground |
| 39 | **RPM / Tacho** | Tachometer output |
| 40 | **Spare Input 3 / TPS2** | Spare input 3 or TPS2 for ETB |
| 41 | VR1+ | VR sensor 1 positive |
| 42 | VR2+ | VR sensor 2 positive |
| 43 | **O2** | Oxygen sensor (5V analog, from the 1-5V analog output of a wideband controller) |
| 44 | IAT | Intake air temperature |
| 45 | CLT | Coolant temperature |
| 46 | Injector 2 | Injector channel 2 |
| 47 | Injector 1 | Injector channel 1 |
| 48 | Injector 3 | Injector channel 3 |

### MCU Pin Mapping (v1.3B)

Revised **STM32F427VGT6** pin assignment for v1.3B:

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
| Battery/Voltage Reff | PA7 |
| Analog Spare Input 1 | PB0 |
| Analog Spare Input 2 | PB1 |
| **Analog Spare Input 3** | **PA2** |
| AC Input | PB5 |
| Clutch Input | PE12 |
| VSS | PD7 |
| CKP | PD3 |
| CMP | PD4 |
| Tacho | PC9 |
| Fuelpump Relay | PC8 |
| FAN Relay | PA15 |
| AC Compresor Relay | PC7 |
| Main Relay | PC5 |
| Idle 1 | PD10 |
| Idle 2 | PE9 |
| Stepper DIR | PD12 |
| Stepper ENBL | PD14 |
| Stepper STEP | PD15 |
| **Knock1** | **PC0** |
| **Knock2** | **PC1** |
| **ETB-DIR** | **PB8** |
| **ETB-DIS** | **PB9** |
| **ETB-PWM** | **PA8** |
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

### Special Features of v1.3B

#### Knock Input (Improved in v1.3B)
- **Pin 8 (Knock/PC13)**: Knock sensor input, set by default with a solder jumper, for more accurate knock detection

- **Single Knock Input**: One knock input (PC0) on the ECU connector for engine knock monitoring

- **Application**: More sensitive engine knock detection for engine protection and ignition timing optimization

- **Improvement**: Optimized filter and sensitivity

#### Electronic Throttle Body (Optimized in v1.3B)
- **Pin 33 (ETB-)**: Negative output for ETB control

- **Pin 34 (ETB+)**: Positive output for ETB control

- **Pin 40 (TPS2)**: Analog input dedicated to the TPS2 sensor for ETB - **New in v1.3B**

- **Pin 18/35 (PPS1/PPS2)**: Dual Pedal Position Sensor for ETB control

- **ETB Control**: PWM (PA8), Direction (PB8), Disable (PB9)

- **v1.3B Improvement**: Added dedicated analog input for TPS2 and optimized ETB hardware

#### v1.3B Hardware Improvements
- **Additional Analog Input**: 1 analog input added on pin 40, dedicated to the TPS2/ETB sensor

- **Component Optimization**: Unused components removed for design efficiency

- **Component Layout**: Layout rearranged for better manufacturing and performance

- **Pin 43**: Dedicated to the O2 sensor, with an optimized analog path

- **AC Switch**: Clarification that it accepts only a GROUND signal for ON

#### VR Conditioner Support
- **VR1- & VR2-**: Input pins for the VR conditioner module (DIP 8) - negative

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
6. **ETB Setup**: Connect the ETB to pins 33/34 and TPS2 to pin 40 (changed from v1.3) if you use an electronic throttle
7. **AC Switch**: Make sure the AC switch gives only a GROUND signal for the ON state
8. **Module Installation**: Install the VR-Conditioner and/or Stepper module if needed
9. **Verification**: Test all connections before the first startup

### v1.3B Wiring Notes
- **O2 Sensor**: Pin 43 is dedicated to the O2 sensor, with an optimized analog path (1-5V from a wideband controller)

- **TPS2 Dedicated**: Pin 40 is an additional analog input dedicated to the TPS2/ETB sensor — **new in v1.3B** (unlike v1.3, which uses pin 43 for TPS2)

- **AC Switch Logic**: Pin 20 accepts only GROUND as the ON signal — do not connect 12V directly

- **References**: More sensor wiring information on the [Speeduino Wiki][speeduino-wiring]

## Hardware Information

Mazduino Mini 6CH v1.3B is designed with a **180 MHz ARM Cortex-M4** as the main MCU, giving higher performance than v1.3. It supports several add-on modules such as the VR Conditioner Module and the Idle Stepper Module. By default, Mazduino Mini 6CH v1.3B only supports CKP and CMP signals in digital form, such as hall and optical sensors. Vehicles that still use a VR sensor need the VR Module added (or the sensor can be changed to a hall sensor).

![VR Module](img/mini6ch/vr-conditioner-module.jpeg)

For idle, Mazduino Mini 6CH v1.3B already supports Idle PWM: there are 2 low-side MOSFET outputs that can be used for IDLE PWM control.

Idle Control that uses a stepper motor needs an add-on module, the Idle Stepper Motor Module. A DRV8825 driver can be used here.

![Stepper Module](img/mini6ch/drv8825-stepper.jpeg)

There are also solder jumpers on the back, such as Tach Pullup, Ignition Vdrive, and the knock / MCU PC13 option. Then there are JP4, JP5, JP2, JP3, JP6, JP7 and JP8, which are explained in the jumper configuration section.

**v1.3B Solder Jumpers:**

- **Tach Pullup:** Pullup for the tachometer/RPM speedometer, using 12V or 5V

- **Ignition Vdrive:** Voltage used to send the signal to the Coil On Plug (12V or 5V)

- **Knock/MCU PC13:** Option for Knock sensor input or direct connection to MCU pin PC13 (default is Knock)

- **JP5:** CKP/Primary trigger pullup

- **JP4:** CMP/Secondary trigger pullup

- **JP2:** VR or Hall option for CKP/Primary

- **JP3:** VR or Hall option for CMP/Secondary

- **JP6:** Idle Stepper bypass

- **JP7 & JP8:** Knock filter bypass (improved in v1.3B)

- **Pullup Launch:** Used as the pullup for the spare input 3 pin when it is used for a launch control activation button or another input that needs a pullup

## Software Tuning

### Download Software
Download the TunerStudio software: [TunerStudio Downloads][tunerstudio-dl]

![TunerStudio](img/manual/ts-download-page-overview.png)

### v1.3B-Specific Configuration
- **Knock Detection**: Use the knock sensor configuration optimized for v1.3B

- **ETB Setup**: Configure TPS2 on pin 40 (not pin 43 as on v1.3)

- **AC Switch Logic**: Make sure the AC switch configuration uses GROUND logic for ON

- **Pin Mapping**: Use the pin mapping configuration file made for v1.3B

### Firmware Support
- **rusEFI**: Full support for v1.3B with the revised pin mapping

- **Speeduino**: Compatible with the latest pin mapping configuration

- **Configuration Files**: Available on the [download page](downloads.md)

## Wiring Diagram

### Sensor Wiring
![Sensor Wiring](img/sensor-wiring.png)

*Note: Make sure the AC Switch uses only a GROUND signal for the ON state*

### Injector Wiring
![Injector Wiring](img/injector-wiring.png)

### Ignition Wiring
![Ignition Wiring](img/ignition-wiring.png)

## Important Notes v1.3B

### Ignition System Requirements
- **Smart Coils**: Direct connection supported — select VDrive 5V or 12V to match the coil specification

- **Dump Coils**: External IGBT required; the VDrive jumper is **not** used for dump coils

### ETB (v1.3B)
- TPS2 uses pin 40 (not pin 43 as on v1.3) — make sure the firmware configuration uses the correct pin

### Knock Detection (v1.3B)
- One knock input on the ECU connector (pin 8, MCU PC0); improved filter compared with v1.3

**[Download firmware and configuration files](downloads.md)**

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system
[tunerstudio-dl]: https://www.tunerstudio.com/index.php/downloads
