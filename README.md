[![Build Status](https://secure.travis-ci.org/innofluence/dottie.js.png)](http://travis-ci.org/innofluence/dottie.js)

## Install
    npm install dottie

## Usage
For detailed usage, check source or tests.

### Get value
Gets nested value, or undefined if unreachable.

    var values = {
        some: {
            nested: {
                key: 'foobar';
            }
        }
    }

    dottie.get(values, 'some.nested.key'); // returns 'foobar'
    dottie.get(values, 'some.undefined.key'); // returns undefined

### Set value
Sets nested value, creates nested structure if needed

    dottie.set(values, 'some.nested.value', someValue);

### Transform object
Transform object from keys with dottie notation to nested objects

    var values = {
        'user.name': 'Mick Hansen',
        'user.email': 'mh@innofluence.com',
        'user.professional.title': 'Developer',
        'user.professional.employer': 'Innofluence'
    };
    var transformed = dottie.transform(values);

    transforms is now equal to =
    {
        user: {
            name: 'Mick Hansen',
            email: 'mh@innofluence.com',
            professional: {
                title: 'Developer',
                employer: 'Innofluence'
            }
        }
    }