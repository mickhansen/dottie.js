## Install
`npm install dot`

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

    Dot.get(values, 'some.nested.key'); // returns 'foobar'
    Dot.get(values, 'some.undefined.key'); // returns undefined

### Set value
Sets nested value, creates nested structure if needed

`Dot.set(values, 'some.nested.value', someValue);`

### Transform object
Transform object from keys with dot notation to nested objects

    var values = {
        'user.name': 'Mick Hansen',
        'user.email': 'mh@innofluence.com',
        'user.professional.title': 'Developer',
        'user.professional.employer': 'Innofluence'
    };
    var transformed = Dot.transform(values);

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