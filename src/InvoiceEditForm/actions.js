export const invoice = {
    Change: {
        name: "Change",
        fire: (values) => ({ ...values })
    },
    GoodItem: {
        Change: { 
            name: "GoodItem/Change",
            fire: v => ({...v})
        },        
        Delete: {
            name: "GoodItem/Delete",
            fire: v => ({...v})
        },
        Add: {
           name: "GoodItem/Add",
            fire: v => ({...v})
        },
        Edit: {
            name: "GoodItem/Edit",
            fire: v => ({...v})
        },
    }
}