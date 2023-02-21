export default function useFormatNumber () {

    const formatNumberES = (n, d = 0) => {
    n = new Intl.NumberFormat("de-DE").format(parseFloat(n).toFixed(d));
    if (d > 0) {
      const decimals = n.indexOf(",") > -1 ? n.length - 1 - n.indexOf(",") : 0;
      n = (decimals === 0) ? n + "," + "0".repeat(d) : n + "0".repeat(d - decimals);
    }
    return n;
  }

  return { formatNumberES };
} 