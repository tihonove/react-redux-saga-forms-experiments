import { actionSet, plainAction, namespace } from '../local_modules/redux-compose/actions2'
import { buildActionCreators, wrap, mergeActionCreators, isNamespace, toNamespace, bindProps } from '../local_modules/redux-compose/actions2'

// --------------------- //

var itemActions = actionSet({
    SubUpdate: plainAction,
    SubItem: namespace(actionSet({
        SubSubUpdate: plainAction,
    }))
});

var valuesActions = actionSet({
    ValuesUpdate: plainAction
});

var invoiceAction = actionSet({
    Change: plainAction,
    Update: plainAction,
    Item: namespace(itemActions),
    Item2: namespace(itemActions),
    ItemAndValues: namespace(itemActions, valuesActions)
});


describe("Actions",() => {

    it("test01", () => {

        expect(invoiceAction.Change.name).toEqual("Change")
        expect(invoiceAction.Change.fire()).toEqual({ type: "Change" })
        expect(invoiceAction.Change.fire({value: "value"})).toEqual({ type: "Change", value: "value" })

        expect(invoiceAction.Update.name).toEqual("Update")
        expect(invoiceAction.Update.fire()).toEqual({ type: "Update" })
        expect(invoiceAction.Update.fire({value: "value2"})).toEqual({ type: "Update", value: "value2" })

    })
    
    it("test02", () => {

        expect(invoiceAction.Item.name).toEqual("Item")
        expect(isNamespace(invoiceAction.Item)).toBe(true)

        expect(invoiceAction.Item.SubUpdate.name).toEqual("Item/SubUpdate")
        expect(invoiceAction.Item.SubUpdate.fire()).toEqual({ type: "Item/SubUpdate" })

        expect(invoiceAction.Item.SubItem.name).toEqual("Item/SubItem")
        expect(isNamespace(invoiceAction.Item.SubItem)).toBe(true)
        expect(invoiceAction.Item.SubItem.SubSubUpdate.fire()).toEqual({ type: "Item/SubItem/SubSubUpdate" })

        expect(invoiceAction.ItemAndValues.SubUpdate.name).toEqual("ItemAndValues/SubUpdate")
        expect(invoiceAction.ItemAndValues.ValuesUpdate.name).toEqual("ItemAndValues/ValuesUpdate")

    })

    it("connectorBuilder", () => {

        var actionCreators = buildActionCreators({
            onChange: invoiceAction.Change,
            onItemChange: invoiceAction.Item.SubUpdate,
        })

        expect(actionCreators.onChange({a: 1})).toEqual({ type: "Change", a: 1 })
        expect(actionCreators.onItemChange({a: 1})).toEqual({ type: "Item/SubUpdate", a: 1 })

        var merged = mergeActionCreators(actionCreators, buildActionCreators({onItemChange: invoiceAction.Item.SubItem.SubSubUpdate}))

        expect(merged.onItemChange({a: 1})).toEqual({ type: "Item/SubItem/SubSubUpdate", a: 1 })

        var subNamespaced = toNamespace(invoiceAction.Item, buildActionCreators({
            onChange: itemActions.SubUpdate
        }));
        expect(subNamespaced.onChange({a: 1})).toEqual({ type: "Item/SubUpdate", a: 1 })

        var lastArg = null;
        const dispatch = x => { lastArg = x }

        var wrapped = wrap(actionCreators)(dispatch);

        lastArg = null;
        wrapped.onChange({a: 1});
        expect(lastArg).toEqual({ type: "Change", a: 1 })

        lastArg = null
        var wrapped2 = wrap(actionCreators, bindProps(x => ({b: x.b})))(dispatch, {b : 2});
        wrapped2.onChange({a: 1});
        expect(lastArg).toEqual({ type: "Change", a: 1, b: 2 })
    })

});