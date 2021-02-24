const {BrowserWindow, getCurrentWindow} = nodeRequire('electron').remote
const path = nodeRequire('path')
const {ipcRenderer} = nodeRequire('electron')

// Update MGF files info
// FIXME: update info only after waiting some time
function updateMgfInfo(path) {
    const mgfinfo = document.getElementById('mgfinfo');
    var mgfFiles = getMgfFiles(path);
    var nMgf = mgfFiles.length;
    mgfinfo.innerHTML = nMgf + " MGF files, " + (nMgf * (nMgf -1))/2 + " comparisons.";
}

// Set initial values for MGF directory and species file
const homedir = nodeRequire('os').homedir();
const mgfdir = document.getElementById("mgfdir");
const s2sfile = document.getElementById("s2sfile");
mgfdir.value = homedir
s2sfile.value = homedir


// Set initial value of MGF files info
updateMgfInfo(document.getElementById("mgfdir").value);

// Update MGF info on manual input
const inputHandler = function(e) {
updateMgfInfo(e.target.value);
}
mgfdir.addEventListener('input', inputHandler);

// Handle directory browse button
const selectDirBtn = document.getElementById('select-directory')

selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-dir-dialog')
})

ipcRenderer.on('selected-directory', (event, path) => {
  var p=`${path}`;
  document.getElementById("mgfdir").value = p;
  updateMgfInfo(p);
})

  // Handle submit button
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', (event) => {
  var params = {
    mgfDir : document.getElementById("mgfdir").value,
    precMassDiff : parseFloat(document.getElementById("precmassdif").value),
    chromPeakW : parseFloat(document.getElementById("chrompeakw").value),
    captureLog : document.getElementById("capturelog").checked,
    richOutput : document.getElementById("richoutput").checked,
    s2sFile : document.getElementById("s2sfile").value,
    outBasename : document.getElementById("outbasename").value,
    cutoff : parseFloat(document.getElementById("cutoff").value),
    avgSpecie : document.getElementById("avgspecie").checked,
    outNexus : document.getElementById("outnexus").checked,
    outMega : document.getElementById("outmega").checked,
    outNeely : document.getElementById("outneely").checked,
    impMissing : document.getElementById("impmiss").checked,
  }
  ipcRenderer.send('maketree', params)
})


// const {spawn} = nodeRequire('electron').remote.require('spawn')

// const { spawn } = require('child_process');
// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

