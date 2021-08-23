const express = require('express');
const router = express.Router();

const seferController = require('../controller/seferController');

/**
 * @swagger
 * /seferler:
 *  get:
 *      tags:
 *          - Sefer
 *      summary: Seferlar Listesi
 *      description: Sistemde kayıtlı tüm seferların listesini döndürür
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Sefer listesi başarılı bir şekilde döner
 *          400:
 *              description: Geçersiz istek
 *          500:
 *              description: Sistem seferası
 */
router.get('/seferler', seferController.find);


/**
 * @swagger
 * /seferler/{seferId}:
 *  get:
 *      tags:
 *          - Sefer
 *      summary: Sefer Detay
 *      description: Sisteme kayıtlı `seferId` değeri detayı.
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: seferId
 *            description: Detayı istenen `Sefer` ait `ID`değeri
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Sefer bilgisi.
 *          400:
 *              description: Geçersiz istek.
 *          403:
 *              description: Yetkisiz istek.
 *          404:
 *              description: Sefer değeri bulunamadı.
 *          500:
 *              description: Sistem seferası.
 */
 router.get('/seferler/:seferId', seferController.find);

/**
 * @swagger
 * /seferler/{seferId}:
 *  put:
 *      tags:
 *          - Sefer
 *      summary: Sefer Bilgisi Güncelleme
 *      description: Sisteme kayıtlı `seferId` bilgisini günceller.
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: seferId
 *            description: Güncellenmek istenen `Sefer` ait `ID`değeri
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Sefer'
 *                  example:
 *                      ilkDurak: 'KARTAL'
 *                      sonDurak: 'İZMİT OTOGAR'
 *                      gecerliZaman: 'Cumartesi'
 *                      saatler:
 *                          - '08:00'
 *                          - '08:30'
 *                          - '09:00'
 *      responses:
 *          200:
 *              description: Sefer başarı ile güncellendi.
 *          400:
 *              description: Geçersiz istek.
 *          403:
 *              description: Yetkisiz istek.
 *          404:
 *              description: Sefer değeri bulunamadı.
 *          500:
 *              description: Sistem seferası.
 */
 router.put('/seferler/:seferId', seferController.update);

/**
 * @swagger
 * /seferler/{seferId}:
 *  delete:
 *      tags:
 *          - Sefer
 *      summary: Sefer Silme
 *      description: Sisteme kayıtlı `seferId` değeri silinir.
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: seferId
 *            description: Silinmek istenen `Sefer` ait `ID`değeri
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Sefer başarı ile silindi.
 *          400:
 *              description: Geçersiz istek.
 *          403:
 *              description: Yetkisiz istek.
 *          404:
 *              description: Sefer değeri bulunamadı.
 *          500:
 *              description: Sistem seferası.
 */
router.delete('/seferler/:seferId', seferController.delete);

/**
 * @swagger
 * /hatlar/{hatId}/seferler:
 *  get:
 *      tags:
 *          - Hat Sefer
 *      summary: Seferlar Listesi
 *      description: Sistemde kayıtlı `hatId` değerine bağlı tüm seferların listesini döndürür
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: hatId
 *            description: Detayı istenen `Sefer` in bağlı olduğu `Hat' `ID` değeri
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Sefer listesi başarılı bir şekilde döner
 *          400:
 *              description: Geçersiz istek
 *          500:
 *              description: Sistem seferası
 */
router.get('/hatlar/:hatId/seferler', seferController.find);

/**
 * @swagger
 * /hatlar/{hatId}/seferler:
 *  post:
 *      tags:
 *          - Hat Sefer
 *      summary: Sefer Oluştur
 *      description: Sisteme yeni bir sefer bilgisi oluşturur.
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: hatId
 *            description: Detayı istenen `Sefer` in bağlı olduğu `Hat' `ID` değeri
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Sefer'
 *                  example:
 *                      ilkDurak: 'KARTAL'
 *                      sonDurak: 'İZMİT OTOGAR'
 *                      gecerliZaman: 'Hafta içi'
 *                      saatler:
 *                          - '08:00'
 *                          - '08:30'
 *                          - '09:00'
 *      responses:
 *          200:
 *              description: Sefer başarı ile oluşturuldu.
 *          400:
 *              description: Geçersiz istek.
 *          403:
 *              description: Yetkisiz istek.
 *          500:
 *              description: Sistem seferası.
 */
router.post('/hatlar/:hatId/seferler', seferController.create);

/**
 * @swagger
 * /hatlar/{hatId}/seferler/{seferId}:
 *  get:
 *      tags:
 *          - Hat Sefer
 *      summary: Sefer Detay
 *      description: Sisteme kayıtlı `seferId` değeri detayı.
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: hatId
 *            description: Detayı istenen `Sefer` in bağlı olduğu `Hat' `ID` değeri
 *            required: true
 *            schema:
 *              type: string
 *          - in: path
 *            name: seferId
 *            description: Detayı istenen `Sefer` ait `ID`değeri
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Sefer bilgisi.
 *          400:
 *              description: Geçersiz istek.
 *          403:
 *              description: Yetkisiz istek.
 *          404:
 *              description: Sefer değeri bulunamadı.
 *          500:
 *              description: Sistem seferası.
 */
router.get('/hatlar/:hatId/seferler/:seferId', seferController.find);

/**
 * @swagger
 * /hatlar/{hatId}/seferler/{seferId}:
 *  put:
 *      tags:
 *          - Hat Sefer
 *      summary: Sefer Bilgisi Güncelleme
 *      description: Sisteme kayıtlı `seferId` bilgisini günceller.
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: hatId
 *            description: Detayı istenen `Sefer` in bağlı olduğu `Hat' `ID` değeri
 *            required: true
 *            schema:
 *              type: string
 *          - in: path
 *            name: seferId
 *            description: Güncellenmek istenen `Sefer` ait `ID`değeri
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Sefer'
 *                  example:
 *                      ilkDurak: 'KARTAL'
 *                      sonDurak: 'İZMİT OTOGAR'
 *                      gecerliZaman: 'Cumartesi'
 *                      saatler:
 *                          - '08:00'
 *                          - '08:30'
 *                          - '09:00'
 *      responses:
 *          200:
 *              description: Sefer başarı ile güncellendi.
 *          400:
 *              description: Geçersiz istek.
 *          403:
 *              description: Yetkisiz istek.
 *          404:
 *              description: Sefer değeri bulunamadı.
 *          500:
 *              description: Sistem seferası.
 */
router.put('/hatlar/:hatId/seferler/:seferId', seferController.update);

/**
 * @swagger
 * /hatlar/{hatId}/seferler/{seferId}:
 *  delete:
 *      tags:
 *          - Hat Sefer
 *      summary: Sefer Silme
 *      description: Sisteme kayıtlı `seferId` değeri silinir.
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: hatId
 *            description: Detayı istenen `Sefer` in bağlı olduğu `Hat' `ID` değeri
 *            required: true
 *            schema:
 *              type: string
 *          - in: path
 *            name: seferId
 *            description: Silinmek istenen `Sefer` ait `ID`değeri
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Sefer başarı ile silindi.
 *          400:
 *              description: Geçersiz istek.
 *          403:
 *              description: Yetkisiz istek.
 *          404:
 *              description: Sefer değeri bulunamadı.
 *          500:
 *              description: Sistem seferası.
 */
router.delete('/hatlar/:hatId/seferler/:seferId', seferController.delete);

module.exports = router;
