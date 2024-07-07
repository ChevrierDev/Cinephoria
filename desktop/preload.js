const { contextBridge } = require('electron');
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast(),
  
});
