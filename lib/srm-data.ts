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
