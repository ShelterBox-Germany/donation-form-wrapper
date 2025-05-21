import { useEffect } from 'react';

function App() {
  const { VITE_FUNDRAISINGBOX_HASH, VITE_FUNDRAISINGBOX_SANDBOX, VITE_TEST_MODE } =
    import.meta.env;

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
    <main>
      <div id="fbIframeDiv"></div>
      <noscript>Bitte Javascript aktivieren</noscript>
      <a
        rel="noreferrer noopener"
        target="_blank"
        href="https://www.fundraisingbox.com/?utm_source=donation_form"
      >
        <img
          style={{ border: '0 !important' }}
          src="https://secure.fundraisingbox.com/images/FundraisingBox-Logo-Widget.png"
          alt="FundraisingBox Logo"
        />
      </a>
    </main>
  );
}

export default App;
