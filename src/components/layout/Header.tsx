const Header = () => {
  return (
    <header>
      <nav className="bg-primary">
        <div className="container mx-auto h-24 max-w-7xl px-4 py-8 text-white xl:px-0">
          <div className="flex items-center justify-between">
            <img src="/site-logo-white.svg" alt="ShelterBox" />
            <div className="flex items-center gap-4">
              <img src="/lock.svg" alt="Lock" className="h-6 w-6" />
              <h1 className="text-normal md:text-xl">Sicheres spenden</h1>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
