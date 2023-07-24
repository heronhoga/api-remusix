import Songs from "../models/SongModel.js";

//READ ALL SONGS
export const getSongsByUserId = async (req, res) => {
  try {
    const { userId } = req;

    const songs = await Songs.findAll({
      attributes: ["title", "links", "added"],
      where: {
        userid: userId,
      },
    });
    res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Songs not found!" });
  }
};

//ADDING SONG
export const addSong = async (req, res) => {
  try {
    const { userId } = req;
    const { title, links } = req.body;
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let formattedDate = year + "-" + month + "-" + day;

    const newSong = await Songs.create({
      userid: userId,
      title: title,
      links: links,
      added: formattedDate,
    });

    console.log("New song added:", newSong.toJSON());
    res.status(200).json(newSong);
  } catch (error) {
    console.error("Error adding song:", error);
    throw error;
  }
};

//UPDATE SONG
export const updateSong = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { title, links } = req.body;

    const song = await Songs.findOne({ where: { id, userId } });

    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    song.title = title;
    song.links = links;

    await song.save();

    res.json(song);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update song." });
  }
};

//DELETE SONG
export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const song = await Songs.findOne({ where: { id, userId } });

    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    await song.destroy();

    res.json({ message: `${song.title} has been deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete song." });
  }
};

//FIND SONG USING ID
export const findSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const song = await Songs.findOne({ where: { id, userId } });

    if (!song) {
      return res.status(404).json({ message: "Song not found!" });
    }

    res.json(song);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something broken",
    });
  }
};
