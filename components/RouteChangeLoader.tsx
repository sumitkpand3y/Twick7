'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function RouteChangeLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800); // Adjust for smoother feel

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 dark:bg-black/80 backdrop-blur-sm transition-all">
      <div className="relative w-24 h-24 animate-spin-slow">
        <Image
          src="https://tweak7.co.in/mainwebsit/image/logo/logo.png"
          alt="Loading..."
          fill
          className="object-contain"
        />
        {/* Optional spinner ring inside logo */}
        {/* <div className="absolute inset-0 rounded-full border-[5px] border-t-blue-500 border-b-transparent border-l-transparent border-r-transparent animate-spin" /> */}
      </div>
    </div>
  );
}
