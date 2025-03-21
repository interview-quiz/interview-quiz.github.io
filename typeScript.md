# TypeScript.md
- Typescript-5-8-beta:  https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/
-  https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers
-  https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- Typescript-5-8-RC:  https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-rc/

# TypeScript Topics (Basic to Advanced)

## 1. Basics
- Introduction to TypeScript  
- Installing and Setting Up TypeScript  
- TypeScript Compiler (`tsc`)  
- Basic Types (`number`, `string`, `boolean`, `null`, `undefined`)  
- Type Inference and Type Annotations  

## 2. Functions and Variables
- `let`, `const`, and `var`  
- Function Parameters and Return Types  
- Optional and Default Parameters  
- Rest Parameters  
- Function Overloading  

## 3. Advanced Types
- Union Types  
- Intersection Types  
- Literal Types  
- Type Aliases  
- Enums (Numeric, String, Heterogeneous)  
- Type Assertions (`as` and `<Type>`)  
- Unknown and Never Types  
- Void Type  

## 4. Interfaces and Type Aliases
- Defining Interfaces  
- Extending Interfaces  
- Readonly and Optional Properties  
- Index Signatures (Index Types)  
- Function Types with Interfaces  
- Differences Between Interfaces and Type Aliases  

## 5. Classes and Object-Oriented Programming
- Classes and Objects  
- Access Modifiers (`public`, `private`, `protected`)  
- Readonly Properties  
- Getters and Setters  
- Static Properties and Methods  
- Abstract Classes and Methods  
- Class Inheritance  
- Implementing Interfaces in Classes  

## 6. Generics
- Generic Functions  
- Generic Classes  
- Generic Interfaces  
- Constraints in Generics  
- Using `keyof` with Generics  

## 7. Advanced Type Features
- Mapped Types  
- Conditional Types  
- Template Literal Types  
- Utility Types (`Partial`, `Required`, `Readonly`, `Record`, `Pick`, `Omit`, etc.)  
- Indexed Access Types (`T[K]`)  
- Key Remapping in Mapped Types  
- **Infer Type in Conditional Types**  

## 8. Modules and Namespaces
- Import and Export Syntax  
- Default and Named Exports  
- Importing JSON Modules  
- Using `namespace`  
- Triple-Slash Directives (`/// <reference>`)  

## 9. Asynchronous Programming
- Promises and Async/Await  
- Using `fetch` with TypeScript  
- Error Handling in Async Functions  
- Working with `axios` and HTTP Requests  

## 10. TypeScript with JavaScript Frameworks
- Using TypeScript with React (`tsx`)  
- TypeScript with Angular  
- TypeScript with Vue  
- TypeScript with Node.js  

## 11. Decorators and Metadata
- Introduction to Decorators  
- Class Decorators  
- Method Decorators  
- Property Decorators  
- Parameter Decorators  
- Metadata Reflection (`Reflect-metadata`)  

## 12. TypeScript Compiler and Configuration
- `tsconfig.json` Configuration  
- Compiler Options (`strict`, `noImplicitAny`, `strictNullChecks`, etc.)  
- Source Maps and Debugging  
- TypeScript Path Mapping  
- Using `tsc` with Different Module Resolutions  

## 13. Testing in TypeScript
- Unit Testing with Jest and TypeScript  
- TypeScript with Mocha and Chai  
- Writing Type-Safe Tests  

## 14. Working with Third-Party Libraries
- Using DefinitelyTyped (`@types/...`)  
- Writing Custom Type Declarations (`*.d.ts`)  
- Handling Type Incompatibilities in External Libraries  

## 15. Advanced TypeScript Features
- Discriminated Unions  
- Recursive Types  
- Branded Types (Nominal Typing)  
- Variadic Tuple Types  
- Type Guards and `typeof`, `instanceof`  
- Exhaustive Checking with `never`  
- **Infer Type (`infer`) in Mapped and Conditional Types**  

## 16. TypeScript Performance Optimization
- Tree Shaking  
- Reducing Type Complexity  
- Avoiding Excessive Type Inference  
- Compiler Performance Optimizations  

## 17. TypeScript for Large-Scale Applications
- Monorepos and TypeScript  
- Dependency Injection in TypeScript  
- Modular Code Design  
- Best Practices for Scalable TypeScript Applications  

## 18. Deno and TypeScript
- Introduction to Deno  
- Using TypeScript with Deno  
- Differences Between Deno and Node.js  

## 19. TypeScript Design Patterns
- Singleton Pattern  
- Factory Pattern  
- Observer Pattern  
- Decorator Pattern  
- Dependency Injection Pattern  

## 20. Advanced TypeScript Debugging
- Debugging in VS Code  
- Using Source Maps for Debugging  
- Logging and Error Handling in TypeScript  

## 21. TypeScript and WebAssembly
- Compiling TypeScript to WebAssembly  
- Using AssemblyScript  


## **Benefits of TypeScript**

### 1. **Static Typing**

    TypeScript provides static type checking, which helps catch type-related errors during development rather than at runtime.
    Improves code quality and reduces bugs, especially in large codebases.

### 2. **Improved Code Readability and Maintainability**

    Types serve as documentation for your code, making it easier to understand.
    Explicit types help developers understand data structures and APIs, improving collaboration in teams.

### 3. **Enhanced IDE Support**

TypeScript enhances code editors (e.g., VSCode) with features like:
IntelliSense (auto-completion)
Type inference
Code navigation (go-to-definition, find references)
Refactoring tools

### 4. **Better Refactoring**

    With TypeScript’s type system, refactoring becomes safer because the compiler can point out areas affected by changes.
    Large-scale refactors are easier since type errors are immediately visible.

### 5. **Early Error Detection**

    TypeScript detects common errors (e.g., misspelled variables, incorrect function calls) during development.
    Reduces runtime exceptions, leading to more robust applications.

### 6. **Supports Modern JavaScript Features**

TypeScript supports ESNext features (e.g., async/await, modules, destructuring) and compiles them to older JavaScript versions.

This allows developers to use the latest JavaScript features while ensuring compatibility with older environments.

### 7. **Type Inference**

TypeScript can infer types based on the context, reducing the need for explicit type annotations while still providing type safety.

### 8. **Enhanced Object-Oriented Programming**

TypeScript supports advanced OOP concepts like:
Interfaces
Abstract classes
Access modifiers (`public`, `private`, `protected`)
Generics
Helps enforce design patterns and principles in complex applications.

### 9. **Better Integration with Libraries**

TypeScript offers a vast collection of type definitions for third-party JavaScript libraries (`@types`).
Even if a library is written in plain JavaScript, you can use its types to get strong typing and IDE support.

### 10. **Scalable Codebases**

As codebases grow, maintaining plain JavaScript becomes harder.
TypeScript’s type system, modularization features, and tooling help in managing large projects effectively.

### 11. **Community and Ecosystem**

Strong community support and widespread adoption by major frameworks (React, Angular, Vue, etc.).
Many modern frameworks and libraries come with built-in TypeScript support or type definitions.

### 12. **Interoperability with JavaScript**

TypeScript is a superset of JavaScript, meaning any valid JavaScript is valid TypeScript.
You can gradually adopt TypeScript in an existing JavaScript project without rewriting everything.

### 13. **Improved Debugging Experience**

TypeScript can catch errors before running the code, making debugging faster.
The generated JavaScript code is often cleaner and easier to debug.

### 14. **Optional Static Typing**

While TypeScript enforces types, it also allows dynamic typing, giving flexibility where strict types are unnecessary.

### **Use Cases**

**Enterprise Applications**: TypeScript’s type safety and maintainability make it ideal for large, complex applications.
**Open-Source Libraries**: Many popular libraries use TypeScript for better developer experience and reliability.
**Cross-Platform Apps**: TypeScript is used in frameworks like React Native, Angular, and Ionic to build cross-platform applications.

---

# **Key Concepts in Type Manipulation**

## what is Record in typescript?

## **1. Mapped Types**

Mapped types create new types by transforming properties of an existing type.

```ts
type User = {
  id: number;
  name: string;
  isAdmin: boolean;
};

// Create a type with all properties optional
type PartialUser = {
  [K in keyof User]?: User[K];
};
```

**Explanation**:

- `keyof User` extracts the keys of `User` (`'id' | 'name' | 'isAdmin'`).
- `[K in keyof User]` iterates over each key.
- `User[K]` represents the type of each key.

**Built-in Utility Example**:

```ts
type PartialUser = Partial<User>; // Built-in mapped type
```

---

## **2. Keyof Operator**

`keyof` extracts the keys of a type as a union of string literals.

```ts
type User = {
  id: number;
  name: string;
};

type UserKeys = keyof User; // 'id' | 'name'
```

This is useful when you want to create dynamic property access or enforce strict key checks.

---

## **3. Conditional Types**

Conditional types allow defining types based on conditions.

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

Conditional types are useful for creating type-level logic, such as filtering types or enforcing constraints.

---

## **4. Infer Keyword**

`infer` is used within conditional types to extract a part of a type.

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type MyFunction = () => number;
type Result = ReturnType<MyFunction>; // number


```

Here, `infer R` extracts the return type of a function.

---

## **5. Utility Types**

TypeScript provides built-in utility types that simplify common type manipulations.

- `Partial<T>`: Makes all properties of `T` optional.
- `Required<T>`: Makes all properties of `T` required.
- `Readonly<T>`: Makes all properties of `T` read-only.
- `Pick<T, K>`: Picks a subset of properties from `T`.
- `Omit<T, K>`: Omits a subset of properties from `T`.

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type UserWithoutEmail = Omit<User, "email">;
```

---

## **6. Template Literal Types**

You can create string literal types using template literals.

```ts
type Status = "loading" | "success" | "error";
type StatusMessage = `Status is ${Status}`;

const message: StatusMessage = "Status is success";
```

---

## **7. Recursive Types**

Recursive types are types that reference themselves, useful for defining complex structures like trees or nested arrays.

```ts
type NestedArray<T> = T | NestedArray<T>[];

const example: NestedArray<number> = [1, [2, [3, 4]], 5];
```

---

## **Practical Example: Deep Partial**

Let's create a utility type `DeepPartial<T>` that makes all properties and nested properties optional.

```ts
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
```

---

## **Use Cases of Type Manipulation**

1. **Dynamic API Responses**: Manipulate API response types based on specific conditions (e.g., partial updates).
2. **Form Builders**: Create types for form fields dynamically based on the data model.
3. **Data Validation**: Define strict validation types using conditional types and inference.

---

Would you like me to create some practical examples of type manipulation for your **Next.js project**?

---

## **Best Practices for Adding Types in a Next.js Project**

In a Next.js project, TypeScript types can be applied at various levels, such as pages, API routes, components, props, hooks, and more. Below are best practices with examples on where and how to add types effectively:

---

## **1. Adding Types to Page Components**

In Next.js, pages are React components, so adding types to `props` and `NextPage` is essential.

```ts
// pages/index.tsx
import { NextPage } from "next";

type HomeProps = {
  title: string;
};

const Home: NextPage<HomeProps> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default Home;
```

**Best Practice**:

- Use `NextPage<Props>` for page components.
- Define `Props` as a separate type or interface.
- For pages without props, use `NextPage` without generic arguments.

---

## **2. Adding Types to getStaticProps and getServerSideProps**

Both `getStaticProps` and `getServerSideProps` have built-in type support.

```ts
// pages/blog.tsx
import { GetStaticProps, NextPage } from "next";

type BlogPost = {
  id: number;
  title: string;
};

type BlogProps = {
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts: BlogPost[] = await fetch("https://api.example.com/posts").then(
    (res) => res.json()
  );
  return { props: { posts } };
};

const Blog: NextPage<BlogProps> = ({ posts }) => (
  <div>
    {posts.map((post) => (
      <h2 key={post.id}>{post.title}</h2>
    ))}
  </div>
);

export default Blog;
```

**Best Practice**:

- Use `GetStaticProps<T>` or `GetServerSideProps<T>` to ensure type safety for returned props.
- Define types for the props returned by these functions and the data they fetch.

---

## **3. Adding Types to API Routes**

For API routes, use `NextApiRequest` and `NextApiResponse`.

```ts
// pages/api/hello.ts
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ message: "Hello World" });
}
```

**Best Practice**:

- Use `NextApiRequest` for request typing.
- Use `NextApiResponse<T>` where `T` is the response data type.

---

## **4. Adding Types to Custom Hooks**

When creating custom hooks, type the parameters and return values.

```ts
// hooks/useUser.ts
import { useState } from "react";

type User = {
  id: number;
  name: string;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  return { user, setUser };
}
```

**Best Practice**:

- Always type the state and return values explicitly.
- Use generics when your hook needs to be reusable with different types.

---

## **5. Adding Types to Components and Props**

Typing React components and props is crucial for reusability and maintainability.

```ts
// components/Button.tsx
import React from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    {label}
  </button>
);

export default Button;
```

**Best Practice**:

- Use `React.FC<Props>` for functional components (or explicitly type `props`).
- Define optional props using `?`.

---

## **6. Adding Types to Context**

For context, ensure both the context value and provider are properly typed.

```ts
// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  login: (username: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => {
    setUser(username);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
```

**Best Practice**:

- Type both the context value (`AuthContextType`) and the children prop.
- Ensure proper typing for `useContext` to avoid runtime errors.

---

## **7. Using Utility Types for Props**

Use utility types like `Pick`, `Omit`, and `Partial` when working with props.

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

// Pick only id and name for a component
type UserCardProps = Pick<User, "id" | "name">;

const UserCard: React.FC<UserCardProps> = ({ id, name }) => (
  <div>
    <p>ID: {id}</p>
    <p>Name: {name}</p>
  </div>
);
```

---

## **8. Adding Types for External Libraries**

For external libraries without types, you can create custom types using `declare`.

```ts
// types/custom-lib.d.ts
declare module "custom-lib" {
  export function customFunction(param: string): boolean;
}
```

---

## **9. Adding Types to Configuration Files**

Type Next.js configuration files like `next.config.js`.

```ts
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
```

---

## **General Best Practices**

1. **Enable Strict Mode**:  
   Ensure `strict` mode is enabled in `tsconfig.json` to enforce strict type checking.

   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true
     }
   }
   ```

2. **Use `interface` vs `type` Appropriately**:

   - Use `interface` for defining object shapes (especially when they might be extended).
   - Use `type` for complex types, unions, or when defining utility types.

3. **Leverage Generics**:  
   Use generics to make reusable components, hooks, and functions type-safe.

4. **Avoid `any`**:  
   Always try to use specific types. If a type is unknown, prefer `unknown` over `any`.

---

Would you like detailed examples of type manipulation applied to your **Next.js project** (e.g., reusable components, hooks)?



# TypeScript Generics and Utility Types

TypeScript provides powerful features like **Generics** and **Utility Types** to create flexible, reusable, and type-safe code. This guide covers these concepts with practical examples.

---

## **Generics**
Generics allow you to define reusable code with type parameters. This makes your code flexible and type-safe.

### **Basic Syntax**
```typescript
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello")); // Output: Hello
console.log(identity<number>(42));      // Output: 42
```

---

### **Generic Functions**
You can use generics to create functions that accept and return types dynamically:
```typescript
function getArray<T>(items: T[]): T[] {
  return new Array<T>().concat(items);
}

let numArray = getArray<number>([1, 2, 3]);
let strArray = getArray<string>(["A", "B", "C"]);
```

---

### **Generic Interfaces**
```typescript
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

let obj: KeyValuePair<string, number> = { key: "Age", value: 30 };
```

---

### **Generic Classes**
```typescript
class Box<T> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  getValue(): T {
    return this._value;
  }
}

let numberBox = new Box<number>(100);
console.log(numberBox.getValue()); // Output: 100
```

---

### **Generic Constraints**
```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
  console.log(item.length);
}

logLength("Hello"); // Valid
logLength([1, 2, 3]); // Valid
// logLength(10); // ❌ Error: number does not have length
```

---

## **`Record` Utility Type**
The `Record` type allows you to create an object type with specific keys and values.

### **Syntax**
```typescript
Record<Keys, Type>
```
- `Keys`: A union of keys that the object will have.
- `Type`: The type of the values corresponding to those keys.

### **Example Usage**
```typescript
type RolePermissions = Record<"admin" | "editor" | "viewer", boolean>;

const permissions: RolePermissions = {
  admin: true,
  editor: false,
  viewer: true,
};

// another example
type UserRoles = Record<string, string>;
// Equivalent to:
// type UserRoles = {
//   [key: string]: string;
// }

const roles: UserRoles = {
  admin: "Admin",
  user: "User",
};

```

---

## **Other Utility Types**
TypeScript provides several built-in utility types to simplify type manipulation.

### **1. `Partial<T>`**
Makes all properties optional:
```typescript

interface User {
  id: number;
  name: string;
  age: number;
}

type PartialUser = Partial<User>;
// Equivalent to:
// type PartialUser = {
//   id?: number;
//   name?: string;
//   age?: number;
// }
```

### **2. `Readonly<T>`**
Makes all properties read-only:
```typescript
type User = { name: string; age: number };
const readonlyUser: Readonly<User> = { name: "Alice", age: 25 };
// readonlyUser.name = "Bob"; // ❌ Error

// another example 

interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;
// Equivalent to:
// type ReadonlyUser = {
//   readonly id: number;
//   readonly name: string;
// }

```

### **3. `Pick<T, Keys>`**
Creates a type by picking specific keys from `T`:
```typescript

type User = { name: string; age: number; email: string };

type UserPreview = Pick<User, "name" | "email">;
const userPreview: UserPreview = { name: "Alice", email: "alice@example.com" };

// Description: Creates a new type by picking a set of properties K from T.
interface User {
  id: number;
  name: string;
  age: number;
}

type UserNameAndAge = Pick<User, 'name' | 'age'>;
// Equivalent to:
// type UserNameAndAge = {
//   name: string;
//   age: number;
// }


```

### **4. `Omit<T, Keys>`**
Creates a type by omitting specific keys from `T`:
```typescript
type User = { name: string; age: number; email: string };

type WithoutEmail = Omit<User, "email">;
const user: WithoutEmail = { name: "Alice", age: 25 };

// Description: Creates a new type by omitting a set of properties K from T.

interface User {
  id: number;
  name: string;
  age: number;
}

type UserWithoutAge = Omit<User, 'age'>;
// Equivalent to:
// type UserWithoutAge = {
//   id: number;
//   name: string;
// }

```

### **5. `Required<T>`**
Makes all properties required:
```typescript
interface User {
  id?: number;
  name?: string;
  age?: number;
}

type RequiredUser = Required<User>;
// Equivalent to:
// type RequiredUser = {
//   id: number;
//   name: string;
//   age: number;
// }
```

### **6. `ReturnType<T>`**
Extracts the return type of a function:
```typescript
function getUser() {
  return { name: "Alice", age: 25 };
}

type User = ReturnType<typeof getUser>; // { name: string; age: number }
```

### **7. `Exclude<T, U>`**
Excludes types from `T` that are assignable to `U`:
```typescript
type Status = "active" | "inactive" | "archived";
type ActiveStatus = Exclude<Status, "archived">;

// another example
type T = string | number | boolean;
type U = string | boolean;

type Result = Exclude<T, U>;
// Result is 'number'

```

### **8. `Extract<T, U>`**
Extracts types from `T` that are assignable to `U`:
```typescript
type Status = "active" | "inactive" | "archived";
type OnlyArchived = Extract<Status, "archived">;

// another example
type T = string | number | boolean;
type U = string | boolean;

type Result = Extract<T, U>;
// Result is 'string' | 'boolean'

```

### **9. `NonNullable<T>`**
Removes `null` and `undefined` from `T`:
```typescript
type User = string | null | undefined;
type NonNullUser = NonNullable<User>; // string

// another example
type T = string | number | null | undefined;
type Result = NonNullable<T>;
// Result is 'string' | 'number'

```

### **10. `Parameters<T>`**
Gets the parameter types of a function type as a tuple:
```typescript
type Func = (name: string, age: number) => void;
type Params = Parameters<Func>; // [string, number]
```

---

## **Conclusion**
Generics and utility types make TypeScript a robust and flexible language for building scalable applications. By mastering these tools, you can create reusable, type-safe, and clean code.

Feel free to explore and experiment with these concepts in your projects!



# Difference Between `any`, `unknown`, and `never` in TypeScript

In TypeScript, `any`, `unknown`, and `never` are three special types that serve different purposes. Here’s a detailed comparison of their differences:  

| Type      | Meaning | Usage | Safety Level |
|-----------|---------|-------|--------------|
| `any`     | Can be anything; disables type checking. | Used when you don’t care about type safety. | **Unsafe** ❌ |
| `unknown` | Can be anything, but must be type-checked before use. | Used when dealing with uncertain types. | **Safer than `any`** ✅ |
| `never`   | Represents values that **never occur**. | Used for functions that never return or for exhaustive type checking. | **Strictest** ✅✅ |

---

## **1️⃣ `any` (No Type Safety)**
The `any` type allows **anything** and effectively disables TypeScript’s type checking.

```typescript
let value: any;

value = 42;          // ✅ Allowed
value = "hello";     // ✅ Allowed
value = true;        // ✅ Allowed

// You can do anything with `any`, but it's dangerous
value.toUpperCase(); // ✅ No error (even if value is a number)
```

### **Drawbacks of `any`**
- No compile-time safety.
- Can lead to unexpected runtime errors.
- TypeScript does **not** check what you're doing with `any`.

---

## **2️⃣ `unknown` (Safer Alternative to `any`)**
The `unknown` type **accepts any value**, but unlike `any`, you **must** type-check it before using it.

```typescript
let value: unknown;

value = 42;          // ✅ Allowed
value = "hello";     // ✅ Allowed

// ❌ Error: TypeScript doesn't know the actual type
// value.toUpperCase();  

// ✅ Must type-check first
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ Safe
}
```

### **Why Use `unknown` Instead of `any`?**
- Prevents unsafe operations.
- Encourages type-checking before use.
- Ensures better type safety in applications.

---

## **3️⃣ `never` (Impossible Values)**
The `never` type is used for values that **never occur**. It usually appears in functions that throw errors or enter infinite loops.

```typescript
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    console.log("Running forever...");
  }
}
```

### **When to Use `never`?**
- Functions that **always throw errors**.
- Functions that **never return** (like infinite loops).
- **Exhaustive type checking** in a `switch` statement:

```typescript
type Shape = "circle" | "square";

function getShape(shape: Shape): string {
  switch (shape) {
    case "circle":
      return "It’s a circle!";
    case "square":
      return "It’s a square!";
    default:
      const _exhaustiveCheck: never = shape; // Ensures all cases are handled
      throw new Error(`Unexpected shape: ${_exhaustiveCheck}`);
  }
}
```

If a new shape is added (`"triangle"`), TypeScript will **force** you to update this function.

---

## **Key Differences Summarized**
| Feature  | `any` | `unknown` | `never` |
|----------|------|----------|--------|
| Accepts any value? | ✅ Yes | ✅ Yes | ❌ No |
| Type-check required? | ❌ No | ✅ Yes | ✅ N/A |
| Safe to use? | ❌ No | ✅ Yes | ✅ Yes |
| Used in function return types? | ✅ Yes | ✅ Yes | ✅ Yes, but only when function never returns |

### **When Should You Use Each?**
- ✅ Use **`any`** when you **don’t care about type safety** (e.g., third-party libraries).
- ✅ Use **`unknown`** when you receive **unknown data** (e.g., API responses) but want **type safety**.
- ✅ Use **`never`** for **functions that never return** or for **exhaustive type checking**.

## Index Types

10.Dependency Injection: Dependency Injection is a pattern that allows you to bring code into your component without actually creating or managing it there. While it may seem like using a library, it's different because you don’t need to install or import it via a CDN or API.

At first glance, it might also seem similar to using functions for reusability, as both allow for code reuse. However, if we use functions directly in our components, it can lead to tight coupling between them. This means that any change in the function or its logic could impact every place it is used.

Dependency Injection solves this problem by decoupling the creation of dependencies from the components that use them, making the code more maintainable and testable.

Example without dependency injection

```ts
// Health-related service classes without interfaces
class MentalWellness {
  getMentalWellnessAdvice(): string {
    return "Take time to meditate and relax your mind.";
  }
}

class PhysicalWellness {
  getPhysicalWellnessAdvice(): string {
    return "Make sure to exercise daily for at least 30 minutes.";
  }
}

// HealthAdvice class directly creating instances of the services
class HealthAdvice {
  private mentalWellnessService: MentalWellness;
  private physicalWellnessService: PhysicalWellness;

  // Directly creating instances inside the class constructor
  constructor() {
    this.mentalWellnessService = new MentalWellness();
    this.physicalWellnessService = new PhysicalWellness();
  }

  // Method to get both mental and physical wellness advice
  getHealthAdvice(): string {
    return `${this.mentalWellnessService.getMentalWellnessAdvice()} Also, ${this.physicalWellnessService.getPhysicalWellnessAdvice()}`;
  }
}

// Creating an instance of HealthAdvice, which itself creates instances of the services
const healthAdvice = new HealthAdvice();

console.log(healthAdvice.getHealthAdvice());
// Output: "Take time to meditate and relax your mind. Also, Make sure to exercise daily for at least 30 minutes."


```
Example with Dependecy Injection

```ts
// Health-related service interfaces with "I" prefix
interface IMentalWellnessService {
  getMentalWellnessAdvice(): string;
}

interface IPhysicalWellnessService {
  getPhysicalWellnessAdvice(): string;
}

// Implementations of the services
class MentalWellness implements IMentalWellnessService {
  getMentalWellnessAdvice(): string {
    return "Take time to meditate and relax your mind.";
  }
}

class PhysicalWellness implements IPhysicalWellnessService {
  getPhysicalWellnessAdvice(): string {
    return "Make sure to exercise daily for at least 30 minutes.";
  }
}

// HealthAdvice class that depends on services via interfaces
class HealthAdvice {
  private mentalWellnessService: IMentalWellnessService;
  private physicalWellnessService: IPhysicalWellnessService;

  // Dependency injection via constructor
  constructor(
    mentalWellnessService: IMentalWellnessService,
    physicalWellnessService: IPhysicalWellnessService
  ) {
    this.mentalWellnessService = mentalWellnessService;
    this.physicalWellnessService = physicalWellnessService;
  }

  // Method to get both mental and physical wellness advice
  getHealthAdvice(): string {
    return `${this.mentalWellnessService.getMentalWellnessAdvice()} Also, ${this.physicalWellnessService.getPhysicalWellnessAdvice()}`;
  }
}

// Dependency injection
const mentalWellness: IMentalWellnessService = new MentalWellness();
const physicalWellness: IPhysicalWellnessService = new PhysicalWellness();

// Injecting services into the HealthAdvice class
const healthAdvice = new HealthAdvice(mentalWellness, physicalWellness);

console.log(healthAdvice.getHealthAdvice());
// Output: "Take time to meditate and relax your mind. Also, Make sure to exercise daily for at least 30 minutes."


```
In a tightly coupled scenario, if you have a stressLevel attribute in the MentalWellness class today and decide to change it to something else tomorrow, you would need to update all the places where it was used. This can lead to a lot of refactoring and maintenance challenges.

However, with dependency injection and the use of interfaces, you can avoid this problem. By passing the dependencies (such as the MentalWellness service) through the constructor, the specific implementation details (like the stressLevel attribute) are abstracted away behind the interface. This means that changes to the attribute or class do not require modifications in the dependent classes, as long as the interface remains the same. This approach ensures that the code is loosely coupled, more maintainable, and easier to test, as you’re injecting what’s needed at runtime without tightly coupling components.

# Type vs Interface in TypeScript

When working with TypeScript, both `type` and `interface` can be used to define the structure of objects, but they have some key differences. Below is a guide to help you understand when to use each.

## 1. When to Use `interface`
Use `interface` when:
- You need to define an object structure (especially for classes and objects).
- You want to take advantage of declaration merging.
- You need to extend other interfaces.

### Example:
```typescript
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

const user: User = {
  id: 1,
  name: "John Doe"
};
```

### Extending Interfaces
Interfaces can be extended using `extends`:
```typescript
interface Admin extends User {
  role: string;
}
```

### Declaration Merging
If you define the same interface multiple times, TypeScript will merge them:
```typescript
interface User {
  age?: number;
}
// Now, User has id, name, email, and age properties.
```

## 2. When to Use `type`
Use `type` when:
- You need to define primitive types, unions, tuples, or mapped types.
- You want to define a union or intersection of multiple types.
- You do not need declaration merging.

### Example:
```typescript
type ID = number | string; // Union type

type Point = {
  x: number;
  y: number;
};

const p: Point = { x: 10, y: 20 };
```

### Using Type for Union Types
```typescript
type Status = "success" | "error" | "loading";
```

### Intersection of Types
```typescript
type Name = { name: string };
type Age = { age: number };

type Person = Name & Age; // Combines both types
```

## 3. Key Differences
| Feature | `interface` | `type` |
|---------|------------|--------|
| Can be extended | ✅ `extends` keyword | ✅ `&` operator |
| Can be merged | ✅ Yes | ❌ No |
| Can define functions | ✅ Yes | ✅ Yes |
| Can define unions | ❌ No | ✅ Yes |
| Can define tuples | ❌ No | ✅ Yes |
| Can define primitive types | ❌ No | ✅ Yes |

## 4. Best Practices
- Use `interface` for defining object shapes and when working with classes.
- Use `type` for unions, intersections, and more complex type definitions.
- Prefer `interface` when possible, as it provides better readability and declaration merging.

By following these guidelines, you can decide whether to use `type` or `interface` based on your needs in TypeScript development.

![Image](https://github.com/user-attachments/assets/a7d5f99d-aa07-4611-b256-5cc4264afe31)
![Image](https://github.com/user-attachments/assets/ae7df367-bf0d-41c4-af66-b74aa009d6f4)
![Image](https://github.com/user-attachments/assets/be7c66e4-4d3d-4862-a375-3bff70f11a67)
![Image](https://github.com/user-attachments/assets/9d14ca8c-9ffe-4317-925d-56da60212529)
![Image](https://github.com/user-attachments/assets/93e29a81-cafe-4599-88e5-b9be364e0ac8)



# **Namespace and Triple-Slash Directives in TypeScript**

## **Namespace in TypeScript**

A **namespace** in TypeScript is a way to organize and group related functionalities together under a single name to prevent naming conflicts. It is similar to a module but mainly used when working with older codebases or when the project does not use ES6 modules.

---

## **How to Use Namespace in TypeScript**

### **1. Declaring a Namespace**

You can define a namespace using the `namespace` keyword.

```typescript
namespace MathOperations {
    export function add(a: number, b: number): number {
        return a + b;
    }

    export function subtract(a: number, b: number): number {
        return a - b;
    }
}
```

- Everything inside a namespace is **not accessible** outside unless explicitly marked with `export`.
- Functions, interfaces, and classes inside a namespace must be exported to be used outside.

---

### **2. Accessing a Namespace**

To use a function inside a namespace, you need to access it using dot (`.`) notation.

```typescript
console.log(MathOperations.add(5, 3));       // Output: 8
console.log(MathOperations.subtract(10, 4)); // Output: 6
```

---

### **3. Nested Namespaces**

You can also have namespaces inside namespaces.

```typescript
namespace App {
    export namespace Utilities {
        export function logMessage(message: string): void {
            console.log("Log:", message);
        }
    }
}

App.Utilities.logMessage("Hello, Namespace!"); // Output: Log: Hello, Namespace!
```

---

### **4. Using Namespace in Multiple Files**

If you want to use a namespace defined in another file, you must reference it using **Triple-Slash Directives** (`/// <reference>`).

#### **File: `mathOperations.ts`**
```typescript
namespace MathOperations {
    export function multiply(a: number, b: number): number {
        return a * b;
    }
}
```

#### **File: `app.ts`**
```typescript
/// <reference path="mathOperations.ts" />

console.log(MathOperations.multiply(4, 5)); // Output: 20
```

- The `/// <reference path="file.ts" />` directive helps TypeScript find the definition of the namespace from another file.

---

### **5. Namespace vs. Modules**

| Feature            | Namespace | Module |
|--------------------|----------|--------|
| Scope             | Global    | File-based |
| Import Required?  | No        | Yes (`import/export`) |
| Best for          | Legacy code, large projects with no module bundler | Modern applications using ES6 modules |
| Usage in Node.js  | Not recommended | Preferred |

Namespaces are now **less common** because ES6 modules (`import/export`) are the standard. However, they are still useful for organizing large TypeScript projects.

---

## **Triple-Slash Directives (`/// <reference>`)**

Triple-slash directives are special **single-line comments** that provide compiler instructions.

### **Types of Triple-Slash Directives**

1. **`/// <reference path="file.ts" />`**
   - Used to include another TypeScript file.
   - Example:
     ```typescript
     /// <reference path="mathOperations.ts" />
     ```

2. **`/// <reference types="library-name" />`**
   - Used to include type definitions from `@types` packages.
   - Example:
     ```typescript
     /// <reference types="node" />
     ```

3. **`/// <amd-module />`**
   - Used for AMD (Asynchronous Module Definition) module systems.

4. **`/// <reference lib="es2015" />`**
   - Used to include built-in TypeScript library features.

---

### **When to Use Triple-Slash Directives**

- When working with namespaces across multiple files.
- When including type definitions for third-party libraries.
- When explicitly referencing TypeScript libraries.

For modern TypeScript projects, **triple-slash directives are rarely needed**, as ES6 modules (`import/export`) handle dependencies better.

---

## **Summary**

- **Namespaces** help organize code but are rarely used in modern TypeScript projects.
- **Triple-Slash Directives (`/// <reference>`)** are special comments that help the TypeScript compiler find files or types.
- **Modules (`import/export`) are preferred over namespaces** in most cases.




# TypeScript Object-Oriented Programming (OOP)

## **1. Classes and Objects**

### **What are Classes and Objects?**
A **class** is a blueprint for creating objects. An **object** is an instance of a class that contains properties and methods.

### **Example**
```typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const person1 = new Person("Tauhidul", 30);
person1.greet();

```

---

## **2. Access Modifiers (public, private, protected)**

| Modifier | Description |
|----------|-------------|
| **public** | Accessible everywhere (default) |
| **private** | Accessible only within the class |
| **protected** | Accessible within the class and subclasses |

### **Example**
```typescript
class Animal {
  public name: string;   // Accessible everywhere
  private age: number;   // Accessible only inside this class
  protected type: string; // Accessible inside this class and subclasses

  constructor(name: string, age: number, type: string) {
    this.name = name;
    this.age = age;
    this.type = type;
  }

  public getAge() {
    return this.age; // Allowed as it's inside the class
  }
}

class Dog extends Animal {
  constructor(name: string, age: number, type: string) {
    super(name, age, type);
  }

  getType() {
    return this.type; // Allowed because it's protected
  }
}

const dog = new Dog("Buddy", 3, "Mammal");
console.log(dog.name);  // ✅ Allowed
console.log(dog.getType()); // ✅ Allowed
// console.log(dog.age);  ❌ Error: Property 'age' is private

```

---

## **3. Readonly Properties**

`readonly` properties can only be assigned during declaration or inside the constructor.

### **Example**
```typescript
class Car {
  readonly brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }

  displayBrand() {
    console.log(`Car brand: ${this.brand}`);
  }
}

const myCar = new Car("Toyota");
myCar.displayBrand();
// myCar.brand = "Honda"; ❌ Error: Cannot assign to 'brand' because it is a read-only property

```

---

## **4. Getters and Setters**

Getters retrieve property values, and setters modify them with validation.

### **Example**
```typescript
class Employee {
  private _salary: number;

  constructor(salary: number) {
    this._salary = salary;
  }

  get salary(): number {
    return this._salary;
  }

  set salary(amount: number) {
    if (amount > 0) {
      this._salary = amount;
    } else {
      console.log("Salary must be positive.");
    }
  }
}

const emp = new Employee(5000);
console.log(emp.salary); // Using getter

emp.salary = 6000; // Using setter
console.log(emp.salary);

// emp.salary = -1000; ❌ Error: Salary must be positive.

```

---

## **5. Static Properties and Methods**

### **What is a Static Member?**
A **static property** or **method** belongs to the class itself rather than any individual instance.
- You can access it directly using the class name.
- You don't need to create an instance to use it.
- It's shared across all instances of the class.

### **Example**
```typescript
class MathUtils {
  static PI: number = 3.1416;

  static circleArea(radius: number): number {
    return this.PI * radius * radius;
  }
}

console.log(MathUtils.PI); // ✅ Allowed
console.log(MathUtils.circleArea(5)); // ✅ Allowed
```

Why use static properties?

- Memory-efficient: A static property is stored once rather than being copied for every object.
- Global Access: Useful for constants and utility functions.

```typescript
class Logger {
  static log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}

Logger.log("Application started"); // ✅ Calling without creating an object

```

- When to Use Static Members?

| Use Case | Example |
|----------|-------------|
| **Constants** | Math.PI |
| **Utility Functions** | console.log(), Date.now() |
| **Factory Methods** | Array.from(), Object.create() |


---

## **6. Abstract Classes and Methods**

### **What is an Abstract Class?**
An **abstract class** serves as a blueprint for other classes and cannot be instantiated directly.
- Have both implemented and abstract methods (methods without implementation).
- Force child classes to implement certain methods.

### **Example**
```typescript
abstract class Shape {
  abstract getArea(): number; // Abstract method

  display() {
    console.log("This is a shape.");
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 20);
console.log(rect.getArea()); // ✅ 200
rect.display(); // ✅ This is a shape

```

- Why Use Abstract Classes?
- Enforces Consistency: All subclasses must implement the abstract methods.
- Code Reusability: Common functionality (like display() above) can be shared.
- Polymorphism: You can write code that works with any subclass of the abstract class.

| Feature | Abstract Class | Interface |
|----------|-------------| ----- |
| **Can have implementation** | ✅Yes  | ❌ No |
| **Can have properties** | ✅Yes | ❌  No |
| **Supports multiple inheritance** | ❌  No | ✅Yes |
| **Can have constructors** | ✅Yes | ❌  No |


---

## **7. Class Inheritance**

### **Example**
```typescript
class Vehicle {
  constructor(public brand: string) {}

  drive() {
    console.log(`${this.brand} is moving.`);
  }
}

class Truck extends Vehicle {
  constructor(brand: string, public loadCapacity: number) {
    super(brand);
  }

  showCapacity() {
    console.log(`Load capacity: ${this.loadCapacity} tons.`);
  }
}

const truck = new Truck("Volvo", 5);
truck.drive(); // ✅ Volvo is moving.
truck.showCapacity(); // ✅ Load capacity: 5 tons.

```

---

## **8. Implementing Interfaces in Classes**

Interfaces define a contract that classes must follow.

### **Example**
```typescript
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  constructor(public name: string) {}

  makeSound() {
    console.log("Woof! Woof!");
  }
}

const myDog = new Dog("Buddy");
console.log(myDog.name);
myDog.makeSound();

```

---

## **Static Members vs. Abstract Classes**

| Feature | Static Members | Abstract Classes |
|---------|---------------|------------------|
| **Purpose** | Shared functionality | Base class for related objects |
| **Instantiated?** | ❌ No | ❌ No (must be extended) |
| **Can store state?** | ✅ Yes, globally | ✅ Yes, for each subclass instance |
| **Example Use Cases** | Utility functions, constants | Shape hierarchies, payment systems |

---

## **Conclusion**
- **Use Static Members** for **global state, utility functions, and constants**.
- **Use Abstract Classes** when **different classes share behavior but need custom implementations**.

Would you like to contribute or improve this guide? Feel free to fork and enhance it!
































