'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ContactSection() {
  const router = useRouter();

  return (
    <section id='contact' className='min-h-screen flex items-center justify-center px-6'>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl w-full">
        {/* Left column - Heading */}
        <div className="lg:col-span-8">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Ready to level up?
          </h1>
        </div>

        {/* Right column - Buttons */}
        <div className="lg:col-span-4 flex justify-center gap-4">
          <Button variant='secondary' onClick={() => router.push('/')}>
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
} 