# Dash R4 Extra Inputs

If your ECU does not send turn signal, head light, or fuel level data, the
signals can be taken directly from the car through the spare pins on the Dash
R4. GPIO 46 can also be used for a theme change button, in place of the head
light. This page covers the pin choices, the settings in DashTune, and fuel
level calibration.

All settings are in DashTune, in the **Extra inputs** menu. The choices in this
menu are saved on the dash and stay after the ignition key is turned off.

> **Important:** all pins work at **3.3 V**, while the car's electrical system
> is 12–14.4 V and can spike higher when the starter or alternator is working.
> A 12 V signal must go through optocoupler protection before it reaches the
> pin. **Do not connect car wires directly to the pins.** A pin exposed to 12 V
> is permanently damaged. For the installation circuit, contact
> [support@mazduino.com](mailto:support@mazduino.com).

## Pins used

| Function | Recommended pin | Input type |
| :---- | :---- | :---- |
| Left turn signal | GPIO 32 | Digital |
| Right turn signal | GPIO 33 | Digital |
| Head light | GPIO 46 | Digital |
| Fuel level | GPIO 20 | Analog |

The three digital inputs take a 12 V signal through optocoupler protection and
are active to ground: the pin is connected to ground when the 12 V signal is
present. That is why **On when** for all three is always **Grounded**.

GPIO 46 is optional. This pin can be used for the head light or for the theme
change button, but not both. When it is used for the button, the head light
data is read from the ECU.

Fuel level can also use GPIO 23. Only GPIO 20 and GPIO 23 can read a voltage.

DashTune also offers a high beam option and digital pins GPIO 2, 26, 27, 47,
and 48, but these pins are not part of the configuration above. Extra pins need
their own protection, so contact support before using them.

Once a function has been given a pin, the dash reads from that pin, not from
the ECU.

## Turn signals and head light

### Settings in DashTune

1. Open **Extra inputs**, then choose the card for the function. Head light is
   on the **Lights** card.
2. Choose the pin used.
3. Set **On when** to **Grounded**, even though the car wire carries 12 V.

### Where to take the signal from

- **Turn signal:** take it from the turn signal lamp wire **after the flasher
  relay**, one for left and one for right. The indicator wire at the stock
  instrument cluster can also be used.
- **Head light:** take it from a wire that is live when the lights are on. This
  signal is also used by **Dim the screen with the lights on**.

### The turn signal indicator follows the relay

When the turn signals use pins, the dash does not make its own blinking. The
indicator on the screen is on when there is voltage on the wire and off when
there is none, so the rhythm is the same as the car's relay.

Because of this, a wire with a steady voltage keeps the indicator on all the
time. This usually means the signal is taken **before** the flasher relay, for
example from the turn signal switch. Move it to a wire after the relay.

Hazard is read when the left and right turn signals are on at the same time.

### Themes that show the turn signals

Not every theme has a turn signal indicator. The ones that do: **Street**,
**Car Status**, **Classic Beetle**, **Vintage Speedo**, **Vintage Tach**, and
**Vintage Trio**. In other themes, a correctly working pin still does not show
on the screen.

### Checking the signal at the pin

With **On when: Grounded**, the status in DashTune and the voltage at the pin
mean this:

| Voltage at pin | Status in DashTune | Meaning |
| :---- | :---- | :---- |
| 3.3 V, car lamp off | Off | Normal |
| 3.3 V, car lamp on | Off | The signal does not reach the pin. Check the wiring and the point where the signal is taken |
| 0 V | On | The dash is reading correctly. If the screen shows nothing, change to a theme that has the indicator |
| 0 V | Off | The wrong pin is selected, or **On when** is still at **Voltage in** |

In DashTune, voltage is only shown for fuel level. Measure the voltage of a
digital pin with a multimeter.

## Theme change button

A push button in the cabin can change the theme without touching the screen.
Each press moves the dash to the next theme and shows its name. Hidden themes
are skipped, and after the last theme the order goes back to the start.

Use a **momentary** button, meaning a button that springs back by itself when
released. The GPIO 46 input takes a 12 V signal, so the button must send 12 V
when pressed. A button that only connects to ground will not be read.

### Settings in DashTune

1. Open **Extra inputs → Lights**, then change the pin to **Not used**. GPIO 46
   cannot be chosen for the button while it is still used by the lights.
2. Open **Theme button**, then choose GPIO 46.
3. Set **On when** to **Grounded**.
4. Press the button. The status in DashTune must change from **Released** to
   **Pressed**.

At least two themes must be installed and not hidden. If there is only one, the
status still changes to **Pressed**, but the theme does not change.

This card needs DashTune 1.2.10 or newer and the latest dash firmware. A button
wired to **Lights** is only read as a light and does not change the theme.

The button does not work while the dash menu or the splash screen is showing. A
button held down when the ignition key is turned on is only read after it is
released and pressed again.

## Fuel level

A fuel sender is a resistor whose value changes with the float. The dash reads
its voltage, then turns it into a percentage from the calibration.

When contacting support for the circuit, say whether the sender is still used
by the stock gauge, because the installation is different.

If the ECU already sends fuel level, leave the pin choice at **From the ECU**.

### Calibration

1. Open **Extra inputs → Fuel level**, then choose the pin used.
2. With the tank **empty** or at the reserve mark, press **Use now as empty**.
3. With the tank **full**, press **Use now as full**.

The empty voltage may be higher or lower than full. If you already know the
voltages, tap the **Empty** or **Full** value to enter it directly.

The reading on the dash is smoothed over a few seconds, so fuel sloshing in
the tank does not make the number jump up and down.

### Extra points

A reading from only two points is not always accurate in the middle of the
tank, because the sender voltage does not change linearly and the tank shape is
not always even. Add up to 6 points between empty and full with **Add a point**.

1. Start with an empty tank, then fill it with a known amount of fuel, for
   example a quarter of the tank capacity.
2. Move the car to level ground, away from the pump.
3. With the ignition key ON and the engine off, wait until the voltage is
   stable.
4. Press **Add a point**, enter the tank percentage, then save.
5. Repeat for the next point.

> **Do not add points while refueling.** Finish refueling and move away from
> the pump first.

The voltages must be in order from empty to full. If the order is wrong,
DashTune shows a warning, and the dash uses a straight line from empty to full
until the points are fixed. This is normal if points were entered before the
full value was measured, and the warning goes away after **Use now as full**.

## Troubleshooting

| Symptom | Possible cause | What to check |
| :---- | :---- | :---- |
| Indicator never comes on | Wrong pin, the signal does not reach the pin, or **On when** is at **Voltage in** | Pin choice in DashTune, wiring connections, set **Grounded** |
| Status **On**, but the indicator does not show | The active theme has no turn signal indicator | Change to a theme in the [list above](#themes-that-show-the-turn-signals) |
| Turn signal stays on | Signal taken before the flasher relay | Move it to a wire after the relay |
| Hazard not read | Only one side is connected | Connect both left and right |
| **Theme button** card does not appear | DashTune or the dash firmware does not support it yet | Update DashTune to 1.2.10 or newer, and update the dash firmware |
| GPIO 46 cannot be chosen for the button | The pin is still used by **Lights** | Change **Lights** to **Not used** |
| Status stays **Released** when the button is pressed | **On when** is at **Voltage in**, or the button does not send 12 V | Set **Grounded**, check the button wiring |
| Status **Pressed** appears, but the theme does not change | Only one theme is shown, or the dash menu is open | Theme list in DashTune, close the dash menu |
| Fuel level is reversed | Empty and full calibration swapped | Repeat **Use now as empty** and **Use now as full** |
| Fuel level always 0% or 100% | Sender wire broken or shorted | Wiring and sender |
| Point order warning appears | Point voltages are not in order | Measure again or delete the wrong point |
