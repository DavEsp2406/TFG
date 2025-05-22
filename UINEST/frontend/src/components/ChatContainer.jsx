import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react"
import MessageInput from "./MessageInput"
import ChatHeader from "./ChatHeader"
import MessageSkeleton from "./skeletons/MessageSkeleton"
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils"

function ChatContainer() {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()
    const authUser = useAuthStore((state) => state.authUser);

    useEffect(() => {
        getMessages(selectedUser._id)
    }, [selectedUser._id, getMessages])


    if (isMessagesLoading) {
        return (
            <div className="flex flex-col flex-1 overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        )
    }



    return (
        <div className="flex flex-col flex-1 overflow-auto">
            <ChatHeader />

            <div className="flex-1 space-y-4 p-4 overflow-y-auto">
                {messages.map((message) => (
                    <div key={message._id}
                        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                        <div className="chat-image avatar">
                            <div className="border rounded-full size-10">
                                <img
                                    src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                                    alt="profile pic" />
                            </div>
                        </div>
                        <div className="mb-1 chat-header">
                            <time className="opacity-50 ml-1 text-xs">
                                {formatMessageTime(message.createdAt)}
                            </time>
                            <div className="flex chat-bubble">
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="mb-2 rounded-md sm:max-w-[200px]"
                                    />
                                )}
                                {message.text && <p>{message.text}</p>}
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <MessageInput />
        </div>
    )
}

export default ChatContainer