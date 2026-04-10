export const cookiesState = $state({
  visible: false,
})

export const openCookiesDialog = () => {
  cookiesState.visible = true
}

export const closeCookiesDialog = () => {
  cookiesState.visible = false
}

export const avertissementState = $state({
  visible: false,
})

export const openAvertissementDialog = () => {
  avertissementState.visible = true
}

export const closeAvertissementDialog = () => {
  avertissementState.visible = false
}