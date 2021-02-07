var createError = require('http-errors');
const compression = require('compression');
var minify = require('express-minify');
var express = require('express');
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const env = require('./env');

//Helpers
const {logo, karakter, each_limit, date_format, iff, footer_blog, footer_etiket,home_referans} = require('./helpers/default')

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
app.use(logger('dev'));
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

//Api Routes
var subsEkleme = require('./routes/api/subsEkleme');
app.use('/', subsEkleme);

//Main Routes
var anasayfaRouter = require('./routes/anasayfa');
app.use('/', anasayfaRouter);
var aramaRouter = require('./routes/arama');
app.use('/', aramaRouter);
var sehirlerRouter = require('./routes/more/sehirler');
app.use('/', sehirlerRouter);
var kategorilerRouter = require('./routes/more/kategoriler')
app.use('/', kategorilerRouter);
var subsRouter = require('./routes/subs');
app.use('/', subsRouter);
var hakkimizdaRouter = require('./routes/more/hakkimizda');
app.use('/', hakkimizdaRouter);
var iletisimRouter = require('./routes/more/iletisim');
app.use('/', iletisimRouter);
var sssRouter = require('./routes/more/sss');
app.use('/', sssRouter);
var blogRouter = require('./routes/more/blog');
app.use('/', blogRouter);
var paketlerRouter = require('./routes/more/paketler');
app.use('/', paketlerRouter);
var sozlesmelerRouter = require('./routes/more/sozlesmeler')
app.use('/', sozlesmelerRouter);
var paytrRouter = require('./routes/paytr');
app.use('/', paytrRouter);

//Yonetim Routes
var paytrRouter = require('./routes/paytr');
app.use('/', paytrRouter);

//Test Routes
var sahiplenRouter = require('./routes/dashboard/sahiplen')
app.use('/', sahiplenRouter);

//Ajax Routes
var serachboxRouter = require('./routes/searchBox');
app.use('/', serachboxRouter);

//Genel Routes
var sitemapRouter = require('./routes/xml/sitemap');
app.use('/', sitemapRouter);
var blogSitemapRouter = require('./routes/xml/blog_sitemap');
app.use('/', blogSitemapRouter);
var imageSitemapRouter = require('./routes/xml/image_sitemap');
app.use('/', imageSitemapRouter);
var urlFinderRouter = require('./routes/urlFinder');
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
