# Mazduino Mini 6CH (v1.3B)

## Overview

Mazduino Mini 6CH v1.3B is a revised version of v1.3: a 6-channel Engine Control Unit with a 32-bit **180 MHz ARM Cortex-M4** processor, in a compact form factor suited to 6-cylinder engines, or 4-cylinder engines with additional high-current outputs.

**Improvements in v1.3B over v1.3:**

- **MCU Upgrade**: Uses a 180 MHz ARM Cortex-M4, up from 168 MHz on v1.3
- **Additional Analog Input**: Pin 40 is now a spare analog input (Spare Input 3) for the TPS2 sensor needed for ETB. On v1.3 this pin was the digital launch control input; on v1.3B a launch button still uses pin 40, with the [launch pullup](#pullup-launch)
- **Hardware Optimization**: Unused components removed
- **Component Layout**: Component layout rearranged for better performance and manufacturing

![Mazduino Mini 6ch](img/mazduino-mini-6ch-v1.3B.jpeg)

## Key Features
- Primary trigger input for VR, hall or optical CKP sensors
- Secondary trigger input for VR, hall or optical CMP sensors
- 8 analog inputs (0-5V) for MAP, TPS, IAT, CLT, O2, and 3 spares, including an analog input dedicated to TPS2/ETB, that can be used for a fuel pressure sensor or other sensors
- 5V sensor power supply with internal fuse protection
- 3 pullup digital inputs for AC Switch, VSS and Clutch; a launch control button uses Spare Input 3 (pin 40) with the launch pullup
- 8x 3A high-current low-side drivers for high-impedance injectors, idle PWM (ISC), Boost, VVT and more
- 5x low-current low-side drivers for main relay, fuel pump, AC compressor, fan, and tachometer control
- 6x 12V or 5V outputs for ignition coil signals
- One knock sensor input (pin 8), improved in v1.3B
- Electronic Throttle Body (ETB) control with TPS1 and TPS2
- Support for an add-on VR Conditioner Module
- Support for an add-on Idle Stepper Module
- 180 MHz ARM Cortex-M4 processor
- Data communication via CANbus
- Data communication via USB Type-C
- Serial RX/TX communication
- 48-pin automotive connector
- SD card for data logging

![Mazduino Mini 6ch](img/mazduino-mini6ch-new-case.jpeg)

## Jumper Configuration

Mazduino Mini 6CH v1.3B uses solder jumpers to set hardware functions without changing the firmware. The Tach Pullup, Ignition VDrive and Knock/PC13 solder jumpers are on the back of the board.

![Mazduino Mini 6ch](img/mini6ch/IMG_6232.jpeg)

### Top Configuration Zone (Right)

#### JP11 - Tachometer Pullup
- **Function**: Sets the voltage of the tachometer output signal

- **Options**: 12V or 5V

- **Application**: Match it to what your vehicle's dashboard accepts

#### Ignition VDrive Jumper
- **Function**: Sets the ignition signal voltage for **Smart Coil Only**

- **Options**: 12V or 5V signal. Use 5V for coils with a 5V signal and 12V for coils with a 12V signal

- **Smart Coil Only**: This jumper is only for smart coils with a built-in driver; smart coils can be connected directly

- **IMPORTANT**: Dumb coils need an external IGBT; the VDrive jumper is **not** used for dumb coils

#### Knock/PC13 Input Selection
- **Knock Mode**: Knock sensor input for engine knock detection (default)

- **PC13 Mode**: Direct access to the MCU pin for custom functions

- **v1.3B Improvement**: More stable and accurate knock detection

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper.jpeg)

### Middle Configuration Zone

#### JP5 & JP4 - Sensor Pullup Configuration
- **JP5**: 5V pullup for the CKP (Crankshaft Position) signal

- **JP4**: 5V pullup for the CMP (Camshaft Position) signal

#### JP2 & JP3 - Sensor Type Selection
- **JP2**: CKP signal mode (VR or Hall sensor)

- **JP3**: CMP signal mode (VR or Hall sensor)

![Mazduino Mini 6ch](img/mini6ch/IMG_6230.jpeg)

### Left Configuration Zone

#### JP6 - Stepper Motor Enable
- **Function**: Controls activation of the stepper motor driver (Idle Stepper bypass)

- **Note**: Consult the schematic for the best configuration

- **Application**: High-precision Idle Air Control (IAC)

#### JP7 - Knock Sensor Filter Bypass
- **Function**: Bypass of the internal knock sensor filter

- **JP7**: Bypass of the internal filter for the knock input on the ECU connector (pin 8)

- **JP8**: Not used; this board has a single knock input

- **v1.3B Improvement**: Filter optimized for knock detection sensitivity

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper2.jpeg)

### Pullup Launch
Pullup on the spare input 3 pin (pin 40), used when this pin serves a launch control activation button or another input that needs a pullup. It is marked **PULLUP LNCH** on the board. Bridge this jumper if the launch button switches to ground.

### Jumper Configuration Tips

- **VR Sensors**: Select VR mode (signal goes through the VR Conditioner module) and **remove** the pullup — the pullup loads the VR sensor coil

- **Hall / Optical Sensors**: Select Hall mode and **fit** the pullup (JP5 for CKP, JP4 for CMP). Hall sensors are usually open-collector and cannot produce a HIGH level on their own; without a pullup the trigger pin floats and picks up noise, which causes trigger errors while the engine runs. Only remove the pullup for sensors with a push-pull 5V output

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
| **Knock** | **PC0** |
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

### v1.3B Wiring Notes
- **O2 Sensor**: Pin 43 is dedicated to the O2 sensor, with an optimized analog path (1-5V from a wideband controller)

- **TPS2 Dedicated**: Pin 40 is an additional analog input dedicated to the TPS2/ETB sensor — **new in v1.3B** (unlike v1.3, which uses pin 43 for TPS2)

- **AC Switch Logic**: Pin 20 accepts only GROUND as the ON signal — do not connect 12V directly

- **Knock**: The single knock input on the ECU connector is pin 8 (MCU PC0)

- **References**: More sensor wiring information on the [Speeduino Wiki][speeduino-wiring]

## Hardware Information

Mazduino Mini 6CH v1.3B supports several add-on modules such as the VR Conditioner Module and the Idle Stepper Module. By default, Mazduino Mini 6CH v1.3B only supports CKP and CMP signals in digital form, such as hall and optical sensors. Vehicles that still use a VR sensor need the VR Module added (or the sensor can be changed to a hall sensor).

VR conditioner module (DIP 8): VR sensors connect to VR1+/VR2+ (pins 41, 42) and VR1-/VR2- (pins 9, 10).

![VR Module](img/mini6ch/vr-conditioner-module.jpeg)

For idle, Mazduino Mini 6CH v1.3B already supports Idle PWM: there are 2 low-side outputs that can be used for IDLE PWM control.

Idle Control that uses a stepper motor needs an add-on module, the Idle Stepper Motor Module. A DRV8825 driver can be used here. The phase A1/A2 and B1/B2 outputs are on pins 11-14.

![Stepper Module](img/mini6ch/drv8825-stepper.jpeg)

### Flexible Injector Configuration
On 4-cylinder engines, Injector 5 and 6 can be used as spare high-current outputs for boost control, VVT control, water/methanol injection, etc.

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

- **Configuration Files**: Firmware and configuration files are on the [download page](downloads.md)

## Wiring Diagram

### Sensor Wiring
![Sensor Wiring](img/sensor-wiring.png)

### Injector Wiring
![Injector Wiring](img/injector-wiring.png)

### Ignition Wiring
![Ignition Wiring](img/ignition-wiring.png)

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system
[tunerstudio-dl]: https://www.tunerstudio.com/index.php/downloads
