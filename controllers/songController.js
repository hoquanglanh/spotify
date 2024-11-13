// Thêm bài hát mới
exports.createSong = async (req, res) => {
    try {
      const song = new Song(req.body);
      await song.save();
      res.status(201).json(song);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
// Sửa bài hát
exports.updateSong = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedSong = await Song.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedSong) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.json(updatedSong);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
// Xóa bài hát
exports.deleteSong = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSong = await Song.findByIdAndDelete(id);
      if (!deletedSong) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.json({ message: 'Song deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
      