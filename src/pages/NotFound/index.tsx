import { A } from "@solidjs/router"
import { Component, onMount } from "solid-js"
import { LucasDevEvents, recordAnalyticsEvent } from "../../util/analytics"

const NotFound: Component = () => {
  onMount(() => {
    recordAnalyticsEvent(LucasDevEvents.NOT_FOUND_VIEWED, { page: 'home' })
  })
  return (
    <div>
      <h1>404 - not found</h1>
      <A href="/">Go to home</A>
    </div>
  )
}

export default NotFound
