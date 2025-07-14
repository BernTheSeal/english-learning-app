export type PickFields<T, K extends keyof T> = Pick<T, K>;

export type OptionalFields<T, K extends keyof T> = Partial<Pick<T, K>>;

export type OptionalExcept<T, K extends keyof T> = Partial<Omit<T, K>>;
