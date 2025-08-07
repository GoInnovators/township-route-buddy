// Demo data for the taxi app features

export const demoBookings = [
  {
    id: "booking-1",
    from: "Soweto, Orlando East",
    to: "Sandton City Mall",
    passengerName: "Thabo Mthembu",
    passengerPhone: "+27 82 123 4567",
    requestedTime: "2024-01-15T08:30:00Z",
    status: "pending", // pending, accepted, in-progress, completed, cancelled
    price: 45,
    distance: "18.5 km",
    estimatedDuration: "35 min",
    specialRequirements: "Wheelchair accessible vehicle needed",
    driverId: null,
    createdAt: "2024-01-14T15:20:00Z"
  },
  {
    id: "booking-2", 
    from: "Alexandra Township",
    to: "OR Tambo International Airport",
    passengerName: "Nomsa Dlamini",
    passengerPhone: "+27 83 987 6543",
    requestedTime: "2024-01-15T06:00:00Z",
    status: "accepted",
    price: 180,
    distance: "42 km",
    estimatedDuration: "55 min",
    specialRequirements: "Early morning pickup, luggage space needed",
    driverId: "driver-1",
    createdAt: "2024-01-14T10:15:00Z"
  }
];

export const demoDriverJobs = [
  {
    id: "job-1",
    title: "Full-time Taxi Driver - Joburg CBD Routes",
    company: "Golden Taxi Services",
    location: "Johannesburg CBD",
    salary: "R8,000 - R12,000/month",
    requirements: [
      "Valid Professional Driving Permit (PDP)",
      "3+ years driving experience",
      "Clean criminal record",
      "Knowledge of Johannesburg routes"
    ],
    benefits: [
      "Medical aid contribution",
      "Fuel allowance",
      "Vehicle maintenance covered",
      "Performance bonuses"
    ],
    description: "Join our team of professional drivers serving the Johannesburg CBD and surrounding townships. Reliable income with growth opportunities.",
    postedDate: "2024-01-10",
    contactPhone: "+27 11 123 4567",
    contactEmail: "jobs@goldentaxi.co.za",
    status: "open", // open, closed, filled
    applicants: 23
  },
  {
    id: "job-2",
    title: "Weekend Taxi Driver - Soweto Routes",
    company: "Ubuntu Transport Co-op",
    location: "Soweto",
    salary: "R300-400/day",
    requirements: [
      "Valid PDP license",
      "Weekend availability",
      "Familiarity with Soweto areas"
    ],
    benefits: [
      "Flexible hours",
      "Fuel provided",
      "Tips allowed"
    ],
    description: "Weekend driving opportunities in Soweto. Perfect for supplemental income.",
    postedDate: "2024-01-12",
    contactPhone: "+27 82 456 7890",
    status: "open",
    applicants: 8
  }
];

export const demoTaxis = [
  {
    id: "taxi-1",
    licensePlate: "ABC 123 GP",
    make: "Toyota",
    model: "Quantum",
    year: 2019,
    capacity: 16,
    status: "active", // active, maintenance, inactive
    driverId: "driver-1",
    driverName: "Sipho Khumalo",
    route: "Soweto - Johannesburg CBD",
    operatingHours: "05:00 - 20:00",
    dailyTarget: 800,
    weeklyEarnings: 4200,
    lastInspection: "2024-01-01",
    insuranceExpiry: "2024-06-30",
    permitExpiry: "2024-12-31"
  },
  {
    id: "taxi-2",
    licensePlate: "XYZ 789 GP", 
    make: "Nissan",
    model: "NV200",
    year: 2020,
    capacity: 14,
    status: "maintenance",
    driverId: null,
    driverName: null,
    route: "Alexandra - Sandton",
    operatingHours: "06:00 - 19:00",
    dailyTarget: 900,
    weeklyEarnings: 0,
    lastInspection: "2023-12-15",
    insuranceExpiry: "2024-08-15",
    permitExpiry: "2024-11-30"
  }
];

export const demoDrivers = [
  {
    id: "driver-1",
    name: "Sipho Khumalo",
    phone: "+27 81 234 5678",
    email: "sipho.khumalo@email.com",
    licenseNumber: "PDP12345678",
    licenseExpiry: "2025-03-15",
    experience: "5 years",
    routes: ["Soweto - Johannesburg CBD", "Soweto - Sandton"],
    status: "active", // active, inactive, suspended
    rating: 4.8,
    totalTrips: 1247,
    joinDate: "2019-03-01",
    weeklyEarnings: 3200,
    monthlyEarnings: 12800,
    taxiAssigned: "taxi-1"
  },
  {
    id: "driver-2",
    name: "Nomsa Dlamini", 
    phone: "+27 82 345 6789",
    email: "nomsa.dlamini@email.com",
    licenseNumber: "PDP87654321",
    licenseExpiry: "2024-11-20",
    experience: "3 years",
    routes: ["Alexandra - Sandton", "Alexandra - Rosebank"],
    status: "available",
    rating: 4.6,
    totalTrips: 892,
    joinDate: "2021-07-15",
    weeklyEarnings: 0,
    monthlyEarnings: 0,
    taxiAssigned: null
  }
];

export const demoFinancialData = [
  {
    id: "earnings-1",
    driverId: "driver-1",
    driverName: "Sipho Khumalo",
    date: "2024-01-14",
    trips: 28,
    grossEarnings: 560,
    fuel: 180,
    taxiRental: 200,
    commission: 84, // 15% of gross
    netEarnings: 96,
    route: "Soweto - Johannesburg CBD",
    workingHours: 12
  },
  {
    id: "earnings-2",
    driverId: "driver-1", 
    driverName: "Sipho Khumalo",
    date: "2024-01-13",
    trips: 32,
    grossEarnings: 640,
    fuel: 200,
    taxiRental: 200,
    commission: 96,
    netEarnings: 144,
    route: "Soweto - Johannesburg CBD",
    workingHours: 14
  }
];

export const demoSpecialServices = [
  {
    id: "service-1",
    driverId: "driver-1",
    driverName: "Sipho Khumalo",
    serviceName: "Airport Transfers",
    description: "Professional airport pickup and drop-off service. Clean vehicle, punctual service.",
    pricePerKm: 12,
    basePrice: 100,
    availability: "24/7",
    vehicleType: "Toyota Quantum (16 seater)",
    specialFeatures: ["Air conditioning", "Luggage space", "Child seats available"],
    contactPhone: "+27 81 234 5678",
    rating: 4.8,
    completedBookings: 156,
    status: "active"
  },
  {
    id: "service-2",
    driverId: "driver-2",
    driverName: "Nomsa Dlamini",
    serviceName: "Medical Transport",
    description: "Safe and comfortable transport for medical appointments and hospital visits.",
    pricePerKm: 10,
    basePrice: 80,
    availability: "06:00 - 20:00",
    vehicleType: "Nissan NV200 (14 seater)",
    specialFeatures: ["Wheelchair accessible", "First aid kit", "Gentle driving"],
    contactPhone: "+27 82 345 6789",
    rating: 4.9,
    completedBookings: 89,
    status: "active"
  }
];