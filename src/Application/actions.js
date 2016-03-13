import actions from 'redux-compose/actions'
import { invoice } from '../InvoiceEditForm/invoiceActions'

var a = actions({
    Change: true,
    GoodItem: {
        Change: true,
        Delete: true,
        Add:true,
        // ----
        ModalAdd: true,
        ModalEdit: true,

        ModalDialog: {
            Change: true,
            Close: true,
            Complete: true,
            Show: true
        }
    }
})

console.log(a);

export default a;