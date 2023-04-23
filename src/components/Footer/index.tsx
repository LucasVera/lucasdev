import { Component, createEffect, createSignal } from "solid-js"
import styles from './Footer.module.css'
import localeTexts from './Footer.texts'
import { useLocale } from "../../context/LocaleContext"
import { FaSolidHeart } from "solid-icons/fa"
import { LucasDevEvents, recordAnalyticsEvent } from "../../util/analytics"

const Footer: Component = () => {
  const { getLocale } = useLocale()
  const [texts, setTexts] = createSignal(getLocale() === 'en' ? localeTexts.en : localeTexts.es)

  createEffect(() => {
    const locale = getLocale()
    setTexts(locale === 'en' ? localeTexts.en : localeTexts.es)
  }, [getLocale()])

  return (
    <div class={styles.container}>
      <p class={styles.footerText}>{texts().p1a} <FaSolidHeart color="#e25555" size={10} /> {texts().p1b} <a onClick={() => recordAnalyticsEvent(LucasDevEvents.SOLIDJS_LINK_CLICKED, {})} class={styles.solidJsLink} href="https://www.solidjs.com/" target="_blank">SolidJs</a>. {texts().p1c} <a onClick={() => recordAnalyticsEvent(LucasDevEvents.GITHUB_CODE_LINK_CLICKED, {})} class={styles.solidJsLink} href="https://github.com/LucasVera/lucasdev" target="_blank">Github</a></p>
    </div>
  )
}

export default Footer
