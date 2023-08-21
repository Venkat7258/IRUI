declare var window: any;

export class DynamicEnvironment {
    public get apiUrl() {
        return window.config.apiUrl;
    }
    public get irApiUrl() {
        return window.config.irApiUrl;
    }
    public get fcApiUrl() {
        return window.config.fcApiUrl;
    }
}
