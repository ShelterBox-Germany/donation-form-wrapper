import { useState } from 'react';

const DONATE_URL = 'https://spenden.shelterbox.de/';

const SHARE_TEXT =
  'Ich habe gerade an ShelterBox gespendet – damit Familien in Not ein sicheres Zuhause bekommen. Mach auch mit!';

const formatCurrency = (amount: string) => {
  const num = parseFloat(amount.replace(',', '.'));
  if (isNaN(num)) return amount + ' €';
  return num.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
};

const buildGreeting = (
  salutation: string | null,
  firstName: string | null,
  lastName: string | null,
  companyName: string | null,
) => {
  const isCompany = companyName && !firstName && !lastName;

  if (isCompany) {
    return {
      name: companyName,
      greeting: `Liebe Mitarbeiterinnen und Mitarbeiter von ${companyName}`,
    };
  }

  const salutationMap: Record<string, string> = {
    Herr: 'Lieber',
    Frau: 'Liebe',
  };

  const prefix =
    salutation ? salutationMap[salutation] || 'Liebe/r' : 'Liebe/r';
  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  if (fullName) {
    return { name: fullName, greeting: `${prefix} ${fullName}` };
  }

  return { name: null, greeting: 'Vielen Dank' };
};

const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LinkIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ThankYou = () => {
  const {
    VITE_BASE_URL
  } = import.meta.env;
  const [copied, setCopied] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const amount = params.get('betrag');
  const salutation = params.get('anrede');
  const firstName = params.get('vorname');
  const lastName = params.get('nachname');
  const companyName = params.get('firma');

  const { greeting } = buildGreeting(
    salutation,
    firstName,
    lastName,
    companyName,
  );

  const encodedText = encodeURIComponent(SHARE_TEXT);
  const encodedUrl = encodeURIComponent(DONATE_URL);
  const emailSubject = encodeURIComponent(
    'Gemeinsam helfen – Spende an ShelterBox',
  );
  const emailBody = encodeURIComponent(`${SHARE_TEXT}\n\n${DONATE_URL}`);

  const shareLinks = [
    {
      label: 'Facebook',
      icon: <FacebookIcon />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      color: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      label: 'X',
      icon: <XIcon />,
      href: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'hover:bg-black hover:text-white',
    },
    {
      label: 'WhatsApp',
      icon: <WhatsAppIcon />,
      href: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${DONATE_URL}`)}`,
      color: 'hover:bg-[#25D366] hover:text-white',
    },
    {
      label: 'LinkedIn',
      icon: <LinkedInIcon />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-[#0A66C2] hover:text-white',
    },
    {
      label: 'E-Mail',
      icon: <EmailIcon />,
      href: `mailto:?subject=${emailSubject}&body=${emailBody}`,
      color: 'hover:bg-gray-700 hover:text-white',
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(DONATE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = DONATE_URL;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <svg
          className="h-8 w-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>

      <h1 className="mb-1 text-2xl font-bold text-primary md:text-3xl">
        {greeting}!
      </h1>

      <p className="mb-4 text-base font-medium text-primary/80">
        Ihre Spende ist angekommen.
      </p>

      <p className="mx-auto mb-6 text-base leading-relaxed text-gray-700">
        Herzlichen Dank für Ihre großzügige Spende
        {amount && (
          <>
            {' '}
            in Höhe von{' '}
            <span className="font-semibold text-primary">
              {formatCurrency(amount)}
            </span>
          </>
        )}
        . Ihre Unterstützung macht einen echten Unterschied für Menschen in
        Not weltweit.
      </p>

      <div className="mx-auto mb-6 rounded-2xl border border-primary/10 bg-primary/5 p-4">
        <p className="text-sm leading-relaxed text-gray-600">
          Mit Ihrer Hilfe können wir Familien, die durch Naturkatastrophen und
          Konflikte alles verloren haben, mit Notunterkünften und
          lebenswichtigen Hilfsgütern versorgen.
        </p>
      </div>

      <div className="mx-auto mb-6">
        <p className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase">
          Teilen und andere inspirieren
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {shareLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Auf ${link.label} teilen`}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-200 ${link.color}`}
            >
              {link.icon}
            </a>
          ))}

          <button
            onClick={handleCopyLink}
            title="Link kopieren"
            className={`flex h-10 items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 shadow-sm transition-all duration-200 ${
              copied
                ? 'border-green-300 bg-green-50 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {copied ? <CheckIcon /> : <LinkIcon />}
            <span className="text-sm font-medium">
              {copied ? 'Kopiert!' : 'Link kopieren'}
            </span>
          </button>
        </div>
      </div>

      <a
        href={VITE_BASE_URL}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Zurück zu ShelterBox
      </a>
    </div>
  );
};

export default ThankYou;
