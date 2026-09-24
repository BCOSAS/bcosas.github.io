// ID de la Playlist de YouTube
const PLAYLIST_ID = 'PLUsWwDNIcHnUz8rI7J22a-JbY-zwT_yTo';

/**
 * Obtiene y procesa la lista de videos desde la API o rss/oEmbed de la Playlist.
 */
async function loadYouTubePlaylist(playlistId) {
  const listContainer = document.getElementById('episodes-list-1');
  const countBadge = document.getElementById('episode-count-1');

  try {
    // Petición al feed oEmbed de YouTube a través de rss2json para estructurar los videos de la playlist
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`);
    const data = await response.json();

    if (data.status === 'ok' && data.items.length > 0) {
      listContainer.innerHTML = '';
      countBadge.innerText = `${data.items.length} videos`;

      data.items.forEach((item, index) => {
        // Extraer ID del video desde la URL del enlace
        const videoId = item.link.split('v=')[1]?.split('&')[0];
        
        const card = document.createElement('div');
        card.className = `episode-card ${index === 0 ? 'active' : ''}`;
        card.onclick = () => selectVideo(playlistId, index, card);

        card.innerHTML = `
          <div class="thumb-container">
            <img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="${item.title}">
          </div>
          <div class="episode-info">
            <span class="episode-number">Video ${index + 1}</span>
            <span class="episode-title" title="${item.title}">${item.title}</span>
          </div>
        `;

        listContainer.appendChild(card);
      });
    } else {
      throw new Error('No se encontraron elementos en la playlist');
    }
  } catch (error) {
    console.warn('Error al cargar datos automáticos:', error);
    countBadge.innerText = 'Playlist';
    listContainer.innerHTML = `<p style="font-size: 12px; color: #64748b; padding: 10px;">Cargado directamente en el reproductor de YouTube.</p>`;
  }
}

/**
 * Cambia el video activo dentro de la lista de reproducción iframe
 */
function selectVideo(playlistId, index, cardElement) {
  const player = document.getElementById('main-player');
  
  // Cambia el índice del reproductor con autoplay activado
  player.src = `https://www.youtube.com/embed?listType=playlist&list=${playlistId}&index=${index}&autoplay=1`;

  // Actualiza la tarjeta seleccionada visualmente
  document.querySelectorAll('.episode-card').forEach(card => card.classList.remove('active'));
  cardElement.classList.add('active');
}
