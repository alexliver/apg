import {Observable } from 'rxjs'
import config from '../config.jsx'
var ajax = Observable.ajax

const epics = {
  loadCategory: function(action$, store) {
    return action$.ofType('loadCategory').filter(action => action.id != store.getState().categoryID).mergeMap(action => {
      //console.log(store.getState().categoryID);
      return Observable.merge(
        Observable.from([actions.setCategoryID(action.id), actions.loadedCategory([])]),
        ajax.getJSON(config.url + 'categoryPostList/' + action.id + '/').map(res => actions.loadedCategory(res))
      );
    });
  },

};

export const epic = (action$, store) => {
  var streams = Object.keys(epics).map(function (key) { return epics[key](action$, store); });
  return Observable.merge.apply(Observable, streams);
}


const actions = {
  loadCategory: function(id) {
    return {type: 'loadCategory', id: id};
  },

  loadedCategory: function(res) {
    return {type: 'loadedCategory', posts: res};
  },

  setCategoryID: categoryID => ({type: 'setCategoryID', categoryID}),

};

export default actions;

