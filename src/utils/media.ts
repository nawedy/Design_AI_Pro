import { unsplashProvider } from '../server/services/media/unsplash';
import { pexelsProvider } from '../server/services/media/pexels';
import type { MediaItem } from '../server/services/media/types';

const providers = {
  unsplash: unsplashProvider,
  pexels: pexelsProvider
};

export async function searchMedia(
  query: string,
  provider = 'unsplash',
  type: 'image' | 'video' | 'both' = 'both'
): Promise<MediaItem[]> {
  const selectedProvider = providers[provider as keyof typeof providers];
  if (!selectedProvider) {
    throw new Error('Invalid media provider');
  }

  const results = await selectedProvider.search(query);
  
  if (type === 'both') return results;
  return results.filter(item => item.type === type);
}