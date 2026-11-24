# Mazduino LITE v0.2

## Introduction

Mazduino LITE v0.2 is the improved and recommended version of the Mazduino LITE ECU family. It is designed for 4-cylinder engines with 4 injector channels and 2 ignition channels, with significant improvements to the IGBT footprint and an added internal barometric sensor.

![Mazduino LITE ECU](img/lite/mazduino-lite-with-case.jpeg)

> **Firmware**: LITE runs rusEFI, and it can also run **Speeduino**
> firmware, using the build made for Mazduino Compact rather than a separate
> build. Both have been tested running. See the
> [Downloads page](downloads.md#firmware-speeduino).


**v0.2 Advantages**: 

- IGBT footprint D2Pak to 263 (common & easy to find)
- Internal barometric sensor (optional)
- Improved PCB traces

## Key Features

### Input System
- **Trigger Input**: CKP and CMP for Hall/Optical sensors

- **VR Support**: Variable Reluctance sensors with a conditioner module

- **Analog Inputs**: 6x (0-5V) for MAP, TPS, IAT, CLT, O2, and a spare

- **Digital Inputs**: 5x pullup for AC Switch, VSS, Clutch, and launch control

- **Sensor Power**: Regulated 5V with internal fuse protection

- **Internal Barometer**: **Available on v0.2 (optional, not fitted by default unless requested)**

### Output System
- **Injection**: 4x high-current drivers for sequential or batch mode

- **Ignition**: 2x outputs with Smart Coil (5V/12V) and IGBT support
  - **v0.2**: Common, easy-to-find **D2Pak to 263** IGBT footprint

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

#### Pin Assignment v0.2

| Pin | Function | Description |
|-----|----------|-------------|
| 1 | Idle 1 | Idle control output 1 |
| 2 | Idle 2 | Idle control output 2 |
| 3 | CKP/Digital1 | Crankshaft position |
| 4 | VR1- | VR sensor negative |
| 5 | Ignition 1 | Ignition channel 1 |
| 6 | Main Relay | Main relay control |
| 7 | **Ground Coil** | **Ground for the coil** |
| 8 | Tacho/RPM | Tachometer output |
| 9 | **Ignition 2** | **Ignition channel 2** |
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

**Important v0.2 Difference**: Pins 7 and 9 are **swapped** - Pin 7 is **Ground Coil**, Pin 9 is **Ignition 2**

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
| **BARO SCL** | **PB10** |
| **BARO SDA** | **PB11** |
| TXCAN | PD1 |
| RXCAN | PD0 |
| SD CS | PD2 |
| SPI3 CLK | PC10 |
| SPI3 MISO | PC11 |
| SPI3 MOSI | PC12 |

**v0.2 Addition**: Pin mapping for the **Barometric Pressure Sensor**

- **BARO SCL**: PB10 (shared with TXD3)

- **BARO SDA**: PB11 (shared with RXD3)

## Hardware Configuration

### Critical Jumper Settings

**IMPORTANT**: The jumper configuration must be correct before power-up!

#### Top Side Board
- **Coil Voltage**: 12V/5V selection (default depends on coil type)

- **CAN Terminator**: Enable/disable the terminator resistor

- **VR Conditioner**: 8-pin connector for the VR module

#### Bottom Side Board
- **Tacho Signal**: 5V/12V output selection (default 12V)

- **IGN1/IGN2 Mode**: Smart Coil/IGBT selection (JP3/JP4)
  - **v0.2**: Internal IGBT with a **D2Pak to 263** footprint (common & easy to find)

- **VR1/Hall, VR2/Hall**: Input type selection

- **Digital Pullup**: Enable internal pullup resistors

- **CAN Power**: 12V/5V on the CAN connector

### Improvements in v0.2

**Main Improvements:**

- **PCB Traces**: Improved routing and corrected traces for easier jumper setup

- **IGBT Compatibility**: A more common, easier-to-find footprint

- **Barometer Support**: Mounting for an internal barometric sensor (optional)

- **Pin Assignment**: Optimized pin assignment for the 33-pin connector

### Internal Barometric Sensor (Optional)

**New in v0.2**: An internal barometric sensor is available as an option

**Specifications:**

- **Sensor Type**: Barometric Pressure Sensor

- **Interface**: I2C

- **MCU Pins**: BARO SCL (PB10), BARO SDA (PB11)

- **Availability**: Optional - not fitted by default, can be requested at purchase

- **Function**: Altitude correction and atmospheric pressure reference

**How to Order:**
Contact the Mazduino team and mention that you need the "internal barometer" when buying a LITE v0.2

### Recommended Use for v0.2

**Ideal for:**

- **All** engine management **applications**
- Setups with an **Internal IGBT**
- Applications that need an **internal barometer**
- **New users** and easy installation
- Projects using easy-to-find components

**Advantages:**

- Common IGBT footprint (D2Pak to 263)
- Improved PCB traces
- Optional internal barometer
- Better reliability

### Safety Warnings

**WARNING**:

- **Do not connect 12V signals directly to an ECU input**
- **Verify the coil voltage jumper before connecting**
- **Keep sensor ground separate from power ground**
- **Check all jumper settings before first power-up**

**v0.2 PINOUT NOTE**:

- **Pin 7**: Ground Coil (different from v0.1)

- **Pin 9**: Ignition 2 (different from v0.1)

- **Recheck the connections when upgrading from v0.1**

## Comparison with v0.1

| Aspect | v0.1 | v0.2 |
|-------|------|------|
| **IGBT Footprint** | Uncommon (issue) | D2Pak to 263 (common) |
| **Pin 7** | Ignition 2 | Ground Coil |
| **Pin 9** | Ground Coil | Ignition 2 |
| **Internal Barometer** | Not available | Optional |
| **PCB Traces** | Standard | Improved |
| **Recommendation** | COP/External IGBT | All applications |

---

## Wiring Harness

Recommended wire sizes per pin for Mazduino LITE v0.2, with a count of wires for each size, are in [Harness Wire Size Recommendations](rekomendasi-ukuran-kabel.md).
