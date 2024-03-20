
export function onWindowResize(callback: any, immediate: boolean = false) {
    window.onresize = callback
    immediate && callback()
    return () => window.onresize = null
}

export function debounce(fn: Function, wait: number = 10) {
    let timeoutId: any = null
    return (...params) => {
        if (timeoutId !== null) {
            // 存在任务
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn(...params)
            timeoutId = null
        }, wait);
    }
}



export function getElementPureWidth(el: any) {
    return Number(window.getComputedStyle(el).width.split('px')[0])
}

export function getElementPureHeight(el: any) {
    return Number(window.getComputedStyle(el).height.split('px')[0])
}