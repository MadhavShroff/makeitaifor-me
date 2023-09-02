export enum Environments {
    Development,
    Production
}

export const whichEnv = () => {
    const env = process.env.NODE_ENV;
    if (env === 'development') {
        return Environments.Development;
    } else if (env === 'production') {
        return Environments.Production;
    } else {
        throw new Error('Unknown environment');
    }
}