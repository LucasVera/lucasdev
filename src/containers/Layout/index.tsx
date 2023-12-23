import { ParentComponent } from "solid-js"
import Footer from "../../components/Footer"
import styles from './Layout.module.css'

const Layout: ParentComponent = (props) => {
  return (
    <div class={styles.container}>
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
