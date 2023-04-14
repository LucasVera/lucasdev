import { A } from "@solidjs/router"
import { Component } from "solid-js"

const NotFound: Component = () => {
  return (
    <div>
      <h1>404 - not found</h1>
      <A href="/">Go to home</A>
    </div>
  )
}

export default NotFound
