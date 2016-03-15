import { actionSet, plainAction, namespace } from 'redux-compose/actions2'
import { invoice, goodItem } from '../InvoiceEditForm/invoiceActions'

var a = actionSet(
    invoice, 
    actionSet({
        GoodItem: namespace(actionSet({
            ModalAdd: plainAction,
            ModalEdit: plainAction,
            ModalDialog: namespace(actionSet(
                goodItem, 
                {
                    Close: plainAction,
                    Complete: plainAction,
                    Show: plainAction
                }))
        }))
    }))

console.log(a);

export default a;