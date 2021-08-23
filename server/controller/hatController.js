const Hat = require('../model/hat');
const Sefer = require('../model/sefer');

const CatchError = require('../utils/catchError');

exports.find = (req, res, next) => {
    const hatId = req.params.hatId;
    return hatId
        ? Hat.findById(hatId).populate('seferler')
            .then(hat => {
                if (!hat) {
                    return next(CatchError.notFound(`${hatId} ID'li bir Hat bilgisi bulunamadı!`));
                } else {
                    res.send(hat);
                }
            })
            .catch(error => {
                return next(CatchError.internal(error.message || `${hatId} ID'li bir Hat bilgisi getirilirken sorun oldu!`));
            })

        : Hat.find()
            .then(hatlar => res.send(hatlar))
            .catch(error => next(CatchError.internal(error.message || "Bilgiler getirilmeye çalışırken bir hata oluştur!")));
};

exports.create = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0)
        return next(CatchError.badRequest("İstek içeriği boş olamaz!"));

    const hat = new Hat(req.body
        // {
        //     adi: req.body.adi,
        //     kodu: req.body.kodu,
        //     ilkDurak: req.body.ilkDurak,
        //     seferler: req.body.seferler,
        // }
    );

    hat
        .save(hat)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            return next(CatchError.internal(error.message || "Some error occurred while creating a create operation"));
        });
}

exports.update = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0)
        return next(CatchError.badRequest('Güncellenmek istenen istek içeriği boş olamaz!'));

    const hatId = req.params.hatId;
    Hat.findByIdAndUpdate(hatId, req.body, { useFindAndModify: false })
        .then(async hat => {
            if (!hat) {
                return next(CatchError.notFound(`${hatId} ID değerine sahip bir hat bulunamadı!`));
            } else {
                res.send(await Hat.findById(hatId).exec())
            }
        })
        .catch(error => {
            return next(CatchError.internal(error.message || 'Kullnıcı bilgisi güncellenemedi!'));
        })
}

exports.delete = (req, res, next) => {
    const hatId = req.params.hatId;

    return Hat.findByIdAndDelete(hatId)
        .then(async hat => {
            if (!hat) {
                return next(CatchError.notFound(`${hatId} ID değerine sahip bir hat bulunamadı!`));
            } else {
                await Sefer.deleteMany({ hatId: hatId });
                res.send({
                    message: 'Hat başarı ile silindi!'
                })
            }
        })
        .catch(error => {
            return next(CatchError.internal(error.message || 'Silme işlemi gerçekleştirilirken bir hata oluştu.'));
        });
}