import HomeScreen from '../home/HomeViewContainer';

import BsnsScreen from '../bsns/BsnsViewContainer';
import PurchsScreen from '../purchs/PurchsViewContainer';
import InvntryScreen from '../invntry/InvntryViewContainer';
import OtherMenuScreen from '../otherMenu/OtherMenuViewContainer';

const tabNavigationData = [    
    {
        name: 'Bsns',
        label: '영업관리',
        component: BsnsScreen,
        icon: 'truck'
    },
    {
        name: 'Purchs',
        label: '구매관리',
        component: PurchsScreen,
        icon: 'box'
    },
    {          
        name: 'Home',
        label: '',
        component: HomeScreen,    
        icon: 'AddButton'
    },
    {
        name: 'Invntry',
        label: '재고관리',
        component: InvntryScreen,
        icon: 'warehouse'
    },
    {
        name: 'OtherMenu',
        label: '더보기',
        component: OtherMenuScreen,
        icon: 'ellipsis-h'
    },
];

export default tabNavigationData;