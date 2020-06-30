export interface User {
    id: string;
    name: string;
    isAdministrator: boolean;
}

export const mockDatas: User[] = [
    { id: 'hoge', name: 'hogeさん', isAdministrator: true },
    { id: 'fuga', name: 'fugaさん', isAdministrator: false },
    { id: 'hege', name: 'hegeさん', isAdministrator: false },
    { id: 'piyo', name: 'piyoさん', isAdministrator: false },
    { id: 'poyo', name: 'poyoさん', isAdministrator: false }
];