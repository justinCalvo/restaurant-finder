export const createStars = (ratings, index, setStars) => {
  let starArray = [],
    i,
    j;
  if (ratings) {
    for (i = 0; i < ratings.length; i++) {
      const afterDecimal = ratings[i].rating.toString().slice(2);
      const wholeNumber = Math.floor(ratings[i].rating);
      let temp = [];
      for (j = 1; j <= 5; j++) {
        if (j <= wholeNumber) {
          temp.push('star-sharp');
        } else if (afterDecimal >= 8) {
          temp.push('star-sharp');
        } else if (afterDecimal <= 7 && afterDecimal >= 3) {
          temp.push('star-half-sharp');
        } else {
          temp.push('star-outline');
        }
      }
      starArray.push(temp);
      temp = [];
    }
  } else {
    const afterDecimal = index.rating.toString().slice(2);
    const wholeNumber = Math.floor(index.rating);
    for (i = 1; i <= 5; i++) {
      if (i <= wholeNumber) {
        starArray.push('star-sharp');
      } else if (afterDecimal >= 8) {
        starArray.push('star-sharp');
      } else if (afterDecimal <= 7 && afterDecimal >= 3) {
        starArray.push('star-half-sharp');
      } else {
        starArray.push('star-outline');
      }
    }
  }
  setStars(starArray);
};
