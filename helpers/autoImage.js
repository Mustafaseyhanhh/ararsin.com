var Jimp = require('jimp')
var path = require('path')
var sizeOf = require('image-size')

/* GET users listing. */
function autoImage(slug, text) {
    var num = Math.floor(Math.random() * Math.floor(10))
    if (num == 0) {
        num = 5
    }

    var fileNameTema = path.join(__dirname, '../public/subs_image_auto/subsdef_' + num + '.jpg');
    var fileNameNew = path.join(__dirname, '../public/subs_image_auto/' + slug + '.jpg');
    var fo = path.join(__dirname, '../public/font/roboto_bold.fnt');
    var dimensions = sizeOf(fileNameTema);
    Jimp.read(fileNameTema).then((image) => {
        Jimp.loadFont(fo).then(font => {
            image
                .print(
                    font,
                    50,
                    0, {
                        text: text,
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                    },
                    dimensions.width - 100,
                    dimensions.height
                )
                .write(fileNameNew);
        }).catch((err) => {
            console.log("-----------", err)
        })

    })
};

module.exports = autoImage;