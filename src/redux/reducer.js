import { combineReducers } from 'redux';

import app from '../modules/AppState';
import login from '../modules/auth/LoginState';
import invntry from '../modules/invntry/InvntryState';
import purchs from '../modules/purchs/PurchsState';
import bsns from '../modules/bsns/BsnsState';
import imageUpload from '../modules/imageUpload/ImageUploadState';
import statistics from '../modules/statistics/StatisticsState'

// ## Barcode
import mtrlsRcvng from '../modules/barcode/mtrlsRcvng/MtrlsRcvngState';
import wrhsMove from '../modules/barcode/wrhsMove/wrhsMoveState';

import workOrder from '../modules/barcode/workOrder/WorkOrderState'
import lgstcRcpt from '../modules/barcode/lgstcRcpt/LgstcRcptState';
import lgsprRgstr from '../modules/barcode/lgsprRgstr/LgsprRgstrState';
import lgsprPrfrm from '../modules/barcode/lgsprPrfrm/LgsprPrfrmState';
import lgstcShpng from '../modules/barcode/lgstcShpng/LgstcShpngState';

import crdbrPrfrm from '../modules/barcode/crdbrPrfrm/CrdbrPrfrmState';

export default combineReducers({
    app,
    login,
    bsns,
    imageUpload,  
    purchs,
    invntry,
    statistics,

    mtrlsRcvng,
    wrhsMove,
    
    workOrder,
    lgstcRcpt,
    lgsprRgstr,
    lgsprPrfrm,
    lgstcShpng,

    crdbrPrfrm
});
