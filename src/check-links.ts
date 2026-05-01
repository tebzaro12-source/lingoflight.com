async function checkLinks() {
  const links = [
    'https://wise.com/pay/r/bXPPy93FobB7Dgw',
    'https://wise.com/pay/r/nJ13cVSR0JFxcQc',
    'https://wise.com/pay/r/AKvOWDh1XYyrSy0',
    'https://wise.com/pay/r/KG_phkYafbivbu8',
    'https://link.payoneer.com/Token?t=5BDF5998E4C045E0B60ECDF7C2C10854&src=tpl',
    'https://link.payoneer.com/Token?t=0BC7996767864F37B013D5C3D9E8E8C9&src=pl',
    'https://link.payoneer.com/Token?t=0BC2EB462B1D466480025C37C5BB7528&src=pl',
    'https://www.paypal.com/myaccount/transfer/homepage'
  ];

  for (const link of links) {
    try {
      const res = await fetch(link, { redirect: 'manual' });
      // or redirect follow
      console.log("[" + res.status + "] " + link);
      if (res.status === 301 || res.status === 302 || res.status === 307 || res.status === 308) {
         console.log("  -> Redirects to: " + res.headers.get('location'));
      }
    } catch (e: any) {
      console.log("[ERROR] " + link + " - " + e.message);
    }
  }
}

checkLinks();
