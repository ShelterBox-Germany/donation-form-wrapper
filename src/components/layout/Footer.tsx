const Footer = () => {
  return (
    <footer className="bg-primary">
      <div className="container mx-auto max-w-7xl h-24 px-4 py-8 text-white">
        <div className="flex items-center justify-between">
          <p>© {new Date().getFullYear()} ShelterBox Deutschland e.V.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.shelterbox.de/datenschutzerklaerung/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/80"
            >
              Datenschutz
            </a>
            <span className="text-white/40">|</span>
            <a
              href="https://www.shelterbox.de/impressum/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/80"
            >
              Impressum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
