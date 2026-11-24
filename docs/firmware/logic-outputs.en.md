# Logic Outputs

!!! warning "Not available yet"
    This feature is not in the Mazduino firmware yet. This page describes the planned feature, and its settings cannot be used yet.

Logic Outputs are **digital outputs controlled automatically** based on configurable logic conditions — without needing Lua scripting.

Useful for switching relays, indicator lamps, or output signals based on engine conditions such as RPM, temperature, pressure, or a combination of them.

---

## How It Works

Each Logic Output has a condition that is evaluated in real time. If the condition is met, the output pin becomes active (HIGH). If not, the pin becomes inactive (LOW).

---

## Configuration in TunerStudio

Open: **Outputs → Logic Outputs**

For each Logic Output:

| Parameter | Description |
|---|---|
| **Output Pin** | ECU pin to be controlled |
| **Condition** | Logic expression that determines when the output is active |
| **Active High/Low** | Output pin polarity |
| **Hysteresis** | Hysteresis range to prevent chatter |

### Condition Operators

| Symbol | Description |
|---|---|
| `>` `<` `>=` `<=` `==` | Value comparison |
| `&&` | AND (both conditions must be true) |
| `\|\|` | OR (either condition is enough) |
| `!` | NOT (inverts the condition) |

---

## Examples

**Turn on the cooling fan when CLT > 90°C:**
```
Condition: clt > 90
Hysteresis: 5   (turns off when CLT drops to 85°C)
```

**Turn on a warning lamp when RPM > 6500 AND MAP > 150 kPa:**
```
Condition: rpm > 6500 && map > 150
```

**Turn on the fuel pump relay when the engine is running:**
```
Condition: rpm > 300
Hysteresis: 50
```
