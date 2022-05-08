const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.listen(3000, () => {
  console.log('app on port 3000');
})

app.get('/', (req, res) => {
  let today = new Date().getDay();
  let currentDay = '';
  let work = 'should';
  let linkForWeekdayImage = 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  let linkForWeekendImage = 'https://images.unsplash.com/photo-1586426006315-b11fa075a76a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  let image = linkForWeekdayImage;

  switch (today) {
    case 0: {
      currentDay = 'Monday';
    }
      
    case 1: {
      currentDay = 'Tuesday';
    }
      
    case 2: {
      currentDay = 'Wednesday';
    }
    
    case 3: {
      currentDay = 'Thursday';
    }
      
    case 4: {
      currentDay = 'Friday';
    }
      
    case 5: {
      currentDay = 'Saturday';
      work= "should not";
      image = linkForWeekendImage;
    }
      
    case 6: {
      currentDay = 'Sunday';
      work= "should not";
      image = linkForWeekendImage;
    }
  }

  const options = {
    dayForTemplate: currentDay,
    shouldYouWork: work,
    imageLink: image,
  }
  res.render('index', options);
});