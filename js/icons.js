// array
const entryIcons = [{type: 'salary',icon: 'fa-money-bill'}, 
                   {type: 'loan', icon: 'fa-hand-holding-dollar'},
                    {type: 'revenue', icon: 'fa-sack-dollar'},
                    {type: 'freelance', icon: 'fa-envelope-open-dollar'},
                    {type: 'extras', icon: 'fa-face-smile-beam'},
                    {type: 'home', icon: 'fa-house'},
                    {type: 'transport', icon: 'fa-car'},
                    {type: 'food', icon: 'fa-bowl-food'},
                    {type: 'shopping', icon: 'fa-tag'},
                    {type: 'health', icon: 'fa-heart-pulse'},
                    {type: 'entertainment', icon: 'fa-champagne-glasses'},
                    {type: 'pets', icon: 'fa-dog'},
                    {type: 'travel', icon: 'fa-plane_engines'},
                    {type: 'technology', icon: 'fa-desktop'},
                    {type: 'education', icon: 'fa-user-graduate'},
                    {type: 'taxes', icon: 'fa-calculator'},
                    {type: 'taxes', icon: 'fa-calculator'},
                    {type: 'insurance', icon: 'fa-file-contract'},
                    {type: 'debtPayment', icon: 'fa-file-contract'},
                    {type: 'company', icon: 'fa-briefcase'},
                    {type: 'expense', icon: 'fa-arrow-down-left'},
                    {type: 'income', icon: 'fa-arrow-up-right'},
                ]

const iconSelector = (type, domElement) =>{
    let category = entryIcons.find(el =>{
        return el.type === type
    })
    domElement.value = category.icon
}


export {iconSelector}
