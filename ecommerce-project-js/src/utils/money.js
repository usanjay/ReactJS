export function formatMoney(priceCents) {
    if(priceCents < 0) {
        priceCents = -priceCents;
        return (`-$${ (priceCents / 100).toFixed(2) }`)
    }
    return (`$${ (priceCents / 100).toFixed(2) }`)
}