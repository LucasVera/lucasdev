import { FaSolidLanguage } from "solid-icons/fa"
import { Component } from "solid-js"
import { useLocale } from "../../context/LocaleContext"

const ChangeLocaleBtn: Component = () => {
  const { getLocale, setLocale } = useLocale()
  const onClick = () => {
    const locale = getLocale()
    if (locale === 'en') setLocale('es')
    else setLocale('en')
  }

  return (
    <div>
      <button onClick={() => onClick()}><FaSolidLanguage size={28} /></button>
    </div>
  )
}

export default ChangeLocaleBtn
