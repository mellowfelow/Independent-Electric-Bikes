## Voltage, Amp-Hours, and Watt-Hours Explained: How to Compare E-Bike Batteries

Shopping for an e-bike battery or comparing electric bikes means encountering numbers like 48V, 13Ah, and 624Wh. These are not marketing jargon. They describe real, measurable properties of the battery that determine how your e-bike performs. This guide explains what each number means and how to use them to make smart comparisons.

## Voltage: The Pressure Behind the Power

Voltage (V) is the electrical pressure that pushes current through the motor. Think of it like water pressure in a hose. Higher voltage means the system can deliver power more efficiently and drive the motor harder.

Common e-bike voltages:

- **24V:** Entry-level e-bikes, kids' electric vehicles, some electric scooters. Limited power and speed.
- **36V:** Standard for many commuter e-bikes. Adequate for flat terrain and moderate assist levels. Uses 10 lithium-ion cells in series (10S).
- **48V:** The most popular voltage for general-purpose e-bikes in Australia. Good hill climbing, responsive acceleration, and efficient power delivery. Uses 13 cells in series (13S).
- **52V:** Increasingly common in aftermarket and performance builds. About 8 percent more power than 48V with the same controller. Uses 14 cells in series (14S).
- **60V to 72V:** Electric mopeds, motorcycles, and high-power off-road builds. Not standard bicycle territory.

**What voltage means in practice:** A 48V system can push more current through the motor more efficiently than a 36V system with the same controller and motor. This translates to better hill climbing, quicker acceleration, and less voltage sag (the temporary drop in voltage under heavy load) that makes a 36V system feel sluggish on steep climbs.

However, voltage must match across the system. Your battery voltage must be compatible with your motor controller. A 48V battery on a 36V controller can damage the controller. A 36V battery on a 48V controller will underperform and may not work at all.

## Amp-Hours: How Much Fuel is in the Tank

Amp-hours (Ah) measure the battery's charge capacity, or how much current the battery can deliver over time. A 13Ah battery can theoretically deliver 13 amps for one hour, or 6.5 amps for two hours, or 1 amp for 13 hours.

Common e-bike battery capacities:

- **7 to 10Ah:** Small, lightweight batteries found on folding e-bikes and budget models. Range of 20 to 40 kilometres with moderate assist.
- **10 to 14Ah:** Standard range for commuter e-bikes. Range of 40 to 70 kilometres.
- **14 to 20Ah:** Extended range batteries for touring, long commutes, and cargo bikes. Range of 60 to 120 kilometres.
- **20Ah and above:** Large batteries for long-distance touring, delivery work, or high-power applications.

**The trap with amp-hours:** Amp-hour ratings are only meaningful when comparing batteries of the same voltage. A 36V 20Ah battery and a 48V 13Ah battery have similar total energy, even though the amp-hour numbers are very different. This is where watt-hours come in.

## Watt-Hours: The True Comparison Number

Watt-hours (Wh) represent the total energy stored in the battery. This is the single most useful number for comparing batteries across different voltages and configurations.

The formula is simple:

**Watt-hours = Voltage x Amp-hours**

Examples:

- 36V x 10Ah = 360Wh
- 36V x 14Ah = 504Wh
- 48V x 13Ah = 624Wh
- 48V x 17.5Ah = 840Wh
- 52V x 20Ah = 1,040Wh

A 48V 13Ah battery (624Wh) stores more energy than a 36V 14Ah battery (504Wh), even though the 36V battery has a higher amp-hour number. Always compare in watt-hours.

## Estimating Range from Watt-Hours

A rough rule of thumb for e-bike range in Australia:

**10 to 15 Wh per kilometre** is typical for moderate pedal assist on flat terrain at 20 to 25km/h. This means:

- 360Wh battery: 24 to 36km range
- 500Wh battery: 33 to 50km range
- 624Wh battery: 42 to 62km range
- 840Wh battery: 56 to 84km range

These estimates assume flat terrain, moderate assist, average rider weight (75 to 85kg), and no significant headwind. Real-world range varies enormously based on:

**Terrain** is the biggest factor. Climbing hills consumes dramatically more energy than flat riding. A hilly 30km commute might use as much energy as a flat 60km ride.

**Assist level** matters greatly. Running in full power or turbo mode can halve your range compared to eco mode. If range is a concern, use lower assist levels on flat sections and save the power for hills.

**Rider weight** including cargo affects range proportionally. A 100kg rider with 10kg of luggage will get roughly 25 percent less range than a 70kg rider with no cargo.

**Wind** is a significant factor in Australia, especially in coastal cities like Melbourne, Perth, and Adelaide. A consistent headwind of 20km/h can reduce range by 20 to 30 percent.

**Temperature** affects battery chemistry. Cold weather (below 10 degrees) reduces battery capacity temporarily by 10 to 20 percent. The battery recovers when it warms up.

**Tyre pressure and tyre type** affect rolling resistance. Underinflated tyres or knobby mountain bike tyres increase energy consumption on paved surfaces.

## Nominal vs Full Charge vs Cutoff Voltage

Battery voltage is not constant. It changes with the state of charge:

**Full charge voltage** is the maximum voltage when the battery is at 100 percent. For a 48V nominal battery (13S lithium-ion), full charge is 54.6V (4.2V per cell).

**Nominal voltage** is the average voltage during discharge. For a 48V battery, this is around 48V (3.7V per cell). This is the advertised voltage.

**Low voltage cutoff** is where the BMS shuts down the battery to prevent cell damage. For a 48V battery, this is typically around 39V (3.0V per cell). The battery feels "empty" before reaching this point because voltage sag under load trips the cutoff.

**What this means practically:** Your battery displays 100 percent at 54.6V and 0 percent at around 39V. The usable range is between these two points. As the battery discharges, voltage drops, and you may notice slightly less power and responsiveness from the motor at low charge levels.

## Continuous vs Peak Discharge Current

Batteries also have current delivery limits that affect performance:

**Continuous discharge current** is the maximum sustained current the battery can safely deliver. This is determined by the cell specifications and BMS rating. A typical e-bike battery might be rated for 25A to 30A continuous discharge.

**Peak discharge current** is the maximum short-term current for acceleration and hill climbing bursts. This might be 40A to 50A for brief periods.

If your motor controller draws more current than the battery can deliver, the BMS will cut power to protect the cells. This manifests as sudden power loss during hard acceleration or steep climbs. If this happens regularly, you may need a battery with a higher continuous discharge rating (larger cells or more cells in parallel).

## Parallel and Series Configurations

Understanding how cells are arranged helps you read battery specifications:

**Series (S)** connections add voltage. Ten cells in series (10S) at 3.7V each give 37V nominal (marketed as 36V). Thirteen cells in series (13S) give 48.1V (marketed as 48V).

**Parallel (P)** connections add capacity. Five cells in parallel (5P) at 3,500mAh each give 17,500mAh (17.5Ah).

A battery described as 13S5P uses 65 cells total: 13 in series for voltage and 5 in parallel for capacity. This would be a 48V 17.5Ah battery (840Wh) if using 3,500mAh cells.

More cells in parallel also increases the maximum discharge current, since each parallel group shares the load.

## What Numbers to Look For When Buying

When comparing e-bikes or batteries:

1. **Compare watt-hours first.** This tells you how much energy is available. More watt-hours means more range.
2. **Check the voltage matches your system.** Do not mismatch voltages between battery and controller.
3. **Look at the cell brand.** Samsung, LG, Panasonic, and EVE cells are reputable. Unbranded cells may have inflated ratings.
4. **Check the continuous discharge rating.** For a 750W motor, you need at least 15A continuous at 48V (750W divided by 48V = 15.6A). Build in headroom for hills and acceleration.
5. **Consider weight.** A 500Wh battery weighs around 2.8 to 3.5kg. A 1,000Wh battery weighs around 5 to 7kg. The extra range comes with extra weight on the bike.

In Australia, expect to pay roughly $1 to $1.50 per watt-hour for a quality battery with branded cells from a local supplier. Budget batteries may cost $0.50 to $0.80 per watt-hour but use lower-grade cells with shorter lifespans.

Understanding these numbers takes the guesswork out of buying an e-bike or replacement battery. Watt-hours is the number that matters most for range, voltage determines power delivery characteristics, and cell quality determines how long the battery lasts before capacity fades.
