# Mazduino Mini 6CH (v1.4)

> **Note**: v1.4 is **not a production version**. The current production version of the Mini 6CH line is **[v1.3E](mazduino-mini-6ch-v1.3e.md)**. This page is kept as reference documentation.

## Overview

The Mazduino Mini 6CH v1.4 is a 6-channel Engine Control Unit for rusEFI firmware, with a 32-bit ARM Cortex-M4 processor.

**New in v1.4:**

- **VVT (Variable Valve Timing)**: Variable valve timing control output
- **BOOST Control**: Boost pressure control output for forced induction applications
- **Dual ETB IC**: Dual Electronic Throttle Body support with integrated driver ICs
- **Enhanced Idle Control**: Dedicated driver for an Electronic Throttle Body or an Idle Stepper Motor

![Mazduino Mini 6ch](img/mazduino-mini-6ch-v1.4.jpeg)

## Key Features
- Primary trigger input for VR, hall or optical CKP sensors
- Secondary trigger input for VR, hall or optical CMP sensors
- 9 analog inputs (0-5V) for MAP, TPS, IAT, CLT, O2, and 4 spares that can be used for a fuel pressure sensor or other sensors
- 5V sensor power supply with internal fuse protection
- 4 digital pullup inputs for AC Switch, VSS, Clutch, Launch Control
- 8x high-current 3A low-side drivers for high-impedance injectors, idle PWM (ISC), Boost, VVT and more
- 5x low-current low-side drivers for the main relay, fuel pump, AC compressor, fan, and tachometer control
- 6x 12V or 5V outputs for ignition coil signals
- Knock Input for engine knock detection
- Support for an add-on VR Conditioner Module
- 168 MHz ARM Cortex-M4 processor
- Data communication via CANbus
- Data communication via USB Type-C
- Serial RX/TX communication
- 48-pin automotive connector
- SD card for data logging

## Jumper Configuration

Board functions are set with solder jumpers, without changing the firmware.

![Mazduino Mini 6ch](img/mini6ch/IMG_6232.jpeg)

### Top Configuration Zone (Right)

#### JP11 - Tachometer Pullup
- **Function**: Sets the voltage of the tachometer output signal

- **Options**: 12V or 5V

- **Application**: Match it to your vehicle's dashboard

#### Ignition VDrive Jumper
- **Function**: Sets the ignition signal voltage for **Smart Coil Only** (smart coils with an internal driver, which connect directly)

- **Options**: 12V or 5V signal. Use 5V for coils with a 5V signal and 12V for coils with a 12V signal

- **IMPORTANT**: Dumb coils (conventional coils) require an external IGBT

#### Knock/PC13 Input Selection
- **Knock Mode**: Knock sensor input for engine knock detection (default)

- **PC13 Mode**: Direct access to the MCU pin for custom functions

- **Enhanced v1.4**: Improved knock detection sensitivity

![Mazduino Mini 6ch](img/mini6ch/IMG_6229.jpeg)

### Middle Configuration Zone

#### JP5 & JP4 - Sensor Pullup Configuration
- **JP5**: 5V pullup for the CKP (Crankshaft Position) signal

- **JP4**: 5V pullup for the CMP (Camshaft Position) signal

#### JP2 & JP3 - Sensor Type Selection
- **JP2**: CKP signal mode (VR or Hall sensor)

- **JP3**: CMP signal mode (VR or Hall sensor)

![Mazduino Mini 6ch](img/mini6ch/IMG_6230.jpeg)

### Left Configuration Zone

#### JP10 - CAN Bus Controller
- **Function**: Enables the TJA1051T/3 CAN bus IC

- **Application**: High-speed data communication with other devices

- **Protocol**: Supports the automotive CAN 2.0 standard

#### JP6 - ETB/Stepper Motor Mode Selection (New in v1.4)
- **ETB Mode**: Configuration for an Electronic Throttle Body with the integrated driver IC

- **Stepper Mode**: Configuration for Idle Stepper Motor control

- **Flexibility**: The function can be changed without changing the hardware

- **Default**: ETB mode, for modern throttle control applications

#### JP7 - Knock Sensor Filter Bypass
- **Function**: Filter bypass for the knock input on the ECU connector (pin 8)

- **Advanced Feature**: Fine-tuning of knock detection sensitivity

![Mazduino Mini 6ch](img/mini6ch/IMG_6231.jpeg)

### Jumper Configuration Tips

- **VR Sensors**: Select VR mode (the signal goes through the VR Conditioner module) and **remove** the pullup. The pullup loads the VR sensor coil

- **Hall / Optical Sensors**: Select Hall mode and **fit** the pullup (JP5 for CKP, JP4 for CMP). Hall sensors are usually open-collector and cannot produce a HIGH level on their own; without a pullup the trigger pin floats and picks up noise, which causes trigger errors while the engine is running. Remove the pullup only for sensors with a 5V push-pull output

## Wiring and Installation

### Connector Pin Mapping

The Mazduino Mini 6CH v1.4 uses a 48-pin Yamaha ECU connector with the following pin assignment:

![Mazduino Mini 48-pin Connector](img/mazduino-48p-connector.jpeg)

#### Connector Layout
```
 1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32
33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48
```

#### Pin Assignment v1.4

| Pin | Function | Description |
|-----|----------|-------------|
| 1 | **12V ECU** | Main ECU power supply |
| 2 | **IDLE1** | Idle control output 1 or ETB driver 1 |
| 3 | **IDLE2** | Idle control output 2 or ETB driver 2 |
| 4 | **VVT** | **[NEW v1.4]** Variable Valve Timing control output |
| 5 | **5V** | 5V reference output for sensors |
| 6 | **BOOST** | **[NEW v1.4]** Boost control PWM output |
| 7 | **Fuel Pump** | Fuel pump relay control |
| 8 | **Knock/PC13** | Knock sensor input (default) or direct MCU pin access |
| 9 | **VR1-** | VR conditioner 1 negative input |
| 10 | **VR2-** | VR conditioner 2 negative input |
| 11 | **ETB2-** | **[NEW v1.4]** Electronic Throttle Body 2 negative |
| 12 | **ETB2+** | **[NEW v1.4]** Electronic Throttle Body 2 positive |
| 13 | **Spare Input 3** | Spare analog input 3 |
| 14 | **High Side** | 12V Switching / Alternator Control / VTEC Control |
| 15 | **Injector 5** | Injector 5 or spare high-current output (boost/vvt/control pwm) |
| 16 | **Injector 6** | Injector 6 or spare high-current output (boost/vvt/control pwm) |
| 17 | **Main Relay** | Main relay control (low current low side) |
| 18 | **Spare Analog 1/PPS1** | Spare analog input 1 or Pedal Position Sensor 1 |
| 19 | **VSS** | Vehicle Speed Sensor |
| 20 | **AC-IN** | AC switch input |
| 21 | **AC Relay** | AC compressor relay control |
| 22 | **GND** | ECU ground |
| 23 | **Fan** | Fan relay control |
| 24 | **Ignition 6** | Ignition channel 6 |
| 25 | **Ignition 5** | Ignition channel 5 |
| 26 | **Ignition 1** | Ignition channel 1 |
| 27 | **Ignition 2** | Ignition channel 2 |
| 28 | **Ignition 3** | Ignition channel 3 |
| 29 | **Ignition 4** | Ignition channel 4 |
| 30 | **TPS** | Throttle position sensor (TPS1) |
| 31 | **MAP** | Manifold absolute pressure sensor |
| 32 | **Injector 4** | Injector channel 4 |
| 33 | **ETB-** | Electronic Throttle Body 1 negative |
| 34 | **ETB+** | Electronic Throttle Body 1 positive |
| 35 | **Spare Analog 2/PPS2** | Spare analog input 2 or Pedal Position Sensor 2 |
| 36 | **Clutch** | Clutch position input |
| 37 | **GND Sensor** | Sensor ground |
| 38 | **GND Sensor** | Sensor ground |
| 39 | **RPM/Tacho** | Tachometer output |
| 40 | **Launch Control** | Launch control input |
| 41 | **VR1+** | VR sensor 1 positive |
| 42 | **VR2+** | VR sensor 2 positive |
| 43 | **O2/TPS2** | Oxygen sensor (1-5V from a wideband controller) or TPS2 for ETB |
| 44 | **IAT** | Intake air temperature sensor |
| 45 | **CLT** | Coolant temperature sensor |
| 46 | **Injector 2** | Injector channel 2 |
| 47 | **Injector 1** | Injector channel 1 |
| 48 | **Injector 3** | Injector channel 3 |

### MCU Pin Mapping v1.4

For advanced users and firmware development, here is the STM32F407VGT6 pin assignment for v1.4:

| Function | MCU Pin | Notes |
|----------|---------|------------|
| Ignition Output 1 | PE15 | Ignition channel 1 |
| Ignition Output 2 | PE14 | Ignition channel 2 |
| Ignition Output 3 | PD13 | Ignition channel 3 |
| Ignition Output 4 | PE5 | Ignition channel 4 |
| Ignition Output 5 | PE2 | Ignition channel 5 |
| Ignition Output 6 | PE3 | Ignition channel 6 |
| Injection Output 1 | PD8 | Injector channel 1 |
| Injection Output 2 | PB15 | Injector channel 2 |
| Injection Output 3 | PB14 | Injector channel 3 |
| Injection Output 4 | PB13 | Injector channel 4 |
| Injection Output 5 | PD9 | Injector channel 5 |
| Injection Output 6 | PE8 | Injector channel 6 |
| MAP Sensor | PC0 | MAP sensor input |
| TPS | PA2 | TPS1 sensor input |
| IAT Sensor | PA5 | Air temperature sensor input |
| CLT Sensor | PA4 | Coolant temperature sensor input |
| O2 Sensor | PA0 | Oxygen sensor input |
| Battery/Voltage Ref | PA7 | Battery voltage reference |
| Analog Spare Input 1 | PB0 | Spare analog input 1 |
| Analog Spare Input 2 | PB1 | Spare analog input 2 |
| Analog Spare Input 3 | PA1 | Spare analog input 3 |
| Analog Spare Input 4 | PC1 | Spare analog input 4 |
| AC Input | PB5 | AC switch input |
| Launch Control Input | PE13 | Launch control input |
| Clutch Input | PE12 | Clutch sensor input |
| VSS | PD7 | Speed sensor input |
| CKP | PD3 | Crankshaft position sensor input |
| CMP | PD4 | Camshaft position sensor input |
| Tacho | PC9 | Tachometer output |
| Fuelpump Relay | PC8 | Fuel pump relay control |
| FAN Relay | PA15 | Fan relay control |
| AC Compressor Relay | PC7 | AC compressor relay control |
| Main Relay | PC5 | Main relay control |
| Idle 1 | PD10 | Idle control output 1 |
| Idle 2 | PE9 | Idle control output 2 |
| High Side | PD15 | 12V switching output |
| **ETB-DIR** | **PB8** | **[v1.4]** ETB direction control |
| **ETB-DIS** | **PB9** | **[v1.4]** ETB disable control |
| **ETB-PWM** | **PA8** | **[v1.4]** ETB PWM control |
| **ETB2-DIR** | **PD12** | **[NEW v1.4]** ETB2 direction control |
| **ETB2-DIS** | **PD11** | **[NEW v1.4]** ETB2 disable control |
| **ETB2-PWM** | **PD14** | **[NEW v1.4]** ETB2 PWM control |
| **VVT** | **PB6** | **[NEW v1.4]** Variable valve timing |
| **BOOST** | **PB4** | **[NEW v1.4]** Boost control PWM |
| Knock | PA3 | Knock sensor input |
| TXD1 | PA9 | UART1 transmit |
| RXD1 | PA10 | UART1 receive |
| TXD3 | PB10 | UART3 transmit |
| RXD3 | PB11 | UART3 receive |
| TXCAN | PD1 | CAN transmit |
| RXCAN | PD0 | CAN receive |
| SD CS | PD2 | SD card chip select |
| SPI3 CLK | PC10 | SPI3 clock |
| SPI3 MISO | PC11 | SPI3 master in |
| SPI3 MOSI | PC12 | SPI3 master out |

### v1.4 Special Features

#### Variable Valve Timing (VVT)
- Pin 4 (VVT), MCU PB6: PWM output for the VVT solenoid; the duty cycle sets the VVT actuator position
- Ground the VVT actuator to the chassis
- VVT position feedback uses a spare analog input; calibrate the sensor range in TunerStudio
- Incorrect VVT timing can cause valve interference. VVT needs a minimum oil pressure to operate

#### Boost Control
- Pin 6 (BOOST), MCU PB4: PWM output for a wastegate or blow-off valve actuator; the actuator must support PWM control
- Supports pneumatic and electronic wastegates
- Boost pressure is read from the MAP sensor or a separate boost sensor
- Set the boost target, overboost limit and PID parameters in the firmware

#### Dual Electronic Throttle Body (ETB)
- **ETB1**: Pins 33/34 (ETB-/ETB+) controlled by PB8, PB9, PA8; TPS1 on pin 30 and TPS2 on pin 43
- **ETB2**: Pins 11/12 (ETB2-/ETB2+) controlled by PD12, PD11, PD14; TPS feedback uses an additional analog input
- **Pedal**: PPS1 on pin 18 and PPS2 on pin 35
- **Integrated Driver IC**: H-bridge driver with overcurrent protection
- **Application**: Redundant throttle, dual throttle for V-configuration engines, or primary and secondary throttle
- **Safety**: Configure the failsafe values and limp-home mode parameters, then test the emergency shutdown before use

#### Injector 5 & 6 as High-Current Outputs
Injectors 5 and 6 (pins 15, 16) can be used as spare high-current outputs (3A continuous per channel) for additional VVT or boost, another PWM control output, or water/methanol injection.

## Technical Specifications v1.4

### Hardware Specifications
- **MCU**: ARM Cortex-M4 @ 168MHz

- **Flash Memory**: 1MB for firmware and configuration

- **RAM**: 192KB for real-time operation

- **ADC**: 12-bit resolution, 1µs sampling time

- **PWM Resolution**: 16-bit for precise control

- **Operating Temperature**: -40°C to +85°C

- **Input Voltage**: 9V - 16V (12V nominal)

- **Current Consumption**: <200mA @ 12V

- **Dimensions**: Compatible with existing mounting brackets

### Performance Specifications
- **Maximum RPM**: 20,000 RPM (configurable)

- **Injection Timing Resolution**: 0.1ms

- **Ignition Timing Resolution**: 0.1° crank angle

- **VVT Response Time**: <100ms typical

- **ETB Response Time**: <50ms typical

- **Boost Control Response**: <200ms typical

- **Data Logging Rate**: Up to 100Hz per channel

### Output Specifications
- **High Current Outputs**: 8x @ 3A continuous (injectors, VVT, boost)

- **Low Current Outputs**: 5x @ 500mA (relays, tacho)

- **Ignition Outputs**: 6x @ 12V/5V selectable

- **ETB Outputs**: 2x H-bridge @ 10A peak

- **VVT Output**: PWM @ 1kHz, 3A continuous

- **Boost Output**: PWM @ 100Hz, 3A continuous

### Input Specifications
- **Analog Inputs**: 7x 0-5V, 12-bit resolution

- **Digital Inputs**: 4x with internal pullup

- **VR Inputs**: 2x with conditioning circuit

- **Knock Inputs**: 1x with integrated amplifier and filter

- **CAN Bus**: ISO 11898 compliant

- **Serial**: 2x UART (USB + dedicated)

**[Download firmware and configuration files](downloads.md)**
