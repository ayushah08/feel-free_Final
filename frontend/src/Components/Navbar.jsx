import React from 'react'
import { NavLink } from 'react-router-dom'
import { BotMessageSquare, House, Award, Activity, MessageSquare, Sprout, HeartHandshake, LogOut } from 'lucide-react'

const Navbar = ({ currentUser, onLogout }) => {
  const userInitial = currentUser?.name?.charAt(0)?.toUpperCase() || 'U'

  return (
    <div className='w-full flex items-center justify-between rounded-2xl bg-white shadow-[0_0_15px_lightgray]'>
      <div className='text-1xl font-bold flex items-center gap-1 pl-2'>
        <span className='h-10 w-10 rounded-2xl bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] flex items-center justify-center text-white'>
          <HeartHandshake size={30} strokeWidth={2} />
        </span>
        <span>
          FeelFree.
          <span className='bg-clip-text text-transparent bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899]'>Ai</span>
        </span>
      </div>

      <div className='flex item-center gap-5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] text-white rounded-3xl p-1 m-1'>
        <NavLink to='/' className={({ isActive }) => `nav-btn flex items-center gap-1 hover:text-white hover:bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] p-1.5 rounded-3xl transition ${isActive ? 'bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899]' : 'text-gray-500'}`}>
          <span><House strokeWidth={2} size={20} /></span>
          <span>Home</span>
        </NavLink>

        <NavLink to='/ai-chat' className={({ isActive }) => `nav-btn flex items-center gap-1 hover:text-white hover:bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] p-1.5 rounded-3xl transition ${isActive ? 'bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899]' : 'text-gray-500'}`}>
          <span><BotMessageSquare strokeWidth={2} size={20} /></span>
          <span>Ai Chat</span>
        </NavLink>

        <NavLink to='/calm-zone' className={({ isActive }) => `nav-btn flex items-center gap-1 hover:text-white hover:bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] p-1.5 rounded-3xl transition ${isActive ? 'bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899]' : 'text-gray-500'}`}>
          <span><Sprout strokeWidth={2} size={20} /></span>
          <span>Calm Zone</span>
        </NavLink>

        <NavLink to='/feel-wall' className={({ isActive }) => `nav-btn flex items-center gap-1 hover:text-white hover:bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] p-1.5 rounded-3xl transition ${isActive ? 'bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899]' : 'text-gray-500'}`}>
          <span><MessageSquare strokeWidth={2} size={20} /></span>
          <span>Feel Wall</span>
        </NavLink>

        <NavLink to='/activity' className={({ isActive }) => `nav-btn flex items-center gap-1 hover:text-white hover:bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] p-1.5 rounded-3xl transition ${isActive ? 'bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899]' : 'text-gray-500'}`}>
          <span><Activity strokeWidth={2} size={20} /></span>
          <span>Activity</span>
        </NavLink>

        <NavLink to='/achievements' className={({ isActive }) => `nav-btn flex items-center gap-1 hover:text-white hover:bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] p-1.5 rounded-3xl transition ${isActive ? 'bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899]' : 'text-gray-500'}`}>
          <span><Award strokeWidth={2} size={20} /></span>
          <span>Achievements</span>
        </NavLink>
      </div>

      <div className='flex items-center gap-3 pr-2'>
        <button
          type='button'
          onClick={onLogout}
          className='inline-flex items-center gap-1 rounded-xl bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] px-3 py-1.5 text-sm font-medium text-white'
        >
          <LogOut strokeWidth={2} size={16} />
          <span>Logout</span>
        </button>

        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-linear-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] text-white font-semibold'>
          {userInitial}
        </div>
      </div>
    </div>
  )
}

export default Navbar
