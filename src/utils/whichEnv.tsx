export enum Environments {
    Development,
    Production
}

export const whichEnv = (env?: string) : Environments => {
    console.log('Environment: ', env);
    if (env === 'production') {
        return Environments.Production;
    } else if (env === 'development') {
        return Environments.Development;
    } else {
        throw new Error('Unknown environment');
    }
}