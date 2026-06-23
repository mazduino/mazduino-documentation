# Ignition System Configuration - TunerStudio

Konfigurasi komprehensif untuk sistem ignition ECU Mazduino. Menu **Ignition** menyediakan kontrol detail atas berbagai aspek ignition system untuk performance, efficiency, dan safety requirements.

![Ignition Menu][image40]

## Ignition Menu Overview

Menu **Ignition** menawarkan multiple opsi konfigurasi untuk tuning berbagai pengaturan terkait ignition dalam ECU. Sistem ignition yang dikonfigurasi dengan benar essential untuk performance engine yang optimal.

### Submenu yang Tersedia:

1. **Ignition Settings**: Primary configuration settings untuk ignition, termasuk tipe ignition system dan timing control

2. **Ignition Advance**: Adjustment ignition timing advance table berdasarkan engine load dan RPM

3. **Ign CLT Correction**: Timing adjustments berdasarkan Coolant Temperature (CLT)

4. **Ign IAT Correction**: Adjustments timing berdasarkan Intake Air Temperature (IAT)

5. **Dwell**: Kontrol dwell time - waktu ignition coil di-energize sebelum firing

6. **Ignition Blend Tables**: Custom tables untuk blend ignition timing values

7. **Cylinder Ign Trims**: Individual cylinder ignition timing adjustments

8. **Multispark**: Multiple sparks per cycle pada lower RPMs untuk improved combustion

9. **Knock Control**: Konfigurasi knock detection dan response

10. **Max Knock Retard**: Maximum degree timing retardation untuk knock response

## Ignition Settings

![Ignition Settings][image41]

### Ignition Mode Configuration

**Mode** dropdown untuk memilih tipe konfigurasi ignition system:

#### Single Coil
- **Aplikasi**: Distributor-based systems

- **Karakteristik**: Single coil melayani semua cylinders

- **Kabel**: One coil output ke distributor

#### Individual Coils
- **Aplikasi**: Coil-on-plug atau coil-near-plug setups

- **Requirement**: Sequential injection mode

- **Karakteristik**: One coil per cylinder untuk precise timing

#### Wasted Spark
- **Aplikasi**: Paired cylinders fire together

- **Konfigurasi**: One coil per pair atau one coil per cylinder

- **Keuntungan**: Simpler ignition system setup

#### Two Distributors
- **Aplikasi**: Pair distributors, umum pada certain BMW, Toyota engines

- **Karakteristik**: Dual distributor configuration

### Timing Parameters

#### Maximum/Minimum Limits
**Maximum Timing Advance (deg BTDC)**: Membatasi maximum timing advance untuk safe ignition settings

**Minimum Timing Advance (deg BTDC)**: Mencegah timing retard terlalu jauh, melindungi engine

#### Validation and Override
**Use Fixed Timing While Validating**: Menggunakan fixed timing untuk validasi dengan timing gun

**Override Ignition Table Load Axis**: Override load axis ignition table dengan custom axis

### Timing Mode

**Dynamic**: Menggunakan ignition timing map untuk menentukan timing secara dinamis selama engine operation

**Static**: Fix timing ke specified value untuk verifikasi static timing dengan timing light

### Ignition Outputs

#### Wiring Configuration
- **Wire each output** ke cylinder number secara langsung
- **Firmware (rusEFI)** mengelola firing order secara internal
- **Ignition Output Mode**: Customization bagaimana outputs berperilaku

#### Important Notes
1. **Timing Validation**: Gunakan timing gun dengan static timing mode untuk verify alignment
2. **Sequential Ignition**: Ensure sequential mode untuk **Individual Coils** configuration
3. **Wasted Spark Mode**: Verify coil pairing dan firing order correct

## Ignition Timing Table

![Ignition Table][image42]

Ignition Table mengkonfigurasi spark timing berdasarkan RPM (horizontal axis) dan engine load (vertical axis). Essential untuk fine-tuning engine performance, efficiency, dan safety.

### Example Analysis - High-Compression Turbocharged Engine

#### High Compression and Turbocharged Timing
- **Boosted regions**: Ignition timing conservative (lower values) untuk avoid pre-ignition

- **Example**: 200 kPa, 3000 RPM = 7.6 degrees BTDC

- **Safety**: Critical untuk turbocharged engines

#### Deceleration Burble
- **Lower load values**: Negative atau very low timing values

- **Purpose**: Intentionally delayed ignition untuk burble/popping sound

- **Application**: Aesthetic atau performance sound tuning

#### Mid-Range Efficiency
- **Mid-load/mid-RPM**: 75 kPa, 2500 RPM regions

- **Timing values**: 25-35 degrees BTDC

- **Optimization**: Fuel efficiency dan smooth power delivery

#### High RPMs
- **Higher RPMs/moderate loads**: Timing slightly advanced

- **Example**: 37.5 degrees pada 100 kPa dan 7000 RPM

- **Balance**: Maintain performance tanpa knocking

### Tuning Guidelines

#### Turbocharged Engines
- **Monitor carefully**: Timing dalam high-boost areas untuk safety

- **Use knock sensors**: Data logging untuk detect potential detonation

- **Conservative approach**: Start dengan lower timing values

#### Deceleration Effects
- **Burble effect**: Hanya gunakan di regions dengan fuel cut-off active

- **Prevent fuel waste**: Avoid excessive fuel consumption

#### Engine-Specific Considerations
- **Timing values**: Heavily dependent pada engine design, fuel type, compression ratio

- **Guidelines only**: Table ini reference, mungkin tidak applicable untuk all setups

## Dwell Configuration

![Dwell Settings][image43]

Dwell Settings menyediakan kontrol critical atas ignition coil charge time, yang mempengaruhi spark energy dan ignition system performance.

### Dwell Time Base (Top Graph)

#### Purpose dan Function
- **Adjusts**: Base dwell time (ms) relative terhadap engine RPM

- **Lower RPMs**: Higher dwell time (3.60 ms pada 0 RPM) untuk fully charge coil

- **Higher RPMs**: Decreased dwell time (2.60 ms pada 7000 RPM) untuk shorter cycle times

#### Tuning Considerations
- **Excessive high dwell**: Dapat menyebabkan coil saturation dan heat damage

- **Too low dwell**: Dapat mengakibatkan weak sparks atau misfires

### Dwell Voltage Correction (Bottom Graph)

#### Voltage Compensation
- **Lower battery voltages**: Increased dwell time (multiplier > 1.0) untuk compensate reduced charging efficiency

- **Higher voltages**: Reduced dwell time (multiplier < 1.0) untuk prevent overheating

- **Example**: 8.0V = 1.40 multiplier, 16.0V = 0.80 multiplier

#### Implementation Notes
- **Voltage table**: Essential untuk engines dengan weak electrical systems

- **Compensation vital**: Untuk vehicles running additional electrical loads

### General Guidelines

#### RPM Table Values
- **Start values**: 2.0-4.0 ms pada idle

- **Progression**: Reduce as RPM rises

- **Manufacturer specs**: Always refer untuk avoid coil damage

#### Battery Voltage Considerations
- **Compensation critical**: Untuk reliable ignition performance

- **System monitoring**: Track voltage levels selama operation

## Advanced Ignition Features

### Multispark Configuration

#### Purpose dan Benefits
- **Lower RPMs**: Multiple sparks per cycle

- **Improved combustion**: Better idle stability

- **Performance applications**: Enhanced ignition reliability

#### Configuration Parameters
- **RPM threshold**: Below which multispark activates

- **Number of sparks**: Sparks per combustion cycle

- **Spark spacing**: Time between individual sparks

### Knock Control System

#### Knock Detection
- **Sensitivity adjustment**: Configure knock sensor responsiveness

- **Frequency filtering**: Isolate actual knock dari background noise

- **Threshold setting**: Determine knock detection levels

#### Knock Response
- **Timing retard**: Automatic timing reduction saat knock detected

- **Recovery strategy**: Gradual timing advance restoration

- **Protection limits**: Maximum retard values untuk engine protection

### Cylinder Individual Trims

#### Purpose
- **Individual adjustment**: Fine-tune setiap cylinder independently

- **Compensation**: Account untuk cylinder-to-cylinder variations

- **Performance optimization**: Maximize power output per cylinder

#### Implementation
- **Trim values**: Degrees of advance/retard per cylinder

- **Monitoring**: Track individual cylinder performance

- **Balancing**: Achieve consistent power delivery

## Troubleshooting Ignition Issues

### Common Problems

#### Poor Ignition Performance
**Symptoms**: Misfires, rough idle, poor acceleration
**Solutions**:

- Check dwell settings untuk appropriate coil charging
- Verify timing table values reasonable
- Ensure proper ignition mode selection

#### Knock Detection Issues
**Symptoms**: False knock detection atau inability untuk detect real knock
**Solutions**:

- Adjust knock sensor sensitivity
- Review timing table untuk excessive advance
- Check knock sensor mounting dan wiring

#### Coil Overheating
**Symptoms**: Coil failure, reduced spark energy
**Solutions**:

- Reduce dwell time pada high RPM
- Check voltage compensation table
- Verify coil specifications match settings

### Diagnostic Procedures

1. **Timing light verification**: Check actual vs commanded timing
2. **Dwell monitoring**: Measure actual dwell time vs settings  
3. **Knock logging**: Monitor knock events dan responses
4. **Coil temperature**: Check untuk overheating conditions

## Rekomendasi Berdasarkan Application

### Street/Daily Driving
- **Conservative timing**: Prioritize reliability over maximum power

- **Knock protection**: Active knock control essential

- **Smooth operation**: Focus pada idle stability dan drivability

### Performance/Racing
- **Aggressive timing**: Extract maximum power dengan careful monitoring

- **Data logging**: Continuous monitoring essential

- **Component quality**: High-performance ignition components required

### Forced Induction
- **Conservative boost timing**: Prevent detonation di high boost conditions

- **Temperature compensation**: Active CLT dan IAT corrections

- **Safety margins**: Extra conservative approach untuk reliability

---

**Selanjutnya**: [Cranking Configuration](tunerstudio-cranking.md)

<!-- Image References -->
[image40]: # "Ignition Menu Overview"
[image41]: # "Ignition Settings"
[image42]: # "Ignition Timing Table"
[image43]: # "Dwell Settings"