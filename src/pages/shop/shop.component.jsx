import React from "react";
import "./shop.styles.scss";

import CollectionsOverviewContainer from "../../components/collections-overview/collection-overview.container";
import { Route } from "react-router-dom";

import CollectionPageContainer from "../collection/collection.container";

// import {
//   firestore,
//   convertCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils";

import { connect } from "react-redux";
//import { updateCollections } from "../../redux/shop/shop.actions";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
  // state = {
  //   loading: true,
  // };

  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection("collections");
    // //get the data
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
    //   async (snapshot) => {
    //     //console.log(snapshot);
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     //console.log(collectionsMap);
    //     updateCollections(collectionsMap);
    //     this.setState({ loading: false });
    //   }
    // );
    //example if we use a normal api call (promise pattern) instead of the observer pattern given by firebase
    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/crwn-db-2022-13eb0/databases/(default)/documents/collections"
    // )
    //   .then((response) => response.json())
    //   .then((collection) => console.log(collection));
    //end example
  }

  render() {
    const { match } = this.props; //route auto pass match, location, history as props
    //const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // updateCollections: (collectionsMap) =>
  //   dispatch(updateCollections(collectionsMap)),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
