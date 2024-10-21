import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);
console.log(cart);

// console.log('start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('someting');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  //console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

// Not very clean
// lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);

//COMMAND LINE

// ls = directory
// cd = change directory
// clear = clear the console
// mk = create a new folder
// rmdir = delete directory (only empty folders)
// rm -R FOLDERNAME = force delete of direcoty even with files inside
// touch = create a file // EX: touch script.js
// rm = remove // EX: rm script.js
// mv = move file // EX: mv script.js ../ (one level up)

// NPM
// npm init // to initialize npm
