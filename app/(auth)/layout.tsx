import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative rounded-md">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute -left-[10%] top-[-5%] h-[45%] w-[45%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -right-[5%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute right-[15%] top-[30%] h-[25%] w-[25%] rounded-full bg-primary/5 blur-3xl"></div>

        <svg
          className="absolute right-[15%] top-[10%] h-24 w-24 text-primary/10 md:h-40 md:w-40"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>

        <svg
          className="absolute bottom-[10%] left-[10%] h-32 w-32 text-primary/10 md:h-56 md:w-56"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="10" width="80" height="80" rx="10" fill="currentColor" />
        </svg>

        <svg
          className="absolute left-[5%] top-[35%] h-20 w-20 text-primary/10 md:h-32 md:w-32"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="50,15 100,100 0,100" fill="currentColor" />
        </svg>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
