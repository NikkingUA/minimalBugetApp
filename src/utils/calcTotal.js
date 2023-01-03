export const calcTotal = (arr) => {
    let sum = 0;
    for (let object of arr) {
        if (object.addIncome) {
            sum += parseInt(object.spendMoney);
        } else {
            sum -= parseInt(object.spendMoney);
        }
    }
    return sum;
};