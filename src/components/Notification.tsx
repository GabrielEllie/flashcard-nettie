import { useEffect, useState } from "react";

type NotificationProps = {
    message: string | null;
    duration?: number;
    image?: string;
};

export default function Notification({ message, duration = 2000, image}: NotificationProps) {
        const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;
        setVisible(true);

        const timer = setTimeout(() => {
        setVisible(false);
        // onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [message, duration]);

    if (!message || !visible) return null;

    return (
        <div className="fixed z-50 overflow-hidden text-white bg-black rounded shadow-lg top-5 left-5 animate-fade-right">
            <div className="flex items-center px-4 pt-2 pb-2 space-x-2">
                {image ? <img src={image} className="w-[20px]" /> : null}
                <p>{message}</p>
                <img src="white_close.png" className="w-[20px] cursor-pointer" alt="Close" onClick={() => setVisible(false)} />
            </div>

            <div className="w-full h-1 overflow-hidden">
                <div className="w-1/3 h-full bg-white" style={{ animation: `loading ${duration}ms linear infinite` }}
                />
            </div>
        </div>
    );
}