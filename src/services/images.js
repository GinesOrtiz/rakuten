export const getImage = (artwork, size = 217, quality = 80) =>
  artwork?.replace('.jpeg', `-width${size}-quality${quality}.jpeg`)
