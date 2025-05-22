import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react"
import MessageInput from "./MessageInput"
import ChatHeader from "./ChatHeader"
import MessageSkeleton from "./skeletons/MessageSkeleton"

function ChatContainer() {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()

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

            </div>

            <MessageInput />
        </div>
    )
}

export default ChatContainer