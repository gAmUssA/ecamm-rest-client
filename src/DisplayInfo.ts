import {IRestResponse, RestClient} from 'typed-rest-client/RestClient';

export class DisplayInfo {
    private restClient: RestClient;
    // stores current state of the stream e.g. button names and number of viewers.
    // TODO: will be useful to implement toggle
    private info: Info;

    constructor(client: RestClient) {
        this.restClient = client;

        // populate with initial state
        this.getInfo().then((value) => {
            this.info = value;
        });
    }

    /**
     * @return: Dictionary containing strings for CurrentScene, Mute, and
     */
    async getInfo(): Promise<Info> {
        const infoIRestResponse: IRestResponse<Info> = await this.restClient.get<Info>('getInfo');
        return infoIRestResponse.result;
    }

    /**
     * @return  Label for Start button. string
     */
    async getButtonLabel(): Promise<string> {
        const response = await this.restClient.get<string[]>('getButtonLabel');

        // Ecamm Live API actually returns an Array with one element
        return response.result[0];
    }

    /**
     * @return Clicks the start or record button.
     */
    async setClickButton(): Promise<string> {
        const response = await this.restClient.get<string>('setClickPauseButton');
        return response.result;
    }

}

export interface Info {
    ButtonLabel: string;
    CurrentScene: string;
    Mute: string;
    PauseButtonLabel: string;
    Viewers: string;
}
