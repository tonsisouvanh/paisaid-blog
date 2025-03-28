import { axiosPublic } from '@/app/config/axios.config';
import { useQuery } from '@tanstack/react-query';

export interface PostType {
  id: number;
  title: string;
  slug: string;
  content: string;
  authorId: number;
  categoryId: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  priceRange?: 'LOW' | 'MEDIUM' | 'HIGH' | 'LUXURY';
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  email?: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  avgRating?: number;
  reviewCount?: number;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
  category?: { id: number; name: string };
  tags?: { id: number; name: string }[];
  tagIds?: TagType[];
  photos?: PhotoType[];
}

export type PhotoType = {
  id: number;
  url: string;
  publicId: string;
  altText: string | null;
  userId: number | null;
  postId: string;
  isFeatured: boolean;
  createdAt: Date;
};

export type TagType = {
  id: number;
  name: string;
};

export interface OpeningHoursType {
  [day: string]: { hours: string };
}

export const useGetPosts = (
  page?: number,
  limit?: number,
  filters?: { categoryId?: number; status?: string; q?: string }
) => {
  return useQuery<PostType[], Error>({
    queryKey: ['posts', 'list', page, limit, filters],
    queryFn: async () => {
      const res = await axiosPublic.get('/posts', {
        params: { page, limit, ...filters },
      });
      return res.data?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 1,
  });
};

export const useGetPost = (id: string | null) => {
  return useQuery<PostType, Error>({
    queryKey: ['posts', 'one', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts/${id}/post-detail`);
      return res.data?.data;
    },
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 1,
  });
};
