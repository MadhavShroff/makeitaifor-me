export enum Environments {
    Development,
    Production
}

export const whichEnv = (env?: string) : Environments => {
    if (!env) {
        env = process.env.NODE_ENV || 'producuction';
    }
    if (env === 'production') {
        return Environments.Production;
    } else if (env === 'development') {
        return Environments.Development;
    } else {
        throw new Error('Unknown environment');
    }
}