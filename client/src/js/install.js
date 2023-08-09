const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
  console.log("INSTALLING!", event)
  window.deferredPrompt = event;
  console.log("WINDOW", window.deferredPrompt)
  butInstall.classList.toggle('hidden', false);
});


butInstall.addEventListener('click', async () => {
  console.log('hello2')
  const promptEvent = window.deferredPrompt;
  console.log("PROMPTENVEN>>>>",promptEvent)
  if (!promptEvent) {
   return;
  }

  promptEvent.prompt();
  
  window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);
  console.log('goodbye')
});


window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
  console.log('appinstalled', event);
});