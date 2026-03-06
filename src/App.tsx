import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ThankYou from './components/ThankYou';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

const FormSkeleton = () => (
  <div className="animate-pulse-skeleton space-y-5 px-6 pt-10">
    <div className="h-5 w-3/4 rounded bg-gray-200" />
    <div className="space-y-3">
      <div className="h-10 rounded bg-gray-200" />
      <div className="h-10 rounded bg-gray-200" />
    </div>
    <div className="h-5 w-1/2 rounded bg-gray-200" />
    <div className="grid grid-cols-2 gap-3">
      <div className="h-10 rounded bg-gray-200" />
      <div className="h-10 rounded bg-gray-200" />
    </div>
    <div className="h-10 rounded bg-gray-200" />
    <div className="h-12 w-full rounded-lg bg-primary/20" />
  </div>
);

function App() {
  const {
    VITE_FUNDRAISINGBOX_HASH,
    VITE_FUNDRAISINGBOX_SANDBOX,
    VITE_TEST_MODE,
  } = import.meta.env;

  const searchParams = new URLSearchParams(window.location.search);
  const isThankYou = searchParams.has('betrag');
  const amount = searchParams.get('amount');
  const org = searchParams.get('o');
  const testMode = VITE_TEST_MODE === 'true';
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    if (isThankYou) return;

    const scriptId = 'fundraisingbox-script';

    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://secure.fundraisingbox.com/app/paymentJS?hash=${VITE_FUNDRAISINGBOX_HASH}`;
    if (amount) {
      script.src = script.src + `&amount=${amount}`;
    }
    if (testMode) {
      script.src = script.src + `&sandbox=${VITE_FUNDRAISINGBOX_SANDBOX}`;
    }

    script.type = 'text/javascript';

    document.body.appendChild(script);

    const observer = new MutationObserver(() => {
      const container = document.getElementById('fbIframeDiv');
      if (container && container.children.length > 0) {
        setFormLoaded(true);
        observer.disconnect();
      }
    });

    const container = document.getElementById('fbIframeDiv');
    if (container) {
      observer.observe(container, { childList: true });
    }

    return () => {
      observer.disconnect();
      const existingScript = document.getElementById(scriptId);
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [VITE_FUNDRAISINGBOX_HASH, VITE_FUNDRAISINGBOX_SANDBOX, amount, testMode, isThankYou]);

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto max-w-7xl flex-1 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Hero org={org} thankYou={isThankYou} />
          {isThankYou ? (
            <section className="main-content-height flex items-center justify-center overflow-y-auto bg-white px-6 py-8 shadow-[−8px_0_24px_-12px_rgba(0,0,0,0.1)] md:px-10">
              <ThankYou />
            </section>
          ) : (
            <section
              className="main-content-height relative overflow-y-auto bg-white pt-10 pb-0 shadow-[-8px_0_24px_-12px_rgba(0,0,0,0.1)]"
            >
              {!formLoaded && <FormSkeleton />}
              <div
                id="fbIframeDiv"
                className={`transition-opacity duration-500 ${formLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <noscript>Bitte Javascript aktivieren</noscript>
              <a
                className="absolute right-5 bottom-25 md:right-5"
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.fundraisingbox.com/?utm_source=donation_form"
              >
                <img
                  src="https://secure.fundraisingbox.com/images/FundraisingBox-Logo-Widget.png"
                  alt="FundraisingBox Logo"
                />
              </a>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
