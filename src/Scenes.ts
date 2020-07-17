import {IRestResponse, RestClient} from 'typed-rest-client/RestClient';

export class Scenes {
    private restClient: RestClient;

    constructor(client: RestClient) {
        this.restClient = client;
    }

    async getCurrentScene(): Promise<string> {
        const response: IRestResponse<string[]> = await this.restClient.get<string[]>('getCurrentScene');
        return response.result[0];
    }

    async getSceneList(): Promise<Scene[]> {
        const response = await this.restClient.get<SceneList>('getSceneList');
        return response.result.items;
    }

    async setNext(): Promise<string> {
        const response = await this.restClient.get<string[]>('setNext');
        return response.result[0];
    }

    async setPrev(): Promise<string> {
        const response = await this.restClient.get<string[]>('setPrev');
        return response.result[0];
    }
}

export interface Scene {
    Children: Scene[];
    LastAspect: number;
    Locked: boolean;
    UUID: string;
    title: string;
}

export interface SceneList {
    items: Scene[];
}
