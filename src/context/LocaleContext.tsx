import { JSXElement, ParentComponent, createContext, useContext } from "solid-js"
import { createStore } from 'solid-js/store'
import { LucasDevEvents, recordAnalyticsEvent } from "../util/analytics"

interface LocaleContextValue {
  locale: string
  getLocale: () => string
  setLocale: (locale: string) => void
}

const defaultLocaleContextValue: LocaleContextValue = {
  locale: 'en',
  getLocale: () => 'en',
  setLocale: () => { },
}

export const LocaleContext = createContext<LocaleContextValue>(defaultLocaleContextValue)

interface LocaleProviderProps {
  children?: JSXElement
}

export const LocaleProvider: ParentComponent<LocaleProviderProps> = (props: LocaleProviderProps) => {
  const [locale, setLocale] = createStore({ locale: 'en' })

  const actions: LocaleContextValue = {
    locale: locale.locale,
    getLocale: () => locale.locale,
    setLocale: (locale: string) => {
      recordAnalyticsEvent(LucasDevEvents.LANGUAGE_CHANGED, { LD_locale: locale })
      setLocale({ locale })
    },
  }

  return (
    <LocaleContext.Provider value={{ ...actions }}>
      {props.children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
