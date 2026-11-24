# WBO CAN Controller

## Overview

![Mazduino WBO CAN Controller](img/wbo/wbo-can-controller.png)

The WBO CAN Controller is a **wideband oxygen controller** for the Bosch
**LSU 4.9** sensor. The module reads the sensor, calculates the lambda/AFR
value, then sends it onto the CAN bus, so the ECU reads it without needing a
dedicated analog input.

The module uses the **rusEFI wideband protocol**, so it can only be paired with
**rusEFI-based ECUs**, including the entire Mazduino line.

It has two uses:

- **Saving ECU pins.** A wideband sensor needs six wires and its own heater
  control circuit. With this module, the ECU only needs to be connected to the
  CAN bus, which may already be installed.
- **Adding a second sensor.** For engines with two banks, two modules can be
  installed on the same bus.

The module uses a **Molex 2x6 (12 pin)** connector that carries power, CAN, and
all six sensor wires in one connector.

---

## Connector Pinout

Molex 2x6 connector, viewed from the wire side:

| Row | Pin 1 | Pin 2 | Pin 3 | Pin 4 | Pin 5 | Pin 6 |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Row 1 (top)** | Heater+ | CANH | LSU_Un | LSU_Rtrim | LSU_Vm | *empty* |
| **Row 2 (bottom)** | +12V | CANL | *empty* | Heater- | LSU_Ip | GND |

In short, by function:

| Function | Pin |
| :---- | :---- |
| Power | +12V (Row 2, Pin 1) and GND (Row 2, Pin 6) |
| CAN | CANH (Row 1, Pin 2) and CANL (Row 2, Pin 2) |
| Sensor heater | Heater+ (Row 1, Pin 1) and Heater- (Row 2, Pin 4) |
| Sensor signal | LSU_Un, LSU_Rtrim, LSU_Vm, LSU_Ip |

> **Watch Heater+ and +12V.** Both are Pin 1, only on different rows. Swapping
> them connects the sensor heater straight to 12V without the module's control,
> and the sensor will be destroyed by overheating. Make sure the connector rows
> are right before turning on power.

---

## LSU 4.9 Sensor Wiring

![LSU 4.9 connector](img/wbo/lsu49-connector.png)

The wire colors below are the standard Bosch LSU 4.9 colors, so they apply to
the original sensor as well as replacement connectors.

This table connects two different connectors, so pay attention to the columns:
**Sensor Pin** is the pin number on the sensor's LSU 4.9 connector, while
**Position on Module Connector** is where it goes on the WBO CAN Controller's
Molex 2x6 connector.

| Sensor Pin (LSU) | Wire Color | Signal | Position on Module Connector |
| :---- | :---- | :---- | :---- |
| 1 | Red | LSU_Ip | Row 2, Pin 5 |
| 2 | Yellow | LSU_Vm | Row 1, Pin 5 |
| 3 | White | Heater- | Row 2, Pin 4 |
| 4 | Gray | Heater+ | Row 1, Pin 1 |
| 5 | Green | LSU_Rtrim | Row 1, Pin 4 |
| 6 | Black | LSU_Un | Row 1, Pin 3 |

The pin numbers on the two sides do not line up with each other: sensor Pin 1
does not go to module Pin 1. Follow the **wire colors**, do not match pin
numbers.

---

## Power and CAN Wiring

**Power.** Take +12V from a circuit that **switches off when the ignition key
is off**, not directly from the battery. The sensor heater draws a fair amount
of current and will drain the battery if the module stays on while the engine
is off.

**Ground.** Connect GND to the same ground point as the ECU. A ground
difference between the module and the ECU shifts the reading and can disturb
CAN communication.

**CAN.** CANH and CANL must be a **twisted pair**, and the bus needs a
**120 Ω** termination resistor **at both ends**, not at every device. If this
module is at an end of the bus, one of the terminations is here; if it is in
the middle, it needs no termination at all.

The most common mistake: fitting termination at every device. Three 120 Ω
resistors in parallel make the bus impedance too low and communication stops
completely.

---

## Connecting to the ECU and Dash

The data flows in stages, in one direction:

```
LSU 4.9 sensor  →  WBO CAN Controller  →  CAN bus  →  Mazduino ECU  →  Dash
```

**The dash does not read this module directly.** What the dash shows is the AFR
value already processed by the ECU, sent through the ECU protocol like other
engine data. So nothing needs to be configured on the dash side: once the ECU
reads lambda correctly, the number shows up as well.

### ECU settings

**This module's CAN bus bitrate is 500 kbps**, and the bus on the ECU side must
be set the same. A different bitrate does not give "partial data"; nothing at
all is read.

Then in the lambda sensor configuration section:

- **Wideband mode**: choose the rusEFI internal wideband mode, not *Analog* and
  not *AEM X-Series*
- **Sensor index**: `0` for the first module, `1` for the second module

Two modules on one bus must use different indexes. If the index is the same,
they overwrite each other and the reading is garbage.

---

## Wideband Sensor Important Notes

The LSU 4.9 sensor is a consumable part, and most failures come from the
installation, not from age.

**Mounting position.** Mount the sensor **at least 10° above horizontal**,
with the sensor tip pointing slightly upward. If it is mounted flat or facing
down, condensation water from the exhaust collects at the sensor tip. When the
heater turns on, that water boils instantly and cracks the ceramic inside.

**Do not power the module without the sensor installed in the exhaust.** A
heater running in open air makes the sensor overheat because there is no gas
flow to cool it.

**Leaded fuel destroys the sensor.** Lead coats the sensor element
permanently. For race engines running avgas or leaded gasoline, this sensor is
not suitable for permanent use.

**Avoid silicone.** Vapor from RTV sealant, some cleaning fluids, and certain
sprays can poison the sensor. If you use sealant in the exhaust or intake
system, make sure it is a *sensor-safe* type.

**Readings are only valid once the sensor is hot.** For the first few seconds
after the module turns on, the number cannot be trusted yet. This is normal and
not a sign of damage.

---

## Troubleshooting

**No data on the CAN bus**

- Check that CANH and CANL are not swapped
- Make sure 120 Ω termination is at **both ends** of the bus, not at every device
- Make sure the CAN bus on the ECU is set to **500 kbps**
- Make sure the ECU uses the rusEFI wideband mode, and its sensor index matches
- Measure the voltage at the +12V and GND pins directly at the module connector

**AFR is read but the numbers make no sense**

- Check that all six sensor wires are in the right positions
- Check that the module and ECU grounds are at the same point
- Check for exhaust leaks before the sensor position; outside air getting in
  makes the reading look much leaner than it really is

**AFR always shows very lean**

- An exhaust leak between the engine and the sensor is the most common cause
- On an engine that has just been started, wait until the sensor reaches
  operating temperature

**Sensor keeps failing quickly**

- Check the mounting angle; condensation is the most frequent cause
- Check the type of fuel used
