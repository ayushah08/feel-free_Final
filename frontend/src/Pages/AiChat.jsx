import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  BotMessageSquare,
  CirclePlus,
  SendHorizontal,
  Sparkles,
  Trash2,
  User,
} from 'lucide-react'

const SUGGESTIONS = [
  'I feel anxious today',
  'Give me a 2-minute breathing exercise',
  'How do I stop overthinking at night?',
]

const buildWelcome = () => ({
  id: Date.now(),
  role: 'bot',
  text: 'Hi, I am FeelFree AI. Share what you are feeling and I will support you.',
  createdAt: new Date(),
})

const formatTime = (dateValue) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(dateValue)

const AiChat = () => {
  const [messages, setMessages] = useState([buildWelcome()])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState(() => Date.now())
  const listEndRef = useRef(null)

  const canSend = useMemo(() => input.trim().length > 0 && !isTyping, [input, isTyping])

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const getFallbackReply = (rawText) => {
    const text = rawText.toLowerCase()
    if (text.includes('anxious') || text.includes('anxiety')) {
      return 'Try this: inhale for 4 seconds, hold 4 seconds, exhale for 6 seconds. Repeat 5 times and notice your shoulders relaxing.'
    }
    if (text.includes('overthinking')) {
      return 'Write one worry, then write one small action you can do in 10 minutes. Action breaks the overthinking loop.'
    }
    if (text.includes('sleep')) {
      return 'For better sleep, keep your room dim 30 minutes before bed and do slow 4-in, 8-out breathing for 2 minutes.'
    }
    return 'I hear you. If you want, I can guide you through breathing, grounding, or a short journaling prompt.'
  }
  
  const addMessage = (role, text) => {
    const next = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      role,
      text,
      createdAt: new Date(),
    }
    setMessages((prev) => [...prev, next])
  }

  const sendMessage = (text) => {
    const value = text.trim()
    if (!value || isTyping) return

    addMessage('user', value)
    setInput('')
    setIsTyping(true)

    window.setTimeout(() => {
      addMessage('bot', getFallbackReply(value))
      setIsTyping(false)
    }, 650)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  const handleClear = () => {
    setMessages([])
    setInput('')
    setIsTyping(false)
  }

  const handleNewChat = () => {
    setMessages([buildWelcome()])
    setInput('')
    setIsTyping(false)
    setSessionId(Date.now())
  }

  return (
      <div className='mx-auto max-w-6xl rounded-3xl bg-white shadow-[0_12px_30px_rgba(0,0,0,0.10)] backdrop-blur-sm p-4'>
        <header className='flex gap-3 rounded-2xl shadow-[inset_0_4px_10px_rgba(147,51,234,0.3)]  bg-white px-4 py-3 items-center justify-between'>
          <div className='flex items-center gap-3'>
            <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] text-white'>
              <BotMessageSquare size={22} />
            </span>
            <div>
              <h1 className='font-bold text-gray-800 text-xl'>AI Chat</h1>
              <p className='text-gray-500 text-sm'>Private space for support and reflection</p>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <span className='inline-flex items-center gap-1 rounded-full bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] px-2 py-1 text-xs font-medium text-white'>
              <Sparkles size={14} />
              Session #{sessionId}
            </span>
            <button
              type='button'
              onClick={handleNewChat}
              className='inline-flex items-center gap-1 rounded-lg border border-purple-200 bg-white px-3 py-1.5 text-xs font-medium text-purple-500 transition hover:bg-purple-100 sm:text-sm'
            >
              <CirclePlus size={15} />
              New Chat
            </button>
            <button
              type='button'
              onClick={handleClear}
              disabled={messages.length === 0}
              className='inline-flex items-center gap-1 rounded-lg border border-purple-200 bg-white px-3 py-1.5 text-xs font-medium text-purple-500 transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50 '
            >
              <Trash2 size={15} />
              Clear
            </button>
          </div>
        </header>

        <main className='mt-3 h-[calc(100vh-300px)] border border-gray-300 overflow-y-auto scrollbar-hide rounded-2xl shadow-[inset_0_4px_10px_rgba(147,51,234,0.3)] bg-white/70 p-3 '>
          {messages.length === 0 && (
            <div className='flex h-full min-h-48 items-center justify-center text-center text-sm text-gray-500'>
              Chat is empty. Click <span className='mx-1 font-semibold text-orange-600'>New Chat</span> to start.
            </div>
          )}

          <div className='space-y-3'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <article
                  className={`max-w-[88%] rounded-2xl px-4 py-2.5 shadow-sm sm:max-w-[74%] ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] text-white'
                      : 'rounded-bl-md border border-gray-100 bg-white text-gray-800'
                  }`}
                >
                  <div className='mb-1 flex items-center gap-1 text-[11px] opacity-80'>
                    {message.role === 'user' ? <User size={12} /> : <BotMessageSquare size={12} />}
                    <span>{message.role === 'user' ? 'You' : 'FeelFree AI'}</span>
                    <span>·</span>
                    <time>{formatTime(message.createdAt)}</time>
                  </div>
                  <p className='text-sm leading-relaxed'>{message.text}</p>
                </article>
              </div>
            ))}

            {isTyping && (
              <div className='flex justify-start'>
                <div className='rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 text-sm text-gray-500'>
                  FeelFree AI is typing...
                </div>
              </div>
            )}
            <div ref={listEndRef} />
          </div>
        </main>
        <div className='mt-3 flex flex-wrap gap-2'>
          {SUGGESTIONS.map((item) => (
            <button
              key={item}
              type='button'
              onClick={() => sendMessage(item)}
              className='rounded-full border border-purple-500 bg-white px-3 py-1.5 text-xs text-purple-500 transition hover:bg-purple-100 text-sm'
            >
              {item}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className='mt-3 flex items-center gap-2'>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder='Type your message...'
            className='w-full rounded-xl border border-purple-500 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-purple-400'
          />
          <button
            type='submit'
            disabled={!canSend}
            className='inline-flex items-center gap-1 rounded-xl bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50'
          >
            Send
            <SendHorizontal size={16} />
          </button>
        </form>
      </div>
  )
}

export default AiChat
