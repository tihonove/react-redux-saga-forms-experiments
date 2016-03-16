import { actionSet, plainAction, namespace } from 'redux-compose/actions2'
import { invoice, goodItem } from '../InvoiceEditForm/invoiceActions'
import { modal } from '../Modal/actions'

var a = actionSet(
    invoice, 
    actionSet({
        GoodItem: namespace(actionSet({
            ModalAdd: plainAction,
            ModalEdit: plainAction,
            ModalDialog: namespace(goodItem, modal)
        }))
    }))

console.log(a);

export default a;