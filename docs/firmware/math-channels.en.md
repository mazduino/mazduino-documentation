# Math Channels

!!! warning "Not available yet"
    This feature is not in the Mazduino firmware yet. This page describes the planned feature, and its settings cannot be used yet.

Math Channels let you create **custom value channels** calculated from channels that already exist in the ECU.

Useful for showing derived values on a gauge, logging calculated values, or using a calculated value as an input to other conditions.

---

## How It Works

Each Math Channel takes a math expression that combines the available ECU channels. The result is available as a new channel in gauges, datalogs, and output conditions.

---

## Configuration in TunerStudio

Open: **Sensors → Math Channels** (or **Advanced → Math Channels**)

For each channel:

| Parameter | Description |
|---|---|
| **Name** | Channel name that will appear in the gauge/log |
| **Expression** | Math expression using ECU channel names |
| **Unit** | Unit of the result (optional, for display) |

### Supported Operators

| Symbol | Function |
|---|---|
| `+` `-` `*` `/` | Basic operations |
| `(` `)` | Grouping |
| `min(a,b)` | Minimum value |
| `max(a,b)` | Maximum value |
| `if(cond, a, b)` | Conditional value |

---

## Examples

**Simple volumetric efficiency (VE):**
```
expression: (map / baro) * 100
unit: %
```

**Engine load from MAP and RPM:**
```
expression: map * (rpm / 1000)
```

**Average temperature of CLT and IAT:**
```
expression: (clt + iat) / 2
unit: °C
```
