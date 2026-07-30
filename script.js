const root = document.documentElement
const cards = document.querySelectorAll('.project-card')
const finePointer = matchMedia('(pointer: fine)').matches

if (finePointer) {
    addEventListener('pointermove', (event) => {
        root.style.setProperty('--mouse-x', String(event.clientX / innerWidth - 0.5))
        root.style.setProperty('--mouse-y', String(event.clientY / innerHeight - 0.5))
    })
}

cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
        if (!finePointer) return
        const rect = card.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        card.style.setProperty('--card-rx', `${(-y * 5.5).toFixed(2)}deg`)
        card.style.setProperty('--card-ry', `${(x * 7).toFixed(2)}deg`)
    })

    card.addEventListener('pointerleave', () => {
        card.style.setProperty('--card-rx', '0deg')
        card.style.setProperty('--card-ry', '0deg')
    })
})
