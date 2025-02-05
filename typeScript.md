# TypeScript.md
- Typescript-5-8-beta:  https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/

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
