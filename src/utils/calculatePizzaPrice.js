const sizes = {
  S: 0.75,
  M: 1,
  L: 1.25,
};

export default function calculatePizzaPrice(rupees, size) {
  return rupees * sizes[size];
}
