# ECU Configuration for Racedash

This page covers the **ECU** side: what must be enabled on the ECU so its data
reaches the dash. For the settings on the dash itself, see
[Racedash 3.5" & 4"](mazduino-racedash.md) or
[Racedash Pro](mazduino-racedash-pro.md).

## Three things that decide whether it works

**1. The dash only listens.** Racedash sends nothing on the CAN bus; it waits
for the ECU to broadcast its data. So if the broadcast (dash stream) on the ECU
has not been enabled, the dash shows nothing even when the wiring is right. The
only exception is OBD-II, which has to ask first.

**2. The CAN speed is set by the selected ECU type, not by you.**
Once the ECU type is selected, the dash automatically uses that protocol's
speed, and that speed cannot be changed by hand. If your ECU is set to a
different speed, **the dash does not receive a single frame**: the screen is
blank, not showing wrong values. The only exception is **Custom** mode on
Racedash 3.5"/4", where you do choose the speed.

**3. The ECU type on the dash must match what the ECU sends.** Haltech frames
read with the rusEFI profile will not give correct data.

## Summary per ECU

| ECU | Racedash 3.5" & 4" | Racedash Pro M4/M5/M7 | Speed |
| :--- | :---: | :---: | :--- |
| rusEFI | Yes | Yes | 500 kbps |
| Haltech | Yes | Yes | **1 Mbps** |
| MaxxECU | Yes | Yes | 500 kbps |
| aRacer | Yes | — | **250 kbps** |
| ECUMASTER EMU Black | Yes (Racedash M2) | Yes | **1 Mbps** |
| Link G4+/G4X/G5 | Yes (Racedash M2, experimental) | Yes (experimental) | **1 Mbps** |
| OBD-II (stock ECU) | Not in standard firmware | Yes | 500 kbps |
| Speeduino | Yes | Yes | Serial 115200 |

On **Racedash Pro**, the ECU type is selected from DashTune or the on-screen
menu without changing firmware. On **Racedash 3.5"/4"**, the ECU type is tied
to the installed firmware; changing it means flashing another protocol image,
which can be done through DashTune.

---

## rusEFI

- **CAN speed:** 500 kbps
- **What must be enabled on the ECU:** CAN bus on, and **broadcast (verbose) CAN**
  enabled with **base address `0x200`** (512 decimal), which is the rusEFI
  default

In TunerStudio, the settings are in the CAN bus section. The menu names differ
between rusEFI versions, but what must be right is always the same: CAN
enabled, baud 500 kbps, broadcast/verbose on, base address `0x200`.

Racedash 3.5"/4" also reads rusEFI bench test frames, so the bench test feature
on the dash is only available with rusEFI ECUs.

## Haltech

- **CAN speed:** **1 Mbps**, the setting most often missed
- **What must be enabled on the ECU:** the standard Haltech broadcast (Haltech
  CAN), on the CAN port the dash is connected to. On ESP and NSP, that port
  must be selected

Haltech is the only protocol that sends **turn signal, handbrake, and tire
pressure** data, so only with Haltech can those three indicators light up. On
other ECUs these three will not be active; that is not a fault.

## MaxxECU

- **CAN speed:** 500 kbps
- **What must be enabled on the ECU:** in MTune, **Settings > CAN Bus > CAN Protocols**,
  set the output protocol to **MaxxECU Default 1.3**

If your ECU uses User Channels for extra sensors, those channels can be shown
through Custom Channel; see [the Custom section](#ecus-not-on-the-list).

## aRacer

**Only for Racedash 3.5" and 4".** Racedash Pro has no aRacer profile.

- **CAN speed:** **250 kbps**

aRacer only sends wheel speed per axle, so the right front and right rear wheel
channels are not filled.

## ECUMASTER EMU Black

**For Racedash Pro and Racedash M2.** On Racedash M2 this profile is tied to
the ECUMASTER firmware installed through DashTune.

- **CAN speed:** **1 Mbps**, the EMU Black default
- **What must be enabled on the ECU:** "EMU stream" with **base ID `0x600`**
  (EMU software default)

EMU Black can be set to 500 kbps, but the dash reads this profile **only at
1 Mbps**. If your ECU has already been set to 500 kbps, set it back to 1 Mbps.

## Link G4+ / G4X / G5

**For Racedash Pro and Racedash M2; still experimental.** On Racedash M2 this
profile is tied to the Link firmware installed through DashTune.

- **CAN speed:** **1 Mbps**
- **What must be enabled on the ECU:** the **Generic Dash** stream in PCLink
  with **CAN ID 1000**, and its transmission must be turned on by hand; it is
  not active by default

## OBD-II (car's stock ECU)

Nothing needs to be set on the car; the dash does the asking. What you do need
to confirm is that the car supports it: only **OBD-II over CAN
(ISO 15765-4, 11-bit identifier, 500 kbps)** can be read, and the data that
shows up depends on which PIDs your car answers.

Read the [OBD-II limitations](mazduino-racedash-pro.md#obd-ii-limitations) before
relying on this mode.

On Racedash 3.5"/4", OBD-II is not in the standard firmware, which is locked to
one ECU.

## Speeduino

Speeduino has no CAN, so it connects over **serial**: the dash TX/RX pins to
the Speeduino secondary serial, with a shared ground.

- **Speed:** 115200 baud
- **What must be enabled on the ECU:** **Secondary Serial** turned on
- **Secondary serial protocol:** **`Generic (Fixed List)`**

That protocol choice is the one most often wrong, and the mistake is hard to
spot:

> If **`Generic (ini File)`** is selected, the connection still "works": the
> data length is right and there are no errors, but **all the values are
> wrong** because the byte order is different.

Speeduino firmware version notes:

| Speeduino release | Notes |
| :--- | :--- |
| 202402 and later | Has a protocol option; choose **Generic (Fixed List)** |
| 202310 | Always sends the ini File order, **cannot be used** with this dash |
| 202305 and earlier | Always sends the fixed list, works as is |

---

## ECUs not on the list

If your ECU broadcasts data over CAN but its protocol is not in the list above,
the data can still be shown by mapping the CAN ID, byte position, and scale
yourself:

- **Racedash 3.5"/4"**: choose the **Custom** protocol, then build the map in
  DashTune. Only in this mode can you choose the CAN speed yourself
  (125 kbps, 250 kbps, 500 kbps, or 1 Mbps)
- **Racedash Pro**: use **Custom Channel** in DashTune. Custom channels here
  ride on the protocol that is active, so the speed still follows that
  protocol

This is also useful for extra channels on ECUs that are already supported, for
example MaxxECU User Channels or spare rusEFI CAN outputs.

If the data you want is not known to the ECU at all, such as light switches,
extra sensors, or wheel speed sensors, it can be put onto the bus with the
[CAN IO Extender](can-io-extender.md).

## If the dash shows no data

| Symptom | Most common cause |
| :--- | :--- |
| No data at all | CAN speed mismatch, CANH/CANL swapped, or the broadcast on the ECU has not been enabled |
| No data at all, speed already correct | Bus termination: a CAN bus needs exactly **two** 120 Ω resistors. Measure with a multimeter (see [Checking CAN termination with a multimeter](#checking-can-termination-with-a-multimeter)); the correct result is about 60 Ω |
| Some channels always blank | That ECU does not send them. Each ECU has a different set of channels |
| Data appears but the values are strange | The ECU type on the dash does not match the actual ECU. On Speeduino, almost always because its secondary serial protocol is `Generic (ini File)` |
| Data appears for a while then disappears | Wiring/ground, or the ECU stopped broadcasting |

Also make sure the **dash ground and the ECU ground are connected**. CAN needs
the same voltage reference at both ends.

### Checking CAN termination with a multimeter

The dash cannot measure termination itself; only a multimeter can. Do this
check when no data comes in even though the CAN speed and the broadcast on the
ECU are already correct.

1. Turn off all power: ignition key OFF. Safer still, disconnect the negative
   battery terminal. Measuring ohms while the bus is powered gives wrong
   readings.
2. Set the multimeter to ohms (Ω), then measure between **CAN H** and **CAN L**
   at one of the connectors, for example at the dash connector.
3. Compare the result:

| Reading | Meaning | What to do |
| :--- | :--- | :--- |
| About **60 Ω** (roughly 55–65 Ω) | Correct: two 120 Ω resistors, one at each end | Termination is not the problem; go on to check wiring, ground, and ECU settings |
| About **120 Ω** | Only one terminator | Enable or fit a terminator at the other end of the bus |
| About **40 Ω** | Three terminators | Turn off the terminator on the device that is not at an end of the bus |
| Very high or no reading | No terminator, or a broken CAN wire | Check the wiring and connections, then fit terminators at both ends |
| Close to **0 Ω** | CAN H and CAN L shorted | Look for a pinched wire or wires touching each other |

The "ends of the bus" are the two devices farthest apart along the CAN cable.
Devices in the middle must not have a terminator. A stock car CAN bus (OBD-II)
already has its own termination; do not add resistors there.
