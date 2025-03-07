import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, ChevronRight, Globe, Search, Shield, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="PaiSaiD background"
              fill
              className="object-cover opacity-10"
            />
          </div>
          <div className="container relative z-10 px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">Discover the World with PaiSaiD</h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground md:text-xl">
              We&apos;re on a mission to help people discover amazing places and share authentic experiences around the
              world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Join Our Community</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/explore">
                  Explore Places
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="bg-muted/30 py-16">
          <div className="container px-4">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    PaiSaiD was founded in 2020 by a group of passionate travelers who were frustrated with the lack of
                    authentic travel recommendations online. We wanted to create a platform where real people could
                    share their honest experiences about places they&apos;ve visited.
                  </p>
                  <p>
                    What started as a small community of travel enthusiasts has grown into a global platform with
                    millions of users sharing their discoveries and experiences. Our mission remains the same: to help
                    people find amazing places and create unforgettable memories.
                  </p>
                  <p>
                    Today, PaiSaiD is one of the fastest-growing travel platforms, with users from over 150 countries
                    and listings for more than 500,000 places worldwide. We&apos;re proud to have built a community that
                    values authenticity, diversity, and the joy of discovery.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="PaiSaiD journey"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Values */}
        <section className="py-16">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Our Mission & Values</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                At PaiSaiD, we&apos;re guided by a set of core values that shape everything we do. These principles help
                us create a platform that truly serves our community.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Authenticity</h3>
                  <p className="text-muted-foreground">
                    We believe in real experiences shared by real people. Our platform prioritizes authentic reviews and
                    recommendations over sponsored content.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Community</h3>
                  <p className="text-muted-foreground">
                    We&apos;re building a global community of travelers who share their knowledge and passion for
                    discovery with others around the world.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Discovery</h3>
                  <p className="text-muted-foreground">
                    We help people discover hidden gems and local favorites that might otherwise go unnoticed, promoting
                    diverse experiences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Trust</h3>
                  <p className="text-muted-foreground">
                    We&apos;ve built robust systems to ensure the integrity of our platform, with verification processes
                    and community moderation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Quality</h3>
                  <p className="text-muted-foreground">
                    We strive for excellence in every aspect of our platform, from user experience to the accuracy of
                    information we provide.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously improve our platform with new features and technologies to better serve our
                    community&apos;s evolving needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted/30 py-16">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Meet Our Team</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                The passionate people behind PaiSaiD who are dedicated to helping you discover amazing places around the
                world.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                { name: 'Alex Johnson', role: 'Founder & CEO', image: '/placeholder.svg?height=400&width=400' },
                { name: 'Sarah Chen', role: 'Chief Product Officer', image: '/placeholder.svg?height=400&width=400' },
                {
                  name: 'Miguel Rodriguez',
                  role: 'Head of Engineering',
                  image: '/placeholder.svg?height=400&width=400',
                },
                { name: 'Priya Sharma', role: 'Community Director', image: '/placeholder.svg?height=400&width=400' },
                { name: 'David Kim', role: 'Design Lead', image: '/placeholder.svg?height=400&width=400' },
                { name: 'Emma Wilson', role: 'Marketing Director', image: '/placeholder.svg?height=400&width=400' },
                { name: 'Omar Hassan', role: 'Content Strategist', image: '/placeholder.svg?height=400&width=400' },
                { name: 'Zoe Thompson', role: 'Customer Success', image: '/placeholder.svg?height=400&width=400' },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full">
                    <Image src={member.image || '/placeholder.svg'} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">What Our Community Says</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Hear from the travelers and businesses who are part of our growing community.
              </p>
            </div>

            <Tabs defaultValue="travelers" className="mx-auto w-full max-w-4xl">
              <TabsList className="mb-8 grid w-full grid-cols-2">
                <TabsTrigger value="travelers">Travelers</TabsTrigger>
                <TabsTrigger value="businesses">Business Owners</TabsTrigger>
              </TabsList>
              <TabsContent value="travelers" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      quote:
                        'PaiSaiD helped me discover amazing local restaurants during my trip to Japan that I never would have found otherwise. The authentic reviews from real travelers made all the difference!',
                      author: 'Jessica M.',
                      location: 'Toronto, Canada',
                    },
                    {
                      quote:
                        "I've been using PaiSaiD for over a year now, and it's become my go-to app for finding unique places wherever I travel. The community recommendations are always spot on.",
                      author: 'Thomas L.',
                      location: 'Berlin, Germany',
                    },
                    {
                      quote:
                        'As a solo traveler, I rely on PaiSaiD to find safe and interesting places to visit. The detailed reviews and photos from other users give me confidence in my travel decisions.',
                      author: 'Aisha K.',
                      location: 'Dubai, UAE',
                    },
                    {
                      quote:
                        "PaiSaiD has completely changed how I plan my trips. Instead of sticking to tourist traps, I've found hidden gems that made my experiences so much more authentic and memorable.",
                      author: 'Carlos R.',
                      location: 'Mexico City, Mexico',
                    },
                  ].map((testimonial, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="mb-4 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <p className="mb-4 italic text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="businesses" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      quote:
                        "Since listing our boutique hotel on PaiSaiD, we've seen a 40% increase in bookings from travelers who are looking for authentic local experiences. The platform has connected us with our ideal guests.",
                      author: 'Maria G.',
                      location: 'Owner, Seaside Retreat',
                    },
                    {
                      quote:
                        'PaiSaiD has been instrumental in helping our family restaurant reach travelers from around the world. The verification process gives customers confidence in our business, and the review system helps us improve.',
                      author: 'James W.',
                      location: 'Manager, Urban Bistro',
                    },
                    {
                      quote:
                        'As a tour operator, PaiSaiD has become our most valuable marketing channel. The targeted exposure to travelers interested in our specific experiences has resulted in higher quality bookings.',
                      author: 'Sophia L.',
                      location: 'Founder, Adventure Tours',
                    },
                    {
                      quote:
                        "The analytics and insights from PaiSaiD have helped us understand our customers better and tailor our offerings to meet their needs. It's more than just a listing platform—it's a business partner.",
                      author: 'Daniel K.',
                      location: 'Director, City View Hotel',
                    },
                  ].map((testimonial, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="mb-4 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <p className="mb-4 italic text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container px-4">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              <div>
                <div className="mb-2 text-3xl font-bold md:text-4xl">5M+</div>
                <p className="text-primary-foreground/80">Active Users</p>
              </div>
              <div>
                <div className="mb-2 text-3xl font-bold md:text-4xl">150+</div>
                <p className="text-primary-foreground/80">Countries</p>
              </div>
              <div>
                <div className="mb-2 text-3xl font-bold md:text-4xl">500K+</div>
                <p className="text-primary-foreground/80">Places Listed</p>
              </div>
              <div>
                <div className="mb-2 text-3xl font-bold md:text-4xl">10M+</div>
                <p className="text-primary-foreground/80">Reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Have questions about PaiSaiD? Find answers to the most common questions below.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              {[
                {
                  question: 'How does PaiSaiD verify reviews?',
                  answer:
                    "We use a combination of automated systems and human moderation to ensure reviews are authentic. Users can only review places they've visited, and we have measures in place to detect and remove fake or inappropriate reviews.",
                },
                {
                  question: 'Is PaiSaiD free to use?',
                  answer:
                    'Yes, PaiSaiD is completely free for travelers to use. We offer premium features for businesses who want to enhance their listings, but the core functionality is free for everyone.',
                },
                {
                  question: 'How can I list my business on PaiSaiD?',
                  answer:
                    'Business owners can claim their listing by creating an account and following our verification process. Once verified, you can update your business information, respond to reviews, and access analytics.',
                },
                {
                  question: 'Does PaiSaiD have a mobile app?',
                  answer:
                    'Yes, PaiSaiD is available as a mobile app for both iOS and Android devices. You can download it from the App Store or Google Play Store to access all features on the go.',
                },
                {
                  question: 'How can I contribute to PaiSaiD?',
                  answer:
                    "There are many ways to contribute! You can write reviews for places you've visited, upload photos, answer questions from other travelers, or report inaccurate information to help us maintain quality.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Ready to Discover Amazing Places?</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join our community of travelers and start exploring the world with PaiSaiD today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/signup">Create Free Account</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/explore">
                    Explore Places
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
