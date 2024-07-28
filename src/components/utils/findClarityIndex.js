import { calculateDistanceBetween2Points } from "./disanceBetween2Points";
import { absorbtionTable } from "../tables/absorbtionTable";

export const findClarityIndex = (RT60Obj, sourcePoint, listenerPoint) => {
  const r = calculateDistanceBetween2Points(sourcePoint, listenerPoint);
  //   frequencies: [125, 250, 500, 1000, 2000, 4000],
  const frequencies = absorbtionTable.frequencies;
  const { volume, RT60 } = RT60Obj;
  let Eearly = {
    125: 0,
    250: 0,
    500: 0,
    1000: 0,
    2000: 0,
    4000: 0,
  };
  let Ereverberant = {
    125: 0,
    250: 0,
    500: 0,
    1000: 0,
    2000: 0,
    4000: 0,
  };

  let C80 = {
    125: 0,
    250: 0,
    500: 0,
    1000: 0,
    2000: 0,
    4000: 0,
  };

  const findEearly = (T, V, r) => {
    const fp = ((31200 * T) / V) * Math.E ** ((-0.04 * r) / T);
    const sp = 1 - Math.E ** (-1.11 / T);
    const Eearly = fp * sp;
    return Eearly;
  };
  const findEreverberant = (T, V, r) => {
    const fp = ((31200 * T) / V) * Math.E ** ((-0.04 * r) / T);
    const sp = Math.E ** (-1.11 / T);
    const Ereverberant = fp * sp;
    return Ereverberant;
  };

  for (let freq of frequencies) {
    const T = RT60[freq];
    const Er = findEreverberant(T, volume, r);
    const Ee = findEearly(T, volume, r);
    Ereverberant[freq] = Er;
    Eearly[freq] = Ee;
    C80[freq] = 10 * Math.log10(Ee / Er);
  }

  return { Eearly, Ereverberant, C80 };
};
