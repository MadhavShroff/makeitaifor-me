export enum Environments {
    Development,
    Production
}

export const whichEnv = () => {
    const env = process.env.APP_ENV;
    console.log('Environment: ', env);
    if (env === 'production') {
        return Environments.Production;
    } else if (env === 'development') {
        return Environments.Development;
    } else {
        throw new Error('Unknown environment');
    }
}