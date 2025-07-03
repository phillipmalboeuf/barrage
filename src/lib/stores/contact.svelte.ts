export const contactState = $state({
  visible: false,
})

export const openContactDialog = () => {
  contactState.visible = true
}

export const closeContactDialog = () => {
  contactState.visible = false
}