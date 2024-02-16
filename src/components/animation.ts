import anime from 'animejs'

const blocks = ()=>anime({
    targets:'.blocks',
    scale:['0','1'],
    opacity:['0','1'],
    easing: 'easeInOutQuad'
})

export {
    blocks
}