const Footer = () => {
  return (
    <footer className="bg-primary">
      <div className="container mx-auto max-w-7xl px-4 py-8 text-white">
        <div className="flex items-center justify-between">
          <p>© {new Date().getFullYear()} ShelterBox Deutschland e.V.</p>
          <p>
            <a
              href="https://www.shelterbox.de/impressum/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Impressum
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
