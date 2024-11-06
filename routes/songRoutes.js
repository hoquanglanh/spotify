const express = require('express');
const Song = require('../models/Song');
const router = express.Router();

// Lấy danh sách bài hát
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy chi tiết một bài hát theo ID
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

// Lấy lời bài hát theo tên bài hát
router.get('/lyrics/:name', async (req, res) => {
  try {
    const song = await Song.findOne({ name: req.params.name }); // Tìm bài hát theo tên
    if (song) {
      if (song.lyrics) {
        res.json({ lyrics: song.lyrics });
      } else {
        res.status(404).json({ message: 'Lời bài hát không có sẵn' });
      }
    } else {
      res.status(404).json({ message: 'Không tìm thấy bài hát' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm bài hát mới
router.post('/', async (req, res) => {
  const song = new Song({
    name: req.body.name,
    singer: req.body.singer,
    album: req.body.album,
    albumArtist: req.body.albumArtist,
    duration: parseInt(req.body.duration),
    lyrics: req.body.lyrics,
    audioFile: req.body.audioFile,
    avatar: req.body.avatar
  });
  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật thông tin bài hát
router.patch('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (song) {
      if (req.body.name) song.name = req.body.name;
      if (req.body.singer) song.singer = req.body.singer;
      if (req.body.album) song.album = req.body.album;
      if (req.body.albumArtist) song.albumArtist = req.body.albumArtist;
      if (req.body.duration) song.duration = req.body.duration;
      if (req.body.lyrics) song.lyrics = req.body.lyrics;
      if (req.body.audioFile) song.audioFile = req.body.audioFile;
      if (req.body.avatar) song.avatar = req.body.avatar;

      const updatedSong = await song.save();
      res.json(updatedSong);
    } else {
      res.status(404).json({ message: 'Không tìm thấy bài hát' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa bài hát
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (song) {
      await song.remove();
      res.json({ message: 'Đã xóa bài hát' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bài hát' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;