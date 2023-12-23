import { Component, createEffect, createSignal, onMount } from "solid-js"
import { shuffle } from "../../util/array"
import styles from './Pets.module.css'
import PetCard from "../../components/PetCard"

import gali1 from '../../assets/images/cat-pics/gali1.jpg'
import gali2 from '../../assets/images/cat-pics/gali2.jpg'
import gali3 from '../../assets/images/cat-pics/gali3.jpg'
import gali4 from '../../assets/images/cat-pics/gali4.jpg'
import gali5 from '../../assets/images/cat-pics/gali5.jpg'
import gali6 from '../../assets/images/cat-pics/gali6.jpg'
import gali7 from '../../assets/images/cat-pics/gali7.jpg'
import galiCope1 from '../../assets/images/cat-pics/gali-cope1.jpg'
import galiCope2 from '../../assets/images/cat-pics/gali-cope2.jpg'
import galiCope3 from '../../assets/images/cat-pics/gali-cope3.jpg'
import cope1 from '../../assets/images/cat-pics/cope1.jpg'
import cope2 from '../../assets/images/cat-pics/cope2.jpg'
import cope3 from '../../assets/images/cat-pics/cope3.jpg'
import cope4 from '../../assets/images/cat-pics/cope4.jpg'
import cope5 from '../../assets/images/cat-pics/cope5.jpg'
import cope6 from '../../assets/images/cat-pics/cope6.jpg'
import cope7 from '../../assets/images/cat-pics/cope7.jpg'
import cope8 from '../../assets/images/cat-pics/cope8.jpg'
import rey1 from '../../assets/images/dog-pics/rey1.png'
import rey2 from '../../assets/images/dog-pics/rey2.png'
import rey3 from '../../assets/images/dog-pics/rey3.png'
import rey4 from '../../assets/images/dog-pics/rey4.png'
import { A } from "@solidjs/router"
import { FaSolidArrowLeft } from "solid-icons/fa"
import localeTexts from './Pets.texts'
import { useLocale } from "../../context/LocaleContext"
import ChangeLocaleBtn from "../../components/ChangeLocaleBtn"
import { LucasDevEvents, recordAnalyticsEvent } from "../../util/analytics"

export type Pet = {
  id: number,
  name: string,
  image: string
  species: PetSpecies
}

export type PetSpecies = 'dog' | 'cat' | 'multiple cats'

const Pets: Component = () => {
  onMount(() => {
    recordAnalyticsEvent(LucasDevEvents.PETS_VIEWED, { page: 'home' })
  })

  const pets: Pet[] = [
    { id: 11, name: 'Gali', image: gali1, species: 'cat' },
    { id: 12, name: 'Gali', image: gali2, species: 'cat' },
    { id: 13, name: 'Gali', image: gali3, species: 'cat' },
    { id: 14, name: 'Gali', image: gali4, species: 'cat' },
    { id: 15, name: 'Gali', image: gali5, species: 'cat' },
    { id: 16, name: 'Gali', image: gali6, species: 'cat' },
    { id: 17, name: 'Gali', image: gali7, species: 'cat' },
    { id: 21, name: 'Gali+Cope', image: galiCope1, species: 'cat' },
    { id: 22, name: 'Gali+Cope', image: galiCope2, species: 'cat' },
    { id: 23, name: 'Gali+Cope', image: galiCope3, species: 'cat' },
    { id: 31, name: 'Cope', image: cope1, species: 'cat' },
    { id: 32, name: 'Cope', image: cope2, species: 'cat' },
    { id: 33, name: 'Cope', image: cope3, species: 'cat' },
    { id: 34, name: 'Cope', image: cope4, species: 'cat' },
    { id: 35, name: 'Cope', image: cope5, species: 'cat' },
    { id: 36, name: 'Cope', image: cope6, species: 'cat' },
    { id: 37, name: 'Cope', image: cope7, species: 'cat' },
    { id: 38, name: 'Cope', image: cope8, species: 'cat' },
    { id: 41, name: 'Rey', image: rey1, species: 'dog' },
    { id: 42, name: 'Rey', image: rey2, species: 'dog' },
    { id: 43, name: 'Rey', image: rey3, species: 'dog' },
    { id: 44, name: 'Rey', image: rey4, species: 'dog' },
  ]
  const randomizedPets = shuffle(pets)

  const slicedPets = randomizedPets.slice(0, 3)

  const { getLocale } = useLocale()

  const [shownPets, setShownPets] = createSignal(slicedPets)
  const [clicksDisabled, setClicksDisabled] = createSignal(false)
  const [texts, setTexts] = createSignal(getLocale() === 'en' ? localeTexts.en : localeTexts.es)

  const petClicked = (clickedPet: Pet) => {
    const newPets = shownPets().filter(cat => cat.id !== clickedPet.id)
    const newRandomizedPets = shuffle(pets)
      .filter(pet => pet.id !== clickedPet.id)
      .filter(pet => !newPets.some(newPet => newPet.id === pet.id))
    newPets.push(newRandomizedPets[0])
    setShownPets(newPets)
  }

  createEffect(() => {
    const locale = getLocale()
    setTexts(locale === 'en' ? localeTexts.en : localeTexts.es)
  }, [getLocale()])

  return (
    <div class={styles.container}>
      <div class={styles.headerContainer}>
        <div class={styles.headerTitleContainer}>
          <h1 class={styles.title}>{texts().title}</h1>
          <h2 class={styles.subtitle}>{texts().subtitle}</h2>
        </div>
        <div class={styles.headerNavContainer}>
          <ChangeLocaleBtn />
          <A class={styles.backBtn} href="/"><FaSolidArrowLeft /></A>
        </div>
      </div>
      <div class={styles.petContainer}>
        {shownPets().map((pet: Pet) => (
          <PetCard
            pet={pet}
            onClick={(pet: Pet) => petClicked(pet)}
            clicksDisabled={clicksDisabled}
            setClicksDisabled={setClicksDisabled}
          />
        ))}
      </div>
    </div>
  )
}

export default Pets
