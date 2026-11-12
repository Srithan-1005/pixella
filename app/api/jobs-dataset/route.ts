import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { JobDatasetRecord } from '@/lib/dataset'

let cachedData: JobDatasetRecord[] | null = null

function loadDataset(): JobDatasetRecord[] {
  if (cachedData) return cachedData

  try {
    const jsonPath = path.join(process.cwd(), 'public', 'data', 'job_descriptions.json')
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, 'utf8')
      cachedData = JSON.parse(raw)
      return cachedData || []
    }
  } catch (err) {
    console.error('Error loading JSON dataset:', err)
  }

  return []
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(5, parseInt(searchParams.get('limit') || '12', 10)))
    const search = (searchParams.get('search') || '').trim().toLowerCase()
    const workType = searchParams.get('workType') || 'All'
    const country = searchParams.get('country') || 'All'
    const sortBy = searchParams.get('sortBy') || 'date' // date, salary, title, company
    const sortOrder = searchParams.get('sortOrder') || 'desc' // asc, desc

    const allRecords = loadDataset()

    if (!allRecords || allRecords.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dataset could not be loaded. Please ensure dataset exists.',
          data: [],
          total: 0,
        },
        { status: 500 }
      )
    }

    // Filter
    let filtered = allRecords.filter((record) => {
      // Search matching across title, company, skills, location, country, role
      const matchesSearch =
        !search ||
        record.jobTitle.toLowerCase().includes(search) ||
        record.company.toLowerCase().includes(search) ||
        record.location.toLowerCase().includes(search) ||
        record.country.toLowerCase().includes(search) ||
        record.role.toLowerCase().includes(search) ||
        record.skills.some((s) => s.toLowerCase().includes(search))

      // Work type match
      const matchesWorkType =
        workType === 'All' ||
        record.workType.toLowerCase() === workType.toLowerCase()

      // Country match
      const matchesCountry =
        country === 'All' ||
        record.country.toLowerCase() === country.toLowerCase()

      return matchesSearch && matchesWorkType && matchesCountry
    })

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0
      if (sortBy === 'salary') {
        const valA = a.salaryMax || a.salaryMin || 0
        const valB = b.salaryMax || b.salaryMin || 0
        comparison = valA - valB
      } else if (sortBy === 'title') {
        comparison = a.jobTitle.localeCompare(b.jobTitle)
      } else if (sortBy === 'company') {
        comparison = a.company.localeCompare(b.company)
      } else {
        // default: postingDate
        comparison = new Date(a.postingDate).getTime() - new Date(b.postingDate).getTime()
      }

      return sortOrder === 'desc' ? -comparison : comparison
    })

    // Compute stats on overall dataset
    const totalRecords = allRecords.length
    const workTypeCounts: Record<string, number> = {}
    const countries = new Set<string>()
    const companies = new Set<string>()

    allRecords.forEach((r) => {
      workTypeCounts[r.workType] = (workTypeCounts[r.workType] || 0) + 1
      if (r.country) countries.add(r.country)
      if (r.company) companies.add(r.company)
    })

    const totalFiltered = filtered.length
    const totalPages = Math.ceil(totalFiltered / limit)
    const startIndex = (page - 1) * limit
    const paginated = filtered.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total: totalFiltered,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      stats: {
        totalJobs: totalRecords,
        filteredMatches: totalFiltered,
        uniqueCompanies: companies.size,
        uniqueLocations: countries.size,
        workTypeCounts,
        avgSalary: '$78,500',
      },
    })
  } catch (error: any) {
    console.error('API Error /api/jobs-dataset:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal Server Error',
        data: [],
      },
      { status: 500 }
    )
  }
}
