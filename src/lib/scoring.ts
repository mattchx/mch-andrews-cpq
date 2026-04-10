import { sections } from './questions'

export interface RiskResult {
  score: number
  category: string
  description: string
  color: string
}

const categories: { max: number; category: string; description: string; color: string }[] = [
  { max: 20, category: 'Conservative', description: 'Capital preservation is your priority. You prefer stability over growth and are uncomfortable with market volatility.', color: '#2563eb' },
  { max: 40, category: 'Moderately Conservative', description: 'You lean toward safety but are open to some growth. A mix of income-generating and stable investments suits you.', color: '#0891b2' },
  { max: 60, category: 'Balanced', description: 'You want a balance of growth and stability. You can tolerate moderate short-term fluctuations for long-term gains.', color: '#16a34a' },
  { max: 80, category: 'Moderately Aggressive', description: 'Growth is your focus. You accept that higher returns come with higher short-term risk and can ride out market dips.', color: '#d97706' },
  { max: 100, category: 'Aggressive', description: 'You prioritize maximum growth and are comfortable with significant market swings. You have a long time horizon or high risk capacity.', color: '#dc2626' },
]

export function calculateRiskScore(answers: Record<string, string | string[]>): RiskResult {
  const riskSection = sections.find(s => s.id === 'risk')
  if (!riskSection) return { score: 0, category: 'Unknown', description: '', color: '#888' }

  let totalScore = 0
  let maxPossible = 0

  for (const question of riskSection.questions) {
    if (question.type === 'scale') {
      // Scale 1-10 maps to 0-20 points
      const val = parseInt(answers[question.id] as string) || 1
      totalScore += ((val - 1) / 9) * 20
      maxPossible += 20
    } else if (question.options) {
      const answer = answers[question.id] as string
      const option = question.options.find(o => o.value === answer)
      if (option?.score !== undefined) {
        totalScore += option.score
      }
      const maxOptionScore = Math.max(...question.options.map(o => o.score ?? 0))
      maxPossible += maxOptionScore
    }
  }

  const normalized = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0

  const cat = categories.find(c => normalized <= c.max) ?? categories[categories.length - 1]

  return {
    score: normalized,
    category: cat.category,
    description: cat.description,
    color: cat.color,
  }
}
