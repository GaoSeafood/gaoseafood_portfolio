export const GA_ID = '';

export function initGA() {
  if (window.__gaInit || !GA_ID) return;
  window.__gaInit = true;
  const analyticsGranted = localStorage.getItem('consent.analytics') !== 'denied';
  window[`ga-disable-${GA_ID}`] = !analyticsGranted;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: true, allow_google_signals: false });
}

export const updateAnalyticsConsent = (granted) => {
  localStorage.setItem('consent.analytics', granted ? 'granted' : 'denied');
  window[`ga-disable-${GA_ID}`] = !granted;
  window.gtag?.('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
};

export function trackPageview(pathname) {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', { page_path: pathname, page_title: document.title });
}
