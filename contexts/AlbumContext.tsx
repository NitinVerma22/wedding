import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AlbumContextType {
  isAlbumOpen: boolean;
  openAlbum: (event?: string) => void;
  closeAlbum: () => void;
  coupleNames: string;
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

export const useAlbum = () => {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error('useAlbum must be used within an AlbumProvider');
  }
  return context;
};

interface AlbumProviderProps {
  children: ReactNode;
}

export const AlbumProvider: React.FC<AlbumProviderProps> = ({ children }) => {
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);

  const openAlbum = (event?: string) => setIsAlbumOpen(true);
  const closeAlbum = () => setIsAlbumOpen(false);

  const coupleNames = "Male & Female"; // Hardcoded for now, can be made dynamic later

  return (
    <AlbumContext.Provider value={{ isAlbumOpen, openAlbum, closeAlbum, coupleNames }}>
      {children}
    </AlbumContext.Provider>
  );
};
