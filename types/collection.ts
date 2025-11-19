export interface Video {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  description?: string;
  publishDate?: string;
  views?: number;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  videoCount: number;
  coverImage: string;
  color: string;
  videos?: Video[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CollectionCardProps {
  collection: Collection;
}

