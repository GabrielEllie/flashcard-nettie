import { useEffect, useState } from "react";

type NotificationProps = {
message: string | null;
duration?: number;
onClose?: () => void;
};

export default function Notification({ message, duration = 2000, onClose }: NotificationProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;

        setVisible(true);

        const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!message || !visible) return null;

    return (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
        {message}
        </div>
    );
}