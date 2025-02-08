// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const sucess = false;
//     if (sucess) {
//       resolve("Sucess");
//     } else {
//       reject("Task failed");
//     }
//   }, 2000);
// });
// myPromise
//   .then((message) => {
//     console.log("sss", message);
//   })
//   .catch((err) => {
//     console.error("err", err);
//   });

const slowPromise = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Slow!3"), 6000)
);
const fastPromise = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Fast!1"), 1000)
);
const fastPromise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Fast2!"), 4000)
);
const fastPromise3 = new Promise((resolve) =>
  setTimeout(() => resolve("Fast!4"), 9000)
);

// Promise.race([slowPromise, fastPromise]).then((result) => {
//   console.log("First resolved:", result);
// });

// const promise1 = fetch("https://api.example.com/data1").then((res) => res.json());
// const promise2 = fetch("https://api.example.com/data2").then((res) => res.json());

Promise.race([slowPromise, fastPromise, fastPromise2, fastPromise3])
  .then((results) => {
    console.log("Results 2:", results);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
