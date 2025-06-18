// Novo formato: array de afiliados com multiplas btags por userId
export interface DealConfig {
  userId: string
  btags: string[]
  valores: {
    ftd: number     // R$ por FTD (0 se desabilitado)
    cpa: number     // R$ por CPA (0 se desabilitado)
    rev: number     // porcentagem, ex: 0.20 = 20%
  }
}

export const DEALS_BY_USER: DealConfig[] = [
  {
    userId: '82c69510-f9e4-4acc-b32e-6933059165f5',
    btags: ['123456', 'btagextra'],
    valores: {
      ftd: 100,
      cpa: 0,
      rev: 0.25
    }
  },
  {
    userId: '4496633a-7415-41b7-96c4-fd95a1c49d50',
    btags: ['123456', 'v#@91sau'],
    valores: {
      ftd: 0,
      cpa: 75,
      rev: 0
    }
  }
]