#! /usr/bin/env node
const axios = require('axios');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'enter command > ',
});
readline.prompt();
readline.on('line', async line => {
  switch (line.trim()) {
    case 'list vegan foods':
      {
        const { data } = await axios.get(`http://localhost:3001/food`);
        function* listVeganFoods() {
            let idx = 0;
            const veganOnly = data.filter(food =>
              food.dietary_preferences.includes('vegan'),
            );
            while (veganOnly[idx]) {
              yield veganOnly[idx];
              idx++;
            }
          }
        }
        for (let val of listVeganFoods()) {
          console.log(val.name);
        }
        readline.prompt();
      }
      break;
    case 'log':
      const { data } = await axios.get(`http://localhost:3001/food`);
      const it = data[Symbol.iterator]();
      let actionIt;

      function* actionGenerator() {
        try {
          const food = yield;
          const servingSize = yield askForServingSize();
          yield displayCalories(servingSize, food);
        } catch (error) {
          console.log({ error });
        }
      }

      function askForServingSize(food) {
        readline.question('How many servings did you eat? ',
        servingSize => {
          actionIt.next(servingSize, food)
        },
      );
        actionIt.next();
        readline.prompt();
      }

      readline.question(`What would you like to log today? `, item => {
        let position = it.next();
        while (!position.done) {
          const food = position.value.name;
          if (food === item) {
            console.log(
              `A single serving of ${item} has ${position.value.calories} calories.`,
            );
            actionIt = actionGenerator();
            actionIt.next();
            actionIt.next(position.value);
          }
          position = it.next();
        }
        readline.prompt();
      });
      break;
    case `today's log`:
      readline.question('Email: ', async emailAddress => {
        const { data } = await axios.get(
          `http://localhost:3001/users?email=${emailAddress}`,
        );
        // arrays are built in iterables
        const foodLog = data[0].log || [];
        let totalCalories = 0;
        function* getFoodLog() {
          try {
            yield* foodLog;
          } catch (error) {
            console.log('Error reading the food log', { error });
          }
        }
        const logIterator = getFoodLog();
        for (const entry of logIterator) {
          const timestamp = Object.keys(entry)[0];
          if (isToday(new Date(Number(timestamp)))) {
            console.log(
              `${entry[timestamp].food}, ${entry[timestamp].servingSize} serving(s)`,
            );
          }
        }
        console.log('---------------');
        console.log(`Total Calories: ${totalCalories}`);
        readline.prompt();
      });
      break;
  }
  readline.prompt();
});

function isToday(timestamp) {
  const today = new Date();
  return (
    timestamp.getDate() === today.getDate() &&
    timestamp.getMonth() === today.getMonth() &&
    timestamp.getFullYear() === today.getFullYear()
  );
}
