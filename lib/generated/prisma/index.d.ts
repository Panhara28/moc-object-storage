
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model PermissionModule
 * 
 */
export type PermissionModule = $Result.DefaultSelection<Prisma.$PermissionModulePayload>
/**
 * Model RolePermission
 * 
 */
export type RolePermission = $Result.DefaultSelection<Prisma.$RolePermissionPayload>
/**
 * Model Bucket
 * 
 */
export type Bucket = $Result.DefaultSelection<Prisma.$BucketPayload>
/**
 * Model Media
 * 
 */
export type Media = $Result.DefaultSelection<Prisma.$MediaPayload>
/**
 * Model MediaUpload
 * 
 */
export type MediaUpload = $Result.DefaultSelection<Prisma.$MediaUploadPayload>
/**
 * Model MediaUploadDetail
 * 
 */
export type MediaUploadDetail = $Result.DefaultSelection<Prisma.$MediaUploadDetailPayload>
/**
 * Model Space
 * 
 */
export type Space = $Result.DefaultSelection<Prisma.$SpacePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const MediaType: {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  PDF: 'PDF',
  DOCUMENT: 'DOCUMENT',
  OTHER: 'OTHER'
};

export type MediaType = (typeof MediaType)[keyof typeof MediaType]


export const Visibility: {
  AVAILABLE: 'AVAILABLE',
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  RESTRICTED: 'RESTRICTED',
  REMOVE: 'REMOVE',
  RECOVERY: 'RECOVERY',
  DRAFTED: 'DRAFTED',
  PUBLISHED: 'PUBLISHED',
  UNPUBLISHED: 'UNPUBLISHED'
};

export type Visibility = (typeof Visibility)[keyof typeof Visibility]


export const CategoryOf: {
  DEFAULT: 'DEFAULT',
  BOOK: 'BOOK',
  NEWS: 'NEWS'
};

export type CategoryOf = (typeof CategoryOf)[keyof typeof CategoryOf]


export const BucketPermission: {
  READ: 'READ',
  READ_WRITE: 'READ_WRITE',
  FULL_ACCESS: 'FULL_ACCESS'
};

export type BucketPermission = (typeof BucketPermission)[keyof typeof BucketPermission]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type MediaType = $Enums.MediaType

export const MediaType: typeof $Enums.MediaType

export type Visibility = $Enums.Visibility

export const Visibility: typeof $Enums.Visibility

export type CategoryOf = $Enums.CategoryOf

export const CategoryOf: typeof $Enums.CategoryOf

export type BucketPermission = $Enums.BucketPermission

export const BucketPermission: typeof $Enums.BucketPermission

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permissionModule`: Exposes CRUD operations for the **PermissionModule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PermissionModules
    * const permissionModules = await prisma.permissionModule.findMany()
    * ```
    */
  get permissionModule(): Prisma.PermissionModuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolePermissions
    * const rolePermissions = await prisma.rolePermission.findMany()
    * ```
    */
  get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bucket`: Exposes CRUD operations for the **Bucket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Buckets
    * const buckets = await prisma.bucket.findMany()
    * ```
    */
  get bucket(): Prisma.BucketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.media`: Exposes CRUD operations for the **Media** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Media
    * const media = await prisma.media.findMany()
    * ```
    */
  get media(): Prisma.MediaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mediaUpload`: Exposes CRUD operations for the **MediaUpload** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaUploads
    * const mediaUploads = await prisma.mediaUpload.findMany()
    * ```
    */
  get mediaUpload(): Prisma.MediaUploadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mediaUploadDetail`: Exposes CRUD operations for the **MediaUploadDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaUploadDetails
    * const mediaUploadDetails = await prisma.mediaUploadDetail.findMany()
    * ```
    */
  get mediaUploadDetail(): Prisma.MediaUploadDetailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.space`: Exposes CRUD operations for the **Space** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spaces
    * const spaces = await prisma.space.findMany()
    * ```
    */
  get space(): Prisma.SpaceDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Role: 'Role',
    PermissionModule: 'PermissionModule',
    RolePermission: 'RolePermission',
    Bucket: 'Bucket',
    Media: 'Media',
    MediaUpload: 'MediaUpload',
    MediaUploadDetail: 'MediaUploadDetail',
    Space: 'Space'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "role" | "permissionModule" | "rolePermission" | "bucket" | "media" | "mediaUpload" | "mediaUploadDetail" | "space"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      PermissionModule: {
        payload: Prisma.$PermissionModulePayload<ExtArgs>
        fields: Prisma.PermissionModuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionModuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionModuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          findFirst: {
            args: Prisma.PermissionModuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionModuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          findMany: {
            args: Prisma.PermissionModuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>[]
          }
          create: {
            args: Prisma.PermissionModuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          createMany: {
            args: Prisma.PermissionModuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PermissionModuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          update: {
            args: Prisma.PermissionModuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          deleteMany: {
            args: Prisma.PermissionModuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionModuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PermissionModuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          aggregate: {
            args: Prisma.PermissionModuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermissionModule>
          }
          groupBy: {
            args: Prisma.PermissionModuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionModuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionModuleCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionModuleCountAggregateOutputType> | number
          }
        }
      }
      RolePermission: {
        payload: Prisma.$RolePermissionPayload<ExtArgs>
        fields: Prisma.RolePermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findFirst: {
            args: Prisma.RolePermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findMany: {
            args: Prisma.RolePermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          create: {
            args: Prisma.RolePermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          createMany: {
            args: Prisma.RolePermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RolePermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          update: {
            args: Prisma.RolePermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          deleteMany: {
            args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RolePermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          aggregate: {
            args: Prisma.RolePermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRolePermission>
          }
          groupBy: {
            args: Prisma.RolePermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolePermissionCountArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionCountAggregateOutputType> | number
          }
        }
      }
      Bucket: {
        payload: Prisma.$BucketPayload<ExtArgs>
        fields: Prisma.BucketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BucketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BucketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BucketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BucketPayload>
          }
          findFirst: {
            args: Prisma.BucketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BucketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BucketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BucketPayload>
          }
          findMany: {
            args: Prisma.BucketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BucketPayload>[]
          }
          create: {
            args: Prisma.BucketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BucketPayload>
          }
          createMany: {
            args: Prisma.BucketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BucketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BucketPayload>
          }
          update: {
            args: Prisma.BucketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BucketPayload>
          }
          deleteMany: {
            args: Prisma.BucketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BucketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BucketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BucketPayload>
          }
          aggregate: {
            args: Prisma.BucketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBucket>
          }
          groupBy: {
            args: Prisma.BucketGroupByArgs<ExtArgs>
            result: $Utils.Optional<BucketGroupByOutputType>[]
          }
          count: {
            args: Prisma.BucketCountArgs<ExtArgs>
            result: $Utils.Optional<BucketCountAggregateOutputType> | number
          }
        }
      }
      Media: {
        payload: Prisma.$MediaPayload<ExtArgs>
        fields: Prisma.MediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findFirst: {
            args: Prisma.MediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findMany: {
            args: Prisma.MediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          create: {
            args: Prisma.MediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          createMany: {
            args: Prisma.MediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          update: {
            args: Prisma.MediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          deleteMany: {
            args: Prisma.MediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          aggregate: {
            args: Prisma.MediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedia>
          }
          groupBy: {
            args: Prisma.MediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaCountArgs<ExtArgs>
            result: $Utils.Optional<MediaCountAggregateOutputType> | number
          }
        }
      }
      MediaUpload: {
        payload: Prisma.$MediaUploadPayload<ExtArgs>
        fields: Prisma.MediaUploadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaUploadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaUploadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          findFirst: {
            args: Prisma.MediaUploadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaUploadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          findMany: {
            args: Prisma.MediaUploadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>[]
          }
          create: {
            args: Prisma.MediaUploadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          createMany: {
            args: Prisma.MediaUploadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MediaUploadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          update: {
            args: Prisma.MediaUploadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          deleteMany: {
            args: Prisma.MediaUploadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaUploadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MediaUploadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadPayload>
          }
          aggregate: {
            args: Prisma.MediaUploadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaUpload>
          }
          groupBy: {
            args: Prisma.MediaUploadGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaUploadGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaUploadCountArgs<ExtArgs>
            result: $Utils.Optional<MediaUploadCountAggregateOutputType> | number
          }
        }
      }
      MediaUploadDetail: {
        payload: Prisma.$MediaUploadDetailPayload<ExtArgs>
        fields: Prisma.MediaUploadDetailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaUploadDetailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadDetailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaUploadDetailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadDetailPayload>
          }
          findFirst: {
            args: Prisma.MediaUploadDetailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadDetailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaUploadDetailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadDetailPayload>
          }
          findMany: {
            args: Prisma.MediaUploadDetailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadDetailPayload>[]
          }
          create: {
            args: Prisma.MediaUploadDetailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadDetailPayload>
          }
          createMany: {
            args: Prisma.MediaUploadDetailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MediaUploadDetailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadDetailPayload>
          }
          update: {
            args: Prisma.MediaUploadDetailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadDetailPayload>
          }
          deleteMany: {
            args: Prisma.MediaUploadDetailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaUploadDetailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MediaUploadDetailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaUploadDetailPayload>
          }
          aggregate: {
            args: Prisma.MediaUploadDetailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaUploadDetail>
          }
          groupBy: {
            args: Prisma.MediaUploadDetailGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaUploadDetailGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaUploadDetailCountArgs<ExtArgs>
            result: $Utils.Optional<MediaUploadDetailCountAggregateOutputType> | number
          }
        }
      }
      Space: {
        payload: Prisma.$SpacePayload<ExtArgs>
        fields: Prisma.SpaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          findFirst: {
            args: Prisma.SpaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          findMany: {
            args: Prisma.SpaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>[]
          }
          create: {
            args: Prisma.SpaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          createMany: {
            args: Prisma.SpaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SpaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          update: {
            args: Prisma.SpaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          deleteMany: {
            args: Prisma.SpaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SpaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          aggregate: {
            args: Prisma.SpaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpace>
          }
          groupBy: {
            args: Prisma.SpaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpaceCountArgs<ExtArgs>
            result: $Utils.Optional<SpaceCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    role?: RoleOmit
    permissionModule?: PermissionModuleOmit
    rolePermission?: RolePermissionOmit
    bucket?: BucketOmit
    media?: MediaOmit
    mediaUpload?: MediaUploadOmit
    mediaUploadDetail?: MediaUploadDetailOmit
    space?: SpaceOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    mediasUploaded: number
    mediaUploads: number
    spaces: number
    buckets: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mediasUploaded?: boolean | UserCountOutputTypeCountMediasUploadedArgs
    mediaUploads?: boolean | UserCountOutputTypeCountMediaUploadsArgs
    spaces?: boolean | UserCountOutputTypeCountSpacesArgs
    buckets?: boolean | UserCountOutputTypeCountBucketsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMediasUploadedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMediaUploadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaUploadWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSpacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBucketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BucketWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    users: number
    permissions: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RoleCountOutputTypeCountUsersArgs
    permissions?: boolean | RoleCountOutputTypeCountPermissionsArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
  }


  /**
   * Count Type PermissionModuleCountOutputType
   */

  export type PermissionModuleCountOutputType = {
    roles: number
  }

  export type PermissionModuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | PermissionModuleCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes
  /**
   * PermissionModuleCountOutputType without action
   */
  export type PermissionModuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModuleCountOutputType
     */
    select?: PermissionModuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermissionModuleCountOutputType without action
   */
  export type PermissionModuleCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
  }


  /**
   * Count Type BucketCountOutputType
   */

  export type BucketCountOutputType = {
    medias: number
    spaces: number
  }

  export type BucketCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medias?: boolean | BucketCountOutputTypeCountMediasArgs
    spaces?: boolean | BucketCountOutputTypeCountSpacesArgs
  }

  // Custom InputTypes
  /**
   * BucketCountOutputType without action
   */
  export type BucketCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BucketCountOutputType
     */
    select?: BucketCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BucketCountOutputType without action
   */
  export type BucketCountOutputTypeCountMediasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
  }

  /**
   * BucketCountOutputType without action
   */
  export type BucketCountOutputTypeCountSpacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceWhereInput
  }


  /**
   * Count Type MediaCountOutputType
   */

  export type MediaCountOutputType = {
    spaces: number
    mediaDetails: number
  }

  export type MediaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spaces?: boolean | MediaCountOutputTypeCountSpacesArgs
    mediaDetails?: boolean | MediaCountOutputTypeCountMediaDetailsArgs
  }

  // Custom InputTypes
  /**
   * MediaCountOutputType without action
   */
  export type MediaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaCountOutputType
     */
    select?: MediaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MediaCountOutputType without action
   */
  export type MediaCountOutputTypeCountSpacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceWhereInput
  }

  /**
   * MediaCountOutputType without action
   */
  export type MediaCountOutputTypeCountMediaDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaUploadDetailWhereInput
  }


  /**
   * Count Type MediaUploadCountOutputType
   */

  export type MediaUploadCountOutputType = {
    details: number
  }

  export type MediaUploadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    details?: boolean | MediaUploadCountOutputTypeCountDetailsArgs
  }

  // Custom InputTypes
  /**
   * MediaUploadCountOutputType without action
   */
  export type MediaUploadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadCountOutputType
     */
    select?: MediaUploadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MediaUploadCountOutputType without action
   */
  export type MediaUploadCountOutputTypeCountDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaUploadDetailWhereInput
  }


  /**
   * Count Type SpaceCountOutputType
   */

  export type SpaceCountOutputType = {
    children: number
    uploadDetails: number
  }

  export type SpaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | SpaceCountOutputTypeCountChildrenArgs
    uploadDetails?: boolean | SpaceCountOutputTypeCountUploadDetailsArgs
  }

  // Custom InputTypes
  /**
   * SpaceCountOutputType without action
   */
  export type SpaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceCountOutputType
     */
    select?: SpaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SpaceCountOutputType without action
   */
  export type SpaceCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceWhereInput
  }

  /**
   * SpaceCountOutputType without action
   */
  export type SpaceCountOutputTypeCountUploadDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaUploadDetailWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    roleId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    roleId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    roleId: number | null
    slug: string | null
    profilePicture: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    fullNameKh: string | null
    fullNameEn: string | null
    gender: $Enums.Gender | null
    generalDepartment: string | null
    department: string | null
    office: string | null
    phoneNumber: string | null
    currentRole: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    roleId: number | null
    slug: string | null
    profilePicture: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    fullNameKh: string | null
    fullNameEn: string | null
    gender: $Enums.Gender | null
    generalDepartment: string | null
    department: string | null
    office: string | null
    phoneNumber: string | null
    currentRole: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    roleId: number
    slug: number
    profilePicture: number
    isActive: number
    createdAt: number
    updatedAt: number
    fullNameKh: number
    fullNameEn: number
    gender: number
    generalDepartment: number
    department: number
    office: number
    phoneNumber: number
    currentRole: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    roleId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    roleId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    roleId?: true
    slug?: true
    profilePicture?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    fullNameKh?: true
    fullNameEn?: true
    gender?: true
    generalDepartment?: true
    department?: true
    office?: true
    phoneNumber?: true
    currentRole?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    roleId?: true
    slug?: true
    profilePicture?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    fullNameKh?: true
    fullNameEn?: true
    gender?: true
    generalDepartment?: true
    department?: true
    office?: true
    phoneNumber?: true
    currentRole?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    roleId?: true
    slug?: true
    profilePicture?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    fullNameKh?: true
    fullNameEn?: true
    gender?: true
    generalDepartment?: true
    department?: true
    office?: true
    phoneNumber?: true
    currentRole?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string
    password: string
    roleId: number | null
    slug: string
    profilePicture: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    fullNameKh: string | null
    fullNameEn: string | null
    gender: $Enums.Gender | null
    generalDepartment: string | null
    department: string | null
    office: string | null
    phoneNumber: string | null
    currentRole: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    roleId?: boolean
    slug?: boolean
    profilePicture?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fullNameKh?: boolean
    fullNameEn?: boolean
    gender?: boolean
    generalDepartment?: boolean
    department?: boolean
    office?: boolean
    phoneNumber?: boolean
    currentRole?: boolean
    role?: boolean | User$roleArgs<ExtArgs>
    mediasUploaded?: boolean | User$mediasUploadedArgs<ExtArgs>
    mediaUploads?: boolean | User$mediaUploadsArgs<ExtArgs>
    spaces?: boolean | User$spacesArgs<ExtArgs>
    buckets?: boolean | User$bucketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    roleId?: boolean
    slug?: boolean
    profilePicture?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fullNameKh?: boolean
    fullNameEn?: boolean
    gender?: boolean
    generalDepartment?: boolean
    department?: boolean
    office?: boolean
    phoneNumber?: boolean
    currentRole?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "roleId" | "slug" | "profilePicture" | "isActive" | "createdAt" | "updatedAt" | "fullNameKh" | "fullNameEn" | "gender" | "generalDepartment" | "department" | "office" | "phoneNumber" | "currentRole", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | User$roleArgs<ExtArgs>
    mediasUploaded?: boolean | User$mediasUploadedArgs<ExtArgs>
    mediaUploads?: boolean | User$mediaUploadsArgs<ExtArgs>
    spaces?: boolean | User$spacesArgs<ExtArgs>
    buckets?: boolean | User$bucketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      role: Prisma.$RolePayload<ExtArgs> | null
      mediasUploaded: Prisma.$MediaPayload<ExtArgs>[]
      mediaUploads: Prisma.$MediaUploadPayload<ExtArgs>[]
      spaces: Prisma.$SpacePayload<ExtArgs>[]
      buckets: Prisma.$BucketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string
      password: string
      roleId: number | null
      slug: string
      profilePicture: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      fullNameKh: string | null
      fullNameEn: string | null
      gender: $Enums.Gender | null
      generalDepartment: string | null
      department: string | null
      office: string | null
      phoneNumber: string | null
      currentRole: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends User$roleArgs<ExtArgs> = {}>(args?: Subset<T, User$roleArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    mediasUploaded<T extends User$mediasUploadedArgs<ExtArgs> = {}>(args?: Subset<T, User$mediasUploadedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mediaUploads<T extends User$mediaUploadsArgs<ExtArgs> = {}>(args?: Subset<T, User$mediaUploadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    spaces<T extends User$spacesArgs<ExtArgs> = {}>(args?: Subset<T, User$spacesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    buckets<T extends User$bucketsArgs<ExtArgs> = {}>(args?: Subset<T, User$bucketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly roleId: FieldRef<"User", 'Int'>
    readonly slug: FieldRef<"User", 'String'>
    readonly profilePicture: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly fullNameKh: FieldRef<"User", 'String'>
    readonly fullNameEn: FieldRef<"User", 'String'>
    readonly gender: FieldRef<"User", 'Gender'>
    readonly generalDepartment: FieldRef<"User", 'String'>
    readonly department: FieldRef<"User", 'String'>
    readonly office: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly currentRole: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.role
   */
  export type User$roleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
  }

  /**
   * User.mediasUploaded
   */
  export type User$mediasUploadedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    cursor?: MediaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * User.mediaUploads
   */
  export type User$mediaUploadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadInclude<ExtArgs> | null
    where?: MediaUploadWhereInput
    orderBy?: MediaUploadOrderByWithRelationInput | MediaUploadOrderByWithRelationInput[]
    cursor?: MediaUploadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaUploadScalarFieldEnum | MediaUploadScalarFieldEnum[]
  }

  /**
   * User.spaces
   */
  export type User$spacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    where?: SpaceWhereInput
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    cursor?: SpaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * User.buckets
   */
  export type User$bucketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bucket
     */
    select?: BucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bucket
     */
    omit?: BucketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BucketInclude<ExtArgs> | null
    where?: BucketWhereInput
    orderBy?: BucketOrderByWithRelationInput | BucketOrderByWithRelationInput[]
    cursor?: BucketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BucketScalarFieldEnum | BucketScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleAvgAggregateOutputType = {
    id: number | null
  }

  export type RoleSumAggregateOutputType = {
    id: number | null
  }

  export type RoleMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    slug: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoleAvgAggregateInputType = {
    id?: true
  }

  export type RoleSumAggregateInputType = {
    id?: true
  }

  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _avg?: RoleAvgAggregateInputType
    _sum?: RoleSumAggregateInputType
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: number
    name: string
    description: string | null
    slug: string
    createdAt: Date
    updatedAt: Date
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Role$usersArgs<ExtArgs>
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>



  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "slug" | "createdAt" | "updatedAt", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Role$usersArgs<ExtArgs>
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      permissions: Prisma.$RolePermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      slug: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permissions<T extends Role$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Role$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'Int'>
    readonly name: FieldRef<"Role", 'String'>
    readonly description: FieldRef<"Role", 'String'>
    readonly slug: FieldRef<"Role", 'String'>
    readonly createdAt: FieldRef<"Role", 'DateTime'>
    readonly updatedAt: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Role.permissions
   */
  export type Role$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    cursor?: RolePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model PermissionModule
   */

  export type AggregatePermissionModule = {
    _count: PermissionModuleCountAggregateOutputType | null
    _avg: PermissionModuleAvgAggregateOutputType | null
    _sum: PermissionModuleSumAggregateOutputType | null
    _min: PermissionModuleMinAggregateOutputType | null
    _max: PermissionModuleMaxAggregateOutputType | null
  }

  export type PermissionModuleAvgAggregateOutputType = {
    id: number | null
  }

  export type PermissionModuleSumAggregateOutputType = {
    id: number | null
  }

  export type PermissionModuleMinAggregateOutputType = {
    id: number | null
    name: string | null
    label: string | null
    description: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionModuleMaxAggregateOutputType = {
    id: number | null
    name: string | null
    label: string | null
    description: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionModuleCountAggregateOutputType = {
    id: number
    name: number
    label: number
    description: number
    slug: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PermissionModuleAvgAggregateInputType = {
    id?: true
  }

  export type PermissionModuleSumAggregateInputType = {
    id?: true
  }

  export type PermissionModuleMinAggregateInputType = {
    id?: true
    name?: true
    label?: true
    description?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionModuleMaxAggregateInputType = {
    id?: true
    name?: true
    label?: true
    description?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionModuleCountAggregateInputType = {
    id?: true
    name?: true
    label?: true
    description?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PermissionModuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermissionModule to aggregate.
     */
    where?: PermissionModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionModules to fetch.
     */
    orderBy?: PermissionModuleOrderByWithRelationInput | PermissionModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PermissionModules
    **/
    _count?: true | PermissionModuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PermissionModuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PermissionModuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionModuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionModuleMaxAggregateInputType
  }

  export type GetPermissionModuleAggregateType<T extends PermissionModuleAggregateArgs> = {
        [P in keyof T & keyof AggregatePermissionModule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermissionModule[P]>
      : GetScalarType<T[P], AggregatePermissionModule[P]>
  }




  export type PermissionModuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionModuleWhereInput
    orderBy?: PermissionModuleOrderByWithAggregationInput | PermissionModuleOrderByWithAggregationInput[]
    by: PermissionModuleScalarFieldEnum[] | PermissionModuleScalarFieldEnum
    having?: PermissionModuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionModuleCountAggregateInputType | true
    _avg?: PermissionModuleAvgAggregateInputType
    _sum?: PermissionModuleSumAggregateInputType
    _min?: PermissionModuleMinAggregateInputType
    _max?: PermissionModuleMaxAggregateInputType
  }

  export type PermissionModuleGroupByOutputType = {
    id: number
    name: string
    label: string
    description: string | null
    slug: string
    createdAt: Date
    updatedAt: Date
    _count: PermissionModuleCountAggregateOutputType | null
    _avg: PermissionModuleAvgAggregateOutputType | null
    _sum: PermissionModuleSumAggregateOutputType | null
    _min: PermissionModuleMinAggregateOutputType | null
    _max: PermissionModuleMaxAggregateOutputType | null
  }

  type GetPermissionModuleGroupByPayload<T extends PermissionModuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionModuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionModuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionModuleGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionModuleGroupByOutputType[P]>
        }
      >
    >


  export type PermissionModuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    description?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roles?: boolean | PermissionModule$rolesArgs<ExtArgs>
    _count?: boolean | PermissionModuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permissionModule"]>



  export type PermissionModuleSelectScalar = {
    id?: boolean
    name?: boolean
    label?: boolean
    description?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PermissionModuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "label" | "description" | "slug" | "createdAt" | "updatedAt", ExtArgs["result"]["permissionModule"]>
  export type PermissionModuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | PermissionModule$rolesArgs<ExtArgs>
    _count?: boolean | PermissionModuleCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PermissionModulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PermissionModule"
    objects: {
      roles: Prisma.$RolePermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      label: string
      description: string | null
      slug: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["permissionModule"]>
    composites: {}
  }

  type PermissionModuleGetPayload<S extends boolean | null | undefined | PermissionModuleDefaultArgs> = $Result.GetResult<Prisma.$PermissionModulePayload, S>

  type PermissionModuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionModuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionModuleCountAggregateInputType | true
    }

  export interface PermissionModuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PermissionModule'], meta: { name: 'PermissionModule' } }
    /**
     * Find zero or one PermissionModule that matches the filter.
     * @param {PermissionModuleFindUniqueArgs} args - Arguments to find a PermissionModule
     * @example
     * // Get one PermissionModule
     * const permissionModule = await prisma.permissionModule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionModuleFindUniqueArgs>(args: SelectSubset<T, PermissionModuleFindUniqueArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PermissionModule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionModuleFindUniqueOrThrowArgs} args - Arguments to find a PermissionModule
     * @example
     * // Get one PermissionModule
     * const permissionModule = await prisma.permissionModule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionModuleFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionModuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermissionModule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleFindFirstArgs} args - Arguments to find a PermissionModule
     * @example
     * // Get one PermissionModule
     * const permissionModule = await prisma.permissionModule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionModuleFindFirstArgs>(args?: SelectSubset<T, PermissionModuleFindFirstArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermissionModule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleFindFirstOrThrowArgs} args - Arguments to find a PermissionModule
     * @example
     * // Get one PermissionModule
     * const permissionModule = await prisma.permissionModule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionModuleFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionModuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PermissionModules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PermissionModules
     * const permissionModules = await prisma.permissionModule.findMany()
     * 
     * // Get first 10 PermissionModules
     * const permissionModules = await prisma.permissionModule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionModuleWithIdOnly = await prisma.permissionModule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionModuleFindManyArgs>(args?: SelectSubset<T, PermissionModuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PermissionModule.
     * @param {PermissionModuleCreateArgs} args - Arguments to create a PermissionModule.
     * @example
     * // Create one PermissionModule
     * const PermissionModule = await prisma.permissionModule.create({
     *   data: {
     *     // ... data to create a PermissionModule
     *   }
     * })
     * 
     */
    create<T extends PermissionModuleCreateArgs>(args: SelectSubset<T, PermissionModuleCreateArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PermissionModules.
     * @param {PermissionModuleCreateManyArgs} args - Arguments to create many PermissionModules.
     * @example
     * // Create many PermissionModules
     * const permissionModule = await prisma.permissionModule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionModuleCreateManyArgs>(args?: SelectSubset<T, PermissionModuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PermissionModule.
     * @param {PermissionModuleDeleteArgs} args - Arguments to delete one PermissionModule.
     * @example
     * // Delete one PermissionModule
     * const PermissionModule = await prisma.permissionModule.delete({
     *   where: {
     *     // ... filter to delete one PermissionModule
     *   }
     * })
     * 
     */
    delete<T extends PermissionModuleDeleteArgs>(args: SelectSubset<T, PermissionModuleDeleteArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PermissionModule.
     * @param {PermissionModuleUpdateArgs} args - Arguments to update one PermissionModule.
     * @example
     * // Update one PermissionModule
     * const permissionModule = await prisma.permissionModule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionModuleUpdateArgs>(args: SelectSubset<T, PermissionModuleUpdateArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PermissionModules.
     * @param {PermissionModuleDeleteManyArgs} args - Arguments to filter PermissionModules to delete.
     * @example
     * // Delete a few PermissionModules
     * const { count } = await prisma.permissionModule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionModuleDeleteManyArgs>(args?: SelectSubset<T, PermissionModuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermissionModules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PermissionModules
     * const permissionModule = await prisma.permissionModule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionModuleUpdateManyArgs>(args: SelectSubset<T, PermissionModuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PermissionModule.
     * @param {PermissionModuleUpsertArgs} args - Arguments to update or create a PermissionModule.
     * @example
     * // Update or create a PermissionModule
     * const permissionModule = await prisma.permissionModule.upsert({
     *   create: {
     *     // ... data to create a PermissionModule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PermissionModule we want to update
     *   }
     * })
     */
    upsert<T extends PermissionModuleUpsertArgs>(args: SelectSubset<T, PermissionModuleUpsertArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PermissionModules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleCountArgs} args - Arguments to filter PermissionModules to count.
     * @example
     * // Count the number of PermissionModules
     * const count = await prisma.permissionModule.count({
     *   where: {
     *     // ... the filter for the PermissionModules we want to count
     *   }
     * })
    **/
    count<T extends PermissionModuleCountArgs>(
      args?: Subset<T, PermissionModuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionModuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PermissionModule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PermissionModuleAggregateArgs>(args: Subset<T, PermissionModuleAggregateArgs>): Prisma.PrismaPromise<GetPermissionModuleAggregateType<T>>

    /**
     * Group by PermissionModule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PermissionModuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionModuleGroupByArgs['orderBy'] }
        : { orderBy?: PermissionModuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PermissionModuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionModuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PermissionModule model
   */
  readonly fields: PermissionModuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PermissionModule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionModuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends PermissionModule$rolesArgs<ExtArgs> = {}>(args?: Subset<T, PermissionModule$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PermissionModule model
   */
  interface PermissionModuleFieldRefs {
    readonly id: FieldRef<"PermissionModule", 'Int'>
    readonly name: FieldRef<"PermissionModule", 'String'>
    readonly label: FieldRef<"PermissionModule", 'String'>
    readonly description: FieldRef<"PermissionModule", 'String'>
    readonly slug: FieldRef<"PermissionModule", 'String'>
    readonly createdAt: FieldRef<"PermissionModule", 'DateTime'>
    readonly updatedAt: FieldRef<"PermissionModule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PermissionModule findUnique
   */
  export type PermissionModuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter, which PermissionModule to fetch.
     */
    where: PermissionModuleWhereUniqueInput
  }

  /**
   * PermissionModule findUniqueOrThrow
   */
  export type PermissionModuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter, which PermissionModule to fetch.
     */
    where: PermissionModuleWhereUniqueInput
  }

  /**
   * PermissionModule findFirst
   */
  export type PermissionModuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter, which PermissionModule to fetch.
     */
    where?: PermissionModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionModules to fetch.
     */
    orderBy?: PermissionModuleOrderByWithRelationInput | PermissionModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermissionModules.
     */
    cursor?: PermissionModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermissionModules.
     */
    distinct?: PermissionModuleScalarFieldEnum | PermissionModuleScalarFieldEnum[]
  }

  /**
   * PermissionModule findFirstOrThrow
   */
  export type PermissionModuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter, which PermissionModule to fetch.
     */
    where?: PermissionModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionModules to fetch.
     */
    orderBy?: PermissionModuleOrderByWithRelationInput | PermissionModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermissionModules.
     */
    cursor?: PermissionModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermissionModules.
     */
    distinct?: PermissionModuleScalarFieldEnum | PermissionModuleScalarFieldEnum[]
  }

  /**
   * PermissionModule findMany
   */
  export type PermissionModuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter, which PermissionModules to fetch.
     */
    where?: PermissionModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionModules to fetch.
     */
    orderBy?: PermissionModuleOrderByWithRelationInput | PermissionModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PermissionModules.
     */
    cursor?: PermissionModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionModules.
     */
    skip?: number
    distinct?: PermissionModuleScalarFieldEnum | PermissionModuleScalarFieldEnum[]
  }

  /**
   * PermissionModule create
   */
  export type PermissionModuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * The data needed to create a PermissionModule.
     */
    data: XOR<PermissionModuleCreateInput, PermissionModuleUncheckedCreateInput>
  }

  /**
   * PermissionModule createMany
   */
  export type PermissionModuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PermissionModules.
     */
    data: PermissionModuleCreateManyInput | PermissionModuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PermissionModule update
   */
  export type PermissionModuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * The data needed to update a PermissionModule.
     */
    data: XOR<PermissionModuleUpdateInput, PermissionModuleUncheckedUpdateInput>
    /**
     * Choose, which PermissionModule to update.
     */
    where: PermissionModuleWhereUniqueInput
  }

  /**
   * PermissionModule updateMany
   */
  export type PermissionModuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PermissionModules.
     */
    data: XOR<PermissionModuleUpdateManyMutationInput, PermissionModuleUncheckedUpdateManyInput>
    /**
     * Filter which PermissionModules to update
     */
    where?: PermissionModuleWhereInput
    /**
     * Limit how many PermissionModules to update.
     */
    limit?: number
  }

  /**
   * PermissionModule upsert
   */
  export type PermissionModuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * The filter to search for the PermissionModule to update in case it exists.
     */
    where: PermissionModuleWhereUniqueInput
    /**
     * In case the PermissionModule found by the `where` argument doesn't exist, create a new PermissionModule with this data.
     */
    create: XOR<PermissionModuleCreateInput, PermissionModuleUncheckedCreateInput>
    /**
     * In case the PermissionModule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionModuleUpdateInput, PermissionModuleUncheckedUpdateInput>
  }

  /**
   * PermissionModule delete
   */
  export type PermissionModuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter which PermissionModule to delete.
     */
    where: PermissionModuleWhereUniqueInput
  }

  /**
   * PermissionModule deleteMany
   */
  export type PermissionModuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermissionModules to delete
     */
    where?: PermissionModuleWhereInput
    /**
     * Limit how many PermissionModules to delete.
     */
    limit?: number
  }

  /**
   * PermissionModule.roles
   */
  export type PermissionModule$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    cursor?: RolePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * PermissionModule without action
   */
  export type PermissionModuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
  }


  /**
   * Model RolePermission
   */

  export type AggregateRolePermission = {
    _count: RolePermissionCountAggregateOutputType | null
    _avg: RolePermissionAvgAggregateOutputType | null
    _sum: RolePermissionSumAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  export type RolePermissionAvgAggregateOutputType = {
    roleId: number | null
    moduleId: number | null
  }

  export type RolePermissionSumAggregateOutputType = {
    roleId: number | null
    moduleId: number | null
  }

  export type RolePermissionMinAggregateOutputType = {
    roleId: number | null
    moduleId: number | null
    create: boolean | null
    read: boolean | null
    update: boolean | null
    delete: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
  }

  export type RolePermissionMaxAggregateOutputType = {
    roleId: number | null
    moduleId: number | null
    create: boolean | null
    read: boolean | null
    update: boolean | null
    delete: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
  }

  export type RolePermissionCountAggregateOutputType = {
    roleId: number
    moduleId: number
    create: number
    read: number
    update: number
    delete: number
    createdAt: number
    updatedAt: number
    slug: number
    _all: number
  }


  export type RolePermissionAvgAggregateInputType = {
    roleId?: true
    moduleId?: true
  }

  export type RolePermissionSumAggregateInputType = {
    roleId?: true
    moduleId?: true
  }

  export type RolePermissionMinAggregateInputType = {
    roleId?: true
    moduleId?: true
    create?: true
    read?: true
    update?: true
    delete?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
  }

  export type RolePermissionMaxAggregateInputType = {
    roleId?: true
    moduleId?: true
    create?: true
    read?: true
    update?: true
    delete?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
  }

  export type RolePermissionCountAggregateInputType = {
    roleId?: true
    moduleId?: true
    create?: true
    read?: true
    update?: true
    delete?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
    _all?: true
  }

  export type RolePermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermission to aggregate.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RolePermissions
    **/
    _count?: true | RolePermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RolePermissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RolePermissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolePermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolePermissionMaxAggregateInputType
  }

  export type GetRolePermissionAggregateType<T extends RolePermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateRolePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRolePermission[P]>
      : GetScalarType<T[P], AggregateRolePermission[P]>
  }




  export type RolePermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithAggregationInput | RolePermissionOrderByWithAggregationInput[]
    by: RolePermissionScalarFieldEnum[] | RolePermissionScalarFieldEnum
    having?: RolePermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolePermissionCountAggregateInputType | true
    _avg?: RolePermissionAvgAggregateInputType
    _sum?: RolePermissionSumAggregateInputType
    _min?: RolePermissionMinAggregateInputType
    _max?: RolePermissionMaxAggregateInputType
  }

  export type RolePermissionGroupByOutputType = {
    roleId: number
    moduleId: number
    create: boolean
    read: boolean
    update: boolean
    delete: boolean
    createdAt: Date
    updatedAt: Date
    slug: string
    _count: RolePermissionCountAggregateOutputType | null
    _avg: RolePermissionAvgAggregateOutputType | null
    _sum: RolePermissionSumAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  type GetRolePermissionGroupByPayload<T extends RolePermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolePermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolePermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
            : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
        }
      >
    >


  export type RolePermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roleId?: boolean
    moduleId?: boolean
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    module?: boolean | PermissionModuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermission"]>



  export type RolePermissionSelectScalar = {
    roleId?: boolean
    moduleId?: boolean
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
  }

  export type RolePermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"roleId" | "moduleId" | "create" | "read" | "update" | "delete" | "createdAt" | "updatedAt" | "slug", ExtArgs["result"]["rolePermission"]>
  export type RolePermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    module?: boolean | PermissionModuleDefaultArgs<ExtArgs>
  }

  export type $RolePermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RolePermission"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      module: Prisma.$PermissionModulePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      roleId: number
      moduleId: number
      create: boolean
      read: boolean
      update: boolean
      delete: boolean
      createdAt: Date
      updatedAt: Date
      slug: string
    }, ExtArgs["result"]["rolePermission"]>
    composites: {}
  }

  type RolePermissionGetPayload<S extends boolean | null | undefined | RolePermissionDefaultArgs> = $Result.GetResult<Prisma.$RolePermissionPayload, S>

  type RolePermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolePermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolePermissionCountAggregateInputType | true
    }

  export interface RolePermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RolePermission'], meta: { name: 'RolePermission' } }
    /**
     * Find zero or one RolePermission that matches the filter.
     * @param {RolePermissionFindUniqueArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolePermissionFindUniqueArgs>(args: SelectSubset<T, RolePermissionFindUniqueArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RolePermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolePermissionFindUniqueOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolePermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, RolePermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolePermissionFindFirstArgs>(args?: SelectSubset<T, RolePermissionFindFirstArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolePermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, RolePermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RolePermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany()
     * 
     * // Get first 10 RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany({ take: 10 })
     * 
     * // Only select the `roleId`
     * const rolePermissionWithRoleIdOnly = await prisma.rolePermission.findMany({ select: { roleId: true } })
     * 
     */
    findMany<T extends RolePermissionFindManyArgs>(args?: SelectSubset<T, RolePermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RolePermission.
     * @param {RolePermissionCreateArgs} args - Arguments to create a RolePermission.
     * @example
     * // Create one RolePermission
     * const RolePermission = await prisma.rolePermission.create({
     *   data: {
     *     // ... data to create a RolePermission
     *   }
     * })
     * 
     */
    create<T extends RolePermissionCreateArgs>(args: SelectSubset<T, RolePermissionCreateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RolePermissions.
     * @param {RolePermissionCreateManyArgs} args - Arguments to create many RolePermissions.
     * @example
     * // Create many RolePermissions
     * const rolePermission = await prisma.rolePermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolePermissionCreateManyArgs>(args?: SelectSubset<T, RolePermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RolePermission.
     * @param {RolePermissionDeleteArgs} args - Arguments to delete one RolePermission.
     * @example
     * // Delete one RolePermission
     * const RolePermission = await prisma.rolePermission.delete({
     *   where: {
     *     // ... filter to delete one RolePermission
     *   }
     * })
     * 
     */
    delete<T extends RolePermissionDeleteArgs>(args: SelectSubset<T, RolePermissionDeleteArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RolePermission.
     * @param {RolePermissionUpdateArgs} args - Arguments to update one RolePermission.
     * @example
     * // Update one RolePermission
     * const rolePermission = await prisma.rolePermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolePermissionUpdateArgs>(args: SelectSubset<T, RolePermissionUpdateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RolePermissions.
     * @param {RolePermissionDeleteManyArgs} args - Arguments to filter RolePermissions to delete.
     * @example
     * // Delete a few RolePermissions
     * const { count } = await prisma.rolePermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolePermissionDeleteManyArgs>(args?: SelectSubset<T, RolePermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RolePermissions
     * const rolePermission = await prisma.rolePermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolePermissionUpdateManyArgs>(args: SelectSubset<T, RolePermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RolePermission.
     * @param {RolePermissionUpsertArgs} args - Arguments to update or create a RolePermission.
     * @example
     * // Update or create a RolePermission
     * const rolePermission = await prisma.rolePermission.upsert({
     *   create: {
     *     // ... data to create a RolePermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RolePermission we want to update
     *   }
     * })
     */
    upsert<T extends RolePermissionUpsertArgs>(args: SelectSubset<T, RolePermissionUpsertArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionCountArgs} args - Arguments to filter RolePermissions to count.
     * @example
     * // Count the number of RolePermissions
     * const count = await prisma.rolePermission.count({
     *   where: {
     *     // ... the filter for the RolePermissions we want to count
     *   }
     * })
    **/
    count<T extends RolePermissionCountArgs>(
      args?: Subset<T, RolePermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolePermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolePermissionAggregateArgs>(args: Subset<T, RolePermissionAggregateArgs>): Prisma.PrismaPromise<GetRolePermissionAggregateType<T>>

    /**
     * Group by RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolePermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolePermissionGroupByArgs['orderBy'] }
        : { orderBy?: RolePermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolePermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolePermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RolePermission model
   */
  readonly fields: RolePermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RolePermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolePermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    module<T extends PermissionModuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PermissionModuleDefaultArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RolePermission model
   */
  interface RolePermissionFieldRefs {
    readonly roleId: FieldRef<"RolePermission", 'Int'>
    readonly moduleId: FieldRef<"RolePermission", 'Int'>
    readonly create: FieldRef<"RolePermission", 'Boolean'>
    readonly read: FieldRef<"RolePermission", 'Boolean'>
    readonly update: FieldRef<"RolePermission", 'Boolean'>
    readonly delete: FieldRef<"RolePermission", 'Boolean'>
    readonly createdAt: FieldRef<"RolePermission", 'DateTime'>
    readonly updatedAt: FieldRef<"RolePermission", 'DateTime'>
    readonly slug: FieldRef<"RolePermission", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RolePermission findUnique
   */
  export type RolePermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findUniqueOrThrow
   */
  export type RolePermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findFirst
   */
  export type RolePermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission findFirstOrThrow
   */
  export type RolePermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission findMany
   */
  export type RolePermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermissions to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission create
   */
  export type RolePermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a RolePermission.
     */
    data: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
  }

  /**
   * RolePermission createMany
   */
  export type RolePermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RolePermissions.
     */
    data: RolePermissionCreateManyInput | RolePermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RolePermission update
   */
  export type RolePermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a RolePermission.
     */
    data: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
    /**
     * Choose, which RolePermission to update.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission updateMany
   */
  export type RolePermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RolePermissions.
     */
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissions to update
     */
    where?: RolePermissionWhereInput
    /**
     * Limit how many RolePermissions to update.
     */
    limit?: number
  }

  /**
   * RolePermission upsert
   */
  export type RolePermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the RolePermission to update in case it exists.
     */
    where: RolePermissionWhereUniqueInput
    /**
     * In case the RolePermission found by the `where` argument doesn't exist, create a new RolePermission with this data.
     */
    create: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
    /**
     * In case the RolePermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
  }

  /**
   * RolePermission delete
   */
  export type RolePermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter which RolePermission to delete.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission deleteMany
   */
  export type RolePermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermissions to delete
     */
    where?: RolePermissionWhereInput
    /**
     * Limit how many RolePermissions to delete.
     */
    limit?: number
  }

  /**
   * RolePermission without action
   */
  export type RolePermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
  }


  /**
   * Model Bucket
   */

  export type AggregateBucket = {
    _count: BucketCountAggregateOutputType | null
    _avg: BucketAvgAggregateOutputType | null
    _sum: BucketSumAggregateOutputType | null
    _min: BucketMinAggregateOutputType | null
    _max: BucketMaxAggregateOutputType | null
  }

  export type BucketAvgAggregateOutputType = {
    id: number | null
    createdById: number | null
  }

  export type BucketSumAggregateOutputType = {
    id: number | null
    createdById: number | null
  }

  export type BucketMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    createdById: number | null
    accessKeyName: string | null
    accessKeyId: string | null
    secretAccessKey: string | null
    permission: $Enums.BucketPermission | null
    isAvailable: $Enums.Visibility | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BucketMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    createdById: number | null
    accessKeyName: string | null
    accessKeyId: string | null
    secretAccessKey: string | null
    permission: $Enums.BucketPermission | null
    isAvailable: $Enums.Visibility | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BucketCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    createdById: number
    accessKeyName: number
    accessKeyId: number
    secretAccessKey: number
    permission: number
    isAvailable: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BucketAvgAggregateInputType = {
    id?: true
    createdById?: true
  }

  export type BucketSumAggregateInputType = {
    id?: true
    createdById?: true
  }

  export type BucketMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    createdById?: true
    accessKeyName?: true
    accessKeyId?: true
    secretAccessKey?: true
    permission?: true
    isAvailable?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BucketMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    createdById?: true
    accessKeyName?: true
    accessKeyId?: true
    secretAccessKey?: true
    permission?: true
    isAvailable?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BucketCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    createdById?: true
    accessKeyName?: true
    accessKeyId?: true
    secretAccessKey?: true
    permission?: true
    isAvailable?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BucketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bucket to aggregate.
     */
    where?: BucketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buckets to fetch.
     */
    orderBy?: BucketOrderByWithRelationInput | BucketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BucketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buckets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buckets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Buckets
    **/
    _count?: true | BucketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BucketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BucketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BucketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BucketMaxAggregateInputType
  }

  export type GetBucketAggregateType<T extends BucketAggregateArgs> = {
        [P in keyof T & keyof AggregateBucket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBucket[P]>
      : GetScalarType<T[P], AggregateBucket[P]>
  }




  export type BucketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BucketWhereInput
    orderBy?: BucketOrderByWithAggregationInput | BucketOrderByWithAggregationInput[]
    by: BucketScalarFieldEnum[] | BucketScalarFieldEnum
    having?: BucketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BucketCountAggregateInputType | true
    _avg?: BucketAvgAggregateInputType
    _sum?: BucketSumAggregateInputType
    _min?: BucketMinAggregateInputType
    _max?: BucketMaxAggregateInputType
  }

  export type BucketGroupByOutputType = {
    id: number
    name: string
    slug: string
    createdById: number
    accessKeyName: string
    accessKeyId: string
    secretAccessKey: string
    permission: $Enums.BucketPermission
    isAvailable: $Enums.Visibility
    createdAt: Date
    updatedAt: Date
    _count: BucketCountAggregateOutputType | null
    _avg: BucketAvgAggregateOutputType | null
    _sum: BucketSumAggregateOutputType | null
    _min: BucketMinAggregateOutputType | null
    _max: BucketMaxAggregateOutputType | null
  }

  type GetBucketGroupByPayload<T extends BucketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BucketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BucketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BucketGroupByOutputType[P]>
            : GetScalarType<T[P], BucketGroupByOutputType[P]>
        }
      >
    >


  export type BucketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    createdById?: boolean
    accessKeyName?: boolean
    accessKeyId?: boolean
    secretAccessKey?: boolean
    permission?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    medias?: boolean | Bucket$mediasArgs<ExtArgs>
    spaces?: boolean | Bucket$spacesArgs<ExtArgs>
    _count?: boolean | BucketCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bucket"]>



  export type BucketSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    createdById?: boolean
    accessKeyName?: boolean
    accessKeyId?: boolean
    secretAccessKey?: boolean
    permission?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BucketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "createdById" | "accessKeyName" | "accessKeyId" | "secretAccessKey" | "permission" | "isAvailable" | "createdAt" | "updatedAt", ExtArgs["result"]["bucket"]>
  export type BucketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    medias?: boolean | Bucket$mediasArgs<ExtArgs>
    spaces?: boolean | Bucket$spacesArgs<ExtArgs>
    _count?: boolean | BucketCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BucketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bucket"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      medias: Prisma.$MediaPayload<ExtArgs>[]
      spaces: Prisma.$SpacePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      createdById: number
      accessKeyName: string
      accessKeyId: string
      secretAccessKey: string
      permission: $Enums.BucketPermission
      isAvailable: $Enums.Visibility
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bucket"]>
    composites: {}
  }

  type BucketGetPayload<S extends boolean | null | undefined | BucketDefaultArgs> = $Result.GetResult<Prisma.$BucketPayload, S>

  type BucketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BucketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BucketCountAggregateInputType | true
    }

  export interface BucketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bucket'], meta: { name: 'Bucket' } }
    /**
     * Find zero or one Bucket that matches the filter.
     * @param {BucketFindUniqueArgs} args - Arguments to find a Bucket
     * @example
     * // Get one Bucket
     * const bucket = await prisma.bucket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BucketFindUniqueArgs>(args: SelectSubset<T, BucketFindUniqueArgs<ExtArgs>>): Prisma__BucketClient<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bucket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BucketFindUniqueOrThrowArgs} args - Arguments to find a Bucket
     * @example
     * // Get one Bucket
     * const bucket = await prisma.bucket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BucketFindUniqueOrThrowArgs>(args: SelectSubset<T, BucketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BucketClient<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bucket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BucketFindFirstArgs} args - Arguments to find a Bucket
     * @example
     * // Get one Bucket
     * const bucket = await prisma.bucket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BucketFindFirstArgs>(args?: SelectSubset<T, BucketFindFirstArgs<ExtArgs>>): Prisma__BucketClient<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bucket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BucketFindFirstOrThrowArgs} args - Arguments to find a Bucket
     * @example
     * // Get one Bucket
     * const bucket = await prisma.bucket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BucketFindFirstOrThrowArgs>(args?: SelectSubset<T, BucketFindFirstOrThrowArgs<ExtArgs>>): Prisma__BucketClient<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Buckets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BucketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Buckets
     * const buckets = await prisma.bucket.findMany()
     * 
     * // Get first 10 Buckets
     * const buckets = await prisma.bucket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bucketWithIdOnly = await prisma.bucket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BucketFindManyArgs>(args?: SelectSubset<T, BucketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bucket.
     * @param {BucketCreateArgs} args - Arguments to create a Bucket.
     * @example
     * // Create one Bucket
     * const Bucket = await prisma.bucket.create({
     *   data: {
     *     // ... data to create a Bucket
     *   }
     * })
     * 
     */
    create<T extends BucketCreateArgs>(args: SelectSubset<T, BucketCreateArgs<ExtArgs>>): Prisma__BucketClient<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Buckets.
     * @param {BucketCreateManyArgs} args - Arguments to create many Buckets.
     * @example
     * // Create many Buckets
     * const bucket = await prisma.bucket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BucketCreateManyArgs>(args?: SelectSubset<T, BucketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Bucket.
     * @param {BucketDeleteArgs} args - Arguments to delete one Bucket.
     * @example
     * // Delete one Bucket
     * const Bucket = await prisma.bucket.delete({
     *   where: {
     *     // ... filter to delete one Bucket
     *   }
     * })
     * 
     */
    delete<T extends BucketDeleteArgs>(args: SelectSubset<T, BucketDeleteArgs<ExtArgs>>): Prisma__BucketClient<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bucket.
     * @param {BucketUpdateArgs} args - Arguments to update one Bucket.
     * @example
     * // Update one Bucket
     * const bucket = await prisma.bucket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BucketUpdateArgs>(args: SelectSubset<T, BucketUpdateArgs<ExtArgs>>): Prisma__BucketClient<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Buckets.
     * @param {BucketDeleteManyArgs} args - Arguments to filter Buckets to delete.
     * @example
     * // Delete a few Buckets
     * const { count } = await prisma.bucket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BucketDeleteManyArgs>(args?: SelectSubset<T, BucketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buckets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BucketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Buckets
     * const bucket = await prisma.bucket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BucketUpdateManyArgs>(args: SelectSubset<T, BucketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bucket.
     * @param {BucketUpsertArgs} args - Arguments to update or create a Bucket.
     * @example
     * // Update or create a Bucket
     * const bucket = await prisma.bucket.upsert({
     *   create: {
     *     // ... data to create a Bucket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bucket we want to update
     *   }
     * })
     */
    upsert<T extends BucketUpsertArgs>(args: SelectSubset<T, BucketUpsertArgs<ExtArgs>>): Prisma__BucketClient<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Buckets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BucketCountArgs} args - Arguments to filter Buckets to count.
     * @example
     * // Count the number of Buckets
     * const count = await prisma.bucket.count({
     *   where: {
     *     // ... the filter for the Buckets we want to count
     *   }
     * })
    **/
    count<T extends BucketCountArgs>(
      args?: Subset<T, BucketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BucketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bucket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BucketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BucketAggregateArgs>(args: Subset<T, BucketAggregateArgs>): Prisma.PrismaPromise<GetBucketAggregateType<T>>

    /**
     * Group by Bucket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BucketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BucketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BucketGroupByArgs['orderBy'] }
        : { orderBy?: BucketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BucketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBucketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bucket model
   */
  readonly fields: BucketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bucket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BucketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    medias<T extends Bucket$mediasArgs<ExtArgs> = {}>(args?: Subset<T, Bucket$mediasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    spaces<T extends Bucket$spacesArgs<ExtArgs> = {}>(args?: Subset<T, Bucket$spacesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bucket model
   */
  interface BucketFieldRefs {
    readonly id: FieldRef<"Bucket", 'Int'>
    readonly name: FieldRef<"Bucket", 'String'>
    readonly slug: FieldRef<"Bucket", 'String'>
    readonly createdById: FieldRef<"Bucket", 'Int'>
    readonly accessKeyName: FieldRef<"Bucket", 'String'>
    readonly accessKeyId: FieldRef<"Bucket", 'String'>
    readonly secretAccessKey: FieldRef<"Bucket", 'String'>
    readonly permission: FieldRef<"Bucket", 'BucketPermission'>
    readonly isAvailable: FieldRef<"Bucket", 'Visibility'>
    readonly createdAt: FieldRef<"Bucket", 'DateTime'>
    readonly updatedAt: FieldRef<"Bucket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bucket findUnique
   */
  export type BucketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bucket
     */
    select?: BucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bucket
     */
    omit?: BucketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BucketInclude<ExtArgs> | null
    /**
     * Filter, which Bucket to fetch.
     */
    where: BucketWhereUniqueInput
  }

  /**
   * Bucket findUniqueOrThrow
   */
  export type BucketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bucket
     */
    select?: BucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bucket
     */
    omit?: BucketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BucketInclude<ExtArgs> | null
    /**
     * Filter, which Bucket to fetch.
     */
    where: BucketWhereUniqueInput
  }

  /**
   * Bucket findFirst
   */
  export type BucketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bucket
     */
    select?: BucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bucket
     */
    omit?: BucketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BucketInclude<ExtArgs> | null
    /**
     * Filter, which Bucket to fetch.
     */
    where?: BucketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buckets to fetch.
     */
    orderBy?: BucketOrderByWithRelationInput | BucketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buckets.
     */
    cursor?: BucketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buckets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buckets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buckets.
     */
    distinct?: BucketScalarFieldEnum | BucketScalarFieldEnum[]
  }

  /**
   * Bucket findFirstOrThrow
   */
  export type BucketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bucket
     */
    select?: BucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bucket
     */
    omit?: BucketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BucketInclude<ExtArgs> | null
    /**
     * Filter, which Bucket to fetch.
     */
    where?: BucketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buckets to fetch.
     */
    orderBy?: BucketOrderByWithRelationInput | BucketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buckets.
     */
    cursor?: BucketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buckets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buckets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buckets.
     */
    distinct?: BucketScalarFieldEnum | BucketScalarFieldEnum[]
  }

  /**
   * Bucket findMany
   */
  export type BucketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bucket
     */
    select?: BucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bucket
     */
    omit?: BucketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BucketInclude<ExtArgs> | null
    /**
     * Filter, which Buckets to fetch.
     */
    where?: BucketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buckets to fetch.
     */
    orderBy?: BucketOrderByWithRelationInput | BucketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Buckets.
     */
    cursor?: BucketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buckets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buckets.
     */
    skip?: number
    distinct?: BucketScalarFieldEnum | BucketScalarFieldEnum[]
  }

  /**
   * Bucket create
   */
  export type BucketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bucket
     */
    select?: BucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bucket
     */
    omit?: BucketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BucketInclude<ExtArgs> | null
    /**
     * The data needed to create a Bucket.
     */
    data: XOR<BucketCreateInput, BucketUncheckedCreateInput>
  }

  /**
   * Bucket createMany
   */
  export type BucketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Buckets.
     */
    data: BucketCreateManyInput | BucketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bucket update
   */
  export type BucketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bucket
     */
    select?: BucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bucket
     */
    omit?: BucketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BucketInclude<ExtArgs> | null
    /**
     * The data needed to update a Bucket.
     */
    data: XOR<BucketUpdateInput, BucketUncheckedUpdateInput>
    /**
     * Choose, which Bucket to update.
     */
    where: BucketWhereUniqueInput
  }

  /**
   * Bucket updateMany
   */
  export type BucketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Buckets.
     */
    data: XOR<BucketUpdateManyMutationInput, BucketUncheckedUpdateManyInput>
    /**
     * Filter which Buckets to update
     */
    where?: BucketWhereInput
    /**
     * Limit how many Buckets to update.
     */
    limit?: number
  }

  /**
   * Bucket upsert
   */
  export type BucketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bucket
     */
    select?: BucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bucket
     */
    omit?: BucketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BucketInclude<ExtArgs> | null
    /**
     * The filter to search for the Bucket to update in case it exists.
     */
    where: BucketWhereUniqueInput
    /**
     * In case the Bucket found by the `where` argument doesn't exist, create a new Bucket with this data.
     */
    create: XOR<BucketCreateInput, BucketUncheckedCreateInput>
    /**
     * In case the Bucket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BucketUpdateInput, BucketUncheckedUpdateInput>
  }

  /**
   * Bucket delete
   */
  export type BucketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bucket
     */
    select?: BucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bucket
     */
    omit?: BucketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BucketInclude<ExtArgs> | null
    /**
     * Filter which Bucket to delete.
     */
    where: BucketWhereUniqueInput
  }

  /**
   * Bucket deleteMany
   */
  export type BucketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Buckets to delete
     */
    where?: BucketWhereInput
    /**
     * Limit how many Buckets to delete.
     */
    limit?: number
  }

  /**
   * Bucket.medias
   */
  export type Bucket$mediasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    cursor?: MediaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Bucket.spaces
   */
  export type Bucket$spacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    where?: SpaceWhereInput
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    cursor?: SpaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Bucket without action
   */
  export type BucketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bucket
     */
    select?: BucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bucket
     */
    omit?: BucketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BucketInclude<ExtArgs> | null
  }


  /**
   * Model Media
   */

  export type AggregateMedia = {
    _count: MediaCountAggregateOutputType | null
    _avg: MediaAvgAggregateOutputType | null
    _sum: MediaSumAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  export type MediaAvgAggregateOutputType = {
    id: number | null
    bucketId: number | null
    size: number | null
    uploadedById: number | null
    width: number | null
    height: number | null
  }

  export type MediaSumAggregateOutputType = {
    id: number | null
    bucketId: number | null
    size: number | null
    uploadedById: number | null
    width: number | null
    height: number | null
  }

  export type MediaMinAggregateOutputType = {
    id: number | null
    slug: string | null
    filename: string | null
    storedFilename: string | null
    url: string | null
    bucketId: number | null
    path: string | null
    fileType: $Enums.MediaType | null
    mimetype: string | null
    extension: string | null
    size: number | null
    title: string | null
    altText: string | null
    description: string | null
    uploadedById: number | null
    isVisibility: $Enums.Visibility | null
    isAccessible: $Enums.Visibility | null
    width: number | null
    height: number | null
    uploadedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MediaMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    filename: string | null
    storedFilename: string | null
    url: string | null
    bucketId: number | null
    path: string | null
    fileType: $Enums.MediaType | null
    mimetype: string | null
    extension: string | null
    size: number | null
    title: string | null
    altText: string | null
    description: string | null
    uploadedById: number | null
    isVisibility: $Enums.Visibility | null
    isAccessible: $Enums.Visibility | null
    width: number | null
    height: number | null
    uploadedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MediaCountAggregateOutputType = {
    id: number
    slug: number
    filename: number
    storedFilename: number
    url: number
    bucketId: number
    path: number
    fileType: number
    mimetype: number
    extension: number
    size: number
    title: number
    altText: number
    description: number
    uploadedById: number
    isVisibility: number
    isAccessible: number
    width: number
    height: number
    uploadedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MediaAvgAggregateInputType = {
    id?: true
    bucketId?: true
    size?: true
    uploadedById?: true
    width?: true
    height?: true
  }

  export type MediaSumAggregateInputType = {
    id?: true
    bucketId?: true
    size?: true
    uploadedById?: true
    width?: true
    height?: true
  }

  export type MediaMinAggregateInputType = {
    id?: true
    slug?: true
    filename?: true
    storedFilename?: true
    url?: true
    bucketId?: true
    path?: true
    fileType?: true
    mimetype?: true
    extension?: true
    size?: true
    title?: true
    altText?: true
    description?: true
    uploadedById?: true
    isVisibility?: true
    isAccessible?: true
    width?: true
    height?: true
    uploadedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MediaMaxAggregateInputType = {
    id?: true
    slug?: true
    filename?: true
    storedFilename?: true
    url?: true
    bucketId?: true
    path?: true
    fileType?: true
    mimetype?: true
    extension?: true
    size?: true
    title?: true
    altText?: true
    description?: true
    uploadedById?: true
    isVisibility?: true
    isAccessible?: true
    width?: true
    height?: true
    uploadedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MediaCountAggregateInputType = {
    id?: true
    slug?: true
    filename?: true
    storedFilename?: true
    url?: true
    bucketId?: true
    path?: true
    fileType?: true
    mimetype?: true
    extension?: true
    size?: true
    title?: true
    altText?: true
    description?: true
    uploadedById?: true
    isVisibility?: true
    isAccessible?: true
    width?: true
    height?: true
    uploadedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to aggregate.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Media
    **/
    _count?: true | MediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaMaxAggregateInputType
  }

  export type GetMediaAggregateType<T extends MediaAggregateArgs> = {
        [P in keyof T & keyof AggregateMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedia[P]>
      : GetScalarType<T[P], AggregateMedia[P]>
  }




  export type MediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithAggregationInput | MediaOrderByWithAggregationInput[]
    by: MediaScalarFieldEnum[] | MediaScalarFieldEnum
    having?: MediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaCountAggregateInputType | true
    _avg?: MediaAvgAggregateInputType
    _sum?: MediaSumAggregateInputType
    _min?: MediaMinAggregateInputType
    _max?: MediaMaxAggregateInputType
  }

  export type MediaGroupByOutputType = {
    id: number
    slug: string
    filename: string
    storedFilename: string
    url: string
    bucketId: number
    path: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title: string | null
    altText: string | null
    description: string | null
    uploadedById: number
    isVisibility: $Enums.Visibility
    isAccessible: $Enums.Visibility
    width: number | null
    height: number | null
    uploadedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: MediaCountAggregateOutputType | null
    _avg: MediaAvgAggregateOutputType | null
    _sum: MediaSumAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  type GetMediaGroupByPayload<T extends MediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaGroupByOutputType[P]>
            : GetScalarType<T[P], MediaGroupByOutputType[P]>
        }
      >
    >


  export type MediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    filename?: boolean
    storedFilename?: boolean
    url?: boolean
    bucketId?: boolean
    path?: boolean
    fileType?: boolean
    mimetype?: boolean
    extension?: boolean
    size?: boolean
    title?: boolean
    altText?: boolean
    description?: boolean
    uploadedById?: boolean
    isVisibility?: boolean
    isAccessible?: boolean
    width?: boolean
    height?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bucket?: boolean | BucketDefaultArgs<ExtArgs>
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
    spaces?: boolean | Media$spacesArgs<ExtArgs>
    mediaDetails?: boolean | Media$mediaDetailsArgs<ExtArgs>
    _count?: boolean | MediaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>



  export type MediaSelectScalar = {
    id?: boolean
    slug?: boolean
    filename?: boolean
    storedFilename?: boolean
    url?: boolean
    bucketId?: boolean
    path?: boolean
    fileType?: boolean
    mimetype?: boolean
    extension?: boolean
    size?: boolean
    title?: boolean
    altText?: boolean
    description?: boolean
    uploadedById?: boolean
    isVisibility?: boolean
    isAccessible?: boolean
    width?: boolean
    height?: boolean
    uploadedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MediaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "filename" | "storedFilename" | "url" | "bucketId" | "path" | "fileType" | "mimetype" | "extension" | "size" | "title" | "altText" | "description" | "uploadedById" | "isVisibility" | "isAccessible" | "width" | "height" | "uploadedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["media"]>
  export type MediaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bucket?: boolean | BucketDefaultArgs<ExtArgs>
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
    spaces?: boolean | Media$spacesArgs<ExtArgs>
    mediaDetails?: boolean | Media$mediaDetailsArgs<ExtArgs>
    _count?: boolean | MediaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Media"
    objects: {
      bucket: Prisma.$BucketPayload<ExtArgs>
      uploadedBy: Prisma.$UserPayload<ExtArgs>
      spaces: Prisma.$SpacePayload<ExtArgs>[]
      mediaDetails: Prisma.$MediaUploadDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      filename: string
      storedFilename: string
      url: string
      bucketId: number
      path: string | null
      fileType: $Enums.MediaType
      mimetype: string
      extension: string
      size: number
      title: string | null
      altText: string | null
      description: string | null
      uploadedById: number
      isVisibility: $Enums.Visibility
      isAccessible: $Enums.Visibility
      width: number | null
      height: number | null
      uploadedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["media"]>
    composites: {}
  }

  type MediaGetPayload<S extends boolean | null | undefined | MediaDefaultArgs> = $Result.GetResult<Prisma.$MediaPayload, S>

  type MediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaCountAggregateInputType | true
    }

  export interface MediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Media'], meta: { name: 'Media' } }
    /**
     * Find zero or one Media that matches the filter.
     * @param {MediaFindUniqueArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaFindUniqueArgs>(args: SelectSubset<T, MediaFindUniqueArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Media that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaFindUniqueOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaFindFirstArgs>(args?: SelectSubset<T, MediaFindFirstArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Media
     * const media = await prisma.media.findMany()
     * 
     * // Get first 10 Media
     * const media = await prisma.media.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaWithIdOnly = await prisma.media.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaFindManyArgs>(args?: SelectSubset<T, MediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Media.
     * @param {MediaCreateArgs} args - Arguments to create a Media.
     * @example
     * // Create one Media
     * const Media = await prisma.media.create({
     *   data: {
     *     // ... data to create a Media
     *   }
     * })
     * 
     */
    create<T extends MediaCreateArgs>(args: SelectSubset<T, MediaCreateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Media.
     * @param {MediaCreateManyArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaCreateManyArgs>(args?: SelectSubset<T, MediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Media.
     * @param {MediaDeleteArgs} args - Arguments to delete one Media.
     * @example
     * // Delete one Media
     * const Media = await prisma.media.delete({
     *   where: {
     *     // ... filter to delete one Media
     *   }
     * })
     * 
     */
    delete<T extends MediaDeleteArgs>(args: SelectSubset<T, MediaDeleteArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Media.
     * @param {MediaUpdateArgs} args - Arguments to update one Media.
     * @example
     * // Update one Media
     * const media = await prisma.media.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaUpdateArgs>(args: SelectSubset<T, MediaUpdateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Media.
     * @param {MediaDeleteManyArgs} args - Arguments to filter Media to delete.
     * @example
     * // Delete a few Media
     * const { count } = await prisma.media.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaDeleteManyArgs>(args?: SelectSubset<T, MediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Media
     * const media = await prisma.media.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaUpdateManyArgs>(args: SelectSubset<T, MediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Media.
     * @param {MediaUpsertArgs} args - Arguments to update or create a Media.
     * @example
     * // Update or create a Media
     * const media = await prisma.media.upsert({
     *   create: {
     *     // ... data to create a Media
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Media we want to update
     *   }
     * })
     */
    upsert<T extends MediaUpsertArgs>(args: SelectSubset<T, MediaUpsertArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaCountArgs} args - Arguments to filter Media to count.
     * @example
     * // Count the number of Media
     * const count = await prisma.media.count({
     *   where: {
     *     // ... the filter for the Media we want to count
     *   }
     * })
    **/
    count<T extends MediaCountArgs>(
      args?: Subset<T, MediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaAggregateArgs>(args: Subset<T, MediaAggregateArgs>): Prisma.PrismaPromise<GetMediaAggregateType<T>>

    /**
     * Group by Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaGroupByArgs['orderBy'] }
        : { orderBy?: MediaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Media model
   */
  readonly fields: MediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Media.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bucket<T extends BucketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BucketDefaultArgs<ExtArgs>>): Prisma__BucketClient<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    uploadedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    spaces<T extends Media$spacesArgs<ExtArgs> = {}>(args?: Subset<T, Media$spacesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mediaDetails<T extends Media$mediaDetailsArgs<ExtArgs> = {}>(args?: Subset<T, Media$mediaDetailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Media model
   */
  interface MediaFieldRefs {
    readonly id: FieldRef<"Media", 'Int'>
    readonly slug: FieldRef<"Media", 'String'>
    readonly filename: FieldRef<"Media", 'String'>
    readonly storedFilename: FieldRef<"Media", 'String'>
    readonly url: FieldRef<"Media", 'String'>
    readonly bucketId: FieldRef<"Media", 'Int'>
    readonly path: FieldRef<"Media", 'String'>
    readonly fileType: FieldRef<"Media", 'MediaType'>
    readonly mimetype: FieldRef<"Media", 'String'>
    readonly extension: FieldRef<"Media", 'String'>
    readonly size: FieldRef<"Media", 'Int'>
    readonly title: FieldRef<"Media", 'String'>
    readonly altText: FieldRef<"Media", 'String'>
    readonly description: FieldRef<"Media", 'String'>
    readonly uploadedById: FieldRef<"Media", 'Int'>
    readonly isVisibility: FieldRef<"Media", 'Visibility'>
    readonly isAccessible: FieldRef<"Media", 'Visibility'>
    readonly width: FieldRef<"Media", 'Int'>
    readonly height: FieldRef<"Media", 'Int'>
    readonly uploadedAt: FieldRef<"Media", 'DateTime'>
    readonly createdAt: FieldRef<"Media", 'DateTime'>
    readonly updatedAt: FieldRef<"Media", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Media findUnique
   */
  export type MediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findUniqueOrThrow
   */
  export type MediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findFirst
   */
  export type MediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findFirstOrThrow
   */
  export type MediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findMany
   */
  export type MediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media create
   */
  export type MediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to create a Media.
     */
    data: XOR<MediaCreateInput, MediaUncheckedCreateInput>
  }

  /**
   * Media createMany
   */
  export type MediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Media.
     */
    data: MediaCreateManyInput | MediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Media update
   */
  export type MediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to update a Media.
     */
    data: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
    /**
     * Choose, which Media to update.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media updateMany
   */
  export type MediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Media.
     */
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyInput>
    /**
     * Filter which Media to update
     */
    where?: MediaWhereInput
    /**
     * Limit how many Media to update.
     */
    limit?: number
  }

  /**
   * Media upsert
   */
  export type MediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The filter to search for the Media to update in case it exists.
     */
    where: MediaWhereUniqueInput
    /**
     * In case the Media found by the `where` argument doesn't exist, create a new Media with this data.
     */
    create: XOR<MediaCreateInput, MediaUncheckedCreateInput>
    /**
     * In case the Media was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
  }

  /**
   * Media delete
   */
  export type MediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter which Media to delete.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media deleteMany
   */
  export type MediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to delete
     */
    where?: MediaWhereInput
    /**
     * Limit how many Media to delete.
     */
    limit?: number
  }

  /**
   * Media.spaces
   */
  export type Media$spacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    where?: SpaceWhereInput
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    cursor?: SpaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Media.mediaDetails
   */
  export type Media$mediaDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    where?: MediaUploadDetailWhereInput
    orderBy?: MediaUploadDetailOrderByWithRelationInput | MediaUploadDetailOrderByWithRelationInput[]
    cursor?: MediaUploadDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaUploadDetailScalarFieldEnum | MediaUploadDetailScalarFieldEnum[]
  }

  /**
   * Media without action
   */
  export type MediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
  }


  /**
   * Model MediaUpload
   */

  export type AggregateMediaUpload = {
    _count: MediaUploadCountAggregateOutputType | null
    _avg: MediaUploadAvgAggregateOutputType | null
    _sum: MediaUploadSumAggregateOutputType | null
    _min: MediaUploadMinAggregateOutputType | null
    _max: MediaUploadMaxAggregateOutputType | null
  }

  export type MediaUploadAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type MediaUploadSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type MediaUploadMinAggregateOutputType = {
    id: number | null
    slug: string | null
    userId: number | null
    createdAt: Date | null
  }

  export type MediaUploadMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    userId: number | null
    createdAt: Date | null
  }

  export type MediaUploadCountAggregateOutputType = {
    id: number
    slug: number
    userId: number
    createdAt: number
    _all: number
  }


  export type MediaUploadAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type MediaUploadSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type MediaUploadMinAggregateInputType = {
    id?: true
    slug?: true
    userId?: true
    createdAt?: true
  }

  export type MediaUploadMaxAggregateInputType = {
    id?: true
    slug?: true
    userId?: true
    createdAt?: true
  }

  export type MediaUploadCountAggregateInputType = {
    id?: true
    slug?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type MediaUploadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaUpload to aggregate.
     */
    where?: MediaUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploads to fetch.
     */
    orderBy?: MediaUploadOrderByWithRelationInput | MediaUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaUploads
    **/
    _count?: true | MediaUploadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaUploadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaUploadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaUploadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaUploadMaxAggregateInputType
  }

  export type GetMediaUploadAggregateType<T extends MediaUploadAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaUpload]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaUpload[P]>
      : GetScalarType<T[P], AggregateMediaUpload[P]>
  }




  export type MediaUploadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaUploadWhereInput
    orderBy?: MediaUploadOrderByWithAggregationInput | MediaUploadOrderByWithAggregationInput[]
    by: MediaUploadScalarFieldEnum[] | MediaUploadScalarFieldEnum
    having?: MediaUploadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaUploadCountAggregateInputType | true
    _avg?: MediaUploadAvgAggregateInputType
    _sum?: MediaUploadSumAggregateInputType
    _min?: MediaUploadMinAggregateInputType
    _max?: MediaUploadMaxAggregateInputType
  }

  export type MediaUploadGroupByOutputType = {
    id: number
    slug: string
    userId: number
    createdAt: Date
    _count: MediaUploadCountAggregateOutputType | null
    _avg: MediaUploadAvgAggregateOutputType | null
    _sum: MediaUploadSumAggregateOutputType | null
    _min: MediaUploadMinAggregateOutputType | null
    _max: MediaUploadMaxAggregateOutputType | null
  }

  type GetMediaUploadGroupByPayload<T extends MediaUploadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaUploadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaUploadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaUploadGroupByOutputType[P]>
            : GetScalarType<T[P], MediaUploadGroupByOutputType[P]>
        }
      >
    >


  export type MediaUploadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    details?: boolean | MediaUpload$detailsArgs<ExtArgs>
    _count?: boolean | MediaUploadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaUpload"]>



  export type MediaUploadSelectScalar = {
    id?: boolean
    slug?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type MediaUploadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "userId" | "createdAt", ExtArgs["result"]["mediaUpload"]>
  export type MediaUploadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    details?: boolean | MediaUpload$detailsArgs<ExtArgs>
    _count?: boolean | MediaUploadCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MediaUploadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaUpload"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      details: Prisma.$MediaUploadDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      userId: number
      createdAt: Date
    }, ExtArgs["result"]["mediaUpload"]>
    composites: {}
  }

  type MediaUploadGetPayload<S extends boolean | null | undefined | MediaUploadDefaultArgs> = $Result.GetResult<Prisma.$MediaUploadPayload, S>

  type MediaUploadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaUploadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaUploadCountAggregateInputType | true
    }

  export interface MediaUploadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaUpload'], meta: { name: 'MediaUpload' } }
    /**
     * Find zero or one MediaUpload that matches the filter.
     * @param {MediaUploadFindUniqueArgs} args - Arguments to find a MediaUpload
     * @example
     * // Get one MediaUpload
     * const mediaUpload = await prisma.mediaUpload.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaUploadFindUniqueArgs>(args: SelectSubset<T, MediaUploadFindUniqueArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MediaUpload that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaUploadFindUniqueOrThrowArgs} args - Arguments to find a MediaUpload
     * @example
     * // Get one MediaUpload
     * const mediaUpload = await prisma.mediaUpload.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaUploadFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaUploadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaUpload that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadFindFirstArgs} args - Arguments to find a MediaUpload
     * @example
     * // Get one MediaUpload
     * const mediaUpload = await prisma.mediaUpload.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaUploadFindFirstArgs>(args?: SelectSubset<T, MediaUploadFindFirstArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaUpload that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadFindFirstOrThrowArgs} args - Arguments to find a MediaUpload
     * @example
     * // Get one MediaUpload
     * const mediaUpload = await prisma.mediaUpload.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaUploadFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaUploadFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MediaUploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaUploads
     * const mediaUploads = await prisma.mediaUpload.findMany()
     * 
     * // Get first 10 MediaUploads
     * const mediaUploads = await prisma.mediaUpload.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaUploadWithIdOnly = await prisma.mediaUpload.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaUploadFindManyArgs>(args?: SelectSubset<T, MediaUploadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MediaUpload.
     * @param {MediaUploadCreateArgs} args - Arguments to create a MediaUpload.
     * @example
     * // Create one MediaUpload
     * const MediaUpload = await prisma.mediaUpload.create({
     *   data: {
     *     // ... data to create a MediaUpload
     *   }
     * })
     * 
     */
    create<T extends MediaUploadCreateArgs>(args: SelectSubset<T, MediaUploadCreateArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MediaUploads.
     * @param {MediaUploadCreateManyArgs} args - Arguments to create many MediaUploads.
     * @example
     * // Create many MediaUploads
     * const mediaUpload = await prisma.mediaUpload.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaUploadCreateManyArgs>(args?: SelectSubset<T, MediaUploadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MediaUpload.
     * @param {MediaUploadDeleteArgs} args - Arguments to delete one MediaUpload.
     * @example
     * // Delete one MediaUpload
     * const MediaUpload = await prisma.mediaUpload.delete({
     *   where: {
     *     // ... filter to delete one MediaUpload
     *   }
     * })
     * 
     */
    delete<T extends MediaUploadDeleteArgs>(args: SelectSubset<T, MediaUploadDeleteArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MediaUpload.
     * @param {MediaUploadUpdateArgs} args - Arguments to update one MediaUpload.
     * @example
     * // Update one MediaUpload
     * const mediaUpload = await prisma.mediaUpload.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaUploadUpdateArgs>(args: SelectSubset<T, MediaUploadUpdateArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MediaUploads.
     * @param {MediaUploadDeleteManyArgs} args - Arguments to filter MediaUploads to delete.
     * @example
     * // Delete a few MediaUploads
     * const { count } = await prisma.mediaUpload.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaUploadDeleteManyArgs>(args?: SelectSubset<T, MediaUploadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaUploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaUploads
     * const mediaUpload = await prisma.mediaUpload.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaUploadUpdateManyArgs>(args: SelectSubset<T, MediaUploadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MediaUpload.
     * @param {MediaUploadUpsertArgs} args - Arguments to update or create a MediaUpload.
     * @example
     * // Update or create a MediaUpload
     * const mediaUpload = await prisma.mediaUpload.upsert({
     *   create: {
     *     // ... data to create a MediaUpload
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaUpload we want to update
     *   }
     * })
     */
    upsert<T extends MediaUploadUpsertArgs>(args: SelectSubset<T, MediaUploadUpsertArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MediaUploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadCountArgs} args - Arguments to filter MediaUploads to count.
     * @example
     * // Count the number of MediaUploads
     * const count = await prisma.mediaUpload.count({
     *   where: {
     *     // ... the filter for the MediaUploads we want to count
     *   }
     * })
    **/
    count<T extends MediaUploadCountArgs>(
      args?: Subset<T, MediaUploadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaUploadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaUpload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaUploadAggregateArgs>(args: Subset<T, MediaUploadAggregateArgs>): Prisma.PrismaPromise<GetMediaUploadAggregateType<T>>

    /**
     * Group by MediaUpload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaUploadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaUploadGroupByArgs['orderBy'] }
        : { orderBy?: MediaUploadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaUploadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaUploadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaUpload model
   */
  readonly fields: MediaUploadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaUpload.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaUploadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    details<T extends MediaUpload$detailsArgs<ExtArgs> = {}>(args?: Subset<T, MediaUpload$detailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MediaUpload model
   */
  interface MediaUploadFieldRefs {
    readonly id: FieldRef<"MediaUpload", 'Int'>
    readonly slug: FieldRef<"MediaUpload", 'String'>
    readonly userId: FieldRef<"MediaUpload", 'Int'>
    readonly createdAt: FieldRef<"MediaUpload", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaUpload findUnique
   */
  export type MediaUploadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadInclude<ExtArgs> | null
    /**
     * Filter, which MediaUpload to fetch.
     */
    where: MediaUploadWhereUniqueInput
  }

  /**
   * MediaUpload findUniqueOrThrow
   */
  export type MediaUploadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadInclude<ExtArgs> | null
    /**
     * Filter, which MediaUpload to fetch.
     */
    where: MediaUploadWhereUniqueInput
  }

  /**
   * MediaUpload findFirst
   */
  export type MediaUploadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadInclude<ExtArgs> | null
    /**
     * Filter, which MediaUpload to fetch.
     */
    where?: MediaUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploads to fetch.
     */
    orderBy?: MediaUploadOrderByWithRelationInput | MediaUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaUploads.
     */
    cursor?: MediaUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaUploads.
     */
    distinct?: MediaUploadScalarFieldEnum | MediaUploadScalarFieldEnum[]
  }

  /**
   * MediaUpload findFirstOrThrow
   */
  export type MediaUploadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadInclude<ExtArgs> | null
    /**
     * Filter, which MediaUpload to fetch.
     */
    where?: MediaUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploads to fetch.
     */
    orderBy?: MediaUploadOrderByWithRelationInput | MediaUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaUploads.
     */
    cursor?: MediaUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaUploads.
     */
    distinct?: MediaUploadScalarFieldEnum | MediaUploadScalarFieldEnum[]
  }

  /**
   * MediaUpload findMany
   */
  export type MediaUploadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadInclude<ExtArgs> | null
    /**
     * Filter, which MediaUploads to fetch.
     */
    where?: MediaUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploads to fetch.
     */
    orderBy?: MediaUploadOrderByWithRelationInput | MediaUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaUploads.
     */
    cursor?: MediaUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploads.
     */
    skip?: number
    distinct?: MediaUploadScalarFieldEnum | MediaUploadScalarFieldEnum[]
  }

  /**
   * MediaUpload create
   */
  export type MediaUploadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadInclude<ExtArgs> | null
    /**
     * The data needed to create a MediaUpload.
     */
    data: XOR<MediaUploadCreateInput, MediaUploadUncheckedCreateInput>
  }

  /**
   * MediaUpload createMany
   */
  export type MediaUploadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaUploads.
     */
    data: MediaUploadCreateManyInput | MediaUploadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaUpload update
   */
  export type MediaUploadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadInclude<ExtArgs> | null
    /**
     * The data needed to update a MediaUpload.
     */
    data: XOR<MediaUploadUpdateInput, MediaUploadUncheckedUpdateInput>
    /**
     * Choose, which MediaUpload to update.
     */
    where: MediaUploadWhereUniqueInput
  }

  /**
   * MediaUpload updateMany
   */
  export type MediaUploadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaUploads.
     */
    data: XOR<MediaUploadUpdateManyMutationInput, MediaUploadUncheckedUpdateManyInput>
    /**
     * Filter which MediaUploads to update
     */
    where?: MediaUploadWhereInput
    /**
     * Limit how many MediaUploads to update.
     */
    limit?: number
  }

  /**
   * MediaUpload upsert
   */
  export type MediaUploadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadInclude<ExtArgs> | null
    /**
     * The filter to search for the MediaUpload to update in case it exists.
     */
    where: MediaUploadWhereUniqueInput
    /**
     * In case the MediaUpload found by the `where` argument doesn't exist, create a new MediaUpload with this data.
     */
    create: XOR<MediaUploadCreateInput, MediaUploadUncheckedCreateInput>
    /**
     * In case the MediaUpload was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaUploadUpdateInput, MediaUploadUncheckedUpdateInput>
  }

  /**
   * MediaUpload delete
   */
  export type MediaUploadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadInclude<ExtArgs> | null
    /**
     * Filter which MediaUpload to delete.
     */
    where: MediaUploadWhereUniqueInput
  }

  /**
   * MediaUpload deleteMany
   */
  export type MediaUploadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaUploads to delete
     */
    where?: MediaUploadWhereInput
    /**
     * Limit how many MediaUploads to delete.
     */
    limit?: number
  }

  /**
   * MediaUpload.details
   */
  export type MediaUpload$detailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    where?: MediaUploadDetailWhereInput
    orderBy?: MediaUploadDetailOrderByWithRelationInput | MediaUploadDetailOrderByWithRelationInput[]
    cursor?: MediaUploadDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaUploadDetailScalarFieldEnum | MediaUploadDetailScalarFieldEnum[]
  }

  /**
   * MediaUpload without action
   */
  export type MediaUploadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUpload
     */
    select?: MediaUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUpload
     */
    omit?: MediaUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadInclude<ExtArgs> | null
  }


  /**
   * Model MediaUploadDetail
   */

  export type AggregateMediaUploadDetail = {
    _count: MediaUploadDetailCountAggregateOutputType | null
    _avg: MediaUploadDetailAvgAggregateOutputType | null
    _sum: MediaUploadDetailSumAggregateOutputType | null
    _min: MediaUploadDetailMinAggregateOutputType | null
    _max: MediaUploadDetailMaxAggregateOutputType | null
  }

  export type MediaUploadDetailAvgAggregateOutputType = {
    id: number | null
    mediaUploadId: number | null
    mediaId: number | null
    spaceId: number | null
  }

  export type MediaUploadDetailSumAggregateOutputType = {
    id: number | null
    mediaUploadId: number | null
    mediaId: number | null
    spaceId: number | null
  }

  export type MediaUploadDetailMinAggregateOutputType = {
    id: number | null
    mediaUploadId: number | null
    mediaId: number | null
    spaceId: number | null
    createdAt: Date | null
  }

  export type MediaUploadDetailMaxAggregateOutputType = {
    id: number | null
    mediaUploadId: number | null
    mediaId: number | null
    spaceId: number | null
    createdAt: Date | null
  }

  export type MediaUploadDetailCountAggregateOutputType = {
    id: number
    mediaUploadId: number
    mediaId: number
    spaceId: number
    createdAt: number
    _all: number
  }


  export type MediaUploadDetailAvgAggregateInputType = {
    id?: true
    mediaUploadId?: true
    mediaId?: true
    spaceId?: true
  }

  export type MediaUploadDetailSumAggregateInputType = {
    id?: true
    mediaUploadId?: true
    mediaId?: true
    spaceId?: true
  }

  export type MediaUploadDetailMinAggregateInputType = {
    id?: true
    mediaUploadId?: true
    mediaId?: true
    spaceId?: true
    createdAt?: true
  }

  export type MediaUploadDetailMaxAggregateInputType = {
    id?: true
    mediaUploadId?: true
    mediaId?: true
    spaceId?: true
    createdAt?: true
  }

  export type MediaUploadDetailCountAggregateInputType = {
    id?: true
    mediaUploadId?: true
    mediaId?: true
    spaceId?: true
    createdAt?: true
    _all?: true
  }

  export type MediaUploadDetailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaUploadDetail to aggregate.
     */
    where?: MediaUploadDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploadDetails to fetch.
     */
    orderBy?: MediaUploadDetailOrderByWithRelationInput | MediaUploadDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaUploadDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploadDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploadDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaUploadDetails
    **/
    _count?: true | MediaUploadDetailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaUploadDetailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaUploadDetailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaUploadDetailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaUploadDetailMaxAggregateInputType
  }

  export type GetMediaUploadDetailAggregateType<T extends MediaUploadDetailAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaUploadDetail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaUploadDetail[P]>
      : GetScalarType<T[P], AggregateMediaUploadDetail[P]>
  }




  export type MediaUploadDetailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaUploadDetailWhereInput
    orderBy?: MediaUploadDetailOrderByWithAggregationInput | MediaUploadDetailOrderByWithAggregationInput[]
    by: MediaUploadDetailScalarFieldEnum[] | MediaUploadDetailScalarFieldEnum
    having?: MediaUploadDetailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaUploadDetailCountAggregateInputType | true
    _avg?: MediaUploadDetailAvgAggregateInputType
    _sum?: MediaUploadDetailSumAggregateInputType
    _min?: MediaUploadDetailMinAggregateInputType
    _max?: MediaUploadDetailMaxAggregateInputType
  }

  export type MediaUploadDetailGroupByOutputType = {
    id: number
    mediaUploadId: number
    mediaId: number
    spaceId: number | null
    createdAt: Date
    _count: MediaUploadDetailCountAggregateOutputType | null
    _avg: MediaUploadDetailAvgAggregateOutputType | null
    _sum: MediaUploadDetailSumAggregateOutputType | null
    _min: MediaUploadDetailMinAggregateOutputType | null
    _max: MediaUploadDetailMaxAggregateOutputType | null
  }

  type GetMediaUploadDetailGroupByPayload<T extends MediaUploadDetailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaUploadDetailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaUploadDetailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaUploadDetailGroupByOutputType[P]>
            : GetScalarType<T[P], MediaUploadDetailGroupByOutputType[P]>
        }
      >
    >


  export type MediaUploadDetailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mediaUploadId?: boolean
    mediaId?: boolean
    spaceId?: boolean
    createdAt?: boolean
    media?: boolean | MediaDefaultArgs<ExtArgs>
    mediaUpload?: boolean | MediaUploadDefaultArgs<ExtArgs>
    space?: boolean | MediaUploadDetail$spaceArgs<ExtArgs>
  }, ExtArgs["result"]["mediaUploadDetail"]>



  export type MediaUploadDetailSelectScalar = {
    id?: boolean
    mediaUploadId?: boolean
    mediaId?: boolean
    spaceId?: boolean
    createdAt?: boolean
  }

  export type MediaUploadDetailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mediaUploadId" | "mediaId" | "spaceId" | "createdAt", ExtArgs["result"]["mediaUploadDetail"]>
  export type MediaUploadDetailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | MediaDefaultArgs<ExtArgs>
    mediaUpload?: boolean | MediaUploadDefaultArgs<ExtArgs>
    space?: boolean | MediaUploadDetail$spaceArgs<ExtArgs>
  }

  export type $MediaUploadDetailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaUploadDetail"
    objects: {
      media: Prisma.$MediaPayload<ExtArgs>
      mediaUpload: Prisma.$MediaUploadPayload<ExtArgs>
      space: Prisma.$SpacePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mediaUploadId: number
      mediaId: number
      spaceId: number | null
      createdAt: Date
    }, ExtArgs["result"]["mediaUploadDetail"]>
    composites: {}
  }

  type MediaUploadDetailGetPayload<S extends boolean | null | undefined | MediaUploadDetailDefaultArgs> = $Result.GetResult<Prisma.$MediaUploadDetailPayload, S>

  type MediaUploadDetailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaUploadDetailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaUploadDetailCountAggregateInputType | true
    }

  export interface MediaUploadDetailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaUploadDetail'], meta: { name: 'MediaUploadDetail' } }
    /**
     * Find zero or one MediaUploadDetail that matches the filter.
     * @param {MediaUploadDetailFindUniqueArgs} args - Arguments to find a MediaUploadDetail
     * @example
     * // Get one MediaUploadDetail
     * const mediaUploadDetail = await prisma.mediaUploadDetail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaUploadDetailFindUniqueArgs>(args: SelectSubset<T, MediaUploadDetailFindUniqueArgs<ExtArgs>>): Prisma__MediaUploadDetailClient<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MediaUploadDetail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaUploadDetailFindUniqueOrThrowArgs} args - Arguments to find a MediaUploadDetail
     * @example
     * // Get one MediaUploadDetail
     * const mediaUploadDetail = await prisma.mediaUploadDetail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaUploadDetailFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaUploadDetailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaUploadDetailClient<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaUploadDetail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadDetailFindFirstArgs} args - Arguments to find a MediaUploadDetail
     * @example
     * // Get one MediaUploadDetail
     * const mediaUploadDetail = await prisma.mediaUploadDetail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaUploadDetailFindFirstArgs>(args?: SelectSubset<T, MediaUploadDetailFindFirstArgs<ExtArgs>>): Prisma__MediaUploadDetailClient<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaUploadDetail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadDetailFindFirstOrThrowArgs} args - Arguments to find a MediaUploadDetail
     * @example
     * // Get one MediaUploadDetail
     * const mediaUploadDetail = await prisma.mediaUploadDetail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaUploadDetailFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaUploadDetailFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaUploadDetailClient<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MediaUploadDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadDetailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaUploadDetails
     * const mediaUploadDetails = await prisma.mediaUploadDetail.findMany()
     * 
     * // Get first 10 MediaUploadDetails
     * const mediaUploadDetails = await prisma.mediaUploadDetail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaUploadDetailWithIdOnly = await prisma.mediaUploadDetail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaUploadDetailFindManyArgs>(args?: SelectSubset<T, MediaUploadDetailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MediaUploadDetail.
     * @param {MediaUploadDetailCreateArgs} args - Arguments to create a MediaUploadDetail.
     * @example
     * // Create one MediaUploadDetail
     * const MediaUploadDetail = await prisma.mediaUploadDetail.create({
     *   data: {
     *     // ... data to create a MediaUploadDetail
     *   }
     * })
     * 
     */
    create<T extends MediaUploadDetailCreateArgs>(args: SelectSubset<T, MediaUploadDetailCreateArgs<ExtArgs>>): Prisma__MediaUploadDetailClient<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MediaUploadDetails.
     * @param {MediaUploadDetailCreateManyArgs} args - Arguments to create many MediaUploadDetails.
     * @example
     * // Create many MediaUploadDetails
     * const mediaUploadDetail = await prisma.mediaUploadDetail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaUploadDetailCreateManyArgs>(args?: SelectSubset<T, MediaUploadDetailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MediaUploadDetail.
     * @param {MediaUploadDetailDeleteArgs} args - Arguments to delete one MediaUploadDetail.
     * @example
     * // Delete one MediaUploadDetail
     * const MediaUploadDetail = await prisma.mediaUploadDetail.delete({
     *   where: {
     *     // ... filter to delete one MediaUploadDetail
     *   }
     * })
     * 
     */
    delete<T extends MediaUploadDetailDeleteArgs>(args: SelectSubset<T, MediaUploadDetailDeleteArgs<ExtArgs>>): Prisma__MediaUploadDetailClient<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MediaUploadDetail.
     * @param {MediaUploadDetailUpdateArgs} args - Arguments to update one MediaUploadDetail.
     * @example
     * // Update one MediaUploadDetail
     * const mediaUploadDetail = await prisma.mediaUploadDetail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaUploadDetailUpdateArgs>(args: SelectSubset<T, MediaUploadDetailUpdateArgs<ExtArgs>>): Prisma__MediaUploadDetailClient<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MediaUploadDetails.
     * @param {MediaUploadDetailDeleteManyArgs} args - Arguments to filter MediaUploadDetails to delete.
     * @example
     * // Delete a few MediaUploadDetails
     * const { count } = await prisma.mediaUploadDetail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaUploadDetailDeleteManyArgs>(args?: SelectSubset<T, MediaUploadDetailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaUploadDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadDetailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaUploadDetails
     * const mediaUploadDetail = await prisma.mediaUploadDetail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaUploadDetailUpdateManyArgs>(args: SelectSubset<T, MediaUploadDetailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MediaUploadDetail.
     * @param {MediaUploadDetailUpsertArgs} args - Arguments to update or create a MediaUploadDetail.
     * @example
     * // Update or create a MediaUploadDetail
     * const mediaUploadDetail = await prisma.mediaUploadDetail.upsert({
     *   create: {
     *     // ... data to create a MediaUploadDetail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaUploadDetail we want to update
     *   }
     * })
     */
    upsert<T extends MediaUploadDetailUpsertArgs>(args: SelectSubset<T, MediaUploadDetailUpsertArgs<ExtArgs>>): Prisma__MediaUploadDetailClient<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MediaUploadDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadDetailCountArgs} args - Arguments to filter MediaUploadDetails to count.
     * @example
     * // Count the number of MediaUploadDetails
     * const count = await prisma.mediaUploadDetail.count({
     *   where: {
     *     // ... the filter for the MediaUploadDetails we want to count
     *   }
     * })
    **/
    count<T extends MediaUploadDetailCountArgs>(
      args?: Subset<T, MediaUploadDetailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaUploadDetailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaUploadDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadDetailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaUploadDetailAggregateArgs>(args: Subset<T, MediaUploadDetailAggregateArgs>): Prisma.PrismaPromise<GetMediaUploadDetailAggregateType<T>>

    /**
     * Group by MediaUploadDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUploadDetailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaUploadDetailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaUploadDetailGroupByArgs['orderBy'] }
        : { orderBy?: MediaUploadDetailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaUploadDetailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaUploadDetailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaUploadDetail model
   */
  readonly fields: MediaUploadDetailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaUploadDetail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaUploadDetailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    media<T extends MediaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MediaDefaultArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mediaUpload<T extends MediaUploadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MediaUploadDefaultArgs<ExtArgs>>): Prisma__MediaUploadClient<$Result.GetResult<Prisma.$MediaUploadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    space<T extends MediaUploadDetail$spaceArgs<ExtArgs> = {}>(args?: Subset<T, MediaUploadDetail$spaceArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MediaUploadDetail model
   */
  interface MediaUploadDetailFieldRefs {
    readonly id: FieldRef<"MediaUploadDetail", 'Int'>
    readonly mediaUploadId: FieldRef<"MediaUploadDetail", 'Int'>
    readonly mediaId: FieldRef<"MediaUploadDetail", 'Int'>
    readonly spaceId: FieldRef<"MediaUploadDetail", 'Int'>
    readonly createdAt: FieldRef<"MediaUploadDetail", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaUploadDetail findUnique
   */
  export type MediaUploadDetailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    /**
     * Filter, which MediaUploadDetail to fetch.
     */
    where: MediaUploadDetailWhereUniqueInput
  }

  /**
   * MediaUploadDetail findUniqueOrThrow
   */
  export type MediaUploadDetailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    /**
     * Filter, which MediaUploadDetail to fetch.
     */
    where: MediaUploadDetailWhereUniqueInput
  }

  /**
   * MediaUploadDetail findFirst
   */
  export type MediaUploadDetailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    /**
     * Filter, which MediaUploadDetail to fetch.
     */
    where?: MediaUploadDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploadDetails to fetch.
     */
    orderBy?: MediaUploadDetailOrderByWithRelationInput | MediaUploadDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaUploadDetails.
     */
    cursor?: MediaUploadDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploadDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploadDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaUploadDetails.
     */
    distinct?: MediaUploadDetailScalarFieldEnum | MediaUploadDetailScalarFieldEnum[]
  }

  /**
   * MediaUploadDetail findFirstOrThrow
   */
  export type MediaUploadDetailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    /**
     * Filter, which MediaUploadDetail to fetch.
     */
    where?: MediaUploadDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploadDetails to fetch.
     */
    orderBy?: MediaUploadDetailOrderByWithRelationInput | MediaUploadDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaUploadDetails.
     */
    cursor?: MediaUploadDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploadDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploadDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaUploadDetails.
     */
    distinct?: MediaUploadDetailScalarFieldEnum | MediaUploadDetailScalarFieldEnum[]
  }

  /**
   * MediaUploadDetail findMany
   */
  export type MediaUploadDetailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    /**
     * Filter, which MediaUploadDetails to fetch.
     */
    where?: MediaUploadDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaUploadDetails to fetch.
     */
    orderBy?: MediaUploadDetailOrderByWithRelationInput | MediaUploadDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaUploadDetails.
     */
    cursor?: MediaUploadDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaUploadDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaUploadDetails.
     */
    skip?: number
    distinct?: MediaUploadDetailScalarFieldEnum | MediaUploadDetailScalarFieldEnum[]
  }

  /**
   * MediaUploadDetail create
   */
  export type MediaUploadDetailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    /**
     * The data needed to create a MediaUploadDetail.
     */
    data: XOR<MediaUploadDetailCreateInput, MediaUploadDetailUncheckedCreateInput>
  }

  /**
   * MediaUploadDetail createMany
   */
  export type MediaUploadDetailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaUploadDetails.
     */
    data: MediaUploadDetailCreateManyInput | MediaUploadDetailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaUploadDetail update
   */
  export type MediaUploadDetailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    /**
     * The data needed to update a MediaUploadDetail.
     */
    data: XOR<MediaUploadDetailUpdateInput, MediaUploadDetailUncheckedUpdateInput>
    /**
     * Choose, which MediaUploadDetail to update.
     */
    where: MediaUploadDetailWhereUniqueInput
  }

  /**
   * MediaUploadDetail updateMany
   */
  export type MediaUploadDetailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaUploadDetails.
     */
    data: XOR<MediaUploadDetailUpdateManyMutationInput, MediaUploadDetailUncheckedUpdateManyInput>
    /**
     * Filter which MediaUploadDetails to update
     */
    where?: MediaUploadDetailWhereInput
    /**
     * Limit how many MediaUploadDetails to update.
     */
    limit?: number
  }

  /**
   * MediaUploadDetail upsert
   */
  export type MediaUploadDetailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    /**
     * The filter to search for the MediaUploadDetail to update in case it exists.
     */
    where: MediaUploadDetailWhereUniqueInput
    /**
     * In case the MediaUploadDetail found by the `where` argument doesn't exist, create a new MediaUploadDetail with this data.
     */
    create: XOR<MediaUploadDetailCreateInput, MediaUploadDetailUncheckedCreateInput>
    /**
     * In case the MediaUploadDetail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaUploadDetailUpdateInput, MediaUploadDetailUncheckedUpdateInput>
  }

  /**
   * MediaUploadDetail delete
   */
  export type MediaUploadDetailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    /**
     * Filter which MediaUploadDetail to delete.
     */
    where: MediaUploadDetailWhereUniqueInput
  }

  /**
   * MediaUploadDetail deleteMany
   */
  export type MediaUploadDetailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaUploadDetails to delete
     */
    where?: MediaUploadDetailWhereInput
    /**
     * Limit how many MediaUploadDetails to delete.
     */
    limit?: number
  }

  /**
   * MediaUploadDetail.space
   */
  export type MediaUploadDetail$spaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    where?: SpaceWhereInput
  }

  /**
   * MediaUploadDetail without action
   */
  export type MediaUploadDetailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
  }


  /**
   * Model Space
   */

  export type AggregateSpace = {
    _count: SpaceCountAggregateOutputType | null
    _avg: SpaceAvgAggregateOutputType | null
    _sum: SpaceSumAggregateOutputType | null
    _min: SpaceMinAggregateOutputType | null
    _max: SpaceMaxAggregateOutputType | null
  }

  export type SpaceAvgAggregateOutputType = {
    id: number | null
    parentId: number | null
    bucketId: number | null
    userId: number | null
    mediaId: number | null
  }

  export type SpaceSumAggregateOutputType = {
    id: number | null
    parentId: number | null
    bucketId: number | null
    userId: number | null
    mediaId: number | null
  }

  export type SpaceMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    parentId: number | null
    isAvailable: $Enums.Visibility | null
    uploadedAt: Date | null
    bucketId: number | null
    userId: number | null
    mediaId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpaceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    parentId: number | null
    isAvailable: $Enums.Visibility | null
    uploadedAt: Date | null
    bucketId: number | null
    userId: number | null
    mediaId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpaceCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    parentId: number
    isAvailable: number
    uploadedAt: number
    bucketId: number
    userId: number
    mediaId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SpaceAvgAggregateInputType = {
    id?: true
    parentId?: true
    bucketId?: true
    userId?: true
    mediaId?: true
  }

  export type SpaceSumAggregateInputType = {
    id?: true
    parentId?: true
    bucketId?: true
    userId?: true
    mediaId?: true
  }

  export type SpaceMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentId?: true
    isAvailable?: true
    uploadedAt?: true
    bucketId?: true
    userId?: true
    mediaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpaceMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentId?: true
    isAvailable?: true
    uploadedAt?: true
    bucketId?: true
    userId?: true
    mediaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpaceCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentId?: true
    isAvailable?: true
    uploadedAt?: true
    bucketId?: true
    userId?: true
    mediaId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SpaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Space to aggregate.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Spaces
    **/
    _count?: true | SpaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpaceMaxAggregateInputType
  }

  export type GetSpaceAggregateType<T extends SpaceAggregateArgs> = {
        [P in keyof T & keyof AggregateSpace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpace[P]>
      : GetScalarType<T[P], AggregateSpace[P]>
  }




  export type SpaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceWhereInput
    orderBy?: SpaceOrderByWithAggregationInput | SpaceOrderByWithAggregationInput[]
    by: SpaceScalarFieldEnum[] | SpaceScalarFieldEnum
    having?: SpaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpaceCountAggregateInputType | true
    _avg?: SpaceAvgAggregateInputType
    _sum?: SpaceSumAggregateInputType
    _min?: SpaceMinAggregateInputType
    _max?: SpaceMaxAggregateInputType
  }

  export type SpaceGroupByOutputType = {
    id: number
    name: string
    slug: string
    parentId: number | null
    isAvailable: $Enums.Visibility
    uploadedAt: Date | null
    bucketId: number
    userId: number
    mediaId: number | null
    createdAt: Date
    updatedAt: Date
    _count: SpaceCountAggregateOutputType | null
    _avg: SpaceAvgAggregateOutputType | null
    _sum: SpaceSumAggregateOutputType | null
    _min: SpaceMinAggregateOutputType | null
    _max: SpaceMaxAggregateOutputType | null
  }

  type GetSpaceGroupByPayload<T extends SpaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpaceGroupByOutputType[P]>
            : GetScalarType<T[P], SpaceGroupByOutputType[P]>
        }
      >
    >


  export type SpaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    parentId?: boolean
    isAvailable?: boolean
    uploadedAt?: boolean
    bucketId?: boolean
    userId?: boolean
    mediaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bucket?: boolean | BucketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Space$parentArgs<ExtArgs>
    children?: boolean | Space$childrenArgs<ExtArgs>
    media?: boolean | Space$mediaArgs<ExtArgs>
    uploadDetails?: boolean | Space$uploadDetailsArgs<ExtArgs>
    _count?: boolean | SpaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["space"]>



  export type SpaceSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    parentId?: boolean
    isAvailable?: boolean
    uploadedAt?: boolean
    bucketId?: boolean
    userId?: boolean
    mediaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SpaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "parentId" | "isAvailable" | "uploadedAt" | "bucketId" | "userId" | "mediaId" | "createdAt" | "updatedAt", ExtArgs["result"]["space"]>
  export type SpaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bucket?: boolean | BucketDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Space$parentArgs<ExtArgs>
    children?: boolean | Space$childrenArgs<ExtArgs>
    media?: boolean | Space$mediaArgs<ExtArgs>
    uploadDetails?: boolean | Space$uploadDetailsArgs<ExtArgs>
    _count?: boolean | SpaceCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SpacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Space"
    objects: {
      bucket: Prisma.$BucketPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      parent: Prisma.$SpacePayload<ExtArgs> | null
      children: Prisma.$SpacePayload<ExtArgs>[]
      media: Prisma.$MediaPayload<ExtArgs> | null
      uploadDetails: Prisma.$MediaUploadDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      parentId: number | null
      isAvailable: $Enums.Visibility
      uploadedAt: Date | null
      bucketId: number
      userId: number
      mediaId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["space"]>
    composites: {}
  }

  type SpaceGetPayload<S extends boolean | null | undefined | SpaceDefaultArgs> = $Result.GetResult<Prisma.$SpacePayload, S>

  type SpaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpaceCountAggregateInputType | true
    }

  export interface SpaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Space'], meta: { name: 'Space' } }
    /**
     * Find zero or one Space that matches the filter.
     * @param {SpaceFindUniqueArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpaceFindUniqueArgs>(args: SelectSubset<T, SpaceFindUniqueArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Space that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpaceFindUniqueOrThrowArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpaceFindUniqueOrThrowArgs>(args: SelectSubset<T, SpaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Space that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceFindFirstArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpaceFindFirstArgs>(args?: SelectSubset<T, SpaceFindFirstArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Space that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceFindFirstOrThrowArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpaceFindFirstOrThrowArgs>(args?: SelectSubset<T, SpaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Spaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spaces
     * const spaces = await prisma.space.findMany()
     * 
     * // Get first 10 Spaces
     * const spaces = await prisma.space.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spaceWithIdOnly = await prisma.space.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpaceFindManyArgs>(args?: SelectSubset<T, SpaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Space.
     * @param {SpaceCreateArgs} args - Arguments to create a Space.
     * @example
     * // Create one Space
     * const Space = await prisma.space.create({
     *   data: {
     *     // ... data to create a Space
     *   }
     * })
     * 
     */
    create<T extends SpaceCreateArgs>(args: SelectSubset<T, SpaceCreateArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Spaces.
     * @param {SpaceCreateManyArgs} args - Arguments to create many Spaces.
     * @example
     * // Create many Spaces
     * const space = await prisma.space.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpaceCreateManyArgs>(args?: SelectSubset<T, SpaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Space.
     * @param {SpaceDeleteArgs} args - Arguments to delete one Space.
     * @example
     * // Delete one Space
     * const Space = await prisma.space.delete({
     *   where: {
     *     // ... filter to delete one Space
     *   }
     * })
     * 
     */
    delete<T extends SpaceDeleteArgs>(args: SelectSubset<T, SpaceDeleteArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Space.
     * @param {SpaceUpdateArgs} args - Arguments to update one Space.
     * @example
     * // Update one Space
     * const space = await prisma.space.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpaceUpdateArgs>(args: SelectSubset<T, SpaceUpdateArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Spaces.
     * @param {SpaceDeleteManyArgs} args - Arguments to filter Spaces to delete.
     * @example
     * // Delete a few Spaces
     * const { count } = await prisma.space.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpaceDeleteManyArgs>(args?: SelectSubset<T, SpaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spaces
     * const space = await prisma.space.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpaceUpdateManyArgs>(args: SelectSubset<T, SpaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Space.
     * @param {SpaceUpsertArgs} args - Arguments to update or create a Space.
     * @example
     * // Update or create a Space
     * const space = await prisma.space.upsert({
     *   create: {
     *     // ... data to create a Space
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Space we want to update
     *   }
     * })
     */
    upsert<T extends SpaceUpsertArgs>(args: SelectSubset<T, SpaceUpsertArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Spaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceCountArgs} args - Arguments to filter Spaces to count.
     * @example
     * // Count the number of Spaces
     * const count = await prisma.space.count({
     *   where: {
     *     // ... the filter for the Spaces we want to count
     *   }
     * })
    **/
    count<T extends SpaceCountArgs>(
      args?: Subset<T, SpaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Space.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpaceAggregateArgs>(args: Subset<T, SpaceAggregateArgs>): Prisma.PrismaPromise<GetSpaceAggregateType<T>>

    /**
     * Group by Space.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpaceGroupByArgs['orderBy'] }
        : { orderBy?: SpaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Space model
   */
  readonly fields: SpaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Space.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bucket<T extends BucketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BucketDefaultArgs<ExtArgs>>): Prisma__BucketClient<$Result.GetResult<Prisma.$BucketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends Space$parentArgs<ExtArgs> = {}>(args?: Subset<T, Space$parentArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Space$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Space$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    media<T extends Space$mediaArgs<ExtArgs> = {}>(args?: Subset<T, Space$mediaArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    uploadDetails<T extends Space$uploadDetailsArgs<ExtArgs> = {}>(args?: Subset<T, Space$uploadDetailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaUploadDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Space model
   */
  interface SpaceFieldRefs {
    readonly id: FieldRef<"Space", 'Int'>
    readonly name: FieldRef<"Space", 'String'>
    readonly slug: FieldRef<"Space", 'String'>
    readonly parentId: FieldRef<"Space", 'Int'>
    readonly isAvailable: FieldRef<"Space", 'Visibility'>
    readonly uploadedAt: FieldRef<"Space", 'DateTime'>
    readonly bucketId: FieldRef<"Space", 'Int'>
    readonly userId: FieldRef<"Space", 'Int'>
    readonly mediaId: FieldRef<"Space", 'Int'>
    readonly createdAt: FieldRef<"Space", 'DateTime'>
    readonly updatedAt: FieldRef<"Space", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Space findUnique
   */
  export type SpaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space findUniqueOrThrow
   */
  export type SpaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space findFirst
   */
  export type SpaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spaces.
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spaces.
     */
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Space findFirstOrThrow
   */
  export type SpaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spaces.
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spaces.
     */
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Space findMany
   */
  export type SpaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Spaces to fetch.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Spaces.
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Space create
   */
  export type SpaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Space.
     */
    data: XOR<SpaceCreateInput, SpaceUncheckedCreateInput>
  }

  /**
   * Space createMany
   */
  export type SpaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Spaces.
     */
    data: SpaceCreateManyInput | SpaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Space update
   */
  export type SpaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Space.
     */
    data: XOR<SpaceUpdateInput, SpaceUncheckedUpdateInput>
    /**
     * Choose, which Space to update.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space updateMany
   */
  export type SpaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Spaces.
     */
    data: XOR<SpaceUpdateManyMutationInput, SpaceUncheckedUpdateManyInput>
    /**
     * Filter which Spaces to update
     */
    where?: SpaceWhereInput
    /**
     * Limit how many Spaces to update.
     */
    limit?: number
  }

  /**
   * Space upsert
   */
  export type SpaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Space to update in case it exists.
     */
    where: SpaceWhereUniqueInput
    /**
     * In case the Space found by the `where` argument doesn't exist, create a new Space with this data.
     */
    create: XOR<SpaceCreateInput, SpaceUncheckedCreateInput>
    /**
     * In case the Space was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpaceUpdateInput, SpaceUncheckedUpdateInput>
  }

  /**
   * Space delete
   */
  export type SpaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter which Space to delete.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space deleteMany
   */
  export type SpaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spaces to delete
     */
    where?: SpaceWhereInput
    /**
     * Limit how many Spaces to delete.
     */
    limit?: number
  }

  /**
   * Space.parent
   */
  export type Space$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    where?: SpaceWhereInput
  }

  /**
   * Space.children
   */
  export type Space$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    where?: SpaceWhereInput
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    cursor?: SpaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Space.media
   */
  export type Space$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Media
     */
    omit?: MediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
  }

  /**
   * Space.uploadDetails
   */
  export type Space$uploadDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaUploadDetail
     */
    select?: MediaUploadDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaUploadDetail
     */
    omit?: MediaUploadDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaUploadDetailInclude<ExtArgs> | null
    where?: MediaUploadDetailWhereInput
    orderBy?: MediaUploadDetailOrderByWithRelationInput | MediaUploadDetailOrderByWithRelationInput[]
    cursor?: MediaUploadDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaUploadDetailScalarFieldEnum | MediaUploadDetailScalarFieldEnum[]
  }

  /**
   * Space without action
   */
  export type SpaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    roleId: 'roleId',
    slug: 'slug',
    profilePicture: 'profilePicture',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    fullNameKh: 'fullNameKh',
    fullNameEn: 'fullNameEn',
    gender: 'gender',
    generalDepartment: 'generalDepartment',
    department: 'department',
    office: 'office',
    phoneNumber: 'phoneNumber',
    currentRole: 'currentRole'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    slug: 'slug',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const PermissionModuleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    label: 'label',
    description: 'description',
    slug: 'slug',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PermissionModuleScalarFieldEnum = (typeof PermissionModuleScalarFieldEnum)[keyof typeof PermissionModuleScalarFieldEnum]


  export const RolePermissionScalarFieldEnum: {
    roleId: 'roleId',
    moduleId: 'moduleId',
    create: 'create',
    read: 'read',
    update: 'update',
    delete: 'delete',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    slug: 'slug'
  };

  export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum]


  export const BucketScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    createdById: 'createdById',
    accessKeyName: 'accessKeyName',
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    permission: 'permission',
    isAvailable: 'isAvailable',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BucketScalarFieldEnum = (typeof BucketScalarFieldEnum)[keyof typeof BucketScalarFieldEnum]


  export const MediaScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    filename: 'filename',
    storedFilename: 'storedFilename',
    url: 'url',
    bucketId: 'bucketId',
    path: 'path',
    fileType: 'fileType',
    mimetype: 'mimetype',
    extension: 'extension',
    size: 'size',
    title: 'title',
    altText: 'altText',
    description: 'description',
    uploadedById: 'uploadedById',
    isVisibility: 'isVisibility',
    isAccessible: 'isAccessible',
    width: 'width',
    height: 'height',
    uploadedAt: 'uploadedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MediaScalarFieldEnum = (typeof MediaScalarFieldEnum)[keyof typeof MediaScalarFieldEnum]


  export const MediaUploadScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type MediaUploadScalarFieldEnum = (typeof MediaUploadScalarFieldEnum)[keyof typeof MediaUploadScalarFieldEnum]


  export const MediaUploadDetailScalarFieldEnum: {
    id: 'id',
    mediaUploadId: 'mediaUploadId',
    mediaId: 'mediaId',
    spaceId: 'spaceId',
    createdAt: 'createdAt'
  };

  export type MediaUploadDetailScalarFieldEnum = (typeof MediaUploadDetailScalarFieldEnum)[keyof typeof MediaUploadDetailScalarFieldEnum]


  export const SpaceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    parentId: 'parentId',
    isAvailable: 'isAvailable',
    uploadedAt: 'uploadedAt',
    bucketId: 'bucketId',
    userId: 'userId',
    mediaId: 'mediaId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SpaceScalarFieldEnum = (typeof SpaceScalarFieldEnum)[keyof typeof SpaceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    email: 'email',
    name: 'name',
    password: 'password',
    slug: 'slug',
    profilePicture: 'profilePicture',
    fullNameKh: 'fullNameKh',
    fullNameEn: 'fullNameEn',
    generalDepartment: 'generalDepartment',
    department: 'department',
    office: 'office',
    phoneNumber: 'phoneNumber',
    currentRole: 'currentRole'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const RoleOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description',
    slug: 'slug'
  };

  export type RoleOrderByRelevanceFieldEnum = (typeof RoleOrderByRelevanceFieldEnum)[keyof typeof RoleOrderByRelevanceFieldEnum]


  export const PermissionModuleOrderByRelevanceFieldEnum: {
    name: 'name',
    label: 'label',
    description: 'description',
    slug: 'slug'
  };

  export type PermissionModuleOrderByRelevanceFieldEnum = (typeof PermissionModuleOrderByRelevanceFieldEnum)[keyof typeof PermissionModuleOrderByRelevanceFieldEnum]


  export const RolePermissionOrderByRelevanceFieldEnum: {
    slug: 'slug'
  };

  export type RolePermissionOrderByRelevanceFieldEnum = (typeof RolePermissionOrderByRelevanceFieldEnum)[keyof typeof RolePermissionOrderByRelevanceFieldEnum]


  export const BucketOrderByRelevanceFieldEnum: {
    name: 'name',
    slug: 'slug',
    accessKeyName: 'accessKeyName',
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey'
  };

  export type BucketOrderByRelevanceFieldEnum = (typeof BucketOrderByRelevanceFieldEnum)[keyof typeof BucketOrderByRelevanceFieldEnum]


  export const MediaOrderByRelevanceFieldEnum: {
    slug: 'slug',
    filename: 'filename',
    storedFilename: 'storedFilename',
    url: 'url',
    path: 'path',
    mimetype: 'mimetype',
    extension: 'extension',
    title: 'title',
    altText: 'altText',
    description: 'description'
  };

  export type MediaOrderByRelevanceFieldEnum = (typeof MediaOrderByRelevanceFieldEnum)[keyof typeof MediaOrderByRelevanceFieldEnum]


  export const MediaUploadOrderByRelevanceFieldEnum: {
    slug: 'slug'
  };

  export type MediaUploadOrderByRelevanceFieldEnum = (typeof MediaUploadOrderByRelevanceFieldEnum)[keyof typeof MediaUploadOrderByRelevanceFieldEnum]


  export const SpaceOrderByRelevanceFieldEnum: {
    name: 'name',
    slug: 'slug'
  };

  export type SpaceOrderByRelevanceFieldEnum = (typeof SpaceOrderByRelevanceFieldEnum)[keyof typeof SpaceOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'BucketPermission'
   */
  export type EnumBucketPermissionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BucketPermission'>
    


  /**
   * Reference to a field of type 'Visibility'
   */
  export type EnumVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Visibility'>
    


  /**
   * Reference to a field of type 'MediaType'
   */
  export type EnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    roleId?: IntNullableFilter<"User"> | number | null
    slug?: StringFilter<"User"> | string
    profilePicture?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    fullNameKh?: StringNullableFilter<"User"> | string | null
    fullNameEn?: StringNullableFilter<"User"> | string | null
    gender?: EnumGenderNullableFilter<"User"> | $Enums.Gender | null
    generalDepartment?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    office?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    currentRole?: StringNullableFilter<"User"> | string | null
    role?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
    mediasUploaded?: MediaListRelationFilter
    mediaUploads?: MediaUploadListRelationFilter
    spaces?: SpaceListRelationFilter
    buckets?: BucketListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    roleId?: SortOrderInput | SortOrder
    slug?: SortOrder
    profilePicture?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fullNameKh?: SortOrderInput | SortOrder
    fullNameEn?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    generalDepartment?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    office?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    currentRole?: SortOrderInput | SortOrder
    role?: RoleOrderByWithRelationInput
    mediasUploaded?: MediaOrderByRelationAggregateInput
    mediaUploads?: MediaUploadOrderByRelationAggregateInput
    spaces?: SpaceOrderByRelationAggregateInput
    buckets?: BucketOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    slug?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    roleId?: IntNullableFilter<"User"> | number | null
    profilePicture?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    fullNameKh?: StringNullableFilter<"User"> | string | null
    fullNameEn?: StringNullableFilter<"User"> | string | null
    gender?: EnumGenderNullableFilter<"User"> | $Enums.Gender | null
    generalDepartment?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    office?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    currentRole?: StringNullableFilter<"User"> | string | null
    role?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
    mediasUploaded?: MediaListRelationFilter
    mediaUploads?: MediaUploadListRelationFilter
    spaces?: SpaceListRelationFilter
    buckets?: BucketListRelationFilter
  }, "id" | "email" | "slug">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    roleId?: SortOrderInput | SortOrder
    slug?: SortOrder
    profilePicture?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fullNameKh?: SortOrderInput | SortOrder
    fullNameEn?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    generalDepartment?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    office?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    currentRole?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    roleId?: IntNullableWithAggregatesFilter<"User"> | number | null
    slug?: StringWithAggregatesFilter<"User"> | string
    profilePicture?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    fullNameKh?: StringNullableWithAggregatesFilter<"User"> | string | null
    fullNameEn?: StringNullableWithAggregatesFilter<"User"> | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"User"> | $Enums.Gender | null
    generalDepartment?: StringNullableWithAggregatesFilter<"User"> | string | null
    department?: StringNullableWithAggregatesFilter<"User"> | string | null
    office?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    currentRole?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: IntFilter<"Role"> | number
    name?: StringFilter<"Role"> | string
    description?: StringNullableFilter<"Role"> | string | null
    slug?: StringFilter<"Role"> | string
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserListRelationFilter
    permissions?: RolePermissionListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    permissions?: RolePermissionOrderByRelationAggregateInput
    _relevance?: RoleOrderByRelevanceInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    description?: StringNullableFilter<"Role"> | string | null
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserListRelationFilter
    permissions?: RolePermissionListRelationFilter
  }, "id" | "name" | "slug">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _avg?: RoleAvgOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
    _sum?: RoleSumOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Role"> | number
    name?: StringWithAggregatesFilter<"Role"> | string
    description?: StringNullableWithAggregatesFilter<"Role"> | string | null
    slug?: StringWithAggregatesFilter<"Role"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type PermissionModuleWhereInput = {
    AND?: PermissionModuleWhereInput | PermissionModuleWhereInput[]
    OR?: PermissionModuleWhereInput[]
    NOT?: PermissionModuleWhereInput | PermissionModuleWhereInput[]
    id?: IntFilter<"PermissionModule"> | number
    name?: StringFilter<"PermissionModule"> | string
    label?: StringFilter<"PermissionModule"> | string
    description?: StringNullableFilter<"PermissionModule"> | string | null
    slug?: StringFilter<"PermissionModule"> | string
    createdAt?: DateTimeFilter<"PermissionModule"> | Date | string
    updatedAt?: DateTimeFilter<"PermissionModule"> | Date | string
    roles?: RolePermissionListRelationFilter
  }

  export type PermissionModuleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    description?: SortOrderInput | SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roles?: RolePermissionOrderByRelationAggregateInput
    _relevance?: PermissionModuleOrderByRelevanceInput
  }

  export type PermissionModuleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: PermissionModuleWhereInput | PermissionModuleWhereInput[]
    OR?: PermissionModuleWhereInput[]
    NOT?: PermissionModuleWhereInput | PermissionModuleWhereInput[]
    label?: StringFilter<"PermissionModule"> | string
    description?: StringNullableFilter<"PermissionModule"> | string | null
    createdAt?: DateTimeFilter<"PermissionModule"> | Date | string
    updatedAt?: DateTimeFilter<"PermissionModule"> | Date | string
    roles?: RolePermissionListRelationFilter
  }, "id" | "name" | "slug">

  export type PermissionModuleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    description?: SortOrderInput | SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PermissionModuleCountOrderByAggregateInput
    _avg?: PermissionModuleAvgOrderByAggregateInput
    _max?: PermissionModuleMaxOrderByAggregateInput
    _min?: PermissionModuleMinOrderByAggregateInput
    _sum?: PermissionModuleSumOrderByAggregateInput
  }

  export type PermissionModuleScalarWhereWithAggregatesInput = {
    AND?: PermissionModuleScalarWhereWithAggregatesInput | PermissionModuleScalarWhereWithAggregatesInput[]
    OR?: PermissionModuleScalarWhereWithAggregatesInput[]
    NOT?: PermissionModuleScalarWhereWithAggregatesInput | PermissionModuleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PermissionModule"> | number
    name?: StringWithAggregatesFilter<"PermissionModule"> | string
    label?: StringWithAggregatesFilter<"PermissionModule"> | string
    description?: StringNullableWithAggregatesFilter<"PermissionModule"> | string | null
    slug?: StringWithAggregatesFilter<"PermissionModule"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PermissionModule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PermissionModule"> | Date | string
  }

  export type RolePermissionWhereInput = {
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[]
    OR?: RolePermissionWhereInput[]
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[]
    roleId?: IntFilter<"RolePermission"> | number
    moduleId?: IntFilter<"RolePermission"> | number
    create?: BoolFilter<"RolePermission"> | boolean
    read?: BoolFilter<"RolePermission"> | boolean
    update?: BoolFilter<"RolePermission"> | boolean
    delete?: BoolFilter<"RolePermission"> | boolean
    createdAt?: DateTimeFilter<"RolePermission"> | Date | string
    updatedAt?: DateTimeFilter<"RolePermission"> | Date | string
    slug?: StringFilter<"RolePermission"> | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    module?: XOR<PermissionModuleScalarRelationFilter, PermissionModuleWhereInput>
  }

  export type RolePermissionOrderByWithRelationInput = {
    roleId?: SortOrder
    moduleId?: SortOrder
    create?: SortOrder
    read?: SortOrder
    update?: SortOrder
    delete?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    role?: RoleOrderByWithRelationInput
    module?: PermissionModuleOrderByWithRelationInput
    _relevance?: RolePermissionOrderByRelevanceInput
  }

  export type RolePermissionWhereUniqueInput = Prisma.AtLeast<{
    slug?: string
    roleId_moduleId?: RolePermissionRoleIdModuleIdCompoundUniqueInput
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[]
    OR?: RolePermissionWhereInput[]
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[]
    roleId?: IntFilter<"RolePermission"> | number
    moduleId?: IntFilter<"RolePermission"> | number
    create?: BoolFilter<"RolePermission"> | boolean
    read?: BoolFilter<"RolePermission"> | boolean
    update?: BoolFilter<"RolePermission"> | boolean
    delete?: BoolFilter<"RolePermission"> | boolean
    createdAt?: DateTimeFilter<"RolePermission"> | Date | string
    updatedAt?: DateTimeFilter<"RolePermission"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    module?: XOR<PermissionModuleScalarRelationFilter, PermissionModuleWhereInput>
  }, "roleId_moduleId" | "slug">

  export type RolePermissionOrderByWithAggregationInput = {
    roleId?: SortOrder
    moduleId?: SortOrder
    create?: SortOrder
    read?: SortOrder
    update?: SortOrder
    delete?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    _count?: RolePermissionCountOrderByAggregateInput
    _avg?: RolePermissionAvgOrderByAggregateInput
    _max?: RolePermissionMaxOrderByAggregateInput
    _min?: RolePermissionMinOrderByAggregateInput
    _sum?: RolePermissionSumOrderByAggregateInput
  }

  export type RolePermissionScalarWhereWithAggregatesInput = {
    AND?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[]
    OR?: RolePermissionScalarWhereWithAggregatesInput[]
    NOT?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[]
    roleId?: IntWithAggregatesFilter<"RolePermission"> | number
    moduleId?: IntWithAggregatesFilter<"RolePermission"> | number
    create?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    read?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    update?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    delete?: BoolWithAggregatesFilter<"RolePermission"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"RolePermission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RolePermission"> | Date | string
    slug?: StringWithAggregatesFilter<"RolePermission"> | string
  }

  export type BucketWhereInput = {
    AND?: BucketWhereInput | BucketWhereInput[]
    OR?: BucketWhereInput[]
    NOT?: BucketWhereInput | BucketWhereInput[]
    id?: IntFilter<"Bucket"> | number
    name?: StringFilter<"Bucket"> | string
    slug?: StringFilter<"Bucket"> | string
    createdById?: IntFilter<"Bucket"> | number
    accessKeyName?: StringFilter<"Bucket"> | string
    accessKeyId?: StringFilter<"Bucket"> | string
    secretAccessKey?: StringFilter<"Bucket"> | string
    permission?: EnumBucketPermissionFilter<"Bucket"> | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFilter<"Bucket"> | $Enums.Visibility
    createdAt?: DateTimeFilter<"Bucket"> | Date | string
    updatedAt?: DateTimeFilter<"Bucket"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    medias?: MediaListRelationFilter
    spaces?: SpaceListRelationFilter
  }

  export type BucketOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdById?: SortOrder
    accessKeyName?: SortOrder
    accessKeyId?: SortOrder
    secretAccessKey?: SortOrder
    permission?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    medias?: MediaOrderByRelationAggregateInput
    spaces?: SpaceOrderByRelationAggregateInput
    _relevance?: BucketOrderByRelevanceInput
  }

  export type BucketWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    accessKeyId?: string
    AND?: BucketWhereInput | BucketWhereInput[]
    OR?: BucketWhereInput[]
    NOT?: BucketWhereInput | BucketWhereInput[]
    createdById?: IntFilter<"Bucket"> | number
    accessKeyName?: StringFilter<"Bucket"> | string
    secretAccessKey?: StringFilter<"Bucket"> | string
    permission?: EnumBucketPermissionFilter<"Bucket"> | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFilter<"Bucket"> | $Enums.Visibility
    createdAt?: DateTimeFilter<"Bucket"> | Date | string
    updatedAt?: DateTimeFilter<"Bucket"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    medias?: MediaListRelationFilter
    spaces?: SpaceListRelationFilter
  }, "id" | "name" | "slug" | "accessKeyId">

  export type BucketOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdById?: SortOrder
    accessKeyName?: SortOrder
    accessKeyId?: SortOrder
    secretAccessKey?: SortOrder
    permission?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BucketCountOrderByAggregateInput
    _avg?: BucketAvgOrderByAggregateInput
    _max?: BucketMaxOrderByAggregateInput
    _min?: BucketMinOrderByAggregateInput
    _sum?: BucketSumOrderByAggregateInput
  }

  export type BucketScalarWhereWithAggregatesInput = {
    AND?: BucketScalarWhereWithAggregatesInput | BucketScalarWhereWithAggregatesInput[]
    OR?: BucketScalarWhereWithAggregatesInput[]
    NOT?: BucketScalarWhereWithAggregatesInput | BucketScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Bucket"> | number
    name?: StringWithAggregatesFilter<"Bucket"> | string
    slug?: StringWithAggregatesFilter<"Bucket"> | string
    createdById?: IntWithAggregatesFilter<"Bucket"> | number
    accessKeyName?: StringWithAggregatesFilter<"Bucket"> | string
    accessKeyId?: StringWithAggregatesFilter<"Bucket"> | string
    secretAccessKey?: StringWithAggregatesFilter<"Bucket"> | string
    permission?: EnumBucketPermissionWithAggregatesFilter<"Bucket"> | $Enums.BucketPermission
    isAvailable?: EnumVisibilityWithAggregatesFilter<"Bucket"> | $Enums.Visibility
    createdAt?: DateTimeWithAggregatesFilter<"Bucket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bucket"> | Date | string
  }

  export type MediaWhereInput = {
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    id?: IntFilter<"Media"> | number
    slug?: StringFilter<"Media"> | string
    filename?: StringFilter<"Media"> | string
    storedFilename?: StringFilter<"Media"> | string
    url?: StringFilter<"Media"> | string
    bucketId?: IntFilter<"Media"> | number
    path?: StringNullableFilter<"Media"> | string | null
    fileType?: EnumMediaTypeFilter<"Media"> | $Enums.MediaType
    mimetype?: StringFilter<"Media"> | string
    extension?: StringFilter<"Media"> | string
    size?: IntFilter<"Media"> | number
    title?: StringNullableFilter<"Media"> | string | null
    altText?: StringNullableFilter<"Media"> | string | null
    description?: StringNullableFilter<"Media"> | string | null
    uploadedById?: IntFilter<"Media"> | number
    isVisibility?: EnumVisibilityFilter<"Media"> | $Enums.Visibility
    isAccessible?: EnumVisibilityFilter<"Media"> | $Enums.Visibility
    width?: IntNullableFilter<"Media"> | number | null
    height?: IntNullableFilter<"Media"> | number | null
    uploadedAt?: DateTimeFilter<"Media"> | Date | string
    createdAt?: DateTimeFilter<"Media"> | Date | string
    updatedAt?: DateTimeFilter<"Media"> | Date | string
    bucket?: XOR<BucketScalarRelationFilter, BucketWhereInput>
    uploadedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    spaces?: SpaceListRelationFilter
    mediaDetails?: MediaUploadDetailListRelationFilter
  }

  export type MediaOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    filename?: SortOrder
    storedFilename?: SortOrder
    url?: SortOrder
    bucketId?: SortOrder
    path?: SortOrderInput | SortOrder
    fileType?: SortOrder
    mimetype?: SortOrder
    extension?: SortOrder
    size?: SortOrder
    title?: SortOrderInput | SortOrder
    altText?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    uploadedById?: SortOrder
    isVisibility?: SortOrder
    isAccessible?: SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bucket?: BucketOrderByWithRelationInput
    uploadedBy?: UserOrderByWithRelationInput
    spaces?: SpaceOrderByRelationAggregateInput
    mediaDetails?: MediaUploadDetailOrderByRelationAggregateInput
    _relevance?: MediaOrderByRelevanceInput
  }

  export type MediaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    filename?: StringFilter<"Media"> | string
    storedFilename?: StringFilter<"Media"> | string
    url?: StringFilter<"Media"> | string
    bucketId?: IntFilter<"Media"> | number
    path?: StringNullableFilter<"Media"> | string | null
    fileType?: EnumMediaTypeFilter<"Media"> | $Enums.MediaType
    mimetype?: StringFilter<"Media"> | string
    extension?: StringFilter<"Media"> | string
    size?: IntFilter<"Media"> | number
    title?: StringNullableFilter<"Media"> | string | null
    altText?: StringNullableFilter<"Media"> | string | null
    description?: StringNullableFilter<"Media"> | string | null
    uploadedById?: IntFilter<"Media"> | number
    isVisibility?: EnumVisibilityFilter<"Media"> | $Enums.Visibility
    isAccessible?: EnumVisibilityFilter<"Media"> | $Enums.Visibility
    width?: IntNullableFilter<"Media"> | number | null
    height?: IntNullableFilter<"Media"> | number | null
    uploadedAt?: DateTimeFilter<"Media"> | Date | string
    createdAt?: DateTimeFilter<"Media"> | Date | string
    updatedAt?: DateTimeFilter<"Media"> | Date | string
    bucket?: XOR<BucketScalarRelationFilter, BucketWhereInput>
    uploadedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    spaces?: SpaceListRelationFilter
    mediaDetails?: MediaUploadDetailListRelationFilter
  }, "id" | "slug">

  export type MediaOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    filename?: SortOrder
    storedFilename?: SortOrder
    url?: SortOrder
    bucketId?: SortOrder
    path?: SortOrderInput | SortOrder
    fileType?: SortOrder
    mimetype?: SortOrder
    extension?: SortOrder
    size?: SortOrder
    title?: SortOrderInput | SortOrder
    altText?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    uploadedById?: SortOrder
    isVisibility?: SortOrder
    isAccessible?: SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MediaCountOrderByAggregateInput
    _avg?: MediaAvgOrderByAggregateInput
    _max?: MediaMaxOrderByAggregateInput
    _min?: MediaMinOrderByAggregateInput
    _sum?: MediaSumOrderByAggregateInput
  }

  export type MediaScalarWhereWithAggregatesInput = {
    AND?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    OR?: MediaScalarWhereWithAggregatesInput[]
    NOT?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Media"> | number
    slug?: StringWithAggregatesFilter<"Media"> | string
    filename?: StringWithAggregatesFilter<"Media"> | string
    storedFilename?: StringWithAggregatesFilter<"Media"> | string
    url?: StringWithAggregatesFilter<"Media"> | string
    bucketId?: IntWithAggregatesFilter<"Media"> | number
    path?: StringNullableWithAggregatesFilter<"Media"> | string | null
    fileType?: EnumMediaTypeWithAggregatesFilter<"Media"> | $Enums.MediaType
    mimetype?: StringWithAggregatesFilter<"Media"> | string
    extension?: StringWithAggregatesFilter<"Media"> | string
    size?: IntWithAggregatesFilter<"Media"> | number
    title?: StringNullableWithAggregatesFilter<"Media"> | string | null
    altText?: StringNullableWithAggregatesFilter<"Media"> | string | null
    description?: StringNullableWithAggregatesFilter<"Media"> | string | null
    uploadedById?: IntWithAggregatesFilter<"Media"> | number
    isVisibility?: EnumVisibilityWithAggregatesFilter<"Media"> | $Enums.Visibility
    isAccessible?: EnumVisibilityWithAggregatesFilter<"Media"> | $Enums.Visibility
    width?: IntNullableWithAggregatesFilter<"Media"> | number | null
    height?: IntNullableWithAggregatesFilter<"Media"> | number | null
    uploadedAt?: DateTimeWithAggregatesFilter<"Media"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Media"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Media"> | Date | string
  }

  export type MediaUploadWhereInput = {
    AND?: MediaUploadWhereInput | MediaUploadWhereInput[]
    OR?: MediaUploadWhereInput[]
    NOT?: MediaUploadWhereInput | MediaUploadWhereInput[]
    id?: IntFilter<"MediaUpload"> | number
    slug?: StringFilter<"MediaUpload"> | string
    userId?: IntFilter<"MediaUpload"> | number
    createdAt?: DateTimeFilter<"MediaUpload"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    details?: MediaUploadDetailListRelationFilter
  }

  export type MediaUploadOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    details?: MediaUploadDetailOrderByRelationAggregateInput
    _relevance?: MediaUploadOrderByRelevanceInput
  }

  export type MediaUploadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: MediaUploadWhereInput | MediaUploadWhereInput[]
    OR?: MediaUploadWhereInput[]
    NOT?: MediaUploadWhereInput | MediaUploadWhereInput[]
    userId?: IntFilter<"MediaUpload"> | number
    createdAt?: DateTimeFilter<"MediaUpload"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    details?: MediaUploadDetailListRelationFilter
  }, "id" | "slug">

  export type MediaUploadOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: MediaUploadCountOrderByAggregateInput
    _avg?: MediaUploadAvgOrderByAggregateInput
    _max?: MediaUploadMaxOrderByAggregateInput
    _min?: MediaUploadMinOrderByAggregateInput
    _sum?: MediaUploadSumOrderByAggregateInput
  }

  export type MediaUploadScalarWhereWithAggregatesInput = {
    AND?: MediaUploadScalarWhereWithAggregatesInput | MediaUploadScalarWhereWithAggregatesInput[]
    OR?: MediaUploadScalarWhereWithAggregatesInput[]
    NOT?: MediaUploadScalarWhereWithAggregatesInput | MediaUploadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MediaUpload"> | number
    slug?: StringWithAggregatesFilter<"MediaUpload"> | string
    userId?: IntWithAggregatesFilter<"MediaUpload"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MediaUpload"> | Date | string
  }

  export type MediaUploadDetailWhereInput = {
    AND?: MediaUploadDetailWhereInput | MediaUploadDetailWhereInput[]
    OR?: MediaUploadDetailWhereInput[]
    NOT?: MediaUploadDetailWhereInput | MediaUploadDetailWhereInput[]
    id?: IntFilter<"MediaUploadDetail"> | number
    mediaUploadId?: IntFilter<"MediaUploadDetail"> | number
    mediaId?: IntFilter<"MediaUploadDetail"> | number
    spaceId?: IntNullableFilter<"MediaUploadDetail"> | number | null
    createdAt?: DateTimeFilter<"MediaUploadDetail"> | Date | string
    media?: XOR<MediaScalarRelationFilter, MediaWhereInput>
    mediaUpload?: XOR<MediaUploadScalarRelationFilter, MediaUploadWhereInput>
    space?: XOR<SpaceNullableScalarRelationFilter, SpaceWhereInput> | null
  }

  export type MediaUploadDetailOrderByWithRelationInput = {
    id?: SortOrder
    mediaUploadId?: SortOrder
    mediaId?: SortOrder
    spaceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    media?: MediaOrderByWithRelationInput
    mediaUpload?: MediaUploadOrderByWithRelationInput
    space?: SpaceOrderByWithRelationInput
  }

  export type MediaUploadDetailWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MediaUploadDetailWhereInput | MediaUploadDetailWhereInput[]
    OR?: MediaUploadDetailWhereInput[]
    NOT?: MediaUploadDetailWhereInput | MediaUploadDetailWhereInput[]
    mediaUploadId?: IntFilter<"MediaUploadDetail"> | number
    mediaId?: IntFilter<"MediaUploadDetail"> | number
    spaceId?: IntNullableFilter<"MediaUploadDetail"> | number | null
    createdAt?: DateTimeFilter<"MediaUploadDetail"> | Date | string
    media?: XOR<MediaScalarRelationFilter, MediaWhereInput>
    mediaUpload?: XOR<MediaUploadScalarRelationFilter, MediaUploadWhereInput>
    space?: XOR<SpaceNullableScalarRelationFilter, SpaceWhereInput> | null
  }, "id">

  export type MediaUploadDetailOrderByWithAggregationInput = {
    id?: SortOrder
    mediaUploadId?: SortOrder
    mediaId?: SortOrder
    spaceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MediaUploadDetailCountOrderByAggregateInput
    _avg?: MediaUploadDetailAvgOrderByAggregateInput
    _max?: MediaUploadDetailMaxOrderByAggregateInput
    _min?: MediaUploadDetailMinOrderByAggregateInput
    _sum?: MediaUploadDetailSumOrderByAggregateInput
  }

  export type MediaUploadDetailScalarWhereWithAggregatesInput = {
    AND?: MediaUploadDetailScalarWhereWithAggregatesInput | MediaUploadDetailScalarWhereWithAggregatesInput[]
    OR?: MediaUploadDetailScalarWhereWithAggregatesInput[]
    NOT?: MediaUploadDetailScalarWhereWithAggregatesInput | MediaUploadDetailScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MediaUploadDetail"> | number
    mediaUploadId?: IntWithAggregatesFilter<"MediaUploadDetail"> | number
    mediaId?: IntWithAggregatesFilter<"MediaUploadDetail"> | number
    spaceId?: IntNullableWithAggregatesFilter<"MediaUploadDetail"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"MediaUploadDetail"> | Date | string
  }

  export type SpaceWhereInput = {
    AND?: SpaceWhereInput | SpaceWhereInput[]
    OR?: SpaceWhereInput[]
    NOT?: SpaceWhereInput | SpaceWhereInput[]
    id?: IntFilter<"Space"> | number
    name?: StringFilter<"Space"> | string
    slug?: StringFilter<"Space"> | string
    parentId?: IntNullableFilter<"Space"> | number | null
    isAvailable?: EnumVisibilityFilter<"Space"> | $Enums.Visibility
    uploadedAt?: DateTimeNullableFilter<"Space"> | Date | string | null
    bucketId?: IntFilter<"Space"> | number
    userId?: IntFilter<"Space"> | number
    mediaId?: IntNullableFilter<"Space"> | number | null
    createdAt?: DateTimeFilter<"Space"> | Date | string
    updatedAt?: DateTimeFilter<"Space"> | Date | string
    bucket?: XOR<BucketScalarRelationFilter, BucketWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    parent?: XOR<SpaceNullableScalarRelationFilter, SpaceWhereInput> | null
    children?: SpaceListRelationFilter
    media?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    uploadDetails?: MediaUploadDetailListRelationFilter
  }

  export type SpaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentId?: SortOrderInput | SortOrder
    isAvailable?: SortOrder
    uploadedAt?: SortOrderInput | SortOrder
    bucketId?: SortOrder
    userId?: SortOrder
    mediaId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bucket?: BucketOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    parent?: SpaceOrderByWithRelationInput
    children?: SpaceOrderByRelationAggregateInput
    media?: MediaOrderByWithRelationInput
    uploadDetails?: MediaUploadDetailOrderByRelationAggregateInput
    _relevance?: SpaceOrderByRelevanceInput
  }

  export type SpaceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: SpaceWhereInput | SpaceWhereInput[]
    OR?: SpaceWhereInput[]
    NOT?: SpaceWhereInput | SpaceWhereInput[]
    name?: StringFilter<"Space"> | string
    parentId?: IntNullableFilter<"Space"> | number | null
    isAvailable?: EnumVisibilityFilter<"Space"> | $Enums.Visibility
    uploadedAt?: DateTimeNullableFilter<"Space"> | Date | string | null
    bucketId?: IntFilter<"Space"> | number
    userId?: IntFilter<"Space"> | number
    mediaId?: IntNullableFilter<"Space"> | number | null
    createdAt?: DateTimeFilter<"Space"> | Date | string
    updatedAt?: DateTimeFilter<"Space"> | Date | string
    bucket?: XOR<BucketScalarRelationFilter, BucketWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    parent?: XOR<SpaceNullableScalarRelationFilter, SpaceWhereInput> | null
    children?: SpaceListRelationFilter
    media?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    uploadDetails?: MediaUploadDetailListRelationFilter
  }, "id" | "slug">

  export type SpaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentId?: SortOrderInput | SortOrder
    isAvailable?: SortOrder
    uploadedAt?: SortOrderInput | SortOrder
    bucketId?: SortOrder
    userId?: SortOrder
    mediaId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SpaceCountOrderByAggregateInput
    _avg?: SpaceAvgOrderByAggregateInput
    _max?: SpaceMaxOrderByAggregateInput
    _min?: SpaceMinOrderByAggregateInput
    _sum?: SpaceSumOrderByAggregateInput
  }

  export type SpaceScalarWhereWithAggregatesInput = {
    AND?: SpaceScalarWhereWithAggregatesInput | SpaceScalarWhereWithAggregatesInput[]
    OR?: SpaceScalarWhereWithAggregatesInput[]
    NOT?: SpaceScalarWhereWithAggregatesInput | SpaceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Space"> | number
    name?: StringWithAggregatesFilter<"Space"> | string
    slug?: StringWithAggregatesFilter<"Space"> | string
    parentId?: IntNullableWithAggregatesFilter<"Space"> | number | null
    isAvailable?: EnumVisibilityWithAggregatesFilter<"Space"> | $Enums.Visibility
    uploadedAt?: DateTimeNullableWithAggregatesFilter<"Space"> | Date | string | null
    bucketId?: IntWithAggregatesFilter<"Space"> | number
    userId?: IntWithAggregatesFilter<"Space"> | number
    mediaId?: IntNullableWithAggregatesFilter<"Space"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Space"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Space"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    name: string
    password: string
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    role?: RoleCreateNestedOneWithoutUsersInput
    mediasUploaded?: MediaCreateNestedManyWithoutUploadedByInput
    mediaUploads?: MediaUploadCreateNestedManyWithoutUserInput
    spaces?: SpaceCreateNestedManyWithoutUserInput
    buckets?: BucketCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name: string
    password: string
    roleId?: number | null
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    mediasUploaded?: MediaUncheckedCreateNestedManyWithoutUploadedByInput
    mediaUploads?: MediaUploadUncheckedCreateNestedManyWithoutUserInput
    spaces?: SpaceUncheckedCreateNestedManyWithoutUserInput
    buckets?: BucketUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    role?: RoleUpdateOneWithoutUsersNestedInput
    mediasUploaded?: MediaUpdateManyWithoutUploadedByNestedInput
    mediaUploads?: MediaUploadUpdateManyWithoutUserNestedInput
    spaces?: SpaceUpdateManyWithoutUserNestedInput
    buckets?: BucketUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    mediasUploaded?: MediaUncheckedUpdateManyWithoutUploadedByNestedInput
    mediaUploads?: MediaUploadUncheckedUpdateManyWithoutUserNestedInput
    spaces?: SpaceUncheckedUpdateManyWithoutUserNestedInput
    buckets?: BucketUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    name: string
    password: string
    roleId?: number | null
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoleCreateInput = {
    name: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutRoleInput
    permissions?: RolePermissionCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutRoleInput
    permissions?: RolePermissionUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutRoleNestedInput
    permissions?: RolePermissionUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutRoleNestedInput
    permissions?: RolePermissionUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionModuleCreateInput = {
    name: string
    label: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RolePermissionCreateNestedManyWithoutModuleInput
  }

  export type PermissionModuleUncheckedCreateInput = {
    id?: number
    name: string
    label: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RolePermissionUncheckedCreateNestedManyWithoutModuleInput
  }

  export type PermissionModuleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RolePermissionUpdateManyWithoutModuleNestedInput
  }

  export type PermissionModuleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RolePermissionUncheckedUpdateManyWithoutModuleNestedInput
  }

  export type PermissionModuleCreateManyInput = {
    id?: number
    name: string
    label: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionModuleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionModuleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateInput = {
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slug?: string
    role: RoleCreateNestedOneWithoutPermissionsInput
    module: PermissionModuleCreateNestedOneWithoutRolesInput
  }

  export type RolePermissionUncheckedCreateInput = {
    roleId: number
    moduleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slug?: string
  }

  export type RolePermissionUpdateInput = {
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: RoleUpdateOneRequiredWithoutPermissionsNestedInput
    module?: PermissionModuleUpdateOneRequiredWithoutRolesNestedInput
  }

  export type RolePermissionUncheckedUpdateInput = {
    roleId?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type RolePermissionCreateManyInput = {
    roleId: number
    moduleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slug?: string
  }

  export type RolePermissionUpdateManyMutationInput = {
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type RolePermissionUncheckedUpdateManyInput = {
    roleId?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type BucketCreateInput = {
    name: string
    slug?: string
    accessKeyName: string
    accessKeyId: string
    secretAccessKey: string
    permission?: $Enums.BucketPermission
    isAvailable?: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutBucketsInput
    medias?: MediaCreateNestedManyWithoutBucketInput
    spaces?: SpaceCreateNestedManyWithoutBucketInput
  }

  export type BucketUncheckedCreateInput = {
    id?: number
    name: string
    slug?: string
    createdById: number
    accessKeyName: string
    accessKeyId: string
    secretAccessKey: string
    permission?: $Enums.BucketPermission
    isAvailable?: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    medias?: MediaUncheckedCreateNestedManyWithoutBucketInput
    spaces?: SpaceUncheckedCreateNestedManyWithoutBucketInput
  }

  export type BucketUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    accessKeyName?: StringFieldUpdateOperationsInput | string
    accessKeyId?: StringFieldUpdateOperationsInput | string
    secretAccessKey?: StringFieldUpdateOperationsInput | string
    permission?: EnumBucketPermissionFieldUpdateOperationsInput | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutBucketsNestedInput
    medias?: MediaUpdateManyWithoutBucketNestedInput
    spaces?: SpaceUpdateManyWithoutBucketNestedInput
  }

  export type BucketUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdById?: IntFieldUpdateOperationsInput | number
    accessKeyName?: StringFieldUpdateOperationsInput | string
    accessKeyId?: StringFieldUpdateOperationsInput | string
    secretAccessKey?: StringFieldUpdateOperationsInput | string
    permission?: EnumBucketPermissionFieldUpdateOperationsInput | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: MediaUncheckedUpdateManyWithoutBucketNestedInput
    spaces?: SpaceUncheckedUpdateManyWithoutBucketNestedInput
  }

  export type BucketCreateManyInput = {
    id?: number
    name: string
    slug?: string
    createdById: number
    accessKeyName: string
    accessKeyId: string
    secretAccessKey: string
    permission?: $Enums.BucketPermission
    isAvailable?: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BucketUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    accessKeyName?: StringFieldUpdateOperationsInput | string
    accessKeyId?: StringFieldUpdateOperationsInput | string
    secretAccessKey?: StringFieldUpdateOperationsInput | string
    permission?: EnumBucketPermissionFieldUpdateOperationsInput | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BucketUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdById?: IntFieldUpdateOperationsInput | number
    accessKeyName?: StringFieldUpdateOperationsInput | string
    accessKeyId?: StringFieldUpdateOperationsInput | string
    secretAccessKey?: StringFieldUpdateOperationsInput | string
    permission?: EnumBucketPermissionFieldUpdateOperationsInput | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaCreateInput = {
    slug?: string
    filename: string
    storedFilename: string
    url: string
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    bucket: BucketCreateNestedOneWithoutMediasInput
    uploadedBy: UserCreateNestedOneWithoutMediasUploadedInput
    spaces?: SpaceCreateNestedManyWithoutMediaInput
    mediaDetails?: MediaUploadDetailCreateNestedManyWithoutMediaInput
  }

  export type MediaUncheckedCreateInput = {
    id?: number
    slug?: string
    filename: string
    storedFilename: string
    url: string
    bucketId: number
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    uploadedById: number
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    spaces?: SpaceUncheckedCreateNestedManyWithoutMediaInput
    mediaDetails?: MediaUploadDetailUncheckedCreateNestedManyWithoutMediaInput
  }

  export type MediaUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bucket?: BucketUpdateOneRequiredWithoutMediasNestedInput
    uploadedBy?: UserUpdateOneRequiredWithoutMediasUploadedNestedInput
    spaces?: SpaceUpdateManyWithoutMediaNestedInput
    mediaDetails?: MediaUploadDetailUpdateManyWithoutMediaNestedInput
  }

  export type MediaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    bucketId?: IntFieldUpdateOperationsInput | number
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: IntFieldUpdateOperationsInput | number
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    spaces?: SpaceUncheckedUpdateManyWithoutMediaNestedInput
    mediaDetails?: MediaUploadDetailUncheckedUpdateManyWithoutMediaNestedInput
  }

  export type MediaCreateManyInput = {
    id?: number
    slug?: string
    filename: string
    storedFilename: string
    url: string
    bucketId: number
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    uploadedById: number
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    bucketId?: IntFieldUpdateOperationsInput | number
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: IntFieldUpdateOperationsInput | number
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadCreateInput = {
    slug?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMediaUploadsInput
    details?: MediaUploadDetailCreateNestedManyWithoutMediaUploadInput
  }

  export type MediaUploadUncheckedCreateInput = {
    id?: number
    slug?: string
    userId: number
    createdAt?: Date | string
    details?: MediaUploadDetailUncheckedCreateNestedManyWithoutMediaUploadInput
  }

  export type MediaUploadUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMediaUploadsNestedInput
    details?: MediaUploadDetailUpdateManyWithoutMediaUploadNestedInput
  }

  export type MediaUploadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: MediaUploadDetailUncheckedUpdateManyWithoutMediaUploadNestedInput
  }

  export type MediaUploadCreateManyInput = {
    id?: number
    slug?: string
    userId: number
    createdAt?: Date | string
  }

  export type MediaUploadUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadDetailCreateInput = {
    createdAt?: Date | string
    media: MediaCreateNestedOneWithoutMediaDetailsInput
    mediaUpload: MediaUploadCreateNestedOneWithoutDetailsInput
    space?: SpaceCreateNestedOneWithoutUploadDetailsInput
  }

  export type MediaUploadDetailUncheckedCreateInput = {
    id?: number
    mediaUploadId: number
    mediaId: number
    spaceId?: number | null
    createdAt?: Date | string
  }

  export type MediaUploadDetailUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUpdateOneRequiredWithoutMediaDetailsNestedInput
    mediaUpload?: MediaUploadUpdateOneRequiredWithoutDetailsNestedInput
    space?: SpaceUpdateOneWithoutUploadDetailsNestedInput
  }

  export type MediaUploadDetailUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaUploadId?: IntFieldUpdateOperationsInput | number
    mediaId?: IntFieldUpdateOperationsInput | number
    spaceId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadDetailCreateManyInput = {
    id?: number
    mediaUploadId: number
    mediaId: number
    spaceId?: number | null
    createdAt?: Date | string
  }

  export type MediaUploadDetailUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadDetailUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaUploadId?: IntFieldUpdateOperationsInput | number
    mediaId?: IntFieldUpdateOperationsInput | number
    spaceId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpaceCreateInput = {
    name: string
    slug?: string
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bucket: BucketCreateNestedOneWithoutSpacesInput
    user: UserCreateNestedOneWithoutSpacesInput
    parent?: SpaceCreateNestedOneWithoutChildrenInput
    children?: SpaceCreateNestedManyWithoutParentInput
    media?: MediaCreateNestedOneWithoutSpacesInput
    uploadDetails?: MediaUploadDetailCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUncheckedCreateInput = {
    id?: number
    name: string
    slug?: string
    parentId?: number | null
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    bucketId: number
    userId: number
    mediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: SpaceUncheckedCreateNestedManyWithoutParentInput
    uploadDetails?: MediaUploadDetailUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bucket?: BucketUpdateOneRequiredWithoutSpacesNestedInput
    user?: UserUpdateOneRequiredWithoutSpacesNestedInput
    parent?: SpaceUpdateOneWithoutChildrenNestedInput
    children?: SpaceUpdateManyWithoutParentNestedInput
    media?: MediaUpdateOneWithoutSpacesNestedInput
    uploadDetails?: MediaUploadDetailUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bucketId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    mediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: SpaceUncheckedUpdateManyWithoutParentNestedInput
    uploadDetails?: MediaUploadDetailUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceCreateManyInput = {
    id?: number
    name: string
    slug?: string
    parentId?: number | null
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    bucketId: number
    userId: number
    mediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpaceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpaceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bucketId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    mediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | null
    notIn?: $Enums.Gender[] | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type RoleNullableScalarRelationFilter = {
    is?: RoleWhereInput | null
    isNot?: RoleWhereInput | null
  }

  export type MediaListRelationFilter = {
    every?: MediaWhereInput
    some?: MediaWhereInput
    none?: MediaWhereInput
  }

  export type MediaUploadListRelationFilter = {
    every?: MediaUploadWhereInput
    some?: MediaUploadWhereInput
    none?: MediaUploadWhereInput
  }

  export type SpaceListRelationFilter = {
    every?: SpaceWhereInput
    some?: SpaceWhereInput
    none?: SpaceWhereInput
  }

  export type BucketListRelationFilter = {
    every?: BucketWhereInput
    some?: BucketWhereInput
    none?: BucketWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MediaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MediaUploadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SpaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BucketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    roleId?: SortOrder
    slug?: SortOrder
    profilePicture?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fullNameKh?: SortOrder
    fullNameEn?: SortOrder
    gender?: SortOrder
    generalDepartment?: SortOrder
    department?: SortOrder
    office?: SortOrder
    phoneNumber?: SortOrder
    currentRole?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    roleId?: SortOrder
    slug?: SortOrder
    profilePicture?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fullNameKh?: SortOrder
    fullNameEn?: SortOrder
    gender?: SortOrder
    generalDepartment?: SortOrder
    department?: SortOrder
    office?: SortOrder
    phoneNumber?: SortOrder
    currentRole?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    roleId?: SortOrder
    slug?: SortOrder
    profilePicture?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fullNameKh?: SortOrder
    fullNameEn?: SortOrder
    gender?: SortOrder
    generalDepartment?: SortOrder
    department?: SortOrder
    office?: SortOrder
    phoneNumber?: SortOrder
    currentRole?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | null
    notIn?: $Enums.Gender[] | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type RolePermissionListRelationFilter = {
    every?: RolePermissionWhereInput
    some?: RolePermissionWhereInput
    none?: RolePermissionWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RolePermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleOrderByRelevanceInput = {
    fields: RoleOrderByRelevanceFieldEnum | RoleOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PermissionModuleOrderByRelevanceInput = {
    fields: PermissionModuleOrderByRelevanceFieldEnum | PermissionModuleOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PermissionModuleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionModuleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PermissionModuleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionModuleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionModuleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type PermissionModuleScalarRelationFilter = {
    is?: PermissionModuleWhereInput
    isNot?: PermissionModuleWhereInput
  }

  export type RolePermissionOrderByRelevanceInput = {
    fields: RolePermissionOrderByRelevanceFieldEnum | RolePermissionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RolePermissionRoleIdModuleIdCompoundUniqueInput = {
    roleId: number
    moduleId: number
  }

  export type RolePermissionCountOrderByAggregateInput = {
    roleId?: SortOrder
    moduleId?: SortOrder
    create?: SortOrder
    read?: SortOrder
    update?: SortOrder
    delete?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type RolePermissionAvgOrderByAggregateInput = {
    roleId?: SortOrder
    moduleId?: SortOrder
  }

  export type RolePermissionMaxOrderByAggregateInput = {
    roleId?: SortOrder
    moduleId?: SortOrder
    create?: SortOrder
    read?: SortOrder
    update?: SortOrder
    delete?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type RolePermissionMinOrderByAggregateInput = {
    roleId?: SortOrder
    moduleId?: SortOrder
    create?: SortOrder
    read?: SortOrder
    update?: SortOrder
    delete?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type RolePermissionSumOrderByAggregateInput = {
    roleId?: SortOrder
    moduleId?: SortOrder
  }

  export type EnumBucketPermissionFilter<$PrismaModel = never> = {
    equals?: $Enums.BucketPermission | EnumBucketPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.BucketPermission[]
    notIn?: $Enums.BucketPermission[]
    not?: NestedEnumBucketPermissionFilter<$PrismaModel> | $Enums.BucketPermission
  }

  export type EnumVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[]
    notIn?: $Enums.Visibility[]
    not?: NestedEnumVisibilityFilter<$PrismaModel> | $Enums.Visibility
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BucketOrderByRelevanceInput = {
    fields: BucketOrderByRelevanceFieldEnum | BucketOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BucketCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdById?: SortOrder
    accessKeyName?: SortOrder
    accessKeyId?: SortOrder
    secretAccessKey?: SortOrder
    permission?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BucketAvgOrderByAggregateInput = {
    id?: SortOrder
    createdById?: SortOrder
  }

  export type BucketMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdById?: SortOrder
    accessKeyName?: SortOrder
    accessKeyId?: SortOrder
    secretAccessKey?: SortOrder
    permission?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BucketMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdById?: SortOrder
    accessKeyName?: SortOrder
    accessKeyId?: SortOrder
    secretAccessKey?: SortOrder
    permission?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BucketSumOrderByAggregateInput = {
    id?: SortOrder
    createdById?: SortOrder
  }

  export type EnumBucketPermissionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BucketPermission | EnumBucketPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.BucketPermission[]
    notIn?: $Enums.BucketPermission[]
    not?: NestedEnumBucketPermissionWithAggregatesFilter<$PrismaModel> | $Enums.BucketPermission
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBucketPermissionFilter<$PrismaModel>
    _max?: NestedEnumBucketPermissionFilter<$PrismaModel>
  }

  export type EnumVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[]
    notIn?: $Enums.Visibility[]
    not?: NestedEnumVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.Visibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityFilter<$PrismaModel>
    _max?: NestedEnumVisibilityFilter<$PrismaModel>
  }

  export type EnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[]
    notIn?: $Enums.MediaType[]
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type BucketScalarRelationFilter = {
    is?: BucketWhereInput
    isNot?: BucketWhereInput
  }

  export type MediaUploadDetailListRelationFilter = {
    every?: MediaUploadDetailWhereInput
    some?: MediaUploadDetailWhereInput
    none?: MediaUploadDetailWhereInput
  }

  export type MediaUploadDetailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MediaOrderByRelevanceInput = {
    fields: MediaOrderByRelevanceFieldEnum | MediaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MediaCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    filename?: SortOrder
    storedFilename?: SortOrder
    url?: SortOrder
    bucketId?: SortOrder
    path?: SortOrder
    fileType?: SortOrder
    mimetype?: SortOrder
    extension?: SortOrder
    size?: SortOrder
    title?: SortOrder
    altText?: SortOrder
    description?: SortOrder
    uploadedById?: SortOrder
    isVisibility?: SortOrder
    isAccessible?: SortOrder
    width?: SortOrder
    height?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaAvgOrderByAggregateInput = {
    id?: SortOrder
    bucketId?: SortOrder
    size?: SortOrder
    uploadedById?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type MediaMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    filename?: SortOrder
    storedFilename?: SortOrder
    url?: SortOrder
    bucketId?: SortOrder
    path?: SortOrder
    fileType?: SortOrder
    mimetype?: SortOrder
    extension?: SortOrder
    size?: SortOrder
    title?: SortOrder
    altText?: SortOrder
    description?: SortOrder
    uploadedById?: SortOrder
    isVisibility?: SortOrder
    isAccessible?: SortOrder
    width?: SortOrder
    height?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    filename?: SortOrder
    storedFilename?: SortOrder
    url?: SortOrder
    bucketId?: SortOrder
    path?: SortOrder
    fileType?: SortOrder
    mimetype?: SortOrder
    extension?: SortOrder
    size?: SortOrder
    title?: SortOrder
    altText?: SortOrder
    description?: SortOrder
    uploadedById?: SortOrder
    isVisibility?: SortOrder
    isAccessible?: SortOrder
    width?: SortOrder
    height?: SortOrder
    uploadedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaSumOrderByAggregateInput = {
    id?: SortOrder
    bucketId?: SortOrder
    size?: SortOrder
    uploadedById?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type EnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[]
    notIn?: $Enums.MediaType[]
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type MediaUploadOrderByRelevanceInput = {
    fields: MediaUploadOrderByRelevanceFieldEnum | MediaUploadOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MediaUploadCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaUploadAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type MediaUploadMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaUploadMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaUploadSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type MediaScalarRelationFilter = {
    is?: MediaWhereInput
    isNot?: MediaWhereInput
  }

  export type MediaUploadScalarRelationFilter = {
    is?: MediaUploadWhereInput
    isNot?: MediaUploadWhereInput
  }

  export type SpaceNullableScalarRelationFilter = {
    is?: SpaceWhereInput | null
    isNot?: SpaceWhereInput | null
  }

  export type MediaUploadDetailCountOrderByAggregateInput = {
    id?: SortOrder
    mediaUploadId?: SortOrder
    mediaId?: SortOrder
    spaceId?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaUploadDetailAvgOrderByAggregateInput = {
    id?: SortOrder
    mediaUploadId?: SortOrder
    mediaId?: SortOrder
    spaceId?: SortOrder
  }

  export type MediaUploadDetailMaxOrderByAggregateInput = {
    id?: SortOrder
    mediaUploadId?: SortOrder
    mediaId?: SortOrder
    spaceId?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaUploadDetailMinOrderByAggregateInput = {
    id?: SortOrder
    mediaUploadId?: SortOrder
    mediaId?: SortOrder
    spaceId?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaUploadDetailSumOrderByAggregateInput = {
    id?: SortOrder
    mediaUploadId?: SortOrder
    mediaId?: SortOrder
    spaceId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type MediaNullableScalarRelationFilter = {
    is?: MediaWhereInput | null
    isNot?: MediaWhereInput | null
  }

  export type SpaceOrderByRelevanceInput = {
    fields: SpaceOrderByRelevanceFieldEnum | SpaceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SpaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentId?: SortOrder
    isAvailable?: SortOrder
    uploadedAt?: SortOrder
    bucketId?: SortOrder
    userId?: SortOrder
    mediaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpaceAvgOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    bucketId?: SortOrder
    userId?: SortOrder
    mediaId?: SortOrder
  }

  export type SpaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentId?: SortOrder
    isAvailable?: SortOrder
    uploadedAt?: SortOrder
    bucketId?: SortOrder
    userId?: SortOrder
    mediaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentId?: SortOrder
    isAvailable?: SortOrder
    uploadedAt?: SortOrder
    bucketId?: SortOrder
    userId?: SortOrder
    mediaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpaceSumOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    bucketId?: SortOrder
    userId?: SortOrder
    mediaId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    connect?: RoleWhereUniqueInput
  }

  export type MediaCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<MediaCreateWithoutUploadedByInput, MediaUncheckedCreateWithoutUploadedByInput> | MediaCreateWithoutUploadedByInput[] | MediaUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutUploadedByInput | MediaCreateOrConnectWithoutUploadedByInput[]
    createMany?: MediaCreateManyUploadedByInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type MediaUploadCreateNestedManyWithoutUserInput = {
    create?: XOR<MediaUploadCreateWithoutUserInput, MediaUploadUncheckedCreateWithoutUserInput> | MediaUploadCreateWithoutUserInput[] | MediaUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaUploadCreateOrConnectWithoutUserInput | MediaUploadCreateOrConnectWithoutUserInput[]
    createMany?: MediaUploadCreateManyUserInputEnvelope
    connect?: MediaUploadWhereUniqueInput | MediaUploadWhereUniqueInput[]
  }

  export type SpaceCreateNestedManyWithoutUserInput = {
    create?: XOR<SpaceCreateWithoutUserInput, SpaceUncheckedCreateWithoutUserInput> | SpaceCreateWithoutUserInput[] | SpaceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutUserInput | SpaceCreateOrConnectWithoutUserInput[]
    createMany?: SpaceCreateManyUserInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type BucketCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BucketCreateWithoutCreatedByInput, BucketUncheckedCreateWithoutCreatedByInput> | BucketCreateWithoutCreatedByInput[] | BucketUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BucketCreateOrConnectWithoutCreatedByInput | BucketCreateOrConnectWithoutCreatedByInput[]
    createMany?: BucketCreateManyCreatedByInputEnvelope
    connect?: BucketWhereUniqueInput | BucketWhereUniqueInput[]
  }

  export type MediaUncheckedCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<MediaCreateWithoutUploadedByInput, MediaUncheckedCreateWithoutUploadedByInput> | MediaCreateWithoutUploadedByInput[] | MediaUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutUploadedByInput | MediaCreateOrConnectWithoutUploadedByInput[]
    createMany?: MediaCreateManyUploadedByInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type MediaUploadUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MediaUploadCreateWithoutUserInput, MediaUploadUncheckedCreateWithoutUserInput> | MediaUploadCreateWithoutUserInput[] | MediaUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaUploadCreateOrConnectWithoutUserInput | MediaUploadCreateOrConnectWithoutUserInput[]
    createMany?: MediaUploadCreateManyUserInputEnvelope
    connect?: MediaUploadWhereUniqueInput | MediaUploadWhereUniqueInput[]
  }

  export type SpaceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SpaceCreateWithoutUserInput, SpaceUncheckedCreateWithoutUserInput> | SpaceCreateWithoutUserInput[] | SpaceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutUserInput | SpaceCreateOrConnectWithoutUserInput[]
    createMany?: SpaceCreateManyUserInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type BucketUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BucketCreateWithoutCreatedByInput, BucketUncheckedCreateWithoutCreatedByInput> | BucketCreateWithoutCreatedByInput[] | BucketUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BucketCreateOrConnectWithoutCreatedByInput | BucketCreateOrConnectWithoutCreatedByInput[]
    createMany?: BucketCreateManyCreatedByInputEnvelope
    connect?: BucketWhereUniqueInput | BucketWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender | null
  }

  export type RoleUpdateOneWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    upsert?: RoleUpsertWithoutUsersInput
    disconnect?: RoleWhereInput | boolean
    delete?: RoleWhereInput | boolean
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUsersInput, RoleUpdateWithoutUsersInput>, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type MediaUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<MediaCreateWithoutUploadedByInput, MediaUncheckedCreateWithoutUploadedByInput> | MediaCreateWithoutUploadedByInput[] | MediaUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutUploadedByInput | MediaCreateOrConnectWithoutUploadedByInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutUploadedByInput | MediaUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: MediaCreateManyUploadedByInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutUploadedByInput | MediaUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutUploadedByInput | MediaUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type MediaUploadUpdateManyWithoutUserNestedInput = {
    create?: XOR<MediaUploadCreateWithoutUserInput, MediaUploadUncheckedCreateWithoutUserInput> | MediaUploadCreateWithoutUserInput[] | MediaUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaUploadCreateOrConnectWithoutUserInput | MediaUploadCreateOrConnectWithoutUserInput[]
    upsert?: MediaUploadUpsertWithWhereUniqueWithoutUserInput | MediaUploadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MediaUploadCreateManyUserInputEnvelope
    set?: MediaUploadWhereUniqueInput | MediaUploadWhereUniqueInput[]
    disconnect?: MediaUploadWhereUniqueInput | MediaUploadWhereUniqueInput[]
    delete?: MediaUploadWhereUniqueInput | MediaUploadWhereUniqueInput[]
    connect?: MediaUploadWhereUniqueInput | MediaUploadWhereUniqueInput[]
    update?: MediaUploadUpdateWithWhereUniqueWithoutUserInput | MediaUploadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MediaUploadUpdateManyWithWhereWithoutUserInput | MediaUploadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MediaUploadScalarWhereInput | MediaUploadScalarWhereInput[]
  }

  export type SpaceUpdateManyWithoutUserNestedInput = {
    create?: XOR<SpaceCreateWithoutUserInput, SpaceUncheckedCreateWithoutUserInput> | SpaceCreateWithoutUserInput[] | SpaceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutUserInput | SpaceCreateOrConnectWithoutUserInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutUserInput | SpaceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SpaceCreateManyUserInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutUserInput | SpaceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutUserInput | SpaceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type BucketUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BucketCreateWithoutCreatedByInput, BucketUncheckedCreateWithoutCreatedByInput> | BucketCreateWithoutCreatedByInput[] | BucketUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BucketCreateOrConnectWithoutCreatedByInput | BucketCreateOrConnectWithoutCreatedByInput[]
    upsert?: BucketUpsertWithWhereUniqueWithoutCreatedByInput | BucketUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BucketCreateManyCreatedByInputEnvelope
    set?: BucketWhereUniqueInput | BucketWhereUniqueInput[]
    disconnect?: BucketWhereUniqueInput | BucketWhereUniqueInput[]
    delete?: BucketWhereUniqueInput | BucketWhereUniqueInput[]
    connect?: BucketWhereUniqueInput | BucketWhereUniqueInput[]
    update?: BucketUpdateWithWhereUniqueWithoutCreatedByInput | BucketUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BucketUpdateManyWithWhereWithoutCreatedByInput | BucketUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BucketScalarWhereInput | BucketScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MediaUncheckedUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<MediaCreateWithoutUploadedByInput, MediaUncheckedCreateWithoutUploadedByInput> | MediaCreateWithoutUploadedByInput[] | MediaUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutUploadedByInput | MediaCreateOrConnectWithoutUploadedByInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutUploadedByInput | MediaUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: MediaCreateManyUploadedByInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutUploadedByInput | MediaUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutUploadedByInput | MediaUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type MediaUploadUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MediaUploadCreateWithoutUserInput, MediaUploadUncheckedCreateWithoutUserInput> | MediaUploadCreateWithoutUserInput[] | MediaUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaUploadCreateOrConnectWithoutUserInput | MediaUploadCreateOrConnectWithoutUserInput[]
    upsert?: MediaUploadUpsertWithWhereUniqueWithoutUserInput | MediaUploadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MediaUploadCreateManyUserInputEnvelope
    set?: MediaUploadWhereUniqueInput | MediaUploadWhereUniqueInput[]
    disconnect?: MediaUploadWhereUniqueInput | MediaUploadWhereUniqueInput[]
    delete?: MediaUploadWhereUniqueInput | MediaUploadWhereUniqueInput[]
    connect?: MediaUploadWhereUniqueInput | MediaUploadWhereUniqueInput[]
    update?: MediaUploadUpdateWithWhereUniqueWithoutUserInput | MediaUploadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MediaUploadUpdateManyWithWhereWithoutUserInput | MediaUploadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MediaUploadScalarWhereInput | MediaUploadScalarWhereInput[]
  }

  export type SpaceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SpaceCreateWithoutUserInput, SpaceUncheckedCreateWithoutUserInput> | SpaceCreateWithoutUserInput[] | SpaceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutUserInput | SpaceCreateOrConnectWithoutUserInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutUserInput | SpaceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SpaceCreateManyUserInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutUserInput | SpaceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutUserInput | SpaceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type BucketUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BucketCreateWithoutCreatedByInput, BucketUncheckedCreateWithoutCreatedByInput> | BucketCreateWithoutCreatedByInput[] | BucketUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BucketCreateOrConnectWithoutCreatedByInput | BucketCreateOrConnectWithoutCreatedByInput[]
    upsert?: BucketUpsertWithWhereUniqueWithoutCreatedByInput | BucketUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BucketCreateManyCreatedByInputEnvelope
    set?: BucketWhereUniqueInput | BucketWhereUniqueInput[]
    disconnect?: BucketWhereUniqueInput | BucketWhereUniqueInput[]
    delete?: BucketWhereUniqueInput | BucketWhereUniqueInput[]
    connect?: BucketWhereUniqueInput | BucketWhereUniqueInput[]
    update?: BucketUpdateWithWhereUniqueWithoutCreatedByInput | BucketUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BucketUpdateManyWithWhereWithoutCreatedByInput | BucketUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BucketScalarWhereInput | BucketScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RolePermissionCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RolePermissionUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RolePermissionUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutRoleInput | RolePermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutRoleInput | RolePermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutRoleInput | RolePermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RolePermissionUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutRoleInput | RolePermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutRoleInput | RolePermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutRoleInput | RolePermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type RolePermissionCreateNestedManyWithoutModuleInput = {
    create?: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput> | RolePermissionCreateWithoutModuleInput[] | RolePermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutModuleInput | RolePermissionCreateOrConnectWithoutModuleInput[]
    createMany?: RolePermissionCreateManyModuleInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type RolePermissionUncheckedCreateNestedManyWithoutModuleInput = {
    create?: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput> | RolePermissionCreateWithoutModuleInput[] | RolePermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutModuleInput | RolePermissionCreateOrConnectWithoutModuleInput[]
    createMany?: RolePermissionCreateManyModuleInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type RolePermissionUpdateManyWithoutModuleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput> | RolePermissionCreateWithoutModuleInput[] | RolePermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutModuleInput | RolePermissionCreateOrConnectWithoutModuleInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutModuleInput | RolePermissionUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: RolePermissionCreateManyModuleInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutModuleInput | RolePermissionUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutModuleInput | RolePermissionUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type RolePermissionUncheckedUpdateManyWithoutModuleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput> | RolePermissionCreateWithoutModuleInput[] | RolePermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutModuleInput | RolePermissionCreateOrConnectWithoutModuleInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutModuleInput | RolePermissionUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: RolePermissionCreateManyModuleInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutModuleInput | RolePermissionUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutModuleInput | RolePermissionUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput
    connect?: RoleWhereUniqueInput
  }

  export type PermissionModuleCreateNestedOneWithoutRolesInput = {
    create?: XOR<PermissionModuleCreateWithoutRolesInput, PermissionModuleUncheckedCreateWithoutRolesInput>
    connectOrCreate?: PermissionModuleCreateOrConnectWithoutRolesInput
    connect?: PermissionModuleWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput
    upsert?: RoleUpsertWithoutPermissionsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutPermissionsInput, RoleUpdateWithoutPermissionsInput>, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type PermissionModuleUpdateOneRequiredWithoutRolesNestedInput = {
    create?: XOR<PermissionModuleCreateWithoutRolesInput, PermissionModuleUncheckedCreateWithoutRolesInput>
    connectOrCreate?: PermissionModuleCreateOrConnectWithoutRolesInput
    upsert?: PermissionModuleUpsertWithoutRolesInput
    connect?: PermissionModuleWhereUniqueInput
    update?: XOR<XOR<PermissionModuleUpdateToOneWithWhereWithoutRolesInput, PermissionModuleUpdateWithoutRolesInput>, PermissionModuleUncheckedUpdateWithoutRolesInput>
  }

  export type UserCreateNestedOneWithoutBucketsInput = {
    create?: XOR<UserCreateWithoutBucketsInput, UserUncheckedCreateWithoutBucketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBucketsInput
    connect?: UserWhereUniqueInput
  }

  export type MediaCreateNestedManyWithoutBucketInput = {
    create?: XOR<MediaCreateWithoutBucketInput, MediaUncheckedCreateWithoutBucketInput> | MediaCreateWithoutBucketInput[] | MediaUncheckedCreateWithoutBucketInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutBucketInput | MediaCreateOrConnectWithoutBucketInput[]
    createMany?: MediaCreateManyBucketInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type SpaceCreateNestedManyWithoutBucketInput = {
    create?: XOR<SpaceCreateWithoutBucketInput, SpaceUncheckedCreateWithoutBucketInput> | SpaceCreateWithoutBucketInput[] | SpaceUncheckedCreateWithoutBucketInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutBucketInput | SpaceCreateOrConnectWithoutBucketInput[]
    createMany?: SpaceCreateManyBucketInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type MediaUncheckedCreateNestedManyWithoutBucketInput = {
    create?: XOR<MediaCreateWithoutBucketInput, MediaUncheckedCreateWithoutBucketInput> | MediaCreateWithoutBucketInput[] | MediaUncheckedCreateWithoutBucketInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutBucketInput | MediaCreateOrConnectWithoutBucketInput[]
    createMany?: MediaCreateManyBucketInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type SpaceUncheckedCreateNestedManyWithoutBucketInput = {
    create?: XOR<SpaceCreateWithoutBucketInput, SpaceUncheckedCreateWithoutBucketInput> | SpaceCreateWithoutBucketInput[] | SpaceUncheckedCreateWithoutBucketInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutBucketInput | SpaceCreateOrConnectWithoutBucketInput[]
    createMany?: SpaceCreateManyBucketInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type EnumBucketPermissionFieldUpdateOperationsInput = {
    set?: $Enums.BucketPermission
  }

  export type EnumVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.Visibility
  }

  export type UserUpdateOneRequiredWithoutBucketsNestedInput = {
    create?: XOR<UserCreateWithoutBucketsInput, UserUncheckedCreateWithoutBucketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBucketsInput
    upsert?: UserUpsertWithoutBucketsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBucketsInput, UserUpdateWithoutBucketsInput>, UserUncheckedUpdateWithoutBucketsInput>
  }

  export type MediaUpdateManyWithoutBucketNestedInput = {
    create?: XOR<MediaCreateWithoutBucketInput, MediaUncheckedCreateWithoutBucketInput> | MediaCreateWithoutBucketInput[] | MediaUncheckedCreateWithoutBucketInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutBucketInput | MediaCreateOrConnectWithoutBucketInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutBucketInput | MediaUpsertWithWhereUniqueWithoutBucketInput[]
    createMany?: MediaCreateManyBucketInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutBucketInput | MediaUpdateWithWhereUniqueWithoutBucketInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutBucketInput | MediaUpdateManyWithWhereWithoutBucketInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type SpaceUpdateManyWithoutBucketNestedInput = {
    create?: XOR<SpaceCreateWithoutBucketInput, SpaceUncheckedCreateWithoutBucketInput> | SpaceCreateWithoutBucketInput[] | SpaceUncheckedCreateWithoutBucketInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutBucketInput | SpaceCreateOrConnectWithoutBucketInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutBucketInput | SpaceUpsertWithWhereUniqueWithoutBucketInput[]
    createMany?: SpaceCreateManyBucketInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutBucketInput | SpaceUpdateWithWhereUniqueWithoutBucketInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutBucketInput | SpaceUpdateManyWithWhereWithoutBucketInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type MediaUncheckedUpdateManyWithoutBucketNestedInput = {
    create?: XOR<MediaCreateWithoutBucketInput, MediaUncheckedCreateWithoutBucketInput> | MediaCreateWithoutBucketInput[] | MediaUncheckedCreateWithoutBucketInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutBucketInput | MediaCreateOrConnectWithoutBucketInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutBucketInput | MediaUpsertWithWhereUniqueWithoutBucketInput[]
    createMany?: MediaCreateManyBucketInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutBucketInput | MediaUpdateWithWhereUniqueWithoutBucketInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutBucketInput | MediaUpdateManyWithWhereWithoutBucketInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type SpaceUncheckedUpdateManyWithoutBucketNestedInput = {
    create?: XOR<SpaceCreateWithoutBucketInput, SpaceUncheckedCreateWithoutBucketInput> | SpaceCreateWithoutBucketInput[] | SpaceUncheckedCreateWithoutBucketInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutBucketInput | SpaceCreateOrConnectWithoutBucketInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutBucketInput | SpaceUpsertWithWhereUniqueWithoutBucketInput[]
    createMany?: SpaceCreateManyBucketInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutBucketInput | SpaceUpdateWithWhereUniqueWithoutBucketInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutBucketInput | SpaceUpdateManyWithWhereWithoutBucketInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type BucketCreateNestedOneWithoutMediasInput = {
    create?: XOR<BucketCreateWithoutMediasInput, BucketUncheckedCreateWithoutMediasInput>
    connectOrCreate?: BucketCreateOrConnectWithoutMediasInput
    connect?: BucketWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMediasUploadedInput = {
    create?: XOR<UserCreateWithoutMediasUploadedInput, UserUncheckedCreateWithoutMediasUploadedInput>
    connectOrCreate?: UserCreateOrConnectWithoutMediasUploadedInput
    connect?: UserWhereUniqueInput
  }

  export type SpaceCreateNestedManyWithoutMediaInput = {
    create?: XOR<SpaceCreateWithoutMediaInput, SpaceUncheckedCreateWithoutMediaInput> | SpaceCreateWithoutMediaInput[] | SpaceUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutMediaInput | SpaceCreateOrConnectWithoutMediaInput[]
    createMany?: SpaceCreateManyMediaInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type MediaUploadDetailCreateNestedManyWithoutMediaInput = {
    create?: XOR<MediaUploadDetailCreateWithoutMediaInput, MediaUploadDetailUncheckedCreateWithoutMediaInput> | MediaUploadDetailCreateWithoutMediaInput[] | MediaUploadDetailUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutMediaInput | MediaUploadDetailCreateOrConnectWithoutMediaInput[]
    createMany?: MediaUploadDetailCreateManyMediaInputEnvelope
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
  }

  export type SpaceUncheckedCreateNestedManyWithoutMediaInput = {
    create?: XOR<SpaceCreateWithoutMediaInput, SpaceUncheckedCreateWithoutMediaInput> | SpaceCreateWithoutMediaInput[] | SpaceUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutMediaInput | SpaceCreateOrConnectWithoutMediaInput[]
    createMany?: SpaceCreateManyMediaInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type MediaUploadDetailUncheckedCreateNestedManyWithoutMediaInput = {
    create?: XOR<MediaUploadDetailCreateWithoutMediaInput, MediaUploadDetailUncheckedCreateWithoutMediaInput> | MediaUploadDetailCreateWithoutMediaInput[] | MediaUploadDetailUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutMediaInput | MediaUploadDetailCreateOrConnectWithoutMediaInput[]
    createMany?: MediaUploadDetailCreateManyMediaInputEnvelope
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
  }

  export type EnumMediaTypeFieldUpdateOperationsInput = {
    set?: $Enums.MediaType
  }

  export type BucketUpdateOneRequiredWithoutMediasNestedInput = {
    create?: XOR<BucketCreateWithoutMediasInput, BucketUncheckedCreateWithoutMediasInput>
    connectOrCreate?: BucketCreateOrConnectWithoutMediasInput
    upsert?: BucketUpsertWithoutMediasInput
    connect?: BucketWhereUniqueInput
    update?: XOR<XOR<BucketUpdateToOneWithWhereWithoutMediasInput, BucketUpdateWithoutMediasInput>, BucketUncheckedUpdateWithoutMediasInput>
  }

  export type UserUpdateOneRequiredWithoutMediasUploadedNestedInput = {
    create?: XOR<UserCreateWithoutMediasUploadedInput, UserUncheckedCreateWithoutMediasUploadedInput>
    connectOrCreate?: UserCreateOrConnectWithoutMediasUploadedInput
    upsert?: UserUpsertWithoutMediasUploadedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMediasUploadedInput, UserUpdateWithoutMediasUploadedInput>, UserUncheckedUpdateWithoutMediasUploadedInput>
  }

  export type SpaceUpdateManyWithoutMediaNestedInput = {
    create?: XOR<SpaceCreateWithoutMediaInput, SpaceUncheckedCreateWithoutMediaInput> | SpaceCreateWithoutMediaInput[] | SpaceUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutMediaInput | SpaceCreateOrConnectWithoutMediaInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutMediaInput | SpaceUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: SpaceCreateManyMediaInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutMediaInput | SpaceUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutMediaInput | SpaceUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type MediaUploadDetailUpdateManyWithoutMediaNestedInput = {
    create?: XOR<MediaUploadDetailCreateWithoutMediaInput, MediaUploadDetailUncheckedCreateWithoutMediaInput> | MediaUploadDetailCreateWithoutMediaInput[] | MediaUploadDetailUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutMediaInput | MediaUploadDetailCreateOrConnectWithoutMediaInput[]
    upsert?: MediaUploadDetailUpsertWithWhereUniqueWithoutMediaInput | MediaUploadDetailUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: MediaUploadDetailCreateManyMediaInputEnvelope
    set?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    disconnect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    delete?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    update?: MediaUploadDetailUpdateWithWhereUniqueWithoutMediaInput | MediaUploadDetailUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: MediaUploadDetailUpdateManyWithWhereWithoutMediaInput | MediaUploadDetailUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: MediaUploadDetailScalarWhereInput | MediaUploadDetailScalarWhereInput[]
  }

  export type SpaceUncheckedUpdateManyWithoutMediaNestedInput = {
    create?: XOR<SpaceCreateWithoutMediaInput, SpaceUncheckedCreateWithoutMediaInput> | SpaceCreateWithoutMediaInput[] | SpaceUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutMediaInput | SpaceCreateOrConnectWithoutMediaInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutMediaInput | SpaceUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: SpaceCreateManyMediaInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutMediaInput | SpaceUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutMediaInput | SpaceUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type MediaUploadDetailUncheckedUpdateManyWithoutMediaNestedInput = {
    create?: XOR<MediaUploadDetailCreateWithoutMediaInput, MediaUploadDetailUncheckedCreateWithoutMediaInput> | MediaUploadDetailCreateWithoutMediaInput[] | MediaUploadDetailUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutMediaInput | MediaUploadDetailCreateOrConnectWithoutMediaInput[]
    upsert?: MediaUploadDetailUpsertWithWhereUniqueWithoutMediaInput | MediaUploadDetailUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: MediaUploadDetailCreateManyMediaInputEnvelope
    set?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    disconnect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    delete?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    update?: MediaUploadDetailUpdateWithWhereUniqueWithoutMediaInput | MediaUploadDetailUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: MediaUploadDetailUpdateManyWithWhereWithoutMediaInput | MediaUploadDetailUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: MediaUploadDetailScalarWhereInput | MediaUploadDetailScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMediaUploadsInput = {
    create?: XOR<UserCreateWithoutMediaUploadsInput, UserUncheckedCreateWithoutMediaUploadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMediaUploadsInput
    connect?: UserWhereUniqueInput
  }

  export type MediaUploadDetailCreateNestedManyWithoutMediaUploadInput = {
    create?: XOR<MediaUploadDetailCreateWithoutMediaUploadInput, MediaUploadDetailUncheckedCreateWithoutMediaUploadInput> | MediaUploadDetailCreateWithoutMediaUploadInput[] | MediaUploadDetailUncheckedCreateWithoutMediaUploadInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutMediaUploadInput | MediaUploadDetailCreateOrConnectWithoutMediaUploadInput[]
    createMany?: MediaUploadDetailCreateManyMediaUploadInputEnvelope
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
  }

  export type MediaUploadDetailUncheckedCreateNestedManyWithoutMediaUploadInput = {
    create?: XOR<MediaUploadDetailCreateWithoutMediaUploadInput, MediaUploadDetailUncheckedCreateWithoutMediaUploadInput> | MediaUploadDetailCreateWithoutMediaUploadInput[] | MediaUploadDetailUncheckedCreateWithoutMediaUploadInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutMediaUploadInput | MediaUploadDetailCreateOrConnectWithoutMediaUploadInput[]
    createMany?: MediaUploadDetailCreateManyMediaUploadInputEnvelope
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutMediaUploadsNestedInput = {
    create?: XOR<UserCreateWithoutMediaUploadsInput, UserUncheckedCreateWithoutMediaUploadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMediaUploadsInput
    upsert?: UserUpsertWithoutMediaUploadsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMediaUploadsInput, UserUpdateWithoutMediaUploadsInput>, UserUncheckedUpdateWithoutMediaUploadsInput>
  }

  export type MediaUploadDetailUpdateManyWithoutMediaUploadNestedInput = {
    create?: XOR<MediaUploadDetailCreateWithoutMediaUploadInput, MediaUploadDetailUncheckedCreateWithoutMediaUploadInput> | MediaUploadDetailCreateWithoutMediaUploadInput[] | MediaUploadDetailUncheckedCreateWithoutMediaUploadInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutMediaUploadInput | MediaUploadDetailCreateOrConnectWithoutMediaUploadInput[]
    upsert?: MediaUploadDetailUpsertWithWhereUniqueWithoutMediaUploadInput | MediaUploadDetailUpsertWithWhereUniqueWithoutMediaUploadInput[]
    createMany?: MediaUploadDetailCreateManyMediaUploadInputEnvelope
    set?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    disconnect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    delete?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    update?: MediaUploadDetailUpdateWithWhereUniqueWithoutMediaUploadInput | MediaUploadDetailUpdateWithWhereUniqueWithoutMediaUploadInput[]
    updateMany?: MediaUploadDetailUpdateManyWithWhereWithoutMediaUploadInput | MediaUploadDetailUpdateManyWithWhereWithoutMediaUploadInput[]
    deleteMany?: MediaUploadDetailScalarWhereInput | MediaUploadDetailScalarWhereInput[]
  }

  export type MediaUploadDetailUncheckedUpdateManyWithoutMediaUploadNestedInput = {
    create?: XOR<MediaUploadDetailCreateWithoutMediaUploadInput, MediaUploadDetailUncheckedCreateWithoutMediaUploadInput> | MediaUploadDetailCreateWithoutMediaUploadInput[] | MediaUploadDetailUncheckedCreateWithoutMediaUploadInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutMediaUploadInput | MediaUploadDetailCreateOrConnectWithoutMediaUploadInput[]
    upsert?: MediaUploadDetailUpsertWithWhereUniqueWithoutMediaUploadInput | MediaUploadDetailUpsertWithWhereUniqueWithoutMediaUploadInput[]
    createMany?: MediaUploadDetailCreateManyMediaUploadInputEnvelope
    set?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    disconnect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    delete?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    update?: MediaUploadDetailUpdateWithWhereUniqueWithoutMediaUploadInput | MediaUploadDetailUpdateWithWhereUniqueWithoutMediaUploadInput[]
    updateMany?: MediaUploadDetailUpdateManyWithWhereWithoutMediaUploadInput | MediaUploadDetailUpdateManyWithWhereWithoutMediaUploadInput[]
    deleteMany?: MediaUploadDetailScalarWhereInput | MediaUploadDetailScalarWhereInput[]
  }

  export type MediaCreateNestedOneWithoutMediaDetailsInput = {
    create?: XOR<MediaCreateWithoutMediaDetailsInput, MediaUncheckedCreateWithoutMediaDetailsInput>
    connectOrCreate?: MediaCreateOrConnectWithoutMediaDetailsInput
    connect?: MediaWhereUniqueInput
  }

  export type MediaUploadCreateNestedOneWithoutDetailsInput = {
    create?: XOR<MediaUploadCreateWithoutDetailsInput, MediaUploadUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: MediaUploadCreateOrConnectWithoutDetailsInput
    connect?: MediaUploadWhereUniqueInput
  }

  export type SpaceCreateNestedOneWithoutUploadDetailsInput = {
    create?: XOR<SpaceCreateWithoutUploadDetailsInput, SpaceUncheckedCreateWithoutUploadDetailsInput>
    connectOrCreate?: SpaceCreateOrConnectWithoutUploadDetailsInput
    connect?: SpaceWhereUniqueInput
  }

  export type MediaUpdateOneRequiredWithoutMediaDetailsNestedInput = {
    create?: XOR<MediaCreateWithoutMediaDetailsInput, MediaUncheckedCreateWithoutMediaDetailsInput>
    connectOrCreate?: MediaCreateOrConnectWithoutMediaDetailsInput
    upsert?: MediaUpsertWithoutMediaDetailsInput
    connect?: MediaWhereUniqueInput
    update?: XOR<XOR<MediaUpdateToOneWithWhereWithoutMediaDetailsInput, MediaUpdateWithoutMediaDetailsInput>, MediaUncheckedUpdateWithoutMediaDetailsInput>
  }

  export type MediaUploadUpdateOneRequiredWithoutDetailsNestedInput = {
    create?: XOR<MediaUploadCreateWithoutDetailsInput, MediaUploadUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: MediaUploadCreateOrConnectWithoutDetailsInput
    upsert?: MediaUploadUpsertWithoutDetailsInput
    connect?: MediaUploadWhereUniqueInput
    update?: XOR<XOR<MediaUploadUpdateToOneWithWhereWithoutDetailsInput, MediaUploadUpdateWithoutDetailsInput>, MediaUploadUncheckedUpdateWithoutDetailsInput>
  }

  export type SpaceUpdateOneWithoutUploadDetailsNestedInput = {
    create?: XOR<SpaceCreateWithoutUploadDetailsInput, SpaceUncheckedCreateWithoutUploadDetailsInput>
    connectOrCreate?: SpaceCreateOrConnectWithoutUploadDetailsInput
    upsert?: SpaceUpsertWithoutUploadDetailsInput
    disconnect?: SpaceWhereInput | boolean
    delete?: SpaceWhereInput | boolean
    connect?: SpaceWhereUniqueInput
    update?: XOR<XOR<SpaceUpdateToOneWithWhereWithoutUploadDetailsInput, SpaceUpdateWithoutUploadDetailsInput>, SpaceUncheckedUpdateWithoutUploadDetailsInput>
  }

  export type BucketCreateNestedOneWithoutSpacesInput = {
    create?: XOR<BucketCreateWithoutSpacesInput, BucketUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: BucketCreateOrConnectWithoutSpacesInput
    connect?: BucketWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSpacesInput = {
    create?: XOR<UserCreateWithoutSpacesInput, UserUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSpacesInput
    connect?: UserWhereUniqueInput
  }

  export type SpaceCreateNestedOneWithoutChildrenInput = {
    create?: XOR<SpaceCreateWithoutChildrenInput, SpaceUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: SpaceCreateOrConnectWithoutChildrenInput
    connect?: SpaceWhereUniqueInput
  }

  export type SpaceCreateNestedManyWithoutParentInput = {
    create?: XOR<SpaceCreateWithoutParentInput, SpaceUncheckedCreateWithoutParentInput> | SpaceCreateWithoutParentInput[] | SpaceUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutParentInput | SpaceCreateOrConnectWithoutParentInput[]
    createMany?: SpaceCreateManyParentInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type MediaCreateNestedOneWithoutSpacesInput = {
    create?: XOR<MediaCreateWithoutSpacesInput, MediaUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: MediaCreateOrConnectWithoutSpacesInput
    connect?: MediaWhereUniqueInput
  }

  export type MediaUploadDetailCreateNestedManyWithoutSpaceInput = {
    create?: XOR<MediaUploadDetailCreateWithoutSpaceInput, MediaUploadDetailUncheckedCreateWithoutSpaceInput> | MediaUploadDetailCreateWithoutSpaceInput[] | MediaUploadDetailUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutSpaceInput | MediaUploadDetailCreateOrConnectWithoutSpaceInput[]
    createMany?: MediaUploadDetailCreateManySpaceInputEnvelope
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
  }

  export type SpaceUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<SpaceCreateWithoutParentInput, SpaceUncheckedCreateWithoutParentInput> | SpaceCreateWithoutParentInput[] | SpaceUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutParentInput | SpaceCreateOrConnectWithoutParentInput[]
    createMany?: SpaceCreateManyParentInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type MediaUploadDetailUncheckedCreateNestedManyWithoutSpaceInput = {
    create?: XOR<MediaUploadDetailCreateWithoutSpaceInput, MediaUploadDetailUncheckedCreateWithoutSpaceInput> | MediaUploadDetailCreateWithoutSpaceInput[] | MediaUploadDetailUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutSpaceInput | MediaUploadDetailCreateOrConnectWithoutSpaceInput[]
    createMany?: MediaUploadDetailCreateManySpaceInputEnvelope
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BucketUpdateOneRequiredWithoutSpacesNestedInput = {
    create?: XOR<BucketCreateWithoutSpacesInput, BucketUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: BucketCreateOrConnectWithoutSpacesInput
    upsert?: BucketUpsertWithoutSpacesInput
    connect?: BucketWhereUniqueInput
    update?: XOR<XOR<BucketUpdateToOneWithWhereWithoutSpacesInput, BucketUpdateWithoutSpacesInput>, BucketUncheckedUpdateWithoutSpacesInput>
  }

  export type UserUpdateOneRequiredWithoutSpacesNestedInput = {
    create?: XOR<UserCreateWithoutSpacesInput, UserUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSpacesInput
    upsert?: UserUpsertWithoutSpacesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSpacesInput, UserUpdateWithoutSpacesInput>, UserUncheckedUpdateWithoutSpacesInput>
  }

  export type SpaceUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<SpaceCreateWithoutChildrenInput, SpaceUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: SpaceCreateOrConnectWithoutChildrenInput
    upsert?: SpaceUpsertWithoutChildrenInput
    disconnect?: SpaceWhereInput | boolean
    delete?: SpaceWhereInput | boolean
    connect?: SpaceWhereUniqueInput
    update?: XOR<XOR<SpaceUpdateToOneWithWhereWithoutChildrenInput, SpaceUpdateWithoutChildrenInput>, SpaceUncheckedUpdateWithoutChildrenInput>
  }

  export type SpaceUpdateManyWithoutParentNestedInput = {
    create?: XOR<SpaceCreateWithoutParentInput, SpaceUncheckedCreateWithoutParentInput> | SpaceCreateWithoutParentInput[] | SpaceUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutParentInput | SpaceCreateOrConnectWithoutParentInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutParentInput | SpaceUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: SpaceCreateManyParentInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutParentInput | SpaceUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutParentInput | SpaceUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type MediaUpdateOneWithoutSpacesNestedInput = {
    create?: XOR<MediaCreateWithoutSpacesInput, MediaUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: MediaCreateOrConnectWithoutSpacesInput
    upsert?: MediaUpsertWithoutSpacesInput
    disconnect?: MediaWhereInput | boolean
    delete?: MediaWhereInput | boolean
    connect?: MediaWhereUniqueInput
    update?: XOR<XOR<MediaUpdateToOneWithWhereWithoutSpacesInput, MediaUpdateWithoutSpacesInput>, MediaUncheckedUpdateWithoutSpacesInput>
  }

  export type MediaUploadDetailUpdateManyWithoutSpaceNestedInput = {
    create?: XOR<MediaUploadDetailCreateWithoutSpaceInput, MediaUploadDetailUncheckedCreateWithoutSpaceInput> | MediaUploadDetailCreateWithoutSpaceInput[] | MediaUploadDetailUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutSpaceInput | MediaUploadDetailCreateOrConnectWithoutSpaceInput[]
    upsert?: MediaUploadDetailUpsertWithWhereUniqueWithoutSpaceInput | MediaUploadDetailUpsertWithWhereUniqueWithoutSpaceInput[]
    createMany?: MediaUploadDetailCreateManySpaceInputEnvelope
    set?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    disconnect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    delete?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    update?: MediaUploadDetailUpdateWithWhereUniqueWithoutSpaceInput | MediaUploadDetailUpdateWithWhereUniqueWithoutSpaceInput[]
    updateMany?: MediaUploadDetailUpdateManyWithWhereWithoutSpaceInput | MediaUploadDetailUpdateManyWithWhereWithoutSpaceInput[]
    deleteMany?: MediaUploadDetailScalarWhereInput | MediaUploadDetailScalarWhereInput[]
  }

  export type SpaceUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<SpaceCreateWithoutParentInput, SpaceUncheckedCreateWithoutParentInput> | SpaceCreateWithoutParentInput[] | SpaceUncheckedCreateWithoutParentInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutParentInput | SpaceCreateOrConnectWithoutParentInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutParentInput | SpaceUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: SpaceCreateManyParentInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutParentInput | SpaceUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutParentInput | SpaceUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type MediaUploadDetailUncheckedUpdateManyWithoutSpaceNestedInput = {
    create?: XOR<MediaUploadDetailCreateWithoutSpaceInput, MediaUploadDetailUncheckedCreateWithoutSpaceInput> | MediaUploadDetailCreateWithoutSpaceInput[] | MediaUploadDetailUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: MediaUploadDetailCreateOrConnectWithoutSpaceInput | MediaUploadDetailCreateOrConnectWithoutSpaceInput[]
    upsert?: MediaUploadDetailUpsertWithWhereUniqueWithoutSpaceInput | MediaUploadDetailUpsertWithWhereUniqueWithoutSpaceInput[]
    createMany?: MediaUploadDetailCreateManySpaceInputEnvelope
    set?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    disconnect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    delete?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    connect?: MediaUploadDetailWhereUniqueInput | MediaUploadDetailWhereUniqueInput[]
    update?: MediaUploadDetailUpdateWithWhereUniqueWithoutSpaceInput | MediaUploadDetailUpdateWithWhereUniqueWithoutSpaceInput[]
    updateMany?: MediaUploadDetailUpdateManyWithWhereWithoutSpaceInput | MediaUploadDetailUpdateManyWithWhereWithoutSpaceInput[]
    deleteMany?: MediaUploadDetailScalarWhereInput | MediaUploadDetailScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | null
    notIn?: $Enums.Gender[] | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | null
    notIn?: $Enums.Gender[] | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type NestedEnumBucketPermissionFilter<$PrismaModel = never> = {
    equals?: $Enums.BucketPermission | EnumBucketPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.BucketPermission[]
    notIn?: $Enums.BucketPermission[]
    not?: NestedEnumBucketPermissionFilter<$PrismaModel> | $Enums.BucketPermission
  }

  export type NestedEnumVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[]
    notIn?: $Enums.Visibility[]
    not?: NestedEnumVisibilityFilter<$PrismaModel> | $Enums.Visibility
  }

  export type NestedEnumBucketPermissionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BucketPermission | EnumBucketPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.BucketPermission[]
    notIn?: $Enums.BucketPermission[]
    not?: NestedEnumBucketPermissionWithAggregatesFilter<$PrismaModel> | $Enums.BucketPermission
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBucketPermissionFilter<$PrismaModel>
    _max?: NestedEnumBucketPermissionFilter<$PrismaModel>
  }

  export type NestedEnumVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[]
    notIn?: $Enums.Visibility[]
    not?: NestedEnumVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.Visibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityFilter<$PrismaModel>
    _max?: NestedEnumVisibilityFilter<$PrismaModel>
  }

  export type NestedEnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[]
    notIn?: $Enums.MediaType[]
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[]
    notIn?: $Enums.MediaType[]
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RoleCreateWithoutUsersInput = {
    name: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: RolePermissionCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: RolePermissionUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type MediaCreateWithoutUploadedByInput = {
    slug?: string
    filename: string
    storedFilename: string
    url: string
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    bucket: BucketCreateNestedOneWithoutMediasInput
    spaces?: SpaceCreateNestedManyWithoutMediaInput
    mediaDetails?: MediaUploadDetailCreateNestedManyWithoutMediaInput
  }

  export type MediaUncheckedCreateWithoutUploadedByInput = {
    id?: number
    slug?: string
    filename: string
    storedFilename: string
    url: string
    bucketId: number
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    spaces?: SpaceUncheckedCreateNestedManyWithoutMediaInput
    mediaDetails?: MediaUploadDetailUncheckedCreateNestedManyWithoutMediaInput
  }

  export type MediaCreateOrConnectWithoutUploadedByInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutUploadedByInput, MediaUncheckedCreateWithoutUploadedByInput>
  }

  export type MediaCreateManyUploadedByInputEnvelope = {
    data: MediaCreateManyUploadedByInput | MediaCreateManyUploadedByInput[]
    skipDuplicates?: boolean
  }

  export type MediaUploadCreateWithoutUserInput = {
    slug?: string
    createdAt?: Date | string
    details?: MediaUploadDetailCreateNestedManyWithoutMediaUploadInput
  }

  export type MediaUploadUncheckedCreateWithoutUserInput = {
    id?: number
    slug?: string
    createdAt?: Date | string
    details?: MediaUploadDetailUncheckedCreateNestedManyWithoutMediaUploadInput
  }

  export type MediaUploadCreateOrConnectWithoutUserInput = {
    where: MediaUploadWhereUniqueInput
    create: XOR<MediaUploadCreateWithoutUserInput, MediaUploadUncheckedCreateWithoutUserInput>
  }

  export type MediaUploadCreateManyUserInputEnvelope = {
    data: MediaUploadCreateManyUserInput | MediaUploadCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SpaceCreateWithoutUserInput = {
    name: string
    slug?: string
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bucket: BucketCreateNestedOneWithoutSpacesInput
    parent?: SpaceCreateNestedOneWithoutChildrenInput
    children?: SpaceCreateNestedManyWithoutParentInput
    media?: MediaCreateNestedOneWithoutSpacesInput
    uploadDetails?: MediaUploadDetailCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    slug?: string
    parentId?: number | null
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    bucketId: number
    mediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: SpaceUncheckedCreateNestedManyWithoutParentInput
    uploadDetails?: MediaUploadDetailUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type SpaceCreateOrConnectWithoutUserInput = {
    where: SpaceWhereUniqueInput
    create: XOR<SpaceCreateWithoutUserInput, SpaceUncheckedCreateWithoutUserInput>
  }

  export type SpaceCreateManyUserInputEnvelope = {
    data: SpaceCreateManyUserInput | SpaceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BucketCreateWithoutCreatedByInput = {
    name: string
    slug?: string
    accessKeyName: string
    accessKeyId: string
    secretAccessKey: string
    permission?: $Enums.BucketPermission
    isAvailable?: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    medias?: MediaCreateNestedManyWithoutBucketInput
    spaces?: SpaceCreateNestedManyWithoutBucketInput
  }

  export type BucketUncheckedCreateWithoutCreatedByInput = {
    id?: number
    name: string
    slug?: string
    accessKeyName: string
    accessKeyId: string
    secretAccessKey: string
    permission?: $Enums.BucketPermission
    isAvailable?: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    medias?: MediaUncheckedCreateNestedManyWithoutBucketInput
    spaces?: SpaceUncheckedCreateNestedManyWithoutBucketInput
  }

  export type BucketCreateOrConnectWithoutCreatedByInput = {
    where: BucketWhereUniqueInput
    create: XOR<BucketCreateWithoutCreatedByInput, BucketUncheckedCreateWithoutCreatedByInput>
  }

  export type BucketCreateManyCreatedByInputEnvelope = {
    data: BucketCreateManyCreatedByInput | BucketCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type RoleUpsertWithoutUsersInput = {
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: RolePermissionUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: RolePermissionUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type MediaUpsertWithWhereUniqueWithoutUploadedByInput = {
    where: MediaWhereUniqueInput
    update: XOR<MediaUpdateWithoutUploadedByInput, MediaUncheckedUpdateWithoutUploadedByInput>
    create: XOR<MediaCreateWithoutUploadedByInput, MediaUncheckedCreateWithoutUploadedByInput>
  }

  export type MediaUpdateWithWhereUniqueWithoutUploadedByInput = {
    where: MediaWhereUniqueInput
    data: XOR<MediaUpdateWithoutUploadedByInput, MediaUncheckedUpdateWithoutUploadedByInput>
  }

  export type MediaUpdateManyWithWhereWithoutUploadedByInput = {
    where: MediaScalarWhereInput
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyWithoutUploadedByInput>
  }

  export type MediaScalarWhereInput = {
    AND?: MediaScalarWhereInput | MediaScalarWhereInput[]
    OR?: MediaScalarWhereInput[]
    NOT?: MediaScalarWhereInput | MediaScalarWhereInput[]
    id?: IntFilter<"Media"> | number
    slug?: StringFilter<"Media"> | string
    filename?: StringFilter<"Media"> | string
    storedFilename?: StringFilter<"Media"> | string
    url?: StringFilter<"Media"> | string
    bucketId?: IntFilter<"Media"> | number
    path?: StringNullableFilter<"Media"> | string | null
    fileType?: EnumMediaTypeFilter<"Media"> | $Enums.MediaType
    mimetype?: StringFilter<"Media"> | string
    extension?: StringFilter<"Media"> | string
    size?: IntFilter<"Media"> | number
    title?: StringNullableFilter<"Media"> | string | null
    altText?: StringNullableFilter<"Media"> | string | null
    description?: StringNullableFilter<"Media"> | string | null
    uploadedById?: IntFilter<"Media"> | number
    isVisibility?: EnumVisibilityFilter<"Media"> | $Enums.Visibility
    isAccessible?: EnumVisibilityFilter<"Media"> | $Enums.Visibility
    width?: IntNullableFilter<"Media"> | number | null
    height?: IntNullableFilter<"Media"> | number | null
    uploadedAt?: DateTimeFilter<"Media"> | Date | string
    createdAt?: DateTimeFilter<"Media"> | Date | string
    updatedAt?: DateTimeFilter<"Media"> | Date | string
  }

  export type MediaUploadUpsertWithWhereUniqueWithoutUserInput = {
    where: MediaUploadWhereUniqueInput
    update: XOR<MediaUploadUpdateWithoutUserInput, MediaUploadUncheckedUpdateWithoutUserInput>
    create: XOR<MediaUploadCreateWithoutUserInput, MediaUploadUncheckedCreateWithoutUserInput>
  }

  export type MediaUploadUpdateWithWhereUniqueWithoutUserInput = {
    where: MediaUploadWhereUniqueInput
    data: XOR<MediaUploadUpdateWithoutUserInput, MediaUploadUncheckedUpdateWithoutUserInput>
  }

  export type MediaUploadUpdateManyWithWhereWithoutUserInput = {
    where: MediaUploadScalarWhereInput
    data: XOR<MediaUploadUpdateManyMutationInput, MediaUploadUncheckedUpdateManyWithoutUserInput>
  }

  export type MediaUploadScalarWhereInput = {
    AND?: MediaUploadScalarWhereInput | MediaUploadScalarWhereInput[]
    OR?: MediaUploadScalarWhereInput[]
    NOT?: MediaUploadScalarWhereInput | MediaUploadScalarWhereInput[]
    id?: IntFilter<"MediaUpload"> | number
    slug?: StringFilter<"MediaUpload"> | string
    userId?: IntFilter<"MediaUpload"> | number
    createdAt?: DateTimeFilter<"MediaUpload"> | Date | string
  }

  export type SpaceUpsertWithWhereUniqueWithoutUserInput = {
    where: SpaceWhereUniqueInput
    update: XOR<SpaceUpdateWithoutUserInput, SpaceUncheckedUpdateWithoutUserInput>
    create: XOR<SpaceCreateWithoutUserInput, SpaceUncheckedCreateWithoutUserInput>
  }

  export type SpaceUpdateWithWhereUniqueWithoutUserInput = {
    where: SpaceWhereUniqueInput
    data: XOR<SpaceUpdateWithoutUserInput, SpaceUncheckedUpdateWithoutUserInput>
  }

  export type SpaceUpdateManyWithWhereWithoutUserInput = {
    where: SpaceScalarWhereInput
    data: XOR<SpaceUpdateManyMutationInput, SpaceUncheckedUpdateManyWithoutUserInput>
  }

  export type SpaceScalarWhereInput = {
    AND?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
    OR?: SpaceScalarWhereInput[]
    NOT?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
    id?: IntFilter<"Space"> | number
    name?: StringFilter<"Space"> | string
    slug?: StringFilter<"Space"> | string
    parentId?: IntNullableFilter<"Space"> | number | null
    isAvailable?: EnumVisibilityFilter<"Space"> | $Enums.Visibility
    uploadedAt?: DateTimeNullableFilter<"Space"> | Date | string | null
    bucketId?: IntFilter<"Space"> | number
    userId?: IntFilter<"Space"> | number
    mediaId?: IntNullableFilter<"Space"> | number | null
    createdAt?: DateTimeFilter<"Space"> | Date | string
    updatedAt?: DateTimeFilter<"Space"> | Date | string
  }

  export type BucketUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: BucketWhereUniqueInput
    update: XOR<BucketUpdateWithoutCreatedByInput, BucketUncheckedUpdateWithoutCreatedByInput>
    create: XOR<BucketCreateWithoutCreatedByInput, BucketUncheckedCreateWithoutCreatedByInput>
  }

  export type BucketUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: BucketWhereUniqueInput
    data: XOR<BucketUpdateWithoutCreatedByInput, BucketUncheckedUpdateWithoutCreatedByInput>
  }

  export type BucketUpdateManyWithWhereWithoutCreatedByInput = {
    where: BucketScalarWhereInput
    data: XOR<BucketUpdateManyMutationInput, BucketUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type BucketScalarWhereInput = {
    AND?: BucketScalarWhereInput | BucketScalarWhereInput[]
    OR?: BucketScalarWhereInput[]
    NOT?: BucketScalarWhereInput | BucketScalarWhereInput[]
    id?: IntFilter<"Bucket"> | number
    name?: StringFilter<"Bucket"> | string
    slug?: StringFilter<"Bucket"> | string
    createdById?: IntFilter<"Bucket"> | number
    accessKeyName?: StringFilter<"Bucket"> | string
    accessKeyId?: StringFilter<"Bucket"> | string
    secretAccessKey?: StringFilter<"Bucket"> | string
    permission?: EnumBucketPermissionFilter<"Bucket"> | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFilter<"Bucket"> | $Enums.Visibility
    createdAt?: DateTimeFilter<"Bucket"> | Date | string
    updatedAt?: DateTimeFilter<"Bucket"> | Date | string
  }

  export type UserCreateWithoutRoleInput = {
    email: string
    name: string
    password: string
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    mediasUploaded?: MediaCreateNestedManyWithoutUploadedByInput
    mediaUploads?: MediaUploadCreateNestedManyWithoutUserInput
    spaces?: SpaceCreateNestedManyWithoutUserInput
    buckets?: BucketCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutRoleInput = {
    id?: number
    email: string
    name: string
    password: string
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    mediasUploaded?: MediaUncheckedCreateNestedManyWithoutUploadedByInput
    mediaUploads?: MediaUploadUncheckedCreateNestedManyWithoutUserInput
    spaces?: SpaceUncheckedCreateNestedManyWithoutUserInput
    buckets?: BucketUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutRoleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserCreateManyRoleInputEnvelope = {
    data: UserCreateManyRoleInput | UserCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type RolePermissionCreateWithoutRoleInput = {
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slug?: string
    module: PermissionModuleCreateNestedOneWithoutRolesInput
  }

  export type RolePermissionUncheckedCreateWithoutRoleInput = {
    moduleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slug?: string
  }

  export type RolePermissionCreateOrConnectWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    create: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissionCreateManyRoleInputEnvelope = {
    data: RolePermissionCreateManyRoleInput | RolePermissionCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
  }

  export type UserUpdateManyWithWhereWithoutRoleInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    roleId?: IntNullableFilter<"User"> | number | null
    slug?: StringFilter<"User"> | string
    profilePicture?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    fullNameKh?: StringNullableFilter<"User"> | string | null
    fullNameEn?: StringNullableFilter<"User"> | string | null
    gender?: EnumGenderNullableFilter<"User"> | $Enums.Gender | null
    generalDepartment?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    office?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    currentRole?: StringNullableFilter<"User"> | string | null
  }

  export type RolePermissionUpsertWithWhereUniqueWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    update: XOR<RolePermissionUpdateWithoutRoleInput, RolePermissionUncheckedUpdateWithoutRoleInput>
    create: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissionUpdateWithWhereUniqueWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    data: XOR<RolePermissionUpdateWithoutRoleInput, RolePermissionUncheckedUpdateWithoutRoleInput>
  }

  export type RolePermissionUpdateManyWithWhereWithoutRoleInput = {
    where: RolePermissionScalarWhereInput
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyWithoutRoleInput>
  }

  export type RolePermissionScalarWhereInput = {
    AND?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
    OR?: RolePermissionScalarWhereInput[]
    NOT?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
    roleId?: IntFilter<"RolePermission"> | number
    moduleId?: IntFilter<"RolePermission"> | number
    create?: BoolFilter<"RolePermission"> | boolean
    read?: BoolFilter<"RolePermission"> | boolean
    update?: BoolFilter<"RolePermission"> | boolean
    delete?: BoolFilter<"RolePermission"> | boolean
    createdAt?: DateTimeFilter<"RolePermission"> | Date | string
    updatedAt?: DateTimeFilter<"RolePermission"> | Date | string
    slug?: StringFilter<"RolePermission"> | string
  }

  export type RolePermissionCreateWithoutModuleInput = {
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slug?: string
    role: RoleCreateNestedOneWithoutPermissionsInput
  }

  export type RolePermissionUncheckedCreateWithoutModuleInput = {
    roleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slug?: string
  }

  export type RolePermissionCreateOrConnectWithoutModuleInput = {
    where: RolePermissionWhereUniqueInput
    create: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput>
  }

  export type RolePermissionCreateManyModuleInputEnvelope = {
    data: RolePermissionCreateManyModuleInput | RolePermissionCreateManyModuleInput[]
    skipDuplicates?: boolean
  }

  export type RolePermissionUpsertWithWhereUniqueWithoutModuleInput = {
    where: RolePermissionWhereUniqueInput
    update: XOR<RolePermissionUpdateWithoutModuleInput, RolePermissionUncheckedUpdateWithoutModuleInput>
    create: XOR<RolePermissionCreateWithoutModuleInput, RolePermissionUncheckedCreateWithoutModuleInput>
  }

  export type RolePermissionUpdateWithWhereUniqueWithoutModuleInput = {
    where: RolePermissionWhereUniqueInput
    data: XOR<RolePermissionUpdateWithoutModuleInput, RolePermissionUncheckedUpdateWithoutModuleInput>
  }

  export type RolePermissionUpdateManyWithWhereWithoutModuleInput = {
    where: RolePermissionScalarWhereInput
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyWithoutModuleInput>
  }

  export type RoleCreateWithoutPermissionsInput = {
    name: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutPermissionsInput = {
    id?: number
    name: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
  }

  export type PermissionModuleCreateWithoutRolesInput = {
    name: string
    label: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionModuleUncheckedCreateWithoutRolesInput = {
    id?: number
    name: string
    label: string
    description?: string | null
    slug?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionModuleCreateOrConnectWithoutRolesInput = {
    where: PermissionModuleWhereUniqueInput
    create: XOR<PermissionModuleCreateWithoutRolesInput, PermissionModuleUncheckedCreateWithoutRolesInput>
  }

  export type RoleUpsertWithoutPermissionsInput = {
    update: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type RoleUpdateWithoutPermissionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutPermissionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type PermissionModuleUpsertWithoutRolesInput = {
    update: XOR<PermissionModuleUpdateWithoutRolesInput, PermissionModuleUncheckedUpdateWithoutRolesInput>
    create: XOR<PermissionModuleCreateWithoutRolesInput, PermissionModuleUncheckedCreateWithoutRolesInput>
    where?: PermissionModuleWhereInput
  }

  export type PermissionModuleUpdateToOneWithWhereWithoutRolesInput = {
    where?: PermissionModuleWhereInput
    data: XOR<PermissionModuleUpdateWithoutRolesInput, PermissionModuleUncheckedUpdateWithoutRolesInput>
  }

  export type PermissionModuleUpdateWithoutRolesInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionModuleUncheckedUpdateWithoutRolesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutBucketsInput = {
    email: string
    name: string
    password: string
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    role?: RoleCreateNestedOneWithoutUsersInput
    mediasUploaded?: MediaCreateNestedManyWithoutUploadedByInput
    mediaUploads?: MediaUploadCreateNestedManyWithoutUserInput
    spaces?: SpaceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBucketsInput = {
    id?: number
    email: string
    name: string
    password: string
    roleId?: number | null
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    mediasUploaded?: MediaUncheckedCreateNestedManyWithoutUploadedByInput
    mediaUploads?: MediaUploadUncheckedCreateNestedManyWithoutUserInput
    spaces?: SpaceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBucketsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBucketsInput, UserUncheckedCreateWithoutBucketsInput>
  }

  export type MediaCreateWithoutBucketInput = {
    slug?: string
    filename: string
    storedFilename: string
    url: string
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedBy: UserCreateNestedOneWithoutMediasUploadedInput
    spaces?: SpaceCreateNestedManyWithoutMediaInput
    mediaDetails?: MediaUploadDetailCreateNestedManyWithoutMediaInput
  }

  export type MediaUncheckedCreateWithoutBucketInput = {
    id?: number
    slug?: string
    filename: string
    storedFilename: string
    url: string
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    uploadedById: number
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    spaces?: SpaceUncheckedCreateNestedManyWithoutMediaInput
    mediaDetails?: MediaUploadDetailUncheckedCreateNestedManyWithoutMediaInput
  }

  export type MediaCreateOrConnectWithoutBucketInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutBucketInput, MediaUncheckedCreateWithoutBucketInput>
  }

  export type MediaCreateManyBucketInputEnvelope = {
    data: MediaCreateManyBucketInput | MediaCreateManyBucketInput[]
    skipDuplicates?: boolean
  }

  export type SpaceCreateWithoutBucketInput = {
    name: string
    slug?: string
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSpacesInput
    parent?: SpaceCreateNestedOneWithoutChildrenInput
    children?: SpaceCreateNestedManyWithoutParentInput
    media?: MediaCreateNestedOneWithoutSpacesInput
    uploadDetails?: MediaUploadDetailCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUncheckedCreateWithoutBucketInput = {
    id?: number
    name: string
    slug?: string
    parentId?: number | null
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    userId: number
    mediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: SpaceUncheckedCreateNestedManyWithoutParentInput
    uploadDetails?: MediaUploadDetailUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type SpaceCreateOrConnectWithoutBucketInput = {
    where: SpaceWhereUniqueInput
    create: XOR<SpaceCreateWithoutBucketInput, SpaceUncheckedCreateWithoutBucketInput>
  }

  export type SpaceCreateManyBucketInputEnvelope = {
    data: SpaceCreateManyBucketInput | SpaceCreateManyBucketInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBucketsInput = {
    update: XOR<UserUpdateWithoutBucketsInput, UserUncheckedUpdateWithoutBucketsInput>
    create: XOR<UserCreateWithoutBucketsInput, UserUncheckedCreateWithoutBucketsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBucketsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBucketsInput, UserUncheckedUpdateWithoutBucketsInput>
  }

  export type UserUpdateWithoutBucketsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    role?: RoleUpdateOneWithoutUsersNestedInput
    mediasUploaded?: MediaUpdateManyWithoutUploadedByNestedInput
    mediaUploads?: MediaUploadUpdateManyWithoutUserNestedInput
    spaces?: SpaceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBucketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    mediasUploaded?: MediaUncheckedUpdateManyWithoutUploadedByNestedInput
    mediaUploads?: MediaUploadUncheckedUpdateManyWithoutUserNestedInput
    spaces?: SpaceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MediaUpsertWithWhereUniqueWithoutBucketInput = {
    where: MediaWhereUniqueInput
    update: XOR<MediaUpdateWithoutBucketInput, MediaUncheckedUpdateWithoutBucketInput>
    create: XOR<MediaCreateWithoutBucketInput, MediaUncheckedCreateWithoutBucketInput>
  }

  export type MediaUpdateWithWhereUniqueWithoutBucketInput = {
    where: MediaWhereUniqueInput
    data: XOR<MediaUpdateWithoutBucketInput, MediaUncheckedUpdateWithoutBucketInput>
  }

  export type MediaUpdateManyWithWhereWithoutBucketInput = {
    where: MediaScalarWhereInput
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyWithoutBucketInput>
  }

  export type SpaceUpsertWithWhereUniqueWithoutBucketInput = {
    where: SpaceWhereUniqueInput
    update: XOR<SpaceUpdateWithoutBucketInput, SpaceUncheckedUpdateWithoutBucketInput>
    create: XOR<SpaceCreateWithoutBucketInput, SpaceUncheckedCreateWithoutBucketInput>
  }

  export type SpaceUpdateWithWhereUniqueWithoutBucketInput = {
    where: SpaceWhereUniqueInput
    data: XOR<SpaceUpdateWithoutBucketInput, SpaceUncheckedUpdateWithoutBucketInput>
  }

  export type SpaceUpdateManyWithWhereWithoutBucketInput = {
    where: SpaceScalarWhereInput
    data: XOR<SpaceUpdateManyMutationInput, SpaceUncheckedUpdateManyWithoutBucketInput>
  }

  export type BucketCreateWithoutMediasInput = {
    name: string
    slug?: string
    accessKeyName: string
    accessKeyId: string
    secretAccessKey: string
    permission?: $Enums.BucketPermission
    isAvailable?: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutBucketsInput
    spaces?: SpaceCreateNestedManyWithoutBucketInput
  }

  export type BucketUncheckedCreateWithoutMediasInput = {
    id?: number
    name: string
    slug?: string
    createdById: number
    accessKeyName: string
    accessKeyId: string
    secretAccessKey: string
    permission?: $Enums.BucketPermission
    isAvailable?: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    spaces?: SpaceUncheckedCreateNestedManyWithoutBucketInput
  }

  export type BucketCreateOrConnectWithoutMediasInput = {
    where: BucketWhereUniqueInput
    create: XOR<BucketCreateWithoutMediasInput, BucketUncheckedCreateWithoutMediasInput>
  }

  export type UserCreateWithoutMediasUploadedInput = {
    email: string
    name: string
    password: string
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    role?: RoleCreateNestedOneWithoutUsersInput
    mediaUploads?: MediaUploadCreateNestedManyWithoutUserInput
    spaces?: SpaceCreateNestedManyWithoutUserInput
    buckets?: BucketCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutMediasUploadedInput = {
    id?: number
    email: string
    name: string
    password: string
    roleId?: number | null
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    mediaUploads?: MediaUploadUncheckedCreateNestedManyWithoutUserInput
    spaces?: SpaceUncheckedCreateNestedManyWithoutUserInput
    buckets?: BucketUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutMediasUploadedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMediasUploadedInput, UserUncheckedCreateWithoutMediasUploadedInput>
  }

  export type SpaceCreateWithoutMediaInput = {
    name: string
    slug?: string
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bucket: BucketCreateNestedOneWithoutSpacesInput
    user: UserCreateNestedOneWithoutSpacesInput
    parent?: SpaceCreateNestedOneWithoutChildrenInput
    children?: SpaceCreateNestedManyWithoutParentInput
    uploadDetails?: MediaUploadDetailCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUncheckedCreateWithoutMediaInput = {
    id?: number
    name: string
    slug?: string
    parentId?: number | null
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    bucketId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: SpaceUncheckedCreateNestedManyWithoutParentInput
    uploadDetails?: MediaUploadDetailUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type SpaceCreateOrConnectWithoutMediaInput = {
    where: SpaceWhereUniqueInput
    create: XOR<SpaceCreateWithoutMediaInput, SpaceUncheckedCreateWithoutMediaInput>
  }

  export type SpaceCreateManyMediaInputEnvelope = {
    data: SpaceCreateManyMediaInput | SpaceCreateManyMediaInput[]
    skipDuplicates?: boolean
  }

  export type MediaUploadDetailCreateWithoutMediaInput = {
    createdAt?: Date | string
    mediaUpload: MediaUploadCreateNestedOneWithoutDetailsInput
    space?: SpaceCreateNestedOneWithoutUploadDetailsInput
  }

  export type MediaUploadDetailUncheckedCreateWithoutMediaInput = {
    id?: number
    mediaUploadId: number
    spaceId?: number | null
    createdAt?: Date | string
  }

  export type MediaUploadDetailCreateOrConnectWithoutMediaInput = {
    where: MediaUploadDetailWhereUniqueInput
    create: XOR<MediaUploadDetailCreateWithoutMediaInput, MediaUploadDetailUncheckedCreateWithoutMediaInput>
  }

  export type MediaUploadDetailCreateManyMediaInputEnvelope = {
    data: MediaUploadDetailCreateManyMediaInput | MediaUploadDetailCreateManyMediaInput[]
    skipDuplicates?: boolean
  }

  export type BucketUpsertWithoutMediasInput = {
    update: XOR<BucketUpdateWithoutMediasInput, BucketUncheckedUpdateWithoutMediasInput>
    create: XOR<BucketCreateWithoutMediasInput, BucketUncheckedCreateWithoutMediasInput>
    where?: BucketWhereInput
  }

  export type BucketUpdateToOneWithWhereWithoutMediasInput = {
    where?: BucketWhereInput
    data: XOR<BucketUpdateWithoutMediasInput, BucketUncheckedUpdateWithoutMediasInput>
  }

  export type BucketUpdateWithoutMediasInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    accessKeyName?: StringFieldUpdateOperationsInput | string
    accessKeyId?: StringFieldUpdateOperationsInput | string
    secretAccessKey?: StringFieldUpdateOperationsInput | string
    permission?: EnumBucketPermissionFieldUpdateOperationsInput | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutBucketsNestedInput
    spaces?: SpaceUpdateManyWithoutBucketNestedInput
  }

  export type BucketUncheckedUpdateWithoutMediasInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdById?: IntFieldUpdateOperationsInput | number
    accessKeyName?: StringFieldUpdateOperationsInput | string
    accessKeyId?: StringFieldUpdateOperationsInput | string
    secretAccessKey?: StringFieldUpdateOperationsInput | string
    permission?: EnumBucketPermissionFieldUpdateOperationsInput | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    spaces?: SpaceUncheckedUpdateManyWithoutBucketNestedInput
  }

  export type UserUpsertWithoutMediasUploadedInput = {
    update: XOR<UserUpdateWithoutMediasUploadedInput, UserUncheckedUpdateWithoutMediasUploadedInput>
    create: XOR<UserCreateWithoutMediasUploadedInput, UserUncheckedCreateWithoutMediasUploadedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMediasUploadedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMediasUploadedInput, UserUncheckedUpdateWithoutMediasUploadedInput>
  }

  export type UserUpdateWithoutMediasUploadedInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    role?: RoleUpdateOneWithoutUsersNestedInput
    mediaUploads?: MediaUploadUpdateManyWithoutUserNestedInput
    spaces?: SpaceUpdateManyWithoutUserNestedInput
    buckets?: BucketUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutMediasUploadedInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUploads?: MediaUploadUncheckedUpdateManyWithoutUserNestedInput
    spaces?: SpaceUncheckedUpdateManyWithoutUserNestedInput
    buckets?: BucketUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type SpaceUpsertWithWhereUniqueWithoutMediaInput = {
    where: SpaceWhereUniqueInput
    update: XOR<SpaceUpdateWithoutMediaInput, SpaceUncheckedUpdateWithoutMediaInput>
    create: XOR<SpaceCreateWithoutMediaInput, SpaceUncheckedCreateWithoutMediaInput>
  }

  export type SpaceUpdateWithWhereUniqueWithoutMediaInput = {
    where: SpaceWhereUniqueInput
    data: XOR<SpaceUpdateWithoutMediaInput, SpaceUncheckedUpdateWithoutMediaInput>
  }

  export type SpaceUpdateManyWithWhereWithoutMediaInput = {
    where: SpaceScalarWhereInput
    data: XOR<SpaceUpdateManyMutationInput, SpaceUncheckedUpdateManyWithoutMediaInput>
  }

  export type MediaUploadDetailUpsertWithWhereUniqueWithoutMediaInput = {
    where: MediaUploadDetailWhereUniqueInput
    update: XOR<MediaUploadDetailUpdateWithoutMediaInput, MediaUploadDetailUncheckedUpdateWithoutMediaInput>
    create: XOR<MediaUploadDetailCreateWithoutMediaInput, MediaUploadDetailUncheckedCreateWithoutMediaInput>
  }

  export type MediaUploadDetailUpdateWithWhereUniqueWithoutMediaInput = {
    where: MediaUploadDetailWhereUniqueInput
    data: XOR<MediaUploadDetailUpdateWithoutMediaInput, MediaUploadDetailUncheckedUpdateWithoutMediaInput>
  }

  export type MediaUploadDetailUpdateManyWithWhereWithoutMediaInput = {
    where: MediaUploadDetailScalarWhereInput
    data: XOR<MediaUploadDetailUpdateManyMutationInput, MediaUploadDetailUncheckedUpdateManyWithoutMediaInput>
  }

  export type MediaUploadDetailScalarWhereInput = {
    AND?: MediaUploadDetailScalarWhereInput | MediaUploadDetailScalarWhereInput[]
    OR?: MediaUploadDetailScalarWhereInput[]
    NOT?: MediaUploadDetailScalarWhereInput | MediaUploadDetailScalarWhereInput[]
    id?: IntFilter<"MediaUploadDetail"> | number
    mediaUploadId?: IntFilter<"MediaUploadDetail"> | number
    mediaId?: IntFilter<"MediaUploadDetail"> | number
    spaceId?: IntNullableFilter<"MediaUploadDetail"> | number | null
    createdAt?: DateTimeFilter<"MediaUploadDetail"> | Date | string
  }

  export type UserCreateWithoutMediaUploadsInput = {
    email: string
    name: string
    password: string
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    role?: RoleCreateNestedOneWithoutUsersInput
    mediasUploaded?: MediaCreateNestedManyWithoutUploadedByInput
    spaces?: SpaceCreateNestedManyWithoutUserInput
    buckets?: BucketCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutMediaUploadsInput = {
    id?: number
    email: string
    name: string
    password: string
    roleId?: number | null
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    mediasUploaded?: MediaUncheckedCreateNestedManyWithoutUploadedByInput
    spaces?: SpaceUncheckedCreateNestedManyWithoutUserInput
    buckets?: BucketUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutMediaUploadsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMediaUploadsInput, UserUncheckedCreateWithoutMediaUploadsInput>
  }

  export type MediaUploadDetailCreateWithoutMediaUploadInput = {
    createdAt?: Date | string
    media: MediaCreateNestedOneWithoutMediaDetailsInput
    space?: SpaceCreateNestedOneWithoutUploadDetailsInput
  }

  export type MediaUploadDetailUncheckedCreateWithoutMediaUploadInput = {
    id?: number
    mediaId: number
    spaceId?: number | null
    createdAt?: Date | string
  }

  export type MediaUploadDetailCreateOrConnectWithoutMediaUploadInput = {
    where: MediaUploadDetailWhereUniqueInput
    create: XOR<MediaUploadDetailCreateWithoutMediaUploadInput, MediaUploadDetailUncheckedCreateWithoutMediaUploadInput>
  }

  export type MediaUploadDetailCreateManyMediaUploadInputEnvelope = {
    data: MediaUploadDetailCreateManyMediaUploadInput | MediaUploadDetailCreateManyMediaUploadInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMediaUploadsInput = {
    update: XOR<UserUpdateWithoutMediaUploadsInput, UserUncheckedUpdateWithoutMediaUploadsInput>
    create: XOR<UserCreateWithoutMediaUploadsInput, UserUncheckedCreateWithoutMediaUploadsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMediaUploadsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMediaUploadsInput, UserUncheckedUpdateWithoutMediaUploadsInput>
  }

  export type UserUpdateWithoutMediaUploadsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    role?: RoleUpdateOneWithoutUsersNestedInput
    mediasUploaded?: MediaUpdateManyWithoutUploadedByNestedInput
    spaces?: SpaceUpdateManyWithoutUserNestedInput
    buckets?: BucketUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutMediaUploadsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    mediasUploaded?: MediaUncheckedUpdateManyWithoutUploadedByNestedInput
    spaces?: SpaceUncheckedUpdateManyWithoutUserNestedInput
    buckets?: BucketUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type MediaUploadDetailUpsertWithWhereUniqueWithoutMediaUploadInput = {
    where: MediaUploadDetailWhereUniqueInput
    update: XOR<MediaUploadDetailUpdateWithoutMediaUploadInput, MediaUploadDetailUncheckedUpdateWithoutMediaUploadInput>
    create: XOR<MediaUploadDetailCreateWithoutMediaUploadInput, MediaUploadDetailUncheckedCreateWithoutMediaUploadInput>
  }

  export type MediaUploadDetailUpdateWithWhereUniqueWithoutMediaUploadInput = {
    where: MediaUploadDetailWhereUniqueInput
    data: XOR<MediaUploadDetailUpdateWithoutMediaUploadInput, MediaUploadDetailUncheckedUpdateWithoutMediaUploadInput>
  }

  export type MediaUploadDetailUpdateManyWithWhereWithoutMediaUploadInput = {
    where: MediaUploadDetailScalarWhereInput
    data: XOR<MediaUploadDetailUpdateManyMutationInput, MediaUploadDetailUncheckedUpdateManyWithoutMediaUploadInput>
  }

  export type MediaCreateWithoutMediaDetailsInput = {
    slug?: string
    filename: string
    storedFilename: string
    url: string
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    bucket: BucketCreateNestedOneWithoutMediasInput
    uploadedBy: UserCreateNestedOneWithoutMediasUploadedInput
    spaces?: SpaceCreateNestedManyWithoutMediaInput
  }

  export type MediaUncheckedCreateWithoutMediaDetailsInput = {
    id?: number
    slug?: string
    filename: string
    storedFilename: string
    url: string
    bucketId: number
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    uploadedById: number
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    spaces?: SpaceUncheckedCreateNestedManyWithoutMediaInput
  }

  export type MediaCreateOrConnectWithoutMediaDetailsInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutMediaDetailsInput, MediaUncheckedCreateWithoutMediaDetailsInput>
  }

  export type MediaUploadCreateWithoutDetailsInput = {
    slug?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMediaUploadsInput
  }

  export type MediaUploadUncheckedCreateWithoutDetailsInput = {
    id?: number
    slug?: string
    userId: number
    createdAt?: Date | string
  }

  export type MediaUploadCreateOrConnectWithoutDetailsInput = {
    where: MediaUploadWhereUniqueInput
    create: XOR<MediaUploadCreateWithoutDetailsInput, MediaUploadUncheckedCreateWithoutDetailsInput>
  }

  export type SpaceCreateWithoutUploadDetailsInput = {
    name: string
    slug?: string
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bucket: BucketCreateNestedOneWithoutSpacesInput
    user: UserCreateNestedOneWithoutSpacesInput
    parent?: SpaceCreateNestedOneWithoutChildrenInput
    children?: SpaceCreateNestedManyWithoutParentInput
    media?: MediaCreateNestedOneWithoutSpacesInput
  }

  export type SpaceUncheckedCreateWithoutUploadDetailsInput = {
    id?: number
    name: string
    slug?: string
    parentId?: number | null
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    bucketId: number
    userId: number
    mediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: SpaceUncheckedCreateNestedManyWithoutParentInput
  }

  export type SpaceCreateOrConnectWithoutUploadDetailsInput = {
    where: SpaceWhereUniqueInput
    create: XOR<SpaceCreateWithoutUploadDetailsInput, SpaceUncheckedCreateWithoutUploadDetailsInput>
  }

  export type MediaUpsertWithoutMediaDetailsInput = {
    update: XOR<MediaUpdateWithoutMediaDetailsInput, MediaUncheckedUpdateWithoutMediaDetailsInput>
    create: XOR<MediaCreateWithoutMediaDetailsInput, MediaUncheckedCreateWithoutMediaDetailsInput>
    where?: MediaWhereInput
  }

  export type MediaUpdateToOneWithWhereWithoutMediaDetailsInput = {
    where?: MediaWhereInput
    data: XOR<MediaUpdateWithoutMediaDetailsInput, MediaUncheckedUpdateWithoutMediaDetailsInput>
  }

  export type MediaUpdateWithoutMediaDetailsInput = {
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bucket?: BucketUpdateOneRequiredWithoutMediasNestedInput
    uploadedBy?: UserUpdateOneRequiredWithoutMediasUploadedNestedInput
    spaces?: SpaceUpdateManyWithoutMediaNestedInput
  }

  export type MediaUncheckedUpdateWithoutMediaDetailsInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    bucketId?: IntFieldUpdateOperationsInput | number
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: IntFieldUpdateOperationsInput | number
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    spaces?: SpaceUncheckedUpdateManyWithoutMediaNestedInput
  }

  export type MediaUploadUpsertWithoutDetailsInput = {
    update: XOR<MediaUploadUpdateWithoutDetailsInput, MediaUploadUncheckedUpdateWithoutDetailsInput>
    create: XOR<MediaUploadCreateWithoutDetailsInput, MediaUploadUncheckedCreateWithoutDetailsInput>
    where?: MediaUploadWhereInput
  }

  export type MediaUploadUpdateToOneWithWhereWithoutDetailsInput = {
    where?: MediaUploadWhereInput
    data: XOR<MediaUploadUpdateWithoutDetailsInput, MediaUploadUncheckedUpdateWithoutDetailsInput>
  }

  export type MediaUploadUpdateWithoutDetailsInput = {
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMediaUploadsNestedInput
  }

  export type MediaUploadUncheckedUpdateWithoutDetailsInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpaceUpsertWithoutUploadDetailsInput = {
    update: XOR<SpaceUpdateWithoutUploadDetailsInput, SpaceUncheckedUpdateWithoutUploadDetailsInput>
    create: XOR<SpaceCreateWithoutUploadDetailsInput, SpaceUncheckedCreateWithoutUploadDetailsInput>
    where?: SpaceWhereInput
  }

  export type SpaceUpdateToOneWithWhereWithoutUploadDetailsInput = {
    where?: SpaceWhereInput
    data: XOR<SpaceUpdateWithoutUploadDetailsInput, SpaceUncheckedUpdateWithoutUploadDetailsInput>
  }

  export type SpaceUpdateWithoutUploadDetailsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bucket?: BucketUpdateOneRequiredWithoutSpacesNestedInput
    user?: UserUpdateOneRequiredWithoutSpacesNestedInput
    parent?: SpaceUpdateOneWithoutChildrenNestedInput
    children?: SpaceUpdateManyWithoutParentNestedInput
    media?: MediaUpdateOneWithoutSpacesNestedInput
  }

  export type SpaceUncheckedUpdateWithoutUploadDetailsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bucketId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    mediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: SpaceUncheckedUpdateManyWithoutParentNestedInput
  }

  export type BucketCreateWithoutSpacesInput = {
    name: string
    slug?: string
    accessKeyName: string
    accessKeyId: string
    secretAccessKey: string
    permission?: $Enums.BucketPermission
    isAvailable?: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutBucketsInput
    medias?: MediaCreateNestedManyWithoutBucketInput
  }

  export type BucketUncheckedCreateWithoutSpacesInput = {
    id?: number
    name: string
    slug?: string
    createdById: number
    accessKeyName: string
    accessKeyId: string
    secretAccessKey: string
    permission?: $Enums.BucketPermission
    isAvailable?: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    medias?: MediaUncheckedCreateNestedManyWithoutBucketInput
  }

  export type BucketCreateOrConnectWithoutSpacesInput = {
    where: BucketWhereUniqueInput
    create: XOR<BucketCreateWithoutSpacesInput, BucketUncheckedCreateWithoutSpacesInput>
  }

  export type UserCreateWithoutSpacesInput = {
    email: string
    name: string
    password: string
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    role?: RoleCreateNestedOneWithoutUsersInput
    mediasUploaded?: MediaCreateNestedManyWithoutUploadedByInput
    mediaUploads?: MediaUploadCreateNestedManyWithoutUserInput
    buckets?: BucketCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutSpacesInput = {
    id?: number
    email: string
    name: string
    password: string
    roleId?: number | null
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
    mediasUploaded?: MediaUncheckedCreateNestedManyWithoutUploadedByInput
    mediaUploads?: MediaUploadUncheckedCreateNestedManyWithoutUserInput
    buckets?: BucketUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutSpacesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSpacesInput, UserUncheckedCreateWithoutSpacesInput>
  }

  export type SpaceCreateWithoutChildrenInput = {
    name: string
    slug?: string
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bucket: BucketCreateNestedOneWithoutSpacesInput
    user: UserCreateNestedOneWithoutSpacesInput
    parent?: SpaceCreateNestedOneWithoutChildrenInput
    media?: MediaCreateNestedOneWithoutSpacesInput
    uploadDetails?: MediaUploadDetailCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUncheckedCreateWithoutChildrenInput = {
    id?: number
    name: string
    slug?: string
    parentId?: number | null
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    bucketId: number
    userId: number
    mediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadDetails?: MediaUploadDetailUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type SpaceCreateOrConnectWithoutChildrenInput = {
    where: SpaceWhereUniqueInput
    create: XOR<SpaceCreateWithoutChildrenInput, SpaceUncheckedCreateWithoutChildrenInput>
  }

  export type SpaceCreateWithoutParentInput = {
    name: string
    slug?: string
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bucket: BucketCreateNestedOneWithoutSpacesInput
    user: UserCreateNestedOneWithoutSpacesInput
    children?: SpaceCreateNestedManyWithoutParentInput
    media?: MediaCreateNestedOneWithoutSpacesInput
    uploadDetails?: MediaUploadDetailCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUncheckedCreateWithoutParentInput = {
    id?: number
    name: string
    slug?: string
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    bucketId: number
    userId: number
    mediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: SpaceUncheckedCreateNestedManyWithoutParentInput
    uploadDetails?: MediaUploadDetailUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type SpaceCreateOrConnectWithoutParentInput = {
    where: SpaceWhereUniqueInput
    create: XOR<SpaceCreateWithoutParentInput, SpaceUncheckedCreateWithoutParentInput>
  }

  export type SpaceCreateManyParentInputEnvelope = {
    data: SpaceCreateManyParentInput | SpaceCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type MediaCreateWithoutSpacesInput = {
    slug?: string
    filename: string
    storedFilename: string
    url: string
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    bucket: BucketCreateNestedOneWithoutMediasInput
    uploadedBy: UserCreateNestedOneWithoutMediasUploadedInput
    mediaDetails?: MediaUploadDetailCreateNestedManyWithoutMediaInput
  }

  export type MediaUncheckedCreateWithoutSpacesInput = {
    id?: number
    slug?: string
    filename: string
    storedFilename: string
    url: string
    bucketId: number
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    uploadedById: number
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mediaDetails?: MediaUploadDetailUncheckedCreateNestedManyWithoutMediaInput
  }

  export type MediaCreateOrConnectWithoutSpacesInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutSpacesInput, MediaUncheckedCreateWithoutSpacesInput>
  }

  export type MediaUploadDetailCreateWithoutSpaceInput = {
    createdAt?: Date | string
    media: MediaCreateNestedOneWithoutMediaDetailsInput
    mediaUpload: MediaUploadCreateNestedOneWithoutDetailsInput
  }

  export type MediaUploadDetailUncheckedCreateWithoutSpaceInput = {
    id?: number
    mediaUploadId: number
    mediaId: number
    createdAt?: Date | string
  }

  export type MediaUploadDetailCreateOrConnectWithoutSpaceInput = {
    where: MediaUploadDetailWhereUniqueInput
    create: XOR<MediaUploadDetailCreateWithoutSpaceInput, MediaUploadDetailUncheckedCreateWithoutSpaceInput>
  }

  export type MediaUploadDetailCreateManySpaceInputEnvelope = {
    data: MediaUploadDetailCreateManySpaceInput | MediaUploadDetailCreateManySpaceInput[]
    skipDuplicates?: boolean
  }

  export type BucketUpsertWithoutSpacesInput = {
    update: XOR<BucketUpdateWithoutSpacesInput, BucketUncheckedUpdateWithoutSpacesInput>
    create: XOR<BucketCreateWithoutSpacesInput, BucketUncheckedCreateWithoutSpacesInput>
    where?: BucketWhereInput
  }

  export type BucketUpdateToOneWithWhereWithoutSpacesInput = {
    where?: BucketWhereInput
    data: XOR<BucketUpdateWithoutSpacesInput, BucketUncheckedUpdateWithoutSpacesInput>
  }

  export type BucketUpdateWithoutSpacesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    accessKeyName?: StringFieldUpdateOperationsInput | string
    accessKeyId?: StringFieldUpdateOperationsInput | string
    secretAccessKey?: StringFieldUpdateOperationsInput | string
    permission?: EnumBucketPermissionFieldUpdateOperationsInput | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutBucketsNestedInput
    medias?: MediaUpdateManyWithoutBucketNestedInput
  }

  export type BucketUncheckedUpdateWithoutSpacesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdById?: IntFieldUpdateOperationsInput | number
    accessKeyName?: StringFieldUpdateOperationsInput | string
    accessKeyId?: StringFieldUpdateOperationsInput | string
    secretAccessKey?: StringFieldUpdateOperationsInput | string
    permission?: EnumBucketPermissionFieldUpdateOperationsInput | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: MediaUncheckedUpdateManyWithoutBucketNestedInput
  }

  export type UserUpsertWithoutSpacesInput = {
    update: XOR<UserUpdateWithoutSpacesInput, UserUncheckedUpdateWithoutSpacesInput>
    create: XOR<UserCreateWithoutSpacesInput, UserUncheckedCreateWithoutSpacesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSpacesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSpacesInput, UserUncheckedUpdateWithoutSpacesInput>
  }

  export type UserUpdateWithoutSpacesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    role?: RoleUpdateOneWithoutUsersNestedInput
    mediasUploaded?: MediaUpdateManyWithoutUploadedByNestedInput
    mediaUploads?: MediaUploadUpdateManyWithoutUserNestedInput
    buckets?: BucketUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutSpacesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    mediasUploaded?: MediaUncheckedUpdateManyWithoutUploadedByNestedInput
    mediaUploads?: MediaUploadUncheckedUpdateManyWithoutUserNestedInput
    buckets?: BucketUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type SpaceUpsertWithoutChildrenInput = {
    update: XOR<SpaceUpdateWithoutChildrenInput, SpaceUncheckedUpdateWithoutChildrenInput>
    create: XOR<SpaceCreateWithoutChildrenInput, SpaceUncheckedCreateWithoutChildrenInput>
    where?: SpaceWhereInput
  }

  export type SpaceUpdateToOneWithWhereWithoutChildrenInput = {
    where?: SpaceWhereInput
    data: XOR<SpaceUpdateWithoutChildrenInput, SpaceUncheckedUpdateWithoutChildrenInput>
  }

  export type SpaceUpdateWithoutChildrenInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bucket?: BucketUpdateOneRequiredWithoutSpacesNestedInput
    user?: UserUpdateOneRequiredWithoutSpacesNestedInput
    parent?: SpaceUpdateOneWithoutChildrenNestedInput
    media?: MediaUpdateOneWithoutSpacesNestedInput
    uploadDetails?: MediaUploadDetailUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateWithoutChildrenInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bucketId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    mediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadDetails?: MediaUploadDetailUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUpsertWithWhereUniqueWithoutParentInput = {
    where: SpaceWhereUniqueInput
    update: XOR<SpaceUpdateWithoutParentInput, SpaceUncheckedUpdateWithoutParentInput>
    create: XOR<SpaceCreateWithoutParentInput, SpaceUncheckedCreateWithoutParentInput>
  }

  export type SpaceUpdateWithWhereUniqueWithoutParentInput = {
    where: SpaceWhereUniqueInput
    data: XOR<SpaceUpdateWithoutParentInput, SpaceUncheckedUpdateWithoutParentInput>
  }

  export type SpaceUpdateManyWithWhereWithoutParentInput = {
    where: SpaceScalarWhereInput
    data: XOR<SpaceUpdateManyMutationInput, SpaceUncheckedUpdateManyWithoutParentInput>
  }

  export type MediaUpsertWithoutSpacesInput = {
    update: XOR<MediaUpdateWithoutSpacesInput, MediaUncheckedUpdateWithoutSpacesInput>
    create: XOR<MediaCreateWithoutSpacesInput, MediaUncheckedCreateWithoutSpacesInput>
    where?: MediaWhereInput
  }

  export type MediaUpdateToOneWithWhereWithoutSpacesInput = {
    where?: MediaWhereInput
    data: XOR<MediaUpdateWithoutSpacesInput, MediaUncheckedUpdateWithoutSpacesInput>
  }

  export type MediaUpdateWithoutSpacesInput = {
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bucket?: BucketUpdateOneRequiredWithoutMediasNestedInput
    uploadedBy?: UserUpdateOneRequiredWithoutMediasUploadedNestedInput
    mediaDetails?: MediaUploadDetailUpdateManyWithoutMediaNestedInput
  }

  export type MediaUncheckedUpdateWithoutSpacesInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    bucketId?: IntFieldUpdateOperationsInput | number
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: IntFieldUpdateOperationsInput | number
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mediaDetails?: MediaUploadDetailUncheckedUpdateManyWithoutMediaNestedInput
  }

  export type MediaUploadDetailUpsertWithWhereUniqueWithoutSpaceInput = {
    where: MediaUploadDetailWhereUniqueInput
    update: XOR<MediaUploadDetailUpdateWithoutSpaceInput, MediaUploadDetailUncheckedUpdateWithoutSpaceInput>
    create: XOR<MediaUploadDetailCreateWithoutSpaceInput, MediaUploadDetailUncheckedCreateWithoutSpaceInput>
  }

  export type MediaUploadDetailUpdateWithWhereUniqueWithoutSpaceInput = {
    where: MediaUploadDetailWhereUniqueInput
    data: XOR<MediaUploadDetailUpdateWithoutSpaceInput, MediaUploadDetailUncheckedUpdateWithoutSpaceInput>
  }

  export type MediaUploadDetailUpdateManyWithWhereWithoutSpaceInput = {
    where: MediaUploadDetailScalarWhereInput
    data: XOR<MediaUploadDetailUpdateManyMutationInput, MediaUploadDetailUncheckedUpdateManyWithoutSpaceInput>
  }

  export type MediaCreateManyUploadedByInput = {
    id?: number
    slug?: string
    filename: string
    storedFilename: string
    url: string
    bucketId: number
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaUploadCreateManyUserInput = {
    id?: number
    slug?: string
    createdAt?: Date | string
  }

  export type SpaceCreateManyUserInput = {
    id?: number
    name: string
    slug?: string
    parentId?: number | null
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    bucketId: number
    mediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BucketCreateManyCreatedByInput = {
    id?: number
    name: string
    slug?: string
    accessKeyName: string
    accessKeyId: string
    secretAccessKey: string
    permission?: $Enums.BucketPermission
    isAvailable?: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaUpdateWithoutUploadedByInput = {
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bucket?: BucketUpdateOneRequiredWithoutMediasNestedInput
    spaces?: SpaceUpdateManyWithoutMediaNestedInput
    mediaDetails?: MediaUploadDetailUpdateManyWithoutMediaNestedInput
  }

  export type MediaUncheckedUpdateWithoutUploadedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    bucketId?: IntFieldUpdateOperationsInput | number
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    spaces?: SpaceUncheckedUpdateManyWithoutMediaNestedInput
    mediaDetails?: MediaUploadDetailUncheckedUpdateManyWithoutMediaNestedInput
  }

  export type MediaUncheckedUpdateManyWithoutUploadedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    bucketId?: IntFieldUpdateOperationsInput | number
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadUpdateWithoutUserInput = {
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: MediaUploadDetailUpdateManyWithoutMediaUploadNestedInput
  }

  export type MediaUploadUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: MediaUploadDetailUncheckedUpdateManyWithoutMediaUploadNestedInput
  }

  export type MediaUploadUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpaceUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bucket?: BucketUpdateOneRequiredWithoutSpacesNestedInput
    parent?: SpaceUpdateOneWithoutChildrenNestedInput
    children?: SpaceUpdateManyWithoutParentNestedInput
    media?: MediaUpdateOneWithoutSpacesNestedInput
    uploadDetails?: MediaUploadDetailUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bucketId?: IntFieldUpdateOperationsInput | number
    mediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: SpaceUncheckedUpdateManyWithoutParentNestedInput
    uploadDetails?: MediaUploadDetailUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bucketId?: IntFieldUpdateOperationsInput | number
    mediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BucketUpdateWithoutCreatedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    accessKeyName?: StringFieldUpdateOperationsInput | string
    accessKeyId?: StringFieldUpdateOperationsInput | string
    secretAccessKey?: StringFieldUpdateOperationsInput | string
    permission?: EnumBucketPermissionFieldUpdateOperationsInput | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: MediaUpdateManyWithoutBucketNestedInput
    spaces?: SpaceUpdateManyWithoutBucketNestedInput
  }

  export type BucketUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    accessKeyName?: StringFieldUpdateOperationsInput | string
    accessKeyId?: StringFieldUpdateOperationsInput | string
    secretAccessKey?: StringFieldUpdateOperationsInput | string
    permission?: EnumBucketPermissionFieldUpdateOperationsInput | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: MediaUncheckedUpdateManyWithoutBucketNestedInput
    spaces?: SpaceUncheckedUpdateManyWithoutBucketNestedInput
  }

  export type BucketUncheckedUpdateManyWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    accessKeyName?: StringFieldUpdateOperationsInput | string
    accessKeyId?: StringFieldUpdateOperationsInput | string
    secretAccessKey?: StringFieldUpdateOperationsInput | string
    permission?: EnumBucketPermissionFieldUpdateOperationsInput | $Enums.BucketPermission
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyRoleInput = {
    id?: number
    email: string
    name: string
    password: string
    slug?: string
    profilePicture: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fullNameKh?: string | null
    fullNameEn?: string | null
    gender?: $Enums.Gender | null
    generalDepartment?: string | null
    department?: string | null
    office?: string | null
    phoneNumber?: string | null
    currentRole?: string | null
  }

  export type RolePermissionCreateManyRoleInput = {
    moduleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slug?: string
  }

  export type UserUpdateWithoutRoleInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    mediasUploaded?: MediaUpdateManyWithoutUploadedByNestedInput
    mediaUploads?: MediaUploadUpdateManyWithoutUserNestedInput
    spaces?: SpaceUpdateManyWithoutUserNestedInput
    buckets?: BucketUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
    mediasUploaded?: MediaUncheckedUpdateManyWithoutUploadedByNestedInput
    mediaUploads?: MediaUploadUncheckedUpdateManyWithoutUserNestedInput
    spaces?: SpaceUncheckedUpdateManyWithoutUserNestedInput
    buckets?: BucketUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    profilePicture?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fullNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    fullNameEn?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    generalDepartment?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    currentRole?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RolePermissionUpdateWithoutRoleInput = {
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    module?: PermissionModuleUpdateOneRequiredWithoutRolesNestedInput
  }

  export type RolePermissionUncheckedUpdateWithoutRoleInput = {
    moduleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type RolePermissionUncheckedUpdateManyWithoutRoleInput = {
    moduleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type RolePermissionCreateManyModuleInput = {
    roleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    slug?: string
  }

  export type RolePermissionUpdateWithoutModuleInput = {
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: RoleUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type RolePermissionUncheckedUpdateWithoutModuleInput = {
    roleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type RolePermissionUncheckedUpdateManyWithoutModuleInput = {
    roleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type MediaCreateManyBucketInput = {
    id?: number
    slug?: string
    filename: string
    storedFilename: string
    url: string
    path?: string | null
    fileType: $Enums.MediaType
    mimetype: string
    extension: string
    size: number
    title?: string | null
    altText?: string | null
    description?: string | null
    uploadedById: number
    isVisibility?: $Enums.Visibility
    isAccessible?: $Enums.Visibility
    width?: number | null
    height?: number | null
    uploadedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpaceCreateManyBucketInput = {
    id?: number
    name: string
    slug?: string
    parentId?: number | null
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    userId: number
    mediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaUpdateWithoutBucketInput = {
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: UserUpdateOneRequiredWithoutMediasUploadedNestedInput
    spaces?: SpaceUpdateManyWithoutMediaNestedInput
    mediaDetails?: MediaUploadDetailUpdateManyWithoutMediaNestedInput
  }

  export type MediaUncheckedUpdateWithoutBucketInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: IntFieldUpdateOperationsInput | number
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    spaces?: SpaceUncheckedUpdateManyWithoutMediaNestedInput
    mediaDetails?: MediaUploadDetailUncheckedUpdateManyWithoutMediaNestedInput
  }

  export type MediaUncheckedUpdateManyWithoutBucketInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    storedFilename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    path?: NullableStringFieldUpdateOperationsInput | string | null
    fileType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mimetype?: StringFieldUpdateOperationsInput | string
    extension?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: IntFieldUpdateOperationsInput | number
    isVisibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    isAccessible?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpaceUpdateWithoutBucketInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSpacesNestedInput
    parent?: SpaceUpdateOneWithoutChildrenNestedInput
    children?: SpaceUpdateManyWithoutParentNestedInput
    media?: MediaUpdateOneWithoutSpacesNestedInput
    uploadDetails?: MediaUploadDetailUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateWithoutBucketInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    mediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: SpaceUncheckedUpdateManyWithoutParentNestedInput
    uploadDetails?: MediaUploadDetailUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateManyWithoutBucketInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    mediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpaceCreateManyMediaInput = {
    id?: number
    name: string
    slug?: string
    parentId?: number | null
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    bucketId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaUploadDetailCreateManyMediaInput = {
    id?: number
    mediaUploadId: number
    spaceId?: number | null
    createdAt?: Date | string
  }

  export type SpaceUpdateWithoutMediaInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bucket?: BucketUpdateOneRequiredWithoutSpacesNestedInput
    user?: UserUpdateOneRequiredWithoutSpacesNestedInput
    parent?: SpaceUpdateOneWithoutChildrenNestedInput
    children?: SpaceUpdateManyWithoutParentNestedInput
    uploadDetails?: MediaUploadDetailUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateWithoutMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bucketId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: SpaceUncheckedUpdateManyWithoutParentNestedInput
    uploadDetails?: MediaUploadDetailUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateManyWithoutMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bucketId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadDetailUpdateWithoutMediaInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mediaUpload?: MediaUploadUpdateOneRequiredWithoutDetailsNestedInput
    space?: SpaceUpdateOneWithoutUploadDetailsNestedInput
  }

  export type MediaUploadDetailUncheckedUpdateWithoutMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaUploadId?: IntFieldUpdateOperationsInput | number
    spaceId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadDetailUncheckedUpdateManyWithoutMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaUploadId?: IntFieldUpdateOperationsInput | number
    spaceId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadDetailCreateManyMediaUploadInput = {
    id?: number
    mediaId: number
    spaceId?: number | null
    createdAt?: Date | string
  }

  export type MediaUploadDetailUpdateWithoutMediaUploadInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUpdateOneRequiredWithoutMediaDetailsNestedInput
    space?: SpaceUpdateOneWithoutUploadDetailsNestedInput
  }

  export type MediaUploadDetailUncheckedUpdateWithoutMediaUploadInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaId?: IntFieldUpdateOperationsInput | number
    spaceId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadDetailUncheckedUpdateManyWithoutMediaUploadInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaId?: IntFieldUpdateOperationsInput | number
    spaceId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpaceCreateManyParentInput = {
    id?: number
    name: string
    slug?: string
    isAvailable?: $Enums.Visibility
    uploadedAt?: Date | string | null
    bucketId: number
    userId: number
    mediaId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaUploadDetailCreateManySpaceInput = {
    id?: number
    mediaUploadId: number
    mediaId: number
    createdAt?: Date | string
  }

  export type SpaceUpdateWithoutParentInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bucket?: BucketUpdateOneRequiredWithoutSpacesNestedInput
    user?: UserUpdateOneRequiredWithoutSpacesNestedInput
    children?: SpaceUpdateManyWithoutParentNestedInput
    media?: MediaUpdateOneWithoutSpacesNestedInput
    uploadDetails?: MediaUploadDetailUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bucketId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    mediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: SpaceUncheckedUpdateManyWithoutParentNestedInput
    uploadDetails?: MediaUploadDetailUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateManyWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isAvailable?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    uploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bucketId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    mediaId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadDetailUpdateWithoutSpaceInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUpdateOneRequiredWithoutMediaDetailsNestedInput
    mediaUpload?: MediaUploadUpdateOneRequiredWithoutDetailsNestedInput
  }

  export type MediaUploadDetailUncheckedUpdateWithoutSpaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaUploadId?: IntFieldUpdateOperationsInput | number
    mediaId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaUploadDetailUncheckedUpdateManyWithoutSpaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaUploadId?: IntFieldUpdateOperationsInput | number
    mediaId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}