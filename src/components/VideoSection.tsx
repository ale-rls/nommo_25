'use client'

export function VideoSection() {
  const videoUrl = "https://res.cloudinary.com/dsl5aijpu/video/upload/f_auto,q_auto/c2bueiwvz27ok00ig3pe";
  
  return (
    <section id="video" className="min-h-screen flex justify-center items-center">
      <div className="w-[80%] max-w-[1200px] aspect-video">
        <video 
          className="w-full h-full object-cover rounded-lg"
          controls
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
} 