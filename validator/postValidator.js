const Validator = require('validatorjs')

const rules = {
    title: 'required',
    body: 'required',
    thumbnail_image: 'required|url',
    category: 'required',
    author: 'required',
    update_date: 'required'
}

module.exports = function(data) {
    return new Validator(data, rules)
}