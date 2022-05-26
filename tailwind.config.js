module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["NeoDunggeunmo", "Sawarabi Gothic", "굴림체", "monospace"],
      },
    },
  },
  plugins: [],
};
