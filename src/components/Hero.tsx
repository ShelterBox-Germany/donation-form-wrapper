const Hero = () => {
  return (
    <div className="hidden md:block main-content-height relative">
        <img src="/hero-desktop.jpg" alt="Hero" className="h-full w-full object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 h-96 w-full bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-10 left-0 p-4">
          <h1 className="mb-3 text-4xl font-bold text-white">
            Bitte spenden Sie heute
          </h1>
          <p className="text-xl text-white">
            Ihre Spende trägt dazu bei, einen Unterschied zu machen und eine
            bessere Zukunft für Menschen in Not zu schaffen.
          </p>
        </div>
    </div>
  );
};

export default Hero;
