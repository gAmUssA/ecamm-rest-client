import {RestClient} from 'typed-rest-client/RestClient';

export class Cameras {
    restClient: RestClient;

    constructor(client: RestClient) {
        this.restClient = client;
    }

    /**
     * @return An array of camera inputs
     */
    async getInputs(): Promise<Input[]> {
        const response = await this.restClient.get<Inputs>('getInputs');
        return response.result.items;
    }

    /**
     * @return UUID of the default camera string
     */
    async getDefaultCamera(): Promise<string> {
        const response = await this.restClient.get<string[]>('getDefaultCamera');
        return response.result[0];
    }
}

export interface Input {
    UUID: string;
    title: string;
}

export interface Inputs {
    items: Input[];
}
