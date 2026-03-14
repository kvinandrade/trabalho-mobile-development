import React, { createContext, useContext, useMemo, useState } from 'react';
import { Vinyl, vinyls as initialVinyls } from '../data/vinyls';

type AddVinyl = Omit<Vinyl, 'id'>;

type VinylsContextValue = {
  vinyls: Vinyl[];
  getVinyl: (id: string) => Vinyl | undefined;
  addVinyl: (vinyl: AddVinyl) => void;
  updateVinyl: (id: string, vinyl: Partial<AddVinyl>) => void;
  removeVinyl: (id: string) => void;
};

const VinylsContext = createContext<VinylsContextValue | undefined>(undefined);

export function VinylsProvider({ children }: { children: React.ReactNode }) {
  const [vinyls, setVinyls] = useState<Vinyl[]>(initialVinyls);

  const getVinyl = React.useCallback(
    (id: string) => {
      return vinyls.find((item) => item.id === id);
    },
    [vinyls]
  );

  const addVinyl = React.useCallback((vinyl: AddVinyl) => {
    const id = `${Date.now()}`;
    setVinyls((current) => [{ id, ...vinyl, isCustom: true }, ...current]);
  }, []);

  const updateVinyl = React.useCallback(
    (id: string, vinyl: Partial<AddVinyl>) => {
      setVinyls((current) =>
        current.map((item) => (item.id === id ? { ...item, ...vinyl } : item))
      );
    },
    []
  );

  const removeVinyl = React.useCallback((id: string) => {
    setVinyls((current) => current.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(
    () => ({ vinyls, getVinyl, addVinyl, updateVinyl, removeVinyl }),
    [vinyls, getVinyl, addVinyl, updateVinyl, removeVinyl]
  );

  return <VinylsContext.Provider value={value}>{children}</VinylsContext.Provider>;
}

export function useVinyls() {
  const context = useContext(VinylsContext);
  if (!context) {
    throw new Error('useVinyls must be used within a VinylsProvider');
  }
  return context;
}
