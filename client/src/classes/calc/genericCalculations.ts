/**
 * Precent values should be in second decimal place
 * @param addedFlat the total amount of added stats
 * @param increased the total amount of increased stats
 * @param reduced the total amount of reduced stats
 * @param more the total amount of more stats
 * @param less the total amount of less stats
 */
function statsStack(addedFlat: number, increased: number, reduced: number, more: number, less: number) {
  return addedFlat * (1 + ((increased - reduced) / 100)) * (1 + (more / 100)) * (1 + (less / 100));
}

export {
  statsStack,
};
