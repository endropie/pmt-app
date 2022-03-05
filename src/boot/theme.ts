import { boot } from 'quasar/wrappers';
import { colors, setCssVar } from 'quasar'

const { lighten } = colors

export const setPrimaryTheme = (newPrimaryColor: string) => {
  setCssVar('primary', newPrimaryColor)
  setCssVar('primary-light', lighten(newPrimaryColor, 20))
  setCssVar('primary-lighten', lighten(newPrimaryColor, 50))
  setCssVar('primary-dark', lighten(newPrimaryColor, -20))
  setCssVar('primary-darken', lighten(newPrimaryColor, -50))

  setCssVar('dark-page', lighten(newPrimaryColor, -95))
  setCssVar('dark', lighten(newPrimaryColor, -75))
}

export default boot(({ /* app */ }) => {

  const newLigthColor = '#567'
  setCssVar('light', newLigthColor)
  setCssVar('lighten', lighten(newLigthColor, 20))
  setCssVar('lighter', lighten(newLigthColor, 40))
  setCssVar('light-page', lighten(newLigthColor, 95))

  const primary = '#19C'
  setPrimaryTheme(primary)

});


