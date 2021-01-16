export interface IModule {
    enabled: boolean;
    path: string;
}

export const MODULES: IModule[] = [
    {
        enabled: true,
        path: 'core',
    },
    {
        enabled: process.env.NODE_ENV === 'development',
        path: 'development',
    },
];
