
const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *      Hat:
 *          type: object
 *          properties:
 *              adi:
 *                  type: string
 *              kodu:
 *                  type: string
 *              duyuruNotu:
 *                  type: string
 *              aciklama:
 *                  type: string
 *              ilkDurak:
 *                  type: string
 *              sonDurak:
 *                  type: string
 *              seferler:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Sefer'
 *          required:
 *              - adi
 *              - kodu
 */
var hatSchema = new mongoose.Schema({
    adi: {
        type: String,
        required: true
    },
    kodu: {
        type: String,
        required: true,
        unique: true
    },
    pasifMi: {
        type: Boolean,
        default: false
    },
    // pasifZamanlar: { //TODO: buna benzer bir ekleme de yapılıp hat aktif olsa bile burada sorgunun yapılığı tarihe ait kayıt varsa o gün pasif kabul edilebilir.
    //     tarih: Date,
    //     pasifNotu: String
    // },
    duyuruNotu: String,
    aciklama: String,
    ilkDurak: { //TODO: tüm durakların listesinin olduğu bir yerden ilgili durağa ait ObjectId değeri de olabilir.
        type: String,
        required: true
    },
    sonDurak: { //TODO: tüm durakların listesinin olduğu bir yerden ilgili durağa ait ObjectId değeri de olabilir.
        type: String,
        required: true
    },
    seferler: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sefer'
    }]
}, { versionKey: false });

// hatSchema.virtual('hatAdi').get(function () {
//     return this.name.kodu + ' - ' + this.name.adi;
// });

const Hat = mongoose.model('Hat', hatSchema);

module.exports = Hat;