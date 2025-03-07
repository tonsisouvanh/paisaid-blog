import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function MobileAppPromo() {
  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Take PaiSaiD With You</h2>
            <p className="mb-6 text-muted-foreground">
              Download our mobile app to discover places on the go, save your favorites, and get personalized
              recommendations based on your preferences.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild variant="outline" className="h-14 px-6">
                <Link href="#" className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"></path>
                    <path d="M16 3v4"></path>
                    <path d="M8 3v4"></path>
                    <path d="M3 11h18"></path>
                    <path d="M17.8 20.8l-2.9 1.2a.5.5 0 0 1-.6-.6l.4-3.2"></path>
                    <path d="M17.8 20.8a.5.5 0 0 0 .6-.6l-1.2-2.9a.5.5 0 0 0-.9 0l-1.2 2.9"></path>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Download on the</span>
                    <span className="text-base font-medium">App Store</span>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-14 px-6">
                <Link href="#" className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M3 6.2c0-.68.44-1.3 1.1-1.5l7.9-2.6c.8-.3 1.7-.3 2.5 0l7.9 2.6c.66.2 1.1.82 1.1 1.5v14.6c0 .68-.44 1.3-1.1 1.5l-7.9 2.6c-.8.3-1.7.3-2.5 0l-7.9-2.6c-.66-.2-1.1-.82-1.1-1.5z"></path>
                    <path d="M12 22V12"></path>
                    <path d="M12 12 3 6.2"></path>
                    <path d="m12 12 9-5.8"></path>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Get it on</span>
                    <span className="text-base font-medium">Google Play</span>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative h-[400px] w-[200px] md:h-[500px] md:w-[250px]">
              <Image
                src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mobile app screenshot"
                fill
                className="rounded-3xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
