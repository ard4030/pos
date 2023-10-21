import localFont from "next/font/local";

export const yekan = localFont({
  src: [
    {
      path: "../../public/fonts/IRANYekanLight.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANYekanLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANYekanRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
        path: "../../public/fonts/Farsi_numerals/IRANYekanRegularFaNum.ttf",
        weight: "500",
        style: "normal",
    },
    {
      path: "../../public/fonts/IRANYekanMedium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANYekanBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});
