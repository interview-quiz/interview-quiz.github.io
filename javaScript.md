# Advance JavaScript
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

Let me know if you need further clarifications or more examples!
