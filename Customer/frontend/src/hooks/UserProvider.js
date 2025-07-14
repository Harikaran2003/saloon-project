// src/hooks/UserProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie

// Create context
const userContext = createContext(null);

// Hook to access mail and setMail from context
export const useEmail = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useEmail must be used within a UserProvider");
  }
  return { mail: context.mail, setMail: context.setMail };
};

// Provider Component
export const UserProvider = ({ children }) => {
  // Get the email from cookies during initial render
  const [mail, setMail] = useState(() => {
    const savedMail = Cookies.get("user"); // Get email from cookies
    return savedMail ? savedMail : "";
  });

  // Update cookies whenever mail changes
  useEffect(() => {
    if (mail) {
      Cookies.set("user", mail, { expires: 7 }); // Expires in 7 days
    } else {
      Cookies.remove("user");
    }
  }, [mail]);

  return (
    <userContext.Provider value={{ mail, setMail }}>
      {children}
    </userContext.Provider>
  );
};