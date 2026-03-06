const Footer = () => {
  const {
    VITE_BASE_URL
  } = import.meta.env;
  return (
    <footer className="bg-primary">
      <div className="container mx-auto max-w-7xl h-24 px-4 py-8 text-white">
        <div className="flex items-center justify-between">
          <p>© {new Date().getFullYear()} ShelterBox Deutschland e.V.</p>
          <div className="flex items-center gap-4">
            <a
              href={`${VITE_BASE_URL}/datenschutz`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/80"
            >
              Datenschutz
            </a>
            <span className="text-white/40">|</span>
            <a
              href={`${VITE_BASE_URL}/impressum`}
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
