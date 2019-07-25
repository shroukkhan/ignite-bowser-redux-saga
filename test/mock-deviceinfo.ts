jest.mock("react-native-deviceinfo", () => {
  return {
    isEmulator: () => true,
    getBundleId: () => "",
  }
})
