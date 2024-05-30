let sharedState = { _me: {} };

export function getSharedState() {
  return sharedState;
}

export function setSharedState(newState: { _me: object }) {
  sharedState = newState;
}
