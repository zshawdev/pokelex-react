export const metricToFeet = (height: number) => {
  const raw = (height / 10) * 3.28084;
  let feet = Math.floor(raw);
  let inches = Math.round((raw - feet) * 12);
  if (inches === 12) {
    feet++;
    inches = 0;
    return `${feet}'0${inches}"`;
  }
  if (inches < 10) {
    return `${feet}'0${inches}"`;
  } else {
    return `${feet}'${inches}"`;
  }
};

export const metricToPounds = (weight: number) => {
  const raw = (weight / 10) * 3.28084;
  let pounds = Math.floor(raw);
  let subPounds = Math.round((raw - pounds) * 10);
  if(subPounds === 10) {
    pounds++;
    subPounds = 0;
  }
  return `${pounds}.${subPounds}lbs`;
};

export const padDigit = (num: number, size: number = 3) => num.toString().padStart(size, "0");

// stub for making node-fetch behave properly with ts compiled to commonjs module instead of esm
const _importDynamic = new Function('modulePath', 'return import(modulePath)')
export async function fetch(...args: any) {
  const {default: fetch} = await _importDynamic('node-fetch');
  return fetch(...args);
}
