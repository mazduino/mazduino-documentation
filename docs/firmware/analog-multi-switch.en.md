# Analog Multi-Switch

Analog multi-switch reads several switch positions from **one analog input**. For example a rotary switch to select a map, launch RPM, or traction control mode. Each switch position produces a different voltage, and the ECU converts that voltage into a position number.

There are **4 independent analog multi-switches**. Each one uses one analog input and can read up to 16 positions.

Menu location:

- TunerStudio: **Advanced → Analog multi-switch → Analog multi-switch 1–4**
- Mazduino Tuner: **Inputs → Multi position switch**

---

## How It Works

Each switch has a 16-point curve:

- **Voltage** (X axis): the voltage measured at each position.
- **Position** (Y axis): the position number reported for that voltage.

The ECU reads the voltage, looks up its value in the curve, then rounds to the nearest position. A voltage that falls between two points is rounded to the closer position, so the boundary between positions is halfway between the two measured voltages.

To keep it from flickering because of noise, the voltage is averaged with the previous reading, and a new position is only used after it has been read the same twice in a row.

You do not need to know the resistor values inside the switch. Just measure the voltage at each position and enter it in the curve.

---

## Initial Curve Values

Starting with firmware **Nightly 20 November 2026**, the curve is already filled with initial values when the ECU configuration is still default: positions 0–15 spread evenly over 0–5 V.

| Position | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Voltage | 0.00 | 0.34 | 0.66 | 1.00 | 1.34 | 1.66 | 2.00 | 2.34 | 2.66 | 3.00 | 3.34 | 3.66 | 4.00 | 4.34 | 4.66 | 5.00 |

These values are only a starting point. Replace them with the voltages measured from your switch.

!!! note "Tune from older firmware"
    Tunes made with firmware before Nightly 20 November 2026 store a curve that is all 0. A firmware update does not change the tune, so the curve stays 0 and the switch will not read any position. Fill in the curve manually, or copy the values from the table above as a start.

---

## Setup

1. Connect the switch to one of the unused analog inputs.
2. Open **Analog multi-switch 1**, select that input in **Analog input**, then burn.
3. Turn the switch to each position and write down the **Voltage** value in the dialog.
4. Fill in the curve: the **Voltage** column with the recorded voltages, the **Position** column with the position numbers.
5. Burn, then turn the switch again and make sure **Position** matches.

### Switches with Fewer than 16 Positions

The curve always has 16 points, and **Voltage must increase from left to right**. For a switch with fewer positions, fill in the first points according to the switch positions. Fill the remaining points with voltages that keep increasing up to 5.00 V, with Position equal to the last position.

Example 4-position switch:

| Position | 1 | 2 | 3 | 4 | 4 | 4 | ... | 4 |
|---|---|---|---|---|---|---|---|---|
| Voltage | 0.50 | 1.70 | 2.90 | 4.10 | 4.30 | 4.50 | ... | 5.00 |

With this curve, a voltage below 1.10 V reads as position 1, between 1.10 V and 2.30 V as position 2, and so on.

---

## Using the Switch Position

The position and voltage of each switch are available as live data channels:

| Channel | Content |
|---|---|
| `analogMultiSwitchPosition1` – `4` | Switch position number |
| `analogMultiSwitchVoltage1` – `4` | Input voltage after averaging |

These channels can be shown as a gauge, recorded in a datalog, and read from Lua:

```lua
function onTick()
  local pos = getOutput("analogMultiSwitchPosition1")
  if pos == 2 then
    -- action for position 2
  end
end
```

If **Analog input** is set to NONE, the position and voltage read 0.

---

## Not Reading? Check This

1. **Analog input** is selected and the tune has been burned.
2. **Voltage** in the dialog changes when the switch is turned. If it does not change, check the wiring and the selected input.
3. The curve is not all 0 (see [Tune from older firmware](#initial-curve-values)).
4. The Voltage column in the curve increases from left to right, with no value that goes down.
5. The voltages between positions are not too close together. Leave a gap of at least about 0.2 V so noise does not move the position.
