export interface IModule {
    enabled: boolean;
    path: string;
}

export type TModule = IModule | string;

export const MODULES: TModule[] = [
    {
        enabled: true,
        path: 'core',
    },
    {
        enabled: process.env.NODE_ENV === 'development',
        path: 'development',
    },
];
