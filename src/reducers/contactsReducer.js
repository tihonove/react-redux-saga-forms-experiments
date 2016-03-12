import reduce, { on, mergeFrom } from '../utils/reduce'

export default reduce({
    [ on('Change')]: mergeFrom(x => x.changedValues)
}, {
    firstName: '',
    lastName: '',
    email: ''
});
