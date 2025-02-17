const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('File not found');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file.');
      resolve('sucess');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    console.log(all);

    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file');
  } catch (error) {
    console.log(error);
    throw error;
  }
  return '2: READY';
};

(async () => {
  try {
    console.log('1: Will get dog pics');
    const dogPic = await getDogPic();
    console.log(dogPic);
    console.log('3: Done getting dog pics');
  } catch (error) {
    throw error;
  }
})();

/*
console.log('1: Will get dog pics');
getDogPic().then((x) => {
  console.log(x);
  console.log('3: Done getting dog pics');
});
*/

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(
//       `https://dog.ceo/api/breed/${data}/images/random`
//     );
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
