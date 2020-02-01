// var bill =  [124, 48, 268]
// var tip = new Array();
// var tipbill = new Array();
// function cal (bill) {
// if(bill<50)
// {
//     tip.push(bill*.2)
//     tipbill.push(bill*.2+bill)
// }
// else if(bill>50 && bill<200) {
//     tip.push(bill*.15)
//     tipbill.push(bill*.15+bill)
// }
// else {
//     tip.push(bill*.1)
//     tipbill.push(bill*.1+bill)
// }
// }
// cal(bill[0]);
// cal(bill[1]);
// cal(bill[2]);
// console.log(bill, tip, tipbill)

var mark = {
    name:"marklol",
    height:1.78,
    weight:78,
    bmiCalc:function() {
        this.bmi = this.weight/(this.height*this.height);
        return this.bmi;
    }
}



mark.bmiCalc();
console.log(mark)