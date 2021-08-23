const Hat = require('../model/hat');
const Sefer = require('../model/sefer');

const CatchError = require('../utils/catchError');

exports.find = (req, res, next) => {
    const hatId = req.params.hatId;
    const seferId = req.params.seferId;

    return seferId
        ? Sefer.findById(seferId)
            .then(async sefer => {
                if (!sefer) {
                    return next(CatchError.notFound(`${seferId} ID'li bir Sefer bilgisi bulunamadı!`));
                } else {
                    await sefer.populate("Hat").execPopulate();
                    res.send(sefer);
                }
            })
            .catch(error => {
                return next(CatchError.internal(error.message || `${hatId} ID'li bir Sefer bilgisi getirilirken sorun oldu!`));
            })

        : Sefer.find(hatId ? { hatId: hatId } : {})
            .then(seferlar => res.send(seferlar))
            .catch(error => next(CatchError.internal(error.message || "Bilgiler getirilmeye çalışırken bir hata oluştur!")));
};

exports.create = async (req, res, next) => {
    try {
        const hatId = req.params.hatId;

        const hat = await Hat.findById(hatId);
        if (!hat)
            return next(CatchError.notFound(`${hatId} ID'li bir Hat bilgisi bulunamadı!`));

        if (!req.body || Object.keys(req.body).length === 0)
            return next(CatchError.badRequest("İstek içeriği boş olamaz!"));

        let saatler = [];
        if (Array.isArray(req.body.saatler)) {
            const regexSaat = /^([2][0-3]|[01]?[0-9])([.:][0-5][0-9])?$/;
            saatler = [...new Set(req.body.saatler.filter(s => regexSaat.test(s)).sort())]; //Çift kayıtlar ve uygun omayan kayıtlar alınmaz.
            if (saatler.length <= 0)
                return next(CatchError.missingRequires(["saatler"]));
        }

        const sefer = new Sefer({
            hatId: hatId,
            ilkDurak: req.body.ilkDurak,
            sonDurak: req.body.sonDurak,
            gecerliZaman: req.body.gecerliZaman,
            saatler: saatler,
        });

        if ((sefer.ilkDurak !== hat.ilkDurak
            && sefer.ilkDurak !== hat.sonDurak)
            || (sefer.sonDurak !== hat.ilkDurak
                && sefer.sonDurak !== hat.sonDurak)) {
            return next(CatchError.badRequest(`Sefer'e ait ilkDurak ve sonDurak bilgileri '${hat.ilkDurak}' ve '${hat.sonDurak}' den biri olmak zorunda!`));
        }

        const countExistSefer = await Sefer.countDocuments({
            hatId: hatId,
            gecerliZaman: req.body.gecerliZaman
        });

        if (countExistSefer > 0)
            return next(CatchError.forbidden(`${hatId} li hata daha önceden gecerliZaman değeri '${sefer.gecerliZaman}' olarak tanımlı Sefer bilgisi bulunmaktadır!`));

        return sefer
            .save(sefer)
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                return next(CatchError.internal(error.message || "Some error occurred while creating a create operation"));
            });

    } catch (error) {
        return next(CatchError.internal(error.message || "Some error occurred while creating a create operation"));
    }
}

exports.update = async (req, res, next) => {
    const hatId = req.params.hatId;
    const seferId = req.params.seferId;

    delete req.body.hatId; //Varsa hatId bilgisi silinir, hatId bilgisi güncellenemez!

    const hat = await Hat.findById(hatId);
    if (!hat)
        return next(CatchError.notFound(`${hatId} ID'li bir Hat bilgisi bulunamadı!`));

    if (!req.body || Object.keys(req.body).length === 0)
        return next(CatchError.badRequest('Güncellenmek istenen istek içeriği boş olamaz!'));

    if ((req.body.ilkDurak
        && (req.body.ilkDurak !== hat.ilkDurak
            && req.body.ilkDurak !== hat.sonDurak))
        || (req.body.sonDurak
            && (req.body.sonDurak !== hat.ilkDurak
                && req.body.sonDurak !== hat.sonDurak))
    ) {
        return next(CatchError.badRequest(`Sefer'e ait ilkDurak ve sonDurak bilgileri '${hat.ilkDurak}' ve '${hat.sonDurak}' den biri olmak zorunda!`));
    }

    Sefer.findByIdAndUpdate(seferId, req.body, { useFindAndModify: false })
        .then(async sefer => {
            if (!sefer) {
                return CatchError.notFound(`${seferId} değerine sahip Sefer bilgisi bulunamadı!`);
            } else {
                res.send(await Sefer.findById(seferId));
            }
        })
        .catch(err => {
            return next(CatchError.internal(err.message || "Error Update user informationn"));
        })
}

exports.delete = async (req, res, next) => {
    try {
        const hatId = req.params.hatId;
        const seferId = req.params.seferId;

        const updateHatResult = await Hat.findOneAndUpdate(hatId, { $pull: { seferler: seferId } });
        if (!updateHatResult) //TODO: burada silme ile ilgili Hat bilgisinin güncellenmemesi durumunda da silme durumnu devam ettirilebilir.
            return next(CatchError.internal('Silme işlemi gerçekleştirilirken bir hata oluştu.'));

        const sefer = await Sefer.findById(seferId);
        if (!sefer)
            return next(CatchError.notFound(`${seferId} ID değerine sahip bir sefer bulunamadı!`));

        const deleteSeferResult = await sefer.remove();
        if (!deleteSeferResult)
            return next(CatchError.internal('Silme işlemi gerçekleştirilirken bir hata oluştu.'));

        return res.send({
            message: 'Sefer başarı ile silindi!'
        });
    } catch (error) {
        return next(CatchError.internal(error.message || 'Silme işlemi gerçekleştirilirken bir hata oluştu.'));
    }
}