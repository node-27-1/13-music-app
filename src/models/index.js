const Genre = require('./Genre');
const Artist = require('./Artist');
const Album = require('./Album');

Artist.belongsToMany(Genre, { through: "ArtistsGenres" });
Genre.belongsToMany(Artist, { through: "ArtistsGenres" });

Artist.hasMany(Album);
Album.belongsTo(Artist);
