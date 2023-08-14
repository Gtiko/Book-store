/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  let sum = 0;
  for(let each of data){
    sum+= Number(each.price)
  }

  postMessage(sum);
});
