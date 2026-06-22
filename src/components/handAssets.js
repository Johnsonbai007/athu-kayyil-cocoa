// These files live in `public/assets/hands`, so Vite serves them from `/assets/hands/...`.
const HAND_ASSET_BASE = "/assets/hands";

const HAND_ASSETS = {
  left: {
    fist: `${HAND_ASSET_BASE}/left-fist.png`,
    openEmpty: `${HAND_ASSET_BASE}/left-open-empty.png`,
    openCoin: `${HAND_ASSET_BASE}/left-open-coin.png`,
  },
  right: {
    fist: `${HAND_ASSET_BASE}/right-fist.png`,
    openEmpty: `${HAND_ASSET_BASE}/right-open-empty.png`,
    openCoin: `${HAND_ASSET_BASE}/right-open-coin.png`,
  },
};

const HAND_STATE_KEYS = {
  fist: "fist",
  "open-empty": "openEmpty",
  "open-coin": "openCoin",
};

export function getHandAssetSrc(side, handState) {
  return HAND_ASSETS[side]?.[HAND_STATE_KEYS[handState]] ?? "";
}
