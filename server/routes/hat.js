const express = require('express');
const router = express.Router();

const hatController = require('../controller/hatController');

/**
 * @swagger
 * /hatlar:
 *  get:
 *      tags:
 *          - Hat
 *      summary: Hatlar Listesi
 *      description: Sistemde kayıtlı tüm hatların listesini döndürür
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Hat listesi başarılı bir şekilde döner
 *          400:
 *              description: Geçersiz istek
 *          500:
 *              description: Sistem hatası
 */
router.get('/', hatController.find);

/**
 * @swagger
 * /hatlar:
 *  post:
 *      tags:
 *          - Hat
 *      summary: Hat Oluştur
 *      description: Sisteme yeni bir hat bilgisi oluşturur.
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Hat'
 *                  example:
 *                      adi: '200 - İZMİT OTOGAR-DERİNCE-KÖRFEZ-DİLOVASI-GEBZE-PENDİK-KARTAL'
 *                      kodu: '200'
 *                      aciklama: 'Hattın Gebze durağına kadar yolcu indirmesi Gebze durağından sonra yolcu alması yasaktır.'
 *                      ilkDurak: 'İZMİT OTOGAR'
 *                      sonDurak: 'KARTAL'
 *      responses:
 *          200:
 *              description: Hat başarı ile oluşturuldu.
 *          400:
 *              description: Geçersiz istek.
 *          403:
 *              description: Yetkisiz istek.
 *          500:
 *              description: Sistem hatası.
 */
router.post('/', hatController.create);

/**
 * @swagger
 * /hatlar/{hatId}:
 *  get:
 *      tags:
 *          - Hat
 *      summary: Hat Detay
 *      description: Sisteme kayıtlı `hatId` değeri detayı.
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: hatId
 *            description: Detayı istenen `Hat` ait `ID`değeri
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Hat bilgisi.
 *          400:
 *              description: Geçersiz istek.
 *          403:
 *              description: Yetkisiz istek.
 *          404:
 *              description: Hat değeri bulunamadı.
 *          500:
 *              description: Sistem hatası.
 */
router.get('/:hatId', hatController.find);

/**
 * @swagger
 * /hatlar/{hatId}:
 *  put:
 *      tags:
 *          - Hat
 *      summary: Hat Bilgisi Güncelleme
 *      description: Sisteme kayıtlı `hatId` bilgisini günceller.
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: hatId
 *            description: Güncellenmek istenen `Hat` ait `ID`değeri
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Hat'
 *                  example:
 *                      duyuruNotu: 'Hat Eylül ayı içinde saat başı kalkacaktır'
 *                      adi: '200 - İZMİT OTOGAR-DERİNCE-KÖRFEZ-DİLOVASI-GEBZE-PENDİK-KARTAL'
 *                      kodu: '200'
 *                      ilkDurak: 'İZMİT OTOGAR'
 *                      sonDurak: 'KARTAL'
 *      responses:
 *          200:
 *              description: Hat başarı ile güncellendi.
 *          400:
 *              description: Geçersiz istek.
 *          403:
 *              description: Yetkisiz istek.
 *          404:
 *              description: Hat değeri bulunamadı.
 *          500:
 *              description: Sistem hatası.
 */
router.put('/:hatId', hatController.update);

/**
 * @swagger
 * /hatlar/{hatId}:
 *  delete:
 *      tags:
 *          - Hat
 *      summary: Hat Silme
 *      description: Sisteme kayıtlı `hatId` değeri silinir.
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: hatId
 *            description: Silinmek istenen `Hat` ait `ID`değeri
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Hat başarı ile silindi.
 *          400:
 *              description: Geçersiz istek.
 *          403:
 *              description: Yetkisiz istek.
 *          404:
 *              description: Hat değeri bulunamadı.
 *          500:
 *              description: Sistem hatası.
 */
router.delete('/:hatId', hatController.delete);

module.exports = router;
