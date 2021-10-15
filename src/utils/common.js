//Transform second to minutes : second
//Param (number) d Second 
//Return string: 300 -> '5:00'
export const secondsToHms = (d) => {
    d = Number(d);
  
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
  
    const minute = m < 10 ? `0${m}` : m;
    const second = s < 10 ? `0${s}` : s;
    return `${minute}:${second}`;
  };