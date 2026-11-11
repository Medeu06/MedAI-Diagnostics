import React, { createContext, useContext, useState, useEffect } from 'react';

const UserProfileContext = createContext(null);

export function UserProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('medai_user_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const saveProfile = (age, gender) => {
    const newProfile = {
      age: Number(age),
      gender, // 'male' | 'female'
      is18Plus: Number(age) >= 18,
      createdAt: new Date().toISOString(),
    };
    setProfile(newProfile);
    localStorage.setItem('medai_user_profile', JSON.stringify(newProfile));
  };

  const clearProfile = () => {
    setProfile(null);
    localStorage.removeItem('medai_user_profile');
  };

  return (
    <UserProfileContext.Provider value={{ profile, saveProfile, clearProfile, isConfigured: !!profile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(UserProfileContext);
}
