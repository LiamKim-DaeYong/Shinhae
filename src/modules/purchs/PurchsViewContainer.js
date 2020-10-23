import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import PurchsScreen from './PurchsView';
import { 
    getList,
    refreshList,
    loadMoreList,
    filterOpen,
    selectDateFilter, 
    changeSearchKeyword, 
    changeStartDate, 
    changeEndDate,
    searchList
} from './PurchsState';

export default compose(
    connect(
        state => ({
            isLoading: state.purchs.isLoading,
            error: state.purchs.error,
            purchsList: state.purchs.purchsList,
            filterVisible: state.purchs.filterVisible,
            dateFilterList: state.purchs.dateFilterList,
            dateFilter: state.purchs.dateFilter,
            startDate: state.purchs.startDate,
            endDate: state.purchs.endDate,
            searchKeyword: state.purchs.searchKeyword,
        }),
        dispatch => ({
            getList: () => dispatch(getList()),
            refreshList: () => dispatch(refreshList()),
            loadMoreList: () => dispatch(loadMoreList()),
            
            filterOpen: () => dispatch(filterOpen()),
            selectDateFilter: (key) => dispatch(selectDateFilter(key)),
            changeSearchKeyword: (keyword) => dispatch(changeSearchKeyword(keyword)),
            changeStartDate: (date) => dispatch(changeStartDate(date)),
            changeEndDate: (date) => dispatch(changeEndDate(date)),
            searchList: () => dispatch(searchList())
        })
    ),
  
    lifecycle({
        componentDidMount() {
            console.log("Purchs Page");            
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.getList();
            });
        },
        componentWillUnmount() {
            this._unsubscribe();
        }
    }),
) (PurchsScreen);