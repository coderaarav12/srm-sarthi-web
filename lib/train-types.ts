export interface Station {
  code: string
  name: string
}

export interface TrainStop {
  stationCode: string
  stationName: string
  arrivalTime: string
  departureTime: string
  haltTime: string
  dayCount: number
  distance: number
  platform: string
}

export interface TrainInfo {
  trainNumber: string
  trainName: string
  source: { code: string; name: string; departureTime: string }
  destination: { code: string; name: string; arrivalTime: string }
  runsOn: string
  duration: string
  distance: number
  classes: string[]
  route: TrainStop[]
}

export interface StationBoardEntry {
  trainNumber: string
  trainName: string
  source: string
  destination: string
  arrivalTime: string
  departureTime: string
  platform: string
  delay: number
  type: "arrival" | "departure"
  distance: number
  runsOn: string
}

export const CHENNAI_STATIONS: Station[] = [
  { code: "ABU", name: "Ambattur" },
  { code: "AIP", name: "Attipattu" },
  { code: "AIPP", name: "Attipattu Pudu Nagar" },
  { code: "AJJ", name: "Arakkonam Junction" },
  { code: "AJJN", name: "Arakkonam North Cabin" },
  { code: "AKAT", name: "Akkampeta" },
  { code: "AKM", name: "Arambakkam" },
  { code: "ANNR", name: "Annanur" },
  { code: "APB", name: "Anuppambattu" },
  { code: "AVD", name: "Avadi" },
  { code: "BBQ", name: "Basin Bridge Junction" },
  { code: "CGL", name: "Chengalpattu Junction" },
  { code: "CJ", name: "Kanchipuram" },
  { code: "CJE", name: "Kanchipuram East" },
  { code: "CMP", name: "Chrompet" },
  { code: "CTM", name: "Kattangulattur" },
  { code: "EGT", name: "Egattur Halt" },
  { code: "ELR", name: "Elavur" },
  { code: "ENR", name: "Ennore" },
  { code: "GDY", name: "Guindy" },
  { code: "GI", name: "Guduvancheri" },
  { code: "GPD", name: "Gummidipundi" },
  { code: "GWYR", name: "Greenways Road" },
  { code: "HC", name: "Hindu College" },
  { code: "INDR", name: "Indira Nagar" },
  { code: "KAVM", name: "Kathivakkam" },
  { code: "KBT", name: "Kadambattur" },
  { code: "KOK", name: "Korukkupet" },
  { code: "KOTR", name: "Korattur" },
  { code: "KTBR", name: "Kasturibai Nagar" },
  { code: "KTPM", name: "Kotturpuram" },
  { code: "KVP", name: "Kavaraippettai" },
  { code: "MAF", name: "Manavur" },
  { code: "MASS", name: "Chennai Central Suburban" },
  { code: "MBM", name: "Mambalam" },
  { code: "MCPK", name: "Chepauk" },
  { code: "MCPT", name: "Chintadripet" },
  { code: "MJR", name: "Minjur" },
  { code: "MKAK", name: "Mundaka Kanni Amman Koil" },
  { code: "MKK", name: "Kodambakkam" },
  { code: "MLHS", name: "Light House" },
  { code: "MMNK", name: "Maraimalai Nagar - Kamarajar" },
  { code: "MN", name: "Minambakkam" },
  { code: "MNDY", name: "Mandaveli" },
  { code: "MPK", name: "Chennai Park" },
  { code: "MPKT", name: "Chennai Park Town" },
  { code: "MS", name: "Chennai Egmore" },
  { code: "MSB", name: "Chennai Beach" },
  { code: "MSC", name: "Chetpet" },
  { code: "MSF", name: "Chennai Fort" },
  { code: "MSU", name: "Mosur" },
  { code: "MTCN", name: "Tiruvallikeni" },
  { code: "MTMY", name: "Thirumayilai" },
  { code: "NBK", name: "Nungambakkam" },
  { code: "NEC", name: "Nemilichery" },
  { code: "NPKM", name: "Nandiambakkam" },
  { code: "NTT", name: "Nathapettai" },
  { code: "PAB", name: "Pattabiram" },
  { code: "PALR", name: "Palur" },
  { code: "PCW", name: "Perambur Carriage Works" },
  { code: "PER", name: "Perambur" },
  { code: "PEW", name: "Perambur Locomotive Works" },
  { code: "PLMG", name: "Puliyamangalam" },
  { code: "PON", name: "Ponneri" },
  { code: "POTI", name: "Potheri" },
  { code: "PRES", name: "Pattabiram Military Siding E Depot" },
  { code: "PRGD", name: "Perungudi" },
  { code: "PRGL", name: "Perungulattur" },
  { code: "PRWS", name: "Pattabiram West Cabin" },
  { code: "PTLR", name: "Putlur Halt" },
  { code: "PTMS", name: "Pattabiram Military Siding" },
  { code: "PV", name: "Pallavaram" },
  { code: "PVM", name: "Pattaravakkam" },
  { code: "PWU", name: "Paranur" },
  { code: "PYV", name: "Pazhaya Seevaram" },
  { code: "PZA", name: "Palavanthangal" },
  { code: "RDY", name: "Reddipalaiyam" },
  { code: "RPM", name: "Royapuram" },
  { code: "SKL", name: "Singaperumal Koil" },
  { code: "SP", name: "Saidapet" },
  { code: "SPAM", name: "Senji Panambakkam" },
  { code: "SPE", name: "Sullurupeta" },
  { code: "STM", name: "St Thomas Mount" },
  { code: "SVR", name: "Sevvapet Road" },
  { code: "TADA", name: "Tada" },
  { code: "TBMS", name: "Tambaram Sanatorium" },
  { code: "TBM", name: "Tambaram" },
  { code: "TI", name: "Tiruninravur" },
  { code: "TKO", name: "Takkolam" },
  { code: "TLM", name: "Tirusulam" },
  { code: "TMLP", name: "Tirumalpur" },
  { code: "TMVL", name: "Tirumullaivayil" },
  { code: "TNP", name: "Tondiarpet" },
  { code: "TO", name: "Tiruvalangadu" },
  { code: "TRL", name: "Tiruvallur" },
  { code: "TRMN", name: "Taramani" },
  { code: "TRT", name: "Tiruttani" },
  { code: "TVT", name: "Tiruvottiyur" },
  { code: "TYMR", name: "Tiruvanmiyur" },
  { code: "UPM", name: "Urappakkam" },
  { code: "VB", name: "Villiyambakkam" },
  { code: "VDR", name: "Vandalur" },
  { code: "VEU", name: "Veppampattu" },
  { code: "VJM", name: "Vyasarpadi Jeeva" },
  { code: "VLCY", name: "Velachery" },
  { code: "VLK", name: "Villivakkam" },
  { code: "VOC", name: "V.O.C. Nagar" },
  { code: "VPY", name: "Vyasarpadi" },
  { code: "WCN", name: "Wimco Nagar" },
  { code: "WJ", name: "Walajabad" },
  { code: "WST", name: "Washermanpet" },
]

export interface PNRPassenger {
  passengerSerialNumber: number
  bookingStatus: string
  currentStatus: string
  coachPosition?: string
}

export interface PNRStatus {
  pnrNumber: string
  trainName: string
  trainNumber: string
  boardingDate: string
  fromStation: { name: string; code: string }
  toStation: { name: string; code: string }
  reservedUpto?: string
  boardingPoint?: string
  classOfTravel?: string
  passengerCount: number
  passengers: PNRPassenger[]
  chartPrepared: boolean
  error?: string
}

export interface TrackStop {
  name: string
  arrival: string
  departure: string
  status: string
}

export interface TrackResult {
  trainNumber: string
  date: string
  stations: TrackStop[]
  error?: string
}

export interface AvailabilityClass {
  class: string
  quota: string
  available: string
  fare?: string
}

export interface AvailabilityResult {
  trainNumber?: string
  trainName?: string
  fromStation?: string
  toStation?: string
  date?: string
  classes?: AvailabilityClass[]
  error?: string
  errorMessage?: string
  [key: string]: unknown
}

export type TabType = "trains" | "buses" | "third"
export type TrainSubTab = "station" | "search" | "track"

export const DEFAULT_FROM = "POTI"
export const DEFAULT_TO = "MSB"
