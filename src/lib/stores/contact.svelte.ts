export const contactState = $state({
  visible: false,
  newsletter: false,
})

export const openContactDialog = () => {
  contactState.visible = true
}

export const closeContactDialog = () => {
  contactState.visible = false
}

export const openNewsletterDialog = () => {
  contactState.newsletter = true
}

export const closeNewsletterDialog = () => {
  contactState.newsletter = false
}