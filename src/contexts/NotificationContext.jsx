import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getSocket } from '../services/socketService';
import { useSocket } from '../hooks/useSocket';
import { showInAppNotification } from '../services/admin/notificationDisplayService';
import { AuthContext } from '../auth/AuthProvider'; // <-- IMPORTANT: Import AuthContext

export const NotificationContext = createContext(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// --- REMOVED TOKEN PROP ---
export const NotificationProvider = ({ children }) => {
  // --- FIXED: Get token from AuthContext ---
  const { token } = useContext(AuthContext);
  
  const [notifications, setNotifications] = useState([]);
  const { isConnected } = useSocket(token); // Pass the token from AuthContext to the hook

  console.log("NotificationProvider: Rendered. isConnected:", isConnected, "Token from AuthContext:", token ? "Present" : "Missing");

  useEffect(() => {
    console.log("NotificationProvider useEffect: Effect running. isConnected:", isConnected);

    // If socket is not connected, there's nothing to do.
    if (!isConnected) {
      return;
    }

    const socket = getSocket();
    if (!socket) {
      console.error("NotificationProvider useEffect: isConnected is true, but getSocket() returned null.");
      return;
    }

    console.log("NotificationProvider useEffect: Socket is connected. Setting up 'inAppNotification' listener.");

    const onInAppNotification = (payload) => {
      console.log("NotificationProvider: Received 'inAppNotification' event. Payload:", payload);
      showInAppNotification(payload);

      const newNotification = {
        id: payload.data?.requestId || payload.data?.userId || Date.now().toString(),
        title: payload.title,
        body: payload.body,
        timestamp: payload.timestamp || new Date().toISOString(),
        read: false,
        data: payload.data || {},
      };
      setNotifications(prev => [newNotification, ...prev]);
    };
    
    // Attach listener
    socket.on('inAppNotification', onInAppNotification);

    // Cleanup function
    return () => {
      console.log("NotificationProvider useEffect cleanup: Unsubscribing from 'inAppNotification'.");
      socket.off('inAppNotification', onInAppNotification);
    };
  }, [isConnected]); // This effect now only depends on the connection status.

  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  }, []);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const contextValue = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};