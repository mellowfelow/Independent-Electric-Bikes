An e-bike motor is simpler than most people think. There are no gears to change, no fuel to add, no exhaust to maintain. You pedal, a sensor detects it, a controller sends power from the battery to the motor, and the motor helps you move. Here is how each part works.

## The Three Motor Types

### Hub Motor

A hub motor is built into the centre of a wheel — usually the rear wheel. It spins the wheel directly.

**How it works:** the motor has a ring of magnets (the rotor) and a ring of copper coils (the stator). When electricity flows through the coils, they create a magnetic field that pushes against the permanent magnets, spinning the wheel.

**Two subtypes:**
- **Geared hub motor:** the motor spins faster than the wheel and uses internal planetary gears to reduce the speed and increase torque. Smaller, lighter (1.5–3 kg), and more efficient at low speeds. The gears introduce a small amount of noise and eventually wear out (10,000–20,000 km).
- **Direct-drive hub motor:** the motor spins at wheel speed — no internal gears. Larger, heavier (3–5 kg), virtually silent, and essentially maintenance-free (no wearing parts). Less efficient at low speeds but can provide regenerative braking (the motor acts as a generator when you brake, sending energy back to the battery).

**Best for:** flat to moderate terrain, commuters who want simplicity and low maintenance.

### Mid-Drive Motor

A mid-drive motor mounts at the bottom bracket (where the pedals attach) and drives the chain — just like your legs.

**How it works:** the motor drives a gear that connects to the chainring. Because the motor's power goes through the chain and the bike's gears, it benefits from gear changes — a low gear multiplies the motor's torque at the wheel, making it excellent for climbing steep hills.

**Characteristics:**
- Uses the bike's gears (efficient on hills)
- Centred weight (good handling)
- More natural pedal feel (the motor adds to your pedal effort through the same chain)
- Higher drivetrain wear (the motor's torque stresses the chain and cassette — replace more often)
- More complex (bottom bracket compatibility matters)

**Best for:** hilly terrain, mountain riding, riders who want a natural cycling feel.

### Friction Drive

A small motor with a roller that presses against the tyre. The friction between the roller and the tyre drives the wheel.

**Characteristics:** cheap, easy to install (clamp-on), but noisy, inefficient, wears the tyre, and slips in wet conditions. Mostly obsolete — used only on very cheap retrofit kits.

**Best for:** nothing, honestly. Hub and mid-drive motors are superior in every way.

## The Sensor

The sensor tells the controller that you are pedalling. Without a sensor, the motor does not know when to deliver power.

### Cadence Sensor
A ring of magnets on the crank and a detector on the frame. When the magnets pass the detector, the system knows you are pedalling.

**Behaviour:** binary — the motor is either on (you are pedalling) or off (you are not). Power delivery does not change based on how hard you pedal. Adjust assist level to control power.

**Found on:** budget and mid-range e-bikes ($1,000–$2,500).

### Torque Sensor
A strain gauge in the bottom bracket or crank that measures how hard you are pressing the pedals.

**Behaviour:** proportional — the motor matches your effort. Push lightly, get light assist. Push hard, get strong assist. This feels natural — like your legs became stronger, not like a motor is dragging you.

**Found on:** mid-range to premium e-bikes ($2,500+). All Bosch, Shimano STEPS, and TQ systems use torque sensors.

### Speed Sensor
A magnet on the wheel and a detector on the frame. Measures wheel speed. Used alongside cadence or torque sensors to cut motor power at the legal speed limit (25 km/h in Australia).

## The Controller

The controller is the brain of the system. It receives inputs from the sensor, the display (assist level), and the battery (charge level), and decides how much power to send to the motor.

**What it does:**
- Converts battery DC power to the motor's required AC or pulsed DC
- Limits power based on the selected assist level
- Cuts power at the speed limit (25 km/h)
- Cuts power when the brakes are applied (brake sensor input)
- Protects the motor from overheating (temperature sensor)
- Protects the battery from over-discharge

**Location:** usually inside the frame, near the motor, or integrated into the motor housing. You never see or touch it.

## The Battery

The battery stores the energy that powers the motor. It is the most expensive single component on an e-bike.

### How It Works
Lithium-ion cells (usually 18650 or 21700 format — the same cells used in laptops and electric cars) are wired together in series and parallel to create the required voltage and capacity.

**Typical specifications:**
- **Voltage:** 36 V (standard) or 48 V (higher performance)
- **Capacity:** 400–750 Wh (watt-hours). More Wh = more range.
- **Cells:** Samsung, LG, or Panasonic are the quality standard. No-name cells degrade faster and carry higher fire risk.

### Battery Management System (BMS)
Every battery contains a BMS — a circuit board that protects the cells:
- Prevents overcharging (cuts off charging at full voltage)
- Prevents over-discharging (cuts off the motor at minimum safe voltage)
- Balances cell voltages (ensures all cells charge and discharge evenly)
- Protects against short circuits
- Monitors temperature (prevents charging or discharging if too hot or too cold)

### Battery Life
A quality e-bike battery lasts 500–1,000 charge cycles before capacity drops to 70–80 % of its original. At one charge per day, that is 2–4 years of daily use. After this point, the battery still works — it just holds less charge (reduced range).

## The Display

The display is your interface to the e-bike's electronics. It shows:
- **Current speed**
- **Battery level** (percentage or bar graph)
- **Assist level** (Eco, Tour, Sport, Turbo)
- **Distance** (trip and odometer)
- **Range estimate** (km remaining at current assist level)
- **Power output** (watts — how much the motor is delivering)

You use buttons on the display (or a remote on the handlebars) to change assist levels, turn the system on/off, and access settings.

## How It All Works Together

1. You turn on the display and select an assist level (e.g., Tour).
2. You start pedalling. The cadence or torque sensor detects your pedalling.
3. The sensor sends a signal to the controller: "The rider is pedalling."
4. The controller checks: What assist level is selected? How fast is the bike moving? Is the speed below 25 km/h? Is the brake applied?
5. If all conditions are met, the controller sends power from the battery to the motor.
6. The motor adds force — either spinning the wheel (hub motor) or driving the chain (mid-drive).
7. You feel the assist as extra push that makes pedalling easier.
8. When you stop pedalling, the sensor stops sending a signal, and the controller cuts motor power.
9. When you exceed 25 km/h, the speed sensor triggers the controller to cut power regardless of pedalling.
10. When you squeeze the brakes, the brake sensor tells the controller to cut power immediately.

The entire cycle — from pedal stroke to motor response — takes 0.1–0.5 seconds on a torque sensor system, or 0.5–1.5 seconds on a cadence sensor system.

## Bottom Line

An e-bike motor is an electric motor (hub or mid-drive) powered by a lithium-ion battery and managed by a controller. Sensors detect your pedalling and tell the controller when to deliver power. The display lets you choose how much help you want. The whole system is designed to feel like a natural extension of your pedalling — you push, the motor pushes with you. No fuel, no emissions, minimal maintenance.
