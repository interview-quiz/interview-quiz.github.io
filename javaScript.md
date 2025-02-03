# Advance JavaScript


## Asynchronous Programming
- Promises and chaining
- async/await
- Event loop and microtasks
- Managing multiple async tasks with Promise.all, Promise.race, etc.

## JavaScript Design Patterns
- Module pattern
- Singleton
- Factory pattern
- Observer pattern
- Decorator pattern


## Performance Optimization
- Debouncing and throttling
- Memory management
- Understanding garbage collection
- Optimizing DOM manipulation
- Web Workers
- Deep Dive into Prototypes and Inheritance

## Prototype chain
- __proto__ vs prototype
- Object creation with Object.create()
- Classical vs prototypal inheritance

## Closures and Scopes
- Lexical scoping
- Closure examples and use cases
- Memory implications of closures

## Advanced Functions
- Currying
- Higher-order functions
- Partial application
- Function composition

## Metaprogramming
- Understanding Proxy and Reflect
- Dynamic object manipulation
- Symbols and their use in object properties

## ES6+ Features
- Destructuring, spread/rest operators
- Template literals and tagged templates
- Iterators and generators
- Sets and Maps
- WeakSet and WeakMap

## Module Systems
- ES6 Modules (import/export)
- CommonJS vs ES6 Modules
- Dynamic imports (import())
- Module bundlers (Webpack, Rollup, etc.)
# Advanced JavaScript Topics

## Error Handling
- Custom error types
- Error boundaries in JavaScript
- Handling asynchronous errors
- Global error handling

## Event Handling
- Event delegation
- Custom events with EventTarget or CustomEvent
- Bubbling, capturing, and stopping propagation

## JavaScript Engines
- How V8 engine works
- Just-in-time (JIT) compilation
- Understanding call stack and heap

## Advanced Object Handling
- Object freezing and sealing
- Immutability patterns
- Object descriptors (writable, enumerable, etc.)
- Object.defineProperty and Object.defineProperties

## Internationalization (i18n)
- Using Intl API for formatting dates, numbers, and currencies
- Pluralization and locales

## Typed JavaScript
- Type checking with TypeScript or JSDoc
- Understanding strict mode ("use strict")

## Reactive Programming
- Using RxJS for reactive programming
- Observables and operators

## Unit Testing and Debugging
- Writing unit tests with Jest or Mocha
- Debugging with Chrome DevTools
- Code coverage tools

## Server-Side JavaScript
- Introduction to Node.js
- File system manipulation
- Streams and buffers

## Building Custom Libraries
- Publishing libraries to npm
- Writing reusable components
- Bundling with Rollup or Webpack

## Patterns for Large Applications
- State management
- Modular architecture
- Dependency injection


# Advanced JavaScript Topics: Asynchronous Programming

This guide covers the following advanced JavaScript topics:
1. Callback functions
2. Promises and chaining
3. async/await
4. Managing multiple async tasks with `Promise.all` and `Promise.race`
5. Differences between parallel, concurrent, and sequential execution

---

## **1. Callback Functions**
A callback is a function passed as an argument to another function. It allows asynchronous operations by executing code after a task is completed.

Example:
```javascript
function fetchData(callback) {
  setTimeout(() => {
    console.log("Data fetched");
    callback();
  }, 2000);
}

fetchData(() => {
  console.log("Processing data...");
});
```

---

## **2. Promises**
A **Promise** represents a value that may be available now, in the future, or never. It has three states:
- **Pending**: Initial state
- **Fulfilled**: The operation completed successfully
- **Rejected**: The operation failed

### Creating and Using Promises:
```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Task completed!");
    } else {
      reject("Task failed!");
    }
  }, 2000);
});

myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Chaining Promises:
```javascript
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => {
    console.log("Data received:", data);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
```

---

## **3. async/await**
The `async/await` syntax simplifies working with Promises, making asynchronous code look synchronous.

### Using async/await:
```javascript
const fetchData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log("Data received:", data);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

fetchData();
```

---

## **4. Managing Multiple Promises**

### **Promise.all**:
Waits for **all promises to resolve** or any one to reject.
```javascript
const promise1 = fetch("https://api.example.com/data1").then((res) => res.json());
const promise2 = fetch("https://api.example.com/data2").then((res) => res.json());

Promise.all([promise1, promise2])
  .then((results) => {
    console.log("Results:", results);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
```

### **Promise.race**:
Resolves or rejects as soon as **any one promise settles**.
```javascript
const slowPromise = new Promise((resolve) => setTimeout(() => resolve("Slow!"), 3000));
const fastPromise = new Promise((resolve) => setTimeout(() => resolve("Fast!"), 1000));

Promise.race([slowPromise, fastPromise])
  .then((result) => {
    console.log("First resolved:", result);
  });
```

---

## **5. Sequential vs Concurrent vs Parallel Execution**

### **1. Sequential Execution**
Tasks are executed **one after the other**, waiting for each to complete before starting the next.
```javascript
async function sequentialTasks() {
  console.log("Start Task 1");
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Task 1: Waits 2s
  console.log("End Task 1");

  console.log("Start Task 2");
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Task 2: Waits 1s
  console.log("End Task 2");
}

sequentialTasks();
```
**Output:**
```
Start Task 1
(2-second delay)
End Task 1
Start Task 2
(1-second delay)
End Task 2
```
**Total Time Taken**: 3 seconds.

---

### **2. Concurrent Execution**
Tasks **start at the same time**, but they share resources and may take turns progressing.
```javascript
async function task1() {
  console.log("Task 1 Start");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("Task 1 End");
}

async function task2() {
  console.log("Task 2 Start");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Task 2 End");
}

task1();
task2();
```
**Output:**
```
Task 1 Start
Task 2 Start
Task 2 End (after 1 second)
Task 1 End (after 2 seconds)
```
**Total Time Taken**: ~2 seconds.

---

### **3. Parallel Execution**
Tasks are executed **simultaneously** on different threads or processors.
```javascript
async function parallelTasks() {
  const task1 = new Promise((resolve) => setTimeout(() => resolve("Task 1 Done"), 2000));
  const task2 = new Promise((resolve) => setTimeout(() => resolve("Task 2 Done"), 1000));

  const results = await Promise.all([task1, task2]);
  console.log(results); // ["Task 1 Done", "Task 2 Done"]
}

parallelTasks();
```
**Output:**
```
(After 2 seconds)
["Task 1 Done", "Task 2 Done"]
```
**Total Time Taken**: ~2 seconds.

---

### **Summary Table**
| **Aspect**       | **Sequential**                      | **Concurrent**                                | **Parallel**                                 |
|-------------------|-------------------------------------|-----------------------------------------------|----------------------------------------------|
| **Execution**     | Tasks run **one after another**.    | Tasks **appear to run simultaneously** but share resources. | Tasks run **exactly at the same time** on multiple threads/cores. |
| **Time Taken**    | Sum of all task durations.          | Total time is governed by the **slowest task** if tasks overlap. | Total time depends on the **longest individual task**. |
| **Example**       | Async `await` used sequentially.    | Overlapping async functions (event loop).     | Multi-threading (e.g., using Web Workers).   |

---

### **Final Notes**
- Use **Promises** for simpler workflows.
- Use **async/await** for cleaner, more readable asynchronous code.
- Choose between **sequential**, **concurrent**, or **parallel** execution based on the task requirements.
# Advanced JavaScript Concepts

## 1. JavaScript Prototypes and Inheritance

### Prototype Chain
- Prototype is an object from which other objects inherit properties.
- Every object in JavaScript has an internal link to its **prototype** object, accessible via `__proto__`.
- When you access a property or method on an object, JavaScript first checks the object itself. If it doesn’t find the property, it looks at the object’s prototype, and so on up the chain until it finds the property or reaches the end of the chain (where the prototype is null).
- If a property isn’t found in an object, JavaScript looks up the prototype chain until it finds the property or reaches the end (where the prototype is `null`).

#### Example:
```javascript
const obj = { name: 'John' };

console.log(obj.toString()); // Found in `Object.prototype`
console.log(obj.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null
```

---

### `__proto__` vs `prototype`
- **`__proto__`**: Refers to the actual prototype of an object.
- **`prototype`**: A property of functions, used when creating objects via constructors or `class`.

#### Example:
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};

const john = new Person('John');
console.log(john.__proto__ === Person.prototype); // true
john.greet(); // Hello, my name is John
```

---

### Object Creation with `Object.create()`
- Creates a new object with a specified prototype object.

#### Example:
```javascript
const parent = { greet() { console.log('Hello from parent'); } };

const child = Object.create(parent);
child.name = 'Child';
console.log(child.name); // 'Child'


child.greet(); // 'Hello from parent'
console.log(Object.getPrototypeOf(child) === parent); // true

```

---

### Classical vs Prototypal Inheritance
- **Classical Inheritance**: Uses class hierarchies (e.g., Java, C++).
- **Prototypal Inheritance**: Objects inherit directly from other objects.

#### Example of Classical Inheritance:
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog('Rex');
dog.speak(); // Rex barks.
```

#### Example of Prototypal Inheritance:
```javascript
const animal = {
  speak() {
    console.log(`${this.name} makes a noise.`);
  },
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.speak(); // Rex makes a noise.
```

##  Object.prototype and the Global Prototype
- Object.prototype is the top of the prototype chain for all objects.
- Built-in objects (e.g., Array, Function) have their own prototype chains, but they eventually inherit from Object.prototype.

```javascript
const arr = [];
console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true



```
##  Extending Prototypes
You can add methods to built-in prototypes, but it's generally discouraged because it can lead to conflicts.

```javascript
Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
};

console.log([1, 2, 3].sum()); // 6


```
##   Shadowing Properties in the Prototype Chain
- If an object has its own property with the same name as a property in its prototype, it "shadows" the prototype property.

```javascript
const parent = { name: 'Parent' };
const child = Object.create(parent);
child.name = 'Child';

console.log(child.name); // 'Child' (shadowed)
console.log(child.__proto__.name); // 'Parent'

```

##  How new Works
- When you use the new keyword:

- A new object is created.
- The object's __proto__ is set to the constructor's prototype.
- The constructor function is called with the new object as this.
- If the constructor explicitly returns an object, that object is returned; otherwise, the new object is returned.

```javascript
function Person(name) {
  this.name = name;
}

const john = new Person('John');
console.log(john.__proto__ === Person.prototype); // true


```

## Prototype-Based Polymorphism
- Polymorphism allows objects to override methods in the prototype chain.

```javascript
function Animal() {}
Animal.prototype.speak = function () {
  console.log('Animal speaks');
};

function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.speak = function () {
  console.log('Dog barks');
};

const dog = new Dog();
dog.speak(); // Dog barks
```


---


## 2. Closures and Scopes

### Closures
- A closure is a combination of a function and its lexical environment.
- Functions retain access to their outer scope even after the outer function has returned.

#### Example:
```javascript
function outer() {
  const outerVar = 'I’m from outer';

  function inner() {
    console.log(outerVar);
  }

  return inner;
}

const innerFn = outer();
innerFn(); // "I’m from outer"
```

---

### Lexical Scoping
- Variables are resolved based on their location in the source code, not where they are called.

#### Example:
```javascript
function outer() {
  const outerVar = 'I’m from outer';

  function inner() {
    console.log(outerVar);
  }

  return inner;
}

const innerFn = outer();
innerFn();
```

---

### Use Cases for Closures
#### 1. Preserving State
```javascript
function counter() {
  let count = 0;

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
  };
}

const myCounter = counter();
console.log(myCounter.increment()); // 1
console.log(myCounter.decrement()); // 0
```

#### 2. Partial Application
```javascript
function multiply(factor) {
  return function (num) {
    return num * factor;
  };
}

const double = multiply(2);
console.log(double(5)); // 10
```

#### 3. Event Listeners
```javascript
function attachListener() {
  const message = 'Button clicked!';

  document.querySelector('button').addEventListener('click', () => {
    console.log(message);
  });
}
attachListener();
```

---

## 3. Advanced Functions

### Currying
- Transforming a function with multiple arguments into a sequence of functions, each accepting a single argument.

#### Example:
```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}

const add5 = add(5);
console.log(add5(10)); // 15
console.log(add(3)(4)); // 7
```

---

### Higher-Order Functions
- Functions that take other functions as arguments or return them as results.

#### Example:
```javascript
function greet(name, formatter) {
  console.log(formatter(name));
}

function politeFormatter(name) {
  return `Hello, ${name}`;
}

greet('John', politeFormatter); // Hello, John
```

---

### Partial Application
- Creating a new function by fixing some arguments of an existing function.

#### Example:
```javascript
function add(a, b) {
  return a + b;
}

const add5 = add.bind(null, 5);
console.log(add5(10)); // 15
```

---

### Function Composition
- Combining multiple functions to produce a new function.

#### Example:
```javascript
const multiplyBy2 = (x) => x * 2;
const subtract3 = (x) => x - 3;

const compose = (f, g) => (x) => f(g(x));
const multiplyThenSubtract = compose(subtract3, multiplyBy2);

console.log(multiplyThenSubtract(5)); // (5 * 2) - 3 = 7

```



# JavaScript Common Patterns

## **1. Module Pattern**
Encapsulates private variables and exposes only necessary methods.
```javascript
const Module = (function () {
  let privateVar = "I am private";

  function privateMethod() {
    console.log(privateVar);
  }

  return {
    publicMethod: function () {
      privateMethod();
    },
  };
})();

Module.publicMethod(); // "I am private"
```
✅ Use for: Encapsulation, maintaining private state.

---

## **2. Factory Pattern**
Returns objects with shared properties or methods.
```javascript
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    },
  };
}

const person1 = createPerson("Alice", 25);
person1.greet(); // "Hello, my name is Alice"
```
✅ Use for: Creating multiple instances with shared methods.

---

## **3. Singleton Pattern**
Ensures only one instance of an object is created.
```javascript
const Singleton = (function () {
  let instance;

  function createInstance() {
    return { data: "I am the only instance" };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const obj1 = Singleton.getInstance();
const obj2 = Singleton.getInstance();
console.log(obj1 === obj2); // true
```
✅ Use for: Shared configurations, caching.

---

## **4. Observer Pattern**
Objects (subscribers) react to state changes of another object (subject).
```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

const subject = new Subject();

const observer1 = (data) => console.log(`Observer 1: ${data}`);
const observer2 = (data) => console.log(`Observer 2: ${data}`);

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.notify("Event Triggered!");
```
✅ Use for: Event-driven architectures, real-time updates.

---

## **5. Prototype Pattern**
Uses prototype inheritance to optimize object creation.
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};

const person1 = new Person("Bob");
person1.greet(); // "Hello, my name is Bob"
```
✅ Use for: Performance optimization via shared methods.

---

## **6. Revealing Module Pattern**
A more readable version of the module pattern.
```javascript
const Counter = (function () {
  let count = 0;

  function increment() {
    count++;
  }

  function getCount() {
    return count;
  }

  return {
    increment,
    getCount,
  };
})();

Counter.increment();
console.log(Counter.getCount()); // 1
```
✅ Use for: Encapsulation with clear public/private method distinction.

---

## **7. Mediator Pattern**
Manages communication between multiple objects without them interacting directly.
```javascript
class Chatroom {
  constructor() {
    this.users = {};
  }

  register(user) {
    this.users[user.name] = user;
    user.chatroom = this;
  }

  send(message, from, to) {
    if (to) {
      this.users[to].receive(message, from);
    } else {
      Object.keys(this.users).forEach((key) => {
        if (key !== from) this.users[key].receive(message, from);
      });
    }
  }
}

class User {
  constructor(name) {
    this.name = name;
  }

  send(message, to) {
    this.chatroom.send(message, this.name, to);
  }

  receive(message, from) {
    console.log(`${from} to ${this.name}: ${message}`);
  }
}
```
✅ Use for: Decoupling objects that communicate frequently.

---

## **8. Strategy Pattern**
Encapsulates algorithms and makes them interchangeable.
```javascript
class PaymentStrategy {
  pay(amount) {
    throw new Error("This method should be overridden");
  }
}

class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} using Credit Card`);
  }
}

class PayPalPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} using PayPal`);
  }
}
```
✅ Use for: Swappable behaviors without modifying main logic.

---

### **Conclusion**
JavaScript design patterns help write scalable, maintainable code. Understanding and applying these patterns improves application architecture and performance.

Let me know if you want more details on a specific pattern! 🚀


