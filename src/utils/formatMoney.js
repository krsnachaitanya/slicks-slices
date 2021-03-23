const formatter = Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export default function formatMoney(rupees) {
  return formatter.format(rupees);
}
