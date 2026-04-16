'use strict';

import logger from '../utils/logger.js';
import playlistStore from '../models/playlist-store.js';
import accounts from './accounts.js';
import userStore from '../models/user-store.js';

const stats = {
    createView(request, response){
        //app statistics calculations
        const loggedInUser = accounts.getCurrentUser(request);

        if (loggedInUser){
        const playlist = playlistStore.getAllPlaylists();

        let numPlaylists = playlist.length;
        let numSongs = playlist.reduce((total, playlist) => total + playlist.songs.length, 0);
        let average = numPlaylists > 0 ? numSongs/numPlaylists : 0;
        let totalRating = playlist.reduce((total, playlist) => total + parseInt(playlist.rating), 0);
        let avgRating = numPlaylists > 0 ? totalRating/numPlaylists : 0;
        let maxRating = Math.max(...playlist.map(playlist => playlist.rating));
        let maxRated = playlist.filter(playlist => playlist.rating === maxRating);
        let favTitles = maxRated.map(item => item.title);
        let maxSongs = Math.max(...playlist.map(playlist => playlist.songs.length));
        let largPlaylist = playlist.filter(playlist => playlist.songs.length === maxSongs);
        let largTitles = largPlaylist.map(item => item.title);
        const numUsers = userStore.getAllUsers().length;


        const statistics = {
            displayNumPlaylists: numPlaylists,
            displayNumSongs: numSongs,
            displayAverage: average.toFixed(2),
            displayAvgRating: avgRating.toFixed(2),
            displayLargest: largTitles,
            highest: maxRating,
            displayFav: favTitles,
            largest: maxSongs,
            displayNumUsers: numUsers
        }

        const viewData = {
            title: "Playlist App Statistics",
            stats: statistics
        };
        response.render("stats", viewData);
        } else response.redirect('/');
    },
};
export default stats;