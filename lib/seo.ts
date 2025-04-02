import { Metadata } from 'next';

const APP_NAME = 'PaisaiD | Content Review Platform';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  path: string; // For canonical URL and OG URL
  ogImage?: string; // Optional OG image URL
  twitterImage?: string; // Optional Twitter image URL
}

export function generateSeoMetadata({
  title,
  description,
  keywords,
  path,
  ogImage = 'https://yourappname.com/default-og-image.jpg', // Default image
  twitterImage = 'https://yourappname.com/default-twitter-image.jpg', // Default image
}: SeoProps): Metadata {
  const baseUrl = 'https://recruit.unitel.com.la'; // Replace with your domain
  const fullUrl = `${baseUrl}${path}`;

  return {
    title: `${title} | ${APP_NAME}`,
    description,
    keywords,
    openGraph: {
      title: `${title} | ${APP_NAME}`,
      description,
      url: fullUrl,
      siteName: `${APP_NAME}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} Preview`,
        },
      ],
      locale: 'en_US', // Adjust as needed
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${APP_NAME}`,
      description,
      images: [twitterImage],
    },
    alternates: {
      canonical: fullUrl, // Prevents duplicate content issues
    },
  };
}
