# Spark Cut & Fuel Cut

The ECU provides the monitoring channels **`totalSparkCut`** and **`totalFuelCut`**, which show the percentage of cut currently active.

---

## Uses

These channels are useful for:
- **Monitoring** on a TunerStudio gauge — see how much cut is happening
- **Datalog** — record when and for how long cut is active during testing

---

## How to Use

These channels are available automatically. Add them to a gauge or datalog:

1. In TunerStudio, open **Gauge Editor** or **Data Log Fields**
2. Search for `totalSparkCut` or `totalFuelCut`
3. Add it to the dashboard or log

### Values

| Value | Description |
|---|---|
| `0` | No cut active |
| `0.5` | 50% cut (1 of every 2 cycles is cut) |
| `1.0` | Full cut (all cycles are cut) |

---

## Causes of Cut

Cut can be triggered by various features: rev limiter, launch control, traction control, flat shift, or other engine protection conditions.
