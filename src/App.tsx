import { useSelector } from 'react-redux';
import IntroPage from './components/Intro';

import { RootState } from './store';
import SelectMode from './components/SelectMode';
import { AnimatePresence } from 'framer-motion';
import GameScreen from './components/GameScreen';

export default function App() {
  const screenMode = useSelector((state: RootState) => state.scenes);

  return (
    <div className="flex h-screen justify-center items-center">
      <AnimatePresence>
        {screenMode.introScreen && <IntroPage />}
      </AnimatePresence>
      <AnimatePresence>
        {screenMode.selectModeScreen && <SelectMode />}
      </AnimatePresence>
      {screenMode.gameScreen && <GameScreen />}
    </div>
  );
}
