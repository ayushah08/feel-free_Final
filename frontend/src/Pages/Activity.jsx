import React from 'react'
import { Cloud, Heart, Smile, Zap } from 'lucide-react'

const emotionHistory = [
  {
    id: 1,
    mood: 'Calm',
    score: '7/10',
    note: 'Morning meditation helped a lot',
    time: 'Today, 9:30 AM',
    icon: Cloud,
    iconWrap: 'bg-[#4a90e2]',
  },
  {
    id: 2,
    mood: 'Happy',
    score: '8/10',
    note: 'Great day at work!',
    time: 'Yesterday, 8:00 PM',
    icon: Smile,
    iconWrap: 'bg-[#f7be00]',
  },
  {
    id: 3,
    mood: 'Anxious',
    score: '6/10',
    note: 'Presentation stress',
    time: 'Yesterday, 2:00 PM',
    icon: Heart,
    iconWrap: 'bg-[#fb6268]',
  },
  {
    id: 4,
    mood: 'Energetic',
    score: '9/10',
    note: 'After workout feeling',
    time: 'Feb 11, 6:00 PM',
    icon: Zap,
    iconWrap: 'bg-[#ff9100]',
  },
  {
    id: 5,
    mood: 'Calm',
    score: '7/10',
    note: 'Peaceful morning',
    time: 'Feb 11, 10:00 AM',
    icon: Cloud,
    iconWrap: 'bg-[#4a90e2]',
  },
]

const Activity = () => {
  return (
    <section className="mx-auto max-w-7xl rounded-[24px] border border-[#dfd9ed] bg-[#f8f7fc] p-4 [font-family:Poppins,'Segoe_UI',Tahoma,sans-serif] md:p-6">
      <h1 className='text-5xl font-semibold text-[#202633]'>Emotion History</h1>

      <div className='mt-6 space-y-4'>
        {emotionHistory.map((entry) => {
          const Icon = entry.icon

          return (
            <article
              key={entry.id}
              className='flex items-start gap-4 rounded-3xl bg-[#f2f0f7] px-5 py-6 shadow-[0_6px_14px_rgba(57,64,86,0.1)]'
            >
              <span className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white ${entry.iconWrap}`}>
                <Icon size={30} strokeWidth={2.2} />
              </span>

              <div className='min-w-0'>
                <div className='flex flex-wrap items-center gap-3'>
                  <h2 className='text-4xl font-medium text-[#202633]'>{entry.mood}</h2>
                  <span className='rounded-xl bg-[#e3e3ea] px-3 py-1 text-3xl text-[#2f3645]'>{entry.score}</span>
                </div>
                <p className='mt-2 text-3xl text-[#556174]'>{entry.note}</p>
                <p className='mt-2 text-2xl text-[#6e798b]'>{entry.time}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Activity
