import LoginScreen from '../auth/LoginViewContainer';
import TabNavigator from './TabNavigator';

import MtrlsRcvng from '../barcode/mtrlsRcvng/MtrlsRcvngViewContainer';
import WrhsMove from '../barcode/wrhsMove/wrhsMoveViewContainer';

import WorkOrder from '../barcode/workOrder/WorkOrderViewContainer';
import LgstcRcpt from '../barcode/lgstcRcpt/LgstcRcptViewContainer';
import LgsprRgstr from '../barcode/lgsprRgstr/LgsprRgstrViewContainer';
import LgsprPrfrm from '../barcode/lgsprPrfrm/LgsprPrfrmViewContainer';
import LgstcShpng from '../barcode/lgstcShpng/LgstcShpngViewContainer';

import CrdbrPrfrm from '../barcode/crdbrPrfrm/CrdbrPrfrmViewContainer';

import Statistics from '../statistics/StatisticsViewContainer';
import ImageUpload from '../imageUpload/ImageUploadContainer';

const StackNavigationData = [
    {
        name: 'Login',
        component: LoginScreen,
    },
    {
        name: 'Tab',
        component: TabNavigator,
    },
    {
        // 자재입고
        name: 'MtrlsRcvng',
        component: MtrlsRcvng,
    },
    {
        // 창고이동
        name: 'WrhsMove',
        component: WrhsMove,
    },
    {
        // 작업지시
        name: 'WorkOrder',
        component: WorkOrder,
    },
    {
        // 입고
        name: 'LgstcRcpt',
        component: LgstcRcpt,
    },
    {
        // 포장 생산등록
        name: 'LgsprRgstr',
        component: LgsprRgstr,
    },
    {
        // 포장 생산실적
        name: 'LgsprPrfrm',
        component: LgsprPrfrm,
    },
    {
        // 포장 출하
        name: 'LgstcShpng',
        component: LgstcShpng,
    },
    {
        // 생산실적
        name: 'CrdbrPrfrm',
        component: CrdbrPrfrm,
    },
    {
        // 통계현황
        name: 'Statistics',
        component: Statistics,
    },
    {
        // 이미지 업로드
        name: 'ImageUpload',
        component: ImageUpload,
    },
]

export default StackNavigationData;