"use client"

import React, { createContext, useContext, useState } from "react";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

type NotificationType = "success" | "error" | "info";

interface Notification {
  type: NotificationType;
  message: string;
}

interface NotificationContextType {
  addNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast();

  const addNotification = (type: NotificationType, message: string) => {
    toast({
      variant: type === "error" ? "destructive" : "default",
      title: type.charAt(0).toUpperCase() + type.slice(1),
      description: message,
    });
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
