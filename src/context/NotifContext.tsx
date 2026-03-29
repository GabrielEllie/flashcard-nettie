import React, { createContext, useContext, useState, useRef } from 'react';
import { LoadingBar } from '../components/LoadingBar';

type NotificationType = {
  showNotification: (message: string, image?: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationType | null>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState({
    message: "",
    image: "",
    duration: 2000,
    visible: false,
    exiting: false,
  });

  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotification = (message: string, image = "", duration = 2000) => {
    if (exitTimer.current) clearTimeout(exitTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);

    setNotification((prev) => ({ ...prev, visible: false }));

    setTimeout(() => {
      setNotification({ message, image, duration, visible: true, exiting: false });

      hideTimer.current = setTimeout(() => {
        setNotification((prev) => ({ ...prev, visible: false }));
      }, duration);
    }, 50);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification.visible && (
        <div className="fixed z-50 overflow-hidden text-white bg-black rounded shadow-lg top-[100px] left-5 animate-fade-right">
          <div className="flex items-center px-4 pt-2 pb-3 space-x-2">
            {notification.image ? <img src={notification.image} className="w-[20px]" /> : null}
            <p>{notification.message}</p>
            <img
              src="white_close.png"
              className="w-[20px] cursor-pointer"
              alt="Close"
              onClick={() => {
                if (exitTimer.current) clearTimeout(exitTimer.current);
                if (hideTimer.current) clearTimeout(hideTimer.current);
                setNotification((prev) => ({ ...prev, visible: false }));
              }}
            />
          </div>  
          <LoadingBar duration={notification.duration} />
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useSets must be used inside SetsProvider");
  }
  return context;
};