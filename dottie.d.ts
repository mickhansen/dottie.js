declare module 'dottie' {
  namespace Dottie {
    /**
     * Dottie memoization flag
     */
    export let memoizePath: boolean;

    export type DottiePath = string | string[];

    /**
     * @example:
     * {
     *  'foo.bar.baz': 'baz',
     *  'foo.baz': 'baz',
     * }
     */
    export interface FlatPaths {
      [path: string]: any;
    }

    /**
     * Check path exists in object
     *
     * @example
     * const values = {
     *  some: {
     *    key: 'foobar';
     *  },
     * }
     *
     * dottie.exists(values, 'some.key'); // true
     * dottie.exists(values, 'some.otherKey'); // false
     */
    export function exists(obj: object, path: DottiePath): boolean;

    /**
     * Gets nested value, or undefined if unreachable, or a default value if passed.
     *
     * @example
     * const values = {
     *  some: {
     *    nested: {
     *      key: 'foobar';
     *    }
     *  },
     *  'some.dot.included': {
     *    key: 'barfoo'
     *  }
     * }
     *
     * dottie.get(values, 'some.nested.key'); // 'foobar'
     * dottie.get(values, 'some.undefined.key'); // undefined
     * dottie.get(values, 'some.undefined.key', 'defaultval'); // 'defaultval'
     * dottie.get(values, ['some.dot.included', 'key']); // 'barfoo'
     */
    export function get<T>(obj: object, path: DottiePath, defaultValue: T): T;

    export interface SetOptions {
      /**
       * force overwrite defined non-object keys into objects if needed
       */
      force?: boolean;
    }
    /**
     * Sets nested value, creates nested structure if needed
     *
     * @example
     * dottie.set(values, 'some.nested.value', someValue);
     * dottie.set(values, ['some.dot.included', 'value'], someValue);
     * dottie.set(values, 'some.nested.object', someValue, { force: true });
     */
    export function set(obj: object, path: DottiePath, value: any, options?: SetOptions): void;

    /**
     * Set the default value if path does not exist
     *
     * @example
     * dottie.default({}, 'some.value', 'a'); // { some: { value: 'a' }}
     * dottie.default({ some: { value: 'a' }}, 'some.value', 'b'); // { some: { value: 'a' }}
     */
    function _default<T>(obj: object, path: DottiePath, value: any): T;
    export { _default as default };

    export interface TransformOptions {
      /**
       * Use a custom delimiter for path
       */
      delimiter?: string;
    }
    /**
     * Transform object from keys with dottie notation to nested objects
     *
     * @example
     * const values = {
     *   'user.name': 'Gummy Bear',
     *   'user.email': 'gummybear@candymountain.com',
     *   'user.professional.title': 'King',
     *   'user.professional.employer': 'Candy Mountain'
     * };
     * const transformed = dottie.transform(values);
     *
     * assert.deepEqual(transformed, {
     *   user: {
     *     name: 'Gummy Bear',
     *     email: 'gummybear@candymountain.com',
     *     professional: {
     *       title: 'King',
     *       employer: 'Candy Mountain'
     *     }
     *   }
     * });
     *
     * @example with custom delimiter
     * const values = {
     *   'user_name': 'Mick Hansen',
     *   'user_email': 'maker@mhansen.io'
     * };
     * const transformed = dottie.transform(values, { delimiter: '_' });
     *
     * assert.deepEqual(transformed, {
     *   user: {
     *     name: 'Mick Hansen',
     *     email: 'maker@mhansen.io'
     *   }
     * });
     */
    export function transform<T>(obj: FlatPaths, options?: TransformOptions): T;

    /**
     * Opposite of transform. Flattens a nested object
     *
     * @example
     * const values = {
     *   user: {
     *     name: 'Gummy Bear',
     *     email: 'gummybear@candymountain.com',
     *     professional: {
     *       title: 'King',
     *       employer: 'Candy Mountain'
     *     }
     *   }
     * };
     * const transformed = dottie.transform(values);
     *
     * assert.deepEqual(transformed, {
     *   'user.name': 'Gummy Bear',
     *   'user.email': 'gummybear@candymountain.com',
     *   'user.professional.title': 'King',
     *   'user.professional.employer': 'Candy Mountain'
     * });
     *
     * @example with custom delimiter
     * const values = {
     *   user: {
     *     name: 'Mick Hansen',
     *     email: 'maker@mhansen.io'
     *   }
     * };
     * const transformed = dottie.flatten(values, '_');
     *
     * assert.deepEqual(transformed, {
     *   'user_name': 'Mick Hansen',
     *   'user_email': 'maker@mhansen.io'
     * });
     */
    export function flatten(obj: object, delimiter?: string): FlatPaths;

    /**
     * Get paths in object
     *
     * @example
     * const object = {
     *   a: 1,
     *   b: {
     *     c: 2,
     *     d: { e: 3 }
     *   }
     * };
     *
     * dottie.paths(object); // ["a", "b.c", "b.d.e"];
     */
    export function paths(obj: object): string[];
  }

  export = Dottie;
}
