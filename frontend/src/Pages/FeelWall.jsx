import React, { useMemo, useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark, Smile, Users } from 'lucide-react'

const starterPosts = [
  {
    id: 1,
    name: 'Ananya',
    mood: 'Hopeful',
    message: 'Small steps today: I finished my breathing practice and felt lighter.',
    likes: 12,
    comments: 3,
    liked: false,
  },
  {
    id: 2,
    name: 'Rahul',
    mood: 'Grateful',
    message: 'Sharing gratitude: a short walk and a good conversation made my day.',
    likes: 8,
    comments: 1,
    liked: false,
  },
]

const moodOptions = ['Joy', 'Love', 'Calm', 'Hopeful', 'Grateful']

const FeelWall = () => {
  const [posts, setPosts] = useState(starterPosts)
  const [postText, setPostText] = useState('')
  const [selectedMood, setSelectedMood] = useState('Joy')

  const totalPosts = useMemo(() => posts.length, [posts])

  const handlePost = () => {
    const value = postText.trim()
    if (!value) return

    const newPost = {
      id: Date.now(),
      name: 'You',
      mood: selectedMood,
      message: value,
      likes: 0,
      comments: 0,
      liked: false,
    }

    setPosts((prev) => [newPost, ...prev])
    setPostText('')
  }

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        }
      }),
    )
  }

  return (
    <section className='mx-auto max-w-6xl p-2'>
      <header className='rounded-3xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] bg-clip-text text-3xl font-bold text-transparent'>
              Feel Wall
            </h1>
            <p className='mt-1 text-sm text-gray-500'>A social space to share feelings and support others.</p>
          </div>

          <div className='inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] px-4 py-2.5 text-white'>
            <Users size={18} />
            <span className='text-sm font-semibold'>{totalPosts} Posts</span>
          </div>
        </div>
      </header>

      <div className='mt-4 rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)]'>
        <div className='flex items-center gap-2 text-gray-700'>
          <Smile size={18} />
          <h2 className='text-base font-semibold'>Create Post</h2>
        </div>

        <textarea
          value={postText}
          onChange={(event) => setPostText(event.target.value)}
          placeholder='Share what you feel today...'
          className='mt-3 h-24 w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-purple-400'
        />

        <div className='mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-wrap gap-2'>
            {moodOptions.map((mood) => (
              <button
                key={mood}
                type='button'
                onClick={() => setSelectedMood(mood)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  selectedMood === mood
                    ? 'bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>

          <button
            type='button'
            onClick={handlePost}
            className='inline-flex items-center gap-1 rounded-xl bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] px-4 py-2 text-sm font-medium text-white'
          >
            <Send size={14} />
            Post
          </button>
        </div>
      </div>

      <div className='mt-4 space-y-3'>
        {posts.map((post) => (
          <article key={post.id} className='rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)]'>
            <div className='flex items-start justify-between gap-3'>
              <div>
                <p className='font-semibold text-gray-800'>{post.name}</p>
                <span className='mt-1 inline-block rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-700'>
                  {post.mood}
                </span>
              </div>
              <button type='button' className='text-gray-400 hover:text-gray-600'>
                <Bookmark size={16} />
              </button>
            </div>

            <p className='mt-3 text-sm leading-relaxed text-gray-700'>{post.message}</p>

            <div className='mt-4 flex items-center gap-4 border-t border-gray-100 pt-3 text-sm'>
              <button
                type='button'
                onClick={() => toggleLike(post.id)}
                className={`inline-flex items-center gap-1 ${post.liked ? 'text-rose-500' : 'text-gray-500'}`}
              >
                <Heart size={16} fill={post.liked ? 'currentColor' : 'none'} />
                {post.likes}
              </button>
              <button type='button' className='inline-flex items-center gap-1 text-gray-500'>
                <MessageCircle size={16} />
                {post.comments}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeelWall
