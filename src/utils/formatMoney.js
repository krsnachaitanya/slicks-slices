const formatter = Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
});

export default function formatMoney(rupees) {
  return formatter.format(rupees);
}
