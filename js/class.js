class Entry {
    constructor(type, category, description, amount, date, iconCategory, iconType){
        this.type = type;
        this.category = category;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.iconCategory = iconCategory
        this.iconType = iconType
    }

    filterEntries(type, array){
        let filteredIncome = array.filter(el =>{
            return el.type.includes(type)
            })
           
            return filteredIncome
    }

    totalType(type, array){
        let filteredIncome = this.filterEntries(type, array);
        let amount = filteredIncome.map(el =>{
            return el.amount
        })
        
        let total = amount.reduce((previousValue, currentValue) =>{
            return previousValue + currentValue
        }, 0)
        return total 
    }

    totalBalance(array){
        let income =this.totalType("income", array)
        let expenses =this.totalType("expense", array)
        return income - expenses;
    }
}

export default Entry 