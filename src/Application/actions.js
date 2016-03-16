import { actionSet, plainAction, namespace } from 'redux-compose/actions2'
import { invoice, goodItem } from '../InvoiceEditForm/invoiceActions'
import { modal } from '../Modal/actions'

export default actionSet({
    Invoice: namespace(actionSet(
        invoice,
        actionSet({
            GoodItem: namespace(actionSet({
                ModalAdd: plainAction,
                ModalEdit: plainAction,
                ModalDialog: namespace(goodItem, modal)
            }))
        })
    ))
})
