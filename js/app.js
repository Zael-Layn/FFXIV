const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

// …

registerServiceWorker();








 ///window.addEventListener("load", () => {

 ///   navigator.serviceWorker
 ///     .register("/sw.js")
 ///     .then((reg) => {
        // Display a success message
 ///       console.log(`Service Worker Registration (Scope: ${reg.scope})`);
 ///     })
 ///     .catch((error) => {
        // Display an error message
 ///       console.log(`Service Worker Error (${error})`);
 ///     });
 /// });
 ///} else {
   // Happens when the app isn't served over a TLS connection (HTTPS) or if the browser doesn't support the service worker
 ///  console.log("Service Worker not available");
 ///}

