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
// 📌 FUNÇÃO DE FILTRAGEM
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
    kpis: data.kpis!,
    dailyDeposits: filteredDeposits,
    referredUsers: filteredUsers
  }
}

// ============================
// ✅ MOCK DE DADOS PARA TESTE
// ============================

import { format } from 'date-fns'

export const mockAffiliateData: AffiliateData = {
  kpis: {
    totalDeposits: 50,
    cpas: 1,
    ftds: 2,
    revShare: 0,
    estimatedCommission: 30,
    depositChange: 0,
    registros: 4,
    cliques: 0
  },

  dailyDeposits: [
    {
      date: format(new Date(2025, 5, 18), "yyyy-MM-dd"), // 18 de junho (junho = mês 5)
      amount: 29.12,
      rev: 6.98 / 29.12 // Isso resultará em exatamente 6.98 no gráfico
    }
  ],

  referredUsers: []
}

// ============================
// 🔚 FIM DO MOCK
// ============================