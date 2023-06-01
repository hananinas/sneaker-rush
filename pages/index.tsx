import type { NextPage } from 'next'
import Game from '../components/game/Game'

// Delete this if runtime JavaScript is needed:
export const config = {
  unstable_runtimeJS: false,
}

const Home: NextPage = () => {
  return (
    <>
     <Game/>
    </>
  )
}

export default Home
