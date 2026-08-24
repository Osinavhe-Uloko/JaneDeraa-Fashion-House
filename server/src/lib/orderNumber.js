// Order numbers look like "JD-8F2C41" — short, human-readable, on-brand.
function generateOrderNumber() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `JD-${suffix}`;
}

module.exports = { generateOrderNumber };
