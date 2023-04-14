import type { Component } from 'solid-js'
import { createEffect, onCleanup, createSignal } from 'solid-js'
import localeTexts from './Home.texts'
import styles from './Home.module.css'
import {
  FaBrandsLinkedin,
  FaBrandsGithub,
  FaSolidEnvelope,
  FaSolidFire,
  FaSolidCat
} from 'solid-icons/fa'
import { A } from '@solidjs/router'
import { useLocale } from '../../context/LocaleContext'
import ChangeLocaleBtn from '../../components/ChangeLocaleBtn'

const App: Component = () => {
  const { getLocale } = useLocale()
  let trailElement: any
  const [isTrailActive, setIsTrailActive] = createSignal(false)
  const [texts, setTexts] = createSignal(getLocale() === 'en' ? localeTexts.en : localeTexts.es)

  const setTrailRef = (el: any) => {
    trailElement = el
  }

  createEffect(() => {
    const moveHandler = (e: any) => {
      if (!trailElement) return
      trailElement.style.left = `${e.pageX}px`
      trailElement.style.top = `${e.pageY}px`
    }

    document.addEventListener('mousemove', moveHandler)

    onCleanup(() => {
      document.removeEventListener('mousemove', moveHandler)
    })
  })

  createEffect(() => {
    const locale = getLocale()
    setTexts(locale === 'en' ? localeTexts.en : localeTexts.es)
  }, [getLocale()])

  return (
    <div class={styles.container}>
      {isTrailActive() && <div class='cursor-trail' ref={setTrailRef}></div>}
      <div class={styles.containerHeader}>
        <h1 class={styles.title}>{texts().title}</h1>
        <div class={styles.headerButtonsContainer}>
          <button class={styles.trailBtn} onclick={() => setIsTrailActive(!isTrailActive())}><FaSolidFire /></button>
          <A class={styles.petsBtn} href='/cats'><FaSolidCat /></A>
          <ChangeLocaleBtn />
        </div>
      </div>
      <h2 class={styles.subtitle}>{texts().subtitle} <strong>{texts().jobTitle}</strong></h2>
      <p>{texts().p1}</p>
      <p>{texts().p2a} <strong>{texts().jobTitle}</strong> {texts().p2b} <a href="https://www.serverlessguru.com/" target="_blank" rel="noreferrer">Serverless Guru</a> {texts().p2c}</p>
      <p>{texts().p3a} <a href='https://goo.gl/maps/tpNmbvsmhU72'>Medellín, Colombia</a>, {texts().p3b} <a href="https://www.youtube.com/watch?v=lDqlasyMJog" target="_blank" rel="noreferrer">The Office</a></p>
      <p>{texts().p4}</p>
      <div>
        <a class="text-light" style="margin: 0.5rem" href="https://www.linkedin.com/in/lucas-vera-toro-1355b479/" target="_blank">
          <FaBrandsLinkedin size={100} />
        </a>
        <a class="text-light" style="margin: 0.5rem" href="https://github.com/LucasVera" target="_blank">
          <FaBrandsGithub size={100} />
        </a>
        <a class="text-light" style="margin: 0.5rem" href="mailto:lucas@lucasdev.info" target='_blank'>
          <FaSolidEnvelope size={100} />
        </a>
      </div>
    </div>
  )
}

export default App
