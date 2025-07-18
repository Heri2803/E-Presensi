const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API untuk registrasi dan login
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user baru (siswa/guru)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nis_or_nip
 *               - name
 *               - password
 *               - role
 *             properties:
 *               nis_or_nip:
 *                 type: string
 *                 example: 12345
 *               name:
 *                 type: string
 *                 example: Budi Santoso
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 enum: [siswa, guru]
 *                 example: siswa
 *               kelas:
 *                 type: string
 *                 example: XII RPL
 *               alamat:
 *                 type: string
 *                 example: Jl. Merdeka No.10
 *               no_hp:
 *                 type: string
 *                 example: 08123456789
 *               mapel:
 *                 type: string
 *                 example: Matematika
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nis_or_nip
 *               - password
 *             properties:
 *               nis_or_nip:
 *                 type: string
 *                 example: 12345
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login berhasil
 */
router.post('/login', authController.login);

module.exports = router;
