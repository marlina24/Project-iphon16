import React, { useEffect } from 'react';

const HeroSection = () => {
  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] flex flex-col items-center justify-center p-8">
      <section className="section section-hero relative w-full max-w-6xl mx-auto">
        <div className="hero-copy text-center">
          <div className="space-y-4">
            <h1 className="sr-only">Passer à l'iPhone</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Vous avez un téléphone Android. <br />
              Mais vous voulez passer à l'iPhone.
            </h2>
            <p className="text-xl md:text-2xl text-white/90">
              C'est si simple de se lancer.
            </p>
          </div>
        </div>

        {/* Hero Image avec animation */}
        <div className="hero-image relative mt-12 h-[400px] md:h-[600px]">
          <div 
            className="absolute inset-0 bg-center bg-no-repeat bg-contain transform transition-all duration-1000 ease-out animate-float"
            style={{
              backgroundImage: "url('/images/hero-iphone.png')" // Remplacer par votre image
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;