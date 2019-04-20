const fs = require('fs');

module.exports = {
    ensureUnique(dir, filename, preferredExt) {
        if(typeof filename !== 'string' || !filename)
            return;
        let extIdx = filename.lastIndexOf('.');
        let ext = '';
        if(extIdx > -1) {
            filename = filename.substring(0, extIdx);
            ext = filename.substring(extIdx + 1).toLowerCase();
        }
        if(typeof preferredExt === 'string' && ext !== preferredExt)
            ext = preferredExt;
        
        filename = filename.replace(/[^a-zA-Z0-9_-]/, '_');
        ext = (ext ? '.' : '') + ext.replace(/[^a-zA-Z0-9_-]/, '_');

        if(!dir)
            dir = '';
        else if(!dir.endsWith('/') && !dir.endsWith('\\'))
            dir += '/';
        
        let attempt = 1;
        let suffix = '';
        while(fs.existsSync(dir + filename + suffix + ext)) {
            attempt++;
            suffix = '-' + attempt;
        }
        return filename + suffix + ext;
    }
};