import { Component, createSignal } from "solid-js"
import { Pet } from "../../pages/Pets"
import styles from './PetCard.module.css'

export interface PetCardProps {
  pet: Pet,
  onClick: (pet: Pet) => void
  clicksDisabled: () => boolean
  setClicksDisabled: (clicksDisabled: boolean) => any
}

const PetCard: Component<PetCardProps> = (props: PetCardProps) => {
  const [fadeEffect, setFadeEffect] = createSignal({})

  const onPetClicked = () => {
    if (props.clicksDisabled()) {
      return
    }
    props.setClicksDisabled(true)
    setFadeEffect({ transform: 'rotate(180deg) scale(0)', transition: 'transform 0.5s ease-in-out' })
    setTimeout(() => {
      setFadeEffect({})
      props.onClick(props.pet)
      props.setClicksDisabled(false)
    }, 500)
  }

  return (
    <div class={styles.container}>
      <p class={styles.name}>{props.pet.name}</p>
      <img
        style={fadeEffect()}
        class={`${styles.img} ${styles.fadeOut}`}
        src={props.pet.image}
        alt={`image of ${props.pet.name}`}
        onClick={() => onPetClicked()}
      />
    </div>
  )
}

export default PetCard
