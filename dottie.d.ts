declare module 'dottie' {
  interface Dottie {
    get(object: any, path: string | string[], defaultValue?: string): any;
    set(object: any, path: string | string[], value: any, opts?: any): void;
    exists(object: any, path: string | string[]): boolean;
    default(object: any, path: string | string[], value: any): any;
    transform(object: any, opts?: any): any;
    flatten(object: any, separator?: string): any;
    paths(object: any, prefixes?: string[]): string[];
    memoize: boolean;
  }

  var dottie: Dottie;
  export = dottie;
}
