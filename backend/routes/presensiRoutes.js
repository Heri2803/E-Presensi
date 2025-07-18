const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { authMiddleware, roleCheck } = require('../middleware/authMiddleware');
const pengaturanController = require('../controllers/pengaturanController');


/**
 * @swagger
 * tags:
 *   name: Presensi
 *   description: API untuk absensi siswa/guru
 */

/**
 * @swagger
 * /presensi:
 *   post:
 *     summary: Tambah presensi (hanya untuk user login)
 *     tags: [Presensi]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [hadir, izin, sakit, alpha]
 *                 example: hadir
 *               lokasi:
 *                 type: string
 *                 example: "-7.250445,112.768845"
 *     responses:
 *       201:
 *         description: Presensi berhasil disimpan
 */
router.post('/presensi', authMiddleware, presensiController.create);

/**
 * @swagger
 * /presensi:
 *   get:
 *     summary: Ambil semua data presensi user login
 *     tags: [Presensi]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar presensi
 */
router.get('/presensi', authMiddleware, presensiController.getAll);

/**
 * @swagger
 * /presensi/all:
 *   get:
 *     summary: Ambil semua data presensi (hanya untuk guru)
 *     tags: [Presensi]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar semua presensi siswa
 */
router.get('/presensi/all', authMiddleware, roleCheck(['guru']), presensiController.getAllPresensiSiswa);

/**
 * @swagger
 * tags:
 *   name: Pengaturan
 *   description: API untuk mengatur jam presensi
 */

/**
 * @swagger
 * /pengaturan:
 *   get:
 *     summary: Ambil pengaturan presensi (jam mulai & jam akhir)
 *     tags: [Pengaturan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pengaturan presensi saat ini
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     start_time:
 *                       type: string
 *                       example: "07:00"
 *                     end_time:
 *                       type: string
 *                       example: "09:00"
 */
router.get('/pengaturan', authMiddleware, pengaturanController.getPengaturan);

/**
 * @swagger
 * /pengaturan:
 *   put:
 *     summary: Update pengaturan presensi (hanya guru)
 *     tags: [Pengaturan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_time
 *               - end_time
 *             properties:
 *               start_time:
 *                 type: string
 *                 example: "07:00"
 *               end_time:
 *                 type: string
 *                 example: "09:30"
 *     responses:
 *       200:
 *         description: Pengaturan presensi berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pengaturan presensi berhasil diperbarui
 *                 data:
 *                   type: object
 *                   properties:
 *                     start_time:
 *                       type: string
 *                       example: "07:00"
 *                     end_time:
 *                       type: string
 *                       example: "09:30"
 */
router.put('/pengaturan', authMiddleware, roleCheck(['guru']), pengaturanController.updatePengaturan);

/**
 * @swagger
 * /pengaturan:
 *   post:
 *     summary: Tambah pengaturan presensi baru
 *     tags: [Pengaturan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_time:
 *                 type: string
 *                 example: "07:00"
 *               end_time:
 *                 type: string
 *                 example: "09:00"
 *     responses:
 *       201:
 *         description: Pengaturan berhasil dibuat
 */
router.post('/pengaturan', authMiddleware, roleCheck(['guru']), pengaturanController.createPengaturan);

/**
 * @swagger
 * /pengaturan:
 *   delete:
 *     summary: Hapus pengaturan presensi (hanya untuk guru)
 *     tags: [Pengaturan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pengaturan berhasil dihapus
 */
router.delete('/pengaturan', authMiddleware, roleCheck(['guru']), pengaturanController.deletePengaturan);


module.exports = router;
