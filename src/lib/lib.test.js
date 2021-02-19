import { mapColorScheme } from './'

describe('lib', () => {
  test('mapColorScheme', () => {
    expect(mapColorScheme(200)).toEqual('teal')
    expect(mapColorScheme(300)).toEqual('yellow')
    expect(mapColorScheme(400)).toEqual('red')
  })
})
