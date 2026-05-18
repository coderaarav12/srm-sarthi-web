export interface UserProfile {
  name: string
  year: string
  branch: string
}

export const ACADEMIC_YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
]

export const SRM_BRANCHES = [
  "Computer Science and Engineering",
  "CSE – Artificial Intelligence and Machine Learning",
  "CSE – Data Science",
  "CSE – Cybersecurity",
  "CSE – Cloud Computing",
  "CSE – Internet of Things",
  "CSE – Blockchain Technology",
  "CSE – Big Data Analytics",
  "CSE – Computer Networking",
  "Electronics and Communication Engineering",
  "ECE – Embedded Systems and IoT",
  "ECE – VLSI Design",
  "ECE – Wireless Communication",
  "Electrical and Electronics Engineering",
  "EEE – Power Systems",
  "EEE – Renewable Energy",
  "Mechanical Engineering",
  "Mechanical – Automotive Engineering",
  "Mechanical – Robotics and Automation",
  "Mechatronics Engineering",
  "Aerospace Engineering",
  "Civil Engineering",
  "Civil – Construction Technology",
  "Chemical Engineering",
  "Biotechnology",
  "Biomedical Engineering",
  "Biochemical Engineering",
  "Food Process Engineering",
  "Genetic Engineering",
  "Information Technology",
  "Computer and Communication Engineering",
  "Electronics and Instrumentation Engineering",
  "Instrumentation and Control Engineering",
  "Software Engineering",
  "Robotics and Automation Engineering",
  "Automobile Engineering",
  "B.Tech – Fashion Technology",
  "B.Arch – Architecture",
  "B.Des – Interior Design",
  "B.Com – Commerce",
  "BBA – Business Administration",
  "BCA – Computer Applications",
  "BA – Journalism and Mass Communication",
  "B.Sc – Visual Communication",
  "B.Sc – Computer Science",
  "B.Sc – Hotel and Catering Management",
  "MBA – Master of Business Administration",
  "MCA – Master of Computer Applications",
  "M.Tech – Computer Science and Engineering",
  "M.Tech – VLSI Design",
  "M.Tech – Power Electronics and Drives",
  "M.Sc – Data Science",
  "Ph.D – Research Scholar",
]

export function saveProfile(profile: UserProfile) {
  if (typeof window !== "undefined") {
    localStorage.setItem("srm-sarthi-profile", JSON.stringify(profile))
  }
}

export function loadProfile(): UserProfile | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("srm-sarthi-profile")
    if (data) {
      try {
        return JSON.parse(data) as UserProfile
      } catch {
        return null
      }
    }
  }
  return null
}

// Mock train data for display
export const MOCK_STATION_BOARD = [
  {
    trainNumber: '66007',
    trainName: 'Potheri - Chennai Central Suburban',
    source: 'Potheri',
    destination: 'Chennai Central',
    arrivalTime: '07:15',
    departureTime: '07:30',
    platform: '1',
    delay: 0,
    type: 'departure' as const,
    distance: 25,
    runsOn: 'Mon-Sun',
  },
  {
    trainNumber: '66008',
    trainName: 'Potheri - Tambaram Fast',
    source: 'Potheri',
    destination: 'Tambaram',
    arrivalTime: '07:45',
    departureTime: '08:00',
    platform: '2',
    delay: 5,
    type: 'departure' as const,
    distance: 15,
    runsOn: 'Mon-Fri',
  },
  {
    trainNumber: '66009',
    trainName: 'Chennai Central - Potheri Express',
    source: 'Chennai Central',
    destination: 'Potheri',
    arrivalTime: '08:30',
    departureTime: '08:45',
    platform: '3',
    delay: 0,
    type: 'arrival' as const,
    distance: 25,
    runsOn: 'Mon-Sun',
  },
  {
    trainNumber: '66010',
    trainName: 'Tambaram - Potheri Local',
    source: 'Tambaram',
    destination: 'Potheri',
    arrivalTime: '09:00',
    departureTime: '09:15',
    platform: '1',
    delay: -3,
    type: 'arrival' as const,
    distance: 15,
    runsOn: 'Mon-Sun',
  },
];

export const MOCK_TRAINS = [
  {
    trainNumber: '66007',
    trainName: 'Potheri - Chennai Central Suburban',
    source: { code: 'POTI', name: 'Potheri', departureTime: '07:15' },
    destination: { code: 'MSB', name: 'Chennai Beach', arrivalTime: '08:30' },
    runsOn: 'Mon-Sun',
    duration: '1h 15m',
    distance: 25,
    classes: ['General', '2nd Class'],
    route: [
      {
        stationCode: 'POTI',
        stationName: 'Potheri',
        arrivalTime: '--:--',
        departureTime: '07:15',
        haltTime: '0',
        dayCount: 0,
        distance: 0,
        platform: '1',
      },
      {
        stationCode: 'CMP',
        stationName: 'Chrompet',
        arrivalTime: '07:28',
        departureTime: '07:30',
        haltTime: '2',
        dayCount: 0,
        distance: 4,
        platform: '1',
      },
      {
        stationCode: 'TBM',
        stationName: 'Tambaram',
        arrivalTime: '07:42',
        departureTime: '07:45',
        haltTime: '3',
        dayCount: 0,
        distance: 10,
        platform: '1',
      },
      {
        stationCode: 'PV',
        stationName: 'Pallavaram',
        arrivalTime: '07:58',
        departureTime: '08:00',
        haltTime: '2',
        dayCount: 0,
        distance: 15,
        platform: '1',
      },
      {
        stationCode: 'MS',
        stationName: 'Chennai Egmore',
        arrivalTime: '08:15',
        departureTime: '08:17',
        haltTime: '2',
        dayCount: 0,
        distance: 21,
        platform: '2',
      },
      {
        stationCode: 'MSB',
        stationName: 'Chennai Beach',
        arrivalTime: '08:30',
        departureTime: '--:--',
        haltTime: '0',
        dayCount: 0,
        distance: 25,
        platform: '3',
      },
    ],
  },
  {
    trainNumber: '66008',
    trainName: 'Potheri - Tambaram Fast',
    source: { code: 'POTI', name: 'Potheri', departureTime: '08:00' },
    destination: { code: 'TBM', name: 'Tambaram', arrivalTime: '08:45' },
    runsOn: 'Mon-Fri',
    duration: '45m',
    distance: 15,
    classes: ['General', '2nd Class'],
    route: [
      {
        stationCode: 'POTI',
        stationName: 'Potheri',
        arrivalTime: '--:--',
        departureTime: '08:00',
        haltTime: '0',
        dayCount: 0,
        distance: 0,
        platform: '2',
      },
      {
        stationCode: 'CMP',
        stationName: 'Chrompet',
        arrivalTime: '08:15',
        departureTime: '08:17',
        haltTime: '2',
        dayCount: 0,
        distance: 4,
        platform: '1',
      },
      {
        stationCode: 'TBM',
        stationName: 'Tambaram',
        arrivalTime: '08:45',
        departureTime: '--:--',
        haltTime: '0',
        dayCount: 0,
        distance: 15,
        platform: '2',
      },
    ],
  },
];
