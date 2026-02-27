import React, { useEffect, useRef, useState } from 'react'
import { Flower2, Music2, Pause, Play, TimerReset, Wind } from 'lucide-react'

const meditationOptions = [5, 10, 15]

const Calm = () => {
  const [selectedMinutes, setSelectedMinutes] = useState(10)
  const [breathSeconds, setBreathSeconds] = useState(4)
  const [phase, setPhase] = useState('Inhale')
  const [isBreathing, setIsBreathing] = useState(false)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!isBreathing) return

    const interval = window.setInterval(() => {
      setPhase((prev) => (prev === 'Inhale' ? 'Exhale' : 'Inhale'))
    }, breathSeconds * 1000)

    return () => window.clearInterval(interval)
  }, [isBreathing, breathSeconds])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlayingMusic) {
      audio.pause()
      setIsPlayingMusic(false)
      return
    }

    try {
      await audio.play()
      setIsPlayingMusic(true)
    } catch {
      setIsPlayingMusic(false)
    }
  }

  return (
    <section className='mx-auto max-w-6xl p-2'>
      <style>{`
        @keyframes inhale {
          0% { transform: scale(0.88); opacity: 0.8; }
          100% { transform: scale(1.12); opacity: 1; }
        }
        @keyframes exhale {
          0% { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(0.88); opacity: 0.8; }
        }
      `}</style>

      <header className='rounded-3xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]'>
        <h1 className='bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] bg-clip-text text-3xl font-bold text-transparent'>
          Calm Zone
        </h1>
        <p className='mt-1 text-sm text-gray-500'>Meditation, zen sound, and guided breathing in one place.</p>
      </header>

      <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <article className='rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)]'>
          <div className='flex items-center gap-2'>
            <span className='inline-flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-r from-violet-500 to-fuchsia-500 text-white'>
              <Flower2 size={18} />
            </span>
            <h2 className='text-lg font-semibold text-gray-800'>Meditation</h2>
          </div>

          <p className='mt-3 text-sm text-gray-600'>Choose a session length and sit in silence with a soft focus on breath.</p>

          <div className='mt-4 flex flex-wrap gap-2'>
            {meditationOptions.map((minute) => (
              <button
                key={minute}
                type='button'
                onClick={() => setSelectedMinutes(minute)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  selectedMinutes === minute
                    ? 'bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {minute} min
              </button>
            ))}
          </div>

          <div className='mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700'>
            Selected meditation time: <span className='font-semibold'>{selectedMinutes} minutes</span>
          </div>
        </article>

        <article className='rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)]'>
          <div className='flex items-center gap-2'>
            <span className='inline-flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-r from-emerald-500 to-teal-500 text-white'>
              <Music2 size={18} />
            </span>
            <h2 className='text-lg font-semibold text-gray-800'>Zen Garden Song</h2>
          </div>

          <p className='mt-3 text-sm text-gray-600'>Play relaxing ambient sound while meditating or journaling.</p>

          <audio
            ref={audioRef}
            src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
            onEnded={() => setIsPlayingMusic(false)}
          />

          <button
            type='button'
            onClick={toggleMusic}
            className='mt-4 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-medium text-white'
          >
            {isPlayingMusic ? <Pause size={16} /> : <Play size={16} />}
            {isPlayingMusic ? 'Pause Song' : 'Play Song'}
          </button>
        </article>

        <article className='rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)]'>
          <div className='flex items-center gap-2'>
            <span className='inline-flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 text-white'>
              <Wind size={18} />
            </span>
            <h2 className='text-lg font-semibold text-gray-800'>Breathing Exercise</h2>
          </div>

          <p className='mt-3 text-sm text-gray-600'>Set inhale/exhale duration in seconds and follow the animated circle.</p>

          <div className='mt-3 flex items-center gap-2'>
            <label className='text-sm text-gray-700'>Seconds</label>
            <input
              type='number'
              min='2'
              max='12'
              value={breathSeconds}
              onChange={(event) => setBreathSeconds(Number(event.target.value) || 2)}
              className='w-20 rounded-lg border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-cyan-400'
            />
          </div>

          <div className='mt-4 flex flex-wrap items-center gap-2'>
            <button
              type='button'
              onClick={() => setIsBreathing((prev) => !prev)}
              className='inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-medium text-white'
            >
              {isBreathing ? <Pause size={16} /> : <Play size={16} />}
              {isBreathing ? 'Pause' : 'Start'}
            </button>

            <button
              type='button'
              onClick={() => {
                setIsBreathing(false)
                setPhase('Inhale')
              }}
              className='inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200'
            >
              <TimerReset size={16} />
              Reset
            </button>
          </div>

          <div className='mt-4 flex flex-col items-center rounded-2xl bg-gray-50 p-4'>
            <div
              className='h-24 w-24 rounded-full bg-linear-to-r from-cyan-400 to-blue-500'
              style={{
                animation: isBreathing
                  ? `${phase === 'Inhale' ? 'inhale' : 'exhale'} ${breathSeconds}s ease-in-out infinite alternate`
                  : 'none',
              }}
            />
            <p className='mt-3 text-sm font-semibold text-gray-700'>{phase}</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Calm
