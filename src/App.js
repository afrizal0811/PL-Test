import React from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { create } from "jss";
import { ThemeProvider } from "styled-components/macro";

import { StyledEngineProvider } from "@material-ui/styled-engine-sc";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import StylesProvider from "@material-ui/styles/StylesProvider";
import jssPreset from "@material-ui/styles/jssPreset";

import "./i18n";
import createTheme from "./theme";
import routes from "./routes";

import useTheme from "./hooks/useTheme";
import { store } from "./redux/store";

import { AuthProvider } from "./contexts/JWTContext";
import MaintenanceProvider, {
  useMaintenance,
} from "./contexts/MaintenanceProvider";
// import { AuthProvider } from "./contexts/FirebaseAuthContext";
// import { AuthProvider } from "./contexts/Auth0Context";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const WrapperApp = () => {
  const content = useRoutes(routes);

  const { isMaintenance, isLoadingGetMaintenance } = useMaintenance();
  if (isMaintenance !== null && !isLoadingGetMaintenance) {
    return content;
  }
  return null;
};

function App() {
  const { theme } = useTheme();

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | Pangan Lestari"
        defaultTitle="Material App - React Admin & Dashboard Template"
      />
      <Provider store={store}>
        <StylesProvider jss={jss}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StyledEngineProvider injectFirst>
              <MuiThemeProvider theme={createTheme(theme)}>
                <ThemeProvider theme={createTheme(theme)}>
                  <AuthProvider>
                    <MaintenanceProvider>
                      <WrapperApp />
                    </MaintenanceProvider>
                  </AuthProvider>
                </ThemeProvider>
              </MuiThemeProvider>
            </StyledEngineProvider>
          </LocalizationProvider>
        </StylesProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
