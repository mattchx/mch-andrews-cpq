import type { RiskResult } from './scoring'

export interface Recommendation {
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

export function generateRecommendations(
  answers: Record<string, string | string[]>,
  risk: RiskResult
): Recommendation[] {
  const recs: Recommendation[] = []

  // No will or POA
  const willStatus = answers.willAndPOA as string
  if (willStatus === 'no' || willStatus === 'will-only' || willStatus === 'poa-only' || willStatus === 'needs-update') {
    recs.push({
      title: 'Estate Planning Review',
      description: 'A current will and power of attorney are essential to protect your family and ensure your wishes are followed.',
      priority: 'high',
    })
  }

  // No emergency fund
  const emergencyFund = answers.emergencyFund as string
  if (emergencyFund === 'none' || emergencyFund === '1-2') {
    recs.push({
      title: 'Emergency Fund Priority',
      description: 'Building 3-6 months of expenses in accessible savings provides a safety net and prevents needing to dip into investments.',
      priority: 'high',
    })
  }

  // Business owner without succession plan
  const employment = answers.employmentStatus as string
  const succession = answers.businessSuccession as string
  if (employment === 'self-employed' && (succession === 'no' || !succession)) {
    recs.push({
      title: 'Business Continuity Planning',
      description: 'As a business owner, a succession plan protects your business value and ensures continuity for your family and employees.',
      priority: 'high',
    })
  }

  // Close to retirement with aggressive risk
  const retirementAge = parseInt(answers.retirementAge as string)
  const dob = answers.dateOfBirth as string
  if (retirementAge && dob) {
    const birthYear = extractYear(dob)
    if (birthYear) {
      const currentAge = new Date().getFullYear() - birthYear
      const yearsToRetirement = retirementAge - currentAge
      if (yearsToRetirement < 10 && risk.score > 70) {
        recs.push({
          title: 'Risk Alignment Review',
          description: `With ${yearsToRetirement} years to your target retirement, your risk tolerance may be higher than what your timeline supports. A gradual shift toward more stable investments could protect your retirement savings.`,
          priority: 'high',
        })
      }
    }
  }

  // No life insurance with dependents
  const dependents = parseInt(answers.dependents as string) || 0
  const lifeInsurance = answers.lifeInsurance as string
  if (dependents > 0 && (lifeInsurance === 'no' || lifeInsurance === 'unsure')) {
    recs.push({
      title: 'Life Insurance Needs Analysis',
      description: `With ${dependents} dependent${dependents > 1 ? 's' : ''}, life insurance is critical to ensure their financial security.`,
      priority: 'high',
    })
  }

  // No disability insurance
  const disability = answers.disabilityInsurance as string
  if (disability === 'no' && employment !== 'retired') {
    recs.push({
      title: 'Income Protection',
      description: 'Disability insurance protects your most valuable asset — your ability to earn. Consider coverage that replaces 60-70% of your income.',
      priority: 'medium',
    })
  }

  // TFSA/RRSP not being used
  const accounts = answers.investmentAccounts as string[]
  if (accounts && !accounts.includes('none')) {
    if (!accounts.includes('tfsa')) {
      recs.push({
        title: 'TFSA Optimization',
        description: 'A Tax-Free Savings Account offers tax-free growth and flexible withdrawals. Maximizing your TFSA contribution room is one of the most effective tax strategies available.',
        priority: 'medium',
      })
    }
    if (!accounts.includes('rrsp') && employment !== 'retired') {
      recs.push({
        title: 'RRSP Strategy',
        description: 'Registered Retirement Savings Plan contributions reduce your taxable income today and grow tax-deferred. Review your available contribution room.',
        priority: 'medium',
      })
    }
  }

  // Not saving
  const savings = answers.monthlySavings as string
  if (savings === 'none' && employment !== 'retired') {
    recs.push({
      title: 'Savings Plan',
      description: 'Establishing a regular savings habit — even a modest amount — is the foundation of long-term wealth building.',
      priority: 'medium',
    })
  }

  // Debt with no plan
  const debts = answers.debts as string[]
  if (debts && debts.includes('credit-card')) {
    recs.push({
      title: 'Debt Management Strategy',
      description: 'High-interest credit card debt should be addressed before focusing on investment growth. A structured paydown plan can save significant interest.',
      priority: 'medium',
    })
  }

  // Short timeline with goals
  const timeline = answers.goalTimeline as string
  if (timeline === '1-3' && risk.score > 60) {
    recs.push({
      title: 'Short-Term Goal Protection',
      description: 'With funds needed in 1-3 years, consider more conservative placement for these specific goals to protect against short-term market volatility.',
      priority: 'medium',
    })
  }

  return recs.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 }
    return order[a.priority] - order[b.priority]
  })
}

function extractYear(dateStr: string): number | null {
  const match = dateStr.match(/\b(19|20)\d{2}\b/)
  return match ? parseInt(match[0]) : null
}
