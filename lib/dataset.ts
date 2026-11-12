export interface JobDatasetRecord {
  id: string
  experience: string
  qualifications: string
  salaryRange: string
  salaryMin?: number
  salaryMax?: number
  location: string
  country: string
  workType: string
  companySize: string
  postingDate: string
  preference?: string
  contactPerson?: string
  contact?: string
  jobTitle: string
  role: string
  jobPortal?: string
  description: string
  benefits?: string
  skills: string[]
  responsibilities: string
  company: string
}

export interface DatasetStats {
  totalJobs: number
  avgSalary: string
  uniqueCompanies: number
  uniqueLocations: number
  workTypeCounts: Record<string, number>
}
