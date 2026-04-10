import { sections } from './questions'
import { calculateRiskScore } from './scoring'
import { generateRecommendations } from './recommendations'

export function exportText(answers: Record<string, string | string[]>) {
  const risk = calculateRiskScore(answers)
  const recommendations = generateRecommendations(answers, risk)
  const clientName = (answers.fullName as string) || 'Client'
  const date = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })

  const lines: string[] = []

  lines.push('THE ANDREWS GROUP')
  lines.push('CI Assante Wealth Management')
  lines.push('')
  lines.push('CLIENT PROFILE SUMMARY')
  lines.push(`${clientName}  |  ${date}`)
  lines.push('='.repeat(50))
  lines.push('')

  // Risk Profile
  lines.push('RISK PROFILE')
  lines.push('-'.repeat(30))
  lines.push(`Score: ${risk.score}/100  —  ${risk.category}`)
  lines.push(risk.description)
  lines.push('')

  // Recommendations
  if (recommendations.length > 0) {
    lines.push('RECOMMENDATIONS')
    lines.push('-'.repeat(30))
    for (const rec of recommendations) {
      lines.push(`[${rec.priority.toUpperCase()}] ${rec.title}`)
      lines.push(`  ${rec.description}`)
      lines.push('')
    }
  }

  // Complete Profile
  for (const section of sections) {
    const answeredQuestions = section.questions.filter(q => {
      const val = answers[q.id]
      return val && (typeof val === 'string' ? val.trim() : val.length > 0)
    })

    if (answeredQuestions.length === 0) continue

    lines.push(section.title.toUpperCase())
    lines.push('-'.repeat(30))

    for (const question of answeredQuestions) {
      const val = answers[question.id]
      const noteVal = answers[`${question.id}_notes`] as string

      let displayValue: string
      if (Array.isArray(val)) {
        displayValue = val.map(v => {
          const opt = question.options?.find(o => o.value === v)
          return opt?.label ?? v
        }).join(', ')
      } else if (question.options) {
        const opt = question.options.find(o => o.value === val)
        displayValue = opt?.label ?? (val as string)
      } else if (question.type === 'scale') {
        displayValue = `${val} / ${question.max}`
      } else {
        displayValue = val as string
      }

      if (noteVal) displayValue += ` (${noteVal})`

      lines.push(`${question.label}: ${displayValue}`)
    }

    lines.push('')
  }

  const text = lines.join('\n')
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const fileDate = new Date().toISOString().split('T')[0]
  a.download = `${clientName.replace(/\s+/g, '_')}_Profile_${fileDate}.txt`
  a.click()
  URL.revokeObjectURL(url)
}
