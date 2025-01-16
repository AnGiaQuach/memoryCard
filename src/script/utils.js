async function fetchPokemonImg(formIdentifier) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-form/${formIdentifier}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.sprites.front_default;
  } catch (error) {
    console.error("Error fetching Pokémon form:", error);
  }
}

async function createPokemonImageArray(amount) {
  const imageArray = [];
  for (let id = 1; id <= amount; id++) {
    try {
      const imgUrl = await fetchPokemonImg(id);
      imageArray.push({ id, imgUrl, isClicked: false });
    } catch (error) {
      console.error(`Error fetching image for ID ${id}:`, error);
    }
  }
  return imageArray;
}

function shuffleOrderArray(array) {
  let lastIndex = array.length - 1;
  for (let i = 0; i < array.length; i++) {
    let temp = array[i];
    let randomIndex = Math.floor(Math.random() * (lastIndex - i + 1)) + i;
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}

// createPokemonImageArray(10).then((array) => {
//   array = shuffleArray(array);
//   console.log(array);
// });

export { fetchPokemonImg, createPokemonImageArray, shuffleOrderArray };
