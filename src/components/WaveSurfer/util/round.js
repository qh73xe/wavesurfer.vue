export default function round(value, significant) {
  const tmp = 10 ** significant;
  return Math.Round(value * tmp) / tmp;
}
