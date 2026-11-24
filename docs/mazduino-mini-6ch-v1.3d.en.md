# Mazduino Mini 6CH (v1.3D)

## Overview

Mazduino Mini 6CH v1.3D is the Mini 6CH version before [v1.3E](mazduino-mini-6ch-v1.3e.md), the current production version. Functionally this board is exactly the same as v1.3C — what changed are the analog sensor readings and the CAN termination. This compact board uses a 32-bit **ARM Cortex-M4 180 MHz** processor and suits 6-cylinder engines, or 4-cylinder engines with additional high-current outputs.

**v1.3D changes from v1.3C:**

- **More Stable Analog Sensor Readings**: All analog inputs read more steadily and consistently than on v1.3C

- **Onboard CAN Termination**: A **fixed 120 Ω** resistor between CANH and CANL (pins 4 and 21). See the [important note on termination](#onboard-can-termination-new-in-v13d) before connecting to a bus that already has terminators

- **JP9 Without Factory Bridge**: The Knock/PC13 jumper ships **open** — on v1.3C the Knock side was bridged at the factory; on v1.3D you decide

!!! info "Pinout unchanged"
    The 48-pin connector pinout and the MCU pin mapping are **identical to v1.3C**. v1.3C tunes and firmware configuration can be used directly without changes.

**Improvements inherited from v1.3C (relative to v1.3B):**

- **MCU Pin Optimization**: TPS moved to PA6 and Battery/Voltage Reference moved to PA7

- **Single Knock Input**: Consolidated from 2 knock inputs (PC0, PC1) to 1 knock input (PA3)

- **Separate Ignition VDrive**: Two separate VDrive jumpers, one for ignition channels 1-4 and one for ignition channels 5-6

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
- **Knock Input**: One knock sensor input (PA3)
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

### Ignition Channel (6x)

| Channel | Default Use | Alternative Use |
|---------|-------------------|----------------------|
| Ignition 1-4 | Ignition channels for cylinders 1-4 | — |
| Ignition 5-6 | Ignition channels for cylinders 5-6 | 5V or 12V switching control (on/off or PWM) |

On 4-cylinder engines, **ignition channels 5 and 6 (pins 25 and 24) can be used as switching control outputs** (5V or 12V), depending on the VDrive 5-6 jumper setting on the bottom of the PCB, for example for solenoids, relays, or other loads.

### Injection Channel (6x)

| Channel | Default Use | Alternative Use |
|---------|-------------------|----------------------|
| Injector 1-4 | Injector channels for cylinders 1-4 | — |
| Injector 5-6 | Injector channels for cylinders 5-6 | Spare high-current low-side output |

On 4-cylinder engines, **injector channels 5 and 6 (pins 15 and 16) can be used as 3A low-side outputs** for on/off solenoids, boost control, VVT, water/methanol injection, or other PWM control.

## Jumper Configuration

Solder jumpers on the back of the PCB set the function of several inputs and outputs without changing the firmware.

![Mazduino Mini 6ch](img/mini6ch/IMG_6232.jpeg)

### Top Configuration Zone (Right)

#### JP11 - Tachometer Pullup
- **Function**: Sets the voltage of the tachometer output signal

- **Options**: 12V or 5V

- **Application**: Match it to what your vehicle's dashboard accepts

#### Ignition VDrive 1-4 Jumper
- **Function**: Sets the ignition signal voltage for channels **Ignition 1, 2, 3, 4** — only for smart coils with a built-in driver; for dumb coils see [Ignition System Requirements](#ignition-system-requirements)

- **Options**: 12V or 5V signal

#### Ignition VDrive 5-6 Jumper *(since v1.3C)*
- **Function**: Sets the signal voltage for channels **Ignition 5 and 6** **separately** from channels 1-4

- **Options**: 12V or 5V signal

- **Flexibility**: Channels 5-6 can be set to a different voltage than channels 1-4

- **Alternative Use**: When used as switching control, match the voltage (5V or 12V) to the load

- **Location**: Bottom of the PCB (see jumper photo)

#### Knock/PC13 Input Selection
- **Knock Mode**: Knock sensor input for engine knock detection

- **PC13 Mode**: Direct access to the MCU pin for custom functions

- **MCU Pin**: Knock input on PA3

- **Changed in v1.3D**: JP9 ships **open**. On v1.3C the Knock side was connected at the factory; on v1.3D pin 8 is not connected to anything until you bridge one side of JP9. **If the knock sensor reads nothing at all on a new board, check JP9 first.**

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
- **Function**: Controls enabling of the stepper motor driver (Idle Stepper bypass)

- **Application**: Idle Air Control (IAC)

#### JP7 & JP8 - Knock Sensor Filter Bypass
- **Function**: Bypasses the internal filter for the knock sensor

- **JP7**: Bypasses internal knock filter stage 1

- **JP8**: Bypasses internal knock filter stage 2

- **Note**: For the single knock input on the ECU connector (pin 8)

![Mazduino Mini 6ch](img/mini6ch/mazduino-mini-6ch-v1.3B-jumper2.jpeg)

### Launch Pullup
Pullup on the spare input 3 pin, used when that pin serves a launch control activation button or another input that needs a pullup.

### Jumper Configuration Tips

- **VR Sensors**: Select VR mode (signal goes through the VR Conditioner module) and **remove** the pullup — a pullup loads the VR sensor coil

- **Hall / Optical Sensors**: Select Hall mode and **fit** the pullup (JP5 for CKP, JP4 for CMP). Hall sensors are usually open-collector and cannot drive a HIGH level on their own; without a pullup the trigger pin floats and picks up noise, which causes trigger errors while the engine is running. Remove the pullup only for sensors with a 5V push-pull output

## Wiring and Installation

### Connector Pin Mapping

Mazduino Mini 6CH v1.3D uses a 48-pin Yamaha ECU connector with the following pin assignment:

![Mazduino Mini 48-pin Connector](img/mazduino-48p-connector.jpeg)

#### Connector Layout
```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

#### Pin Assignment (v1.3D)

| Pin | Function | Description |
|-----|----------|-------------|
| 1 | 12V ECU | Main ECU power supply |
| 2 | IDLE1 | Idle control output 1 |
| 3 | IDLE2 | Idle control output 2 |
| 4 | CANH | CAN bus high |
| 5 | 5V | 5V reference output |
| 6 | AC-OUT / AC COMPRESOR | AC compressor control |
| 7 | FUEL PUMP | Fuel pump relay control |
| 8 | **Knock/PC13** | Knock sensor input or direct MCU pin access — selected with JP9, which ships open on v1.3D |
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

### MCU Pin Mapping (v1.3D)

**STM32F427VGT6** pin assignment for v1.3D. **Not a single pin moved from v1.3C** — the last column records the changes made on v1.3C relative to v1.3B, and is kept here for users coming from older boards.

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

### v1.3D Wiring Notes
- **CAN Termination**: A 120 Ω termination resistor is permanently fitted on the board. Make sure the whole CAN bus still has exactly two terminators — see [Onboard CAN Termination](#onboard-can-termination-new-in-v13d)
- **AC Switch Logic**: Pin 20 accepts GROUND only as the ON signal — do not connect 12V directly. Also make sure the AC switch configuration in the firmware uses GROUND logic for ON
- **ETB**: Connect the ETB to pins 33 (ETB-) and 34 (ETB+), TPS2 to pin 40, and the Pedal Position Sensors PPS1/PPS2 to pins 18/35
- **Reference**: More sensor wiring information on the [Speeduino Wiki][speeduino-wiring]

[speeduino-wiring]: https://wiki.speeduino.com/en/wiring/system

## Hardware Information

### VR-Conditioner Module
By default, Mazduino Mini 6CH v1.3D only supports digital CKP and CMP signals, such as hall and optical sensors. Vehicles that still use VR sensors need the VR conditioner module (DIP 8) added, or the sensor can be converted to hall. VR sensors connect to VR1+/VR2+ (pins 41, 42) and VR1-/VR2- (pins 9, 10).

![VR Module](img/mini6ch/vr-conditioner-module.jpeg)

### Idle Control
Mazduino Mini 6CH v1.3D supports Idle PWM, with 2 low-side outputs that can be used for IDLE PWM control.

Idle Control with a stepper motor requires an add-on module, the Idle Stepper Motor Module, with a DRV8825 driver. The A1/A2 and B1/B2 phase outputs are on pins 11-14.

![Stepper Module](img/mini6ch/drv8825-stepper.jpeg)

### More Stable Analog Sensor Readings (New in v1.3D)
- **What changed**: MAP, TPS, IAT, CLT, O2, Battery, and the spare analog inputs read more steadily and consistently, and no longer shift with sensor load, battery voltage, and temperature as on v1.3C

- **No Setup Needed**: Everything is on the board; there is no jumper or firmware setting that goes with it

- **Calibration Note**: Analog sensor calibrations carried over from a v1.3C board should be rechecked — not necessarily changed, but small offsets that were "compensated" in the calibration tables may no longer be needed

### Onboard CAN Termination (New in v1.3D)
- **120 Ω termination resistor**: **Permanently** fitted between CANH (pin 4) and CANL (pin 21). There is no jumper to disconnect it

- **When this is correct**: The ECU is at an **end** of the CAN bus. A healthy CAN bus has exactly **two** 120 Ω terminators, one at each end

- **CAUTION**: If the ECU is installed in the **middle** of a bus whose two ends are already terminated, the total resistance drops to 40 Ω and the bus may fail to communicate. In that case **remove one of the other terminators**, or remove the termination resistor (R13) from the board

- **Other Mazduino devices**: Racedash and the WBO CAN Controller may also carry their own terminators — count the terminators across the whole network, not per device

## Software Tuning

### Download Software
Download TunerStudio: [TunerStudio Downloads][tunerstudio-dl]

![TunerStudio](img/manual/ts-download-page-overview.png)

[tunerstudio-dl]: https://www.tunerstudio.com/index.php/downloads

### Firmware and Configuration
- **rusEFI**: Supported, using the same `mazduino-mini6ch` firmware as v1.3C
- **Speeduino**: Not supported on v1.3D — use rusEFI
- **Download**: Firmware and configuration files are on the [downloads page](downloads.md)

## Wiring Diagram

### Sensor Wiring
![Sensor Wiring](img/sensor-wiring.png)

### Injector Wiring
![Injector Wiring](img/injector-wiring.png)

### Ignition Wiring
![Ignition Wiring](img/ignition-wiring.png)

## v1.3D Important Notes

### Ignition System Requirements
- **Smart Coils**: Direct connection supported — VDrive 1-4 and VDrive 5-6 can be set to different voltages (5V or 12V per group)

- **Dumb Coils**: External IGBT required; the VDrive jumpers are **not** used for dumb coils

### Migrating from v1.3C
- **Firmware/Tune**: Nothing needs to change — the connector pinout and MCU pin mapping are identical

- **JP9**: Bridge the Knock side if you use a knock sensor; the board no longer ships with that side connected

- **CAN**: Check the number of terminators on the network before connecting — this board carries its own 120 Ω

- **Analog Calibration**: Recheck the analog sensor calibrations, because the readings are now more stable

### Migrating from v1.3B
- **TPS**: Update to **PA6** (from PA3) — must be changed in the firmware configuration

- **Battery/VRef**: Update to **PA7** (from PA6) — follows the TPS change

- **Knock**: Only one input (**PA3**) — remove the second knock configuration if present

- **VDrive**: Reconfigure the VDrive 1-4 and VDrive 5-6 jumpers separately on the bottom of the PCB

## Wiring Harness

Per-pin wire size recommendations for Mazduino Mini 6CH v1.3D, with a count of wires for each size, are in [Harness Wire Size Recommendations](rekomendasi-ukuran-kabel.md).
