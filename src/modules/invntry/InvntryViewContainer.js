import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import InvntryScreen from './InvntryView';
import {
    getList,
    refreshList,
    loadMoreList,
    filterOpen, 
    selectDstrbFilter, 
    selectInvntryFilter,
    changeSearchKeyword,
    searchList
} from './InvntryState';

export default compose(
    connect(
        state => ({
            isLoading: state.invntry.isLoading,
            error: state.invntry.error,
            mtrlsList: state.invntry.mtrlsList,
            filterVisible: state.invntry.filterVisible,
            dstrbFilterList: state.invntry.dstrbFilterList,
            dstrbFilter: state.invntry.dstrbFilter,
            invntryFilterList: state.invntry.invntryFilterList,
            invntryFilter: state.invntry.invntryFilter,
            searchKeyword: state.invntry.searchKeyword,
        }),
        dispatch => ({
            getList: () => dispatch(getList()),            
            refreshList: () => dispatch(refreshList()),
            loadMoreList: () => dispatch(loadMoreList()),
            
            filterOpen: () => dispatch(filterOpen()),
            selectDstrbFilter: (key) => dispatch(selectDstrbFilter(key)),
            selectInvntryFilter: (key) => dispatch(selectInvntryFilter(key)),
            changeSearchKeyword: (keyword) => dispatch(changeSearchKeyword(keyword)),
            searchList: () => dispatch(searchList())
        })
    ),
  
    lifecycle({
        componentDidMount() {
            console.log("Invntry Page");
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.getList();
            });
        },
        componentWillUnmount() {
            this._unsubscribe();
        }
    }),
) (InvntryScreen);