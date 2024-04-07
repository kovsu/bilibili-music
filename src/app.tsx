import { createRoot } from 'react-dom/client'
import Player from './components/player'
import Home from '~/pages/home'

const root = createRoot(document.getElementById('app'))
root.render(
  <>
    <Home />
    <Player bvid="" />
  </>,
)
