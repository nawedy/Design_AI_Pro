export interface MediaItem {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  author: string;
  authorUrl: string;
  type?: 'image' | 'video';
}

export interface MediaProvider {
  name: string;
  type: 'image' | 'video' | 'both';
  search(query: string, page?: number, perPage?: number): Promise<MediaItem[]>;
}