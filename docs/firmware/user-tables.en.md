# User Tables

!!! warning "Not available yet"
    This feature is not in the Mazduino firmware yet. This page describes the planned feature, and its settings cannot be used yet.

User Tables are **custom lookup tables** that you fill in yourself and use as a value source in the ECU configuration.

Useful when you need a correction or value mapping that is not available in the default TunerStudio tables, for example converting a non-standard sensor pressure or an RPM-based correction.

---

## How It Works

Each User Table is a 2D table (X axis and Y values) that can be filled in freely. The values in the table can be referenced in other configuration sections that support a custom table input.

---

## Configuration in TunerStudio

Open: **Advanced → User Tables**

Several custom tables are available. For each table:

| Parameter | Description |
|---|---|
| **Input (X axis)** | ECU channel used as the table input (RPM, MAP, TPS, etc.) |
| **Table Values** | Output value for each point on the X axis |
| **Output Range** | Range of the output values |

Once the table is configured, select **User Table N** as the value source in a configuration section that supports it.

---

## Example

**Injection correction based on fuel pressure:**

| RPM (X) | Correction (%) |
|---|---|
| 1000 | 0 |
| 2000 | 2 |
| 4000 | 5 |
| 6000 | 8 |

This table is then selected as the correction input in the fuel injection configuration.
