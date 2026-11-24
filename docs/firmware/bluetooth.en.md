# TunerStudio over Bluetooth

All Mazduino boards can connect to TunerStudio without a USB cable, through a serial Bluetooth module such as the **HC-05** or **HC-06**. The USB port can still be used as usual.

Requires Mazduino firmware **Nightly 4 November 2026** or newer. BIGFUEL variant boards use the same pins as their base board.

---

## Pins per Board

| Board | ECU TX → module RX | ECU RX ← module TX | Baud rate |
|---|---|---|---|
| Mazduino Compact | PB10 (TXD3) | PB11 (RXD3) | `tunerStudioSerialSpeed`, default 38400 |
| Mazduino Mini 6CH | PB10 (TXD3) | PB11 (RXD3) | `tunerStudioSerialSpeed`, default 38400 |
| Mazduino Mega100 / Mega100-512 | PB10 (TXD3, D16) | PB11 (RXD3, D17) | `tunerStudioSerialSpeed`, default 38400 |
| Mazduino Lite | PA9 (TXD1) | PA10 (RXD1) | `tunerStudioSerialSpeed`, default 38400 |
| Mazduino Core | PD5 | PD6 | `uartConsoleSerialSpeed`, default 115200 |

Mazduino Lite uses PA9/PA10 because PB10/PB11 are used by the baro sensor.

!!! warning "Tune from older firmware"
    Firmware before Nightly 4 November 2026 has no Bluetooth port on the Lite, Compact, Mega100, and Mega100-512. The TX pin and RX pin fields still appear in TunerStudio, but the ECU does not send any data to the module.

    After a firmware update, an old tune still stores the old pins, usually PC10/PC11. Those pins are not the Bluetooth port, and on Mazduino boards they are used by the SD card. Set **TX pin** and **RX pin** according to the table above, burn, then restart the ECU.

    Other pins cannot be used. The Bluetooth port is tied to a specific USART, so only the pins in this table work. Example: PA0 on the Lite is the MAP sensor pin and not a USART1 pin.

On a Mega100 with a Speeduino preset that uses D16/D17 for the stepper driver, the Bluetooth port is turned off automatically to avoid a conflict.

---

## Wiring

1. **ECU TX** to **module RXD**, and **ECU RX** to **module TXD**. TX and RX are crossed.
2. Module **GND** to ECU ground.
3. Module **VCC** to 5V. Most HC-05/HC-06 boards have their own regulator and 3.3V logic level, which matches the ECU pins.

The location of the TXD/RXD pins is on each board's pinout page.

---

## Baud Rate

The ECU and module baud rates **must be the same**.

- In TunerStudio: **Controller → Connection**. In Mazduino Tuner: **Configuration → Connection settings**.
- ECU default is 38400 (Core: 115200).
- New HC-05/HC-06 modules are usually 9600. Change the module baud rate to 38400 with an AT command, or change the ECU `tunerStudioSerialSpeed` to 9600.
- After changing the baud rate on the ECU, burn and then **restart the ECU**. The Bluetooth port is only opened once when the ECU powers up.

The **TX pin** and **RX pin** fields in the same dialog are best left at the board default.

---

## Connecting

1. Pair the Bluetooth module with the laptop (the HC-05/HC-06 PIN is usually `1234` or `0000`).
2. After pairing, the laptop creates a new serial port (COM on Windows, `/dev/tty.*` on macOS).
3. In TunerStudio, open **Communications → Settings** and select that port with the same baud rate as the ECU.

Bluetooth is slower than USB. For fast datalogging or firmware updates, still use USB.
