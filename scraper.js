const { createWorker, PSM } = require('tesseract.js');

const main = async () => {
  const worker = await createWorker();
  
  (async () => {
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.PSM_SPARSE_TEXT,
      tessedit_char_whitelist: "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890.,/- "
    });
    const { data: { text } } = await worker.recognize('myschedule-resize.png');
    console.log(text);
    await worker.terminate();
  })();
}

main()