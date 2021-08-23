
const mongoose = require('mongoose');

const CatchError = require('../utils/catchError');

const SEFER_GECERLI_ZAMANLAR = {
    HAFTA_ICI: "Hafta içi",
    CUMARTESI: "Cumartesi",
    PAZAR: "Pazar"
};

/**
 * @swagger
 * components:
 *  schemas:
 *      Sefer:
 *          type: object
 *          properties:
 *              gecerliZaman:
 *                  type: string
 *                  oneOf: ['Hafta içi', 'Cumartesi', 'Pazar']
 *              ilkDurak:
 *                  type: string
 *                  defination: Bağlı olduğu hattın `ilkDurak`veya `sonDurak`değerlerinden biri ile ayn olmak zorunda.
 *              sonDurak:
 *                  type: string
 *              saatler:
 *                  type: array
 *                  defination: Değerler `HH:mm` şeklinde ve en küçük `00:00` en büyük `23:59` olmak zorunda!
 *                  items:
 *                      types: string
 *          required:
 *              - gecerliZaman
 *              - ilkDurak
 *              - sonDurak
 *              - saatler
 */
var seferSchema = new mongoose.Schema({
    hatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hat',
        required: true
    },
    gecerliZaman: {
        type: String,
        required: true
    },
    ilkDurak: {
        type: String,
        required: true
    },
    sonDurak: {
        type: String,
        required: true
    },
    saatler: [{
        type: String,
        required: true
    }],
}, { versionKey: false });

seferSchema.pre('save', function (next) {
    //TODO: burada UpperCase veya LowerCase ler ile gecerliZaman bilgisi düzenlenebilir.
    if (!Object.values(SEFER_GECERLI_ZAMANLAR).includes(this.gecerliZaman))
        throw CatchError.badRequest(`'gecerliZaman':'${this.gecerliZaman}' değeri [${Object.values(SEFER_GECERLI_ZAMANLAR).toString()}] değerlerinden biri olmalı!`);
    next();
});

const Sefer = mongoose.model('Sefer', seferSchema);

module.exports = Sefer;