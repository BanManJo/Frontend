const container = document.getElementById("map");
navigator.geolocation.getCurrentPosition((position) => {
  const options = {
    center: new kakao.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    ),
    level: 3,
  };
  const map = new kakao.maps.Map(container, options);
}, console.log);
