import { createClient } from 'pexels';
import env from '../../config/env';
import type { MediaProvider } from './types';

const client = createClient(env.PEXELS_API_KEY);

export const pexelsProvider: MediaProvider = {
  name: 'pexels',
  type: 'both', // Supports both images and videos

  async search(query: string, page = 1, perPage = 30) {
    try {
      const [photoResults, videoResults] = await Promise.all([
        client.photos.search({ query, page, per_page: perPage }),
        client.videos.search({ query, page, per_page: perPage })
      ]);

      const photos = photoResults.photos.map(photo => ({
        id: photo.id.toString(),
        url: photo.src.original,
        thumbnail: photo.src.medium,
        title: photo.alt || '',
        author: photo.photographer,
        authorUrl: photo.photographer_url,
        type: 'image' as const
      }));

      const videos = videoResults.videos.map(video => ({
        id: video.id.toString(),
        url: video.video_files[0].link,
        thumbnail: video.image,
        title: video.alt || '',
        author: video.user.name,
        authorUrl: video.user.url,
        type: 'video' as const
      }));

      return [...photos, ...videos];
    } catch (error) {
      console.error('Pexels error:', error);
      throw new Error('Failed to search Pexels');
    }
  }
};