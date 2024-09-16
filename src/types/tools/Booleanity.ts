/**
 * Превращает все свойства интерфейса в тип boolean
 * Полезно применять для отслеживания изменений в объекте
 */
export type Booleanify<T> = {
    [K in keyof T]: boolean;
};
