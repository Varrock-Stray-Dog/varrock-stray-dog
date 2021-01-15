export interface IModule {
    enabled: boolean;
    path: string;
}

export type TModule = IModule | string;

export const MODULES: TModule[] = [
    'core',
    {
        enabled: process.env.NODE_ENV === 'development',
        path: 'development',
    },
];
