import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="flex flex-col flex-1 justify-center items-center bg-base-100/50 p-16 w-full">
            <div className="space-y-6 max-w-md text-center">
                {/* Icon Display */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className="flex justify-center items-center bg-primary/10 rounded-2xl w-16 h-16 animate-bounce"
                        >
                            <MessageSquare className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="font-bold text-2xl">Welcome to UINEST!</h2>
                <p className="text-base-content/60">
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;