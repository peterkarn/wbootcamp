const express = require('express');
const bodyParser = require('body-parser');
//local module import
const app = express();
const date = require(__dirname + '/date.js');

console.log(date.getDay());

//different lists to be pushed in depends on get/post requests

const todoList = [];
const workList = [];

// template props 
let work = 'should';
function setProperImage() {
  let linkForWeekdayImage = 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  let linkForWeekendImage = 'https://images.unsplash.com/photo-1586426006315-b11fa075a76a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  let image = linkForWeekdayImage;

  if (new Date().getDay() === 0 || new Date().getDay() === 6) {
    image = linkForWeekendImage;
  }
  return image
}
//template props 

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('app on port 3000');
})

app.get('/', (req, res) => {
  const options = {
    dayForTemplate: date.getDate(), //import from date.js
    shouldYouWork: work,
    imageLink: setProperImage(),
    todoList: todoList,
    listTitle: 'main list',
    dayOfTheWeek: date.getDay(),
  }
  res.render('index', options);
});

app.get('/work', (req, res) => {
  const options = {
    dayForTemplate: date.getDate(),
    shouldYouWork: work,
    imageLink: setProperImage(),
    todoList: workList,
    listTitle: 'work list',
  }
  res.render('index', options);
});

app.get('/about', (req, res) => {
  res.render('about');
})

app.post('/', (req, res) => {
  if (req.body.button === 'main list') {
    todoList.push(req.body.task);
    res.redirect('/');
    return
  }
  workList.push(req.body.task);
  res.redirect('/work');
});