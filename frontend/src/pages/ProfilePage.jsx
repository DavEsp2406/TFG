import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Instagram, Linkedin, Youtube } from 'lucide-react';

const ProfilePage = () => {
    const authUser = useAuthStore((state) => state.authUser);

    return (
        <div className='pt-20 h-screen text-white'>
            <div className='flex flex-col items-center gap-4 bg-red-500 h-full'>
                <section className='flex flex-col items-center gap-2 bg-base-300 mt-8 p-4 rounded-xl'>
                    <img
                        src={authUser.profilePic || '/avatar.png'}
                        alt="User Avatar"
                        className='border-4 border-white rounded-full w-32 h-32 overflow-hidden'
                    />
                    <h2 className="mb-2 font-bold text-2xl">{authUser.fullName}</h2>
                    <div className='flex items-center gap-6 p-4 text-zinc-400 text-sm'>
                        <Youtube />
                        <Instagram />
                        <Linkedin />
                    </div>
                </section>

            </div>

        </div >
    )
}

export default ProfilePage