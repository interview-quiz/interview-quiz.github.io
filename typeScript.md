# TypeScript.md


1. Advanced Types

Mapped Types: Creating types by transforming existing ones.

Conditional Types: Using conditions within types (T extends U ? X : Y).

Template Literal Types: Creating types using template literals.

Utility Types: Deep understanding of built-in utility types like Partial, Pick, Omit, Required, Readonly, etc.

Distributive Conditional Types: How conditional types behave when applied to unions.


2. Type Manipulation

Infer Keyword: Extracting types in conditional types.

Key Remapping: Using mapped types with as to remap keys.

Recursive Types: Defining types that recursively reference themselves.


3. Generics (Advanced Usage)

Generic Constraints: Restricting generic types with extends.

Generic Variance: Covariance and contravariance in generics.

Higher-order Generics: Using generics to define higher-order types.


4. Declaration Merging

Combining multiple declarations (interfaces, modules, functions) into a single entity.


5. Module Augmentation

Extending third-party libraries by augmenting their types.


6. Type Narrowing

Advanced narrowing techniques beyond simple type guards (using assertion functions and custom type guards).


7. Symbol and Unique Symbol

Using symbol and unique symbol for defining unique and constant values in types.


8. Type Inference and Type Compatibility

How TypeScript infers types in complex scenarios.

Structural vs nominal typing.


9. Advanced Decorators

Creating advanced class, method, and property decorators in TypeScript.


10. Compiler API

Working with TypeScript’s Compiler API to create custom tools, linters, or code transformers.


11. Advanced JSX & React Types

Intrinsic element types.

Extending JSX.IntrinsicElements for custom components.

Typing React.forwardRef, React.Context, React.HOC, and hooks.


12. Advanced Configuration & Performance

Custom TypeScript configurations for large codebases (tsconfig.json optimization).

Strict mode options (strict, strictFunctionTypes, strictBindCallApply).

Incremental and project references for faster builds.


13. Advanced Error Handling with Types

Creating exhaustive type checks with never.

Handling complex union and intersection types in error handling.


14. Type-Level Programming

Type Functions: Using types as functions to transform other types.

Type-Level Recursion: Recursive operations on types.

Type-Level Assertions: Ensuring certain type conditions at compile time.


15. Practical Use Cases

Writing a type-safe library.

Building a schema validator using types.

Creating a type-safe form builder.



Type Manipulation in TypeScript

Type manipulation refers to techniques in TypeScript that allow us to create new types by transforming existing ones. These techniques are powerful when working with complex data structures and enable developers to write reusable, maintainable, and type-safe code.




---

Key Concepts in Type Manipulation

1. Mapped Types

Mapped types create new types by transforming properties of an existing type.

type User = {
  id: number;
  name: string;
  isAdmin: boolean;
};

// Create a type with all properties optional
type PartialUser = {
  [K in keyof User]?: User[K];
};

Explanation:

keyof User extracts the keys of User ('id' | 'name' | 'isAdmin').

[K in keyof User] iterates over each key.

User[K] represents the type of each key.


Built-in Utility Example:

type PartialUser = Partial<User>; // Built-in mapped type


---

2. Keyof Operator

keyof extracts the keys of a type as a union of string literals.

type User = {
  id: number;
  name: string;
};

type UserKeys = keyof User; // 'id' | 'name'

This is useful when you want to create dynamic property access or enforce strict key checks.


---

3. Conditional Types

Conditional types allow defining types based on conditions.

type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

Conditional types are useful for creating type-level logic, such as filtering types or enforcing constraints.


---

4. Infer Keyword

infer is used within conditional types to extract a part of a type.

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type MyFunction = () => number;
type Result = ReturnType<MyFunction>; // number

Here, infer R extracts the return type of a function.


---

5. Utility Types

TypeScript provides built-in utility types that simplify common type manipulations.

Partial<T>: Makes all properties of T optional.

Required<T>: Makes all properties of T required.

Readonly<T>: Makes all properties of T read-only.

Pick<T, K>: Picks a subset of properties from T.

Omit<T, K>: Omits a subset of properties from T.


type User = {
  id: number;
  name: string;
  email: string;
};

type UserWithoutEmail = Omit<User, 'email'>;


---

6. Template Literal Types

You can create string literal types using template literals.

type Status = 'loading' | 'success' | 'error';
type StatusMessage = `Status is ${Status}`;

const message: StatusMessage = 'Status is success';


---

7. Recursive Types

Recursive types are types that reference themselves, useful for defining complex structures like trees or nested arrays.

type NestedArray<T> = T | NestedArray<T>[];

const example: NestedArray<number> = [1, [2, [3, 4]], 5];


---

Practical Example: Deep Partial

Let's create a utility type DeepPartial<T> that makes all properties and nested properties optional.

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type User = {
  id: number;
  profile: {
    name: string;
    address: {
      street: string;
      city: string;
    };
  };
};

type PartialUser = DeepPartial<User>;


---

Use Cases of Type Manipulation

1. Dynamic API Responses: Manipulate API response types based on specific conditions (e.g., partial updates).


2. Form Builders: Create types for form fields dynamically based on the data model.


3. Data Validation: Define strict validation types using conditional types and inference.




---

Would you like me to create some practical examples of type manipulation for your Next.js project?

