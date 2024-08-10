import { UserModel } from "./user-model";

export interface TaskModel {
    id?: string;
    title?: string;
    description?: string;
    expirationDate?: Date;
    registerDate?: Date;
    status?: number;
    responsible?: UserModel;
    responsibleId?: string;
}