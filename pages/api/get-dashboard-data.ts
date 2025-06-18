import { NextApiRequest, NextApiResponse } from 'next'

type Deposit = {
  date: string
  amount: number
  ftd?: number
  rev?: number
  cpa?: number
}
const NOTION_TOKEN = process.env.NOTION_TOKEN!
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const { btag } = req.body

    if (!btag) {
      return res.status(400).json({ error: 'Missing btag' })
    }

    const notionRes = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filter: {
          property: 'btag',
          rich_text: {
            equals: btag
          }
        }
      })
    })

    const notionData = await notionRes.json()

    const deposits: Deposit[] = notionData.results
      .map((item: any): Deposit => ({
        date: item.properties['Date/Hora']?.date?.start || '',
        amount: item.properties['Deposito']?.number ?? 0,
        ftd: item.properties['FTD']?.number ?? 0,
        rev: item.properties['RevShare']?.number ?? 0,
        cpa: item.properties['CPA']?.number ?? 0
      }))
      .filter((dep: Deposit) => dep.amount > 0 && dep.date)

    return res.status(200).json({
      deposits,
      referredUsers: [] // manter vazio ou expandir depois
    })
  } catch (error: any) {
    return res.status(500).json({
      error: 'Erro ao consultar Notion',
      detail: error.message
    })
  }
}