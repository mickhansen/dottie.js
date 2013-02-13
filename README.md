#dot
Object traversing/manipulation util

## Install
`npm install dot`

## Get value
Gets nested value, or undefined if unreachable.
`Dot.get(object, 'some.nested.key');`

## Set value
Sets nested value, creates nested structure if needed
`Dot.set(object, 'some.nested.value', someValue);`

## Transform object
Transform object from keys with dot notation to nested objects
`object = Dot.transform(object)`