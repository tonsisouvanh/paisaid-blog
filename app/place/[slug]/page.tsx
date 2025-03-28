import React from 'react';
import PlaceDetail from '../component/place-detail';

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return (
    <div>
      <PlaceDetail slug={slug} />
    </div>
  );
}
