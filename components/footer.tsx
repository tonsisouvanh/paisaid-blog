import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  className?: string;
};

const Footer = ({ className }: Props) => {
  return (
    <footer className={cn('border-t py-6 md:py-8', className)}>
      <div className="container px-4">
        <div className="hidden grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-medium">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">Discover</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/cities" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Cities
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">For Business</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/business" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Claim Listing
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Advertise
                </Link>
              </li>
              <li>
                <Link
                  href="/business/resources"
                  className="text-xs text-muted-foreground hover:text-foreground md:text-sm"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Safety Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground md:text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">PaiSaiD</span>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} PaiSaiD. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Facebook</span>
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
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>
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
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Instagram</span>
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
                className="h-5 w-5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
