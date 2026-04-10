interface WelcomeProps {
  onStart: () => void
}

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-navy rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-gold text-2xl font-bold">AG</span>
          </div>
          <h1 className="text-3xl font-bold text-navy-dark mb-2">The Andrews Group</h1>
          <p className="text-navy-light/70 text-sm">CI Assante Wealth Management</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-navy-dark mb-3">Client Profile Questionnaire</h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            This questionnaire helps us understand your financial situation, goals, and comfort with risk.
            Your answers will generate a personalized profile and recommendations to guide our planning together.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              10-15 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              5 sections
            </span>
          </div>
          <button
            onClick={onStart}
            className="w-full bg-navy hover:bg-navy-dark text-white font-medium py-3 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Begin Questionnaire
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Your information is processed locally and is not stored or transmitted.
        </p>
      </div>
    </div>
  )
}
