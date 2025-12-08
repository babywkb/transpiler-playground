function calcArray() {
  const arr = [1, 2, 3];
  console.log("value", arr.map(x => x * 2).join(","));
  const result = arr.filter(n => n > 1);
  console.log("done", result);
}