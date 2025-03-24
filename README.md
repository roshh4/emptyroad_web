# next.js tailwind

Next docs : https://nextjs.org/docs
tailwind docs : https://v2.tailwindcss.com/docs

```bash
npm install
npm run dev
```

![WhatsApp Image 2025-03-20 at 21 11 00_1f4dec0b](https://github.com/user-attachments/assets/06c61508-cb49-4366-baa8-e939086d6b0c)


# 1. Mission Planner Data (Navigation & Telemetry)
```
GPS Location (Latitude, Longitude)
Speed (Current and Target Speed)
Heading / Orientation (Compass direction)
Battery Status (Voltage, Percentage)
Propeller RPM
Rudder Angle (Steering control)
Altitude (if needed) (Water level variation)
IMU Data (Acceleration, Gyro, and Roll/Pitch/Yaw)
Communication Signal Strength (If using wireless control)
Distance to Destination
Obstacle Detection (LiDAR / Sonar readings)
```
# 2. Camera Feed & AI Processing
```Live Video Stream (From onboard camera)
Object Detection Overlay (Highlighting detected waste)
Waste Type Classification (Plastic, Metal, Organic, etc.)
Water Surface Condition (Waves, debris density)
```
# 3. Waste Collection Metrics
```Total Waste Collected (Weight in kg or number of items)
Belt Fill Level (Percentage of bin capacity used)
Real-time Waste Count (Objects picked up per minute/hour)
Waste Sorting Details (Categorized count of collected waste)
Next Docking Time (Estimation based on bin fill level)
```
# 4. System Health
```Mission Time & Duration
Data Export (CSV/PDF) (For analytics & reporting)```
