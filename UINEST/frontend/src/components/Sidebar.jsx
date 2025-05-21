import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import { Users } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

function Sidebar() {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
    const { onlineUsers } = useAuthStore()

    useEffect(() => {
        getUsers()
    }, [getUsers])

    if (isUsersLoading) return <SidebarSkeleton />




    return (
        <aside className="flex flex-col border-r border-base-300 w-20 lg:w-72 h-full transition-all duration-200">
            <div className="p-5 border-b border-base-300 w-full">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="hidden lg:block font-medium">Contacts</span>
                </div>
            </div>

            <div className="py-3 w-full overflow-y-auto">
                {users.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`
                            w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
                            ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                        `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.name}
                                className="rounded-full size-12 object-cover"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className="right-0 bottom-0 absolute bg-green-500 rounded-full ring-2 ring-zinc-900 size-3"
                                />
                            )}
                        </div>

                        {/* User info - only visible on larger screens */}
                        <div className="hidden lg:block min-w-0 text-left">
                            <div className="font-medium truncate">{user.fullName}</div>
                            <div className="text-zinc-400 text-sm">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar