import { IModelAModel } from './model-a.service';
import { IModelBModel } from './model-b.service';

export const anyCustomModel = (arg: any): arg is IModelAModel => {
    if (isModelAModel(arg)) {
        return true;
    }
    if (isModelBModel(arg)) {
        return true;
    }
    return false;
};

export const isModelAModel = (arg: any): arg is IModelAModel => {
    return (typeof arg !== 'undefined' && typeof arg.hoge !== 'undefined');
};

export const isModelBModel = (arg: any): arg is IModelBModel => {
    return (typeof arg !== 'undefined' && typeof arg.fuga !== 'undefined');
};
