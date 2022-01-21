export function PathToFlie(path){

    
    
    if(path == undefined || path == '' || path == null){ 
        return null;
    }
    else {
        const words = path.split('/');
    
        const flieNames = words[words.length-1];
        const flieNameDot =flieNames.split(".");
        const flieName =flieNameDot[0];
        var file ={
            uri :path,
            type: 'image/jpeg',
            name: flieName+".jpg",
        }
        return file;
    }        
}   