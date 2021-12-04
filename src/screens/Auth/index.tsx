import React from "react";
import { StyleSheet, View } from "react-native";
import AuthDetail from "../../components/Auth/details";
import AuthMenu from "../../components/Auth/menu";
import { Safeview } from "../../components/common";

interface Props {}

const AuthScreen = (props: Props) => {
  const [authPage, setAuthPage] = React.useState<0 | 1>(0);
  const [detailsPage, setDetailsPage] = React.useState<boolean>(false);

  return (
    <Safeview>
      <View style={styles.container}>
        {detailsPage && (
          <AuthDetail authPage={authPage} setDetailsPage={setDetailsPage} />
        )}
        {!detailsPage && (
          <AuthMenu
            authPage={authPage}
            setAuthPage={setAuthPage}
            setDetailsPage={setDetailsPage}
          />
        )}
      </View>
    </Safeview>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
