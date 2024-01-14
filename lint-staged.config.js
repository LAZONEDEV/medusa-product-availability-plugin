module.exports = {
  "**/*.(ts|tsx)": () => "yarn tsc --noEmit",
  "**/*.(md|json|ts|tsx|js)": "yarn prettier --write",
};
