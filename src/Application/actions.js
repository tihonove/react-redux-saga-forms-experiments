import { actionSet, plainAction, namespace } from 'redux-compose/actions2'
import { invoice, goodItem, modal } from '../InvoiceEditForm/invoiceActions'

var a = actionSet(
    invoice.__definition__, 
    actionSet({
        GoodItem: namespace(actionSet({
            ModalAdd: plainAction,
            ModalEdit: plainAction,
            ModalDialog: namespace(goodItem, modal)
        }))
    }).__definition__)

console.log(a);

export default a;