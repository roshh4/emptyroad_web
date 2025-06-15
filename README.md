# PALS - Pollution Abatement and Litter Surveillance

A dashboard interface for monitoring and controlling Unmanned Surface Vehicles (USVs) dedicated to water surface garbage collection.

## Overview

A real-time monitoring and control system for autonomous water surface cleaning vehicles. The system provides a comprehensive dashboard that enables operators to monitor the USV's operations, track garbage collection progress, and manage the vehicle's autonomous navigation.

![image](https://github.com/user-attachments/assets/9bb8b82b-056c-4b5b-8583-7c8bfd45ad0f)



## Key Features

### Real-time Camera Feed
- Live video stream from the USV's onboard cameras
- AI-powered object detection for floating debris
- Real-time classification of detected garbage into categories:
  - Plastic waste
  - Metal objects
  - Organic materials
  - Other debris types

### Garbage Collection Monitoring
- Real-time tracking of collected waste
- Waste type categorization and statistics
- Collection efficiency metrics
- Historical data visualization

### Vehicle Control
- Manual override capabilities
- Autonomous navigation status
- Battery and power management
- Environmental condition monitoring (water state, debris density)

### Environmental Data
- Water condition monitoring
- Debris density tracking
- Weather integration
- Navigation safety parameters

## Technical Stack

- **Frontend**: Next.js with TypeScript
- **UI Framework**: Tailwind CSS
- **State Management**: React Hooks

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/roshh4/pals.git
cd pals
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser
