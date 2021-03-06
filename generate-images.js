import lwip from 'lwip';
import path from 'path';
import { spawn } from 'child_process';
import async from 'async';
import glob from 'glob';

const cliPath = 'node_modules/imageoptim-cli/bin';

const sizes = [480, 640, 800, 1080, 1280];

const imageOptimCli = spawn('./imageOptim', [], {
    cwd: cliPath
}).on('error', (error) => { console.log(error) });

imageOptimCli.stdout.on('data', (message) => {
    console.log(String(message || '').replace(/\n+$/, ''));
});

imageOptimCli.on('exit', (code) => {
    return code === 0 ? console.log('yay !') : console.log('uh oh...');
});

async.map(glob.sync('images/*.jpg'), (filename, callback) => {
	console.log(`Processing image ${path.basename(filename, '.jpg')}...`);
	lwip.open(filename, (error, image) => {
        error && console.error(error);
        const resizes = sizes.map((size) => {
            return (callback) => {
                const imagePath = `assets/${path.basename(filename, '.jpg')}-${size}w.jpg`;
    			image.clone((error, clone) => {
                    clone.batch()
                         .resize(size)
                         .writeFile(path.relative(__dirname, imagePath), 'jpg', { quality: 80 }, (error) => {
                             console.log(`     ${path.basename(imagePath)} generated`);
                             callback(error, path.resolve(__dirname, imagePath));
                         });
                });
            }
        });
		async.series(resizes, (error, resizedImageNames) => {
			callback(error, resizedImageNames);
		});
	});
}, (error, resizedImagesNames) => {
    error && console.error(error);
    const unifiedArray = [].concat.apply([], resizedImagesNames);
	imageOptimCli.stdin.setEncoding('utf8');
	imageOptimCli.stdin.end(unifiedArray.join('\n') + '\n');
});
