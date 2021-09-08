import React, {useContext, useCallback} from 'react';
import en_US from './en_US';
import zh_CN from './zh_CN';

const LocaleContext = React.createContext<string>(null!);
const {Provider} = LocaleContext;

// 提供中英文的Provider
export const LocaleProvider: React.FC<{locale: string}> = function LocaleProvider({locale, children}) {
  return (
    <Provider value={locale}>
      {children}
    </Provider>
  )
}

// 转换中英文的方法
export function useTranslationLanguage() {
  const locale = useContext(LocaleContext);
  return useCallback((propName: string) => {
    if (locale === 'zhCN') {
      return zh_CN[propName];
    } else if (locale === 'enUS') {
      return en_US[propName];
    }
    return zh_CN[propName];
  }, [locale])
}
