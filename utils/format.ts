export const formatAmount = (value: number) => {
  const formated = value.toFixed(8).replace(/\.?0+$/, "");
  if(formated.length>12){
    return formated.substring(0,12)
  }
  return formated;
}
  

export const validInput = (value: string) => {
  //const regex = /^[0-9]-?\d*\.?\d{0,8}$/;
  return (/* (regex.test(value) || value === "") && */ value.length < 10)
}

export const numberToFixed = (value: string) => {
  const parsedValue = Number(value);
  if (isNaN(parsedValue)) {
    return "";
  }

  return (parsedValue / 100000000).toFixed(5).replace(/\.?0+$/, "");
}

export const usdFormat = (value: string) => {
  return `$${Intl.NumberFormat("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value))}`
}

export const adaFormat = (value: string) => {
  return `₳${Intl.NumberFormat("en", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value))}`
}

export const numberFormat = (
  value: string | number,
  maxFractionDigits?: number,
  minFractionDigits?: number,
  addScaleSuffix?: boolean
) => {
  let num = typeof value === "string" ? Number(value) : value;
  let suffix = "";
  if (addScaleSuffix && num >= 1000000) {
    const units = ["K", "M", "B", "T"];
    const unit = Math.round(num.toFixed(0).length) / 3 - 1;
    num = num / Math.pow(10, unit * 3);
    suffix = units[unit - 1];
  }

  return `${Intl.NumberFormat("en", {
    minimumFractionDigits: minFractionDigits ?? 0,
    maximumFractionDigits: maxFractionDigits ?? 4,
  }).format(num)}${suffix}`;
};
