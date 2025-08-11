import { useI18n } from '../contexts/I18nContext';

// This hook provides a more convenient way to access translations
export const useTranslation = () => {
  const { t, language, setLanguage, isRTL } = useI18n();
  
  return {
    t,
    language,
    setLanguage,
    isRTL,
    // Helper functions for common translation patterns
    translate: t,
    changeLanguage: setLanguage,
  };
};
