module.exports = {
  pipeline: {
    build: ["^build"],
    test: ["build", "^test"],
    lint: ["^lint"],
  },
};