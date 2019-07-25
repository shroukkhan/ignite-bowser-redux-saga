const type = {
  title: "Montserrat-Bold",
  titleNarrow: "Montserrat-Thin",
  regular: "Montserrat-Regular",
  medium: "Montserrat-Medium",
  light: "Montserrat-Light",
  thin: "Montserrat-Thin",
}

// base size
const size = {
  $h1: "2rem",
  $h2: "1.8rem",
  $h3: "1.5rem",
  $h4: "1.4rem",
  $h5: "1.3rem",
  $h6: "1rem",
  $input: "0.9rem",
  $regular: "1rem",
  $mediumExtra: "0.9rem",
  $medium: "0.8rem",
  $small: "0.7rem",
  $tiny: "0.5rem",
  $flag: 24,
}

// base style
const style = {
  h1: {
    fontFamily: type.title,
    fontSize: size.$h1,
  },
  normal: {
    fontFamily: type.regular,
    fontSize: size.$regular,
  },
  description: {
    fontFamily: type.regular,
    fontSize: size.$medium,
  },
}

export default {
  type,
  size,
  style,
}
