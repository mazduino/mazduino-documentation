# Fuel Consumption

This feature calculates fuel consumption in real time based on injection data and vehicle speed.

---

## Available Outputs

| Channel | Unit | Description |
|---|---|---|
| `fuelConsumptionL100km` | L/100km | Average consumption over the trip |
| `fuelConsumptionLitersPerHour` | L/h | Instantaneous flow rate based on current injection |

Both channels are available in TunerStudio as gauges and datalog channels.

---

## Configuration in TunerStudio

Open: **Controller → Fuel Consumption**

| Parameter | Description |
|---|---|
| **Enable Fuel Consumption** | Enables the fuel consumption calculation |
| **Fuel Density** | Fuel density in g/L |

### Fuel Density Values

The Mazduino ECU only supports **gasoline** engines.

| RON | Density (g/L) |
|---|---|
| 90 | 745 |
| 92 | 750 |
| 95 | 755 |
| 98 | 760 |
| 100+ | 765 |

Use **750 g/L** as the default. For more complete data, see the reference:

- [Engineering Toolbox — Fuels Density][engtoolbox-fuel]

> ⚠️ **Disclaimer**: The values above are estimates from internet data and **have not been
> tested in the field**. If you have exact density data from a measurement or an
> official specification, adjust it in TunerStudio: **Controller → Fuel Consumption**.

[engtoolbox-fuel]: https://www.engineeringtoolbox.com/fuels-densities-specific-volumes-d_166.html

---

## How It Works

The ECU calculates the amount of fuel injected per cycle based on the injector pulsewidth and the configured injector flow rate. The injected amount (in grams) is converted to volume using the **Fuel Density** value.

- **L/100km** is calculated from the total injected volume divided by the distance traveled, which is calculated from the VSS (Vehicle Speed Sensor) signal.
- **L/h** is calculated from the current injection flow rate converted to volume per hour.

The L/100km calculation requires a VSS that is configured and working correctly.
