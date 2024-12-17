import { createApi } from 'unsplash-js';
import env from '../../config/env';
import type { MediaProvider } from './types';

const unsplash = createApi({
  accessKey: env.UNSPLASH_ACCESS_KEY,
});

export const unsplashProvider: MediaProvider = {
  name: 'unsplash',
  type: 'image',

  async search(query: string, page = 1, perPage = 30) {
    try {
      const result = await unsplash.search.getPhotos({
        query,
        page,
        perPage,
      });

      if (result.errors) {
        throw new Error(result.errors[0]);
      }

      return result.response.results.map(photo => ({
        id: photo.id,
        url: photo.urls.regular,
        thumbnail: photo.urls.thumb,
        title: photo.description || photo.alt_description || '',
        author: photo.user.name,
        authorUrl: photo.user.links.html,
      }));
    } catch (error) {
      console.error('Unsplash error:', error);
      throw new Error('Failed to search Unsplash');
    }
  }
};