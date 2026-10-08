/**
 * Utility for geolocation-based language detection
 * Supports Spanish and English languages only
 */

export type Language = 'es' | 'en';

interface GeolocationResponse {
  country_code?: string;
  country?: string;
}

// Spanish-speaking countries (ISO 3166-1 alpha-2 codes)
const SPANISH_COUNTRIES = [
  'ES', // Spain
  'MX', // Mexico
  'AR', // Argentina
  'CO', // Colombia
  'CL', // Chile
  'PE', // Peru
  'VE', // Venezuela
  'EC', // Ecuador
  'GT', // Guatemala
  'CU', // Cuba
  'BO', // Bolivia
  'DO', // Dominican Republic
  'HN', // Honduras
  'PY', // Paraguay
  'SV', // El Salvador
  'NI', // Nicaragua
  'CR', // Costa Rica
  'PA', // Panama
  'UY', // Uruguay
  'GQ', // Equatorial Guinea
];

/**
 * Get user's language based on geolocation
 * Falls back to browser language if geolocation fails
 */
export async function detectLanguage(): Promise<Language> {
  try {
    // Try multiple geolocation APIs for reliability
    const language = await getLanguageFromIP();
    return language;
  } catch (error) {
    console.warn('Geolocation failed, using browser language', error);
    return getLanguageFromBrowser();
  }
}

/**
 * Get language from IP-based geolocation using ipapi.co (free tier)
 */
async function getLanguageFromIP(): Promise<Language> {
  try {
    console.log('[Geolocation] Fetching location from ipapi.co...');
    const response = await fetch('https://ipapi.co/json/');

    if (!response.ok) {
      console.warn('[Geolocation] API request failed:', response.status, response.statusText);
      throw new Error('Geolocation API failed');
    }

    const data: GeolocationResponse = await response.json();
    console.log('[Geolocation] Response:', data);

    const countryCode = data.country_code?.toUpperCase();
    console.log('[Geolocation] Country code:', countryCode);

    if (countryCode && SPANISH_COUNTRIES.includes(countryCode)) {
      console.log('[Geolocation] Spanish-speaking country detected');
      return 'es';
    }

    console.log('[Geolocation] English-speaking country detected');
    return 'en';
  } catch (error) {
    console.error('[Geolocation] Error:', error);
    // Fallback to browser language
    return getLanguageFromBrowser();
  }
}

/**
 * Get language from browser settings as fallback
 */
function getLanguageFromBrowser(): Language {
  if (typeof navigator === 'undefined') {
    console.log('[Geolocation] Navigator undefined (SSR), defaulting to English');
    return 'en'; // Default for SSR
  }

  const browserLang = navigator.language || (navigator as any).userLanguage;
  const langCode = browserLang?.toLowerCase().split('-')[0];

  const detectedLang = langCode === 'es' ? 'es' : 'en';
  console.log('[Geolocation] Browser language:', browserLang, '-> Detected:', detectedLang);

  return detectedLang;
}

/**
 * Store selected language in localStorage
 */
export function setLanguage(lang: Language): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('preferred-language', lang);
  }
}

/**
 * Get stored language preference
 */
export function getStoredLanguage(): Language | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem('preferred-language');
  return stored === 'es' || stored === 'en' ? stored : null;
}

/**
 * Get language with priority:
 * 1. Stored preference
 * 2. Geolocation detection
 */
export async function getLanguage(): Promise<Language> {
  console.log('[Geolocation] Getting language...');

  const stored = getStoredLanguage();
  if (stored) {
    console.log('[Geolocation] Using stored preference:', stored);
    return stored;
  }

  console.log('[Geolocation] No stored preference, detecting...');
  const detected = await detectLanguage();
  console.log('[Geolocation] Detected language:', detected);

  setLanguage(detected);
  return detected;
}

/**
 * Force a specific language (useful for testing)
 */
export function forceLanguage(lang: Language): void {
  console.log('[Geolocation] Forcing language to:', lang);
  setLanguage(lang);
  window.location.reload();
}
