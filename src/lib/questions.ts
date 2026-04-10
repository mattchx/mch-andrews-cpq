export type QuestionType = 'text' | 'select' | 'multiselect' | 'number' | 'scale' | 'textarea'

export interface Option {
  label: string
  value: string
  score?: number // for risk scoring
}

export interface Question {
  id: string
  label: string
  type: QuestionType
  options?: Option[]
  placeholder?: string
  required?: boolean
  hasNotes?: boolean // optional notes field for spouse differences etc.
  min?: number
  max?: number
  step?: number
  scaleLabels?: { low: string; high: string }
}

export interface QuestionSection {
  id: string
  title: string
  description: string
  questions: Question[]
}

export const sections: QuestionSection[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Basic information about you and your family.',
    questions: [
      {
        id: 'fullName',
        label: 'Full Name',
        type: 'text',
        placeholder: 'e.g. John Smith',
        required: true,
      },
      {
        id: 'dateOfBirth',
        label: 'Date of Birth',
        type: 'text',
        placeholder: 'e.g. January 15, 1970',
        required: true,
      },
      {
        id: 'maritalStatus',
        label: 'Marital Status',
        type: 'select',
        required: true,
        options: [
          { label: 'Single', value: 'single' },
          { label: 'Married / Common-Law', value: 'married' },
          { label: 'Separated / Divorced', value: 'separated' },
          { label: 'Widowed', value: 'widowed' },
        ],
      },
      {
        id: 'spouseName',
        label: 'Spouse / Partner Name',
        type: 'text',
        placeholder: 'Leave blank if not applicable',
      },
      {
        id: 'employmentStatus',
        label: 'Employment Status',
        type: 'select',
        required: true,
        options: [
          { label: 'Employed (Full-Time)', value: 'employed-ft' },
          { label: 'Employed (Part-Time)', value: 'employed-pt' },
          { label: 'Self-Employed / Business Owner', value: 'self-employed' },
          { label: 'Retired', value: 'retired' },
          { label: 'Not Currently Working', value: 'not-working' },
        ],
      },
      {
        id: 'occupation',
        label: 'Occupation / Industry',
        type: 'text',
        placeholder: 'e.g. Marketing Director, Construction',
        required: true,
      },
      {
        id: 'dependents',
        label: 'Number of Dependents',
        type: 'number',
        placeholder: '0',
        min: 0,
        max: 20,
      },
      {
        id: 'dependentAges',
        label: 'Ages of Dependents',
        type: 'text',
        placeholder: 'e.g. 12, 15, 22',
        hasNotes: true,
      },
    ],
  },
  {
    id: 'financial',
    title: 'Financial Snapshot',
    description: 'A high-level picture of your current financial situation.',
    questions: [
      {
        id: 'annualIncome',
        label: 'Annual Household Income',
        type: 'select',
        required: true,
        options: [
          { label: 'Under $75,000', value: 'under-75k' },
          { label: '$75,000 - $150,000', value: '75k-150k' },
          { label: '$150,000 - $250,000', value: '150k-250k' },
          { label: '$250,000 - $500,000', value: '250k-500k' },
          { label: 'Over $500,000', value: 'over-500k' },
        ],
      },
      {
        id: 'netWorth',
        label: 'Estimated Net Worth',
        type: 'select',
        required: true,
        hasNotes: true,
        options: [
          { label: 'Under $250,000', value: 'under-250k' },
          { label: '$250,000 - $500,000', value: '250k-500k' },
          { label: '$500,000 - $1,000,000', value: '500k-1m' },
          { label: '$1,000,000 - $3,000,000', value: '1m-3m' },
          { label: 'Over $3,000,000', value: 'over-3m' },
        ],
      },
      {
        id: 'monthlySavings',
        label: 'Monthly Savings / Investment Amount',
        type: 'select',
        options: [
          { label: 'Not currently saving', value: 'none' },
          { label: 'Under $500', value: 'under-500' },
          { label: '$500 - $1,500', value: '500-1500' },
          { label: '$1,500 - $3,000', value: '1500-3000' },
          { label: 'Over $3,000', value: 'over-3000' },
        ],
      },
      {
        id: 'investmentAccounts',
        label: 'Existing Investment Accounts',
        type: 'multiselect',
        hasNotes: true,
        options: [
          { label: 'RRSP', value: 'rrsp' },
          { label: 'TFSA', value: 'tfsa' },
          { label: 'Non-Registered', value: 'non-registered' },
          { label: 'RESP', value: 'resp' },
          { label: 'Corporate / Holding Company', value: 'corporate' },
          { label: 'Pension (DB or DC)', value: 'pension' },
          { label: 'None', value: 'none' },
        ],
      },
      {
        id: 'debts',
        label: 'Outstanding Debts',
        type: 'multiselect',
        hasNotes: true,
        options: [
          { label: 'Mortgage', value: 'mortgage' },
          { label: 'Line of Credit', value: 'loc' },
          { label: 'Car Loan', value: 'car' },
          { label: 'Student Loan', value: 'student' },
          { label: 'Credit Card Balance', value: 'credit-card' },
          { label: 'Business Debt', value: 'business' },
          { label: 'None', value: 'none' },
        ],
      },
      {
        id: 'primaryIncomeSource',
        label: 'Primary Source of Income',
        type: 'select',
        required: true,
        options: [
          { label: 'Employment Income', value: 'employment' },
          { label: 'Business Income', value: 'business' },
          { label: 'Pension / CPP / OAS', value: 'pension' },
          { label: 'Investment Income', value: 'investment' },
          { label: 'Rental Income', value: 'rental' },
        ],
      },
    ],
  },
  {
    id: 'goals',
    title: 'Goals & Timeline',
    description: 'What you want to achieve and when.',
    questions: [
      {
        id: 'retirementAge',
        label: 'Target Retirement Age',
        type: 'number',
        placeholder: 'e.g. 65',
        min: 40,
        max: 85,
        required: true,
      },
      {
        id: 'topGoal1',
        label: 'Most Important Financial Goal',
        type: 'select',
        required: true,
        options: [
          { label: 'Comfortable retirement', value: 'retirement' },
          { label: 'Grow / protect wealth', value: 'wealth' },
          { label: 'Fund children\'s education', value: 'education' },
          { label: 'Pay off debts', value: 'debt-free' },
          { label: 'Buy / upgrade property', value: 'property' },
          { label: 'Start or grow a business', value: 'business' },
          { label: 'Leave a legacy / estate', value: 'legacy' },
          { label: 'Travel / lifestyle', value: 'lifestyle' },
        ],
      },
      {
        id: 'topGoal2',
        label: 'Second Most Important Goal',
        type: 'select',
        options: [
          { label: 'Comfortable retirement', value: 'retirement' },
          { label: 'Grow / protect wealth', value: 'wealth' },
          { label: 'Fund children\'s education', value: 'education' },
          { label: 'Pay off debts', value: 'debt-free' },
          { label: 'Buy / upgrade property', value: 'property' },
          { label: 'Start or grow a business', value: 'business' },
          { label: 'Leave a legacy / estate', value: 'legacy' },
          { label: 'Travel / lifestyle', value: 'lifestyle' },
        ],
      },
      {
        id: 'goalTimeline',
        label: 'When do you need to access these funds?',
        type: 'select',
        required: true,
        options: [
          { label: 'Within 1-3 years', value: '1-3' },
          { label: '3-5 years', value: '3-5' },
          { label: '5-10 years', value: '5-10' },
          { label: '10-20 years', value: '10-20' },
          { label: '20+ years', value: '20+' },
        ],
      },
      {
        id: 'upcomingExpenses',
        label: 'Any major upcoming expenses?',
        type: 'textarea',
        placeholder: 'e.g. Home renovation ($50K in 2 years), child starting university in 2028',
        hasNotes: true,
      },
      {
        id: 'retirementLifestyle',
        label: 'Describe your ideal retirement lifestyle',
        type: 'textarea',
        placeholder: 'e.g. Travel 3 months a year, maintain current home, help grandchildren with education',
      },
    ],
  },
  {
    id: 'risk',
    title: 'Risk Tolerance',
    description: 'Understanding your comfort level with investment risk.',
    questions: [
      {
        id: 'investmentExperience',
        label: 'How long have you been investing?',
        type: 'select',
        required: true,
        options: [
          { label: 'No experience', value: 'none', score: 0 },
          { label: '1-3 years', value: '1-3', score: 10 },
          { label: '3-10 years', value: '3-10', score: 15 },
          { label: '10+ years', value: '10+', score: 20 },
        ],
      },
      {
        id: 'portfolioDrop',
        label: 'If your portfolio dropped 20% in a month, what would you do?',
        type: 'select',
        required: true,
        options: [
          { label: 'Sell everything immediately', value: 'sell', score: 0 },
          { label: 'Sell some to reduce risk', value: 'sell-some', score: 5 },
          { label: 'Do nothing and wait it out', value: 'hold', score: 15 },
          { label: 'Buy more at the lower price', value: 'buy', score: 20 },
        ],
      },
      {
        id: 'returnVsStability',
        label: 'What matters more to you?',
        type: 'select',
        required: true,
        options: [
          { label: 'Protecting what I have — even if returns are low', value: 'protect', score: 0 },
          { label: 'Steady, predictable growth with minimal ups and downs', value: 'steady', score: 8 },
          { label: 'A mix of growth and stability', value: 'balanced', score: 14 },
          { label: 'Higher returns — I can handle the ups and downs', value: 'growth', score: 20 },
        ],
      },
      {
        id: 'incomeStability',
        label: 'How stable is your current income?',
        type: 'select',
        required: true,
        options: [
          { label: 'Very stable (government, tenured, pension)', value: 'very-stable', score: 20 },
          { label: 'Stable (salaried, long-term employer)', value: 'stable', score: 15 },
          { label: 'Somewhat variable (commission, contract)', value: 'variable', score: 8 },
          { label: 'Unpredictable (seasonal, self-employed, startup)', value: 'unpredictable', score: 3 },
        ],
      },
      {
        id: 'emergencyFund',
        label: 'How many months of expenses do you have in emergency savings?',
        type: 'select',
        required: true,
        options: [
          { label: 'None', value: 'none', score: 0 },
          { label: '1-2 months', value: '1-2', score: 5 },
          { label: '3-6 months', value: '3-6', score: 10 },
          { label: '6-12 months', value: '6-12', score: 15 },
          { label: '12+ months', value: '12+', score: 20 },
        ],
      },
      {
        id: 'comfortLevel',
        label: 'On a scale of 1-10, how comfortable are you with market fluctuation?',
        type: 'scale',
        min: 1,
        max: 10,
        step: 1,
        scaleLabels: { low: 'Very uncomfortable', high: 'Very comfortable' },
        required: true,
      },
    ],
  },
  {
    id: 'insurance',
    title: 'Insurance & Estate',
    description: 'Protection and planning for your family\'s future.',
    questions: [
      {
        id: 'lifeInsurance',
        label: 'Do you have life insurance?',
        type: 'select',
        required: true,
        hasNotes: true,
        options: [
          { label: 'Yes — adequate coverage', value: 'yes-adequate' },
          { label: 'Yes — but may need review', value: 'yes-review' },
          { label: 'No', value: 'no' },
          { label: 'Not sure', value: 'unsure' },
        ],
      },
      {
        id: 'disabilityInsurance',
        label: 'Do you have disability or critical illness insurance?',
        type: 'select',
        required: true,
        options: [
          { label: 'Yes — both', value: 'both' },
          { label: 'Yes — disability only', value: 'disability' },
          { label: 'Yes — critical illness only', value: 'critical' },
          { label: 'No', value: 'no' },
          { label: 'Through employer', value: 'employer' },
        ],
      },
      {
        id: 'willAndPOA',
        label: 'Do you have a will and power of attorney in place?',
        type: 'select',
        required: true,
        options: [
          { label: 'Yes — both up to date', value: 'yes-both' },
          { label: 'Yes — but needs updating', value: 'needs-update' },
          { label: 'Will only', value: 'will-only' },
          { label: 'POA only', value: 'poa-only' },
          { label: 'No — neither', value: 'no' },
        ],
      },
      {
        id: 'businessSuccession',
        label: 'Do you have a business succession plan?',
        type: 'select',
        hasNotes: true,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'In progress', value: 'in-progress' },
          { label: 'No', value: 'no' },
          { label: 'Not applicable', value: 'na' },
        ],
      },
      {
        id: 'additionalNotes',
        label: 'Anything else you\'d like us to know?',
        type: 'textarea',
        placeholder: 'Any concerns, questions, or important details we should be aware of...',
      },
    ],
  },
]
