import React from 'react';
import PlaceDetail from '../component/place-detail';
import { generateSeoMetadata } from '@/lib/seo';
import { axiosPublic } from '@/app/config/axios.config';
import { PostType } from '@/hooks/use-post';

// Fetch post data directly for metadata
async function fetchPost(slug: string) {
  try {
    const res = await axiosPublic.get(`/posts/${slug}/post-detail`);
    return res.data?.data;
  } catch (error) {
    console.error('Error fetching post for metadata:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const post: PostType = await fetchPost(id);

  if (!post) {
    return generateSeoMetadata({
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
      path: `/posts/${params.slug}`,
    });
  }

  return generateSeoMetadata({
    title: post.title,
    description: `View details of ${post.title} on Unitel Recruit.`,
    path: `/posts/${params.slug}`,
    ogImage: post.photos ? post?.photos[0].url : '',
  });
}

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return (
    <div>
      <PlaceDetail slug={slug} />
    </div>
  );
}
