const cp = require('child_process');

function commit() {
  try { return cp.execSync('git rev-parse --short HEAD').toString().trim(); }
  catch { return 'dev'; }
}

module.exports = {
  expo: {
    name: "Organized Scann",
    slug: "organized-scann",
    version: "1.0.0",
    orientation: "portrait",
    assetBundlePatterns: ["**/*"],
    ios: { supportsTablet: false },
    android: {
      package: "com.organizedscann.app",
      permissions: []
    },
    extra: { COMMIT_HASH: commit() },
    plugins: [
      ["expo-build-properties", { android: { usesCleartextTraffic: true } }]
    ]
  }
};
