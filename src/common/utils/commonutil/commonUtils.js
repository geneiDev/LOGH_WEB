const commonUtils = {
    fnDetectEnv() {
        const userAgent = navigator.userAgent;
        let browser = '';
        let os = '';
  
        if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edg') === -1) {
          browser = 'Chrome';
        } else if (userAgent.indexOf('Firefox') !== -1) {
          browser = 'Firefox';
        } else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
          browser = 'Safari';
        } else if (userAgent.indexOf('Edg') !== -1) {
          browser = 'Edge';
        } else if (userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
          browser = 'IE'; // Internet Explorer
        } else {
          browser = 'Unknown';
        }
        if (userAgent.match(/iPhone|iPad|iPod/i)) {
          os = 'iOS';
        } else if (userAgent.match(/Android/i)) {
          os = 'Android';
        } else if (userAgent.match(/Windows/i)) {
          os = 'Windows';
        } else if (userAgent.match(/Mac/i)) {
          os = 'Mac';
        } else if (userAgent.match(/Linux/i)) {
          os = 'Linux';
        } else {
          os = 'Unknown';
        }
        return { browser, os };
      },
};
export default commonUtils;