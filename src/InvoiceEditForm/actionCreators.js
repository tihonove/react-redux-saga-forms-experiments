import { invoice, goodItem } from './invoiceActions'
import { modal } from '../Modal/actions'

export const invoiceEditFormActionCreators = {
    onChange: invoice.Change,
    onGoodItem: {
        change: invoice.GoodItem.Change,
        delete: invoice.GoodItem.Delete,
        add: invoice.GoodItem.Add,
    }
};

export const goodItemModalActionCreators = {
    onChange: goodItem.Change,
    onCancel: modal.Close,
    onComplete: modal.Complete,
}
