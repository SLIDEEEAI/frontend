export const slideDimentions = {
    width : 1920,
    height : 1080
}
export const slidePadding = 80
export const textPadding = 20

export const textGap = 60

export const getSlidePadding = () => slidePadding

export const leftReverce = (right : number, width : number) => slideDimentions.width - width - right
export const topReverce = (bottom : number, height : number) => slideDimentions.height - height - bottom

export const fullWidth = () => (slideDimentions.width - 2 * slidePadding)
export const fullHeight = () => (slideDimentions.height - 2 * slidePadding)

export const fullWidthOffset = (offset : number) => (slideDimentions.width - offset - slidePadding)
export const fullHeightOffset = (offset : number) => (slideDimentions.height - offset - slidePadding)