'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useMobileNavStore from '@/store/use-mobile-nav-store';
import { MapPin, Menu } from 'lucide-react';

const Navbar = () => {
  const { onOpen, onClose, open } = useMobileNavStore();
  const pathname = usePathname(); // Get current path

  const navItems = [
    { href: '/explore', label: 'Explore' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <div className="">
            <Sheet open={open} onOpenChange={isOpen => (isOpen ? onOpen() : onClose())}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] sm:w-[350px]">
                <nav className="flex flex-col gap-4">
                  <Link onClick={onClose} href="/" className="flex items-center gap-2 text-xl font-bold">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>PaiSaiD</span>
                  </Link>
                  {navItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`text-lg font-medium ${
                        pathname === item.href ? 'font-bold text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-4 flex flex-col gap-2">
                    <Button onClick={onClose} asChild variant="outline" className="w-full">
                      <Link href="/signin">Log in</Link>
                    </Button>
                    <Button onClick={onClose} asChild className="w-full">
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="hidden md:inline">PaiSaiD</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium ${
                pathname === item.href ? 'font-bold text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flexd hidden items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link href="/signin">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// 'use client';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import useMobileNavStore from '@/store/use-mobile-nav-store';
// import { MapPin, Menu, X } from 'lucide-react';
// import Link from 'next/link';

// const Navbar = () => {
//   const { onOpen, onClose, open } = useMobileNavStore();
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-14 items-center justify-between px-4 md:px-6">
//         <div className="flex items-center gap-2">
//           <Sheet open={open} onOpenChange={isOpen => (isOpen ? onOpen() : onClose())}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="md:hidden">
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="w-[80%] sm:w-[350px]">
//               <nav className="flex flex-col gap-4">
//                 <Link onClick={onClose} href="/" className="flex items-center gap-2 text-xl font-bold">
//                   <MapPin className="h-5 w-5 text-primary" />
//                   <span>PaiSaiD</span>
//                 </Link>
//                 <Link onClick={onClose} href="/explore" className="text-lg font-medium">
//                   Explore
//                 </Link>
//                 <Link onClick={onClose} href="/categories" className="text-lg font-medium">
//                   Categories
//                 </Link>
//                 <Link onClick={onClose} href="/about" className="text-lg font-medium">
//                   About
//                 </Link>
//                 <Link onClick={onClose} href="/contact" className="text-lg font-medium">
//                   Contact
//                 </Link>
//                 <div className="mt-4 flex flex-col gap-2">
//                   <Button onClick={onClose} asChild variant="outline" className="w-full">
//                     <Link href="/signin">Log in</Link>
//                   </Button>
//                   <Button onClick={onClose} asChild className="w-full">
//                     <Link href="/signup">Sign up</Link>
//                   </Button>
//                 </div>
//               </nav>
//             </SheetContent>
//           </Sheet>
//           <Link href="/" className="flex items-center gap-2 text-xl font-bold">
//             <MapPin className="h-5 w-5 text-primary" />
//             <span className="hidden md:inline">PaiSaiD</span>
//           </Link>
//         </div>
//         <nav className="hidden items-center gap-6 md:flex">
//           <Link href="/explore" className="text-sm font-medium">
//             Explore
//           </Link>
//           <Link href="/categories" className="text-sm font-medium">
//             Categories
//           </Link>
//           <Link href="/about" className="text-sm font-medium">
//             About
//           </Link>
//           <Link href="/contact" className="text-sm font-medium">
//             Contact
//           </Link>
//         </nav>
//         <div className="flex items-center gap-2">
//           <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
//             <Link href="/signin">Log in</Link>
//           </Button>
//           <Button asChild size="sm">
//             <Link href="/signup">Sign up</Link>
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
