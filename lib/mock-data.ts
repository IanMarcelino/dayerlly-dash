// ============================
// 📌 TIPAGENS
// ============================

export interface KPIData {
  totalDeposits: number
  cpas: number
  ftds: number
  revShare: number
  estimatedCommission: number
  depositChange: number
  registros?: number
  cliques?: number
}

export interface DailyDeposit {
  date: string
  amount: number
  ftd?: number
  cpa?: number
  rev?: number
}

export interface ReferredUser {
  id: string
  username: string
  email: string
  joinDate: string
  depositAmount: number
  status: 'CPA' | 'FTD' | 'Active' | 'Inactive'
  lastActivity: string
}

export interface AffiliateData {
  kpis?: KPIData
  dailyDeposits: DailyDeposit[]
  referredUsers: ReferredUser[]
}

// ============================
// 📌 FUNÇÃO DE FILTRAGEM (usa KPIs fixos do mock)
// ============================

export function getFilteredData(
  data: AffiliateData,
  dateRange: 'week' | 'month' | 'custom',
  customStart?: Date,
  customEnd?: Date
): AffiliateData {
  const now = new Date()
  let startDate: Date

  switch (dateRange) {
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case 'month':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      break
    case 'custom':
      startDate = customStart || new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  }

  const endDate = customEnd || now

  const filteredDeposits = data.dailyDeposits.filter(deposit => {
    const depositDate = new Date(deposit.date)
    return depositDate >= startDate && depositDate <= endDate
  })

  const filteredUsers = data.referredUsers.filter(user => {
    const userDate = new Date(user.joinDate)
    return userDate >= startDate && userDate <= endDate
  })

  return {
    kpis: data.kpis!, // ✅ utiliza os valores do mock como estão
    dailyDeposits: filteredDeposits,
    referredUsers: filteredUsers
  }
}

// ============================
// ✅ MOCK DE DADOS PARA TESTE
// ============================

import { subDays, formatISO } from 'date-fns'

const today = new Date()

export const mockAffiliateData: AffiliateData = {
  kpis: {
    totalDeposits: 19129,
    cpas: 0,
    ftds: 164,
    revShare: 0,
    estimatedCommission: 0,
    depositChange: 0,
    registros: 287,
    cliques: 1438
  },
  dailyDeposits: [
    { date: formatISO(subDays(today, 6)), amount: 3000, ftd: 1 },
    { date: formatISO(subDays(today, 5)), amount: 2400, rev: 0.2 },
    { date: formatISO(subDays(today, 4)), amount: 2600, cpa: 1 },
    { date: formatISO(subDays(today, 3)), amount: 3100 },
    { date: formatISO(subDays(today, 2)), amount: 3900, rev: 0.2 },
    { date: formatISO(subDays(today, 1)), amount: 2029 }
  ],
  referredUsers: []
}

// ============================
// 🔚 FIM DO MOCK
// ============================