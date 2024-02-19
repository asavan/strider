function findLineByLeastSquares(values_x, values_y) {
    var x_sum = 0;
    var y_sum = 0;
    var xy_sum = 0;
    var xx_sum = 0;
    var count = 0;

    /*
     * The above is just for quick access, makes the program faster
     */
    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    if (values_length != values_y.length) {
        throw new Error("The parameters values_x and values_y need to have same size!");
    }

    /*
     * Above and below cover edge cases
     */
    if (values_length === 0) {
        return [ [], [] ];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (let i = 0; i < values_length; i++) {
        x = values_x[i];
        y = values_y[i];
        x_sum+= x;
        y_sum+= y;
        xx_sum += x*x;
        xy_sum += x*y;
        count++;
    }

    if (values_length != count) {
        throw new Error("Count error");
    }

    /*
     * Calculate m and b for the line equation:
     * y = x * m + b
     */
    const m = (count*xy_sum - x_sum*y_sum) / (count*xx_sum - x_sum*x_sum);
    const b = (y_sum/count) - (m*x_sum)/count;
    // console.log("findLineByLeastSquares", x_sum, y_sum, y_sum/count, m, b);
    return [m, b];
}

// https://www.freecodecamp.org/news/the-least-squares-regression-method-explained/
function updateFormula(currentData) {
    const pairsAmount = currentData.length;
    const sum = currentData.reduce((acc, pair) => ({
        x: acc.x + pair.x,
        y: acc.y + pair.y,
    }), { x: 0, y: 0 });

    const average = {
        x: sum.x / pairsAmount,
        y: sum.y / pairsAmount,
    };

    const slopeDividend = currentData
        .reduce((acc, pair) => acc + ((pair.x - average.x) * (pair.y - average.y)), 0);
    const slopeDivisor = currentData
        .reduce((acc, pair) => acc + (pair.x - average.x) ** 2, 0);


    const slope = slopeDivisor !== 0
        ? (slopeDividend / slopeDivisor)
        : 0;

    const coeficient = -(slope * average.x) + average.y;

    // console.log("updateFormula", sum, average, slopeDividend, slopeDivisor, slope, coeficient);
    return [slope, coeficient];
}

function numPrediction(coeff, timestamp) {
    return Math.floor(coeff[0] * timestamp + coeff[1]);
}

export default {
    findLineByLeastSquares,
    updateFormula,
    numPrediction
};
