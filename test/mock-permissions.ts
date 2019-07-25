jest.mock("react-native-permissions", () => {
  return {
    setAuthStatus: (state: { check: string[], request: string[] }) => {
      this.state = state
      this.checkCount = 0
      this.requestCount = 0
    },
    check: () => {
      console.log("[MOCK][react-native-permissions] Check called, current auth state  : ", this.state.check[this.checkCount])
      const result = this.state.check[this.checkCount]
      this.checkCount++
      return result
    },
    request: () => {
      console.log("[MOCK][react-native-permissions] Request called, current auth state  : ", this.state.request[this.requestCount])
      const result = this.state.request[this.requestCount]
      this.requestCount++
      return result
    },
    openSettings: jest.fn(),
  }
})
