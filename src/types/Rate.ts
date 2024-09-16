export interface Rate {
    id : number,
    title : string,
    monthCost : number | 0,
    yearCost : number | 0,
    advantages : string[],
    active : boolean
}