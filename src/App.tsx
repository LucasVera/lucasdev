import { Route, Router, Routes } from '@solidjs/router'
import type { Component } from 'solid-js'
import Home from './pages/Home'
import Pets from './pages/Pets'
import NotFound from './pages/NotFound'
import { LocaleProvider } from './context/LocaleContext'
import Layout from './containers/Layout'
import { Amplify, Analytics } from 'aws-amplify'
import awsConfig from './aws-exports'

Amplify.configure(awsConfig)
Analytics.autoTrack('session', {
  enable: true,
})

const App: Component = () => {
  return (
    <div>
      <LocaleProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/cats" element={<Layout><Pets /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LocaleProvider>
    </div>
  )
}

export default App
