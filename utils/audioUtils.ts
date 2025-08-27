// Get the appropriate audio source based on page
export const getAudioSource = async (pageName: string): Promise<string> => {
  // Always use the home music file since it's the only one available
  return '/audio/home-music.mp3';
};
