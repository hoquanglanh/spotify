const express = require('express');
const Song = require('../models/Song');
const router = express.Router();

// Get all songs
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get song by ID
router.get('/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (song) {
            res.json(song);
        } else {
            res.status(404).json({ message: 'Không tìm thấy bài hát' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get lyrics by song name
router.get('/lyrics/:name', async (req, res) => {
    try {
        const song = await Song.findOne({ name: req.params.name });
        if (song?.lyrics) {
            res.json({ lyrics: song.lyrics });
        } else {
            res.status(404).json({ message: 'Không tìm thấy lời bài hát' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new song
router.post('/', async (req, res) => {
    try {
        const song = new Song({
            name: req.body.name,
            singer: req.body.singer,
            album: req.body.album,
            albumArtist: req.body.albumArtist,
            duration: req.body.duration,
            lyrics: req.body.lyrics,
            audioFile: req.body.audioFile,
            avatar: req.body.avatar
        });
        
        const newSong = await song.save();
        res.status(201).json(newSong);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update song
router.put('/:id', async (req, res) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (updatedSong) {
            res.json(updatedSong);
        } else {
            res.status(404).json({ message: 'Không tìm thấy bài hát' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete song
router.delete('/:id', async (req, res) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        if (deletedSong) {
            res.json({ message: 'Đã xóa bài hát thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy bài hát' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;