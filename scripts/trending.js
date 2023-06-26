async function fetchWebApi(endpoint, method, body) {
    const token = 'BQCWvE-nr0mO-N-J7dHTZIH_xfPZKeywEuER5gbUgrIft-um7UrzVNO8-qjo0IXGtNx40fcyjSIp8EB7ykNiK1CAsDLoXUqWbkND_m7xvNXo6wMudhHwbfzDjdZOjKXrJzv64O9eM3YbBFJXA7wLU8EJwmTNe7_KOwMM6b8IjoB7bFGhPCbbeMfI7VO1BLdyCSfD9CBobMngBAFWhZJgt7WDn4NO5_ruTOEti6XENqtap1dmJ95RUarHb81B_VmTvFkw6m1u3PQnkd5W229kSXOe';

    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  async function getTopTracks() {
    // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
      'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
    )).items;
  }

  async function displayTopTracks() {
    const topTracks = await getTopTracks();
    const tracksContainer = document.getElementById('tracks-container');
    const trackList = document.createElement('ul');

    topTracks?.forEach(({ name, artists }) => {
      const trackItem = document.createElement('li');
      const trackInfo = document.createTextNode(`${name} by ${artists.map(artist => artist.name).join(', ')}`);
      trackItem.appendChild(trackInfo);
      trackList.appendChild(trackItem);
    });

    tracksContainer.appendChild(trackList);
  }

  displayTopTracks();