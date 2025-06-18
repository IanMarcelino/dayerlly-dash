import { subDays } from 'date-fns'
import type { AffiliateData, KPIData, DailyDeposit, ReferredUser } from '@/lib/mock-data'

export function getFilteredDashboardData(
  raw: AffiliateData,
  range: 'week' | 'month' | 'custom',
  from?: Date,
  to?: Date
): {
  kpi: KPIData
  deposits: DailyDeposit[]
  referredUsers: ReferredUser[]
} {
  const now = new Date()

  const start =
    range === 'week'
      ? subDays(now, 7)
      : range === 'month'
      ? subDays(now, 30)
      : from || subDays(now, 7)

  const end = to || now

  const filteredDeposits = raw.dailyDeposits.filter((dep: DailyDeposit) => {
    const date = new Date(dep.date)
    return date >= start && date <= end
  })

  const filteredUsers = raw.referredUsers.filter((user: ReferredUser) => {
    const date = new Date(user.joinDate)
    return date >= start && date <= end
  })

  // usa kpis direto do mock
  return {
    kpi: raw.kpis!, // confia que está presente no mock
    deposits: filteredDeposits,
    referredUsers: filteredUsers
  }
}