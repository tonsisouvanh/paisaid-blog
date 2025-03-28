export const placeData = {
  id: 1,
  title: 'Coastal Breeze Cafe',
  slug: 'coastal-breeze-cafe',
  category: 'Cafes',
  rating: 4.8,
  reviewCount: 124,
  priceRange: 'MEDIUM',
  description:
    'A charming beachside cafe offering fresh, locally-sourced ingredients with a focus on seafood and vegetarian options. Enjoy stunning ocean views while savoring artisanal coffee and homemade pastries.',
  longDescription:
    "Nestled along the picturesque coastline, Coastal Breeze Cafe has been a beloved local gem since 2015. Our philosophy centers around sustainability, community, and creating memorable dining experiences. We work directly with local farmers and fishermen to bring you the freshest ingredients possible, transformed into delicious meals by our talented culinary team.\n\nOur spacious outdoor terrace offers panoramic ocean views, making it the perfect spot for a relaxing breakfast, casual lunch, or sunset dinner. Inside, our thoughtfully designed space combines coastal charm with modern comfort, featuring reclaimed wood furnishings, abundant natural light, and local artwork.\n\nWhether you're a coffee connoisseur, brunch enthusiast, or seeking a tranquil spot to enjoy the sea breeze, we welcome you to experience our unique blend of exceptional food, warm hospitality, and breathtaking scenery.",
  address: '123 Ocean Avenue, San Francisco, CA 94123',
  city: 'San Francisco',
  state: 'California',
  country: 'United States',
  latitude: 37.7749,
  longitude: -122.4194,
  phone: '+1 (415) 555-7890',
  website: 'https://coastalbreezecafe.com',
  email: 'info@coastalbreezecafe.com',
  hours: [
    { day: 'Monday', open: '7:00 AM', close: '8:00 PM' },
    { day: 'Tuesday', open: '7:00 AM', close: '8:00 PM' },
    { day: 'Wednesday', open: '7:00 AM', close: '8:00 PM' },
    { day: 'Thursday', open: '7:00 AM', close: '9:00 PM' },
    { day: 'Friday', open: '7:00 AM', close: '10:00 PM' },
    { day: 'Saturday', open: '8:00 AM', close: '10:00 PM' },
    { day: 'Sunday', open: '8:00 AM', close: '8:00 PM' },
  ],
  tags: ['Outdoor Seating', 'Ocean View', 'Vegan Options', 'Wifi', 'Pet Friendly', 'Brunch'],
  amenities: [
    { name: 'Outdoor Seating', icon: 'utensils' },
    { name: 'Free Wifi', icon: 'wifi' },
    { name: 'Parking Available', icon: 'parking-circle' },
    { name: 'Credit Cards Accepted', icon: 'credit-card' },
    { name: 'Reservations', icon: 'calendar' },
    { name: 'Group Friendly', icon: 'users' },
  ],
  images: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Coastal Breeze Cafe exterior',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1517248135467-4c7ed4e2ae98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY1ODh8MHwxfHNlYXJjaHwyfGNvYXN0YWwlMjBjYWZlJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzA4MTI1MTU2fDA&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Coastal Breeze Cafe interior',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY1ODh8MHwxfHNlYXJjaHwxfGZvb2QlMjBjYWZlfGVufDB8fHx8MTcwODEyNTIxN3ww&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Food at Coastal Breeze Cafe',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1563911302283-d2bc12959841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY1ODh8MHwxfHNlYXJjaHwxfG91dGRvb3IlMjBjYWZlJTIwc2VhdGluZyUyMGFyZWF8ZW58MHx8fHwxNzA4MTI1MjY0fDA&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Outdoor seating area',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY1ODh8MHwxfHNlYXJjaHwxfG9jZWFuJTIwdmlldyUyMGNhZmV8ZW58MHx8fHwxNzA4MTI1MzA5fDA&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Ocean view from the cafe',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY1ODh8MHwxfHNlYXJjaHwxfGNvZmZlZSUyMGFuZCUyMHBhc3RyaWVzfGVufDB8fHx8MTcwODEyNTM0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Coffee and pastries',
    },
  ],
  reviews: [
    {
      id: 1,
      user: {
        name: 'Sarah J.',
        image: '/placeholder.svg?height=100&width=100',
        location: 'San Francisco, CA',
      },
      rating: 5,
      date: '2023-08-15',
      title: 'Perfect spot for breakfast with a view!',
      content:
        "I can't say enough good things about this cafe! The location is absolutely stunning with panoramic ocean views from the terrace. I had the avocado toast and a latte, both were exceptional. The staff was friendly and attentive without being intrusive. Will definitely be back next time I'm in town!",
      helpful: 24,
      photos: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'],
    },
    {
      id: 2,
      user: {
        name: 'Michael T.',
        image: '/placeholder.svg?height=100&width=100',
        location: 'Chicago, IL',
      },
      rating: 4,
      date: '2023-07-22',
      title: 'Great food, slightly pricey',
      content:
        "Visited during my vacation and really enjoyed the atmosphere and food quality. The seafood pasta was fresh and delicious, and the view can't be beat. Only giving 4 stars because I found it a bit on the expensive side, but I understand the premium location. Would still recommend!",
      helpful: 15,
      photos: [],
    },
    {
      id: 3,
      user: {
        name: 'Emma L.',
        image: '/placeholder.svg?height=100&width=100',
        location: 'Los Angeles, CA',
      },
      rating: 5,
      date: '2023-06-30',
      title: 'Dog-friendly heaven!',
      content:
        "As a dog owner, I'm always looking for pet-friendly places with good food, and Coastal Breeze exceeds expectations! They even brought water for my pup without me asking. The breakfast burrito is to die for, and their house-made hot sauce adds the perfect kick. The staff remembered me on my second visit, which was a nice touch.",
      helpful: 19,
      photos: ['/placeholder.svg?height=300&width=400'],
    },
    {
      id: 4,
      user: {
        name: 'David R.',
        image: '/placeholder.svg?height=100&width=100',
        location: 'New York, NY',
      },
      rating: 3,
      date: '2023-09-05',
      title: 'Beautiful location, slow service',
      content:
        "The cafe has an amazing location and the food was good when it finally arrived. Unfortunately, we waited over 40 minutes for our order on a weekday that wasn't particularly busy. The staff was apologetic but it did impact our experience. The coffee and pastries were excellent though.",
      helpful: 8,
      photos: [],
    },
  ],
  ratingBreakdown: {
    5: 78,
    4: 32,
    3: 10,
    2: 3,
    1: 1,
  },
  nearbyPlaces: [
    {
      id: 101,
      title: 'Oceanview Hotel',
      category: 'Hotels',
      rating: 4.7,
      reviewCount: 89,
      priceRange: 'LUXURY',
      imageUrl: '/placeholder.svg?height=400&width=600',
      city: 'San Francisco',
      tags: ['Ocean View', 'Spa'],
      href: '/place/oceanview-hotel',
    },
    {
      id: 102,
      title: 'Sunset Beach Restaurant',
      category: 'Restaurants',
      rating: 4.5,
      reviewCount: 156,
      priceRange: 'HIGH',
      imageUrl: '/placeholder.svg?height=400&width=600',
      city: 'San Francisco',
      tags: ['Seafood', 'Fine Dining'],
      href: '/place/sunset-beach-restaurant',
    },
    {
      id: 103,
      title: 'Beachside Boutique',
      category: 'Shopping',
      rating: 4.6,
      reviewCount: 67,
      priceRange: 'MEDIUM',
      imageUrl: '/placeholder.svg?height=400&width=600',
      city: 'San Francisco',
      tags: ['Clothing', 'Gifts'],
      href: '/place/beachside-boutique',
    },
  ],
};
