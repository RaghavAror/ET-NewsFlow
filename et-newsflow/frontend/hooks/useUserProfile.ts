"use client";

import { useState, useEffect } from "react";
import type { UserProfile } from "@/components/Onboarding";

const STORAGE_KEY = "et_newsflow_profile";

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProfile(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  const saveProfile = (p: UserProfile) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
    setProfile(p);
  };

  const clearProfile = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setProfile(null);
  };

  return { profile, saveProfile, clearProfile, loaded };
}