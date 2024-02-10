import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { ArrowLeft } from 'lucide-react';
import { marketSliceActions } from '../store/market-slice';
import { sceneActions } from '../store/scene-slice';
import { menuSliceActions } from '../store/menu-slice';
import { motion } from 'framer-motion';

export default function MarketPlace() {
  const dispatch = useDispatch();
  const activeIcons = useSelector((state: RootState) => state.menu);
  const marketItems = useSelector((state: RootState) => state.market);
  const budget = useSelector((state: RootState) => state.scenes.budget);
  const allItems = [...marketItems];
  function buySkin(skin: any) {
    dispatch(marketSliceActions.buySkin({ X: skin.X, O: skin.O }));
  }
  function quitHandler() {
    dispatch(sceneActions.selectMode());
  }
  return (
    <motion.div
      initial={{ x: -200, opacity: 0, position: 'fixed' }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0, position: 'fixed' }}
      className="sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <div className="mb-10 flex px-10 justify-between items-center">
        <span onClick={quitHandler} className="cursor-pointer">
          <ArrowLeft className="w-8 h-8 stroke-white" />
        </span>
        <span className="px-5 py-2 text-white border-2 border-white bg-primary_blue rounded-full">
          {budget}
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {allItems.map((skin: any, skinId) => {
          const picked = skin.O === activeIcons.O && skin.X === activeIcons.X;

          function buyHandler() {
            if (!skin.isAvailable) {
              dispatch(sceneActions.setBudget(budget - Number(skin.price)));
              buySkin(skin);
            } else {
              dispatch(menuSliceActions.changeSkins({ X: skin.X, O: skin.O }));
            }
          }

          return (
            <div
              key={skinId}
              className={`p-3 py-4 w-36 bg-primary_blue text-center rounded-2xl ${
                picked ? 'border-4' : undefined
              }`}
            >
              <ul className="flex justify-center gap-2 mb-3">
                <li>
                  <img className="w-12 h-12" src={skin.X} alt="X" />
                </li>
                <li>
                  <img className="w-12 h-12" src={skin.O} alt="O" />
                </li>
              </ul>
              <button
                disabled={picked}
                onClick={buyHandler}
                className="text-white text-md px-6 py-1 bg-sky_blue rounded-full"
              >
                {picked
                  ? 'Picked'
                  : skin.isAvailable === undefined || skin.isAvailable === true
                  ? 'Pick'
                  : skin.price}
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
