const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//different lists to be pushed in depends on get/post requests

const todoList = [];
const workList = [];

// template props 
let work = 'should';

const dateOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}

const todoListDate = new Date().toLocaleDateString(
  'en-US',
  dateOptions
)

function setProperImage() {
  let linkForWeekdayImage = 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  let linkForWeekendImage = 'https://images.unsplash.com/photo-1586426006315-b11fa075a76a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  let image = linkForWeekdayImage;

  if (new Date().getDay() === 0 || new Date().getDay() === 6) {
    image = linkForWeekendImage;
  }
  return image
}

//

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('app on port 3000');
})

app.get('/', (req, res) => {
  const options = {
    dayForTemplate: todoListDate,
    shouldYouWork: work,
    imageLink: setProperImage(),
    todoList: todoList,
    listTitle: 'main list'
  }
  res.render('index', options);
});

app.get('/work', (req, res) => {
  const options = {
    dayForTemplate: todoListDate,
    shouldYouWork: work,
    imageLink: setProperImage(),
    todoList: workList,
    listTitle: 'work list',
  }
  res.render('index', options);
});

app.post('/', (req, res) => {
  if (req.body.button === 'main list') {
    todoList.push(req.body.task);
    res.redirect('/');
    return
  }
  workList.push(req.body.task);
  res.redirect('/work');
});