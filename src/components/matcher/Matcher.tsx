import { useEffect, useState } from "react";

// classNames use the BEM (block_element--modifier naming convention for .scss)

// the complexity can be tacled further out of this component by moving the function into another file
const generateRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Matcher = () => {
  const arrayLength = 8;

  const [randomIntegers, setRandomIntegers] = useState<number[]>([]);

  const [randomIntegersCombinations, setRandomIntegersCombinations] = useState<
    number[][]
  >([]);

  const createRandomIntegersArray = () => {
    const newRandomIntegers = [];
    for (let i = 0; i < arrayLength; i++) {
      newRandomIntegers.push(generateRandom(0, 21));
    }

    setRandomIntegers(newRandomIntegers);
  };

  const findRandomIntegersCombinations = () => {
    const newRandomCombinations = [];

    for (let i = 0; i < arrayLength; i++) {
      for (let j = i + 1; j < arrayLength; j++) {
        if (randomIntegers[i] + randomIntegers[j] === 21) {
          newRandomCombinations.push([i + 1, j + 1]);
        }
      }
    }

    setRandomIntegersCombinations(newRandomCombinations);
  };

  useEffect(() => {
    createRandomIntegersArray();
    findRandomIntegersCombinations();
  }, []);

  return (
    <div className="matcher">
      <div className="matcher_header">
        <h1 className="text-h1">Matching numbers</h1>
        <hr />
      </div>
      <div className="matcher_content">
        <div className="matcher_content-numbers">
          <p className="text-p">
            {randomIntegers.map((item, index) =>
              arrayLength - 1 === index ? (
                <span key={index}>{item}</span>
              ) : (
                <span key={index}>{item}, </span>
              )
            )}
          </p>
        </div>
        <div className="matcher_content-buttons">
          <button
            className="button button--filled"
            onClick={() => createRandomIntegersArray()}
          >
            Create New Array
          </button>
          <button
            className="button  button--outline"
            onClick={() => findRandomIntegersCombinations()}
          >
            Find Combinations
          </button>
        </div>
      </div>
      <div className="matcher_results">
        <h2 className="text-h2">Combinations:</h2>
        <ul>
          {randomIntegersCombinations.length ? (
            randomIntegersCombinations.map((item) => (
              <li className="text-li">
                <span>{item[0]}</span> & <span>{item[1]}</span>
              </li>
            ))
          ) : (
            <p className="text-p">No combinations</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Matcher;
