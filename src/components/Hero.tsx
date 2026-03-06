import { useState } from 'react';

const DEFAULT_IMAGE = '/hero-desktop.jpg';
const IMAGE_BASE_URL = import.meta.env.VITE_HERO_IMAGE_BASE_URL as string | undefined;

const Hero = ({ org, thankYou = false }: { org: string | null; thankYou?: boolean }) => {
  const orgSrc = org && IMAGE_BASE_URL
  ? `${IMAGE_BASE_URL}/${org}`
  : DEFAULT_IMAGE;
  const [imageSrc, setImageSrc] = useState(orgSrc);

  return (
    <div className="hidden md:block main-content-height relative overflow-hidden">
        <img
          src={imageSrc}
          alt="Hero"
          className="animate-ken-burns h-full w-full object-cover object-top"
          onError={() => setImageSrc(DEFAULT_IMAGE)}
        />
        <div className="absolute inset-x-0 bottom-0 h-96 w-full bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-10 left-0 p-4">
          {thankYou ? (
            <>
              <h1 className="animate-fade-up mb-3 text-4xl font-bold text-white">
                Danke für Ihre Spende
              </h1>
              <p className="animate-fade-up-delay text-xl text-white">
                Gemeinsam schaffen wir ein sicheres Zuhause für Familien in Not.
              </p>
            </>
          ) : (
            <>
              <h1 className="animate-fade-up mb-3 text-4xl font-bold text-white">
                Bitte spenden Sie heute
              </h1>
              <p className="animate-fade-up-delay text-xl text-white">
                Ihre Spende trägt dazu bei, einen Unterschied zu machen und eine
                bessere Zukunft für Menschen in Not zu schaffen.
              </p>
            </>
          )}
        </div>
    </div>
  );
};

export default Hero;
