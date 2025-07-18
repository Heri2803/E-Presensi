const { PengaturanPresensi } = require('../models');


exports.createPengaturan = async (req, res) => {
    try {
        const { start_time, end_time } = req.body;

        const existing = await PengaturanPresensi.findOne();
        if (existing) {
            return res.status(400).json({ message: 'Pengaturan sudah ada, gunakan update untuk mengubah.' });
        }

        const pengaturan = await PengaturanPresensi.create({ start_time, end_time });

        res.status(201).json({ message: 'Pengaturan presensi berhasil dibuat', data: pengaturan });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

exports.updatePengaturan = async (req, res) => {
    try {
        const { start_time, end_time } = req.body;

        let pengaturan = await PengaturanPresensi.findOne();
        if (!pengaturan) {
            pengaturan = await PengaturanPresensi.create({ start_time, end_time });
        } else {
            await pengaturan.update({ start_time, end_time });
        }

        res.json({ message: 'Pengaturan presensi berhasil diperbarui', data: pengaturan });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

exports.getPengaturan = async (req, res) => {
    try {
        const pengaturan = await PengaturanPresensi.findOne();
        res.json({ data: pengaturan });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

exports.deletePengaturan = async (req, res) => {
    try {
        const pengaturan = await PengaturanPresensi.findOne();
        if (!pengaturan) {
            return res.status(404).json({ message: 'Pengaturan tidak ditemukan' });
        }

        await pengaturan.destroy();

        res.json({ message: 'Pengaturan presensi berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};