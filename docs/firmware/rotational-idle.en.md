# Rotational Idle

Rotational idle cuts spark, fuel, or both on part of the cycles, rotating between cylinders. The result is a "lumpy" idle sound like an engine with a big cam.

This feature is still **experimental** and is not a feature everyone uses.

Menu location:

- TunerStudio: **Idle → Rotational Idle**
- Mazduino Tuner: **Expert → Rotational Idle**

!!! note "Firmware Nightly 20 November 2026 or newer"
    The CLT and TPS limits, Stop short term fuel trim, Add idle air, and Timing while active are available starting with firmware Nightly 20 November 2026. That firmware also fixes the rotational idle switch pin: on older firmware the pin was only read without being set up as an input, so the switch was not read correctly.

    Tunes from older firmware still load without changes. The new fields are set to 0: Minimum CLT 0 °C, Maximum TPS/PPS no limit, normal timing, STFT and idle air unchanged.

!!! note "Firmware Nightly 24 November 2026 or newer"
    **Fuel multiplier while active** and syncing spark with fuel in cut mode **Both** are available starting with firmware Nightly 24 November 2026. The Nightly 23 November 2026 that was rebuilt in the evening also includes them. Older tunes load with Fuel multiplier 1.00.

---

## How It Works

Rotational idle is active when all three of these conditions are met:

1. **Enable** is on.
2. **All limits are met**: RPM is between Minimum and Maximum RPM, CLT is above Minimum CLT, and TPS/PPS is not above Maximum TPS/PPS.
3. **One of the triggers is active**: switch ON, or auto enable CLT, or auto enable TPS/PPS.

The limits in point 2 apply to all triggers, **including when the switch is ON**. So turning the switch ON while the engine is cold or while the throttle is pressed does not turn rotational idle on.

| Trigger | Active when |
|---|---|
| Switch | The switch pin is set and the switch is ON |
| Auto enable based on CLT | CLT is above "Engage above this CLT" |
| Auto enable based on TPS/PPS | TPS/PPS is equal to or below "Engage at or below this TPS/PPS" |

If you only want to turn it on from the switch, disable both auto enables. Rotational idle will not turn on by itself while the switch is OFF.

---

## Settings

### General

| Field | Description |
|---|---|
| **Enable** | Turns the feature on. The other fields can only be changed when this is on. |
| **Cut mode** | **Spark**: only spark is cut. **Fuel**: only injection is cut. **Both**: spark and fuel. |
| **Stop short term fuel trim while active** | STFT stops while rotational idle is active, and LTFT stops learning. **yes** is recommended if you use closed loop lambda. |
| **Add idle air while active** | Adds idle air while active, to make up for the power of the cut cylinders. |
| **Idle air adder** | Percentage added to the open loop idle valve position. A negative value reduces air. |
| **Fuel multiplier while active** | Fuel multiplier while active. 1.00 = normal, 1.20 = 20% more, 0.80 = 20% less. Range 0.50 to 2.50: below 0.50 the engine misfires or stalls. Older tunes load as 1.00. |
| **Timing while active** | Ignition timing while active, replacing normal timing including all its corrections. 0 = normal timing. Negative means after TDC: -30 = 30° ATDC. Range -40 to 10. |

Why STFT needs to be stopped: the cut cylinders pump air (and fuel, in Spark mode) into the exhaust. The O2 sensor reads lean, and STFT then adds fuel to the cylinders that are still firing. When it is stopped, the STFT status on the dashboard shows **Rotational idle**.

Timing while active does not apply when **Timing mode** is set to fixed (for checking with a timing light). The fixed timing is still used.

### Triggers

| Field | Description |
|---|---|
| **Switch pin** | Switch input pin. Leave empty if you do not use a switch. |
| **Switch pin mode** | For a switch that connects the pin to ground, select **INVERTED PULLUP**. |
| **Auto enable based on CLT** | Turns on automatically based on coolant temperature. |
| **Engage above this CLT** | Turns on when CLT is above this value. |
| **Auto enable based on TPS/PPS** | Turns on automatically when the throttle is released. |
| **Engage at or below this TPS/PPS** | Turns on when TPS/PPS is equal to or below this value. **Do not set it to 0**: TPS with the throttle released rarely reads exactly 0%. Set 1–2%, or slightly above the TPS value with the throttle released. |

### Limits

| Field | Description |
|---|---|
| **Minimum CLT** | Rotational idle turns off below this coolant temperature. |
| **Maximum TPS/PPS** | Rotational idle turns off above this TPS/PPS. 0 = no limit. |
| **Minimum RPM** | Turns off below this RPM. 0 = no limit. |
| **Maximum RPM** | Turns off above this RPM. 0 = no limit. |

### Accumulator (Cut Pattern)

There are 3 accumulators. Each has a **Max**, **Adder**, and **Offset**. Every spark event increments a counter, and every injection event increments its own counter. The event is cut when:

```
((counter + Offset) mod Max) + Adder >= Max
```

An event is cut when any accumulator requests a cut. In the pattern examples on this page, `x` = event fires and `_` = event is cut.

- **Max** = pattern length in events. 0 = this accumulator is not used.
- **Adder** = how many events are cut in one pattern. The cut events are always the last events in the pattern, in a row. Max 5 Adder 1: `xxxx_`. Max 5 Adder 2: `xxx__`.
- **Offset** = shifts the cut position within the pattern. See the explanation below.

**If every Max is 0, nothing is cut**, even when rotational idle is active.

#### Offset

Offset moves the cut position forward by Offset events. Example Max 7 Adder 1:

```
Offset 0:  xxxxxx_
Offset 3:  xxx_xxx
```

With **one** accumulator, Offset does not change the sound: the counter keeps running, so only the starting point of the pattern shifts.

Offset only becomes useful when several accumulators are used with the **same Max**. A large Adder always cuts events in a row. Several accumulators with different Offsets can spread the cuts through the pattern:

```
1 accumulator: Max 11, Adder 3                      xxxxxxxx___   cuts in a row, sounds stuttering
3 accumulator: Max 11, Adder 1, Offset 0 / 4 / 7    xxx_xx_xxx_   cuts spread out, more even lope
```

Both cut 3 of 11 events (27%), but the rhythm is different.

If the Max values are different (for example 5 and 7), Offset shifts one pattern relative to the other. The cut percentage stays the same, but the spacing between cuts and the rhythm change.

#### Choosing Max

Max and the number of cylinders must not share a common factor. If they do, the cuts only fall on some of the cylinders. Example on a 4-cylinder engine:

- Max 4: the same cylinder is always cut.
- Max 6: only 2 of the 4 cylinders are ever cut.

A cylinder that is cut all the time runs colder, and its spark plug fouls quickly.

| Number of cylinders | Suitable Max |
|---|---|
| 4 or 8 | Odd: 3, 5, 7, 9, 11, 13 |
| 6 | Not divisible by 2 or 3: 5, 7, 11, 13 |

This rule applies to every accumulator in use.

#### Rhythm and RPM

Events per second = RPM × number of cylinders / 120. A 4-cylinder engine at 900 RPM has 30 events per second, so a Max 5 pattern repeats 6 times per second. A lower idle RPM or a larger Max makes the rhythm slower and heavier.

---

## Presets

Fill in the accumulators as in the table. Set unused accumulators to **Max 0**. Accumulator column format: Max / Adder / Offset.

All presets are even on 4, 6 and 8-cylinder engines, except preset 5.

| No | Accumulator 1 | Accumulator 2 | Accumulator 3 | Cut | Pattern | Note |
|---|---|---|---|---|---|---|
| 1 | 7 / 1 / 0 | 0 | 0 | 14% | `xxxxxx_` | Smoothest, like a cam slightly bigger than stock |
| 2 | 5 / 1 / 0 | 0 | 0 | 20% | `xxxx_` | Like a big cam. Recommended starting point |
| 3 | 7 / 1 / 0 | 7 / 1 / 3 | 0 | 29% | `xxx_xx_` | Two hits with unequal spacing |
| 4 | 11 / 3 / 0 | 0 | 0 | 27% | `xxxxxxxx___` | Runs smooth, then stutters |
| 5 | 3 / 1 / 0 | 0 | 0 | 33% | `xx_` | Regular beat like a horse's gallop. **4 and 8 cylinders only** |
| 6 | 5 / 2 / 0 | 0 | 0 | 40% | `xxx__` | Very rough, drag engine style |
| 7 | 5 / 1 / 0 | 7 / 1 / 2 | 0 | 31% | `xxxx_xxxx_x_xx_xxx__…` | Irregular, similar to a rotary idle. Repeats every 35 events |
| 8 | 5 / 2 / 0 | 7 / 1 / 3 | 0 | 49% | `xxx__xxx___xx__xx___…` | Similar to a bridgeport rotary. Needs extra idle air |
| 9 | 5 / 1 / 0 | 7 / 1 / 3 | 11 / 1 / 5 | 38% | `xxx___xxx__xxx_x__x_…` | Almost never repeats (385-event pattern) |

For a 6-cylinder engine, preset 5 only cuts 2 of the 6 cylinders. Use preset 3 or 6 instead.

A real rotary sound comes from 2 rotors and wide-open exhaust ports, so its tone cannot be copied by a piston engine. Presets 7 and 8 only copy its rhythm. The exhaust has a big effect on the final result.

### Supporting Settings

- **Stop short term fuel trim while active**: yes for all presets.
- **Add idle air while active**: the larger the cut percentage, the more air is needed to keep the RPM from dropping. As a starting point, set **Idle air adder** to about 5% for presets with 20% cut or less, and about 10% for heavier ones. Then adjust until the idle RPM is the same as when rotational idle is off.
- **Maximum RPM** and **Maximum TPS/PPS**: always set them, especially for presets with more than 30% cut.

### Cut Mode and Timing

| Cut mode | Note |
|---|---|
| **Fuel** | Smoothest and cleanest. The cut cylinders only pump air. |
| **Both** | Same as Fuel, and spark is also not fired on the cut events. With sequential injection, spark follows fuel per cylinder: a cylinder that gets no fuel also gets no spark. |
| **Spark** | Loudest, with pops in the exhaust. The fuel of the cut cylinders is wasted and can burn in the exhaust. The exhaust gets hot, and the catalytic converter and O2 sensor can be damaged. |

The patterns in the preset table apply to spark, and to fuel with **sequential** injection. With batch or simultaneous injection, one injection event serves more than one cylinder, so the fuel pattern is not the same as the table. Use cut mode **Spark** if the injection is batch.

For exhaust pops, use cut mode **Spark** with **Fuel multiplier while active** slightly above 1.00, for example 1.10 to 1.30. The extra fuel from the cut cylinders burns in the exhaust, so the exhaust temperature also rises.

**Timing while active** at 0 uses normal timing. Retarded timing, for example 0 to -10 (ATDC), makes the sound heavier but raises the exhaust temperature. Start with a small value, and watch EGT if you have a sensor for it.

!!! warning "Do not use it continuously"
    Heavy presets, cut mode Spark, and heavily retarded timing all raise the exhaust temperature. For show use, turn it on from the **switch** only, not auto enable.

---

## Setup Examples

### Switch Only

1. **Enable**: enabled
2. **Cut mode**: Spark
3. **Switch pin**: the input pin you use, **Switch pin mode**: INVERTED PULLUP
4. **Auto enable based on CLT** and **Auto enable based on TPS/PPS**: disabled
5. **Minimum CLT**: 60, **Maximum TPS/PPS**: 5
6. **Maximum RPM**: slightly above idle RPM, for example 1500
7. **Accumulator**: preset 2 (Max 5, Adder 1, Offset 0, other accumulators Max 0)
8. **Stop short term fuel trim while active**: yes

### Automatic When the Throttle Is Released

Same as above, but leave the switch pin empty and enable **Auto enable based on TPS/PPS** with **Engage at or below this TPS/PPS** at 1–2%. Maximum RPM must be set so it does not turn on during engine braking at high RPM.

---

## Live Data

The live data panel is on the right side of the Rotational Idle dialog:

| Indicator | Meaning |
|---|---|
| `rotationalIdleEngaged` | Rotational idle is active |
| `rotIdleEngineTooSlow` | RPM is below Minimum RPM |
| `rotIdleEngineTooFast` | RPM is above Maximum RPM |
| `rotIdleEngineTooLowClt` | CLT is below Minimum CLT, or below "Engage above this CLT" with auto enable CLT |
| `rotIdleTpsTooHigh` | TPS/PPS is above Maximum TPS/PPS, or above "Engage at or below this TPS/PPS" with auto enable TPS/PPS |

---

## Rotational Idle Not Active? Check This

1. **Enable** is on and the tune has been burned.
2. **Accumulator Max** values are not all 0.
3. **Trigger**: switch ON, or one of the auto enables is on. If you use auto TPS/PPS, "Engage at or below this TPS/PPS" is not 0.
4. **Limits**: check the live data indicators above to see which limit is holding it back.
5. **Switch**: pin mode matches the circuit, and firmware is Nightly 20 November 2026 or newer.
