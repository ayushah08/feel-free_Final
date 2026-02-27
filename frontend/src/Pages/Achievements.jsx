import React from 'react'
import {
  Award,
  Brain,
  CalendarCheck2,
  CheckCircle2,
  Flame,
  Heart,
  MessageSquareHeart,
  Sparkles,
  Trophy,
} from 'lucide-react'

const achievementData = [
  {
    id: 1,
    code: 'FIRST_MOOD',
    title: 'First Mood',
    description: 'Log your first mood entry.',
    earned: true,
    progress: 100,
    icon: MessageSquareHeart,
    color: 'from-rose-400 to-pink-500',
  },
  {
    id: 2,
    code: 'STREAK_7',
    title: '7 Day Streak',
    description: 'Complete check-ins for 7 consecutive days.',
    earned: false,
    progress: 42,
    icon: Flame,
    color: 'from-orange-400 to-amber-500',
  },
  {
    id: 3,
    code: 'STREAK_30',
    title: '30 Day Streak',
    description: 'Maintain your streak for 30 consecutive days.',
    earned: false,
    progress: 18,
    icon: CalendarCheck2,
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    id: 4,
    code: 'BREATHING_50',
    title: 'Breathing 50',
    description: 'Complete 50 breathing sessions.',
    earned: false,
    progress: 60,
    icon: Brain,
    color: 'from-cyan-400 to-sky-500',
  },
  {
    id: 5,
    code: 'FEEL_WALL_100',
    title: 'Feel Wall 100',
    description: 'Post 100 supportive notes on Feel Wall.',
    earned: false,
    progress: 31,
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 6,
    code: 'MEDITATION_10_HOURS',
    title: 'Meditation 10 Hours',
    description: 'Reach a total of 10 meditation hours.',
    earned: false,
    progress: 54,
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 7,
    code: 'FIRST_POST',
    title: 'First Post',
    description: 'Create your first community post.',
    earned: true,
    progress: 100,
    icon: MessageSquareHeart,
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 8,
    code: 'ZEN_MASTER',
    title: 'Zen Master',
    description: 'Unlock all core wellness milestones.',
    earned: false,
    progress: 25,
    icon: Trophy,
    color: 'from-yellow-400 to-orange-500',
  },
]

const Achievements = () => {
  const total = achievementData.length
  const earnedCount = achievementData.filter((item) => item.earned).length
  const progress = Math.round((earnedCount / total) * 100)

  return (
    <section className=''>
      <header className='rounded-3xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] bg-clip-text text-3xl font-bold text-transparent'>
              Achievements
            </h1>
            <p className='mt-1 text-sm text-gray-500'>Track your wellness milestones and keep your momentum going.</p>
          </div>

          <div className='inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] px-4 py-3 text-white'>
            <Trophy size={22} />
            <div>
              <p className='text-xs opacity-90'>Completed</p>
              <p className='text-lg font-semibold'>
                {earnedCount}/{total}
              </p>
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <div className='mb-2 flex items-center justify-between text-xs text-gray-500'>
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <div className='h-3 w-full overflow-hidden rounded-full bg-gray-200'>
            <div
              className='h-full rounded-full bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] transition-all duration-500'
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <div className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        {achievementData.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.id}
              className={`rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                item.earned ? 'border-green-300' : 'border-gray-200'
              }`}
            >
              <div className='flex items-start justify-between gap-3'>
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-r ${item.color} text-white`}>
                  <Icon size={20} />
                </span>

                {item.earned ? (
                  <span className='inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'>
                    <CheckCircle2 size={14} />
                    Earned
                  </span>
                ) : (
                  <span className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600'>
                    <Award size={14} />
                    Locked
                  </span>
                )}
              </div>

              <h2 className='mt-3 text-base font-semibold text-gray-800'>{item.title}</h2>
              <p className='mt-1 text-sm leading-relaxed text-gray-600'>{item.description}</p>

              <div className='mt-4 border-t border-gray-100 pt-3'>
                <div className='mb-2 flex items-center justify-between text-xs text-gray-500'>
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <div className='h-2.5 w-full overflow-hidden rounded-full bg-gray-200'>
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${item.color}`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Achievements
