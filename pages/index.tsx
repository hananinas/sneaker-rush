import type { NextPage } from 'next'
import Game from '../components/game/Game'

// Delete this if runtime JavaScript is needed:
export const config = {
  unstable_runtimeJS: false,
}

const Home: NextPage = () => {
  return (
    <>
    <div suppressHydrationWarning={true}>
     {process.browser && < Game/>}
    </div>
    </>
  )
}

export default Home
