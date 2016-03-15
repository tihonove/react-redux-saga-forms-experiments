import { invoice } from './invoiceActions'

export const invoiceEditFormActionCreators = {
    onChange: invoice.Change,
    onGoodItem: {
        change: invoice.GoodItem.Change,
        delete: invoice.GoodItem.Delete,
        add: invoice.GoodItem.Add,
    }
};