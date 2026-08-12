"use client";

import { useEffect, useState } from "react";

const analyticsId = process.env.NEXT_PUBLIC_GA_ID;
const consentStorageKey = "kuara-analytics-consent";
const preferencesEvent = "kuara:open-privacy-preferences";

type ConsentChoice = "accepted" | "rejected";

declare global {
  interface Window {
    dataLayer: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGoogleAnalytics() {
  if (!analyticsId) return;

  (window as unknown as Record<string, boolean>)[`ga-disable-${analyticsId}`] = false;
  if (document.querySelector(`script[data-kuara-ga="${analyticsId}"]`)) {
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", analyticsId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
  script.dataset.kuaraGa = analyticsId;
  document.head.appendChild(script);
}

function clearGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name?.startsWith("_ga")));

  const domains = ["", window.location.hostname, ".kuaraceramicas.com.br"];
  for (const name of cookieNames) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function AnalyticsConsent() {
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!analyticsId) return;

    const savedChoice = window.localStorage.getItem(consentStorageKey) as ConsentChoice | null;
    if (savedChoice === "accepted") loadGoogleAnalytics();
    const initializationTimer = window.setTimeout(() => {
      setIsOpen(savedChoice === null);
      setReady(true);
    }, 0);

    const openPreferences = () => setIsOpen(true);
    window.addEventListener(preferencesEvent, openPreferences);
    return () => {
      window.clearTimeout(initializationTimer);
      window.removeEventListener(preferencesEvent, openPreferences);
    };
  }, []);

  if (!analyticsId || !ready || !isOpen) return null;

  const saveChoice = (choice: ConsentChoice) => {
    window.localStorage.setItem(consentStorageKey, choice);

    if (choice === "accepted") {
      loadGoogleAnalytics();
    } else {
      (window as unknown as Record<string, boolean>)[`ga-disable-${analyticsId}`] = true;
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      clearGoogleAnalyticsCookies();
    }

    setIsOpen(false);
  };

  return (
    <aside className="analytics-consent" role="dialog" aria-modal="false" aria-label="Preferências de privacidade">
      <div>
        <strong>Sua privacidade importa</strong>
        <p>
          Usamos o Google Analytics para entender como esta página é utilizada e melhorar sua experiência. Ele só será ativado com sua autorização. <a href="/privacidade-termos.html#analytics">Saiba mais</a>.
        </p>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" className="analytics-reject" onClick={() => saveChoice("rejected")}>Recusar</button>
        <button type="button" className="analytics-accept" onClick={() => saveChoice("accepted")}>Aceitar</button>
      </div>
    </aside>
  );
}

export function openPrivacyPreferences() {
  window.dispatchEvent(new Event(preferencesEvent));
}
