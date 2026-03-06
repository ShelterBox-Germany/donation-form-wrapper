const Header = () => {
  return (
    <header>
      <nav className="bg-primary">
        <div className="container mx-auto h-24 max-w-7xl px-4 py-8 text-white xl:px-0">
          <div className="flex items-center justify-between">
            <a href="https://www.shelterbox.de/" target="_self" rel="noopener noreferrer">
              <img src="/site-logo-white.svg" alt="ShelterBox" />
            </a>
            <div className="flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2">
              <img src="/lock.svg" alt="Lock" className="h-5 w-5" />
              <span className="text-sm font-medium md:text-base">Sicheres Spenden</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
