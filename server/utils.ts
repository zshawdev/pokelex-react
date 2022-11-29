//Unit Conversion
export const formatHeight = (unit: "imperial" | "metric", height: number) => {
  if (unit === "imperial") {
      const raw = (height / 10) * 3.28084; //height's value: meters albeit misplaced (stored: 69, desired: 6.9), is converted to meters (via / 10) then meters-to-feet
      let feet = Math.floor(raw);
      let inches = Math.round((raw - feet) * 12);
      if (inches === 12) {
          feet++;
          inches = 0;
      }
      return `${feet}'${String(inches).padStart(2, "0")}"`;
  } else if (unit === "metric") {
      const metricHeight = height / 10;
      return `${metricHeight.toFixed(1).replace(".", ",")}m`;
  }

  return height.toString();
};

export const formatWeight = (unit: "imperial" | "metric", weight: number) => {
  if (unit === "imperial") {
      const raw = (weight / 10) * 2.2046; //weight's value: same situation as height above
      let pounds = raw.toFixed(1);
      return `${pounds}lb`;
  } else if (unit === "metric") {
      const metricWeight = weight / 10;
      return `${metricWeight.toFixed(1).replace(".", ",")}kg`;
  }

  return weight.toString();
};

export const padDigit = (num: number, size: number = 3) => num.toString().padStart(size, "0");

// stub for making node-fetch behave properly since ts compiles this to commonjs instead of esm
const _importDynamic = new Function('modulePath', 'return import(modulePath)')
export async function fetch(...args: any) {
  const {default: fetch} = await _importDynamic('node-fetch');
  return fetch(...args);
}

export const sleep = async (ms: number) => new Promise(res => setTimeout(res, ms));
