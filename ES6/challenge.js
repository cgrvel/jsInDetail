class Town{
    constructor(townName) {
        this.townName = townName
    }
}
class Park extends Town{
    constructor(townName, parkName, builtYear, trees, area) {
        super(townName)
        this.name = parkName
        this.builtYear =builtYear
        this.trees = trees
        this.area = area
    }
    calcTreeDensity() {
        return this.trees/this.area
    }
    calcAge() {
        return new Date().getFullYear() - this.builtYear
    }
}
class Street extends Town{
    constructor(townName, streetName, builtYear, length, size = 'normal') {
        super(townName)
        this.streetName = streetName
        this.builtYear =builtYear
        this.length = length
        this.size = size
    }
    
}

var sivaji = new Park('tanjavur', 'sivaji', 1993, 1000, 1200)
var gandiji = new Park('tanjavur', 'gandiji', 1993, 1000, 1200)
var nehruji = new Park('selem', 'nehruji', 1993, 1000, 1200)


var thalapakatti = new Street('dindukal', 'thalapakatti', 1993, 3)
var hyderabad = new Street('salem', 'hyderabad', 1993, 4, 'small')
var behrouz = new Street('salem', 'behrouz', 1993,5 ,'big')
var paradise = new Street('tanjavur', 'paradise', 1993,6, 'small')

let parks = [sivaji,gandiji,nehruji]
let streets = [thalapakatti,hyderabad,behrouz,paradise]

console.log(parks.filter(park => park.townName === 'tanjavur')
    .map(park => park.calcTreeDensity()))

console.log(parks.filter(park => park.townName === 'tanjavur')
    .reduce((a,b) => a.calcAge()+b.calcAge())/parks.filter(park => park.townName === 'tanjavur').length)

console.log(parks.filter(park => park.townName === 'tanjavur')
    .filter(park => park.trees >= 1000)
    .map(park => park.name))
console.log(streets.filter(street => street.townName === 'salem')
    .reduce((a,b) => a.length + b.length))
console.log(streets.filter(street => street.townName === 'salem')
    .reduce((a,b) => a.length + b.length)/streets.filter(street => street.townName === 'salem').length)
streets.forEach(street => {
    console.log(street.size)
})