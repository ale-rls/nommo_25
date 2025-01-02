'use client'

import { useState } from 'react';
import Image from 'next/image';

export function VideoSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  // Video URL with optimizations
  const videoUrl = "https://res.cloudinary.com/dsl5aijpu/video/upload/f_auto,q_auto/c2bueiwvz27ok00ig3pe";

  return (
    <section id="video" className="min-h-screen flex justify-center items-center">
      <div className="w-[80%] max-w-[1200px] aspect-video relative">
        {!isVideoLoaded ? (
          <div 
            className="w-full h-full relative cursor-pointer group"
            onClick={() => setIsVideoLoaded(true)}
          >
            <Image
              src="/video-thumbnail.jpg"
              alt="Video thumbnail"
              fill
              className="object-cover rounded-lg"
              priority
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <video 
            className="w-full h-full object-cover rounded-lg"
            controls
            autoPlay
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </section>
  );
} 