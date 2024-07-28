import { calculateDistanceBetween2Points } from "./disanceBetween2Points";
import { absorbtionTable } from "../tables/absorbtionTable";
//G=SPL AT POINT / SPL AT 10M IN A REFERENCE ROOM
export const calculateG = (sourcePoint, listenerPoint, RT60Obj) => {
  const { totalArea: Stot, aAvg: Atot } = RT60Obj;
  const frequencies = absorbtionTable.frequencies;
  const GList = {
    125: 0,
    250: 0,
    500: 0,
    1000: 0,
    2000: 0,
    4000: 0,
  };
  const r = calculateDistanceBetween2Points(sourcePoint, listenerPoint);
  for (let freq of frequencies) {
    const freqAtot = Atot[freq];
    const fp = 100 / (r * r);
    const spNominator = 1600 * Math.PI * (1 - freqAtot);
    const spDenominator = Stot * freqAtot;
    const SoundStrength = 10 * Math.log10(fp + spNominator / spDenominator);

    GList[freq] = SoundStrength;
  }

  const Gmin = 10 * Math.log10(100 / (r * r) + 2.08 * Math.E ** (-0.02 * r));
  console.log("gmin:", Gmin);

  return { GList, Gmin };
};
