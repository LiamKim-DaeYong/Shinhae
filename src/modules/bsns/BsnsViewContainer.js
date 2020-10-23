import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import BsnsScreen from './BsnsView';
import { 
    getList, 
    refreshList,
    loadMoreList,
    filterOpen,
    selectDstrbFilter, 
    selectDateFilter,
    changeSearchKeyword, 
    changeStartDate, 
    changeEndDate,
    searchList,
    setDlvrySq
} from './BsnsState';

export default compose(
    connect(
        state => ({
            isLoading: state.bsns.isLoading,
            error: state.bsns.error,
            bsnsList: state.bsns.bsnsList,
            filterVisible: state.bsns.filterVisible,
            dstrbFilterList: state.bsns.dstrbFilterList,
            dstrbFilter: state.bsns.dstrbFilter,
            dateFilterList: state.bsns.dateFilterList,
            dateFilter: state.bsns.dateFilter,
            startDate: state.bsns.startDate,
            endDate: state.bsns.endDate,
            searchKeyword: state.bsns.searchKeyword,
        }),
        dispatch => ({
            getList: () => dispatch(getList()),
            refreshList: () => dispatch(refreshList()),
            loadMoreList: () => dispatch(loadMoreList()),

            filterOpen: () => dispatch(filterOpen()),
            selectDstrbFilter: (key) => dispatch(selectDstrbFilter(key)),
            selectDateFilter: (key) => dispatch(selectDateFilter(key)),
            changeSearchKeyword: (keyword) => dispatch(changeSearchKeyword(keyword)),
            changeStartDate: (date) => dispatch(changeStartDate(date)),
            changeEndDate: (date) => dispatch(changeEndDate(date)),
            searchList: () => dispatch(searchList()),
            setDlvrySq: (dlvrySq) => dispatch(setDlvrySq(dlvrySq))
        }),        
    ),
  
    lifecycle({
        componentDidMount() {            
            console.log("Bsns Page");  
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.getList();
            });
        },
        componentWillUnmount() {
            this._unsubscribe();
        }
    }),
) (BsnsScreen);