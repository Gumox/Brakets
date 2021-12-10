import moment from "moment";

export const getThisSeason = () => {
  const today = moment();
  const year = today.year();
  const month = today.month();
  const season = month >= 2 && month <= 7 ? "SS" : "FW";
  if (month === 1) year--;
  return `${year%100}${season}`;
};

export const getCurrentSeasons = () => {
  const seasons = new Set();
  const today = moment();
  const year = today.year();
  const month = today.month();

  if (month === 1) year--;
  const season = month >= 2 && month <= 7 ? "SS" : "FW";
  seasons.add(`${year%100}${season}`);
  seasons.add(`${(year - 1)%100}${season}`);
  if (season === "SS") {
    seasons.add(`${(year - 1)%100}FW`);
  } else {
    seasons.add(`${year%100}SS`);
  }
  return seasons;
};
