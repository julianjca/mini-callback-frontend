export const mapColorScheme = callbackResponseCode => {
  if (callbackResponseCode < 300) {
    return 'teal'
  } else if (callbackResponseCode < 400) {
    return 'yellow'
  } else if (callbackResponseCode >= 400) {
    return 'red'
  }
}
