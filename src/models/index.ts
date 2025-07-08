// тип действия, выполняемого сервером с данными
export enum DataAction{
    None = "none",
    Create = "create",
    Update = "update",
    Delete = "delete",
}

export enum UserPermissions {
    EDIT_PROJECT = 'edit-project',
    CRUD_DISTRIBUTORS = 'crud-distributors',
    CRUD_PRODUCTS = 'crud-products',
    CRUD_INGREDIENTS = 'crud-ingredients',
    CRUD_DISHES = 'crud-dishes',
    CRUD_USERS = 'crud-users',
    CRUD_STORAGE = 'crud-storage',
    READ_DISTRIBUTORS = 'read-distributors',
    READ_PRODUCTS = 'read-products',
    READ_INGREDIENTS = 'read-ingredients',
    READ_DISHES = 'read-dishes',
    READ_USERS = 'read-users',
    READ_STORAGE = 'read-storage',
}