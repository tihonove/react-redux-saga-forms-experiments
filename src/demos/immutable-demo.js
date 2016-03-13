import {Set, Map, List, OrderedMap} from 'immutable'

const log = value => console.log(JSON.stringify(value.toJS(), null, 2))

function listDemo(){
    var list = List.of(Map({a: 1}), Map({a: 2}), Map({a: 3}))


    log(
        list.mergeDeep([ { 0: {b: 2} } ] )
    )    
}

function mapDemo(){
    var map = Map({b: 2, a: 1, c: 3, d: Map({ u: 1 })});
    map = map.set('1', 4)
    for(let i of map)
        console.log(i)   
    log(map) 
//    log(map.set('z', 5))
//    log(map.delete('a'))
//    log(map.update('a', x => x + 1))
//    log(map.merge({a: 5}))
//    log(map.merge({d: {z: 1}}, {c: 4}))
//    log(map.mergeDeep({d: {z: 1}}, {c: 4}))
    log(map.setIn('d', {z:1}))
}

function orderedMapDemo(){
    var map = OrderedMap({b: 2, a: 1, c: 3, d: Map({ u: 1 })});
    map = map.set('1', 4)
    console.log(map.toArray())
    //log(map.set('1', 4))
//    log(map.set('z', 5))
//    log(map.delete('a'))
//    log(map.update('a', x => x + 1))
//    log(map.merge({a: 5}))
//    log(map.merge({d: {z: 1}}, {c: 4}))
//    log(map.mergeDeep({d: {z: 1}}, {c: 4}))
//    log(map.setIn('d', {z:1}))
}

function mergeDemo() {
    var map = Map({
        number: 1,
        items1: List.of(Map({a: 1}), Map({a: 2})).toOrderedMap(),
        //items2: List.of(Map({a: 1}), Map({a: 2}))
    });
    //log(map.mergeDeep({number: 2}));
/*    log(
        map.mergeDeep( { 
            items2: [ { 0: {b: 2} } ]
        } )
    );
*/    
    log(
        map.mergeDeep( { 
            items1: [ [ "" , {b:2} ] ]
        } )
    );
/*    log(
        map.mergeDeep( { items2: [ [0, {b:2}] ] } )
    );
*/    return;
}

//listDemo();
//mapDemo();
//orderedMapDemo();
//setDemo();
mergeDemo();
