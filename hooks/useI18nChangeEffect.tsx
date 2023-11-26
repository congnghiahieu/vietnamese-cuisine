import { i18n } from '@/lib/i18n';
import { useEffect } from 'react';

const useI18nChangeEffect = (cb: () => any) => {
  useEffect(() => {
    const unsubscribe = i18n.onChange(() => cb());
    return unsubscribe;
  }, []);
};

export default useI18nChangeEffect;
