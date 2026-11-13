export function disableZoom() {
  const stop = (e) => e.preventDefault()

  ;['gesturestart', 'gesturechange', 'gestureend'].forEach((type) => document.addEventListener(type, stop))


  window.addEventListener('wheel', (e) => e.ctrlKey && e.preventDefault(), { passive: false })

   window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && ['+', '=', '-', '_', '0'].includes(e.key)) e.preventDefault()
  })
}
