import React from 'react'
import {
  Activity,
  CalendarDays,
  Heart,
  Target,
  TrendingUp,
  Waves,
  Smile,
} from 'lucide-react'

const statCards = [
  {
    id: 'mood',
    icon: Heart,
    value: 'calm',
    label: 'Current Mood',
    sub: 'Score: 7/10',
    iconColor: 'bg-linear-to-br from-[#ff2f7c] to-[#ff4bb3]',
  },
  {
    id: 'activities',
    icon: Activity,
    value: '23',
    label: 'Activities Done',
    sub: 'This week',
    iconColor: 'bg-linear-to-br from-[#7d5bff] to-[#5f79ff]',
  },
  {
    id: 'streak',
    icon: TrendingUp,
    value: '7 days',
    label: 'Wellness Streak',
    sub: 'Keep it up!',
    iconColor: 'bg-linear-to-br from-[#00b85d] to-[#00d084]',
  },
  {
    id: 'goal',
    icon: Target,
    value: '85%',
    label: 'Weekly Goal',
    sub: '17/20 activities',
    iconColor: 'bg-linear-to-br from-[#1890ff] to-[#00c2ff]',
  },
]

const emotionDistribution = [
  { name: 'Happy', count: 12, percent: 26, color: 'bg-[#f7be00]' },
  { name: 'Calm', count: 18, percent: 39, color: 'bg-[#4a90e2]' },
  { name: 'Anxious', count: 5, percent: 11, color: 'bg-[#ff8a00]' },
  { name: 'Sad', count: 3, percent: 7, color: 'bg-[#a56de2]' },
  { name: 'Energetic', count: 8, percent: 17, color: 'bg-[#19cc72]' },
]

const weeklyGoals = [
  { name: 'Meditation Minutes', value: '140/150 min', progress: 93 },
  { name: 'Breathing Exercises', value: '12/15 sessions', progress: 80 },
  { name: 'Mood Check-ins', value: '7/7 days', progress: 100 },
]

const MoodLineChart = () => (
  <svg viewBox='0 0 520 210' className='h-52 w-full text-[#8f4dff]' role='img' aria-label='Mood trend for 7 days'>
    <rect x='0' y='0' width='520' height='210' fill='transparent' />
    <g stroke='#d9deea' strokeWidth='1'>
      <line x1='0' y1='180' x2='520' y2='180' />
      <line x1='0' y1='135' x2='520' y2='135' />
      <line x1='0' y1='90' x2='520' y2='90' />
      <line x1='0' y1='45' x2='520' y2='45' />
    </g>
    <defs>
      <linearGradient id='moodFill' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stopColor='#a968ff' stopOpacity='0.45' />
        <stop offset='100%' stopColor='#a968ff' stopOpacity='0.05' />
      </linearGradient>
    </defs>
    <path
      d='M0,145 C42,130 74,120 104,116 C132,112 138,155 168,158 C212,162 234,78 267,84 C302,90 323,122 352,112 C382,101 396,57 432,58 C465,59 488,72 520,86 L520,210 L0,210 Z'
      fill='url(#moodFill)'
    />
    <path
      d='M0,145 C42,130 74,120 104,116 C132,112 138,155 168,158 C212,162 234,78 267,84 C302,90 323,122 352,112 C382,101 396,57 432,58 C465,59 488,72 520,86'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
    />
  </svg>
)

const ActivityLineChart = () => (
  <svg viewBox='0 0 520 210' className='h-52 w-full text-[#6f57ff]' role='img' aria-label='Activity and sleep trend'>
    <rect x='0' y='0' width='520' height='210' fill='transparent' />
    <g stroke='#d9deea' strokeWidth='1'>
      <line x1='0' y1='180' x2='520' y2='180' />
      <line x1='0' y1='135' x2='520' y2='135' />
      <line x1='0' y1='90' x2='520' y2='90' />
      <line x1='0' y1='45' x2='520' y2='45' />
      <line x1='86' y1='30' x2='86' y2='180' strokeDasharray='4 6' />
      <line x1='173' y1='30' x2='173' y2='180' strokeDasharray='4 6' />
      <line x1='260' y1='30' x2='260' y2='180' strokeDasharray='4 6' />
      <line x1='347' y1='30' x2='347' y2='180' strokeDasharray='4 6' />
      <line x1='434' y1='30' x2='434' y2='180' strokeDasharray='4 6' />
    </g>
    <polyline
      points='0,116 87,145 174,168 261,78 348,116 435,52 520,78'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    {[
      [0, 116],
      [87, 145],
      [174, 168],
      [261, 78],
      [348, 116],
      [435, 52],
      [520, 78],
    ].map((point) => (
      <circle key={point.join('-')} cx={point[0]} cy={point[1]} r='5.2' fill='white' stroke='currentColor' strokeWidth='3' />
    ))}
  </svg>
)

const Home = () => {
  return (
    <section className="mx-auto max-w-7xl space-y-5 rounded-[26px] border border-[#e0dcef] bg-linear-to-br from-[#f3f2fa] to-[#edf2fb] p-4 text-[#172033] shadow-[0_20px_46px_rgba(99,89,138,0.1)] [font-family:Poppins,'Segoe_UI',Tahoma,sans-serif] md:p-6">
      <header>
        <h1 className='text-4xl font-bold text-[#8c2ee6] md:text-5xl'>Your Wellness Dashboard</h1>
        <p className='mt-2 text-xl text-[#345070]'>Track your emotional well-being and progress</p>
      </header>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {statCards.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.id} className='rounded-3xl border border-[#d9d9e8] bg-white/85 p-7 shadow-[0_8px_18px_rgba(31,41,55,0.06)]'>
              <span className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white ${item.iconColor}`}>
                <Icon size={30} strokeWidth={2.2} />
              </span>
              <h2 className='mt-10 text-5xl font-semibold text-[#171c27]'>{item.value}</h2>
              <p className='mt-2 text-3xl text-[#586376]'>{item.label}</p>
              <p className='mt-10 text-2xl text-[#6f7a8b]'>{item.sub}</p>
            </article>
          )
        })}
      </div>

      <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
        <article className='rounded-3xl border border-[#d9d9e8] bg-white/90 p-6 shadow-[0_10px_24px_rgba(31,41,55,0.06)]'>
          <h2 className='flex items-center gap-2 text-4xl font-semibold text-[#1f2430]'>
            <TrendingUp size={30} className='text-[#8f4dff]' />
            Mood Trend (7 Days)
          </h2>
          <div className='mt-5'>
            <MoodLineChart />
          </div>
        </article>

        <article className='rounded-3xl border border-[#d9d9e8] bg-white/90 p-6 shadow-[0_10px_24px_rgba(31,41,55,0.06)]'>
          <h2 className='flex items-center gap-2 text-4xl font-semibold text-[#1f2430]'>
            <Waves size={30} className='text-[#3767ff]' />
            Activity & Sleep Patterns
          </h2>
          <div className='mt-5'>
            <ActivityLineChart />
          </div>
        </article>
      </div>

      <article className='rounded-3xl border border-[#d9d9e8] bg-white/90 p-6 shadow-[0_10px_24px_rgba(31,41,55,0.06)]'>
        <h2 className='flex items-center gap-2 text-4xl font-semibold text-[#1f2430]'>
          <Smile size={30} className='text-[#ff2f87]' />
          Emotion Distribution (This Month)
        </h2>
        <div className='mt-8 space-y-6'>
          {emotionDistribution.map((item) => (
            <div key={item.name}>
              <div className='mb-2 flex items-center justify-between text-3xl text-[#243143]'>
                <p>{item.name}</p>
                <p className='text-[#5a6678]'>{item.count} times ({item.percent}%)</p>
              </div>
              <div className='h-5 rounded-full bg-[#d4d7de]'>
                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className='rounded-3xl bg-linear-to-r from-[#8e26ff] via-[#bf36d8] to-[#f0007f] p-6 text-white shadow-[0_16px_36px_rgba(198,36,166,0.3)]'>
        <h2 className='flex items-center gap-2 text-4xl font-semibold'>
          <CalendarDays size={30} />
          Weekly Wellness Goals
        </h2>
        <div className='mt-7 grid grid-cols-1 gap-6 md:grid-cols-3'>
          {weeklyGoals.map((goal) => (
            <div key={goal.name}>
              <p className='text-3xl text-white/90'>{goal.name}</p>
              <p className='mt-2 text-5xl font-semibold'>{goal.value}</p>
              <div className='mt-4 h-3 rounded-full bg-white/35'>
                <div className='h-full rounded-full bg-[#0b0f21]' style={{ width: `${goal.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

export default Home
