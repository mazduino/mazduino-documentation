# Mazduino Mini 6CH (v1.3C)

## Overview

Mazduino Mini 6CH v1.3C is the **latest production version** of the Mini 6CH line, a refined and improved version of v1.3B as a more capable 6-channel Engine Control Unit. Built around a powerful 32-bit **ARM Cortex-M4 180 MHz** processor, it provides comprehensive engine management in a compact form factor suited to 6-cylinder engines, or 4-cylinder engines with additional high-current outputs.

**v1.3C improvements over v1.3B:**

- **MCU Pin Optimization**: TPS moved to PA6 and Battery/Voltage Reference moved to PA7 for better signal routing

- **Single Knock Input**: Consolidated from 2 knock inputs (PC0, PC1) to 1 more efficient knock input (PA3)

- **Separate Ignition VDrive**: Two separate VDrive jumpers, one for ignition channels 1-4 and one for ignition channels 5-6, for more flexible voltage configuration

- **Channel Flexibility**: 6 ignition channels and 6 injection channels, all configurable to suit the application

![Mazduino Mini 6ch](img/mazduino-mini-6ch-v1.3B.jpeg)

## Key Features
- Primary trigger input for VR, hall or optical CKP sensors
- Secondary trigger input for VR, hall or optical CMP sensors
- 8 analog inputs (0-5V) for MAP, TPS, IAT, CLT, O2, and 3 spares, including a dedicated analog input for TPS2/ETB that can be used for a fuel pressure sensor or other sensors
- 5V sensor power supply with internal fuse protection
- 4 pullup digital inputs for AC Switch, VSS, Clutch, Launch Control
- 8x 3A high-current low-side drivers for high-impedance injectors, idle PWM (ISC), Boost, VVT and more
- 5x low-current low-side drivers for main relay, fuel pump, AC compressor, fan, and tachometer control
- **6x ignition outputs** with separate VDrive for channels 1-4 and channels 5-6 (each configurable for 5V or 12V)
- **Knock Input (v1.3C)**: One optimized knock sensor input (PA3)

- **ETB Support**: Electronic Throttle Body control with TPS1 and TPS2

- Support for an add-on VR Conditioner Module
- Support for an add-on Idle Stepper Module
- **180 MHz ARM Cortex-M4 processor**

- Data communication via CANbus
- Data communication via USB Type-C
- Serial RX/TX communication
- 48-pin automotive connector
- SD card for data logging

![Mazduino Mini 6ch](img/mazduino-mini6ch-new-case.jpeg)

## 6CH Channel Configuration

Mazduino Mini 6CH v1.3C has 6 ignition channels and 6 injection channels, all configurable to suit the application.

### Ignition Channel (6x)

| Channel | Default Use | Alternative Use |
|---------|-------------------|----------------------|
| Ignition 1-4 | Ignition channels for cylinders 1-4 | — |
| Ignition 5-6 | Ignition channels for cylinders 5-6 | 5V or 12V switching control (on/off or PWM) |

On 4-cylinder engines, **ignition channels 5 and 6 can be used as switching control outputs** (5V or 12V), depending on the VDrive 5-6 jumper setting on the bottom of the PCB.

### Injection Channel (6x)

| Channel | Default Use | Alternative Use |
|---------|-------------------|----------------------|
| Injector 1-4 | Injector channels for cylinders 1-4 | — |
| Injector 5-6 | Injector channels for cylinders 5-6 | Spare high-current low-side output |

On 4-cylinder engines, **injector channels 5 and 6 can be used as low-side outputs** for on/off solenoids, boost control, VVT, water/methanol injection, or other PWM control.

## Jumper Configuration

Mazduino Mini 6CH v1.3C has a system of solder jumpers that lets you customize functions to suit your application. The jumpers give you configuration flexibility without changing the firmware, so the board works with a wide range of engine setups.

![Mazduino Mini 6ch](img/mini6ch/IMG_6232.jpeg)

### Top Configuration Zone (Right)

#### JP11 - Tachometer Pullup
- **Function**: Sets the voltage of the tachometer output signal

- **Options**: 12V or 5V

- **Application**: Match it to what your vehicle's dashboard accepts

#### Ignition VDrive 1-4 Jumper
- **Function**: Sets the ignition signal voltage for channels **Ignition 1, 2, 3, 4** — Smart Coil Only

- **Options**: 12V or 5V signal

- **Smart Coil Only**: This jumper is only for smart coils with a built-in driver

- **Alternative**: When channels 1-4 are used for 4-cylinder ignition, channels 5-6 stay independent

- **IMPORTANT**: Dump coils require an external IGBT

#### Ignition VDrive 5-6 Jumper *(New in v1.3C)*
- **Function**: Sets the signal voltage for channels **Ignition 5 and 6** **separately** from channels 1-4

- **Options**: 12V or 5V signal

- **Flexibility**: Channels 5-6 can be set to a different voltage than channels 1-4

- **Alternative Use**: When used as switching control, match the voltage (5V or 12V) to the load

- **Location**: Bottom of the PCB (see jumper photo)

- **IMPORTANT**: Dump coils require an external IGBT

#### Knock/PC13 Input Selection
- **Knock Mode**: Knock sensor input for engine knock detection (default)

- **PC13 Mode**: Direct access to the MCU pin for custom functions

- **v1.3C**: One optimized knock input on MCU pin PA3

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper.jpeg)

### Middle Configuration Zone

#### JP5 & JP4 - Sensor Pullup Configuration
- **JP5**: 5V pullup for the CKP (Crankshaft Position) signal

- **JP4**: 5V pullup for the CMP (Camshaft Position) signal

- **Benefit**: Clean, stable trigger signals

#### JP2 & JP3 - Sensor Type Selection
- **JP2**: CKP signal mode (VR or Hall sensor)

- **JP3**: CMP signal mode (VR or Hall sensor)

- **Flexibility**: Works with many types of position sensors

![Mazduino Mini 6ch](img/mini6ch/IMG_6230.jpeg)

### Left Configuration Zone

#### JP6 - Stepper Motor Enable
- **Function**: Controls enabling of the stepper motor driver

- **Note**: Consult the schematic for the optimal configuration

- **Application**: High-precision Idle Air Control (IAC)

#### JP7 & JP8 - Knock Sensor Filter Bypass
- **Function**: Bypasses the internal filter for the knock sensor

- **JP7**: Bypasses internal knock filter stage 1

- **JP8**: Bypasses internal knock filter stage 2

- **Note**: For the single knock input on the ECU connector (pin 8)

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper2.jpeg)

### Jumper Configuration Tips

#### Optimal Settings:

- **Smart Coils 1-4**: Set VDrive 1-4 to match the coil specification (5V or 12V)

- **Smart Coils 5-6**: Set VDrive 5-6 to match the coil specification or the alternative load — **it can differ from 1-4**

- **Dump/Conventional Coils**: Require an external IGBT

- **VR Sensors**: Select VR mode (signal goes through the VR Conditioner module) and **remove** the pullup — a pullup loads the VR sensor coil

- **Hall / Optical Sensors**: Select Hall mode and **fit** the pullup (JP5 for CKP, JP4 for CMP). Hall sensors are usually open-collector and cannot drive a HIGH level on their own; without a pullup the trigger pin floats and picks up noise, which causes trigger errors while the engine is running. Remove the pullup only for sensors with a 5V push-pull output

#### Best Practices:

1. **Pre-Installation**: Configure the jumpers before final installation
2. **Separate VDrive**: Use the independent VDrive 5-6 for mixed-voltage applications
3. **Documentation**: Write down your jumper configuration for future reference
4. **Testing**: Verify the signals after changing any jumper
5. **Compatibility**: Make sure the jumpers match the hardware you are using

#### Special Attention:

- **Coil Type Is Critical**: VDrive is only for smart coils - dump coils need an external IGBT

- **Separate VDrive**: VDrive 1-4 and VDrive 5-6 are **different** jumpers on the bottom of the PCB

- **Solder Carefully**: Use the correct soldering temperature

- **Verify Connections**: Make sure the solder joints are solid

- **Consult the Schematic**: Refer to the diagrams for advanced configuration

- **Power Off**: Always switch off power when changing jumpers

## Wiring and Installation

### Connector Pin Mapping

Mazduino Mini 6CH v1.3C uses a 48-pin Yamaha ECU connector with the following pin assignment:

![Mazduino Mini 48-pin Connector](img/mazduino-48p-connector.jpeg)

#### Connector Layout
```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

#### Pin Assignment (v1.3C)

| Pin | Function | Description |
|-----|----------|-------------|
| 1 | 12V ECU | Main ECU power supply |
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
| 15 | Injector 5 | Injector 5 or spare high-current low-side output |
| 16 | Injector 6 | Injector 6 or spare high-current low-side output |
| 17 | Main Relay | Main relay control (low current low side) |
| 18 | **Spare Analog Input 1 / PPS1** | Spare analog input 1 or Pedal Position Sensor 1 for ETB |
| 19 | VSS | Vehicle Speed Sensor |
| 20 | **AC-IN / AC Switch** | AC switch input (accepts **GROUND** only as the ON signal) |
| 21 | CANL | CAN bus low |
| 22 | **GND** | ECU ground |
| 23 | FAN | Fan relay control |
| 24 | **Ignition 6** | Ignition channel 6 or switching control (5V/12V per VDrive 5-6) |
| 25 | **Ignition 5** | Ignition channel 5 or switching control (5V/12V per VDrive 5-6) |
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
| 43 | **O2** | Oxygen sensor (5V analog, from a wideband controller 1-5V analog output) |
| 44 | IAT | Intake air temperature |
| 45 | CLT | Coolant temperature |
| 46 | Injector 2 | Injector channel 2 |
| 47 | Injector 1 | Injector channel 1 |
| 48 | Injector 3 | Injector channel 3 |

### MCU Pin Mapping (v1.3C)

Optimized **STM32F427VGT6** pin assignment for v1.3C:

| Function | MCU Pin | Change from v1.3B |
|----------|---------|----------------------|
| Ignition Output 1 | PE15 | — |
| Ignition Output 2 | PE14 | — |
| Ignition Output 3 | PD13 | — |
| Ignition Output 4 | PE5 | — |
| Ignition Output 5 | PE2 | — |
| Ignition Output 6 | PE3 | — |
| Injection Output 1 | PD8 | — |
| Injection Output 2 | PB15 | — |
| Injection Output 3 | PB14 | — |
| Injection Output 4 | PB13 | — |
| Injection Output 5 | PD9 | — |
| Injection Output 6 | PE8 | — |
| MAP Sensor | PA0 | — |
| **TPS** | **PA6** | **Moved from PA3** |
| IAT Sensor | PA5 | — |
| CLT Sensor | PA4 | — |
| O2 Sensor | PA1 | — |
| **Battery/Voltage Reff** | **PA7** | **Moved from PA6** |
| Analog Spare Input 1 | PB0 | — |
| Analog Spare Input 2 | PB1 | — |
| Analog Spare Input 3 | PA2 | — |
| AC Input | PB5 | — |
| Clutch Input | PE12 | — |
| VSS | PD7 | — |
| CKP | PD3 | — |
| CMP | PD4 | — |
| Tacho | PC9 | — |
| Fuelpump Relay | PC8 | — |
| FAN Relay | PA15 | — |
| AC Compresor Relay | PC7 | — |
| Main Relay | PC5 | — |
| Idle 1 | PD10 | — |
| Idle 2 | PE9 | — |
| Stepper DIR | PD12 | — |
| Stepper ENBL | PD14 | — |
| Stepper STEP | PD15 | — |
| **Knock** | **PA3** | **From PC0+PC1 to a single PA3 input** |
| ETB-DIR | PB8 | — |
| ETB-DIS | PB9 | — |
| ETB-PWM | PA8 | — |
| TXD1 | PA9 | — |
| RXD1 | PA10 | — |
| TXD3 | PB10 | — |
| RXD3 | PB11 | — |
| TXCAN | PD1 | — |
| RXCAN | PD0 | — |
| SD CS | PD2 | — |
| SPI3 CLK | PC10 | — |
| SPI3 MISO | PC11 | — |
| SPI3 MOSI | PC12 | — |

### v1.3C Special Features

#### Flexible Channel Configuration

**Ignition 6-Channel:**

- **6-cylinder**: Use all channels 1-6 for engine ignition

- **4-cylinder**: Channels 1-4 for ignition, channels 5-6 available as **switching control**

- **Channels 5-6 Alternative**: 5V or 12V switching output per VDrive 5-6, usable for controlling solenoids, relays, or other loads

- **Separate VDrive**: Channels 1-4 and 5-6 have **independent** voltage settings

**Injection 6-Channel:**

- **6-cylinder**: Use all channels 1-6 for engine injectors

- **4-cylinder**: Channels 1-4 for injectors, channels 5-6 available as **spare low-side outputs**

- **Channels 5-6 Alternative**: 3A low-side outputs for boost control, VVT, on/off solenoids, water/methanol injection, or other PWM applications

#### Knock Input (Optimized in v1.3C)
- **Pin 8 (Knock/PC13)**: Knock sensor input with the default solder jumper

- **Single Knock Input**: One knock input (**PA3**), consolidated from the two inputs (PC0 + PC1) on v1.3B

- **Application**: Engine knock detection for engine protection and ignition timing optimization

#### Electronic Throttle Body (ETB)
- **Pin 33 (ETB-)**: Negative output for ETB control

- **Pin 34 (ETB+)**: Positive output for ETB control

- **Pin 40 (TPS2)**: Dedicated analog input for the ETB's TPS2 sensor

- **Pin 18/35 (PPS1/PPS2)**: Dual Pedal Position Sensor for ETB control

- **ETB Control**: PWM (PA8), Direction (PB8), Disable (PB9)

#### Separate Ignition VDrive (New in v1.3C)
- **VDrive 1-4**: Solder jumper for the signal voltage of ignition channels 1, 2, 3, 4 (5V or 12V)

- **VDrive 5-6**: **Separate** solder jumper for the signal voltage of ignition channels 5 and 6 (5V or 12V)

- **Location**: Both are on the **bottom of the PCB**

- **Flexibility**: Lets channels 5-6 be set to a different voltage than channels 1-4, as the application requires

#### VR Conditioner Support
- **VR1- & VR2-**: Input pins for the VR conditioner module (DIP 8) - negative

- **VR1+ & VR2+**: Positive VR sensor inputs

#### Stepper Motor Control
- **Stepper A1/A2**: Phase A outputs for the stepper motor (DRV8825)

- **Stepper B1/B2**: Phase B outputs for the stepper motor

- **Direction/Enable/Step**: Control signals for the stepper driver

### Installation Guide
1. **Mounting**: Mount the ECU in a suitable location with adequate cooling
2. **Power Connection**: Connect 12V power (pin 1) and ground (pin 22)
3. **Sensor Ground**: Use the multiple sensor ground pins (37, 38) for clean signals
4. **Engine Position Sensors**: Connect the CKP/CMP sensors, or use the VR inputs as needed
5. **Knock Sensor**: Connect the knock sensor to pin 8 (default configuration)
6. **ETB Setup**: Connect the ETB to pins 33/34 and TPS2 to pin 40 if using an electronic throttle
7. **AC Switch**: Make sure the AC switch only provides a GROUND signal for the ON state
8. **VDrive Configuration**: Set the VDrive 1-4 and VDrive 5-6 jumpers separately on the bottom of the PCB to match the coil type or load
9. **Spare Channels**: Configure injector channels 5-6 and/or ignition channels 5-6 as the application requires
10. **Module Installation**: Fit the VR-Conditioner and/or Stepper modules if needed
11. **Verification**: Test all connections before the first startup

### v1.3C Wiring Notes
- **Separate VDrive**: The VDrive 1-4 and VDrive 5-6 jumpers are on the **bottom of the PCB** — configure them before final installation

- **AC Switch Logic**: Pin 20 accepts GROUND only as the ON signal — do not connect 12V directly

- **TPS MCU Pin**: TPS uses PA6 (not PA3 as on v1.3B) — make sure the firmware configuration is correct

- **Spare Channels**: Pins 15-16 (Injector 5-6) and Pins 24-25 (Ignition 5-6) are available for alternative use on 4-cylinder engines

- **Reference**: More sensor wiring information on the [Speeduino Wiki][speeduino-wiring]

## Hardware Information

Mazduino Mini 6CH v1.3C is designed around an **ARM Cortex-M4 180 MHz** as the main MCU, delivering high performance at a 180MHz clock. It supports several add-on modules such as the VR Conditioner Module and the Idle Stepper Module. By default, Mazduino Mini 6CH v1.3C only supports digital CKP and CMP signals, such as hall and optical sensors. Vehicles that still use VR sensors need the VR Module added (or the sensor can be converted to hall).

![VR Module](img/mini6ch/vr-conditioner-module.jpeg)

For idle, Mazduino Mini 6CH v1.3C supports Idle PWM, with 2 low-side MOSFET outputs that can be used for IDLE PWM control.

Idle Control with a stepper motor requires an add-on module, the Idle Stepper Motor Module. A DRV8825 driver can be used here.

![Stepper Module](img/mini6ch/drv8825-stepper.jpeg)

There are solder jumpers on the back of the PCB:

**v1.3C Solder Jumpers:**

- **Tach Pullup:** Pullup for the tachometer/RPM Speedometer, using 12V or 5V

- **Ignition VDrive 1-4:** Signal voltage for Ignition channels 1, 2, 3, 4 (12V or 5V)

- **Ignition VDrive 5-6:** Signal voltage for Ignition channels 5 and 6 (12V or 5V) — **separate from the 1-4 jumper**

- **Knock/MCU PC13:** Selects the Knock sensor input or a direct connection to MCU pin PC13 (default is Knock)

- **JP5:** CKP/Primary trigger pullup

- **JP4:** CMP/Secondary trigger pullup

- **JP2:** VR or Hall option for CKP/Primary

- **JP3:** VR or Hall option for CMP/Secondary

- **JP6:** Idle Stepper bypass

- **JP7 & JP8:** Knock filter bypass

- **Pullup Launch:** Pullup on the spare input 3 pin when it is used for a launch control activation button or another input that needs a pullup

## Software Tuning

### Download Software
Download TunerStudio: [TunerStudio Downloads][tunerstudio-dl]

![TunerStudio](img/manual/ts-download-page-overview.png)

### v1.3C-Specific Configuration
- **TPS Pin**: Make sure the TPS configuration uses **PA6** (not PA3 as on v1.3B)

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system
[tunerstudio-dl]: https://www.tunerstudio.com/index.php/downloads

- **Battery/VRef Pin**: Make sure the Battery/Voltage Reference configuration uses **PA7**

- **Knock Detection**: Use **PA3** for the single knock sensor configuration

- **ETB Setup**: Configure TPS2 on pin 40

- **AC Switch Logic**: Make sure the AC switch configuration uses GROUND logic for ON

- **Pin Mapping**: Use the v1.3C-specific pin mapping configuration file

### Firmware Support
- **rusEFI**: Full support for v1.3C with the updated pin mapping

- **Speeduino**: Not supported on v1.3C — use rusEFI

- **Configuration Files**: Available on the [downloads page](downloads.md)

## Wiring Diagram

### Sensor Wiring
![Sensor Wiring](img/sensor-wiring.png)

*Note: Make sure the AC Switch only uses a GROUND signal for the ON state*

### Injector Wiring
![Injector Wiring](img/injector-wiring.png)

### Ignition Wiring
![Ignition Wiring](img/ignition-wiring.png)

## v1.3C Important Notes

### Ignition System Requirements
- **Smart Coils**: Direct connection supported — VDrive 1-4 and VDrive 5-6 can be set to different voltages (5V or 12V per group)

- **Dump Coils**: External IGBT required; the VDrive jumpers are **not** used for dump coils

### Migrating from v1.3B
- **TPS**: Update to **PA6** (from PA3) — must be changed in the firmware configuration

- **Battery/VRef**: Update to **PA7** (from PA6) — follows the TPS change

- **Knock**: Only one input (**PA3**) — remove the second knock configuration if present

- **VDrive**: Reconfigure the VDrive 1-4 and VDrive 5-6 jumpers separately on the bottom of the PCB

**[Download firmware and configuration files](downloads.md)**

## Wiring Harness

Per-pin wire size recommendations for Mazduino Mini 6CH v1.3C, with a count of wires for each size, are in [Harness Wire Size Recommendations](rekomendasi-ukuran-kabel.md).
