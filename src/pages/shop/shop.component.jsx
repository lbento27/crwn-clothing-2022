import React from "react";
import "./shop.styles.scss";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";

import CollectionPage from "../collection/collection.component";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    //get the data
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        //console.log(snapshot);
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //console.log(collectionsMap);
        updateCollections(collectionsMap);

        this.setState({ loading: false });
      }
    );

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
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
