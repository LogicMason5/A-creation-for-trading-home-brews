export const loadMapApi = () => {

  const mapURL:string = process.env.REACT_APP_GOOGLE_MAPS_URI as string
  const scripts = document.getElementsByTagName('script');


  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(mapURL) === 0) {
      return scripts[i]
    }
  }

  const googleMapScript = document.createElement('script');
  googleMapScript.src = mapURL;
  googleMapScript.async = true;
  googleMapScript.defer = true;

  window.document.body.appendChild(googleMapScript);

  return googleMapScript
}