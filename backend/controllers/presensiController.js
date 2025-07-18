const { Presensi, User, PengaturanPresensi } = require('../models');

exports.create = async (req, res) => {
    try {
        const { status, lokasi } = req.body;
        const userId = req.user.user_id;
         const userRole = req.user.role;

          if (userRole !== 'siswa') {
            return res.status(403).json({ message: 'Hanya siswa yang dapat melakukan presensi' });
        }

        const moment = require('moment-timezone');
        const currentTime = moment().tz('Asia/Jakarta').format('HH:mm'); // Waktu WIB
        const today = moment().tz('Asia/Jakarta').format('YYYY-MM-DD');

        // Ambil pengaturan presensi
        const pengaturan = await PengaturanPresensi.findOne();
        const startTime = pengaturan ? pengaturan.start_time : '07:00';
        const endTime = pengaturan ? pengaturan.end_time : '09:00';

        // Cek apakah user sudah presensi hari ini
        const existing = await Presensi.findOne({ where: { user_id: userId, tanggal: today } });
        if (existing) {
            return res.status(400).json({ message: 'Anda sudah presensi hari ini' });
        }

        // Validasi lokasi
        const allowedLat = -8.157577548965278;
        const allowedLng = 113.7227851320784;
        const MAX_DISTANCE = 50; // meter   
        const [lat, lng] = lokasi.split(',').map(Number);

        const distance = getDistanceFromLatLonInM(lat, lng, allowedLat, allowedLng);
        if (distance > MAX_DISTANCE) {
            return res.status(403).json({ message: 'Anda berada di luar area presensi' });
        }

        // Tentukan status
        let finalStatus = status;

        if (moment(currentTime, 'HH:mm').isBefore(moment(startTime, 'HH:mm'))) {
            finalStatus = 'alpha'; // presensi sebelum jam mulai
        } else if (moment(currentTime, 'HH:mm').isAfter(moment(endTime, 'HH:mm'))) {
            finalStatus = 'alpha'; // presensi setelah jam akhir
        }

        const presensi = await Presensi.create({
            user_id: userId,
            status: finalStatus,
            lokasi,
            tanggal: today,
            jam: currentTime
        });

        res.json({ message: `Presensi berhasil. Status: ${finalStatus}`, data: presensi });

    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

// Fungsi hitung jarak (Haversine Formula)
function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Radius bumi (meter)
    const toRad = (x) => x * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}



// ✅ GET - Ambil Presensi User Login
exports.getAll = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const presensiList = await Presensi.findAll({
            where: { user_id: userId },
            include: [{ model: User, attributes: ['name', 'nis_or_nip', 'role'] }],
            order: [['tanggal', 'DESC']]
        });

        res.json({
            message: 'Daftar presensi',
            data: presensiList
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
    }
};

exports.getAllPresensiSiswa = async (req, res) => {
    try {
        const presensiList = await Presensi.findAll({
            include: [
                {
                    model: User,
                    attributes: ['nis_or_nip', 'name', 'role']
                }
            ],
            order: [['tanggal', 'DESC']]
        });

        res.json({
            message: 'Daftar semua presensi siswa',
            data: presensiList
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
    }
};

