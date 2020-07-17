import {RestClient} from 'typed-rest-client/RestClient';
import {DisplayInfo, Scenes} from './client';

const bonjour = require('bonjour')();

async function test(restClient: RestClient): Promise<void> {
    const info = await new DisplayInfo(restClient).getInfo();
    console.log(info);

    const scenes = new Scenes(restClient);

    let currentSceneId = await scenes.getCurrentScene();
    console.log(`Scene id before ${currentSceneId}`);

    const resultNext = await scenes.setNext();
    console.log(resultNext);
    const resultPrev = await scenes.setPrev();
    console.log(resultPrev);
    currentSceneId = await scenes.getCurrentScene();
    console.log(`Scene id after next and prev ${currentSceneId}`);

    /*let scenesList = await scenes.getSceneList();
    console.log(scenesList)*/
}

// tslint:disable-next-line:typedef
async function run() {
    try {
        // tslint:disable-next-line:typedef
        bonjour.find({type: 'ecammliveremote'}, function (service) {
            // tslint:disable-next-line:comment-format
            const port = service.port;
            const host = service.host;
            const baseUrl: string = `http://${host}:${port}`;
            const restClient = new RestClient('node-client', baseUrl);
            test(restClient);
        });

    } catch (e) {
        console.log(e.message);
    }
}

run();
