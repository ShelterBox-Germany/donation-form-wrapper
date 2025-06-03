import { useEffect } from 'react';
import Hero from './components/Hero';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
function App() {
  const {
    VITE_FUNDRAISINGBOX_HASH,
    VITE_FUNDRAISINGBOX_SANDBOX,
    VITE_TEST_MODE,
  } = import.meta.env;

  const searchParams = new URLSearchParams(window.location.search);
  const amount = searchParams.get('amount');
  const testMode = VITE_TEST_MODE === 'true';

  useEffect(() => {
    const scriptId = 'fundraisingbox-script'; // Use an ID for easier management

    // Prevent adding the script multiple times if the component re-renders
    // or if the script was already manually added.
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

    // Cleanup function: Remove the script when the component unmounts
    // or before the effect runs again if dependencies change.
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [VITE_FUNDRAISINGBOX_HASH, VITE_FUNDRAISINGBOX_SANDBOX, amount, testMode]);

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto max-w-7xl flex-1 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Hero />
          <section
            className={`main-content-height overflow-y-auto bg-white pt-10 pb-0`}
          >
            <div id="fbIframeDiv"></div>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
