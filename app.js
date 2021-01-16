var createError = require('http-errors');
const compression = require('compression');
var minify = require('express-minify');
var express = require('express');
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');
const env = require('./env');

//Helpers
const {logo, karakter, each_limit, date_format, iff, footer_blog, footer_etiket,home_referans} = require('./helpers/default')

//Main Routes
var anasayfaRouter = require('./routes/anasayfa');
var aramaRouter = require('./routes/arama');
var subsRouter = require('./routes/subs');
var urlFinderRouter = require('./routes/urlFinder');
var sehirlerRouter = require('./routes/more/sehirler');
var kategorilerRouter = require('./routes/more/kategoriler')
var hakkimizdaRouter = require('./routes/more/hakkimizda');
var iletisimRouter = require('./routes/more/iletisim');
var sssRouter = require('./routes/more/sss');
var blogRouter = require('./routes/more/blog');
var paketlerRouter = require('./routes/more/paketler');
var sitemapRouter = require('./routes/sitemap');
var sozlesmelerRouter = require('./routes/more/sozlesmeler')
var indexRouter = require('./routes/index')
//Ajax Routes
var serachboxRouter = require('./routes/searchBox');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
},
  helpers : {
    logo, karakter, each_limit, date_format, iff, footer_blog,footer_etiket,home_referans,
}}));

app.use(compression());
app.use(minify());
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images',express.static(path.join(__dirname, 'public/tema/images')));
app.use('/profil',express.static(path.join(__dirname, 'public/subs_profil')));
app.use('/banner',express.static(path.join(__dirname, 'public/subs_banner'))); 
app.use('/tema',express.static(path.join(__dirname, 'public/tema')));
app.use('/auto',express.static(path.join(__dirname, 'public/subs_image_auto')));
app.use('/referans',express.static(path.join(__dirname, 'public/home_referans')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Main Routes
app.use('/', anasayfaRouter);
app.use('/', aramaRouter);
app.use('/', sehirlerRouter);
app.use('/', kategorilerRouter);
app.use('/', subsRouter);
app.use('/', hakkimizdaRouter);
app.use('/', iletisimRouter);
app.use('/', sssRouter);
app.use('/', blogRouter);
app.use('/', paketlerRouter);
app.use('/', sozlesmelerRouter);
app.use('/', indexRouter);
//Ajax Routes
app.use('/', serachboxRouter);
//Genel Routes
app.use('/', sitemapRouter);
app.use('/', urlFinderRouter);

mongoose.connect('mongodb://localhost:27017/'+env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
},(err) => {
	if (err){
		console.log(err)
	}});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
